const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supabase = require("../config/supabase");

// ==========================================
// GET CHURCH SETTINGS - ADMIN
// ==========================================

exports.getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("church_settings")
      .select("*")
      .order("id", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // Create default settings if none exist
    if (!data) {
      const { data: newSettings, error: insertError } =
        await supabase
          .from("church_settings")
          .insert([
            {
              church_name: "Gospel Revival Centre",
              church_tagline:
                "Reviving Lives Through the Gospel",
            },
          ])
          .select()
          .single();

      if (insertError) {
        throw insertError;
      }

      return res.json({
        success: true,
        settings: newSettings,
      });
    }

    res.json({
      success: true,
      settings: data,
    });
  } catch (err) {
    console.error("❌ Get settings error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to load church settings",
      error: err.message,
    });
  }
};

// ==========================================
// GET CHURCH SETTINGS - PUBLIC
// ==========================================

exports.getPublicSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("church_settings")
      .select(`
        church_name,
        church_tagline,
        pastor_name,
        phone,
        email,
        address,
        website,
        sunday_service,
        midweek_service,
        prayer_service,
        facebook,
        instagram,
        youtube,
        tiktok
      `)
      .order("id", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // Return safe defaults if settings don't exist
    if (!data) {
      return res.json({
        success: true,
        settings: {
          church_name: "Gospel Revival Centre",
          church_tagline:
            "Reviving Lives Through the Gospel",
          pastor_name: "",
          phone: "",
          email: "",
          address: "",
          website: "",
          sunday_service: "",
          midweek_service: "",
          prayer_service: "",
          facebook: "",
          instagram: "",
          youtube: "",
          tiktok: "",
        },
      });
    }

    res.json({
      success: true,
      settings: data,
    });
  } catch (err) {
    console.error(
      "❌ Get public settings error:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load public church settings",
      error: err.message,
    });
  }
};

// ==========================================
// UPDATE CHURCH SETTINGS
// ==========================================

exports.updateSettings = async (req, res) => {
  try {
    const {
      church_name,
      church_tagline,
      pastor_name,
      phone,
      email,
      address,
      website,
      sunday_service,
      midweek_service,
      prayer_service,
      facebook,
      instagram,
      youtube,
      tiktok,
    } = req.body;

    // Find existing settings
    const {
      data: existing,
      error: findError,
    } = await supabase
      .from("church_settings")
      .select("id")
      .order("id", {
        ascending: true,
      })
      .limit(1)
      .maybeSingle();

    if (findError) {
      throw findError;
    }

    let data;
    let error;

    // ========================================
    // UPDATE EXISTING RECORD
    // ========================================

    if (existing) {
      const result = await supabase
        .from("church_settings")
        .update({
          church_name:
            church_name || "Gospel Revival Centre",

          church_tagline:
            church_tagline || "",

          pastor_name:
            pastor_name || "",

          phone:
            phone || "",

          email:
            email || "",

          address:
            address || "",

          website:
            website || "",

          sunday_service:
            sunday_service || "",

          midweek_service:
            midweek_service || "",

          prayer_service:
            prayer_service || "",

          facebook:
            facebook || "",

          instagram:
            instagram || "",

          youtube:
            youtube || "",

          tiktok:
            tiktok || "",
        })
        .eq("id", existing.id)
        .select()
        .single();

      data = result.data;
      error = result.error;
    }

    // ========================================
    // CREATE RECORD IF NONE EXISTS
    // ========================================

    else {
      const result = await supabase
        .from("church_settings")
        .insert([
          {
            church_name:
              church_name ||
              "Gospel Revival Centre",

            church_tagline:
              church_tagline ||
              "Reviving Lives Through the Gospel",

            pastor_name:
              pastor_name || "",

            phone:
              phone || "",

            email:
              email || "",

            address:
              address || "",

            website:
              website || "",

            sunday_service:
              sunday_service || "",

            midweek_service:
              midweek_service || "",

            prayer_service:
              prayer_service || "",

            facebook:
              facebook || "",

            instagram:
              instagram || "",

            youtube:
              youtube || "",

            tiktok:
              tiktok || "",
          },
        ])
        .select()
        .single();

      data = result.data;
      error = result.error;
    }

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message:
        "Church settings saved successfully",
      settings: data,
    });
  } catch (err) {
    console.error(
      "❌ Update settings error:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to save church settings",
      error: err.message,
    });
  }
};

// ==========================================
// CHANGE ADMIN PASSWORD
// ==========================================

exports.changeAdminPassword = async (
  req,
  res
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid or expired session",
      });
    }

    // ========================================
    // SUPPORT BOTH FRONTEND FORMATS
    // ========================================

    const currentPassword =
      req.body.current_password ||
      req.body.currentPassword;

    const newPassword =
      req.body.new_password ||
      req.body.newPassword;

    // ========================================
    // VALIDATION
    // ========================================

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is required",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password is required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    // ========================================
    // FIND CURRENT ADMIN
    // ========================================

    const {
      data: user,
      error: userError,
    } = await supabase
      .from("members")
      .select(
        "id, full_name, email, password"
      )
      .eq("id", decoded.id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message:
          "Admin account not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account does not have a password",
      });
    }

    // ========================================
    // VERIFY CURRENT PASSWORD
    // ========================================

    const passwordValid =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Current password is incorrect",
      });
    }

    // ========================================
    // HASH NEW PASSWORD
    // ========================================

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    // ========================================
    // UPDATE PASSWORD
    // ========================================

    const {
      error: updateError,
    } = await supabase
      .from("members")
      .update({
        password: hashedPassword,
      })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    res.json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (err) {
    console.error(
      "❌ Change password error:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to change password",
      error: err.message,
    });
  }
};