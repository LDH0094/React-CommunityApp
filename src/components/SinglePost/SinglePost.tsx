import { Card, Typography, List, Skeleton, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../index.css";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { Comment, Thread } from "../../interfaces";
import UploadComment from "./UploadComment";
import { NowDate } from "../../common/DateDisplay";

const { Text } = Typography;

type SinglePostProps = {};
const SinglePost: React.FC<SinglePostProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Thread>();
  const [comments, setComment] = useState<Comment[]>([]);

  const loadPost = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(process.env.REACT_APP_HOST+`thread/thread/${id}`)
      .then((res) => res.json())
      .then((body) => {
        setData(body.data);
        setComment(body.data.comments);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100vh",
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <Content style={{ margin: "24px 16px 0" }}>
        <div>
          <Card title={data?.title} bordered={false}>
            <p>{data?.content}</p>
          </Card>
          <div className="box"></div>
          <UploadComment afterCommentsCreated={loadPost} />
          <List
            locale={{ emptyText: "불러올 댓글이 없습니다. 🥲" }}
            style={{ width: "100%", height: "100%" }}
            dataSource={comments}
            renderItem={(item) => (
              <List.Item key={item.author_id}>
                <List.Item.Meta
                  title={
                    <>
                      <Space>
                        {item.author}
                        <Text type="secondary">
                          {NowDate(new Date(item.date))}
                        </Text>
                      </Space>
                    </>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
    </div>
  );
};

export default SinglePost;
