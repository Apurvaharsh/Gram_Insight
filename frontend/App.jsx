import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { VillageList } from './pages/VillageList.jsx';
import { VillageDetail } from './pages/VillageDetail.jsx';
import { AddVillage } from './pages/AddVillage.jsx';
import { Analytics } from './pages/Analytics.jsx';
import { Approvals } from './pages/Approvals.jsx';
import { Profile } from './pages/Profile.jsx';
import { Register } from './pages/Register.jsx';
import { Forecast } from './pages/Forecast.jsx';
import { AiPlan } from './pages/AiPlan.jsx';
import { ForecastList } from './pages/ForecastList.jsx';
import { AiPlanList } from './pages/AiPlanList.jsx';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/villages" element={<VillageList />} />
          <Route path="/villages/new" element={<AddVillage />} />
          <Route path="/villages/:id" element={<VillageDetail />} />
          <Route path="/villages/:id/forecast" element={<Forecast />} />
          <Route path="/villages/:id/ai-plan" element={<AiPlan />} />
          <Route path="/forecasts" element={<ForecastList />} />
          <Route path="/ai-plans" element={<AiPlanList />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;