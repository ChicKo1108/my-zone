import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.scss';
import HttpClient from "../../utils/axios";
import Utils from "../../utils";

import avatar from 'images/my-avatar.jpg';
import menuIcon from 'images/menu.png';

const navList = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/article-list' },
  { name: '关于我', path: '/about-me' },
  // { name: '留言', path: '/comment' },
];

const Header = () => {
  const navigate = useNavigate();
  const [baseInfo, setBaseInfo] = useState({});
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  useEffect(() => {
    HttpClient.get('/api/user/baseInfo').then(({ data }) => {
      if (data.code === 200) {
        setBaseInfo(data.data.data[0]);
      }
    });
  }, [])
  console.log('header渲染');
  setTimeout(() => {
    const header = document.getElementById('header');
    if (!header) return;
    if (!Utils.isMobile()) {
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset > 100) {
          header.style.backgroundColor = '#131d23';
        } else {
          header.style.backgroundColor = 'transparent';
        }
      });
    }
  }, 1000);
  return (
    <header id="header">
      {Utils.isMobile() ? (
        <>
          <div onClick={() => { setIsShowMobileMenu(true); }} className="header-button">
            <img src={menuIcon} />
          </div>
          {isShowMobileMenu ? (
            <div onClick={() => { setIsShowMobileMenu(false); }} className="wrapper">
              <div onClick={(e) => { e.stopPropagation(); }} className="mobile-pannel">
                {navList.map(({ name, path }) => (
                  <div className="btn" key={name}>
                    <Link onClick={() => { setIsShowMobileMenu(false); }} to={path}>{name}</Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="header-center">
          <div className="personal-info">
            <div onClick={() => { navigate('/') }} >
              <img src={avatar} alt="my-avatar" />
              <span>{baseInfo.username}</span>
            </div>
            <span style={{ color: '#efefef', fontSize: '12px', marginLeft: '50px' }}>(当前网站访问人次：{baseInfo.view || 0})</span>
          </div>
          <ul className="nav">
            {navList.map(({ name, path }) => (
              <li key={name}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
};

export default Header;