import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Diagnosis from './pages/Diagnosis'
import IdeationFormPage from './pages/IdeationFormPage'
import Landing from './pages/Landing'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/diagnosis/:businessId/:stage"
            element={
              <PrivateRoute>
                <Diagnosis />
              </PrivateRoute>
            }
          />
          <Route
            path="/ideation/:businessId"
            element={
              <PrivateRoute>
                <IdeationFormPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App