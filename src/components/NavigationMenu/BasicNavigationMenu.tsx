import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography, Space, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authToken';
import { menuState } from '../../atoms/menuAtom';

type BasicNavigationMenuProps = {
    
};

const BasicNavigationMenu:React.FC<BasicNavigationMenuProps> = () => {
  const [selectedKey, setSelectedKey] = useRecoilState(menuState);
  const [logIn, setLogIn] = useState(false);
  const authToken = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if(authToken.token == ""){
        setLogIn(false);
    }else{
        setLogIn(true);
    }
  
  }, [])
  
  const items: MenuProps["items"] = [
    {
      key: '1',
      label: "자유 게시판",
      onClick: () => {
        setSelectedKey({itemSelected: '1'})
        navigate('/')
      },
    },
    {
      key: '2',
      label: "QT 나눔",
      onClick: () => {
        setSelectedKey({itemSelected: '2'})
        navigate('/QT')
      },
    },
    {
        key: '3',
        label: "공지",
        onClick: () => {
          setSelectedKey({itemSelected: '3'})
          navigate('/notifications')
        },
      },
      
      {
        key: '4',
        label: "로그인 / 회원가입",
        disabled: logIn,
        onClick: () => {
          setSelectedKey({itemSelected: '4'})
          navigate('/users')
        },
      },
  ];
    
    return <Dropdown
    menu={{
      items,
      defaultSelectedKeys: [selectedKey.itemSelected],
    }}
  >
    <Typography.Link>
      <Space>
        {"게시판 목록 ⛪️"}
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
}
export default BasicNavigationMenu;