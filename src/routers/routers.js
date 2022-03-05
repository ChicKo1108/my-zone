import React from 'react';
import Home from 'pages/home/home';
import ArticleEditor from 'pages/article-editor/ArticleEditor';
import ArticleList from 'pages/article-list/article-list';

const routers = [
    { path: '/article-editor', element: <ArticleEditor /> },
    { path: '/article-list', element: <ArticleList /> },
    { path: '/', element: <Home /> },
]

export default routers;