import React from 'react';
import { SmileOutlined, SettingFilled, StarFilled, HomeOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';
import logo from '../logo.svg'
import type { MenuProps } from 'antd';
import ListView from '../ListView/ListView';
import { useRecoilState } from 'recoil';
import { menuState } from '../../atoms/menuAtom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import SinglePost from '../SinglePost/SinglePost';

const { Header, Content, Footer, Sider } = Layout;

const LayoutAnt: React.FC = () => {


  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon, 
      children,
      label,
      type
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('홈', '1', <HomeOutlined/>),
    getItem('제일한 글', '2', <StarFilled/> ),
    getItem('설정', '3', <SettingFilled/>),
    getItem('로그인/회원정보', '4', <SmileOutlined/> )
  ]


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  // States
  const [itemKey, setItemKey] = useRecoilState(menuState)





  return (
    <BrowserRouter>
    <Layout style={{height:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <img src={logo} alt="Logo" />; */}
        <Menu theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}>
            <Menu.Item key ='1'>
                <HomeOutlined/>
                <span>홈</span>
                <Link to='/'/>
            </Menu.Item>
            <Menu.Item key ='2'>
                <StarFilled/>
                <span>큐티</span>
                <Link to='/QT'/>
            </Menu.Item>
            <Menu.Item key ='3'>
                <SettingFilled/>
                <span>설정</span>
                <Link to='/settings'/>
            </Menu.Item>
            <Menu.Item key ='4'>
                <SmileOutlined/>
                <span>로그인/회원정보</span>
                <Link to='/users'/>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} > */}
        <Routes>
            <Route path='/' element={ <ListView/>}/>
            <Route path='/QT/' element={<div>QT</div>}/>
            <Route path='/settings/*' element={ <div>settings</div>}/>
            <Route path='/users/*' element={ <div>Users</div>}/>
            <Route path='/posts/:id' element={ <div><SinglePost/></div>}/>
        </Routes>
      </Layout>
    </Layout>
    </BrowserRouter>
  );
};

export default LayoutAnt;