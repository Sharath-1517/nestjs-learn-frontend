import React from "react";
import { Button, ConfigProvider } from "antd";

const HomePage = () => (
  <ConfigProvider>
    <Button type="primary">Button</Button>
  </ConfigProvider>
);

export default HomePage;
