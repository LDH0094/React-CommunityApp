import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useRecoilValue } from "recoil";
import { AuthState, authState } from "../../atoms/authToken";

type UserPageProps = {};

const UserPage: React.FC<UserPageProps> = () => {
  const authToken = useRecoilValue<AuthState>(authState);

    





  return (
    <Content style={{ margin: "30px 16px 0" }}>
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
    </Content>
  );
};
export default UserPage;
