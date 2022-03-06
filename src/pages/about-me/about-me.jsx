import React from "react";
import './about-me.scss';

const jobExp = ((new Date().getFullYear() - 2020 - 1) * 12 + (new Date().getMonth() + 1) + 4) / 12;

const AboutMe = () => (
  <div className="about-me">
    <h1>关于我</h1>
    {/* 基本信息 */}
    <section>
      <div className="section-title">基本信息</div>
      <div className="section-line">
        <div className="line-item">昵称：千万</div>
        <div className="line-item">出生日期：1999.11</div>
      </div>
      <div className="section-line">
        <div className="line-item">籍贯：黑龙江省</div>
        <div className="line-item">民族：汉族</div>
      </div>
      <div className="section-line">
        <div className="line-item">政治面貌：共青团员</div>
        <div className="line-item">工作经验：{Number(jobExp).toFixed(1)}年</div>
      </div>
      <div className="section-line">
        <div className="line-item">邮箱：463008393@qq.com</div>
        <div className="line-item">微信：Chicko_</div>
      </div>
    </section>
    {/* 教育背景 */}
    <section>
      <div className="section-title">教育背景</div>
      <div className="section-line">
        <div className="line-item">毕业院校：西北民族大学</div>
        <div className="line-item">专业：软件工程</div>
      </div>
      <div className="section-line">
        <div className="line-item">入学时间：2017.09 - 2021.07</div>
        <div className="line-item">学历：本科</div>
      </div>
    </section>
    {/* 职业技能 */}
    <section>
      <div className="section-title">职业技能</div>
      <div className="section-line">1.熟练掌握HTML5、CSS3、JS语言，能够使用ES6语法参与日常项目的迭代开发；</div>
      <div className="section-line">2.了解react语法，在职期间参与公司React项目的开发；</div>
      <div className="section-line">3.熟练掌握HTML5、CSS3、JS语言，能够使用ES6语法参与日常项目的迭代开发；</div>
      <div className="section-line">4.熟练掌握HTML5、CSS3、JS语言，能够使用ES6语法参与日常项目的迭代开发；</div>
    </section>
    {/* 工作经历 */}
    <section>
      <div className="section-title">工作经历</div>
      <>
        <div className="section-line">
          <span className="company-name">上海市必加教育科技有限公司</span>
          <span style={{ marginLeft: '3px' }}>  · 前端开发工程师（实习）</span>
          <span className="time">2020年09月 - 2021年07月</span>
        </div>
        <div className="job-intro">参与公司的react项目、微信小程序项目的迭代与开发。实习期间曾参与多个项目，如：贺卡制作、显示、回显功能，报告评测体系模块，e-charts图表生成等。实现的功能均上线日活过万的app和小程序中。</div>
      </>
      <>
        <div className="section-line">
          <span className="company-name">上海市必加教育科技有限公司</span>
          <span style={{ marginLeft: '3px' }}>  · 前端开发工程师（实习）</span>
          <span className="time">2020年09月 - 2021年07月</span>
        </div>
        <div className="job-intro">参与公司的react项目、微信小程序项目的迭代与开发。实习期间曾参与多个项目，如：贺卡制作、显示、回显功能，报告评测体系模块，e-charts图表生成等。实现的功能均上线日活过万的app和小程序中。</div>
      </>
    </section>
  </div>
);

export default AboutMe;