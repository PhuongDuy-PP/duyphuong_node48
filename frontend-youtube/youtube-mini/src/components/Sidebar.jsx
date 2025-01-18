import React, { useEffect, useState } from "react";
import "../style/Sidebar.css";
import { useSidebar } from "../contexts/SidebarContext";
import { getVideoTypes } from "../api/videoService";

const Sidebar = () => {
  const { isSmallSidebar } = useSidebar();
  const [shortcutLinks, setShortcutLinks] = useState([]);

  useEffect(() => {
    getVideoTypes().then((data) => {
      setShortcutLinks(data);
    });
  }, []);

  const subscribedList = [
    { icon: "/src/assets/Jack.png", name: "Jack Nicholson", link: "#" },
    { icon: "/src/assets/simon.png", name: "Simon Baker", link: "#" },
    { icon: "/src/assets/tom.png", name: "Tom Hardy", link: "#" },
    { icon: "/src/assets/megan.png", name: "Megan Ryan", link: "#" },
    { icon: "/src/assets/cameron.png", name: "Cameron Diaz", link: "#" },
  ];

  return (
    <div className={`sidebar ${isSmallSidebar ? "small-sidebar" : ""}`}>
      <div className="shortcut-links">
        {shortcutLinks.map((link, index) => (
          <a href='#' key={index}>
            <img src={`/src/assets/${link.icon}`} alt={link.item_name} />
            <p>{link.item_name}</p>
          </a>
        ))}
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>SUBSCRIBED</h3>
        {subscribedList.map((sub, index) => (
          <a href={sub.link} key={index}>
            <img src={sub.icon} alt={sub.name} />
            <p>{sub.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
