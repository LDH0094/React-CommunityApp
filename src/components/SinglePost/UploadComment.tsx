import { Button, Col } from 'antd';
import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type UploadCommentProps = {
    
};

const UploadComment:React.FC<UploadCommentProps> = () => {
    const { id } = useParams();
    const [text, setText] = useState('');

    const sendData = async(text: string) => {

        const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : authToken
        }
        console.log(id);
        try {
          const res = await axios.post(`/thread/${id}`, {
              content : text    // price라는 이름의 객체에 price 변수에 담은 값 전달
          },{
              headers: headers // headers에 headers 객체 전달
          }
          )  
          console.log(res);
        //   setPrice(0); //  ~~
      
        } catch (error) {
            console.log(error);
        }
      }

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
        console.log(e?.target.value);
        setText(e!.target.value);
      };
  
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | undefined) => {
        if (e!.key === "Enter"){
            console.log('this is: ', text);
            setText('');
        }
    };


    return  (
        <Input onKeyPress={onKeyPress} value={text} onChange={onChange} size='large' placeholder="자유롭게 글을 써주세요!" />
    );
        
}
export default UploadComment;