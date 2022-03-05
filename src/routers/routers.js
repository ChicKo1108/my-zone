import React from 'react';
import Home from 'pages/home/home';
import ArticleEditor from 'pages/article-editor/ArticleEditor';

const routers = [
    { path: '/article-editor', element: <ArticleEditor /> },
    { path: '/', element: <Home /> },
]

export default routers;