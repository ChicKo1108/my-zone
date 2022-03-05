import React from "react";
import { Link } from "react-router-dom";
import './header.scss';

import avatar from 'images/my-avatar.jpg';
console.log(avatar);
const navList = [
  { name: '文章', path: '/article' },
  { name: '关于我', path: '/about-me' },
  { name: '留言', path: '/comment' },
]

const Header = () => (
  <header>
    <div className="personal-info">
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
  </header>
);

export default Header;