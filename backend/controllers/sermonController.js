const supabase = require("../config/supabase");

// ================= GET ALL SERMONS =================
const getSermons = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("sermon_date", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      sermons: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= GET ONE SERMON =================
const getSermon = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      sermon: data,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= ADD SERMON =================
const addSermon = async (req, res) => {
  try {
    const {
      title,
      preacher,
      scripture,
      description,
      youtube_url,
      video_url,
      audio_url,
      sermon_date,
    } = req.body;

    const { data, error } = await supabase
      .from("sermons")
      .insert([
        {
          title,
          preacher,
          scripture,
          description,
          youtube_url,
          video_url,
          audio_url,
          sermon_date,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      sermon: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= UPDATE SERMON =================
const updateSermon = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("sermons")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      sermon: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= DELETE SERMON =================
const deleteSermon = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Sermon deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getSermons,
  getSermon,
  addSermon,
  updateSermon,
  deleteSermon,
};