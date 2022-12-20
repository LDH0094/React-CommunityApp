import { Card } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Thread } from '../../interfaces';

type SinglePostProps = {

};
const SinglePost:React.FC<SinglePostProps> = () => {

const { id } = useParams()
const [loading, setLoading] = useState(false);
const [data, setData] = useState<Thread>();

const loadPost = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8000/thread/thread/${id}`)
      .then((res) => res.json())
      .then((body) => {
        setData(body.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

    useEffect(() => {
        loadPost();
    }, []);


  
    return (
    <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-card-border-less-wrapper">
            <Card title={data?.title} bordered={false} >
                <p>{data?.content}</p>
            </Card>
        </div>
    </Content>);
}
export default SinglePost;