import React, { useEffect, useRef, useState } from 'react';
import './home.scss';
import './home.css';
import HttpClient from "../../utils/axios";
import Utils from '../../utils';
import toast from '../../utils/toast';

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

const MainInfo = ({ username }) => {
    const slogenRef = useRef(null);
    const slogen = ['一个', '还', '在', '成长', '的', 'web', '前端', '开', '发', '工程师', '.'];
    
    useEffect(() => {
        renderSlogen(slogen, 0, slogenRef.current);
    }, []);

    return (
        <div className='main-info'>
            Hi~ 我是<span className='white'>「{username}」</span>,
            <br />
            <span ref={slogenRef} className="slogen flash"/>
        </div>
    )
}

const DescInfo = ({ wx }) => {
    const [ isShowWxModal, setIsShowWxModal ] = useState(false);
    return (
        <div className='desc-info'>
            我喜欢钻研各类技术，热爱分享知识，擅长定位错误，并积极寻求解决方案。欢迎访问我的
            <a target="_blank" href="https://github.com/ChicKo1108"><span className='github'>Github</span></a>
            ，或者添加我为
            <div
                className='wx'
                onMouseMove={() => setIsShowWxModal(true)}
                onMouseLeave={() => setIsShowWxModal(false)}
                onClick={() => { Utils.doCopy(wx);toast.showToast('复制成功!', 2) }}
            >
                微信
                { isShowWxModal ? <div className='wx-modal'>{wx}</div> : null }
            </div>
            好友共同探讨编程知识。
        </div>
    );
}

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
    constructor(props) {
        super(props);
        this.state = {
            baseInfo: {
                username: '',
                wx: '',
            },
            showPage: false,
        }
    }

    async componentDidMount() {
        const res = await HttpClient.get('/api/user/baseInfo');
        if (res.data.code === 200) {
            console.log(res.data.data.data[0]);
            this.setState({
                baseInfo: {
                    username: res.data.data.data[0].username,
                    wx: res.data.data.data[0].wx,
                },
                showPage: true,
            });
        }
    }

    render() {
        const { username, wx } = this.state.baseInfo;
        return this.state.showPage ? (
            <div className='home'>
                <MainInfo username={username} />
                <DescInfo wx={wx} />
                <ContinueButton />
            </div>
        ) : null
    }
}

export default Home;