import { MessageFilled } from "@ant-design/icons";
import { Skeleton, Divider, List, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { NowDate } from "../../common/DateDisplay";
import SizedPragraph from "../../common/SizedPragraph";
import CreatePost from "../CreatePost/CreatePost";
import BasicNavigationMenu from "../NavigationMenu/BasicNavigationMenu";

type BasicListComponentProps = {
    loadingFunction: ReactNode;
    callbackFunction: React.FunctionComponent;

    
};

const BasicListComponent: React.FC<BasicListComponentProps> = (functionBundle: 
BasicListComponentProps) => {
  return <>
  <Content>
  <CreatePost afterPostCreated={initLoadCallBack} />
        <div
          id="scrollableDiv"
          style={{
            height: "90vh",
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={limit.length > 9 && !hasReachedEnd}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={
              <Divider plain>더 이상 가져올 게시글이 없네요... 🤐</Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              header={
                <>
                  <Row justify="space-between" align="middle">
                    <h1>자유게시판 ⭐️</h1>
                    <BasicNavigationMenu />
                  </Row>
                </>
              }
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    title={
                      <>
                        <Space>
                          <Text mark>{item.author?.nickname + "# "} </Text>

                          {item.title}

                          <Text type="secondary">{NowDate(item.date)}</Text>
                        </Space>
                      </>
                    }
                    description={
                      <SizedPragraph ellipsis={ellipsis} text={item.content} />
                    }
                  />
                  <Row align="middle">
                    <Link style={{ color: "black" }} to={`/posts/${item._id}`}>
                      <Space>
                        <MessageFilled />
                        <div>{item.comments?.length}</div>
                      </Space>
                    </Link>
                  </Row>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
    </>
};
export default BasicListComponent;
