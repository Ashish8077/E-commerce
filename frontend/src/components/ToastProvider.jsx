import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: "8px",
          padding: "16px",
          fontWeight: 500,
        },
        success: {
          style: {
            background: "#DCFCE7",
            color: "#065F46",
          },
        },
        error: {
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
          },
        },
        loading: {
          style: {
            background: "#DBEAFE",
            color: "#1E3A8A",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
