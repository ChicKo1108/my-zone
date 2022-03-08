import React, { useEffect, useRef, useState } from "react";

import './article.scss';
import ShowMdArea from 'components/show-md-area/show-md-area';
import { KEYBOARD } from 'enums/keyboard';
import HttpClient from "../../utils/axios";
import Utils from "../../utils";
import toast from "../../utils/toast";

// images
import blueHeart from "images/blue-heart.png";
import blankHeart from "images/heart-blank.png";
import comment from "images/comment.png";
import eye from "images/eye.png";

// textarea高度根据内容变化
function setTextareaHeight (event, el) {
  if ((event.keyCode === KEYBOARD.BACKSPACE) || (event.keyCode === KEYBOARD.DELETE)) {
    el.style.height = 'auto';
  }
  el.style.height = el.scrollHeight + 'px';
}

// 整理评论的结构
function formatCommentTree (commentList) {
  const tree = [];
  for (let i = 0; i < commentList.length; i++) {
    const comment = commentList[i];
    if (!comment.replyId) {
      tree.push({ ...comment, children: [], childrenIds: [ comment.id ] });
    } else {
      const target = tree.find(v => v.childrenIds.includes(comment.replyId));
      target.children.push(comment);
      target.childrenIds.push(comment.id);
    }
  }
  return tree;
}

const ArticleInfo = ({ article }) => (
  <div className="article-info">
    <span className="time">{new Date(article.createdAt).format('yyyy年MM月dd日 hh:mm:ss')}</span>
    <div className="infos">
      <div className="info-item">
        <img src={eye} />
        <span>{article.view}</span>
      </div>
      <div className="info-item">
        <img src={blueHeart} />
        <span>{article.like}</span>
      </div>
      <div className="info-item">
        <img src={comment} />
        <span>{article.commentCount}</span>
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

const CommentWrapper = ({ replyInfo, commitReply, setReplyInfo }) => {
  const [ replyName, setReplyName ] = useState('');
  const commentTextRef = useRef(null);
  return (
    <div className="comment-wrapper">
      <div className="textarea-wrapper">
        <textarea
          style={{ textIndent: replyInfo.replyTo ? replyInfo.replyTo.length + 3 + 'em' : 0 }}
          ref={commentTextRef}
          onInput={(e) => { setTextareaHeight(e, commentTextRef.current) }}
          onKeyDown={(e) => { setTextareaHeight(e, commentTextRef.current) }}
        />
        { replyInfo.replyTo && <span className="reply-tip">回复 {replyInfo.replyTo}：</span> }
      </div>
        <div className="button-area">
          <div className="alias">
            <label>
              昵称
              <input type="text" onInput={(v) => setReplyName(v.target.value)} />
            </label>
          </div>
          <div className="commit" onClick={() => { commitReply(replyName, commentTextRef.current, replyInfo.replyId) }}>发表评论</div>
          { replyInfo.replyId && <div className="cancel" onClick={() => { setReplyInfo({}); }}>取消</div>}
        </div>
    </div>
  );
}

const ChatWrapper = ({ comments, setReplyInfo }) => comments.map(v => (
  <div key={v.id} className="chat-wrapper">
    <div className="main-chat">
      <div className="main-name">
        <span className="name">{ v.username }</span>
        <span className="time">{ new Date(v.createdAt).format('yyyy-MM-dd hh:mm:ss') }</span>  
        <img onClick={() => setReplyInfo({ replyId: v.id, replyTo: v.username })} className="reply-btn" src={comment} alt="回复" />
      </div>
      <div className="content">{v.content}</div>    
    </div>
    { v.children.map(c => (
      <div key={c.id} className="reply">
        <div className="reply-name">
          <span className="name">{c.username} 回复 {v.id === c.replyId ? v.username : v.children.find(f => f.id === c.replyId).username}</span>
          <span className="time">{ new Date(c.createdAt).format('yyyy-MM-dd hh:mm:ss') }</span>
          <img onClick={() => setReplyInfo({ replyId: c.id, replyTo: c.username })} className="reply-btn" src={comment} alt="回复" />
        </div>
        <div className="content">{c.content}</div>
      </div>
    )) }
  </div>
))

const CommentList = ({ comments, commitReply, count }) => {
  const [ replyInfo, setReplyInfo ] = useState({ replyId: null, replyTo: '' });

  return (
    <div className="comment-list">
      <h2>评论（{count}）</h2>
      <CommentWrapper commitReply={commitReply} replyInfo={replyInfo} setReplyInfo={setReplyInfo} />
      <ChatWrapper comments={comments} setReplyInfo={setReplyInfo} />
    </div>
  )
};

const Article = () => {
  const [ isLike, setIsLike ] = useState(false);
  const [ article, setArticle ] = useState({});
  const [ comments, setComments ] = useState([]);
  useEffect(() => {
    const id = Utils.getQuery('id');
    HttpClient.post('/api/article/view', { id })
      .then(() => console.log('article view is upload.'))
      .then(() => {
        Promise.all([
          HttpClient.get('/api/article?id=' + id),
          HttpClient.get('/api/article/comment?articleId=' + id),
        ]).then(([ res1, res2 ]) => {
          if (res1.data.code === 200) {
            setArticle(res1.data.data[0]);
          }
          if (res2.data.code === 200) {
            setComments(formatCommentTree(res2.data.data));
          }
        })
      });
    // 回填点赞
    const likeList = JSON.parse(localStorage.getItem('likeList') || '[]');
    setIsLike(likeList.includes(Number(id)));
  }, []);
  // 提交评论
  function commitReply(replyName, textEl, replyId) {
    if (!article.id) {
      toast.showToast('缺少关键参数，请刷新页面');
      return;
    }
    if (!replyName) {
      toast.showToast('请先填写昵称');
      return;
    }
    if (!textEl.value) {
      toast.showToast('请填写评论内容');
      return;
    }
    HttpClient.post('/api/article/comment', {
      articleId: article.id,
      username: replyName,
      content: textEl.value,
      replyId,
    }).then(() => {
      toast.showToast('评论成功');
      textEl.value = '';
      setTextareaHeight({}, textEl);
    }).then(() => {
      HttpClient.get('/api/article/comment?articleId=' + article.id)
        .then((res) => {
          if (res.data.code === 200) {
            setComments(formatCommentTree(res.data.data));
          }
        })
    })
  }
  // 点赞
  function handleLikeClick() {
    const likeList = JSON.parse(localStorage.getItem('likeList') || '[]');
    if (!isLike) {
      HttpClient.post('/api/article/like', { id: article.id }).then(({ data }) => {
        if (data.code === 200) {
          setIsLike(true);
          toast.showToast('感谢您的喜欢');
          likeList.push(article.id);
          localStorage.setItem('likeList', JSON.stringify(likeList));
        }
      })
    } else {
      HttpClient.post('/api/article/dislike', { id: article.id }).then(({ data }) => {
        if (data.code === 200) {
          setIsLike(false);
          likeList.splice(likeList.findIndex(v => v === article.id), 1);
          toast.showToast('取消点赞');
          localStorage.setItem('likeList', JSON.stringify(likeList));
        }
      });
    }
  }

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <ArticleInfo article={article} />
      <ShowMdArea renderTexts={article.content} className="md-area" />
      <LikeButton isLike={isLike} handleClick={handleLikeClick} />
      <CommentList comments={comments} count={article.commentCount} commitReply={commitReply} />
    </div>
  )
};

export default Article;