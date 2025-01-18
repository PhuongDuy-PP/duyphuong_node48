import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/Navbar.css";
import { useSidebar } from "../contexts/SidebarContext";
import PopupUpload from "./PopupUpload";
import Chat from "./Chat";
import MessageList from "./MessageList";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const [isAvatarPopupVisible, setIsAvatarPopupVisible] = useState(false);
  const [isUploadPopupVisible, setIsUploadPopupVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập

  const [selectedChat, setSelectedChat] = useState(null);
  const [isMessageListVisible, setIsMessageListVisible] = useState(false);

  const [notificationCount, setNotificationCount] = useState(3); // Số lượng thông báo
  const [messageCount, setMessageCount] = useState(5); // Số lượng tin nhắn chưa đọc

  const toggleAvatarPopup = () => {
    setIsAvatarPopupVisible(!isAvatarPopupVisible);
  };

  const handleSignOut = () => {
    localStorage.removeItem("USER_LOGIN"); // Xóa thông tin đăng nhập
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  const handleUploadClick = () => {
    const userLogin = localStorage.getItem("USER_LOGIN");
    if (userLogin) {
      // Nếu đã đăng nhập
      navigate("/profile")
      setIsUploadPopupVisible(true); // Hiển thị popup upload
    } else {
      // Nếu chưa đăng nhập
      navigate("/login"); // Điều hướng đến trang login
    }
  };


  const toggleMessageList = () => {
    setIsMessageListVisible(!isMessageListVisible);
    if (!isMessageListVisible) {
      setSelectedChat(null);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setIsMessageListVisible(false); // Hide MessageList when chat is selected
    setMessageCount(0);
  };

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const userLogin = localStorage.getItem("USER_LOGIN");
    setIsLoggedIn(!!userLogin); // Cập nhật trạng thái đăng nhập

    // Xử lý sự kiện click bên ngoài để đóng popup
    const handleClickOutside = (event) => {
      const avatarPopup = document.querySelector(".popup-menu");
      const userIcon = document.querySelector(".user-icon");
      const uploadPopup = document.querySelector(".upload-popup");
      const messageList = document.querySelector('.message-list-container');

      if (
        avatarPopup &&
        !avatarPopup.contains(event.target) &&
        userIcon &&
        !userIcon.contains(event.target)
      ) {
        setIsAvatarPopupVisible(false);
      }

      if (uploadPopup && !uploadPopup.contains(event.target)) {
        setIsUploadPopupVisible(false);
      }

      if (messageList && !messageList.contains(event.target)) {
        setIsMessageListVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener khi component bị unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex-div">
        <div className="nav-left flex-div">
          <img src="/src/assets/menu.png" alt="Menu" className="menu-icon" onClick={toggleSidebar} />
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
            className="logo" />
        </div>
        <div className="nav-middle flex-div">
          <div className="search-box flex-div">
            <input type="text" placeholder="Search" />
            <img src="/src/assets/search.png" alt="Search" />
          </div>
          <img src="/src/assets/voice-search.png" alt="Mic" className="mic-icon" />
        </div>
        <div className="nav-right flex-div">
          {isLoggedIn ? (
            <>
              <img
                src="/src/assets/upload.png"
                alt="Upload"
                onClick={handleUploadClick}
                style={{ cursor: "pointer" }}
              />
              <img src="/src/assets/more.png" alt="More" />
              <div className="icon-container">
                <img src="/src/assets/notification.png" alt="Notifications" />
                {notificationCount > 0 && (
                  <span className="notification-badge">{notificationCount}</span>
                )}
              </div>
              <div className="icon-container">
                <i
                  className="fas fa-comment"
                  onClick={toggleMessageList}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#747474",
                    marginRight: "25px"
                  }}
                />
                {messageCount > 0 && (
                  <span className="message-badge">{messageCount}</span>
                )}
              </div>
              <img
                src="/src/assets/jack.png"
                alt="User"
                className="user-icon"
                onClick={toggleAvatarPopup}
                style={{ cursor: "pointer" }}
              />
              {isAvatarPopupVisible && (
                <div className="popup-menu">
                  <div className="popup-header">
                    <img
                      src="/src/assets/jack.png"
                      alt="User Avatar"
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <div className="user-name">Phương Đình</div>
                      <div className="user-link">
                        <a href="/profile" className="channel-link">Xem kênh của bạn</a>
                      </div>
                    </div>
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-user-circle"></i>Tài khoản Google
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-exchange-alt"></i>Chuyển đổi tài khoản
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-cogs"></i>YouTube Studio
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-gem"></i>Lợi ích của gói Premium
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-chart-line"></i>Giao dịch mua và gói thành viên
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-shield-alt"></i>Dữ liệu của bạn trong YouTube
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-cog"></i>Cài đặt
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-question-circle"></i>Trợ giúp
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-comment-dots"></i>Gửi ý kiến phản hồi
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-sign-out-alt"></i>
                    <span onClick={handleSignOut}>Đăng xuất</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              className="sign-in-button"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          )}
        </div>

        {isUploadPopupVisible && <PopupUpload onClose={() => setIsUploadPopupVisible(false)} />}

        {isMessageListVisible && (
          <MessageList
            onSelectChat={handleSelectChat}
            onClose={() => setIsMessageListVisible(false)}
          />
        )}

      </nav>
      {selectedChat && (
        <Chat
          chat={selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </>
  );
};

export default Navbar;
