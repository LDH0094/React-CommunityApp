import Paragraph from "antd/es/typography/Paragraph";
import React from "react";
import { Thread } from "../interfaces";

type SizedPragraphProps = {
    ellipsis: boolean,
    text?: string
};

const SizedPragraph: React.FC<SizedPragraphProps> = ({ellipsis, text}: SizedPragraphProps) => {
  return (
    <Paragraph
      ellipsis={
        ellipsis ? { rows: 2, expandable: true, symbol: "더보기" } : false
      }
    >
      {text}
    </Paragraph>
  );
};
export default SizedPragraph;
