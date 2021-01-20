(() => {
  // get cookie
  let dark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  dark
    ? document.documentElement.setAttribute('data-dark', '')
    : document.documentElement.removeAttribute('data-dark');
  
  let cookie = document.cookie.match(/express:sess=(\S*);?/);
  
  if (cookie && cookie[1]) {
    cookie = JSON.parse(atob(cookie[1])).theme;
    let cookieDark = cookie == 'dark';
    if (cookieDark == dark) return;
  }
  fetch('/set-theme/' + (dark ? 'dark' : 'light'));
})();
