import {
  CommentOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  FloatButton,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authToken";

type CreatePostProps = {
  afterPostCreated: any
};

const CreatePost: React.FC<CreatePostProps> = ({afterPostCreated}: CreatePostProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [selectItem, setSelecItem] = useState("게시판 목록");
  const [form] = Form.useForm();
  const authToken = useRecoilValue(authState);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "게시글을 작성했습니다!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "먼저 로그인을 해주세요!",
    });
  };

  const warning = (err: string) => {
    messageApi.open({
      type: "warning",
      content: err,
      duration: 5,
    });
  };

  const info = () => {
    messageApi.open({
      type: "warning",
      content: "게시판을 선택해주세요!",
    });
  };

  const categorySelector = (category: string) => {
    if (category == '자유 게시판'){
      return 'MAIN'
    }
    if (category == 'QT 나눔'){
      return 'QT'
    }
    return 'No Item'
  }

  const checkAndOpenModal = () => {
    if(authToken.token === ""){
        console.log('no token');
        error()
        return
    }
    // open modal here
    setOpen(true);
    return;
  };


  async function handleSubmit() {
    form.validateFields()
    .then(async values => {
      if(selectItem == '게시판 목록'){
        info()
      }
      const category = categorySelector(selectItem);
      if (category !== 'No Item' && afterPostCreated){
        const data = {...values,category}
        // do async post here
        await sendData(data);
        
      
        afterPostCreated();
        setOpen(false);
        setSelecItem('게시판 목록');
        form.resetFields();
      }
      
    }).catch(info => {
      console.log('info: ', info);
      
    })

    
    
  }

  const sendData = async(data: any) => {

    if(authToken.token === ""){
        console.log('no token');
        error()
        return
    }

    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + authToken.token
        // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiNjM4MDRlYzBkNDEyNTJiYmMzMmNjOWM1IiwiaWF0IjoxNjY5NTQ3MDk5LCJleHAiOjE3MDExMDQ2OTl9.4u2D5ZVHjFpSEOUi6bNbsd5S8Q35YJAGGb9L-0Cjol8'
    }

    try {
      const res = await axios.post(process.env.REACT_APP_HOST+`thread`, 
          data    // price라는 이름의 객체에 price 변수에 담은 값 전달
      ,{
          headers: headers // headers에 headers 객체 전달
      }
      )
      success();
      console.log(res);
    //   setPrice(0); //  ~~

    } catch (error:any) {
        warning(error.response.data.message)
        console.log(error.response.data.message);
    }
  }



  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "자유 게시판",
      onClick: () => {
        setSelecItem("자유 게시판");
      },
    },
    {
      key: "2",
      label: "QT 나눔",
      onClick: () => {
        setSelecItem("QT 나눔");
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <>
            <h3>항상 책임있는 글쓰기 약속해요~</h3>
            <Dropdown
              menu={{
                items,
                selectable: true,
              }}
            >
              <Typography.Link>
                <Space>
                  {selectItem}
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
          </>
        }
        centered
        open={open}
        onOk={() => {
          handleSubmit()
          
          
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form form={form} >

            <Form.Item name="title"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요 🥹",
                min: 2
              },
            ]}>
              <Input
                placeholder="제목을 써주세요!"
                maxLength={20}
              />
            </Form.Item>

            <Form.Item name="content"
            rules={[
              {
                required: true,
                message: "글을 입력해주세요 🥹",
              },
            ]}>
              <TextArea
                rows={6}
                placeholder="제일 나누고 싶은 글"
                maxLength={500}
              />
            </Form.Item>

        </Form>
      </Modal>

      {/* //end of modal form */}
      
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<PlusOutlined />}
      >
        <FloatButton icon={<EditOutlined />} onClick={checkAndOpenModal} />
      </FloatButton.Group>
    </>
  );
};
export default CreatePost;
