import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { KEYBOARD } from "../../enums/keyboard";
import './style.scss';
import './markdown.scss';
import HttpClient from "../../utils/axios";
import toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const SCROLL_AREA = {
    SHOW: 'SHOW',
    WRITE: 'WRITE',
};
let currentOperationArea = ''; // 主动操作的区域
let timer = null;

// 注册滚动事件
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

// 执行滚动操作
function scrollEl(event, targetEl) {
    const { scrollHeight, scrollTop } = event.currentTarget;
    targetEl.current.scrollTop = targetEl.current.scrollHeight * (scrollTop / scrollHeight);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        currentOperationArea = '';
    }, 200);
}

function removeTitleMark(text) {
    return text.replace(/^#####\ |####\ |###\ |##\ |#\ /g, '');
}

// 处理特殊键盘事件
// TODO: 解耦，判断每一项操作（有序列表、无序列表）
// TODO：ctrl+z 撤回事件
function handleKeyDown(event) {
    const { keyCode, ctrlKey } = event;
    const valueArr = event.target.value.split('\n');
    switch (keyCode) {
        case KEYBOARD.TAB: // 扩充制表符
            valueArr[valueArr.length - 1] = '\t' + valueArr[valueArr.length - 1];
            event.target.value = valueArr.join('\n');
            event.preventDefault && event.preventDefault();
            break;
        case KEYBOARD.KEY_1: // crtl + 1 扩展标题行
            if (ctrlKey) {
                // 在当前行的最前面加入'# '
                valueArr[valueArr.length - 1] = '# ' + removeTitleMark(valueArr[valueArr.length - 1]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            break;
        case KEYBOARD.KEY_2:
            if (ctrlKey) {
                valueArr[valueArr.length - 1] = '## ' + removeTitleMark(valueArr[valueArr.length - 1]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            break;
        case KEYBOARD.KEY_3:
            if (ctrlKey) {
                valueArr[valueArr.length - 1] = '### ' + removeTitleMark(valueArr[valueArr.length - 1]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            break;
        case KEYBOARD.KEY_4:
            if (ctrlKey) {
                // 在当前行的最前面加入'# '
                valueArr[valueArr.length - 1] = '#### ' + removeTitleMark(valueArr[valueArr.length - 1]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            break;
        case KEYBOARD.KEY_5:
            if (ctrlKey) {
                // 在当前行的最前面加入'# '
                valueArr[valueArr.length - 1] = '##### ' + removeTitleMark(valueArr[valueArr.length - 1]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            break;
        case KEYBOARD.ENTER: // 扩展列
            const ulReg = /^( )*(\t)*\- /;
            const olReg = /^( )*(\t)*\d+\. /
            if (valueArr[valueArr.length - 1].search(/^(\-|\d+\.) $/) === 0) { // 取消最外层列表
                valueArr[valueArr.length - 1] = '';
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            } else if (valueArr[valueArr.length - 1].search(/\t+(\-|\d+\.) $/) === 0) { // 取消子列表
                // TODO: 回退之后还需要根据上层的编号重新赋值
                valueArr[valueArr.length - 1] = valueArr[valueArr.length - 1].replace(/\t/, '');
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
                return;
            }
            if (valueArr[valueArr.length - 1].search(ulReg) === 0) {
                valueArr.push(valueArr[valueArr.length - 1].match(ulReg)[0]);
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();

            } else if (valueArr[valueArr.length - 1].search(olReg) === 0) {
                const prefix = valueArr[valueArr.length - 1].match(olReg)[0];
                const num = Number(valueArr[valueArr.length - 1].match(/\d+/)[0]) + 1;
                valueArr.push(prefix.replace(/\d+/, num));
                event.target.value = valueArr.join('\n');
                event.preventDefault && event.preventDefault();
            }
            
            break;
        default:
            break;
    }
}

const TextArea = ({ setText, writeMdRef, showMdRef }) => {
    return (
        <div className="text-area">
            <textarea
                ref={writeMdRef}
                placeholder="输入文章正文"
                onKeyUp={(e) => setText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, e.target.value)}
                onScroll={(e) => handleScroll(e, showMdRef, SCROLL_AREA.WRITE)}
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
    const [ title, setTitle ] = useState('');
    const [ intro, setIntro ] = useState('');
    const navigate = useNavigate();
    const showMdRef = useRef(null);
    const writeMdRef = useRef(null);

    function commitArticle() {
        if (!title || !intro || !mdTexts) {
            toast.showToast('请检查输入项！');
            return;
        }
        HttpClient.post('/api/article', {
            title,
            intro,
            content: mdTexts,
        }).then((res) => {
            if (res.data.code === 200) {
                toast.showToast('发表成功！');
                setTimeout(() => {
                    navigate.replace('/article?id=' + data.data.insertId);
                }, 1000);
            }
            // console.log(data);
        }).catch(err => {
            toast.showToast(err.message)
        })
    }
    
    return (
        <div className="article-editor">
            <div className="title-wrapper">
                <input placeholder="输入文章标题" onInput={(e) => setTitle(e.target.value)} />
            </div>
            <div className="intro-wrapper">
                <textarea placeholder="输入文章简介" onInput={(e) => setIntro(e.target.value)}></textarea>
            </div>
            <div className="md-wrapper">
                <TextArea showMdRef={showMdRef} writeMdRef={writeMdRef} setText={setMdText}  />
                {/* 未使用组件`ShowMdArea`原因：无法获取函数组件内的ref */}
                <ShowMdArea showMdRef={showMdRef} writeMdRef={writeMdRef} mdTexts={mdTexts} />
            </div>
            <div className="btn-wrapper">
                <div className="wrapper">
                    <div className="btn">保存草稿</div>
                    <div className="btn" onClick={commitArticle}>发表</div>
                </div>
            </div>
        </div>
    )
}

export default ArticleEditor;