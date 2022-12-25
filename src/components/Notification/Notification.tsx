import { SmileOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

type NotificationProps = {};

const Notification: React.FC<NotificationProps> = () => {
  return (
    <Content>
      <Result
        icon={<SmileOutlined />}
        title="Still working on this service!"
        extra={
          <Link to={"/"}>
            <Button type="primary">홈으로 돌아가기</Button>
          </Link>
        }
      />
    </Content>
  );
};
export default Notification;
