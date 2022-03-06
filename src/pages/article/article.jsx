import React, { useRef, useState } from "react";

import './article.scss';
import ShowMdArea from 'components/show-md-area/show-md-area';
import { KEYBOARD } from 'enums/keyboard';

// images
import blueHeart from "images/blue-heart.png";
import blankHeart from "images/heart-blank.png";
import comment from "images/comment.png";
import eye from "images/eye.png";

const texts = `分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些， 分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，`;

// textarea高度根据内容变化
function setTextareaHeight (event, el) {
  if ((event.keyCode === KEYBOARD.BACKSPACE) || (event.keyCode === KEYBOARD.DELETE)) {
    el.style.height = 'auto';
  }
  el.style.height = el.scrollHeight + 'px';
}

const ArticleInfo = () => (
  <div className="article-info">
    <span className="time">2022年3月5日</span>
    <div className="infos">
      <div className="info-item">
        <img src={eye} />
        <span>145</span>
      </div>
      <div className="info-item">
        <img src={blueHeart} />
        <span>1</span>
      </div>
      <div className="info-item">
        <img src={comment} />
        <span>0</span>
      </div>
    </div>
  </div>
);

const LikeButton = ({ isLike, handleClick }) => (
  <div
    className="like-button"
    style={{ backgroundImage: `url(${ isLike ? blueHeart : blankHeart })` }}
    onClick={handleClick}
  />
);

const CommentWrapper = () => {
  const commentTextRef = useRef(null);
  return (
    <div className="comment-wrapper">
        <textarea
          ref={commentTextRef}
          onInput={(e) => { setTextareaHeight(e, commentTextRef.current) }}
          onKeyDown={(e) => { setTextareaHeight(e, commentTextRef.current) }}
        />
        <div className="button-area">
          <div className="alias">
            <label>
              昵称
              <input type="text" />
            </label>
          </div>
          <div className="commit">发表评论</div>
          <div className="cancel">取消</div>
        </div>
    </div>
  );
}

const ChatWrapper = () => (
  <div className="chat-wrapper">
    <div className="main-chat">
      <div className="main-name">
        <span className="name">小飞侠</span>
        <span className="time">2022.03.05 22:12:06</span>  
        <img className="reply-btn" src={comment} alt="回复" />
      </div>
      <div className="content">关于fragment的介绍还是没看懂，能再仔细讲讲吗？</div>    
    </div>
    <div className="reply">
      <div className="reply-name">
        <span className="name">绿巨人 回复 小飞侠</span>
        <span className="time">2022.03.05 22:13:12</span>
        <img className="reply-btn" src={comment} alt="回复" />
      </div>
      <div className="content">Fragment不能单独使用，要在Activity中进行使用。并且它具有独立的生命周期。Fragment不能单独使用，要在Activity中进行使用。并且它具有独立的生命周期。Fragment不能单独使用，要在Activity中进行使用。并且它具有独立的生命周期。</div>
    </div>
    <div className="reply">
      <div className="reply-name">
        <span className="name">小飞侠 回复 绿巨人</span>
        <span className="time">2022.03.05 22:13:12</span>
        <img className="reply-btn" src={comment} alt="回复" />
      </div>
      <div className="content">终于弄明白了，谢谢！</div>
    </div>
  </div>
)

const CommentList = () => (
  <div className="comment-list">
    <h2>评论（0）</h2>
    <CommentWrapper />
    <ChatWrapper />
    <ChatWrapper />
    <ChatWrapper />
  </div>
);

const Article = () => {
  const [ isLike, setIsLike ] = useState(false);
  
  function handleLikeClick() {
    setIsLike(!isLike);
  }

  return (
    <div className="article-detail">
      <h1>安卓知识点</h1>
      <ArticleInfo />
      <ShowMdArea renderTexts={texts} className="md-area" />
      <LikeButton isLike={isLike} handleClick={handleLikeClick} />
      <CommentList />
    </div>
  )
};

export default Article;