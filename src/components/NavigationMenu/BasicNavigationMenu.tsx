import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography, Space, MenuProps } from 'antd';
import React, { useState } from 'react';

type BasicNavigationMenuProps = {
    
};

const BasicNavigationMenu:React.FC<BasicNavigationMenuProps> = () => {
    // const [selectItem, setSelecItem] = useState("게시판 목록 ⭐️");

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "자유 게시판",
      onClick: () => {
        // setSelecItem("자유 게시판");
      },
    },
    {
      key: 2,
      label: "QT 나눔",
      onClick: () => {
        // setSelecItem("QT 나눔");
      },
    },
  ];
    
    return <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['1']
    }}
  >
    <Typography.Link>
      <Space>
        {"게시판 목록 ⭐️"}
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
}
export default BasicNavigationMenu;