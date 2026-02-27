import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Splash from './pages/Splash'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import FinancialInput from './pages/FinancialInput'
import Advisor from './pages/Advisor'
import ActionPlan from './pages/ActionPlan'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-gray-100 flex flex-col">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route element={<Layout />}>
            <Route path="/overview" element={<Landing />} />
            <Route path="/input" element={<FinancialInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/action-plan" element={<ActionPlan />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
