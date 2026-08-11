import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/settings/public";

export default function useChurchSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchSettings = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (mounted && data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Failed to load church settings:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchSettings();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    settings,
    loading,
  };
}
