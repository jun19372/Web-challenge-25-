import { w as attr_class, x as ensure_array_like, y as clsx, z as attr, F as stringify } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let swimData = [];
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
      const [m, d] = str.split("/").map(Number);
      return (m ?? 0) * 100 + (d ?? 0);
    }
    function recentDays(n = 7) {
      return [...swimData].sort((a, b) => dateValue(b.date) - dateValue(a.date)).slice(0, n);
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
      return getBestTime(day.times);
    }
    function buildChangeMap() {
      const sorted = [...swimData].sort((a, b) => dateValue(b.date) - dateValue(a.date));
      const map = {};
      for (let i = 0; i < sorted.length; i++) {
        const curr = sorted[i];
        const next = sorted[i + 1];
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
      const sign = val > 0 ? "+" : "";
      return sign + val.toFixed(2) + "'";
    }
    function changeClass(val) {
      if (val == null || Number.isNaN(val)) return "text-base-content/50";
      if (val < 0) return "text-success";
      if (val > 0) return "text-error";
      return "text-base-content";
    }
    function isBest(time, times) {
      const best = getBestTime(times);
      return Math.abs(time - best) < 1e-6;
    }
    let lapInput = {};
    $$renderer2.push(`<div class="bg-primary text-primary-content p-6 mb-6 rounded-lg shadow-lg svelte-1uha8ag"><div class="text-center mb-4 svelte-1uha8ag"><h1 class="text-3xl font-bold mb-2 svelte-1uha8ag">🏊‍♂️ Swim Tracker</h1></div> <div class="grid grid-cols-2 gap-4 mb-4 svelte-1uha8ag"><div class="bg-base-100 rounded-lg p-4 text-center border border-base-200 svelte-1uha8ag"><div class="text-base-content/70 text-sm svelte-1uha8ag">Recent Best</div> <div class="text-2xl font-bold text-base-content svelte-1uha8ag">${escape_html(formatTime(getRecentBest()))}</div></div> <div class="bg-base-100 rounded-lg p-4 text-center border border-base-200 svelte-1uha8ag"><div class="text-base-content/70 text-sm svelte-1uha8ag">Recent Avg</div> <div class="text-2xl font-bold text-base-content svelte-1uha8ag">${escape_html(formatTime(getRecentAverage()))}</div></div></div></div> <div class="flex justify-center mb-4 svelte-1uha8ag"><div class="join svelte-1uha8ag"><button${attr_class(`join-item btn btn-sm ${stringify("btn-primary")}`, "svelte-1uha8ag")}>Best Times</button> <button${attr_class(`join-item btn btn-sm ${stringify("btn-outline")}`, "svelte-1uha8ag")}>Average Times</button></div></div> <div class="overflow-x-auto rounded-lg shadow-md bg-base-100 svelte-1uha8ag"><table class="table table-zebra svelte-1uha8ag"><thead class="bg-primary text-primary-content svelte-1uha8ag"><tr class="svelte-1uha8ag"><th class="svelte-1uha8ag">Date</th><th class="svelte-1uha8ag">${escape_html("Best Time")}</th><th class="svelte-1uha8ag">Change</th><th class="svelte-1uha8ag">Actions</th></tr></thead><tbody class="svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(swimData);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let day = each_array[index];
      $$renderer2.push(`<tr class="hover svelte-1uha8ag"><th class="font-medium svelte-1uha8ag">${escape_html(day.date)}</th><td class="font-mono text-lg svelte-1uha8ag">${escape_html(
        formatTime(getBestTime(day.times))
      )}</td><!---->`);
      {
        $$renderer2.push(`<td${attr_class(clsx(changeClass(changeFor(day))), "svelte-1uha8ag")}>${escape_html(formatChange(changeFor(day)))}</td>`);
      }
      $$renderer2.push(`<!----><td class="svelte-1uha8ag"><button class="btn btn-primary btn-outline btn-sm svelte-1uha8ag">view Details</button></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> <!--[-->`);
    const each_array_1 = ensure_array_like(swimData);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      let day = each_array_1[index];
      $$renderer2.push(`<dialog${attr("id", `modal_${stringify(index)}`)} class="modal svelte-1uha8ag"><div class="modal-box bg-base-100 text-base-content svelte-1uha8ag"><h3 class="font-bold text-lg mb-4 svelte-1uha8ag">🏊‍♂️ Lap Times for ${escape_html(day.date)}</h3> <div class="grid gap-2 mb-4 svelte-1uha8ag"><!--[-->`);
      const each_array_2 = ensure_array_like(day.times);
      for (let timeIndex = 0, $$length2 = each_array_2.length; timeIndex < $$length2; timeIndex++) {
        let time = each_array_2[timeIndex];
        $$renderer2.push(`<div class="bg-base-200 rounded p-3 flex justify-between items-center svelte-1uha8ag"><span class="font-mono text-lg flex items-center gap-2 svelte-1uha8ag">${escape_html(formatTime(time))} `);
        if (isBest(time, day.times)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span title="Best of day" aria-label="Best of day" class="svelte-1uha8ag">🥇</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span> <span class="text-sm opacity-70 svelte-1uha8ag">Lap ${escape_html(timeIndex + 1)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="join w-full mb-2 svelte-1uha8ag"><input type="number" step="0.001" min="0" placeholder="Add lap (minutes)" class="input join-item w-full outline-none svelte-1uha8ag"${attr("value", lapInput[day.date] ?? "")}/> <button class="btn btn-accent join-item svelte-1uha8ag">Add</button></div> <div class="bg-base-200 rounded-lg p-3 mb-4 svelte-1uha8ag"><div class="flex justify-between text-sm svelte-1uha8ag"><span class="svelte-1uha8ag">Best: <strong class="svelte-1uha8ag">${escape_html(formatTime(getBestTime(day.times)))}</strong></span> <span class="svelte-1uha8ag">Average: <strong class="svelte-1uha8ag">${escape_html(formatTime(getAverageTime(day.times)))}</strong></span></div></div> <div class="modal-action svelte-1uha8ag"><form method="dialog" class="svelte-1uha8ag"><button class="btn btn-accent svelte-1uha8ag">Close</button></form></div></div></dialog>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
