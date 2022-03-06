import React, { useEffect, useRef, useState } from 'react';
import './home.scss';
import './home.css';

import heart from 'images/green-heart.png';
import heartWhite from 'images/white-heart.png';

function renderSlogen(slogen, currentIndex, el) {
    const timeset = (Math.random() * 5 + 3) * 100; // [300, 800);
    setTimeout(() => {
        el.innerText += slogen[currentIndex];
        if (currentIndex < slogen.length - 1) {
            renderSlogen(slogen, currentIndex + 1, el);
        } else {
            setTimeout(() => {
                el.innerText = '';
                renderSlogen(slogen, 0, el);
            }, 2000);
        }
    }, timeset);
}

const MainInfo = () => {
    const slogenRef = useRef(null);
    const slogen = ['一个', '还', '在', '成长', '的', 'web', '前端', '开', '发', '工程师', '.'];
    
    useEffect(() => {
        renderSlogen(slogen, 0, slogenRef.current);
    }, []);

    return (
        <div className='main-info'>
            Hi~ 我是<span className='white'>「千万」</span>,
            <br />
            <span ref={slogenRef} className="slogen flash"/>
        </div>
    )
}

const DescInfo = () => (
    <div className='desc-info'>
        我喜欢钻研各类技术，热爱分享知识，擅长定位错误，并积极寻求解决方案。欢迎访问我的
        <a target="_blank" href="https://github.com/ChicKo1108"><span className='github'>Github</span></a>
        ，或者添加我为
        {/* TODO: 微信弹窗 */}
        <span className='wx'>微信</span>
        好友共同探讨编程知识。
    </div>
)

const ContinueButton = () => {
    const [ isHover, setIsHover ] = useState(false);
    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='continue-button'>
            <span>Continue</span>
            <div className='img' style={{ backgroundImage: `url(${isHover ? heart : heartWhite})` }}></div>
        </div>
    )    
}
class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <MainInfo />
                <DescInfo />
                <ContinueButton />
            </div>
        )
    }
}

export default Home;