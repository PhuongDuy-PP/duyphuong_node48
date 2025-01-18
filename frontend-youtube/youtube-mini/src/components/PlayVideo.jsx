import React from "react";
import "../style/PlayVideo.css";

const PlayVideo = () => {

  const videoData = [
    { id: 1, title: "Best channel that helps you to be a web developer", thumbnail: "/src/assets/thumbnail1.png", views: "15k", duration: "10:30" },
    { id: 2, title: "Learn Web Development", thumbnail: "/src/assets/thumbnail2.png", views: "12k", duration: "8:45" },
    { id: 3, title: "HTML Basics", thumbnail: "/src/assets/thumbnail3.png", views: "18k", duration: "7:20" },
    { id: 4, title: "CSS Tips and Tricks", thumbnail: "/src/assets/thumbnail4.png", views: "9k", duration: "14:00" },
    { id: 5, title: "JavaScript Essentials", thumbnail: "/src/assets/thumbnail5.png", views: "20k", duration: "12:35" },
    { id: 6, title: "React.js Tutorial", thumbnail: "/src/assets/thumbnail6.png", views: "25k", duration: "15:10" },
    { id: 7, title: "Node.js Basics", thumbnail: "/src/assets/thumbnail7.png", views: "10k", duration: "9:50" },
    { id: 8, title: "Full-Stack Roadmap", thumbnail: "/src/assets/thumbnail8.png", views: "30k", duration: "16:45" },
  ];
  return (
    <div>

      <div className="container play-container">
        <div className="row">
          <div className="play-video">
            <video controls autoPlay muted>
              <source src="/src/assets/video.mp4" type="video/mp4" />
            </video>
            <div className="tags">
              <a href="#">#Coding</a> <a href="#">#HTML</a> <a href="#">#CSS</a> <a href="#">#JavaScript</a>
            </div>
            <h3>Best YouTube Channel To Learn Web Development</h3>
            <div className="play-video-info">
              <p>1525 Views  • 2 days ago</p>
              <div>
                <a href="#"><img src="/src/assets/like.png" alt />125</a>
                <a href="#"><img src="/src/assets/dislike.png" alt />2</a>
                <a href="#"><img src="/src/assets/share.png" alt />Share</a>
                <a href="#"><img src="/src/assets/save.png" alt />Save</a>
              </div>
            </div>
            <hr />
            <div className="publisher">
              <img src="/src/assets/jack.png" alt />
              <div>
                <p>Easy Tutorials</p>
                <span>500k Subscribers</span>
              </div>
              <button type="button">Subscribe</button>
            </div>
            <div className="vid-description">
              <p>Channel that makes learning Easy</p>
              <p>Subscribe Easy Tutorials to watch more tutorials on web development</p>
              <hr />
              <h4>134 Comments</h4>
              <div className="add-comment">
                <img src="/src/assets/jack.png" alt />
                <input type="text" placeholder="Write comments.." />
              </div>
              <div className="old-comment">
                <img src="/src/assets/jack.png" alt />
                <div>
                  <h3>Jack Nicholson <span>2 days ago</span></h3>
                  <p>A global computer network providing a variety of information and communication facilities, consisting
                    of interconnected networks using standardized communication protocols.</p>
                  <div className="comment-action">
                    <img src="/src/assets/like.png" alt />
                    <span>244</span>
                    <img src="/src/assets/dislike.png" alt />
                    <span>2</span>
                    <span>REPLY</span>
                    <a href="$">All replies</a>
                  </div>
                </div>
              </div>
              <div className="old-comment">
                <img src="/src/assets/jack.png" alt />
                <div>
                  <h3>Jack Nicholson <span>2 days ago</span></h3>
                  <p>A global computer network providing a variety of information and communication facilities, consisting
                    of interconnected networks using standardized communication protocols.</p>
                  <div className="comment-action">
                    <img src="/src/assets/like.png" alt />
                    <span>244</span>
                    <img src="/src/assets/dislike.png" alt />
                    <span>2</span>
                    <span>REPLY</span>
                    <a href="$">All replies</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-sidebar">
            {videoData.map((video) => (
              <div className="side-video-list" key={video.id}>
                <a href="#" className="small-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <span className="video-duration">{video.duration}</span>
                </a>
                <div className="vid-info">
                  <a href="#">{video.title}</a>
                  <p>Easy Tutorials</p>
                  <p>{video.views} Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
