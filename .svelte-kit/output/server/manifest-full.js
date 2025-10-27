export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BX9XGalg.js",app:"_app/immutable/entry/app.-tRtTFoc.js",imports:["_app/immutable/entry/start.BX9XGalg.js","_app/immutable/chunks/D1y-KcbH.js","_app/immutable/chunks/zU8_tSpd.js","_app/immutable/chunks/BkFCLO9E.js","_app/immutable/entry/app.-tRtTFoc.js","_app/immutable/chunks/BkFCLO9E.js","_app/immutable/chunks/zU8_tSpd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BPhsQgCv.js","_app/immutable/chunks/C96f0il0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/stats",
				pattern: /^\/stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
