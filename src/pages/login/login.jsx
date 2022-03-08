import React, { useState } from 'react';
import HttpClient from '../../utils/axios';
import toast from '../../utils/toast';

import './login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function doLogin() {
    if (!username || !password) {
      toast.showToast('信息输入不完善');
    }
    HttpClient.post('/api/login', {
      username,
      password,
    }).then((res) => {
      if (res.status === 500) {
        toast.showToast(res.data);
      } else if (res.status === 200)
        window.location.replace('/');
    }).catch(err => toast.showToast(err.message));
  }

  return (
    <div className='login-pannel'>
      <div>
        <input placeholder='用户名' onInput={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input placeholder='密码' type="password" onInput={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={doLogin}>登录</button>
      </div>
    </div>
  )
}

export default Login;