import { StarFilled } from "@ant-design/icons";
import React from "react";

type CreatePostProps = {};

const CreatePost: React.FC<CreatePostProps> = () => {

    const hello = () => {
        console.log('helloooo');
        
      }
  return (
    <StarFilled
      onClick={hello}
      spin={true}
      style={{ fontSize: "17px", color: "#ff0000" }}
    />
  );
};
export default CreatePost;
