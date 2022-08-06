<script>
	export let name;
</script>

<main>
	<div class="dot"></div>
	<div class="content">
		<h1>Hello {name}!</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium vitae perferendis impedit quas magni optio. Cumque nostrum consequatur similique culpa, fuga illum nobis iusto enim? Quisquam quas aspernatur omnis soluta.</p>
	</div>
</main>

<style>
	main {
		height: 100vh;
		padding: 1em;
		width: 600px;
		margin: 0 auto;
		display: flex;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		padding: 0;
		margin: 0;
	}

	.content {
		width: 500px;
	}

	.dot {
		width: 1em;
		height: 1em;
		border-radius: 50%;
		background: #ff3e00;
		margin: 35px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>