import { Outlet } from "@umijs/max";
import { ReactElement, memo } from "react";

const AiContainer = (): ReactElement | null => {
    return (
      <div>
         <Outlet />
      </div>
    );
  };
  
  export default memo(AiContainer);