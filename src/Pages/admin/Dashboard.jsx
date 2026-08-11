import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/admin/Layout";
import PageTitle from "../../components/admin/PageTitle";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";

import { getDashboard } from "../../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getDashboard();

      setDashboard({
        totalMembers: data.totalMembers || 0,
        totalEvents: data.totalEvents || 0,
        totalSermons: data.totalSermons || 0,
        totalDonations: data.totalDonations || 0,
        totalDonationAmount:
          data.totalDonationAmount || 0,
        totalAnnouncements:
          data.totalAnnouncements || 0,

        recentMembers:
          data.recentMembers || [],

        recentEvents:
          data.recentEvents || [],

        recentSermons:
          data.recentSermons || [],

        recentDonations:
          data.recentDonations || [],

        recentAnnouncements:
          data.recentAnnouncements || [],
      });
    } catch (err) {
      console.error(
        "❌ Failed to load dashboard:",
        err
      );

      setDashboard({
        totalMembers: 0,
        totalEvents: 0,
        totalSermons: 0,
        totalDonations: 0,
        totalDonationAmount: 0,
        totalAnnouncements: 0,
        recentMembers: [],
        recentEvents: [],
        recentSermons: [],
        recentDonations: [],
        recentAnnouncements: [],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const memberColumns = [
    {
      key: "full_name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
  ];

  const eventColumns = [
    {
      key: "title",
      label: "Event",
    },
    {
      key: "event_date",
      label: "Date",
    },
  ];

  const sermonColumns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "preacher",
      label: "Preacher",
    },
  ];

  const donationColumns = [
    {
      key: "donor_name",
      label: "Donor",
    },
    {
      key: "amount",
      label: "Amount",
    },
  ];

  const announcementColumns = [
    {
      key: "title",
      label: "Announcement",
    },
  ];

  // ==========================================
  // FORMAT MONEY
  // ==========================================

  const formatMoney = (amount) => {
    return `KES ${Number(
      amount || 0
    ).toLocaleString("en-KE")}`;
  };

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <Layout>

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div style={styles.header}>

        <div>
          <PageTitle
            title="Church Management Dashboard"
            subtitle="Overview of Gospel Revival Centre"
          />
        </div>

        <button
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
          style={{
            ...styles.refreshButton,
            opacity: refreshing ? 0.7 : 1,
            cursor: refreshing
              ? "not-allowed"
              : "pointer",
          }}
        >
          {refreshing
            ? "↻ Refreshing..."
            : "↻ Refresh"}
        </button>

      </div>

      {/* ======================================
          QUICK ACTIONS
      ======================================= */}

      <div style={styles.quickActionsSection}>

        <div style={styles.quickActionsHeader}>

          <div>
            <h2 style={styles.quickActionsTitle}>
              Quick Actions
            </h2>

            <p style={styles.quickActionsSubtitle}>
              Quickly access the most common
              church management tasks.
            </p>
          </div>

        </div>

        <div style={styles.quickActionsGrid}>

          <QuickAction
            icon="👥"
            title="Add Member"
            description="Register a new church member"
            path="/admin/members"
          />

          <QuickAction
            icon="📅"
            title="Add Event"
            description="Create a church event"
            path="/admin/events"
          />

          <QuickAction
            icon="🎤"
            title="Add Sermon"
            description="Upload a new sermon"
            path="/admin/sermons"
          />

          <QuickAction
            icon="💰"
            title="Record Donation"
            description="Add a new donation"
            path="/admin/donations"
          />

          <QuickAction
            icon="📢"
            title="Announcement"
            description="Create church announcement"
            path="/admin/announcements"
          />

          <QuickAction
            icon="⚙️"
            title="Settings"
            description="Manage church settings"
            path="/admin/settings"
          />

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div style={styles.statsGrid}>

        <StatCard
          title="Members"
          value={dashboard.totalMembers}
          icon="👥"
        />

        <StatCard
          title="Events"
          value={dashboard.totalEvents}
          icon="📅"
        />

        <StatCard
          title="Sermons"
          value={dashboard.totalSermons}
          icon="🎤"
        />

        <StatCard
          title="Donations"
          value={dashboard.totalDonations}
          icon="💰"
        />

        <StatCard
          title="Announcements"
          value={dashboard.totalAnnouncements}
          icon="📢"
        />

        <StatCard
          title="Total Giving"
          value={formatMoney(
            dashboard.totalDonationAmount
          )}
          icon="💵"
        />

      </div>

      {/* ======================================
          RECENT MEMBERS
      ======================================= */}

      <PageTitle
        title="Recent Members"
        subtitle="Latest registered members"
      />

      <div style={styles.section}>

        {dashboard.recentMembers.length > 0 ? (
          <DataTable
            columns={memberColumns}
            data={dashboard.recentMembers}
          />
        ) : (
          <EmptyState
            message="No members found."
          />
        )}

      </div>

      {/* ======================================
          RECENT EVENTS
      ======================================= */}

      <PageTitle
        title="Recent Events"
        subtitle="Latest church events"
      />

      <div style={styles.section}>

        {dashboard.recentEvents.length > 0 ? (
          <DataTable
            columns={eventColumns}
            data={dashboard.recentEvents}
          />
        ) : (
          <EmptyState
            message="No events found."
          />
        )}

      </div>

      {/* ======================================
          RECENT SERMONS
      ======================================= */}

      <PageTitle
        title="Recent Sermons"
        subtitle="Latest sermons uploaded"
      />

      <div style={styles.section}>

        {dashboard.recentSermons.length > 0 ? (
          <DataTable
            columns={sermonColumns}
            data={dashboard.recentSermons}
          />
        ) : (
          <EmptyState
            message="No sermons found."
          />
        )}

      </div>

      {/* ======================================
          RECENT DONATIONS
      ======================================= */}

      <PageTitle
        title="Recent Donations"
        subtitle="Latest recorded donations"
      />

      <div style={styles.section}>

        {dashboard.recentDonations.length > 0 ? (
          <DataTable
            columns={donationColumns}
            data={dashboard.recentDonations}
          />
        ) : (
          <EmptyState
            message="No donations found."
          />
        )}

      </div>

      {/* ======================================
          RECENT ANNOUNCEMENTS
      ======================================= */}

      <PageTitle
        title="Recent Announcements"
        subtitle="Latest church announcements"
      />

      <div style={styles.section}>

        {dashboard.recentAnnouncements.length >
        0 ? (
          <DataTable
            columns={announcementColumns}
            data={
              dashboard.recentAnnouncements
            }
          />
        ) : (
          <EmptyState
            message="No announcements found."
          />
        )}

      </div>

    </Layout>
  );
}

