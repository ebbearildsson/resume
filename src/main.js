import App from './App.svelte';

let website_name = 'Pear';
let names = ['World', 'Resume', 'Svelte']

const app = new App({
	target: document.body,
	props: {
		names: names,
	}
});

export default app;