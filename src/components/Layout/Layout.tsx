import { PropsWithChildren, ReactNode } from "react";
import Header from "../Header/Header";
import SideTabs from "../UserSpace/Tabs/Tabs";
import { useAuthSelector } from "~/features/user/authSlice";
import { cn } from "~/lib/utils";
type LayoutProps = {
  children?: ReactNode;
  className?: string;
};
export const Layout: React.FC<LayoutProps> = (props) => {
  const { isAuth } = useAuthSelector();
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-full     from-neutral-900 to-slate-800 bg-gradient-to-br text-primary-foreground bg-no-repeat bg-cover bg-center  ",

        props.className
      )}
      // style={{ height: "fit-content" }}
    >
      <Header show={false} handleShow={() => {}}></Header>
      {props.children}
    </div>
  );
};
export default Layout;
