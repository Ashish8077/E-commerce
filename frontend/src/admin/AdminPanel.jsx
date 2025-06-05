import { Sidebar, AdminHeader } from "./components";
import React, { useState } from "react";
import CreateProductPage from "./pages/CreateProductPage";
import AllProductsPage from "./pages/AllProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

// const CreateProduct = () => (
//   <div className="text-gray-800 text-lg">Create Product Page</div>
// );

// const AllProducts = () => (
//   <div className="text-gray-800 text-lg">All Products Page</div>
// );

// const Analytics = () => (
//   <div className="text-gray-800 text-lg">Analytics Page</div>
// );

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("create");

  const renderTab = () => {
    switch (activeTab) {
      case "create":
        return <CreateProductPage />;
      case "products":
        return <AllProductsPage />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <CreateProductPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1">
        <main className="p-4 overflow-auto">{renderTab()}</main>
      </div>
    </div>
  );
};

export default AdminPanel;
