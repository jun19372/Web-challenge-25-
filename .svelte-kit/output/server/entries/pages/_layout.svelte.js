import "clsx";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div class="h-screen flex flex-col"><main class="flex-1 p-4 pb-28">`);
  children?.($$renderer);
  $$renderer.push(`<!----></main> <div class="fixed bottom-0 left-0 right-0 h-24 bg-primary text-primary-content flex justify-center shadow-lg"><a class="w-1/2 h-full" href="/"><button class="w-full h-full btn btn-ghost btn-primary transition-colors">🏊‍♂️ Log</button></a> <a class="w-1/2 h-full" href="/stats"><button class="w-full h-full btn btn-ghost btn-primary transition-colors">📊 Stats</button></a></div></div>`);
}
export {
  _layout as default
};
