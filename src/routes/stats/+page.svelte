<script>
  import { onMount, onDestroy } from "svelte";
  import Chart from "chart.js/auto";

  let chartEl = $state(null);
  let chartInstance = null;
  let swimData = $state([]);

  function formatTime(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(2) + "'";
  }

  function getBestTime(times) {
    return Math.min(...times);
  }

  function getAverageTime(times) {
    return times.reduce((a, b) => a + b, 0) / times.length;
  }

  function dateValue(str) {
    // expects M/D
    const [m, d] = (str ?? "").split("/").map(Number);
    return (m || 0) * 100 + (d || 0);
  }

  function loadData() {
    const stored = localStorage.getItem("swimRecords");
    try {
      const raw = stored ? JSON.parse(stored) : [];

      if (Array.isArray(raw)) {
        swimData = raw;
      } else {
        swimData = [];
      }
    } catch (e) {
      console.error(e);
      swimData = [];
    }
  }

  function buildSeries() {
    console.log("buildSeries!");
    const sorted = [...swimData].sort(
      (a, b) => dateValue(a.date) - dateValue(b.date)
    );
    console.log("sorted", sorted);
    const labels = sorted.map((d) => d.date);
    const best = sorted.map((d) => getBestTime(d.times));
    const avg = sorted.map((d) => getAverageTime(d.times));
    return { labels, best, avg };
  }

  function renderChart() {
    console.log("chartEl", chartEl);
    if (!chartEl) return;
    const { labels, best, avg } = buildSeries();

    const data = {
      labels,
      datasets: [
        {
          label: "Best (min)",
          data: best,
          borderColor: "#22c55e", // success
          backgroundColor: "rgba(34,197,94,0.2)",
          tension: 0.25,
          pointRadius: 3,
          borderWidth: 2,
        },
        {
          label: "Average (min)",
          data: avg,
          borderColor: "#3b82f6", // primary-ish
          backgroundColor: "rgba(59,130,246,0.2)",
          tension: 0.25,
          pointRadius: 3,
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true, labels: { usePointStyle: true } },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatTime(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        y: {
          title: { display: true, text: "Minutes" },
          ticks: {
            callback: (v) => formatTime(v),
          },
          beginAtZero: false,
        },
        x: {
          title: { display: true, text: "Date" },
        },
      },
    };

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(chartEl, { type: "line", data, options });
  }
  onMount(() => {
    loadData();

    // Wait for chartEl to be available
    const checkChart = () => {
      if (chartEl) {
        renderChart();
      } else {
        requestAnimationFrame(checkChart);
      }
    };
    checkChart();
  });

  onDestroy(() => {
    if (chartInstance) chartInstance.destroy();
  });
</script>

<div class="p-4">
  <div class="mb-4">
    <h1 class="text-2xl font-bold">📈 Stats</h1>
    <p class="text-base-content/70 text-sm">Daily Best vs Average lap time</p>
  </div>

  {#if swimData.length === 0}
    <div class="alert bg-base-200 text-base-content">
      <span>No records yet. Add laps on the Log page.</span>
    </div>
  {:else}
    <div
      class="bg-base-100 rounded-lg border border-base-200 shadow-sm p-3 h-[380px]"
    >
      <canvas bind:this={chartEl}></canvas>
    </div>
  {/if}
</div>

<style>
  /* Ensure the canvas fills the container height on mobile */
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
