const AdminHeader = () => (
  <header className="flex justify-between items-center bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 shadow px-4 py-3 ">
    <h1 className="text-xl font-semibold text-gray-800">
      Hello, John Admin 👋
    </h1>
    <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition">
      Logout
    </button>
  </header>
);

export default AdminHeader;
