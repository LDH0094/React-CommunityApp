import React, { useEffect, useState, useCallback } from "react";
import { Typography, Divider, List, Skeleton, Space, Row } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Thread } from "../../interfaces";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import SizedPragraph from "../../common/SizedPragraph";
import { NowDate } from "../../common/DateDisplay";
import CreatePost from "../CreatePost/CreatePost";
import BasicNavigationMenu from "../NavigationMenu/BasicNavigationMenu";
import { CommentOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Notification: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Thread[]>([]);
  const [limit, setLimit] = useState([]);
  const [page, setPage] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // for text related:
  const [ellipsis, setEllipsis] = useState(true);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(process.env.REACT_APP_HOST + `thread/category/notification/${page}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLimit(body.data);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasReachedEnd(true);
      });
  };

  const initLoadCallBack = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(process.env.REACT_APP_HOST + `thread/category/notification/${page}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLimit(body.data);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasReachedEnd(true);
      });
  }, []);

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Content style={{ margin: "0px 10px" }}>
        <CreatePost afterPostCreated={initLoadCallBack} />
        <div
          id="scrollableDiv"
          style={{
            height: "100vh",
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
              <Divider plain>더 이상 가져올 공지글이 없네요... 🤐</Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              header={
                <>
                  <Row justify="space-between" align="middle">
                    <h1>업드림 공지 📝</h1>
                    <BasicNavigationMenu />
                  </Row>
                </>
              }
              dataSource={data}
              renderItem={(item) => {
                return (
                  <List.Item key={item._id}>
                    <List.Item.Meta
                      title={
                        <>
                          <Space>
                            <Link
                              style={{ color: "black" }}
                              to={`/posts/${item._id}`}
                            >
                              <Text mark>{item.author?.nickname + "# "} </Text>

                              {item.title}
                            </Link>
                            <Text type="secondary">{NowDate(item.date)}</Text>
                          </Space>
                        </>
                      }
                      description={
                        <SizedPragraph
                          ellipsis={ellipsis}
                          text={item.content}
                        />
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </InfiniteScroll>
        </div>
      </Content>
    </>
  );
};

export default Notification;
function useCallBack(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
