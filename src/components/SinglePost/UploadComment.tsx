import React, { useState } from 'react';
import { Input, message} from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authToken';

type UploadCommentProps = {
    afterCommentsCreated: any
};

const UploadComment:React.FC<UploadCommentProps> = ({afterCommentsCreated}: UploadCommentProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();
    const [text, setText] = useState('');
    const authToken = useRecoilValue(authState);

    const success = () => {
        messageApi.open({
          type: 'success',
          content: '메세지를 작성했습니다!',
        });
      };
    
      const error = () => {
        messageApi.open({
          type: 'error',
          content: '먼저 로그인을 해주세요!',
        });
      };
    
      const warning = () => {
        messageApi.open({
          type: 'warning',
          content: '토큰이 유효하지 않습니다. 로그인을 하셨냐요?',
        });
      };

    const sendData = async(text: string) => {

        if(authToken.token === ""){
            console.log('no token');
            error()
            return
        }

        const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + authToken.token
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWFhIiwic3ViIjoiNjM4MDRlYzBkNDEyNTJiYmMzMmNjOWM1IiwiaWF0IjoxNjY5NTQ3MDk5LCJleHAiOjE3MDExMDQ2OTl9.4u2D5ZVHjFpSEOUi6bNbsd5S8Q35YJAGGb9L-0Cjol8'
        }
        console.log(id);
        try {
          const res = await axios.post(process.env.REACT_APP_HOST+`thread/${id}`, {
              content : text    // price라는 이름의 객체에 price 변수에 담은 값 전달
          },{
              headers: headers // headers에 headers 객체 전달
          }
          )  
          if(afterCommentsCreated){
            success();
            afterCommentsCreated();
          }
          console.log(res);
        //   setPrice(0); //  ~~
      
        } catch (error) {
            warning();
            console.log(error);
        }
      }

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
        console.log(e?.target.value);
        setText(e!.target.value);
      };
  
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | undefined) => {
        if (e!.key === "Enter"){
            sendData(text);
            setText('');
        }
    };


    return  (
        <>
        {contextHolder}
        <Input onKeyPress={onKeyPress} value={text} onChange={onChange} size='large' placeholder="자유롭게 글을 써주세요!" />
        </>
    );
        
}
export default UploadComment;