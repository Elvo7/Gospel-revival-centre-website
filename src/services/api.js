import axios from "axios";

// ==========================================
// API CONFIGURATION
// ==========================================

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ==========================================
// AUTH
// ==========================================

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const register = async (user) => {
  const { data } = await api.post(
    "/auth/register",
    user
  );

  return data;
};

// ==========================================
// DASHBOARD
// ==========================================

export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");

  return data;
};

// ==========================================
// MEMBERS
// ==========================================

export const getMembers = async () => {
  const { data } = await api.get("/members");

  return Array.isArray(data) ? data : [];
};

export const addMember = async (member) => {
  const { data } = await api.post(
    "/members",
    member
  );

  return data.member;
};

export const updateMember = async (id, member) => {
  const { data } = await api.put(
    `/members/${id}`,
    member
  );

  return data.member;
};

export const deleteMember = async (id) => {
  const { data } = await api.delete(
    `/members/${id}`
  );

  return data;
};

// ==========================================
// EVENTS
// ==========================================

export const getEvents = async () => {
  const { data } = await api.get("/events");

  return Array.isArray(data) ? data : [];
};

export const addEvent = async (event) => {
  const { data } = await api.post(
    "/events",
    event
  );

  return data.event;
};

export const updateEvent = async (id, event) => {
  const { data } = await api.put(
    `/events/${id}`,
    event
  );

  return data.event;
};

export const deleteEvent = async (id) => {
  const { data } = await api.delete(
    `/events/${id}`
  );

  return data;
};

// ==========================================
// SERMONS
// ==========================================

export const getSermons = async () => {
  const { data } = await api.get("/sermons");

  return Array.isArray(data) ? data : [];
};

export const addSermon = async (sermon) => {
  const { data } = await api.post(
    "/sermons",
    sermon
  );

  return data.sermon;
};

export const updateSermon = async (id, sermon) => {
  const { data } = await api.put(
    `/sermons/${id}`,
    sermon
  );

  return data.sermon;
};

export const deleteSermon = async (id) => {
  const { data } = await api.delete(
    `/sermons/${id}`
  );

  return data;
};

// ==========================================
// ANNOUNCEMENTS
// ==========================================

export const getAnnouncements = async () => {
  const { data } = await api.get(
    "/announcements"
  );

  return Array.isArray(data) ? data : [];
};

export const addAnnouncement = async (
  announcement
) => {
  const { data } = await api.post(
    "/announcements",
    announcement
  );

  return data.announcement;
};

export const updateAnnouncement = async (
  id,
  announcement
) => {
  const { data } = await api.put(
    `/announcements/${id}`,
    announcement
  );

  return data.announcement;
};

export const deleteAnnouncement = async (id) => {
  const { data } = await api.delete(
    `/announcements/${id}`
  );

  return data;
};

// ==========================================
// DONATIONS
// ==========================================

export const getDonations = async () => {
  const { data } = await api.get(
    "/donations"
  );

  return Array.isArray(data) ? data : [];
};

export const addDonation = async (donation) => {
  const { data } = await api.post(
    "/donations",
    donation
  );

  return data.donation;
};

export const updateDonation = async (
  id,
  donation
) => {
  const { data } = await api.put(
    `/donations/${id}`,
    donation
  );

  return data.donation;
};

export const deleteDonation = async (id) => {
  const { data } = await api.delete(
    `/donations/${id}`
  );

  return data;
};

// ==========================================
// GALLERY
// ==========================================

export const getGallery = async () => {
  const { data } = await api.get(
    "/gallery"
  );

  return data.gallery || [];
};

export const uploadGalleryImage = async (
  formData
) => {
  const { data } = await api.post(
    "/gallery",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.gallery;
};

export const deleteGalleryImage = async (id) => {
  const { data } = await api.delete(
    `/gallery/${id}`
  );

  return data;
};

// ==========================================
// CHURCH SETTINGS
// ==========================================

// Admin: Get church settings
export const getSettings = async () => {
  const { data } = await api.get(
    "/settings"
  );

  return data.settings || data;
};

// Admin: Update church settings
export const updateSettings = async (
  settings
) => {
  const { data } = await api.put(
    "/settings",
    settings
  );

  return data.settings || data;
};

// Public: Get church settings
export const getPublicSettings = async () => {
  const { data } = await api.get(
    "/settings/public"
  );

  return data.settings || data;
};

// ==========================================
// ADMIN PASSWORD
// ==========================================

export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const token =
    localStorage.getItem("token");

  const { data } = await api.put(
    "/settings/admin-password",
    {
      current_password: currentPassword,
      new_password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

// ==========================================
// EXPORT AXIOS INSTANCE
// ==========================================

export default api;