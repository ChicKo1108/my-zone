import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import './style.scss';
import './markdown.scss';

const SCROLL_AREA = {
    SHOW: 'SHOW',
    WRITE: 'WRITE',
};
let currentOperationArea = ''; // 主动操作的区域
let timer = null;

function handleScroll(event, targetEl, scrollingEl) {
    if (scrollingEl === SCROLL_AREA.SHOW) {
        if (currentOperationArea === '') currentOperationArea = SCROLL_AREA.SHOW;
        else if (currentOperationArea === SCROLL_AREA.WRITE) return;
        else if (currentOperationArea === SCROLL_AREA.SHOW) scrollEl(event, targetEl);
    } else if (scrollingEl === SCROLL_AREA.WRITE) {
        if (currentOperationArea === '') currentOperationArea = SCROLL_AREA.WRITE;
        else if (currentOperationArea === SCROLL_AREA.SHOW) return;
        else if (currentOperationArea === SCROLL_AREA.WRITE) scrollEl(event, targetEl);
    }
}

function scrollEl(event, targetEl) {
    const { scrollHeight, scrollTop } = event.currentTarget;
    targetEl.current.scrollTop = targetEl.current.scrollHeight * (scrollTop / scrollHeight);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        currentOperationArea = '';
    }, 200);
}

const TextArea = ({ setText, writeMdRef, showMdRef }) => {
    return (
        <div className="text-area">
            <textarea
                ref={writeMdRef}
                onChange={(e) => setText(e.target.value)}
                onScroll={(e) => {
                    handleScroll(e, showMdRef, SCROLL_AREA.WRITE);
                }}
            />
        </div>
    )
};

const ShowMdArea = ({ showMdRef, mdTexts, writeMdRef }) => {
    return (
        <div
            id="write"
            ref={showMdRef}
            className="markdown-render"
            onScroll={(e) => {
                handleScroll(e, writeMdRef, SCROLL_AREA.SHOW);
            }}>
                <ReactMarkdown children={mdTexts} />
            </div>
    )
}

const ArticleEditor = () => {
    const [ mdTexts, setMdText ] = useState('');
    const showMdRef = useRef(null);
    const writeMdRef = useRef(null);
    
    return (
        <div className="article-editor">
            <TextArea showMdRef={showMdRef} writeMdRef={writeMdRef} setText={setMdText}  />
            {/* 未使用组件`ShowMdArea`原因：无法获取函数组件内的ref */}
            <ShowMdArea showMdRef={showMdRef} writeMdRef={writeMdRef} mdTexts={mdTexts} />
        </div>
    )
}

export default ArticleEditor;