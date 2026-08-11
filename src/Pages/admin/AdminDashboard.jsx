import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Layout from "../../components/admin/Layout";
import PageTitle from "../../components/admin/PageTitle";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";

import { getDashboard } from "../../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard(showRefresh = false) {
    try {
      if (showRefresh) {
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
        totalDonationAmount: data.totalDonationAmount || 0,
        totalAnnouncements: data.totalAnnouncements || 0,
        recentMembers: data.recentMembers || [],
        recentEvents: data.recentEvents || [],
        recentSermons: data.recentSermons || [],
        recentDonations: data.recentDonations || [],
        recentAnnouncements: data.recentAnnouncements || [],
      });
    } catch (err) {
      console.error("❌ Failed to load dashboard:", err);

      if (!dashboard) {
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
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  const formatMoney = (amount) => {
    return `KES ${Number(amount || 0).toLocaleString("en-KE")}`;
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitial = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <PageTitle
            title="Dashboard"
            subtitle="Welcome back. Here's what's happening at Gospel Revival Centre."
          />
        </div>

        <button
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
          style={{
            ...styles.refreshButton,
            opacity: refreshing ? 0.7 : 1,
            cursor: refreshing ? "not-allowed" : "pointer",
          }}
        >
          {refreshing ? "↻ Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.quickActionsCard}>
        <div style={styles.quickHeader}>
          <div>
            <h3 style={styles.quickTitle}>Quick Actions</h3>
            <p style={styles.quickSubtitle}>Quickly manage your church activities.</p>
          </div>
        </div>

        <div style={styles.quickActions}>
          <QuickAction to="/admin/members" icon="👥" label="Add Member" />
          <QuickAction to="/admin/events" icon="📅" label="Add Event" />
          <QuickAction to="/admin/sermons" icon="🎤" label="Add Sermon" />
          <QuickAction to="/admin/donations" icon="💰" label="Record Donation" />
          <QuickAction to="/admin/announcements" icon="📢" label="Announcement" />
          <QuickAction to="/admin/settings" icon="⚙️" label="Settings" />
        </div>
      </div>

      {/* STATISTICS */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Members" value={dashboard.totalMembers} icon="👥" color="#166534" />
        <StatCard title="Events" value={dashboard.totalEvents} icon="📅" color="#1d4ed8" />
        <StatCard title="Sermons" value={dashboard.totalSermons} icon="🎤" color="#7c3aed" />
        <StatCard title="Donations" value={dashboard.totalDonations} icon="💰" color="#b45309" />
        <StatCard title="Announcements" value={dashboard.totalAnnouncements} icon="📢" color="#dc2626" />
      </div>

      {/* TOTAL GIVING + ANNOUNCEMENTS */}
      <div style={styles.topGrid}>
        <div style={styles.givingCard}>
          <div style={styles.givingIcon}>💵</div>
          <div>
            <p style={styles.givingLabel}>Total Giving</p>
            <h2 style={styles.givingAmount}>{formatMoney(dashboard.totalDonationAmount)}</h2>
            <p style={styles.givingDescription}>
              From {dashboard.totalDonations} recorded donations
            </p>
          </div>
          <NavLink to="/admin/donations" style={styles.givingLink}>
            View Donations →
          </NavLink>
        </div>

        <div style={styles.announcementSummary}>
          <div style={styles.summaryHeader}>
            <div>
              <h3 style={styles.summaryTitle}>Announcements</h3>
              <p style={styles.summarySubtitle}>Latest church updates</p>
            </div>
            <div style={styles.announcementCount}>{dashboard.totalAnnouncements}</div>
          </div>

          {dashboard.recentAnnouncements.length > 0 ? (
            <div>
              {dashboard.recentAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} style={styles.announcementItem}>
                  <span style={styles.dot}></span>
                  <div>
                    <strong style={{ display: "block", fontSize: 13, color: "#334155" }}>
                      {announcement.title || "Untitled announcement"}
                    </strong>
                    <small style={{ display: "block", marginTop: 3, color: "#94a3b8" }}>
                      {formatDate(announcement.created_at)}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No announcements yet." />
          )}

          <NavLink to="/admin/announcements" style={styles.viewLink}>
            View all announcements →
          </NavLink>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.contentGrid}>
        <DashboardCard
          title="Recent Members"
          subtitle="Latest people registered"
          icon="👥"
          link="/admin/members"
          linkText="View members"
        >
          {dashboard.recentMembers.length > 0 ? (
            dashboard.recentMembers.slice(0, 5).map((member) => (
              <div key={member.id} style={styles.memberItem}>
                <div style={styles.avatar}>{getInitial(member.full_name)}</div>
                <div style={styles.itemContent}>
                  <strong style={styles.itemTitle}>{member.full_name || "Unnamed member"}</strong>
                  <span style={styles.itemSubtitle}>{member.email || "No email"}</span>
                </div>
                <span style={styles.dateText}>{formatDate(member.created_at)}</span>
              </div>
            ))
          ) : (
            <EmptyState message="No members found." />
          )}
        </DashboardCard>

        <DashboardCard
          title="Events"
          subtitle="Latest church events"
          icon="📅"
          link="/admin/events"
          linkText="View events"
        >
          {dashboard.recentEvents.length > 0 ? (
            dashboard.recentEvents.slice(0, 5).map((event) => (
              <div key={event.id} style={styles.eventItem}>
                <div style={styles.dateBox}>
                  <strong>{getDay(event.event_date)}</strong>
                  <span>{getMonth(event.event_date)}</span>
                </div>
                <div style={styles.itemContent}>
                  <strong style={styles.itemTitle}>
                    {event.title || event.name || "Untitled event"}
                  </strong>
                  <span style={styles.itemSubtitle}>{formatDate(event.event_date)}</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No events found." />
          )}
        </DashboardCard>

        <DashboardCard
          title="Recent Sermons"
          subtitle="Latest messages"
          icon="🎤"
          link="/admin/sermons"
          linkText="View sermons"
        >
          {dashboard.recentSermons.length > 0 ? (
            dashboard.recentSermons.slice(0, 5).map((sermon) => (
              <div key={sermon.id} style={styles.sermonItem}>
                <div style={styles.sermonIcon}>▶</div>
                <div style={styles.itemContent}>
                  <strong style={styles.itemTitle}>{sermon.title || "Untitled sermon"}</strong>
                  <span style={styles.itemSubtitle}>{sermon.preacher || "Unknown preacher"}</span>
                </div>
                <span style={styles.dateText}>{formatDate(sermon.sermon_date)}</span>
              </div>
            ))
          ) : (
            <EmptyState message="No sermons found." />
          )}
        </DashboardCard>

        <DashboardCard
          title="Recent Donations"
          subtitle="Latest giving activity"
          icon="💰"
          link="/admin/donations"
          linkText="View donations"
        >
          {dashboard.recentDonations.length > 0 ? (
            dashboard.recentDonations.slice(0, 5).map((donation) => (
              <div key={donation.id} style={styles.donationItem}>
                <div style={styles.avatar}>
                  {getInitial(donation.donor_name || donation.name || "D")}
                </div>
                <div style={styles.itemContent}>
                  <strong style={styles.itemTitle}>
                    {donation.donor_name || donation.name || "Anonymous"}
                  </strong>
                  <span style={styles.itemSubtitle}>{formatDate(donation.created_at)}</span>
                </div>
                <strong style={styles.amount}>{formatMoney(donation.amount)}</strong>
              </div>
            ))
          ) : (
            <EmptyState message="No donations found." />
          )}
        </DashboardCard>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: `${color}15` }}>{icon}</div>
      <div>
        <p style={styles.statTitle}>{title}</p>
        <h2 style={{ ...styles.statValue, color }}>{value}</h2>
      </div>
    </div>
  );
}

function DashboardCard({ title, subtitle, icon, link, linkText, children }) {
  return (
    <div style={styles.dashboardCard}>
      <div style={styles.cardHeader}>
        <div style={styles.cardHeading}>
          <div style={styles.cardIcon}>{icon}</div>
          <div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardSubtitle}>{subtitle}</p>
          </div>
        </div>
        <NavLink to={link} style={styles.cardLink}>
          {linkText} →
        </NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
}

function QuickAction({ to, icon, label }) {
  return (
    <NavLink to={to} style={styles.quickAction}>
      <span style={styles.quickIcon}>{icon}</span>
      <span>{label}</span>
      <span style={styles.arrow}>→</span>
    </NavLink>
  );
}

function getDay(date) {
  if (!date) return "--";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "--";
  return parsed.getDate();
}

function getMonth(date) {
  if (!date) return "---";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "---";
  return parsed.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

const styles = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 15 },
  refreshButton: { background: "#ffffff", border: "1px solid #d1d5db", color: "#14532d", padding: "11px 18px", borderRadius: 9, fontSize: 14, fontWeight: 700, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", whiteSpace: "nowrap" },
  quickActionsCard: { background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20, marginBottom: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  quickHeader: { marginBottom: 15 },
  quickTitle: { margin: 0, fontSize: 17, color: "#1f2937" },
  quickSubtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 12 },
  quickActions: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 },
  quickAction: { display: "flex", alignItems: "center", gap: 9, padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: 9, color: "#334155", textDecoration: "none", fontSize: 13, fontWeight: 600, background: "#f8fafc", transition: "0.2s" },
  quickIcon: { fontSize: 18 },
  arrow: { marginLeft: "auto", color: "#15803d" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 22 },
  statCard: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 19, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  statIcon: { width: 46, height: 46, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 },
  statTitle: { margin: 0, fontSize: 12, color: "#64748b", fontWeight: 500 },
  statValue: { margin: "4px 0 0", fontSize: 24, fontWeight: 700 },
  topGrid: { display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 20, marginBottom: 22 },
  givingCard: { background: "linear-gradient(135deg,#14532d,#166534)", color: "#fff", borderRadius: 14, padding: 24, display: "flex", alignItems: "center", gap: 18, minHeight: 125, boxSizing: "border-box" },
  givingIcon: { width: 54, height: 54, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, flexShrink: 0 },
  givingLabel: { margin: 0, fontSize: 13, opacity: 0.8 },
  givingAmount: { margin: "4px 0", fontSize: 28 },
  givingDescription: { margin: 0, fontSize: 12, opacity: 0.75 },
  givingLink: { marginLeft: "auto", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" },
  announcementSummary: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 21, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  summaryHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  summaryTitle: { margin: 0, fontSize: 17, color: "#1f2937" },
  summarySubtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 12 },
  announcementCount: { width: 35, height: 35, borderRadius: 10, background: "#dcfce7", color: "#166534", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  announcementItem: { display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f5f9" },
  dot: { width: 7, height: 7, borderRadius: "50%", background: "#15803d", marginTop: 6, flexShrink: 0 },
  viewLink: { display: "block", marginTop: 12, color: "#15803d", fontSize: 13, textDecoration: "none", fontWeight: 600 },
  contentGrid: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20, marginBottom: 25 },
  dashboardCard: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 21, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", minWidth: 0 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, paddingBottom: 14, marginBottom: 3, borderBottom: "1px solid #f1f5f9" },
  cardHeading: { display: "flex", alignItems: "center", gap: 11 },
  cardIcon: { width: 37, height: 37, borderRadius: 9, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 },
  cardTitle: { margin: 0, fontSize: 16, color: "#1f2937" },
  cardSubtitle: { margin: "3px 0 0", color: "#94a3b8", fontSize: 11 },
  cardLink: { color: "#15803d", textDecoration: "none", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },
  memberItem: { display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f1f5f9" },
  eventItem: { display: "flex", alignItems: "center", gap: 13, padding: "11px 0", borderBottom: "1px solid #f1f5f9" },
  sermonItem: { display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f1f5f9" },
  donationItem: { display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f1f5f9" },
  avatar: { width: 38, height: 38, borderRadius: "50%", background: "#dcfce7", color: "#166534", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 },
  dateBox: { width: 43, height: 47, borderRadius: 8, background: "#eff6ff", color: "#1d4ed8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sermonIcon: { width: 38, height: 38, borderRadius: 9, background: "#f3e8ff", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },
  itemContent: { flex: 1, minWidth: 0 },
  itemTitle: { display: "block", fontSize: 13, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  itemSubtitle: { display: "block", marginTop: 3, fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  dateText: { fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap" },
  amount: { color: "#15803d", fontSize: 13, whiteSpace: "nowrap" },
};