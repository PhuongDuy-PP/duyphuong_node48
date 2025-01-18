import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng điều hướng nếu đang dùng react-router
import "cropperjs/dist/cropper.css"; // Import CSS của Cropper
import { Cropper } from "react-cropper";
import "../style/UserProfile.css";
import { useSidebar } from "../contexts/SidebarContext";

const UserProfile = () => {
    const navigate = useNavigate(); // Khởi tạo hook điều hướng
    const { isVideoListExpanded } = useSidebar();
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef(null);
    const [avatar, setAvatar] = useState(null); // Hình ảnh hiển thị trong avatar
    const [tempImage, setTempImage] = useState(null); // Hình ảnh tạm để crop
    const [isCropperVisible, setIsCropperVisible] = useState(false); // Hiển thị popup crop
    const cropperRef = useRef(null);

    // Kiểm tra USER_LOGIN trong localStorage
    useEffect(() => {
        const userLogin = localStorage.getItem("USER_LOGIN");
        if (!userLogin) {
            // Chuyển hướng nếu không có USER_LOGIN
            navigate("/login");
        }
    }, [navigate]);

    // Xử lý click vào avatar hoặc camera icon
    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Xử lý khi người dùng chọn file
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result); // Load hình ảnh để crop
                setIsCropperVisible(true); // Hiển thị popup crop
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý nút OK trong popup crop
    const handleCropImage = () => {
        if (cropperRef.current) {
            const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
            setAvatar(croppedImage); // Lưu hình đã crop vào avatar
        }
        setIsCropperVisible(false); // Ẩn popup crop
    };

    // Xử lý nút Cancel trong popup crop
    const handleCancelCrop = () => {
        setIsCropperVisible(false); // Ẩn popup crop
    };

    // Xử lý khi người dùng chọn lại ảnh
    const handleReSelectImage = () => {
        setTempImage(null); // Reset lại hình ảnh tạm
        setAvatar(null); // Reset avatar
        setIsCropperVisible(false); // Ẩn popup crop
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Mở lại file input để chọn ảnh mới
        }
    };

    return (
        <div className={`container ${isVideoListExpanded ? "large-container" : ""} youtube-container`}>
            <div className="channel-header">
                {/* Avatar */}
                <div
                    className="avatar-wrapper"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="avatar" onClick={handleAvatarClick}>
                        {avatar ? <img src={avatar} alt="Avatar" /> : "P"}
                        {isHovering && (
                            <div className="camera-icon-wrapper">
                                <i className="fas fa-camera"></i>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </div>

                {/* Channel Info */}
                <div className="channel-info">
                    <h1>Phuong Dinh</h1>
                    <p>@phuoginh5385 • 1 người đăng ký • 6 video</p>
                    <p>Tìm hiểu thêm về kênh này ...xem thêm</p>
                    <div className="channel-actions">
                        <button className="btn">Tùy chỉnh kênh</button>
                        <button className="btn">Quản lý video</button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav>
                <ul>
                    <li><a href="#" className="active">Trang chủ</a></li>
                    <li><a href="#">Video</a></li>
                    <li><a href="#">Danh sách phát</a></li>
                    <li><a href="#">Cộng đồng</a></li>
                </ul>
            </nav>

            {/* Video Section */}
            <section className="videos">
                <div className="video-card">
                    <div className="video-thumbnail">
                        <div className="video-duration">1:32</div>
                    </div>
                    <div className="video-info">
                        <h3>Giới trẻ Đông Hòa - Giới thiệu và thăm Cô nhi viện Thiên...</h3>
                        <div className="video-meta">6 lượt xem • 2 tuần trước</div>
                    </div>
                </div>
            </section>

            {/* Popup crop */}
            {isCropperVisible && (
                <div className="cropper-popup">
                    <div className="cropper-container">
                        <Cropper
                            src={tempImage}
                            style={{ height: 300, width: "100%" }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            guides={false}
                            ref={cropperRef}
                        />
                        <div className="cropper-actions">
                            <button className="btn" onClick={handleCancelCrop}>
                                Cancel
                            </button>
                            <button className="btn" onClick={handleCropImage}>
                                OK
                            </button>
                            <button className="btn" onClick={handleReSelectImage}>
                                Chọn lại ảnh
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
