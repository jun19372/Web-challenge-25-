import "clsx";
import { b as ssr_context } from "../../../chunks/context.js";
import "chart.js/auto";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let swimData = [];
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="p-4"><div class="mb-4"><h1 class="text-2xl font-bold">📈 Stats</h1> <p class="text-base-content/70 text-sm">Daily Best vs Average lap time</p></div> `);
    if (swimData.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert bg-base-200 text-base-content"><span>No records yet. Add laps on the Log page.</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="bg-base-100 rounded-lg border border-base-200 shadow-sm p-3 h-[380px]"><canvas class="svelte-16pwk6k"></canvas></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
