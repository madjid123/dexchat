import { ReactNode, useState } from "react";
import { MyTabsContext } from "~/contexts/TabsContext";

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [currentEventKey, setCurrenEventKey] = useState("rooms");
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <MyTabsContext.Provider
      value={{
        currentEventKey: currentEventKey,
        setEventKey: setCurrenEventKey,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </MyTabsContext.Provider>
  );
};
