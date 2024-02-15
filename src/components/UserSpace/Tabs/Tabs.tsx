import './Tabs.css';
import { Tabs, TabsContent, TabsList } from '~/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { useTabsContext } from '../../../contexts/TabsContext';
import Rooms from '../Rooms/Rooms';
import { Discover } from '../Discover/Discover';
import { Requests } from '../Requests/Requests';
import { tabsList } from './tabsList';
import { Profile } from '~/components/Profile/Profile';
import { Resizable } from 're-resizable';
import { useState } from 'react';
type SideTabsPropsType = {};
const SideTabs: React.FC<SideTabsPropsType> = (props) => {
  const { currentEventKey, setEventKey, showSidebar } = useTabsContext();
  const [width, setWidth] = useState(512);

  return (
    <Resizable
      defaultSize={{
        width: 'fit-content',
        height: '100%',
      }}
      // minWidth={320}
      // maxWidth={"50%"}
      className={`${showSidebar === true ? ' w-full md:auto  ' : ' hidden md:flex '} min-w-full  max-w-full md:w-[512px] md:max-w-[50%]   md:min-w-[420px]`}
      // className={` ${showSidebar === true ? " w-full md:auto  " : " hidden md:flex   "} flex flex-row items-start justify-start gap-2 transition-all duration-500 md:translate-x-0    h-full text-white  rounded-xl z-10 shadow-[0_0px_10px_0px]  shadow-primary-500/50 hover:shadow-primary-500/90 focus:shadow-primary-500 `}
    >
      <Tabs
        defaultValue={currentEventKey}
        value={currentEventKey}
        className={`  w-full flex flex-row items-start justify-start gap-2 transition-all duration-500 md:translate-x-0    h-full text-white  rounded-xl z-10 shadow-[0_0px_10px_0px]  shadow-primary-500/50 hover:shadow-primary-500/90 focus:shadow-primary-500 `}
      >
        <TabsList className="flex flex-col items-center p-2 justify-start bg-white/[5%] h-full flex-wrap gap-4">
          {tabsList.map((tabItem, index) => {
            const Icon = tabItem.Icon;
            return (
              <TabsTrigger
                value={tabItem.value}
                key={index}
                className={`flex justify-center items-center rounded-md p-3 gap-2 ${currentEventKey === tabItem.value ? ' shadow-primary-500/70 shadow-[0_0px_10px_3px] ' : ''}`}
                onClick={() => setEventKey(tabItem.value)}
              >
                {
                  <Icon
                    className={`${currentEventKey === tabItem.value ? ' text-primary-500' : ''} `}
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
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
        </div>
      </Tabs>
    </Resizable>
  );
};
export default SideTabs;
