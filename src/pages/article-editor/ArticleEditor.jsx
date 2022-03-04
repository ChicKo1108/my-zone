import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import './notion-light-classic.css';
import './style.scss';

const SCROLL_AREA = {
    SHOW: 'SHOW',
    WRITE: 'WRITE',
};
let currentOperationArea = '';
let scrollingEl = '';

function handleScroll(event, targetEl) {
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
    targetEl.current.scrollTo({
        top: targetEl.current.scrollHeight * (scrollTop / scrollHeight),
        behavior: 'smooth'
    });
    currentOperationArea = '';
}

const TextArea = ({ setText, writeMdRef, showMdRef }) => {
    return (
        <div className="text-area">
            <textarea
                ref={writeMdRef}
                onChange={(e) => setText(e.target.value)}
                onScroll={(e) => {
                    currentOperationArea = SCROLL_AREA.WRITE;
                    scrollEl(e, showMdRef, SCROLL_AREA.WRITE);
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
                currentOperationArea = SCROLL_AREA.SHOW;
                scrollEl(e, writeMdRef, SCROLL_AREA.SHOW);
            }}>
                <ReactMarkdown children={mdTexts} className="markdown-render-area" />
            </div>
    )
}

const ArticleEditor = () => {
    const [ mdTexts, setMdText ] = useState('');
    const [ scrollRate, setScrollRate ] = useState(0);
    const showMdRef = useRef(null);
    const writeMdRef = useRef(null);
    
    return (
        <div className="article-editor">
            <TextArea showMdRef={showMdRef} writeMdRef={writeMdRef} setText={setMdText}  />
            <ShowMdArea showMdRef={showMdRef} writeMdRef={writeMdRef} mdTexts={mdTexts} />
        </div>
    )
}

export default ArticleEditor;