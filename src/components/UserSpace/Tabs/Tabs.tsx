import { Nav, Tab } from "react-bootstrap";
import { Compass, People, PersonLinesFill } from "react-bootstrap-icons";
import "./Tabs.css";
import { Tabs, TabsContent, TabsList } from "~/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useTabsContext } from "../../../contexts/TabsContext";
import { useNavigate } from "react-router";
import Rooms from "../Rooms/Rooms";
import { Discover } from "../Discover/Discover";
import { Requests } from "../Requests/Requests";
import { tabsList } from "./tabsList";
type SideTabsPropsType = {};
const SideTabs: React.FC<SideTabsPropsType> = (props) => {
  const { currentEventKey, setEventKey, showSidebar } = useTabsContext();
  return (
    <Tabs
      defaultValue={currentEventKey}
      value={currentEventKey}
      className={` ${showSidebar === true ? " w-full  " : " hidden md:flex   "} flex flex-row items-start justify-start gap-2 transition-all duration-500 md:translate-x-0  md:w-[400px] h-full text-white resize-x rounded-xl z-10 shadow-[0_0px_5px_0px]  shadow-primary-500/50 focus:shadow-primary-500 `}
    >
      <TabsList className="flex flex-col items-center p-2 justify-start bg-white/[5%] h-full flex-wrap gap-4">
        {tabsList.map((tabItem, index) => {
          const Icon = tabItem.Icon;
          return (
            <TabsTrigger
              value={tabItem.value}
              className={`flex justify-center items-center rounded-md p-3 gap-2 ${currentEventKey === tabItem.value ? " shadow-primary-500/70 shadow-[0_0px_10px_3px] " : ""}`}
              onClick={() => setEventKey(tabItem.value)}
            >
              {
                <Icon
                  className={`${currentEventKey === tabItem.value ? " text-primary-500" : ""} `}
                />
              }
              {/* {tabItem.name} */}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className={`w-full  h-full p-4 `}>
        <TabsContent value="rooms">
          <Rooms />
        </TabsContent>
        <TabsContent value="discover">
          <Discover />
        </TabsContent>
        <TabsContent value="requests">
          <Requests />
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default SideTabs;