// ==========================================
// QUICK ACTION COMPONENT
// ==========================================

function QuickAction({
  icon,
  title,
  description,
  path,
}) {
  return (
    <Link
      to={path}
      style={styles.quickAction}
    >

      <div style={styles.quickActionIcon}>
        {icon}
      </div>

      <div style={styles.quickActionContent}>

        <strong style={styles.quickActionTitle}>
          {title}
        </strong>

        <span
          style={
            styles.quickActionDescription
          }
        >
          {description}
        </span>

      </div>

      <span style={styles.quickActionArrow}>
        →
      </span>

    </Link>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
    marginBottom: 20,
  },

  refreshButton: {
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#14532d",
    padding: "11px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    whiteSpace: "nowrap",
    boxShadow:
      "0 2px 6px rgba(0,0,0,0.06)",
  },

  quickActionsSection: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 22,
    marginBottom: 30,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.04)",
  },

  quickActionsHeader: {
    marginBottom: 18,
  },

  quickActionsTitle: {
    margin: 0,
    color: "#14532d",
    fontSize: 20,
  },

  quickActionsSubtitle: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: 13,
  },

  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: 12,
  },

  quickAction: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 15,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#f8fafc",
    color: "#1f2937",
    textDecoration: "none",
    transition: "0.2s",
  },

  quickActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 9,
    background: "#dcfce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },

  quickActionContent: {
    flex: 1,
    minWidth: 0,
  },

  quickActionTitle: {
    display: "block",
    color: "#1f2937",
    fontSize: 14,
    marginBottom: 3,
  },

  quickActionDescription: {
    display: "block",
    color: "#64748b",
    fontSize: 11,
  },

  quickActionArrow: {
    color: "#15803d",
    fontSize: 18,
    fontWeight: 700,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(210px,1fr))",
    gap: 20,
    marginBottom: 35,
  },

  section: {
    marginBottom: 35,
  },
};