import { Divider, List } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useRecoilValue } from "recoil";
import { AuthState, authState } from "../../atoms/authToken";

type QTProps = {};

const QT: React.FC<QTProps> = () => {
  const authToken = useRecoilValue<AuthState>(authState);
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  // margin: "24px 16px 0"
  //authToken.token === ""
  if (false) {
    return <Content>로그인을 해주세요!</Content>;
  } else {
    return (
      <Content>
        <Divider orientation="left">큐티 게시판!</Divider>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Content>
    );
  }
};
export default QT;
