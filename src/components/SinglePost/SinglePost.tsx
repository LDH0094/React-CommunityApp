import { Card, Divider, List, Skeleton, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../index.css";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { Comment, Thread } from "../../interfaces";
import UploadComment from "./UploadComment";

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
    fetch(`http://localhost:8000/thread/thread/${id}`)
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
        height: '100vh',
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(255, 255, 255, 0.35)",
      }}
    >
      <Content style={{ margin: "24px 16px 0" }}>
        <div className="site-card-border-less-wrapper">
          <Card title={data?.title} bordered={false}>
            <p>{data?.content}</p>
          </Card>
          <div className="box"></div>
          <UploadComment afterCommentsCreated={loadPost} />
          <Content >
            <List
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item.author_id}>
                  <Card
                    style={{ width: "100%", height: "100%" }}
                    headStyle={{ backgroundColor: "#E6ECF0" }}
                    bodyStyle={{ padding: "15px" }}
                    type="inner"
                  >
                    <div style={{ height: "100%", width: "100%" }}>
                        <p>{item.author}</p>
                        <p>{item.content}</p>
                    </div>
                  </Card>
                  {/* <div><a href="https://ant.design">자세히</a></div> */}
                </List.Item>
              )}
            />
      
          </Content>
        </div>
      </Content>
    </div>
  );
};

export default SinglePost;
