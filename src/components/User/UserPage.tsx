import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Progress, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AuthState, authState } from "../../atoms/authToken";
import { Member } from "../../interfaces";

type UserPageProps = {};

const UserPage: React.FC<UserPageProps> = () => {
  const authToken = useRecoilValue<AuthState>(authState);
  const [member, setMember] = useState<Member>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logIn();
  }, []);

  const logIn = async () => {
    if (loading) {
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken.token,
      // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiNjM4MDRlYzBkNDEyNTJiYmMzMmNjOWM1IiwiaWF0IjoxNjY5NTQ3MDk5LCJleHAiOjE3MDExMDQ2OTl9.4u2D5ZVHjFpSEOUi6bNbsd5S8Q35YJAGGb9L-0Cjol8'
    };
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/members/test`, {
        headers: headers, // headers에 headers 객체 전달
      });
      // setting tokens
      setMember(res.data.data);
      setLoading(false);
      //   console.log(member);
    } catch (error: any) {
      //   console.log(error);

      const errorMessage = "Error " + error.response.data.message;
      //   console.log(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Content style={{ margin: "30px 16px 0" }}>
      <Row gutter={16}>
        <Col >
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
              avatar={<Avatar src="" />}
              title={member?.email}
              description={"닉네임: " + member?.nickname}
            />
          </Card>
        </Col>
        <Col >
          <Progress type="circle" percent={75} />
          {/* <p>나의 QT 진척도</p> */}
        </Col>
      </Row>
    </Content>
  );
};
export default UserPage;
