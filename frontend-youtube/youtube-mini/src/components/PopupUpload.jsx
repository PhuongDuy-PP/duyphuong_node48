import React, { useState, useRef } from "react";
import "../style/PopupUpload.css";

const PopupUpload = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragging, setDragging] = useState(false);

    const fileInputRef = useRef(null); // Dùng useRef để tham chiếu tới input file

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    // Handle drag leave
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Trigger file input when clicking the upload icon
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Kích hoạt input file ẩn
        }
    };

    return (
        <div className="upload-popup-overlay" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div
                className={`upload-popup ${dragging ? "dragging" : ""}`}
                onDragLeave={handleDragLeave}
            >
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <div className="upload-content">
                    {!selectedFile ? (
                        <>
                            <div className="upload-box">
                                <div className="upload-icon" onClick={handleIconClick}>
                                    <i className="fas fa-upload"></i> {/* Font Awesome Upload Icon */}
                                </div>
                                <p className="upload-title">Kéo và thả tệp video để tải lên</p>
                                <p className="upload-subtitle">
                                    Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.
                                </p>
                                <label className="upload-btn">
                                    Chọn tệp
                                    <input
                                        type="file"
                                        ref={fileInputRef} // Gắn ref cho input
                                        onChange={handleFileSelect}
                                        accept="video/*"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        </>
                    ) : (
                        <div className="file-info">
                            <p className="file-name">Tệp được chọn: {selectedFile.name}</p>
                            <button
                                className="upload-btn"
                                onClick={() => {
                                    console.log("File uploaded:", selectedFile);
                                    setSelectedFile(null);
                                    onClose();
                                }}
                            >
                                Tải lên
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopupUpload;
