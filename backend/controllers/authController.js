const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// ==========================================
// VERIFY JWT TOKEN
// ==========================================

const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authentication token is required");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  if (!decoded.id) {
    throw new Error("Invalid authentication token");
  }

  const { data: user, error } = await supabase
    .from("members")
    .select("id, full_name, email, phone, password")
    .eq("id", decoded.id)
    .single();

  if (error || !user) {
    throw new Error("User account not found");
  }

  return user;
};

// ==========================================
// REGISTER
// ==========================================

exports.register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      password,
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and password are required",
      });
    }

    const { data: existingUser, error: existingError } =
      await supabase
        .from("members")
        .select("id")
        .eq("email", email)
        .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const { data, error } = await supabase
      .from("members")
      .insert([
        {
          full_name,
          email,
          phone: phone || "",
          password: hashedPassword,
        },
      ])
      .select("id, full_name, email, phone")
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      member: data,
    });
  } catch (err) {
    console.error("❌ Register error:", err);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { data: users, error } = await supabase
      .from("members")
      .select(
        "id, full_name, email, phone, password"
      );

    if (error) {
      throw error;
    }

    const user = users.find(
      (u) =>
        u.email &&
        u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone || "",
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};

// ==========================================
// GET PROFILE
// ==========================================

exports.getProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone || "",
      },
    });
  } catch (err) {
    console.error("❌ Get profile error:", err);

    const status =
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError"
        ? 401
        : 500;

    res.status(status).json({
      success: false,
      message:
        status === 401
          ? "Invalid or expired authentication token"
          : err.message,
    });
  }
};

// ==========================================
// UPDATE PROFILE
// ==========================================

exports.updateProfile = async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    const {
      full_name,
      email,
      phone,
    } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Full name and email are required",
      });
    }

    // Check whether another member already
    // uses the requested email.
    const { data: existingUser, error: existingError } =
      await supabase
        .from("members")
        .select("id, email")
        .eq("email", email)
        .neq("id", user.id)
        .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Another account is already using this email",
      });
    }

    const { data, error } = await supabase
      .from("members")
      .update({
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : "",
      })
      .eq("id", user.id)
      .select("id, full_name, email, phone")
      .single();

    if (error) {
      throw error;
    }

    // Create a new token if the email changed.
    const newToken = jwt.sign(
      {
        id: data.id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Account information updated successfully",
      token: newToken,
      user: data,
    });
  } catch (err) {
    console.error("❌ Update profile error:", err);

    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Your session has expired. Please login again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update account information",
      error: err.message,
    });
  }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

exports.changePassword = async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    const {
      current_password,
      new_password,
      confirm_password,
    } = req.body;

    if (
      !current_password ||
      !new_password ||
      !confirm_password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current password, new password and confirmation are required",
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters long",
      });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirmation do not match",
      });
    }

    const passwordIsCorrect =
      await bcrypt.compare(
        current_password,
        user.password
      );

    if (!passwordIsCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const samePassword = await bcrypt.compare(
      new_password,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from your current password",
      });
    }

    const hashedPassword = await bcrypt.hash(
      new_password,
      10
    );

    const { error } = await supabase
      .from("members")
      .update({
        password: hashedPassword,
      })
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("❌ Change password error:", err);

    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Your session has expired. Please login again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: err.message,
    });
  }
};