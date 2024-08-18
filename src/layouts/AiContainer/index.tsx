import { Outlet } from "@umijs/max";
import { ReactElement, memo } from "react";

const AiContainer = (): ReactElement | null => {
  console.log(123)
    return (
      <div>
         <Outlet />
      </div>
    );
  };
  
  export default memo(AiContainer);