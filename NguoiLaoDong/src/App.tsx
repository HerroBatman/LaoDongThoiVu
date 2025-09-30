import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PersonalProfile from "./pages/PersonalProfile";
import SkillProfile from "./pages/SkillProfile";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import WorkSchedule from "./pages/WorkSchedule";
import WorkHistory from "./pages/WorkHistory";
import EarningsReputation from "./pages/EarningsReputation";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<PersonalProfile />} />
            <Route path="/skills" element={<SkillProfile />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/schedule" element={<WorkSchedule />} />
            <Route path="/history" element={<WorkHistory />} />
            <Route path="/earnings" element={<EarningsReputation />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Support />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
