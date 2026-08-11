const supabase = require("../config/supabase");

const getDashboard = async (req, res) => {
  try {
    // ==========================================
    // MEMBERS
    // ==========================================

    const {
      data: members,
      error: membersError,
    } = await supabase
      .from("members")
      .select(
        "id, full_name, email, phone, created_at"
      )
      .order("id", {
        ascending: false,
      });

    if (membersError) {
      throw membersError;
    }

    // ==========================================
    // EVENTS
    // ==========================================

    const {
      data: events,
      error: eventsError,
    } = await supabase
      .from("events")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (eventsError) {
      throw eventsError;
    }

    // ==========================================
    // SERMONS
    // ==========================================

    const {
      data: sermons,
      error: sermonsError,
    } = await supabase
      .from("sermons")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (sermonsError) {
      throw sermonsError;
    }

    // ==========================================
    // DONATIONS
    // ==========================================

    const {
      data: donations,
      error: donationsError,
    } = await supabase
      .from("donations")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (donationsError) {
      throw donationsError;
    }

    // ==========================================
    // ANNOUNCEMENTS
    // ==========================================

    const {
      data: announcements,
      error: announcementsError,
    } = await supabase
      .from("announcements")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (announcementsError) {
      throw announcementsError;
    }

    // ==========================================
    // DONATION TOTAL
    // ==========================================

    const totalDonationAmount =
      donations.reduce((total, donation) => {
        const amount = Number(
          donation.amount || 0
        );

        return Number.isNaN(amount)
          ? total
          : total + amount;
      }, 0);

    // ==========================================
    // RECENT DATA
    // ==========================================

    const recentMembers =
      members.slice(0, 5);

    const recentEvents =
      events.slice(0, 5);

    const recentSermons =
      sermons.slice(0, 5);

    const recentDonations =
      donations.slice(0, 5);

    const recentAnnouncements =
      announcements.slice(0, 5);

    // ==========================================
    // DASHBOARD RESPONSE
    // ==========================================

    res.json({
      success: true,

      // ----------------------------------------
      // STATISTICS
      // ----------------------------------------

      totalMembers: members.length,

      totalEvents: events.length,

      totalSermons: sermons.length,

      totalDonations: donations.length,

      totalDonationAmount,

      totalAnnouncements:
        announcements.length,

      // ----------------------------------------
      // RECENT DATA
      // ----------------------------------------

      recentMembers,

      recentEvents,

      recentSermons,

      recentDonations,

      recentAnnouncements,
    });
  } catch (err) {
    console.error(
      "❌ Dashboard error:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard data",
      error: err.message,
    });
  }
};

module.exports = {
  getDashboard,
};