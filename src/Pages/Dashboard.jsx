import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import StatCard from "../../components/admin/StatCard";
import { getDashboard, getMembers } from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    sermons: 0,
    donations: 0,
    gallery: 0,
    announcements: 0,
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const dashboard = await getDashboard();
      setStats(dashboard);

      const memberData = await getMembers();
      setMembers(memberData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <div className="stats-grid">
        <StatCard title="Members" value={stats.members} icon="👥" />
        <StatCard title="Events" value={stats.events} icon="📅" />
        <StatCard title="Sermons" value={stats.sermons} icon="🎤" />
        <StatCard title="Donations" value={stats.donations} icon="💰" />
        <StatCard title="Gallery" value={stats.gallery} icon="🖼️" />
        <StatCard
          title="Announcements"
          value={stats.announcements}
          icon="📢"
        />
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.08)",
        }}
      >
        <h2>Recent Members</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {members.slice(0, 5).map((member) => (
              <tr key={member.id}>
                <td>{member.full_name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}