import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import { message } from "antd";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AuthState, authState } from "../../atoms/authToken";
import UserPage from "./UserPage";
import ListView from "../ListView/ListView";

type LogInProps = {};

const LogIn: React.FC<LogInProps> = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [authToken, setAuthToken] = useRecoilState<AuthState>(authState);
  const key = "updatable";

  const signUp = async (values: any) => {
    messageApi.open({
      key,
      type: "loading",
      content: "로딩중...",
    });

    if (loading) {
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      // 'Authorization' : authToken.token
      // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiNjM4MDRlYzBkNDEyNTJiYmMzMmNjOWM1IiwiaWF0IjoxNjY5NTQ3MDk5LCJleHAiOjE3MDExMDQ2OTl9.4u2D5ZVHjFpSEOUi6bNbsd5S8Q35YJAGGb9L-0Cjol8'
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/members/signUp`,

        values,

        {
          headers: headers, // headers에 headers 객체 전달
        }
      );

      console.log(res);
      setLoading(false);
      messageApi.open({
        key,
        type: "success",
        content: "회원가입 완료",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      //   setPrice(0); //  ~~
    } catch (error: any) {
      console.log(error);
      const errorMessage = "Error " + error.response.data.message;
      messageApi.open({
        key,
        type: "error",
        content: errorMessage,
        duration: 2,
      });

      setLoading(false);
    }
  };


  // for login option
  const logIn = async (values: any) => {
    messageApi.open({
      key,
      type: "loading",
      content: "로그인중...",
    });

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        process.env.REACT_APP_HOST+`members/signIn`,
        values
      );
      // setting tokens
      const authTokenUpdate: AuthState = res.data.data;
    
      console.log(res.data.data);
      setLoading(false);
      messageApi.open({
        key,
        type: "success",
        content: "로그인 완료",
        duration: 1,
      });
      setTimeout(() => {
        setAuthToken(authTokenUpdate);
      }, 1000);

      console.log("auth: ", authToken);
    } catch (error: any) {
      console.log(error);
      const errorMessage = "Error " + error.response.data.message;
      messageApi.open({
        key,
        type: "error",
        content: errorMessage,
        duration: 2,
      });
  

      setLoading(false);
    }
  };

  const onFinishLogIn = (values: any) => {
    logIn(values);
    console.log("Success:", values);
  };

  const onFinishSignUp = (values: any) => {
    signUp(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
//
  if (authToken.token === "") {
    return (
      <Content style={{ margin: "25px 20px" }}>
        {contextHolder}
        <Card>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: "로그인",
                key: "1",
                children: (
                  <Form
                    name="login"
                    labelCol={{ span: 5}}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishLogIn}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                  >
                    <Form.Item
                      label="아이디"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "아이디를 입력해주세요 🥹",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="비밀번호"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 입력하는걸 깜빡하셨나요??🤣",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="remember"
                      valuePropName="checked"
             
                    >
                      <Checkbox>다음도 기억해주세요!</Checkbox>
                    </Form.Item>

                    <Form.Item >
                      <Button type="primary" htmlType="submit">
                        확인
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                key: "2",
                label: "회원가입",
                children: (
                  <Form
                    name="signup"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishSignUp}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          required: true,
                          message: "정확한 이메일 양식을 기입해주세요",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="아이디"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "아이디를 입력해주세요",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="이름"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "이름을 입력해주세요",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="사용할 닉네임"
                      name="nickname"
                      rules={[
                        {
                          required: true,
                          message: "닉네임을 입력해주세요",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="비밀번호"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 입력해주세요",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        확인
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
            ]}
          ></Tabs>
        </Card>
      </Content>
    );
  } else {
    return <ListView/>
  }
};
export default LogIn;
