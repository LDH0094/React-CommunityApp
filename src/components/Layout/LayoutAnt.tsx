import React from "react";
import {
  SmileOutlined,
  SettingFilled,
  StarFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { Divider, FloatButton, Image, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import ListView from "../ListView/ListView";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuState } from "../../atoms/menuAtom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SinglePost from "../SinglePost/SinglePost";
import LogIn from "../User/LogIn";
import QT from "../QT/QT";
import Notification from "../Notification/Notification";
import BasicNavigationMenu from "../NavigationMenu/BasicNavigationMenu";
import { Header } from "antd/es/layout/layout";

const { Content, Footer, Sider } = Layout;

const LayoutAnt: React.FC = () => {
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("홈", "1", <HomeOutlined />),
    getItem("제일한 글", "2", <StarFilled />),
    getItem("설정", "3", <SettingFilled />),
    getItem("로그인/회원정보", "4", <SmileOutlined />),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // States
  const [itemKey, setItemKey] = useRecoilState(menuState);
 //
  return (
    <BrowserRouter>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <Layout style={{minHeight:"100vh", minWidth:'100vw'}}>    
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/QT/" element={<QT/>} />
            <Route path="/notifications/*" element={<Notification/>} />
            <Route path="/users/*" element={<LogIn />} />
            <Route
              path="/posts/:id"
              element={
                <div>
                  <SinglePost />
                </div>
              }
            />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default LayoutAnt;
