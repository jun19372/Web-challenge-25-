<script>
  import { onMount } from "svelte";

  let swimData = $state([]);
  let showBest = $state(true);
  let allRecordsModalOpen = $state(false);

  // Sample data - replace with localStorage data
  const sampleData = [
    { date: "10/6", times: [5.067, 8.45, 6.04, 8.05, 9.023] },
    { date: "10/5", times: [5.067, 8.45, 6.04, 8.05, 9.023] },
    { date: "10/4", times: [6.767, 8.45, 6.04, 8.05, 9.023] },
    { date: "10/3", times: [11.1, 8.33, 8.33, 6.7, 6.9] },
    { date: "10/2", times: [7.9, 8.33, 7.01, 10.13, 9.03, 14.04] },
    { date: "10/1", times: [18.4, 19.2, 20.1, 18.8, 19.5] },
  ];

  onMount(() => {
    // Load data from localStorage
    const stored = localStorage.getItem("swimRecords");
    if (stored) {
      swimData = JSON.parse(stored);
    } else {
      swimData = sampleData;
      localStorage.setItem("swimRecords", JSON.stringify(sampleData));
    }
  });

  function getBestTime(times) {
    return Math.min(...times);
  }

  function getAverageTime(times) {
    return times.reduce((a, b) => a + b, 0) / times.length;
  }

  function formatTime(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(2) + "'";
  }

  function dateValue(str) {
    // expects M/D
    const [m, d] = str.split("/").map(Number);
    return (m ?? 0) * 100 + (d ?? 0);
  }

  function recentDays(n = 7) {
    // sort copy by date desc, then take first n
    return [...swimData]
      .sort((a, b) => dateValue(b.date) - dateValue(a.date))
      .slice(0, n);
  }

  function getRecentBest() {
    if (swimData.length === 0) return 0;
    const recentTimes = recentDays(7).flatMap((day) => day.times);
    return getBestTime(recentTimes);
  }

  function getRecentAverage() {
    if (swimData.length === 0) return 0;
    const recentTimes = recentDays(7).flatMap((day) => day.times);
    return getAverageTime(recentTimes);
  }

  function metricForDay(day) {
    return showBest ? getBestTime(day.times) : getAverageTime(day.times);
  }

  function buildChangeMap() {
    const sorted = [...swimData].sort(
      (a, b) => dateValue(b.date) - dateValue(a.date)
    );
    const map = {};
    for (let i = 0; i < sorted.length; i++) {
      const curr = sorted[i];
      const next = sorted[i + 1]; // previous day chronologically
      const currVal = metricForDay(curr);
      const nextVal = next ? metricForDay(next) : null;
      map[curr.date] = nextVal == null ? null : currVal - nextVal;
    }
    return map;
  }

  function changeFor(day) {
    const map = buildChangeMap();
    return map[day.date];
  }

  function formatChange(val) {
    if (val == null || Number.isNaN(val)) return "—";
    const sign = val > 0 ? "+" : ""; // negative means improvement (faster)
    return sign + val.toFixed(2) + "'";
  }

  function changeClass(val) {
    if (val == null || Number.isNaN(val)) return "text-base-content/50";
    if (val < 0) return "text-success"; // improved
    if (val > 0) return "text-error"; // slower
    return "text-base-content";
  }

  // Mark best time in a day (with tolerance for floating point)
  function isBest(time, times) {
    const best = getBestTime(times);
    return Math.abs(time - best) < 1e-6;
  }

  // Input state for adding laps per day
  let lapInput = $state({});

  function addLap(day) {
    const raw = lapInput[day.date];
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) return;

    const updated = swimData.map((d) =>
      d.date === day.date ? { ...d, times: [...d.times, n] } : d
    );
    swimData = updated;
    localStorage.setItem("swimRecords", JSON.stringify(updated));
    lapInput[day.date] = "";
  }
</script>

