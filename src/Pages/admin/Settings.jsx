import { useEffect, useState } from "react";

import Layout from "../../components/admin/Layout";
import PageTitle from "../../components/admin/PageTitle";

const API_URL = "http://localhost:5000/api/settings";

export default function Settings() {
  const [activeTab, setActiveTab] =
    useState("church");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [settings, setSettings] =
    useState({
      church_name:
        "Gospel Revival Centre",

      church_tagline:
        "Reviving Lives Through the Gospel",

      pastor_name: "",

      phone: "",

      email: "",

      address: "",

      website: "",

      sunday_service: "",

      midweek_service: "",

      prayer_service: "",

      facebook: "",

      instagram: "",

      youtube: "",

      tiktok: "",
    });

  const [passwords, setPasswords] =
    useState({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

  // ==========================================
  // LOAD SETTINGS
  // ==========================================

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        API_URL
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load settings"
        );
      }

      if (data.settings) {
        setSettings({
          church_name:
            data.settings.church_name ||
            "",

          church_tagline:
            data.settings.church_tagline ||
            "",

          pastor_name:
            data.settings.pastor_name ||
            "",

          phone:
            data.settings.phone || "",

          email:
            data.settings.email || "",

          address:
            data.settings.address || "",

          website:
            data.settings.website || "",

          sunday_service:
            data.settings.sunday_service ||
            "",

          midweek_service:
            data.settings.midweek_service ||
            "",

          prayer_service:
            data.settings.prayer_service ||
            "",

          facebook:
            data.settings.facebook || "",

          instagram:
            data.settings.instagram || "",

          youtube:
            data.settings.youtube || "",

          tiktok:
            data.settings.tiktok || "",
        });
      }
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // HANDLE SETTINGS CHANGE
  // ==========================================

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ==========================================
  // SAVE CHURCH SETTINGS
  // ==========================================

  async function saveSettings(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(
        API_URL,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(settings),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save settings"
        );
      }

      setSettings({
        ...settings,
        ...(data.settings || {}),
      });

      setMessage(
        "Church settings saved successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to save settings"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // HANDLE PASSWORD CHANGE
  // ==========================================

  function handlePasswordChange(e) {
    const {
      name,
      value,
    } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  async function changePassword(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !passwords.current_password
    ) {
      setError(
        "Enter your current password."
      );
      return;
    }

    if (
      !passwords.new_password
    ) {
      setError(
        "Enter your new password."
      );
      return;
    }

    if (
      passwords.new_password.length < 6
    ) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (
      passwords.new_password !==
      passwords.confirm_password
    ) {
      setError(
        "New passwords do not match."
      );
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setError(
          "Your session has expired. Please log in again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/admin-password`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            current_password:
              passwords.current_password,

            new_password:
              passwords.new_password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to change password"
        );
      }

      setPasswords({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      setMessage(
        "Password changed successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div style={styles.loading}>
          Loading settings...
        </div>
      </Layout>
    );
  }

  // ==========================================
  // SETTINGS PAGE
  // ==========================================

  return (
    <Layout>

      <PageTitle
        title="Settings"
        subtitle="Manage Gospel Revival Centre information and administrator account"
      />

      {/* ======================================
          MESSAGES
      ======================================= */}

      {message && (
        <div style={styles.success}>
          ✅ {message}
        </div>
      )}

      {error && (
        <div style={styles.error}>
          ❌ {error}
        </div>
      )}

      {/* ======================================
          SETTINGS CONTAINER
      ======================================= */}

      <div style={styles.container}>

        {/* ====================================
            SIDEBAR
        ==================================== */}

        <div style={styles.tabs}>

          <button
            type="button"
            onClick={() =>
              setActiveTab("church")
            }
            style={{
              ...styles.tab,
              ...(activeTab === "church"
                ? styles.activeTab
                : {}),
            }}
          >
            🏛️ Church Information
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("services")
            }
            style={{
              ...styles.tab,
              ...(activeTab === "services"
                ? styles.activeTab
                : {}),
            }}
          >
            ⛪ Services
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("social")
            }
            style={{
              ...styles.tab,
              ...(activeTab === "social"
                ? styles.activeTab
                : {}),
            }}
          >
            🌐 Website & Social
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("admin")
            }
            style={{
              ...styles.tab,
              ...(activeTab === "admin"
                ? styles.activeTab
                : {}),
            }}
          >
            🔐 Admin Account
          </button>

        </div>

        {/* ====================================
            CONTENT
        ==================================== */}

        <div style={styles.content}>

          {/* ==================================
              CHURCH INFORMATION
          ================================== */}

          {activeTab === "church" && (
            <form
              onSubmit={saveSettings}
            >
              <SectionHeader
                title="Church Information"
                description="Basic information displayed across the church website."
              />

              <div style={styles.formGrid}>

                <Input
                  label="Church Name"
                  name="church_name"
                  value={
                    settings.church_name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Input
                  label="Church Tagline"
                  name="church_tagline"
                  value={
                    settings.church_tagline
                  }
                  onChange={
                    handleChange
                  }
                />

                <Input
                  label="Pastor / Church Leader"
                  name="pastor_name"
                  value={
                    settings.pastor_name
                  }
                  onChange={
                    handleChange
                  }
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={
                    settings.phone
                  }
                  onChange={
                    handleChange
                  }
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={
                    settings.email
                  }
                  onChange={
                    handleChange
                  }
                />

                <Input
                  label="Website"
                  name="website"
                  value={
                    settings.website
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://example.com"
                />

              </div>

              <Textarea
                label="Church Address"
                name="address"
                value={
                  settings.address
                }
                onChange={
                  handleChange
                }
              />

              <SaveButton
                saving={saving}
              />
            </form>
          )}

          {/* ==================================
              SERVICES
          ================================== */}

          {activeTab === "services" && (
            <form
              onSubmit={saveSettings}
            >
              <SectionHeader
                title="Service Information"
                description="Set the service information shown to church visitors."
              />

              <Textarea
                label="Sunday Service"
                name="sunday_service"
                value={
                  settings.sunday_service
                }
                onChange={
                  handleChange
                }
                placeholder="Sunday - 8:30 AM to 12:30 PM"
              />

              <Textarea
                label="Midweek Service"
                name="midweek_service"
                value={
                  settings.midweek_service
                }
                onChange={
                  handleChange
                }
                placeholder="Wednesday - 5:30 PM"
              />

              <Textarea
                label="Prayer Service"
                name="prayer_service"
                value={
                  settings.prayer_service
                }
                onChange={
                  handleChange
                }
                placeholder="Friday - 6:00 PM"
              />

              <SaveButton
                saving={saving}
              />
            </form>
          )}

          {/* ==================================
              SOCIAL MEDIA
          ================================== */}

          {activeTab === "social" && (
            <form
              onSubmit={saveSettings}
            >
              <SectionHeader
                title="Website & Social Media"
                description="Manage the church website and social media links."
              />

              <div style={styles.formGrid}>

                <Input
                  label="Website"
                  name="website"
                  value={
                    settings.website
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://example.com"
                />

                <Input
                  label="Facebook"
                  name="facebook"
                  value={
                    settings.facebook
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://facebook.com/..."
                />

                <Input
                  label="Instagram"
                  name="instagram"
                  value={
                    settings.instagram
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://instagram.com/..."
                />

                <Input
                  label="YouTube"
                  name="youtube"
                  value={
                    settings.youtube
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://youtube.com/..."
                />

                <Input
                  label="TikTok"
                  name="tiktok"
                  value={
                    settings.tiktok
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://tiktok.com/@..."
                />

              </div>

              <SaveButton
                saving={saving}
              />
            </form>
          )}

          {/* ==================================
              ADMIN ACCOUNT
          ================================== */}

          {activeTab === "admin" && (
            <form
              onSubmit={changePassword}
            >
              <SectionHeader
                title="Admin Account"
                description="Change the password for your current administrator account."
              />

              <div style={styles.securityNotice}>
                🔒 Your password is securely
                hashed before it is stored in
                the database.
              </div>

              <Input
                label="Current Password"
                name="current_password"
                type="password"
                value={
                  passwords.current_password
                }
                onChange={
                  handlePasswordChange
                }
                required
              />

              <Input
                label="New Password"
                name="new_password"
                type="password"
                value={
                  passwords.new_password
                }
                onChange={
                  handlePasswordChange
                }
                required
              />

              <Input
                label="Confirm New Password"
                name="confirm_password"
                type="password"
                value={
                  passwords.confirm_password
                }
                onChange={
                  handlePasswordChange
                }
                required
              />

              <button
                type="submit"
                disabled={saving}
                style={{
                  ...styles.saveButton,
                  opacity: saving
                    ? 0.7
                    : 1,
                }}
              >
                {saving
                  ? "Changing Password..."
                  : "Change Password"}
              </button>
            </form>
          )}

        </div>
      </div>

    </Layout>
  );
}

// ==========================================
// SECTION HEADER
// ==========================================

function SectionHeader({
  title,
  description,
}) {
  return (
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>
        {title}
      </h2>

      <p style={styles.sectionDescription}>
        {description}
      </p>
    </div>
  );
}

// ==========================================
// INPUT
// ==========================================

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={styles.input}
      />
    </div>
  );
}

// ==========================================
// TEXTAREA
// ==========================================

function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        style={{
          ...styles.input,
          resize: "vertical",
        }}
      />
    </div>
  );
}

// ==========================================
// SAVE BUTTON
// ==========================================

function SaveButton({
  saving,
}) {
  return (
    <button
      type="submit"
      disabled={saving}
      style={{
        ...styles.saveButton,
        opacity: saving
          ? 0.7
          : 1,
      }}
    >
      {saving
        ? "Saving..."
        : "Save Settings"}
    </button>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  loading: {
    background: "#fff",
    borderRadius: 12,
    padding: 40,
    textAlign: "center",
    color: "#64748b",
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    border: "1px solid #86efac",
    padding: "14px 18px",
    borderRadius: 8,
    marginBottom: 20,
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    padding: "14px 18px",
    borderRadius: 8,
    marginBottom: 20,
  },

  container: {
    display: "grid",
    gridTemplateColumns:
      "240px minmax(0, 1fr)",
    gap: 20,
    alignItems: "start",
  },

  tabs: {
    background: "#fff",
    borderRadius: 12,
    padding: 10,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.04)",
  },

  tab: {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: "14px 12px",
    textAlign: "left",
    borderRadius: 8,
    color: "#475569",
    fontSize: 14,
    cursor: "pointer",
    marginBottom: 4,
  },

  activeTab: {
    background: "#dcfce7",
    color: "#14532d",
    fontWeight: 700,
  },

  content: {
    background: "#fff",
    borderRadius: 12,
    padding: 28,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.04)",
  },

  sectionHeader: {
    marginBottom: 25,
  },

  sectionTitle: {
    margin: 0,
    color: "#14532d",
    fontSize: 22,
  },

  sectionDescription: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 14,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 18,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    display: "block",
    marginBottom: 7,
    fontWeight: 600,
    color: "#374151",
    fontSize: 14,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#fff",
    fontSize: 14,
    outline: "none",
  },

  saveButton: {
    background: "#166534",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 5,
  },

  securityNotice: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#166534",
    padding: 14,
    borderRadius: 8,
    marginBottom: 22,
    fontSize: 13,
  },
};