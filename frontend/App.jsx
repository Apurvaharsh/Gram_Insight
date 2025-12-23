import { React, useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { VillageList } from "./pages/VillageList.jsx";
import { VillageDetail } from "./pages/VillageDetail.jsx";
import { AddVillage } from "./pages/AddVillage.jsx";
import { Analytics } from "./pages/Analytics.jsx";
import { Approvals } from "./pages/Approvals.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Forecast } from "./pages/Forecast.jsx";
import { AiPlan } from "./pages/AiPlan.jsx";
import { ForecastList } from "./pages/ForecastList.jsx";
import { AiPlanList } from "./pages/AiPlanList.jsx";
import VillageMap from "./components/VillageMap.jsx";
import { VillageProvider } from "./context/VillageContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

function App() {
  const [villages, setVillages] = useState([]);
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const { villageAPI } = await import('./utils/api');
        const response = await villageAPI.getAll();
        if (response.success) {
          setVillages(response.data.villages || []);
        }
      } catch (err) {
        console.error('Error fetching villages:', err);
      }
    };
    fetchVillages();
  }, []);

  return (
    <AuthProvider>
      <VillageProvider>
        <HashRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/villages" element={<ProtectedRoute><VillageList /></ProtectedRoute>} />
              <Route path="/villages/new" element={<ProtectedRoute><AddVillage /></ProtectedRoute>} />
              <Route path="/villages/:id" element={<ProtectedRoute><VillageDetail /></ProtectedRoute>} />
              <Route path="/villages/:id/forecast" element={<ProtectedRoute><Forecast /></ProtectedRoute>} />
              <Route path="/villages/:id/ai-plan" element={<ProtectedRoute><AiPlan /></ProtectedRoute>} />
              <Route path="/forecasts" element={<ProtectedRoute><ForecastList /></ProtectedRoute>} />
              <Route path="/ai-plans" element={<ProtectedRoute><AiPlanList /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              
              {/* Admin Only Routes */}
              <Route path="/approvals" element={<ProtectedRoute adminOnly><Approvals /></ProtectedRoute>} />
              
              {/* Other Protected Routes */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/map" element={<ProtectedRoute><VillageMap villages={villages} /></ProtectedRoute>} />
              
              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </VillageProvider>
    </AuthProvider>
  );
}

export default App;
