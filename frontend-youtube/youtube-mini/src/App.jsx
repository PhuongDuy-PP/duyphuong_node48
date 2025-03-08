import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import './index.css'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import VideoList from './components/VideoList'
import PlayVideo from './components/PlayVideo'
import { SidebarProvider } from './contexts/SidebarContext'
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { ToastContainer, toast } from 'react-toastify'; // import thư viện toastify
// import css cho toastify
import 'react-toastify/dist/ReactToastify.css';
import PasswordReset from "./components/ForgotPass";
import DemoSocket from "./components/DemoSocket";

// Component App
function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Router>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </Router>
    </>

  );
}

// Component chứa logic của trang
const AppContent = () => {
  const location = useLocation();

  // Kiểm tra xem URL có phải là '/play-video' không
  const isShowSidebar = location.pathname === '/' || location.pathname === '/profile';

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Nếu không phải là trang play-video thì hiển thị sidebar */}
        {isShowSidebar && <Sidebar />}
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<VideoList />} /> {/* Trang danh sách video */}
            <Route path="/play-video/:id" element={<PlayVideo />} /> {/* Trang phát video */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgot-pass" element={<PasswordReset />} />
            <Route path="/demo-socket" element={<DemoSocket />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;