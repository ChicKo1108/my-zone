import React from 'react';
import Home from 'pages/home/home';
import ArticleEditor from 'pages/article-editor/ArticleEditor';
import ArticleList from 'pages/article-list/article-list';
import Article from 'pages/article/article';
import AboutMe from 'pages/about-me/about-me';

const routers = [
    { path: '/about-me', element: <AboutMe /> },
    { path: '/article', element: <Article /> },
    { path: '/article-editor', element: <ArticleEditor /> },
    { path: '/article-list', element: <ArticleList /> },
    { path: '/', element: <Home /> },
]

export default routers;