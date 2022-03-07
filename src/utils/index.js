class Utils {
  static doCopy(value) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
      input.select();
      document.execCommand('copy');
      console.log('复制成功');
    }
    document.body.removeChild(input);
  }
}

export default Utils