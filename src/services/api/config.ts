export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://v2.api.noroff.dev/",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/register",
      LOGIN: "auth/login",
    },
    PRODUCTS: {
      ALL: "online-shop",
      SINGLE: (id: string) => `online-shop/${id}`,
    },
  },
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
