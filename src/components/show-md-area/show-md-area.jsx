import React from "react";
import ReactMarkdown from "react-markdown";
import './md.scss';

const ShowMdArea = ({ el, onScroll, className, renderTexts }) => (
  <div
    id="write"
    ref={el}
    className={className}
    onScroll={(e) => onScroll(e)}>
    <ReactMarkdown children={renderTexts} />
  </div>
)

export default ShowMdArea;