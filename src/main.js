import App from './App.svelte';

let website_name = 'Pear';

const app = new App({
	target: document.body,
	props: {
		name: website_name,
	}
});

export default app;