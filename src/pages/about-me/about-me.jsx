import React, { useEffect, useState } from "react";
import './about-me.scss';
import HttpClient from "../../utils/axios";

const jobExp = ((new Date().getFullYear() - 2020 - 1) * 12 + (new Date().getMonth() + 1) + 4) / 12;

const AboutMe = () => {
  const [ baseInfo, setBaseInfo ] = useState({});

  useEffect(async() => {
    const res = await HttpClient.get('/api/user/baseInfo');
    if (res.data.code === 200) {
      setBaseInfo(res.data.data.data[0]);
    }
  }, []);

  return (
    <div className="about-me">
      <h1>关于我</h1>
      {/* 基本信息 */}
      <section>
        <div className="section-title">基本信息</div>
        <div className="section-line">
          <div className="line-item">昵称：{baseInfo.userName}</div>
          <div className="line-item">出生日期：{baseInfo.birth}</div>
        </div>
        <div className="section-line">
          <div className="line-item">籍贯：{baseInfo.province}</div>
          <div className="line-item">民族：{baseInfo.nation}</div>
        </div>
        <div className="section-line">
          <div className="line-item">政治面貌：{baseInfo.polit}</div>
          <div className="line-item">工作经验：{Number(jobExp).toFixed(1)}年</div>
        </div>
        <div className="section-line">
          <div className="line-item">邮箱：{baseInfo.email}</div>
          <div className="line-item">微信：{baseInfo.wx}</div>
        </div>
      </section>
      {/* 教育背景 */}
      <section>
        <div className="section-title">教育背景</div>
        <div className="section-line">
          <div className="line-item">毕业院校：{baseInfo.college}</div>
          <div className="line-item">专业：{baseInfo.major}</div>
        </div>
        <div className="section-line">
          <div className="line-item">入学时间：{baseInfo.schoolYear}</div>
          <div className="line-item">学历：{baseInfo.level}</div>
        </div>
      </section>
      {/* 职业技能 */}
      <section>
        <div className="section-title">职业技能</div>
        {(baseInfo.skills || '').split(';;;').map((v, i) => (
            <div className="section-line" key={v}>{i}. {v}</div>
        ))}
      </section>
      {/* 工作经历 */}
      <section>
        <div className="section-title">工作经历</div>
        {(JSON.parse(baseInfo.jobs || '[]')).map(({ company, job, time, jobContent }) => (
          <React.Fragment key={company + job}>
            <div className="section-line">
              <span className="company-name">{company}</span>
              <span style={{ marginLeft: '3px' }}>  · {job}</span>
              <span className="time">{time}</span>
            </div>
            {(jobContent || '').split(';;;').map((v, i) => <div key={i} className="job-intro">{v}</div>)}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};

export default AboutMe;