import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import ManageJobs from "./pages/ManageJobs";
import JobProgress from "./pages/JobProgress";
import Contracts from "./pages/Contracts";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateJob />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-jobs"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageJobs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-progress"
          element={
            <ProtectedRoute>
              <Layout>
                <JobProgress />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contracts"
          element={
            <ProtectedRoute>
              <Layout>
                <Contracts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Layout>
                <Reviews />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
