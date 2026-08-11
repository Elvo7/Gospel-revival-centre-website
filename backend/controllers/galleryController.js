const supabase = require("../config/supabase");

// ================= GET ALL =================

exports.getGallery = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      gallery: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= ADD =================

exports.addGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { data, error } = await supabase
      .from("gallery")
      .insert([
        {
          title,
          description,
          image_url: publicUrl,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      gallery: data[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= DELETE =================

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const fileName = data.image_url.split("/").pop();

    await supabase.storage
      .from("gallery")
      .remove([fileName]);

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    res.json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};