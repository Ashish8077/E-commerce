import { Sidebar } from "./components";
import React, { useState } from "react";
import CreateProductPage from "./pages/CreateProductPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminProductList from "./pages/AdminProductList";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("create");

  const renderTab = () => {
    switch (activeTab) {
      case "create":
        return <CreateProductPage />;
      case "products":
        return <AdminProductList />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <CreateProductPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col w-full border">
        <main className="p-4 ">{renderTab()}</main>
      </div>
    </div>
  );
};

export default AdminPanel;
