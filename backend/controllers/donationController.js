const supabase = require("../config/supabase");

// ===============================
// GET ALL DONATIONS
// ===============================
exports.getDonations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("donations")
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
// ADD DONATION
// ===============================
exports.addDonation = async (req, res) => {
  try {
    const {
      donor_name,
      amount,
      purpose,
      payment_method,
      transaction_code,
      phone,
      notes,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("donations")
      .insert([
        {
          donor_name,
          amount,
          purpose,
          payment_method,
          transaction_code,
          phone,
          notes,
          status,
        },
      ])
      .select("*");

    if (error) throw error;

    res.status(201).json({
      success: true,
      donation: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// UPDATE DONATION
// ===============================
exports.updateDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      donor_name,
      amount,
      purpose,
      payment_method,
      transaction_code,
      phone,
      notes,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("donations")
      .update({
        donor_name,
        amount,
        purpose,
        payment_method,
        transaction_code,
        phone,
        notes,
        status,
      })
      .eq("id", id)
      .select("*");

    if (error) throw error;

    res.json({
      success: true,
      donation: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// DELETE DONATION
// ===============================
exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("donations")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Donation deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};