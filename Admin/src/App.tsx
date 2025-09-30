import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import Dashboard from "./components/Dashboard/Dashboard";
import AccountManagement from "./components/Accounts/AccountManagement";
import JobManagement from "./components/Jobs/JobManagement";
import ProgressManagement from "./components/Progress/ManagementProgress";
import ContractManagement from "./components/Contracts/ContractManagement";
import ReputationManagement from "./components/Reputation/ReputationManagement";
import ComplaintManagement from "./components/Complaints/ComplaintManagement";
import ContentManagement from "./components/Content/ContentManagement";
import ReportsManagement from "./components/Reports/ReportsManagement";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "accounts":
        return <AccountManagement />;
      case "jobs":
        return <JobManagement />;
      case "progress":
        return <ProgressManagement />;
      case "contracts":
        return <ContractManagement />;
      case "reputation":
        return <ReputationManagement />;
      case "complaints":
        return <ComplaintManagement />;
      case "content":
        return <ContentManagement />;
      case "reports":
        return <ReportsManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={<Setup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50">
                <Sidebar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isCollapsed={sidebarCollapsed}
                  setIsCollapsed={setSidebarCollapsed}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto">{renderContent()}</main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
