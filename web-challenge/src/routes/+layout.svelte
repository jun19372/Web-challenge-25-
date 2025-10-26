<script>
	import "../app.css";

	let { children } = $props();
</script>

<div class="h-screen flex flex-col">
	<main class="flex-1">
		{@render children?.()}
	</main>

	<div class="h-24 bg-primary text-primary-content flex justify-center">
		<a class="w-1/2 h-full" href="/">
			<button class="w-full h-full btn btn-ghost btn-primary">Log</button>
		</a>
		<a class="w-1/2 h-full" href="/stats">
			<button class="w-full h-full btn btn-ghost btn-primary"
				>Stats</button>
			>
		</a>
	</div>
</div>
