import React from "react";
import "../style/VideoList.css";
import { useSidebar } from "../contexts/SidebarContext";

const VideoList = () => {
  const { isVideoListExpanded } = useSidebar();
  const videos = [
    { id: 1, title: "Learn Coding", thumbnail: "/src/assets/thumbnail1.png", duration: "10:30" },
    { id: 2, title: "Learn React", thumbnail: "/src/assets/thumbnail2.png", duration: "8:45" },
    { id: 3, title: "Learn JavaScript", thumbnail: "/src/assets/thumbnail3.png", duration: "12:20" },
    { id: 4, title: "Learn HTML", thumbnail: "/src/assets/thumbnail4.png", duration: "5:50" },
    { id: 5, title: "Learn CSS", thumbnail: "/src/assets/thumbnail5.png", duration: "15:00" },
    { id: 6, title: "Learn Node.js", thumbnail: "/src/assets/thumbnail6.png", duration: "9:15" },
    { id: 7, title: "Learn Vue.js", thumbnail: "/src/assets/thumbnail7.png", duration: "11:45" },
    { id: 8, title: "Learn Angular", thumbnail: "/src/assets/thumbnail8.png", duration: "14:10" },
    { id: 9, title: "Learn Python", thumbnail: "/src/assets/thumbnail5.png", duration: "16:05" },
    { id: 10, title: "Learn Django", thumbnail: "/src/assets/thumbnail6.png", duration: "13:50" },
    { id: 11, title: "Learn Flask", thumbnail: "/src/assets/thumbnail7.png", duration: "7:30" },
    { id: 12, title: "Learn Ruby on Rails", thumbnail: "/src/assets/thumbnail8.png", duration: "6:25" },
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "music", name: "Âm nhạc" },
    { id: "live", name: "Trực tiếp" },
    { id: "playlist", name: "Danh sách kết hợp" },
    { id: "news", name: "Tin tức" },
    { id: "nature", name: "Thiên nhiên" },
    { id: "animation", name: "Hoạt họa" },
    { id: "recent", name: "Mới tải lên gần đây" },
    { id: "watched", name: "Đã xem" },
    { id: "new", name: "Đề xuất mới" },
  ];

  return (
    <div className={`container ${isVideoListExpanded ? "large-container" : ""}`}>
      <div className="banner">
        <img src="/src/assets/banner.png" alt />
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${category.id === "all" ? "active" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="list-container">
        {videos.map((video) => (
          <div className="vid-list" key={video.id}>
            <a href={`/play-video/${video.id}`} className="thumbnail-container">
              <img src={video.thumbnail} alt="Thumbnail" className="thumbnail" />
              <span className="video-duration">{video.duration}</span>
            </a>
            <div className="flex-div">
              <img src="/src/assets/jack.png" alt="" />
              <div className="vid-info">
                <a href="/play-video">{video.title}</a>
                <p>Easy Tutorials</p>
                <p>15k Views &bull; 2 days ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
