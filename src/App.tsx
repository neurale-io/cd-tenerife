import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Afiliacion from './pages/Afiliacion'
import News from './pages/News'
import Store from './pages/Store'
import Profile from './pages/Profile'

const NO_NAV_ROUTES = ['/', '/afiliacion']

function AppShell() {
  const location = useLocation()
  const showNav = !NO_NAV_ROUTES.includes(location.pathname)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/afiliacion" element={<Afiliacion />} />
          <Route path="/news" element={<News />} />
          <Route path="/store" element={<Store />} />
          <Route path="/entradas" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
