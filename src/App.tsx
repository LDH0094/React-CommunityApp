import React from 'react';
import './index.css';
import { SmileOutlined, SettingFilled, StarFilled, HomeOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';
import ListView from './components/ListView/ListView';
import logo from '../logo.svg'

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
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
        <img src={logo} alt="Logo" />;
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[HomeOutlined, StarFilled, SettingFilled, SmileOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `메뉴 ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} > */}
        <Content style={{ margin: '24px 16px 0' }}>
          <ListView/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;