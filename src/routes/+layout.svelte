<script>
  import "../app.css";

  let { children } = $props();
</script>

<div class="h-screen flex flex-col">
  <main class="flex-1 p-4 pb-28">
    {@render children?.()}
  </main>

  <div
    class="fixed bottom-0 left-0 right-0 h-24 bg-primary text-primary-content flex justify-center shadow-lg"
  >
    <a class="w-1/2 h-full" href="/">
      <button class="w-full h-full btn btn-ghost btn-primary transition-colors">
        🏊‍♂️ Log
      </button>
    </a>
    <a class="w-1/2 h-full" href="/stats">
      <button class="w-full h-full btn btn-ghost btn-primary transition-colors">
        📊 Stats
      </button>
    </a>
  </div>
</div>
