import { ChartNoAxesCombined, Plus, ReceiptText } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "create", label: "Create Product", icon: <Plus /> },
    { key: "products", label: "All Products", icon: <ReceiptText /> },
    { key: "analytics", label: "Analytics", icon: <ChartNoAxesCombined /> },
  ];

  return (
    <aside className="w-64 min-w-[250px] bg-gray-900 text-white flex-shrink-0 h-full">
      <div className="h-full flex flex-col p-4 space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-left p-3 rounded transition cursor-pointer flex gap-2 ${
              activeTab === tab.key ? "bg-gray-700" : "hover:bg-gray-800"
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
