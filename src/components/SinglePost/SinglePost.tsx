import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { useParams } from 'react-router-dom';

type SinglePostProps = {

};

const SinglePost:React.FC<SinglePostProps> = () => {
    const { id } = useParams()
    return (
    <Content style={{ margin: '24px 16px 0' }}>
        <div>
            {id} is the mongoID
        </div>
    </Content>);
}
export default SinglePost;