<script>
	export let names;
	let index = 0;
	let name = names[index];

	setInterval(function(){ 
		name = switch_name(names)
	}, 1000);

	function switch_name(list) {
		index += 1
		return list[index % list.length];
	}
</script>

<main>
	<div class="content">
		<h1 class="elevated">Hello {name}!</h1>
		<p class="elevated">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium vitae perferendis impedit quas magni optio. Cumque nostrum consequatur similique culpa, fuga illum nobis iusto enim? Quisquam quas aspernatur omnis soluta.</p>
	</div>
</main>

<style>
	main {
		height: 100vh;
		padding: 1em;
		width: 600px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		text-align: center;
		font-size: 4em;
		font-weight: 100;
		margin: 0;
	}

	.elevated {
		padding: 10px;
		border-radius: 15px;
		box-shadow: 5px 5px 8px #101010, -5px -5px 8px #282828;
	}

	.content {
		width: 500px;
	}
</style>