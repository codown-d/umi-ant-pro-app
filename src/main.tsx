import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./pageInit.ts";
import { ConfigProvider, Table } from "antd";
import NoData from "./components/no-data/index.tsx";

createRoot(document.getElementById("AISOC")!).render(
  <StrictMode>
    <ConfigProvider prefixCls="tz-aisoc">
      <App />
    </ConfigProvider>
  </StrictMode>
);
