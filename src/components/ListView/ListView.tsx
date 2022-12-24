import React, { useEffect, useState } from "react";
import { Typography, Divider, List, Skeleton, Col, Row } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Thread } from "../../interfaces";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import SizedPragraph from "../../common/SizedPragraph";
const { Text } = Typography;
const ListView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Thread[]>([]);
  const [limit, setLimit] = useState([]);
  const [page, setPage] = useState(0);

  // for text related:
  const [ellipsis, setEllipsis] = useState(true);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8000/thread/${page}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLimit(body.data);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Content style={{ margin: "0px 10px" }}>
        <div
          id="scrollableDiv"
          style={{
            height: 850,
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={limit.length > 9}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={
              <Divider plain>더 이상 가져올 게시글이 없네요... 🤐</Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              header={<h1>자유게시판 ⭐️</h1>}
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    title={
                      <>
                        <Text mark>{item.author?.nickname+"# "} </Text>
                        <Link to={`/posts/${item._id}`}>{item.title}</Link>
                      </>
                    }
                    description={
                      <SizedPragraph ellipsis={ellipsis} text={item.content} />
                    }
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
    </>
  );
};

export default ListView;
