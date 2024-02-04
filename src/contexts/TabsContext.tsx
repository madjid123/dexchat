import { createContext, useContext } from "react";
export type TabsContext = {
  currentEventKey: string;
  setEventKey: (value: string) => void;
  showSidebar: boolean;
  setShowSidebar(b: boolean): void;
};

export const MyTabsContext = createContext<TabsContext>({
  currentEventKey: "rooms",
  setEventKey: (value: string) => {},
  showSidebar: true,
  setShowSidebar: (b) => {},
} as TabsContext);
export const useTabsContext = () => useContext(MyTabsContext);
