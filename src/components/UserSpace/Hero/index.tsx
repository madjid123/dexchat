import { useTabsContext } from "~/contexts/TabsContext";

const Hero = () => {
    const { setEventKey,setShowSidebar } = useTabsContext();
    return (
        <div className="w-full " id="hero">
            <div id="hero_content" className="flex flex-col items-center justify-center p-8 gap-2  lg:gap-4 text-wrap ">
                <div className="relative flex justify-center items-center w-2/3 ">
                    <img src="/Hero_Userspace.svg" alt="hero image" className="max-w-[256px] max-h-[256px] lg:max-w-[412px] lg:h-[412px] z-10" />
                    <div className="h-[200px] w-[200px] absolute bottom-0 left-[20%] bg-primary-400 rounded-full blur-[100px]  z-0" />

                    <div className="h-[200px] w-[200px] w- absolute top-1/6 right-1/3 bg-orange-400 rounded-full blur-[100px]  z-0" />
                    <div className="h-[200px] w-[200px] absolute  top-[20%] left-1/4 bg-emerald-400 rounded-full blur-[100px]  z-0" />
                </div>
                <h3 className=" text-2xl text-white">
                    What are you waiting for ?
                </h3>
                <h2 className="hover:text-primary-200 text-center text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-tr from-primary-500 to-tertiary-500"
                    onClick={() => {setEventKey("rooms");setShowSidebar(true)} }
                >
                    Start chatting with your friends now!
                </h2>
                <h3 className=" text-2xl text-white">
                    Or
                </h3>
                <button
                    onClick={() => {setEventKey("discover") ;setShowSidebar(true)}}
                    className="bg-gradient-to-r  from-primary-500 font-bold text-xl  via-[#C200B1] to-[#009E82] hover:bg-background hover:from-transparent hover:to-transparent  hover:bg-secondary-500 hover:text-neutral-600  text-white px-4 py-2 rounded-md hover:shadow-[0px_0px_100px_10px] hover:shadow-primary-700 ">
                    Discover
                </button>
            </div>
        </div>
    );
};
export default Hero;