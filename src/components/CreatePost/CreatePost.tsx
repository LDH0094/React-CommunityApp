import {
  CommentOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import {
  Col,
  Dropdown,
  FloatButton,
  Input,
  MenuProps,
  message,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authToken";

type CreatePostProps = {};

const CreatePost: React.FC<CreatePostProps> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [selectItem, setSelecItem] = useState('게시판 목록')
  const authToken = useRecoilValue(authState);

  const checkAndOpenModal = () => {
    // if(authToken.token === ""){
    //     console.log('no token');
    //     error()
    //     return
    // }
    // open modal here
    setOpen(true);
    return;
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "메세지를 작성했습니다!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "warning",
      content: "먼저 로그인을 해주세요!",
    });
  };

  // select item here

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "자유 게시판",
      onClick: ()=>{
        setSelecItem('자유 게시판')
      }
    },
    {
      key: "2",
      label: "QT 나눔",
      onClick: ()=>{
        setSelecItem('QT 나눔')
      }
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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Space direction="vertical" style={{ display: "flex" }}>
          <Input placeholder="제목을 써주세요!" maxLength={17} />
          <TextArea
            rows={6}
            placeholder="제일 나누고 싶은 글"
            maxLength={500}
          />
        </Space>
      </Modal>

    
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
