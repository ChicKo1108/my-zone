class Toast {
  constructor() {
    this.instance = null;
    this.currentNum = 0;
  }

  static getInstance () {
    if (!this.instance) this.instance = new Toast();
    return this.instance;
  }

  showToast(content, delay = 3) {
    const el = document.createElement('div');
    el.style = `position:fixed;top:${50 * this.currentNum + 50}px;left:50%;transform:translate(-50%, -50%);background:rgba(0,0,0,.5);color:#fff;font-size:14px;padding:5px 10px;border-radius:6px;z-index:99999999;`;
    el.innerText = content;
    document.body.appendChild(el);
    this.currentNum += 1;
    setTimeout(() => {
      document.body.removeChild(el);
      this.currentNum -= 1;
    }, delay * 1000);
  }
}

export default Toast.getInstance();