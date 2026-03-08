module.exports = [
"[externals]/shiki [external] (shiki, esm_import, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_shiki_9f6363af._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/shiki [external] (shiki, esm_import)");
    });
});
}),
"[project]/node_modules/katex/dist/katex.mjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_katex_dist_katex_mjs_d037b3b1._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/katex/dist/katex.mjs [app-ssr] (ecmascript)");
    });
});
}),
];