<div class="bg-primary text-primary-content p-6 mb-6 rounded-lg shadow-lg">
  <div class="text-center mb-4">
    <h1 class="text-3xl font-bold mb-2">Velox</h1>
    <h2 class="text-3x-1 font-bold mb-1">Swimming mode 🏊</h2> 
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="bg-base-100 rounded-lg p-4 text-center border border-base-200">
      <div class="text-base-content/70 text-sm">Recent Best</div>
      <div class="text-2xl font-bold text-base-content">
        {formatTime(getRecentBest())}
      </div>
    </div>
    <div class="bg-base-100 rounded-lg p-4 text-center border border-base-200">
      <div class="text-base-content/70 text-sm">Recent Avg</div>
      <div class="text-2xl font-bold text-base-content">
        {formatTime(getRecentAverage())}
      </div>
    </div>
  </div>
</div>
<!-- Toggle buttons -->
<div class="flex justify-center mb-4">
  <div class="join">
    <button
      class="join-item btn btn-sm {showBest ? 'btn-primary' : 'btn-outline'}"
      onclick={() => (showBest = true)}
    >
      Best Times
    </button>
    <button
      class="join-item btn btn-sm {!showBest ? 'btn-primary' : 'btn-outline'}"
      onclick={() => (showBest = false)}
    >
      Average Times
    </button>
  </div>
</div>

<!-- Main Table -->
<div class="overflow-x-auto rounded-lg shadow-md bg-base-100">
  <table class="table table-zebra">
    <thead class="bg-primary text-primary-content">
      <tr>
        <th>Date</th>
        <th>{showBest ? "Best Time" : "Average Time"}</th>
        <th>Change</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each swimData as day, index (day.date)}
        <tr class="hover">
          <th class="font-medium">{day.date}</th>
          <td class="font-mono text-lg">
            {showBest
              ? formatTime(getBestTime(day.times))
              : formatTime(getAverageTime(day.times))}
          </td>
          {#key showBest}
            <td class={changeClass(changeFor(day))}
              >{formatChange(changeFor(day))}</td
            >
          {/key}
          <td>
            <button
              class="btn btn-primary btn-outline btn-sm"
              onclick={() =>
                document.getElementById(`modal_${index}`).showModal()}
            >
              view Details
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- Daily Detail Modals -->
{#each swimData as day, index (day.date)}
  <dialog id="modal_{index}" class="modal">
    <div class="modal-box bg-base-100 text-base-content">
      <h3 class="font-bold text-lg mb-4">🏊‍♂️ Lap Times for {day.date}</h3>
      <div class="grid gap-2 mb-4">
        {#each day.times as time, timeIndex}
          <div
            class="bg-base-200 rounded p-3 flex justify-between items-center"
          >
            <span class="font-mono text-lg flex items-center gap-2">
              {formatTime(time)}
              {#if isBest(time, day.times)}
                <span title="Best of day" aria-label="Best of day">🥇</span>
              {/if}
            </span>
            <span class="text-sm opacity-70">Lap {timeIndex + 1}</span>
          </div>
        {/each}
      </div>
      <!-- Add new lap input -->
      <div class="join w-full mb-2">
        <input
          type="number"
          step="0.001"
          min="0"
          placeholder="Add lap (minutes)"
          class="input join-item w-full outline-none"
          value={lapInput[day.date] ?? ""}
          oninput={(e) => (lapInput[day.date] = e.currentTarget.value)}
        />
        <button class="btn btn-accent join-item" onclick={() => addLap(day)}>
          Add
        </button>
      </div>
      <div class="bg-base-200 rounded-lg p-3 mb-4">
        <div class="flex justify-between text-sm">
          <span
            >Best: <strong>{formatTime(getBestTime(day.times))}</strong></span
          >
          <span
            >Average: <strong>{formatTime(getAverageTime(day.times))}</strong
            ></span
          >
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-accent">Close</button>
        </form>
      </div>
    </div>
  </dialog>
{/each}

<style>
  /* Mobile-first responsive design */
  @media (max-width: 640px) {
    .modal-box {
      margin: 1rem;
      max-height: 90vh;
    }

    .grid {
      gap: 0.5rem;
    }

    .table {
      font-size: 0.875rem;
    }
  }

  /* Smooth animations for mobile */
  .btn {
    transition: all 0.2s ease;
  }

  .btn:active {
    transform: scale(0.95);
  }

  /* Custom scrollbar for better mobile experience */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }

  /* Swimming-themed animations */
  @keyframes wave {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .animate-wave {
    animation: wave 2s ease-in-out infinite;
  }
</style>
