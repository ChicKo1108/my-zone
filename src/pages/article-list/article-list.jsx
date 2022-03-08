import React, { useEffect, useState } from "react";
import HttpClient from "../../utils/axios";
import "./article-list.scss";

// images
import blueHeart from "images/blue-heart.png";
import comment from "images/comment.png";
import eye from "images/eye.png";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const { id, title, intro, createAt, view, like, comment: commentCount } = article;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/article?id=' + id)} className="article-card">
      <div className="time">{createAt}</div>
      <div className="article-title">{title}</div>
      <div className="article-content">{intro}</div>
      <div className="infos">
        <div className="item">
          <img src={eye} />
          <span>{view}</span>  
        </div>
        <div className="item">
          <img src={blueHeart} />
          <span>{like}</span>  
        </div>
        <div className="item">
          <img src={comment} />
          <span>{commentCount}</span>  
        </div>
      </div>
    </div>
  );
}

const ArticleList = () => {
  const [ articleList, setArticleList ] = useState([]);
  useEffect(() => {
    HttpClient.get('/api/article/all').then(({ data }) => {
      if (data.code = 200) {
        setArticleList(data.data);
      }
    });
  }, []);
  return (
    <div className="article-list">
      <h1>文章</h1>
      { articleList.length && articleList.map(v => <ArticleCard article={v} key={v.id} />) }
    </div>
  )
}

export default ArticleList;