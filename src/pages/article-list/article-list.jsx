import React from "react";
import Header from "components/header/header";
import "./article-list.scss";

// images
import blueHeart from "images/blue-heart.png";
import comment from "images/comment.png";
import eye from "images/eye.png";
import { useNavigate } from "react-router-dom";

const ArticleCard = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/article')} className="article-card">
      <div className="time">2022年3月5日</div>
      <div className="article-title">安卓知识点</div>
      <div className="article-content">分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点，分享一些安卓知识点</div>
      <div className="infos">
        <div className="item">
          <img src={eye} />
          <span>145</span>  
        </div>
        <div className="item">
          <img src={blueHeart} />
          <span>1</span>  
        </div>
        <div className="item">
          <img src={comment} />
          <span>0</span>  
        </div>
      </div>
    </div>
  );
}

const ArticleList = () => {
  return (
    <div className="article-list">
      <Header />
      <h1>文章</h1>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  )
}

export default ArticleList;