const supabase = require("../config/supabase");

// ================= GET ALL EVENTS =================
const getEvents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      events: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= GET ONE EVENT =================
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      event: data,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= ADD EVENT =================
const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      event_date,
      event_time,
    } = req.body;

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          location,
          event_date,
          event_time,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      event: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= UPDATE EVENT =================
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("events")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      event: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= DELETE EVENT =================
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};