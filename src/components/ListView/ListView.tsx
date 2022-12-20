import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Thread } from '../../interfaces';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';


const ListView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Thread[]>([]);
  const [limit, setLimit] = useState([]);
  const [page, setPage] = useState(0);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8000/thread/${page}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.data]);
        setLimit(body.data)
        setPage(page + 1)
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
    <Content style={{ margin: '24px 16px 0' }}>
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={limit.length > 9}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>더 이상 가져올 게시글이 없네요... 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                title={<Link to={`/posts/${item._id}`}>{item.author?.nickname}</Link>}
                description={item.content}
              />
              {/* <div><a href="https://ant.design">자세히</a></div> */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </Content>
  );
};

export default ListView;