import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.scss';

import avatar from 'images/my-avatar.jpg';
const navList = [
  { name: '文章', path: '/article-list' },
  { name: '关于我', path: '/about-me' },
  { name: '留言', path: '/comment' },
];

const Header = () => {
  const navigate = useNavigate();
  console.log('header渲染');
  setTimeout(() => {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset > 100) {
        header.style.backgroundColor = '#131d23';
      } else {
        header.style.backgroundColor = 'transparent';
      }
    });
  }, 1000);
  return (
    <header id="header">
      <div className="header-center">
        <div onClick={() => { navigate('/') }} className="personal-info">
          <img src={avatar} alt="my-avatar" />
          <span>千万</span>
        </div>
        <ul className="nav">
          {navList.map(({ name, path }) => (
            <li key={name}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
};

export default Header;