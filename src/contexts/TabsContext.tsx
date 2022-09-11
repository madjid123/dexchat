import { createContext, useContext } from "react"
export type TabsContext = {
    currentEventKey: string,
    setEventKey: (value: string) => void
}


export const MyTabsContext = createContext<TabsContext>({
    currentEventKey: "rooms", setEventKey: (value: string) => { }
} as TabsContext)
export const useTabsContext = () => useContext(MyTabsContext)