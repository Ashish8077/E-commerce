import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#F9FAFB",
          color: "#111827", // Tailwind gray-800
          border: "1px solid #E5E7EB", // Tailwind gray-200
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
        },
        success: {
          style: {
            background: "#ECFDF5", // light green tint
            color: "#065F46",
          },
          iconTheme: {
            primary: "#10B981",
            secondary: "#D1FAE5",
          },
        },
        error: {
          style: {
            background: "#FEF2F2", // light red tint
            color: "#991B1B",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FEE2E2",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
