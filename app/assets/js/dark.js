window.THEME = {
	prefersTheme() {
		return (window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
	},
	cookieTheme() {
		let json = document.cookie.match(/express:sess=(\S*);?/)
		if (!json) return false;
		return JSON.parse(atob(json[1])).theme;
	},
	getTheme() {
		return this.cookieTheme() || this.prefersTheme();
	},
	setTheme(theme) {
		if(this.getTheme() == theme) return;
		fetch('/set-theme/' + theme);
		(theme == 'dark')
		? document.documentElement.setAttribute('data-dark', '')
		: document.documentElement.removeAttribute('data-dark');
	},
	init() {
		if(!this.cookieTheme()) this.setTheme(this.prefersTheme());
	}
}

window.THEME.init();