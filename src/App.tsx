import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import News from './pages/News'
import Store from './pages/Store'
import Live from './pages/Live'
import Profile from './pages/Profile'

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/store" element={<Store />} />
          <Route path="/live" element={<Live />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!isHome && <BottomNav />}
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
