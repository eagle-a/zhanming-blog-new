(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/markdown-renderer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderMarkdown",
    ()=>renderMarkdown,
    "slugify",
    ()=>slugify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/marked/lib/marked.esm.js [app-client] (ecmascript)");
;
function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '').trim().replace(/\s+/g, '-');
}
// Lazy load shiki to handle environments where it's not available (e.g., Cloudflare Workers)
let shikiModule = null;
let shikiLoadAttempted = false;
async function loadShiki() {
    if (shikiLoadAttempted) {
        return shikiModule;
    }
    shikiLoadAttempted = true;
    try {
        shikiModule = await __turbopack_context__.A("[project]/node_modules/shiki/dist/index.mjs [app-client] (ecmascript, async loader)");
        return shikiModule;
    } catch (error) {
        console.warn('Failed to load shiki module:', error);
        return null;
    }
}
// Lazy load katex to handle environments where it's not available (e.g., Cloudflare Workers)
let katexModule = null;
let katexLoadAttempted = false;
async function loadKatex() {
    if (katexModule) return katexModule;
    if (katexLoadAttempted) return null;
    katexLoadAttempted = true;
    try {
        // katex is published as CJS; depending on bundler/runtime the dynamic import
        // may return either the exports object directly or as `default`.
        const mod = await __turbopack_context__.A("[project]/node_modules/katex/dist/katex.mjs [app-client] (ecmascript, async loader)");
        katexModule = mod?.default ?? mod;
        return katexModule;
    } catch (error) {
        console.warn('Failed to load katex module:', error);
        return null;
    }
}
async function renderMarkdown(markdown) {
    // Load optional renderers first so they apply on the FIRST lex/parse pass.
    // (If we lex before registering extensions, math tokens won't ever be produced on a cold refresh.)
    const codeBlockMap = new Map();
    const [shiki, katex] = await Promise.all([
        loadShiki(),
        loadKatex()
    ]);
    // Render HTML with heading ids
    const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].Renderer();
    renderer.heading = (token)=>{
        const id = slugify(token.text || '');
        return `<h${token.depth} id="${id}">${token.text}</h${token.depth}>`;
    };
    renderer.code = (token)=>{
        // Check if this code block was pre-processed
        const codeData = codeBlockMap.get(token.text);
        if (codeData) {
            // Add data-code attribute with original code for copy functionality
            // Escape HTML entities for attribute value
            const escapedCode = codeData.original.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if (codeData.html) {
                // Shiki highlighted code
                return `<pre data-code="${escapedCode}">${codeData.html}</pre>`;
            }
            // Fallback for failed highlighting
            return `<pre data-code="${escapedCode}"><code>${codeData.original}</code></pre>`;
        }
        // Fallback to default (inline code, not code block)
        return `<code>${token.text}</code>`;
    };
    renderer.listitem = (token)=>{
        // Render inline markdown inside list items (e.g. links, emphasis)
        let inner = token.text;
        let tokens = token.tokens;
        if (token.task) tokens = tokens.slice(1);
        inner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parser(tokens);
        if (token.task) {
            const checkbox = token.checked ? '<input type="checkbox" checked disabled />' : '<input type="checkbox" disabled />';
            return `<li class="task-list-item">${checkbox} ${inner}</li>\n`;
        }
        return `<li>${inner}</li>\n`;
    };
    const renderMath = (content, displayMode)=>{
        if (!katex) {
            // Keep original delimiters if katex is not available
            return displayMode ? `$$${content}$$` : `$${content}$`;
        }
        try {
            return katex.renderToString(content, {
                displayMode,
                throwOnError: false,
                output: 'html',
                strict: 'ignore'
            });
        } catch  {
            return displayMode ? `$$${content}$$` : `$${content}$`;
        }
    };
    // Register extensions BEFORE lexing so math gets tokenized on cold refresh.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].use({
        renderer,
        extensions: [
            // Block math: $$ ... $$
            {
                name: 'mathBlock',
                level: 'block',
                start (src) {
                    return src.indexOf('$$');
                },
                tokenizer (src) {
                    const match = src.match(/^\$\$([\s\S]+?)\$\$(?:\n+|$)/);
                    if (!match) return;
                    return {
                        type: 'mathBlock',
                        raw: match[0],
                        text: match[1].trim()
                    };
                },
                renderer (token) {
                    return `${renderMath(token.text || '', true)}\n`;
                }
            },
            // Inline math: $ ... $
            {
                name: 'mathInline',
                level: 'inline',
                start (src) {
                    const idx = src.indexOf('$');
                    return idx === -1 ? undefined : idx;
                },
                tokenizer (src) {
                    // Avoid $$ (block) and escaped dollars
                    if (src.startsWith('$$')) return;
                    if (src.startsWith('\\$')) return;
                    const match = src.match(/^\$([^\n$]+?)\$/);
                    if (!match) return;
                    const inner = match[1];
                    // Heuristic: require some non-space content
                    if (!inner || !inner.trim()) return;
                    return {
                        type: 'mathInline',
                        raw: match[0],
                        text: inner.trim()
                    };
                },
                renderer (token) {
                    return renderMath(token.text || '', false);
                }
            }
        ]
    });
    // Pre-process with marked lexer first (after extensions are registered)
    const tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].lexer(markdown);
    // Extract TOC from parsed tokens (this correctly skips code blocks)
    const toc = [];
    function extractHeadings(tokenList) {
        for (const token of tokenList){
            if (token.type === 'heading' && token.depth <= 3) {
                // Use the parsed text (markdown syntax like links/code already stripped)
                const text = token.text;
                const id = slugify(text);
                toc.push({
                    id,
                    text,
                    level: token.depth
                });
            }
            // Recursively check nested tokens (e.g., in blockquotes, lists)
            if ('tokens' in token && token.tokens) {
                extractHeadings(token.tokens);
            }
        }
    }
    extractHeadings(tokens);
    // Pre-process code blocks with Shiki
    for (const token of tokens){
        if (token.type === 'code') {
            const codeToken = token;
            const originalCode = codeToken.text;
            const key = `__SHIKI_CODE_${codeBlockMap.size}__`;
            if (shiki) {
                try {
                    const html = await shiki.codeToHtml(originalCode, {
                        lang: codeToken.lang || 'text',
                        theme: 'one-light'
                    });
                    codeBlockMap.set(key, {
                        html,
                        original: originalCode
                    });
                    codeToken.text = key;
                } catch  {
                    // Keep original if highlighting fails
                    codeBlockMap.set(key, {
                        html: '',
                        original: originalCode
                    });
                    codeToken.text = key;
                }
            } else {
                // Fallback when shiki is not available
                codeBlockMap.set(key, {
                    html: '',
                    original: originalCode
                });
                codeToken.text = key;
            }
        }
    }
    const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parser(tokens) || '';
    return {
        html,
        toc
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dialog-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogModal",
    ()=>DialogModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DialogModal(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "5ef65f938847cf069ff73c376f35e0813f0926e7a03c35520f5a94ac3577cdc1") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5ef65f938847cf069ff73c376f35e0813f0926e7a03c35520f5a94ac3577cdc1";
    }
    const { open, onClose, children, className, disableCloseOnOverlay: t1, lockScroll: t2, closeOnEsc: t3 } = t0;
    const disableCloseOnOverlay = t1 === undefined ? false : t1;
    const lockScroll = t2 === undefined ? true : t2;
    const closeOnEsc = t3 === undefined ? true : t3;
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t4;
    let t5;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "DialogModal[useEffect()]": ()=>{
                setMounted(true);
            }
        })["DialogModal[useEffect()]"];
        t5 = [];
        $[1] = t4;
        $[2] = t5;
    } else {
        t4 = $[1];
        t5 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    let t7;
    if ($[3] !== lockScroll || $[4] !== open) {
        t6 = ({
            "DialogModal[useEffect()]": ()=>{
                if (!lockScroll || !open) {
                    return;
                }
                const previous = document.body.style.overflow;
                document.body.style.overflow = "hidden";
                return ()=>{
                    document.body.style.overflow = previous;
                };
            }
        })["DialogModal[useEffect()]"];
        t7 = [
            lockScroll,
            open
        ];
        $[3] = lockScroll;
        $[4] = open;
        $[5] = t6;
        $[6] = t7;
    } else {
        t6 = $[5];
        t7 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    let t9;
    if ($[7] !== closeOnEsc || $[8] !== onClose || $[9] !== open) {
        t8 = ({
            "DialogModal[useEffect()]": ()=>{
                if (!closeOnEsc || !open) {
                    return;
                }
                const handler = {
                    "DialogModal[useEffect() > handler]": (event)=>{
                        if (event.key === "Escape") {
                            onClose();
                        }
                    }
                }["DialogModal[useEffect() > handler]"];
                window.addEventListener("keydown", handler);
                return ()=>{
                    window.removeEventListener("keydown", handler);
                };
            }
        })["DialogModal[useEffect()]"];
        t9 = [
            closeOnEsc,
            onClose,
            open
        ];
        $[7] = closeOnEsc;
        $[8] = onClose;
        $[9] = open;
        $[10] = t8;
        $[11] = t9;
    } else {
        t8 = $[10];
        t9 = $[11];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t8, t9);
    if (!mounted) {
        return null;
    }
    let t10;
    if ($[12] !== children || $[13] !== className || $[14] !== disableCloseOnOverlay || $[15] !== onClose || $[16] !== open) {
        t10 = open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 z-50 flex items-center justify-center bg-card p-4 backdrop-blur-xl",
            onClick: disableCloseOnOverlay ? undefined : onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    scale: 0.8,
                    y: 20
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("static", className),
                onClick: _DialogModalMotionDivOnClick,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/dialog-modal.tsx",
                lineNumber: 123,
                columnNumber: 155
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dialog-modal.tsx",
            lineNumber: 117,
            columnNumber: 19
        }, this);
        $[12] = children;
        $[13] = className;
        $[14] = disableCloseOnOverlay;
        $[15] = onClose;
        $[16] = open;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/components/dialog-modal.tsx",
            lineNumber: 147,
            columnNumber: 24
        }, this), document.body);
        $[18] = t10;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    return t11;
}
_s(DialogModal, "1HETueMQFHnQEekrfLFLB/gw0JE=");
_c = DialogModal;
function _DialogModalMotionDivOnClick(e) {
    return e.stopPropagation();
}
var _c;
__turbopack_context__.k.register(_c, "DialogModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/markdown-image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarkdownImage",
    ()=>MarkdownImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MarkdownImage(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "7fcc7b879e9f2037325e1a8e51714f4c9e8eec44ce9634bf1548fd2e64f969b2") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7fcc7b879e9f2037325e1a8e51714f4c9e8eec44ce9634bf1548fd2e64f969b2";
    }
    const { src, alt: t1, title: t2 } = t0;
    const alt = t1 === undefined ? "" : t1;
    const title = t2 === undefined ? "" : t2;
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "MarkdownImage[<img>.onClick]": ()=>setDisplay(true)
        })["MarkdownImage[<img>.onClick]"];
        $[1] = t3;
    } else {
        t3 = $[1];
    }
    let t4;
    if ($[2] !== alt || $[3] !== src || $[4] !== title) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: alt,
            title: title,
            loading: "lazy",
            onClick: t3,
            className: "cursor-pointer transition-opacity hover:opacity-80"
        }, void 0, false, {
            fileName: "[project]/src/components/markdown-image.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[2] = alt;
        $[3] = src;
        $[4] = title;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "MarkdownImage[<DialogModal>.onClose]": ()=>setDisplay(false)
        })["MarkdownImage[<DialogModal>.onClose]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== alt || $[8] !== src) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: alt,
            className: "max-h-[90vh] max-w-full rounded-2xl object-contain"
        }, void 0, false, {
            fileName: "[project]/src/components/markdown-image.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[7] = alt;
        $[8] = src;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== display || $[11] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogModal"], {
            open: display,
            onClose: t5,
            className: "max-w-none bg-transparent p-0",
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/components/markdown-image.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[10] = display;
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t4 || $[14] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t4,
                t7
            ]
        }, void 0, true);
        $[13] = t4;
        $[14] = t7;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    return t8;
}
_s(MarkdownImage, "nOWmG5C542Nzw1cW1ktURuiMav0=");
_c = MarkdownImage;
var _c;
__turbopack_context__.k.register(_c, "MarkdownImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/code-block.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CodeBlock(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "4806c340daa70b7b1de3fd48ce060fbe60b0511bf4c3b83ecd0174c6cbdf5b49") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4806c340daa70b7b1de3fd48ce060fbe60b0511bf4c3b83ecd0174c6cbdf5b49";
    }
    const { children, code } = t0;
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] !== code) {
        t1 = ({
            "CodeBlock[handleCopy]": async ()=>{
                ;
                try {
                    await navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout({
                        "CodeBlock[handleCopy > setTimeout()]": ()=>setCopied(false)
                    }["CodeBlock[handleCopy > setTimeout()]"], 2000);
                } catch (t2) {
                    const error = t2;
                    console.error("Failed to copy code:", error);
                }
            }
        })["CodeBlock[handleCopy]"];
        $[1] = code;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleCopy = t1;
    let t2;
    if ($[3] !== copied) {
        t2 = copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/code-block.tsx",
            lineNumber: 48,
            columnNumber: 19
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/src/components/code-block.tsx",
            lineNumber: 48,
            columnNumber: 41
        }, this);
        $[3] = copied;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== handleCopy || $[6] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: handleCopy,
            className: "code-block-copy-btn",
            "aria-label": "Copy code",
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/code-block.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[5] = handleCopy;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== children || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "code-block-wrapper",
            children: [
                t3,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/code-block.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return t4;
}
_s(CodeBlock, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c = CodeBlock;
var _c;
__turbopack_context__.k.register(_c, "CodeBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-markdown-render.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMarkdownRender",
    ()=>useMarkdownRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/html-react-parser/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-react-parser/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$markdown$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/markdown-renderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$markdown$2d$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/markdown-image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2d$block$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/code-block.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function useMarkdownRender(markdown) {
    _s();
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toc, setToc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMarkdownRender.useEffect": ()=>{
            let cancelled = false;
            async function render() {
                setLoading(true);
                try {
                    const { html, toc: toc_0 } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$markdown$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderMarkdown"])(markdown);
                    if (!cancelled) {
                        // Extract pre elements and replace with placeholders before parsing
                        const codeBlocks = [];
                        let processedHtml = html.replace(/<pre\s+data-code="([^"]*)"([^>]*)>([\s\S]*?)<\/pre>/g, {
                            "useMarkdownRender.useEffect.render.processedHtml": (match, codeAttr, attrs, content_0)=>{
                                const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
                                // Decode HTML entities in code attribute
                                const code = codeAttr.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                                codeBlocks.push({
                                    placeholder,
                                    code,
                                    preHtml: `${content_0}`
                                });
                                return placeholder;
                            }
                        }["useMarkdownRender.useEffect.render.processedHtml"]);
                        // Parse HTML and replace img elements and code block placeholders
                        const options = {
                            replace (domNode) {
                                if (domNode instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Element"] && domNode.name === 'img') {
                                    const { src, alt, title } = domNode.attribs;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$markdown$2d$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkdownImage"], {
                                        src: src,
                                        alt: alt,
                                        title: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                        lineNumber: 52,
                                        columnNumber: 24
                                    }, this);
                                }
                                // Handle code block placeholders in text nodes
                                if (domNode.type === 'text' && domNode.data && domNode.data.includes('__CODE_BLOCK_')) {
                                    const text = domNode.data;
                                    const result = text.split(/(__CODE_BLOCK_\d+__)/).filter(Boolean);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: result.map({
                                            "useMarkdownRender.useEffect.render": (item, index)=>{
                                                if (item.startsWith('__CODE_BLOCK_')) {
                                                    const block = codeBlocks.find({
                                                        "useMarkdownRender.useEffect.render.block": (b)=>b.placeholder === item
                                                    }["useMarkdownRender.useEffect.render.block"]);
                                                    if (block) {
                                                        const preElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(block.preHtml);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2d$block$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeBlock"], {
                                                            code: block.code,
                                                            children: preElement
                                                        }, block.placeholder, false, {
                                                            fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 32
                                                        }, this);
                                                    }
                                                } else {
                                                    return item ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: item
                                                    }, index, false, {
                                                        fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 37
                                                    }, this) : null;
                                                }
                                            }
                                        }["useMarkdownRender.useEffect.render"])
                                    }, void 0, false);
                                }
                            }
                        };
                        const reactContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(processedHtml, options);
                        setContent(reactContent);
                        setToc(toc_0);
                    }
                } catch (error) {
                    console.error('Markdown render error:', error);
                    if (!cancelled) {
                        setContent(null);
                        setToc([]);
                    }
                } finally{
                    if (!cancelled) {
                        setLoading(false);
                    }
                }
            }
            render();
            return ({
                "useMarkdownRender.useEffect": ()=>{
                    cancelled = true;
                }
            })["useMarkdownRender.useEffect"];
        }
    }["useMarkdownRender.useEffect"], [
        markdown
    ]);
    return {
        content,
        toc,
        loading
    };
}
_s(useMarkdownRender, "UrEK4HQEZ95THdfp2i133+Qbkoo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/like-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikeButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const ENDPOINT = 'https://blog-liker.yysuni1001.workers.dev/api/like';
function LikeButton({ slug = 'eagle-a', delay, className }) {
    _s();
    slug = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOG_SLUG_KEY"] + slug;
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [justLiked, setJustLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LikeButton.useEffect": ()=>{
            setTimeout({
                "LikeButton.useEffect": ()=>{
                    setShow(true);
                }
            }["LikeButton.useEffect"], delay || 1000);
        }
    }["LikeButton.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LikeButton.useEffect": ()=>{
            if (justLiked) {
                const timer = setTimeout({
                    "LikeButton.useEffect.timer": ()=>setJustLiked(false)
                }["LikeButton.useEffect.timer"], 600);
                return ({
                    "LikeButton.useEffect": ()=>clearTimeout(timer)
                })["LikeButton.useEffect"];
            }
        }
    }["LikeButton.useEffect"], [
        justLiked
    ]);
    const fetcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikeButton.useCallback[fetcher]": async (url)=>{
            const res = await fetch(url, {
                method: 'GET',
                cache: 'no-store'
            });
            if (!res.ok) return null;
            const data = await res.json().catch({
                "LikeButton.useCallback[fetcher]": ()=>({})
            }["LikeButton.useCallback[fetcher]"]);
            return typeof data?.count === 'number' ? data.count : null;
        }
    }["LikeButton.useCallback[fetcher]"], []);
    const { data: fetchedCount, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(slug ? `${ENDPOINT}?slug=${encodeURIComponent(slug)}` : null, fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 1000 * 10
    });
    const handleLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikeButton.useCallback[handleLike]": async ()=>{
            if (!slug) return;
            setLiked(true);
            setJustLiked(true);
            // Create particle effects
            const newParticles = Array.from({
                length: 6
            }, {
                "LikeButton.useCallback[handleLike].newParticles": (_, i)=>({
                        id: Date.now() + i,
                        x: Math.random() * 60 - 30,
                        y: Math.random() * 60 - 30
                    })
            }["LikeButton.useCallback[handleLike].newParticles"]);
            setParticles(newParticles);
            // Clear particles after animation
            setTimeout({
                "LikeButton.useCallback[handleLike]": ()=>setParticles([])
            }["LikeButton.useCallback[handleLike]"], 1000);
            try {
                const url_0 = `${ENDPOINT}?slug=${encodeURIComponent(slug)}`;
                const res_0 = await fetch(url_0, {
                    method: 'POST'
                });
                const data_0 = await res_0.json().catch({
                    "LikeButton.useCallback[handleLike]": ()=>({})
                }["LikeButton.useCallback[handleLike]"]);
                if (data_0.reason == 'rate_limited') (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])('谢谢啦😘，今天已经不能再点赞啦💕');
                const value = typeof data_0?.count === 'number' ? data_0.count : (fetchedCount ?? 0) + 1;
                await mutate(value, {
                    revalidate: false
                });
            } catch  {
            // ignore
            }
        }
    }["LikeButton.useCallback[handleLike]"], [
        slug,
        fetchedCount,
        mutate
    ]);
    const count = typeof fetchedCount === 'number' ? fetchedCount : null;
    if (show) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        initial: {
            opacity: 0,
            scale: 0.6
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        whileHover: {
            scale: 1.05
        },
        whileTap: {
            scale: 0.95
        },
        "aria-label": "Like this post",
        onClick: handleLike,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('card heartbeat-container relative overflow-visible rounded-full p-3', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: particles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "pointer-events-none absolute inset-0 flex items-center justify-center",
                        initial: {
                            opacity: 1,
                            scale: 0,
                            x: 0,
                            y: 0
                        },
                        animate: {
                            opacity: [
                                1,
                                1,
                                0
                            ],
                            scale: [
                                0,
                                1.2,
                                0.8
                            ],
                            x: particle.x,
                            y: particle.y
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            duration: 0.8,
                            ease: 'easeOut'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: "fill-rose-400 text-rose-400",
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/like-button.tsx",
                            lineNumber: 117,
                            columnNumber: 8
                        }, this)
                    }, particle.id, false, {
                        fileName: "[project]/src/components/like-button.tsx",
                        lineNumber: 101,
                        columnNumber: 33
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 100,
                columnNumber: 5
            }, this),
            typeof count === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                initial: {
                    scale: 0.4
                },
                animate: {
                    scale: 1
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute -top-2 left-9 min-w-6 rounded-full px-1.5 py-1 text-center text-xs text-white tabular-nums', liked ? 'bg-rose-400' : 'bg-gray-300'),
                children: count
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 121,
                columnNumber: 35
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: justLiked ? {
                    scale: [
                        1,
                        1.4,
                        1
                    ],
                    rotate: [
                        0,
                        -10,
                        10,
                        0
                    ]
                } : {},
                transition: {
                    duration: 0.6,
                    ease: 'easeOut'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('heartbeat', liked ? 'fill-rose-400 text-rose-400' : 'fill-rose-200 text-rose-200'),
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/src/components/like-button.tsx",
                    lineNumber: 135,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 128,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/like-button.tsx",
        lineNumber: 89,
        columnNumber: 20
    }, this);
}
_s(LikeButton, "/kmsCSX60zlnMvYhgBgMGkxm52c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
_c = LikeButton;
var _c;
__turbopack_context__.k.register(_c, "LikeButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/blog-toc.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogToc",
    ()=>BlogToc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function BlogToc(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "ef92b59829eebe1181c0890d1f7c4594a4f452b9b40c33958e95e5d4eb766a99") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ef92b59829eebe1181c0890d1f7c4594a4f452b9b40c33958e95e5d4eb766a99";
    }
    const { toc, delay: t1 } = t0;
    const delay = t1 === undefined ? 0 : t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = new Set();
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    const [activeIds, setActiveIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    let t3;
    if ($[2] !== activeIds || $[3] !== toc) {
        let t4;
        if ($[5] !== toc) {
            t4 = ({
                "BlogToc[(anonymous)()]": (a, b)=>toc.findIndex({
                        "BlogToc[(anonymous)() > toc.findIndex()]": (item)=>item.id === a
                    }["BlogToc[(anonymous)() > toc.findIndex()]"]) - toc.findIndex({
                        "BlogToc[(anonymous)() > toc.findIndex()]": (item_0)=>item_0.id === b
                    }["BlogToc[(anonymous)() > toc.findIndex()]"])
            })["BlogToc[(anonymous)()]"];
            $[5] = toc;
            $[6] = t4;
        } else {
            t4 = $[6];
        }
        t3 = Array.from(activeIds).sort(t4);
        $[2] = activeIds;
        $[3] = toc;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const minActiveId = t3[0];
    let t4;
    let t5;
    if ($[7] !== toc) {
        t4 = ({
            "BlogToc[useEffect()]": ()=>{
                if (toc.length === 0) {
                    return;
                }
                const observers = new Map();
                toc.forEach({
                    "BlogToc[useEffect() > toc.forEach()]": (item_1)=>{
                        const element = document.getElementById(item_1.id);
                        if (!element) {
                            return;
                        }
                        const observer = new IntersectionObserver((entries)=>{
                            entries.forEach({
                                "BlogToc[useEffect() > toc.forEach() > <anonymous> > entries.forEach()]": (entry)=>{
                                    setActiveIds({
                                        "BlogToc[useEffect() > toc.forEach() > <anonymous> > entries.forEach() > setActiveIds()]": (prev)=>{
                                            const newSet = new Set(prev);
                                            if (entry.isIntersecting) {
                                                newSet.add(entry.target.id);
                                            } else {
                                                newSet.delete(entry.target.id);
                                            }
                                            return newSet;
                                        }
                                    }["BlogToc[useEffect() > toc.forEach() > <anonymous> > entries.forEach() > setActiveIds()]"]);
                                }
                            }["BlogToc[useEffect() > toc.forEach() > <anonymous> > entries.forEach()]"]);
                        }, {
                            rootMargin: "-100px 0px -100px 0px",
                            threshold: 0
                        });
                        observer.observe(element);
                        observers.set(item_1.id, observer);
                    }
                }["BlogToc[useEffect() > toc.forEach()]"]);
                return ()=>{
                    observers.forEach(_BlogTocUseEffectAnonymousObserversForEach);
                };
            }
        })["BlogToc[useEffect()]"];
        t5 = [
            toc
        ];
        $[7] = toc;
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            opacity: 0,
            scale: 0.8
        };
        t7 = {
            opacity: 1,
            scale: 1
        };
        $[10] = t6;
        $[11] = t7;
    } else {
        t6 = $[10];
        t7 = $[11];
    }
    let t8;
    if ($[12] !== delay) {
        t8 = {
            delay
        };
        $[12] = delay;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-secondary mb-2 font-medium",
            children: "目录"
        }, void 0, false, {
            fileName: "[project]/src/components/blog-toc.tsx",
            lineNumber: 143,
            columnNumber: 10
        }, this);
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== toc.length) {
        t10 = toc.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary",
            children: "暂无"
        }, void 0, false, {
            fileName: "[project]/src/components/blog-toc.tsx",
            lineNumber: 150,
            columnNumber: 31
        }, this);
        $[15] = toc.length;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== minActiveId || $[18] !== toc) {
        let t12;
        if ($[20] !== minActiveId) {
            t12 = ({
                "BlogToc[toc.map()]": (item_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `#${item_2.id}`,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("hover:text-brand relative block pl-3 transition-colors", item_2.id === minActiveId && "text-brand"),
                        style: {
                            paddingLeft: (item_2.level - 1) * 8
                        },
                        children: item_2.text
                    }, item_2.id + item_2.level, false, {
                        fileName: "[project]/src/components/blog-toc.tsx",
                        lineNumber: 161,
                        columnNumber: 41
                    }, this)
            })["BlogToc[toc.map()]"];
            $[20] = minActiveId;
            $[21] = t12;
        } else {
            t12 = $[21];
        }
        t11 = toc.map(t12);
        $[17] = minActiveId;
        $[18] = toc;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[22] !== t10 || $[23] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative max-h-[300px] space-y-2 overflow-auto",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-toc.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[22] = t10;
        $[23] = t11;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] !== t12 || $[26] !== t8) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t6,
            animate: t7,
            transition: t8,
            className: "bg-card w-full rounded-xl border p-3 text-sm",
            children: [
                t9,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-toc.tsx",
            lineNumber: 188,
            columnNumber: 11
        }, this);
        $[25] = t12;
        $[26] = t8;
        $[27] = t13;
    } else {
        t13 = $[27];
    }
    return t13;
}
_s(BlogToc, "kIKbMGCRlAfVNtWsIt0dL0nB7io=");
_c = BlogToc;
function _BlogTocUseEffectAnonymousObserversForEach(observer_0) {
    return observer_0.disconnect();
}
var _c;
__turbopack_context__.k.register(_c, "BlogToc");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/blog-sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogSidebar",
    ()=>BlogSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/like-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$toc$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blog-toc.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scroll$2d$top$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/scroll-top-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function BlogSidebar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "2678b49c02e141dc2282bed4035eba4a10d983fdb5ccff654607d95c5368cb9e") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2678b49c02e141dc2282bed4035eba4a10d983fdb5ccff654607d95c5368cb9e";
    }
    const { cover, summary, toc, slug } = t0;
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const summaryInContent = siteContent.summaryInContent ?? false;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            top: 24
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== cover) {
        t2 = cover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.8
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            transition: {
                delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1
            },
            className: "bg-card w-full rounded-xl border p-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: cover,
                alt: "cover",
                className: "h-auto w-full rounded-xl border object-cover"
            }, void 0, false, {
                fileName: "[project]/src/components/blog-sidebar.tsx",
                lineNumber: 58,
                columnNumber: 57
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 50,
            columnNumber: 19
        }, this);
        $[2] = cover;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== summary || $[5] !== summaryInContent) {
        t3 = summary && !summaryInContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.8
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            transition: {
                delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 2
            },
            className: "bg-card w-full rounded-xl border p-3 text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-secondary mb-2 font-medium",
                    children: "摘要"
                }, void 0, false, {
                    fileName: "[project]/src/components/blog-sidebar.tsx",
                    lineNumber: 74,
                    columnNumber: 65
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-secondary scrollbar-none max-h-[240px] cursor-text overflow-auto",
                    children: summary
                }, void 0, false, {
                    fileName: "[project]/src/components/blog-sidebar.tsx",
                    lineNumber: 74,
                    columnNumber: 120
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 66,
            columnNumber: 42
        }, this);
        $[4] = summary;
        $[5] = summaryInContent;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== toc) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$toc$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogToc"], {
            toc: toc,
            delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 3
        }, void 0, false, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[7] = toc;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== slug) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            slug: slug,
            delay: (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 4) * 1000
        }, void 0, false, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[9] = slug;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scroll$2d$top$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTopButton"], {
            delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 5
        }, void 0, false, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== t2 || $[13] !== t3 || $[14] !== t4 || $[15] !== t5) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky flex w-[200px] shrink-0 flex-col items-start gap-4 self-start max-sm:hidden",
            style: t1,
            children: [
                t2,
                t3,
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-sidebar.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[12] = t2;
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    return t7;
}
_s(BlogSidebar, "ggc7CeKQPakh9nY+4RHoP+gZ8aQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = BlogSidebar;
var _c;
__turbopack_context__.k.register(_c, "BlogSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/blog-preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogPreview",
    ()=>BlogPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$markdown$2d$render$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-markdown-render.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blog-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function BlogPreview(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "c2304ec68e74e58b6da8276be7a4744e215fad8c9c4a0af2f56d1d9a33e3652a") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c2304ec68e74e58b6da8276be7a4744e215fad8c9c4a0af2f56d1d9a33e3652a";
    }
    const { markdown, title, tags, date, summary, cover, slug } = t0;
    const { maxSM: isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    const { content, toc, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$markdown$2d$render$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarkdownRender"])(markdown);
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const summaryInContent = siteContent.summaryInContent ?? false;
    if (loading) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-secondary flex h-full items-center justify-center text-sm",
                children: "渲染中..."
            }, void 0, false, {
                fileName: "[project]/src/components/blog-preview.tsx",
                lineNumber: 51,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    let t1;
    let t2;
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0
        };
        t2 = {
            opacity: 1
        };
        t3 = {
            delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"]
        };
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] !== title) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center text-2xl font-semibold",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[5] = title;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== tags) {
        t5 = tags.map(_BlogPreviewTagsMap);
        $[7] = tags;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 px-8 text-center text-sm",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== date) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary mt-3 text-center text-sm",
            children: date
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[11] = date;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== summary || $[14] !== summaryInContent) {
        t8 = summary && summaryInContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary mt-6 cursor-text text-center text-sm",
            children: [
                "“",
                summary,
                "”"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 113,
            columnNumber: 41
        }, this);
        $[13] = summary;
        $[14] = summaryInContent;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] !== content) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "prose mt-6 max-w-none cursor-text",
            children: content
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 122,
            columnNumber: 10
        }, this);
        $[16] = content;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] !== t4 || $[19] !== t6 || $[20] !== t7 || $[21] !== t8 || $[22] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
            initial: t1,
            animate: t2,
            transition: t3,
            className: "card bg-article static flex-1 overflow-auto rounded-xl p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t4,
                    t6,
                    t7,
                    t8,
                    t9
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/blog-preview.tsx",
                lineNumber: 130,
                columnNumber: 140
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[18] = t4;
        $[19] = t6;
        $[20] = t7;
        $[21] = t8;
        $[22] = t9;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    let t11;
    if ($[24] !== cover || $[25] !== isMobile || $[26] !== slug || $[27] !== summary || $[28] !== toc) {
        t11 = !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogSidebar"], {
            cover: cover,
            summary: summary,
            toc: toc,
            slug: slug
        }, void 0, false, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 142,
            columnNumber: 24
        }, this);
        $[24] = cover;
        $[25] = isMobile;
        $[26] = slug;
        $[27] = summary;
        $[28] = toc;
        $[29] = t11;
    } else {
        t11 = $[29];
    }
    let t12;
    if ($[30] !== t10 || $[31] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-28 pb-12 max-sm:px-0",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/blog-preview.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[30] = t10;
        $[31] = t11;
        $[32] = t12;
    } else {
        t12 = $[32];
    }
    return t12;
}
_s(BlogPreview, "brYbm5fkncd8rx/LyJGO/la8K9U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$markdown$2d$render$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarkdownRender"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = BlogPreview;
function _BlogPreviewTagsMap(t) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: [
            "#",
            t
        ]
    }, t, true, {
        fileName: "[project]/src/components/blog-preview.tsx",
        lineNumber: 164,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "BlogPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/load-blog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadBlog",
    ()=>loadBlog
]);
async function loadBlog(slug) {
    if (!slug) {
        throw new Error('Slug is required');
    }
    // Load config.json
    let config = {};
    const configRes = await fetch(`/blogs/${encodeURIComponent(slug)}/config.json`);
    if (configRes.ok) {
        try {
            config = await configRes.json();
        } catch  {
            config = {};
        }
    }
    // Load index.md
    const mdRes = await fetch(`/blogs/${encodeURIComponent(slug)}/index.md`);
    if (!mdRes.ok) {
        throw new Error('Blog not found');
    }
    const markdown = await mdRes.text();
    return {
        slug,
        config,
        markdown,
        cover: config.cover
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-read-articles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReadArticles",
    ()=>useReadArticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useReadArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        readArticles: {},
        markAsRead: (slug)=>{
            set((state)=>({
                    readArticles: {
                        ...state.readArticles,
                        [slug]: true
                    }
                }));
        },
        isRead: (slug)=>{
            return get().readArticles[slug] === true;
        },
        clearAll: ()=>{
            set({
                readArticles: {}
            });
        }
    }), {
    name: 'blog-read-articles'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/liquid-grass/displacement-1.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/displacement-1.8f92a4fa.png");}),
"[project]/src/components/liquid-grass/displacement-1.png.mjs { IMAGE => \"[project]/src/components/liquid-grass/displacement-1.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/components/liquid-grass/displacement-1.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 210,
    height: 150,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAV0lEQVR42hXKMRHDMAwAQIMwEW2loQsSMRGSnGh0K5FgaN7Db7+e7/r/GJoiCTbruQWGpkiCfZ/QAkNTJMHuE0pgaIok2HXCJTA0RRLs64SPwNAUSbB5AZljYAGuuBcwAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/liquid-grass/displacement-2.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/displacement-2.f8e008f8.png");}),
"[project]/src/components/liquid-grass/displacement-2.png.mjs { IMAGE => \"[project]/src/components/liquid-grass/displacement-2.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/components/liquid-grass/displacement-2.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 420,
    height: 300,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAYElEQVR42n2OsQrAIBBD878V6eBSOUGo3ORU2++9RqRDQRwCIS+QQBVWH9jZYPkaSvSBWSTDXWGlEOS/hJkjQ5vAT770giwK0icCJyYlYebIoJEnN570BPtQog/M4gF7AWZBX9i0zuLQAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/liquid-grass/border.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/border.c778e4b7.png");}),
"[project]/src/components/liquid-grass/border.png.mjs { IMAGE => \"[project]/src/components/liquid-grass/border.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/components/liquid-grass/border.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 420,
    height: 300,
    blurWidth: 8,
    blurHeight: 6,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAUUlEQVR42nVOQQrAMAjTtqviQPT/n53p2M0FIiJJDI0xWFVXcX80M81Mx07MTB1gdPeb5py9oiAi6x0/OGbEIK4TnPcoEhGOYpW2wbpdKA7jAxPBAr9F8GTFAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/liquid-grass/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiquidGrass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/components/liquid-grass/displacement-1.png.mjs { IMAGE => "[project]/src/components/liquid-grass/displacement-1.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/components/liquid-grass/displacement-2.png.mjs { IMAGE => "[project]/src/components/liquid-grass/displacement-2.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/components/liquid-grass/border.png.mjs { IMAGE => "[project]/src/components/liquid-grass/border.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const width = 210;
const height = 150;
function LiquidGrass() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "c86a2ddcac47a0d98ca73fe94493aded313ca6566cd47d2c58a9eb6c90561a21") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c86a2ddcac47a0d98ca73fe94493aded313ca6566cd47d2c58a9eb6c90561a21";
    }
    const bodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(document.body);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "LiquidGrass[useEffect()]": ()=>{
                setTimeout({
                    "LiquidGrass[useEffect() > setTimeout()]": ()=>{
                        setShow(true);
                    }
                }["LiquidGrass[useEffect() > setTimeout()]"], 1000);
            }
        })["LiquidGrass[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    if (!show) {
        return null;
    }
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            opacity: 0
        };
        t3 = {
            opacity: 1
        };
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            width,
            height
        };
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            scale: 1.1
        };
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            display: "none"
        };
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t7;
    let t8;
    let t9;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feImage", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$1$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
            x: "0",
            y: "0",
            width: width,
            height: height,
            result: "magnifying_displacement_map"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "magnifying_displacement_map",
            scale: "24",
            xChannelSelector: "R",
            yChannelSelector: "G",
            result: "magnified_source"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
            in: "magnified_source",
            stdDeviation: "0",
            result: "blurred_source"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feImage", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$displacement$2d$2$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
            x: "0",
            y: "0",
            width: width,
            height: height,
            result: "displacement_map"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 100,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
            in: "blurred_source",
            in2: "displacement_map",
            scale: "80",
            xChannelSelector: "R",
            yChannelSelector: "G",
            result: "displaced"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 101,
            columnNumber: 11
        }, this);
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
            in: "displaced",
            type: "saturate",
            result: "displaced_saturated",
            values: "9"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feImage", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$border$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
            x: "0",
            y: "0",
            width: width,
            height: height,
            result: "specular_layer"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 103,
            columnNumber: 11
        }, this);
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
            in: "displaced_saturated",
            in2: "specular_layer",
            operator: "in",
            result: "specular_saturated"
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 104,
            columnNumber: 11
        }, this);
        $[8] = t10;
        $[9] = t11;
        $[10] = t12;
        $[11] = t13;
        $[12] = t14;
        $[13] = t7;
        $[14] = t8;
        $[15] = t9;
    } else {
        t10 = $[8];
        t11 = $[9];
        t12 = $[10];
        t13 = $[11];
        t14 = $[12];
        t7 = $[13];
        t8 = $[14];
        t9 = $[15];
    }
    let t15;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            colorInterpolationFilters: "sRGB",
            style: t6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                    id: "magnifying-glass-filter",
                    children: [
                        t7,
                        t8,
                        t9,
                        t10,
                        t11,
                        t12,
                        t13,
                        t14,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComponentTransfer", {
                            in: "specular_layer",
                            result: "specular_faded",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFuncA", {
                                type: "linear",
                                slope: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/liquid-grass/index.tsx",
                                lineNumber: 125,
                                columnNumber: 205
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/liquid-grass/index.tsx",
                            lineNumber: 125,
                            columnNumber: 140
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                            in: "specular_saturated",
                            in2: "displaced",
                            mode: "normal",
                            result: "withSaturation"
                        }, void 0, false, {
                            fileName: "[project]/src/components/liquid-grass/index.tsx",
                            lineNumber: 125,
                            columnNumber: 264
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feBlend", {
                            in: "specular_faded",
                            in2: "withSaturation",
                            mode: "normal"
                        }, void 0, false, {
                            fileName: "[project]/src/components/liquid-grass/index.tsx",
                            lineNumber: 125,
                            columnNumber: 353
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/liquid-grass/index.tsx",
                    lineNumber: 125,
                    columnNumber: 66
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/liquid-grass/index.tsx",
                lineNumber: 125,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[16] = t15;
    } else {
        t15 = $[16];
    }
    let t16;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t2,
            animate: t3,
            drag: true,
            dragConstraints: bodyRef,
            style: t4,
            className: "fixed top-16 right-1/2 z-90 select-none",
            whileTap: t5,
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 rounded-full",
                    style: {
                        backdropFilter: "url(#magnifying-glass-filter)",
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 9px, rgba(0, 0, 0, 0.05) 0px 2px 24px inset, rgba(255, 255, 255, 0.2) 0px -2px 24px inset"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/liquid-grass/index.tsx",
                    lineNumber: 132,
                    columnNumber: 182
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/liquid-grass/index.tsx",
            lineNumber: 132,
            columnNumber: 24
        }, this), document.body);
        $[17] = t16;
    } else {
        t16 = $[17];
    }
    return t16;
}
_s(LiquidGrass, "Ry04ce5+4i9hfgjkSNnDt5pGe3o=");
_c = LiquidGrass;
var _c;
__turbopack_context__.k.register(_c, "LiquidGrass");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/blog/[id]/blog-content.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blog-preview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$load$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/load-blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$read$2d$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-read-articles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/liquid-grass/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function BlogContent() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = Array.isArray(params?.id) ? params.id[0] : params?.id || '';
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { markAsRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$read$2d$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadArticles"])();
    const [blog, setBlog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogContent.useEffect": ()=>{
            let cancelled = false;
            async function run() {
                if (!slug) return;
                try {
                    setLoading(true);
                    const blogData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$load$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBlog"])(slug);
                    if (!cancelled) {
                        setBlog(blogData);
                        setError(null);
                        markAsRead(slug);
                    }
                } catch (e) {
                    if (!cancelled) setError(e?.message || '加载失败');
                } finally{
                    if (!cancelled) setLoading(false);
                }
            }
            run();
            return ({
                "BlogContent.useEffect": ()=>{
                    cancelled = true;
                }
            })["BlogContent.useEffect"];
        }
    }["BlogContent.useEffect"], [
        slug,
        markAsRead
    ]);
    const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogContent.useMemo[title]": ()=>blog?.config.title ? blog.config.title : slug
    }["BlogContent.useMemo[title]"], [
        blog?.config.title,
        slug
    ]);
    const date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogContent.useMemo[date]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(blog?.config.date).format('YYYY年 M月 D日')
    }["BlogContent.useMemo[date]"], [
        blog?.config.date
    ]);
    const tags = blog?.config.tags || [];
    const handleEdit = ()=>{
        router.push(`/write/${slug}`);
    };
    if (!slug) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary flex h-full items-center justify-center text-sm",
            children: "无效的链接"
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
            lineNumber: 57,
            columnNumber: 12
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary flex h-full items-center justify-center text-sm",
            children: "加载中..."
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-center text-sm text-red-500",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
            lineNumber: 63,
            columnNumber: 12
        }, this);
    }
    if (!blog) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary flex h-full items-center justify-center text-sm",
            children: "文章不存在"
        }, void 0, false, {
            fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
            lineNumber: 66,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogPreview"], {
                markdown: blog.markdown,
                title: title,
                tags: tags,
                date: date,
                summary: blog.config.summary,
                cover: blog.cover ? blog.cover.startsWith('http') ? blog.cover : `${origin}${blog.cover}` : undefined,
                slug: slug
            }, void 0, false, {
                fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
                lineNumber: 69,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    opacity: 0,
                    scale: 0.6
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                whileHover: {
                    scale: 1.05
                },
                whileTap: {
                    scale: 0.95
                },
                onClick: handleEdit,
                className: "absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80 max-sm:hidden",
                children: "编辑"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
                lineNumber: 71,
                columnNumber: 4
            }, this),
            slug === 'liquid-grass' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$liquid$2d$grass$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/blog/[id]/blog-content.tsx",
                lineNumber: 85,
                columnNumber: 32
            }, this)
        ]
    }, void 0, true);
}
_s(BlogContent, "YzuqELTE8XGjeow8Btm8bkrLzqE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$read$2d$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadArticles"]
    ];
});
_c = BlogContent;
var _c;
__turbopack_context__.k.register(_c, "BlogContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_9f70aa86._.js.map