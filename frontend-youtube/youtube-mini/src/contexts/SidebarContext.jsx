import React, {createContext, useState, useContext} from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({children}) => {
    const [isSmallSidebar, setIsSmallSidebar] = useState(false);

    const [isVideoListExpanded, setIsVideoListExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsSmallSidebar(!isSmallSidebar);
        setIsVideoListExpanded(!isSmallSidebar); // Khi sidebar thu nhỏ, video list sẽ phóng to theo
    };

    return (
        <SidebarContext.Provider value = {{isSmallSidebar, toggleSidebar, isVideoListExpanded}} >
            {children}
        </SidebarContext.Provider>
    );
}