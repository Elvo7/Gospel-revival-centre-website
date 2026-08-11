const supabase = require("../config/supabase");

// GET ALL MEMBERS
exports.getMembers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("id, full_name, email, phone, created_at")
      .order("id", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const { data, error } = await supabase
      .from("members")
      .insert([
        {
          full_name: full_name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
      ])
      .select("id, full_name, email, phone, created_at");

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      member: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE MEMBER
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone } = req.body;

    const { data, error } = await supabase
      .from("members")
      .update({
        full_name,
        email,
        phone,
      })
      .eq("id", id)
      .select("id, full_name, email, phone, created_at");

    if (error) throw error;

    res.json({
      success: true,
      member: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE MEMBER
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};