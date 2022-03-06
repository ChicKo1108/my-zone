import React from 'react';
import Home from 'pages/home/home';
import ArticleEditor from 'pages/article-editor/ArticleEditor';
import ArticleList from 'pages/article-list/article-list';
import Article from 'pages/article/article';

const routers = [
    { path: '/article', element: <Article /> },
    { path: '/article-editor', element: <ArticleEditor /> },
    { path: '/article-list', element: <ArticleList /> },
    { path: '/', element: <Home /> },
]

export default routers;