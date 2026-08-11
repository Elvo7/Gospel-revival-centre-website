const supabase = require("../config/supabase");

// ===============================
// GET ALL ANNOUNCEMENTS
// ===============================
exports.getAnnouncements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// ADD ANNOUNCEMENT
// ===============================
exports.addAnnouncement = async (req, res) => {
  try {
    const {
      title,
      message,
      priority,
      status,
      pinned,
      expiry_date,
    } = req.body;

    const { data, error } = await supabase
      .from("announcements")
      .insert([
        {
          title,
          message,
          priority,
          status,
          pinned,
          expiry_date,
        },
      ])
      .select("*");

    if (error) throw error;

    res.status(201).json({
      success: true,
      announcement: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// UPDATE ANNOUNCEMENT
// ===============================
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      message,
      priority,
      status,
      pinned,
      expiry_date,
    } = req.body;

    const { data, error } = await supabase
      .from("announcements")
      .update({
        title,
        message,
        priority,
        status,
        pinned,
        expiry_date,
      })
      .eq("id", id)
      .select("*");

    if (error) throw error;

    res.json({
      success: true,
      announcement: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// DELETE ANNOUNCEMENT
// ===============================
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};