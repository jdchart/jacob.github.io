export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "sveltekit-github-pages/_app",
	assets: new Set([".nojekyll","favicon.png","fonts/Input Mono Narrow/InputMonoNarrow-Black.ttf","fonts/Input Mono Narrow/InputMonoNarrow-BlackItalic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Bold.ttf","fonts/Input Mono Narrow/InputMonoNarrow-BoldItalic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-ExtraLight.ttf","fonts/Input Mono Narrow/InputMonoNarrow-ExtraLightItalic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Italic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Light.ttf","fonts/Input Mono Narrow/InputMonoNarrow-LightItalic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Medium.ttf","fonts/Input Mono Narrow/InputMonoNarrow-MediumItalic.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Regular.ttf","fonts/Input Mono Narrow/InputMonoNarrow-Thin.ttf","fonts/Input Mono Narrow/InputMonoNarrow-ThinItalic.ttf","fonts/steinbeck/SteinbeckItalic.otf","fonts/steinbeck/SteinbeckItalic.woff","logos/R2-black.png","logos/R2.png","logos/cc-black.png","logos/cc.png","logos/erc-black.png","logos/erc.png","logos/europe-black.png","logos/europe.png","svg/ST2404-trame-SML.svg"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf",".otf":"font/otf",".woff":"font/woff",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.BfFp5BNU.js","app":"_app/immutable/entry/app.Dyf-_5Ui.js","imports":["_app/immutable/entry/start.BfFp5BNU.js","_app/immutable/chunks/entry.DOH-cCmp.js","_app/immutable/chunks/scheduler.C0r85OrY.js","_app/immutable/chunks/paths.B3X7Ppiu.js","_app/immutable/entry/app.Dyf-_5Ui.js","_app/immutable/chunks/scheduler.C0r85OrY.js","_app/immutable/chunks/index.C09OKYEn.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/explorer",
				pattern: /^\/explorer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
