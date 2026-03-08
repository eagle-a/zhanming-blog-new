module.exports = [
"[project]/src/lib/markdown-renderer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderMarkdown",
    ()=>renderMarkdown,
    "slugify",
    ()=>slugify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/marked/lib/marked.esm.js [app-ssr] (ecmascript)");
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
        shikiModule = await __turbopack_context__.A("[externals]/shiki [external] (shiki, esm_import, async loader)");
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
        const mod = await __turbopack_context__.A("[project]/node_modules/katex/dist/katex.mjs [app-ssr] (ecmascript, async loader)");
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
    const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].Renderer();
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
        inner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].parser(tokens);
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].use({
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
    const tokens = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].lexer(markdown);
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
    const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].parser(tokens) || '';
    return {
        html,
        toc
    };
}
}),
"[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogModal",
    ()=>DialogModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DialogModal({ open, onClose, children, className, disableCloseOnOverlay = false, lockScroll = true, closeOnEsc = true }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lockScroll || !open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = previous;
        };
    }, [
        lockScroll,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!closeOnEsc || !open) return;
        const handler = (event)=>{
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>{
            window.removeEventListener('keydown', handler);
        };
    }, [
        closeOnEsc,
        onClose,
        open
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: 'fixed inset-0 z-50 flex items-center justify-center bg-card p-4 backdrop-blur-xl',
            onClick: disableCloseOnOverlay ? undefined : onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('static', className),
                onClick: (e)=>e.stopPropagation(),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/dialog-modal.tsx",
                lineNumber: 59,
                columnNumber: 6
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dialog-modal.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dialog-modal.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this), document.body);
}
}),
"[project]/src/components/markdown-image.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarkdownImage",
    ()=>MarkdownImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function MarkdownImage({ src, alt = '', title = '' }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: alt,
                title: title,
                loading: "lazy",
                onClick: ()=>setDisplay(true),
                className: "cursor-pointer transition-opacity hover:opacity-80"
            }, void 0, false, {
                fileName: "[project]/src/components/markdown-image.tsx",
                lineNumber: 17,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogModal"], {
                open: display,
                onClose: ()=>setDisplay(false),
                className: "max-w-none bg-transparent p-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: src,
                    alt: alt,
                    className: "max-h-[90vh] max-w-full rounded-2xl object-contain"
                }, void 0, false, {
                    fileName: "[project]/src/components/markdown-image.tsx",
                    lineNumber: 19,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/markdown-image.tsx",
                lineNumber: 18,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/code-block.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
'use client';
;
;
;
function CodeBlock({ children, code }) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy code:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "code-block-wrapper",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleCopy,
                className: "code-block-copy-btn",
                "aria-label": "Copy code",
                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/code-block.tsx",
                    lineNumber: 32,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/code-block.tsx",
                    lineNumber: 32,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/code-block.tsx",
                lineNumber: 26,
                columnNumber: 4
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/code-block.tsx",
        lineNumber: 25,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/hooks/use-markdown-render.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMarkdownRender",
    ()=>useMarkdownRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/html-react-parser/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-react-parser/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$markdown$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/markdown-renderer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$markdown$2d$image$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/markdown-image.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/code-block.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useMarkdownRender(markdown) {
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toc, setToc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function render() {
            setLoading(true);
            try {
                const { html, toc } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$markdown$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderMarkdown"])(markdown);
                if (!cancelled) {
                    // Extract pre elements and replace with placeholders before parsing
                    const codeBlocks = [];
                    let processedHtml = html.replace(/<pre\s+data-code="([^"]*)"([^>]*)>([\s\S]*?)<\/pre>/g, (match, codeAttr, attrs, content)=>{
                        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
                        // Decode HTML entities in code attribute
                        const code = codeAttr.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                        codeBlocks.push({
                            placeholder,
                            code,
                            preHtml: `${content}`
                        });
                        return placeholder;
                    });
                    // Parse HTML and replace img elements and code block placeholders
                    const options = {
                        replace (domNode) {
                            if (domNode instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Element"] && domNode.name === 'img') {
                                const { src, alt, title } = domNode.attribs;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$markdown$2d$image$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarkdownImage"], {
                                    src: src,
                                    alt: alt,
                                    title: title
                                }, void 0, false, {
                                    fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                    lineNumber: 50,
                                    columnNumber: 16
                                }, this);
                            }
                            // Handle code block placeholders in text nodes
                            if (domNode.type === 'text' && domNode.data && domNode.data.includes('__CODE_BLOCK_')) {
                                const text = domNode.data;
                                const result = text.split(/(__CODE_BLOCK_\d+__)/).filter(Boolean);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: result.map((item, index)=>{
                                        if (item.startsWith('__CODE_BLOCK_')) {
                                            const block = codeBlocks.find((b)=>b.placeholder === item);
                                            if (block) {
                                                const preElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(block.preHtml);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$code$2d$block$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CodeBlock"], {
                                                    code: block.code,
                                                    children: preElement
                                                }, block.placeholder, false, {
                                                    fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 15
                                                }, this);
                                            }
                                        } else {
                                            return item ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: item
                                            }, index, false, {
                                                fileName: "[project]/src/hooks/use-markdown-render.tsx",
                                                lineNumber: 72,
                                                columnNumber: 16
                                            }, this) : null;
                                        }
                                    })
                                }, void 0, false);
                            }
                        }
                    };
                    const reactContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(processedHtml, options);
                    setContent(reactContent);
                    setToc(toc);
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
        return ()=>{
            cancelled = true;
        };
    }, [
        markdown
    ]);
    return {
        content,
        toc,
        loading
    };
}
}),
"[project]/src/lib/aes256-util.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decrypt",
    ()=>decrypt,
    "encrypt",
    ()=>encrypt
]);
async function encrypt(text, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)) // 12字节IV
    ;
    const keyData = await crypto.subtle.digest('SHA-256', enc.encode(key));
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, {
        name: 'AES-GCM'
    }, false, [
        'encrypt'
    ]);
    const encrypted = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
    }, cryptoKey, enc.encode(text));
    // iv + 密文 一起转 base64 方便存储
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...result));
}
async function decrypt(cipherText, key) {
    const data = Uint8Array.from(atob(cipherText), (c)=>c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    const enc = new TextEncoder();
    const keyData = await crypto.subtle.digest('SHA-256', enc.encode(key));
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, {
        name: 'AES-GCM'
    }, false, [
        'decrypt'
    ]);
    const decrypted = await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv
    }, cryptoKey, encrypted);
    return new TextDecoder().decode(decrypted);
}
}),
"[project]/src/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAllAuthCache",
    ()=>clearAllAuthCache,
    "getAuthToken",
    ()=>getAuthToken,
    "getPemFromCache",
    ()=>getPemFromCache,
    "hasAuth",
    ()=>hasAuth,
    "savePemToCache",
    ()=>savePemToCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aes256-util.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const GITHUB_TOKEN_CACHE_KEY = 'github_token';
const GITHUB_PEM_CACHE_KEY = 'p_info';
function getTokenFromCache() {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        return sessionStorage.getItem(GITHUB_TOKEN_CACHE_KEY);
    } catch  {
        return null;
    }
}
function saveTokenToCache(token) {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.setItem(GITHUB_TOKEN_CACHE_KEY, token);
    } catch (error) {
        console.error('Failed to save token to cache:', error);
    }
}
function clearTokenCache() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.removeItem(GITHUB_TOKEN_CACHE_KEY);
    } catch (error) {
        console.error('Failed to clear token cache:', error);
    }
}
async function getPemFromCache() {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        // 解密缓存中的 pem
        const encryptedPem = sessionStorage.getItem(GITHUB_PEM_CACHE_KEY);
        if (!encryptedPem) return null;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decrypt"])(encryptedPem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
    } catch  {
        return null;
    }
}
async function savePemToCache(pem) {
    if (typeof sessionStorage === 'undefined') return;
    try {
        // 加密 pem 后存储
        const encryptedPem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encrypt"])(pem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
        sessionStorage.setItem(GITHUB_PEM_CACHE_KEY, encryptedPem);
    } catch (error) {
        console.error('Failed to save pem to cache:', error);
    }
}
function clearPemCache() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.removeItem(GITHUB_PEM_CACHE_KEY);
    } catch (error) {
        console.error('Failed to clear pem cache:', error);
    }
}
function clearAllAuthCache() {
    clearTokenCache();
    clearPemCache();
}
async function hasAuth() {
    return !!getTokenFromCache() || !!await getPemFromCache();
}
async function getAuthToken() {
    // 1. 先尝试从缓存获取 token
    const cachedToken = getTokenFromCache();
    if (cachedToken) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('使用缓存的令牌...');
        return cachedToken;
    }
    // 2. 获取私钥（从缓存）
    const privateKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().privateKey;
    if (!privateKey) {
        throw new Error('需要先设置私钥。请使用 useAuth().setPrivateKey()');
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在签发 JWT...');
    const jwt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signAppJwt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].APP_ID, privateKey);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取安装信息...');
    const installationId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInstallationId"])(jwt, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建安装令牌...');
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInstallationToken"])(jwt, installationId);
    saveTokenToCache(token);
    return token;
}
}),
"[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        isAuth: false,
        privateKey: null,
        setPrivateKey: async (key)=>{
            set({
                isAuth: true,
                privateKey: key
            });
            const { siteContent } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            if (siteContent?.isCachePem) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["savePemToCache"])(key);
            }
        },
        clearAuth: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearAllAuthCache"])();
            set({
                isAuth: false
            });
        },
        refreshAuthState: async ()=>{
            set({
                isAuth: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAuth"])()
            });
        },
        getAuthToken: async ()=>{
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            get().refreshAuthState();
            return token;
        }
    }));
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPemFromCache"])().then((key)=>{
    if (key) {
        useAuthStore.setState({
            privateKey: key
        });
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAuth"])().then((isAuth)=>{
    if (isAuth) {
        useAuthStore.setState({
            isAuth
        });
    }
});
}),
"[project]/src/lib/github-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GH_API",
    ()=>GH_API,
    "createBlob",
    ()=>createBlob,
    "createCommit",
    ()=>createCommit,
    "createInstallationToken",
    ()=>createInstallationToken,
    "createTree",
    ()=>createTree,
    "getFileSha",
    ()=>getFileSha,
    "getInstallationId",
    ()=>getInstallationId,
    "getRef",
    ()=>getRef,
    "listRepoFilesRecursive",
    ()=>listRepoFilesRecursive,
    "putFile",
    ()=>putFile,
    "readTextFileFromRepo",
    ()=>readTextFileFromRepo,
    "signAppJwt",
    ()=>signAppJwt,
    "toBase64Utf8",
    ()=>toBase64Utf8,
    "updateRef",
    ()=>updateRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsrsasign/lib/jsrsasign.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const GH_API = 'https://api.github.com';
function handle401Error() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().clearAuth();
    } catch (error) {
        console.error('Failed to clear auth cache:', error);
    }
}
function handle422Error() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('操作太快了，请操作慢一点');
}
function toBase64Utf8(input) {
    return btoa(unescape(encodeURIComponent(input)));
}
function signAppJwt(appId, privateKeyPem) {
    const now = Math.floor(Date.now() / 1000);
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };
    const payload = {
        iat: now - 60,
        exp: now + 8 * 60,
        iss: appId
    };
    const prv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KEYUTIL"].getKey(privateKeyPem);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KJUR"].jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(payload), prv);
}
async function getInstallationId(jwt, owner, repo) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/installation`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`installation lookup failed: ${res.status}`);
    const data = await res.json();
    return data.id;
}
async function createInstallationToken(jwt, installationId) {
    const res = await fetch(`${GH_API}/app/installations/${installationId}/access_tokens`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create token failed: ${res.status}`);
    const data = await res.json();
    return data.token;
}
async function getFileSha(token, owner, repo, path, branch) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`get file sha failed: ${res.status}`);
    const data = await res.json();
    return data && data.sha || undefined;
}
async function putFile(token, owner, repo, path, contentBase64, message, branch) {
    const sha = await getFileSha(token, owner, repo, path, branch);
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            content: contentBase64,
            branch,
            ...sha ? {
                sha
            } : {}
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`put file failed: ${res.status}`);
    return res.json();
}
async function getRef(token, owner, repo, ref) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/ref/${encodeURIComponent(ref)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`get ref failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.object.sha
    };
}
async function createTree(token, owner, repo, tree, baseTree) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tree,
            base_tree: baseTree
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create tree failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
async function createCommit(token, owner, repo, message, tree, parents) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            tree,
            parents
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create commit failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
async function updateRef(token, owner, repo, ref, sha, force = false) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/refs/${encodeURIComponent(ref)}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sha,
            force
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`update ref failed: ${res.status}`);
}
async function readTextFileFromRepo(token, owner, repo, path, ref) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`read file failed: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) || !data.content) return null;
    try {
        return decodeURIComponent(escape(atob(data.content)));
    } catch  {
        return atob(data.content);
    }
}
async function listRepoFilesRecursive(token, owner, repo, path, ref) {
    async function fetchPath(targetPath) {
        const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(targetPath)}?ref=${encodeURIComponent(ref)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        if (res.status === 401) handle401Error();
        if (res.status === 422) handle422Error();
        if (res.status === 404) return [];
        if (!res.ok) throw new Error(`read directory failed: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            const files = [];
            for (const item of data){
                if (item.type === 'file') {
                    files.push(item.path);
                } else if (item.type === 'dir') {
                    const nested = await fetchPath(item.path);
                    files.push(...nested);
                }
            }
            return files;
        }
        if (data?.type === 'file') return [
            data.path
        ];
        if (data?.type === 'dir') return fetchPath(data.path);
        return [];
    }
    return fetchPath(path);
}
async function createBlob(token, owner, repo, content, encoding = 'base64') {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            encoding
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create blob failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
}),
"[project]/src/app/about/services/push-about.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushAbout",
    ()=>pushAbout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
async function pushAbout(data) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新关于页面`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    const aboutJson = JSON.stringify(data, null, '\t');
    const aboutBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBase64Utf8"])(aboutJson), 'base64');
    treeItems.push({
        path: 'src/app/about/list.json',
        mode: '100644',
        type: 'blob',
        sha: aboutBlob.sha
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('发布成功！');
}
}),
"[project]/src/components/like-button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikeButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const ENDPOINT = 'https://blog-liker.yysuni1001.workers.dev/api/like';
const FETCH_TIMEOUT = 5000 // 5秒超时
;
// 带超时的 fetch 函数
async function fetchWithTimeout(url, options = {}, timeout = FETCH_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('请求超时');
        }
        throw error;
    }
}
function LikeButton({ slug = 'eagle-a', delay, className }) {
    slug = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BLOG_SLUG_KEY"] + slug;
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [justLiked, setJustLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>{
            setShow(true);
        }, delay || 1000);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (justLiked) {
            const timer = setTimeout(()=>setJustLiked(false), 600);
            return ()=>clearTimeout(timer);
        }
    }, [
        justLiked
    ]);
    const fetcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (url)=>{
        try {
            const res = await fetchWithTimeout(url, {
                method: 'GET',
                cache: 'no-store'
            });
            if (!res.ok) return null;
            const data = await res.json().catch(()=>({}));
            return typeof data?.count === 'number' ? data.count : null;
        } catch (error) {
            // 静默处理错误，不显示错误提示
            console.log('获取点赞数失败:', error);
            return null;
        }
    }, []);
    const { data: fetchedCount, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(slug ? `${ENDPOINT}?slug=${encodeURIComponent(slug)}` : null, fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 1000 * 10
    });
    const handleLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!slug) return;
        setLiked(true);
        setJustLiked(true);
        // Create particle effects
        const newParticles = Array.from({
            length: 6
        }, (_, i)=>({
                id: Date.now() + i,
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 - 30
            }));
        setParticles(newParticles);
        // Clear particles after animation
        setTimeout(()=>setParticles([]), 1000);
        try {
            const url = `${ENDPOINT}?slug=${encodeURIComponent(slug)}`;
            const res = await fetchWithTimeout(url, {
                method: 'POST'
            });
            const data = await res.json().catch(()=>({}));
            if (data.reason == 'rate_limited') (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])('谢谢啦😘，今天已经不能再点赞啦💕');
            const value = typeof data?.count === 'number' ? data.count : (fetchedCount ?? 0) + 1;
            await mutate(value, {
                revalidate: false
            });
        } catch (error) {
            // 静默处理错误，点赞动画仍然继续
            console.log('点赞请求失败:', error);
            // 即使请求失败，也更新本地状态
            await mutate((fetchedCount ?? 0) + 1, {
                revalidate: false
            });
        }
    }, [
        slug,
        fetchedCount,
        mutate
    ]);
    const count = typeof fetchedCount === 'number' ? fetchedCount : null;
    if (show) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
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
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('card heartbeat-container relative overflow-visible rounded-full p-3', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: particles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: "fill-rose-400 text-rose-400",
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/like-button.tsx",
                            lineNumber: 135,
                            columnNumber: 8
                        }, this)
                    }, particle.id, false, {
                        fileName: "[project]/src/components/like-button.tsx",
                        lineNumber: 123,
                        columnNumber: 7
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 121,
                columnNumber: 5
            }, this),
            typeof count === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                initial: {
                    scale: 0.4
                },
                animate: {
                    scale: 1
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute -top-2 left-9 min-w-6 rounded-full px-1.5 py-1 text-center text-xs text-white tabular-nums', liked ? 'bg-rose-400' : 'bg-gray-300'),
                children: count
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 141,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('heartbeat', liked ? 'fill-rose-400 text-rose-400' : 'fill-rose-200 text-rose-200'),
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/src/components/like-button.tsx",
                    lineNumber: 152,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 151,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/like-button.tsx",
        lineNumber: 113,
        columnNumber: 4
    }, this);
}
}),
"[project]/src/svgs/github.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _g, _defs;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgGithub = function SvgGithub(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 31"
    }, props), _g || (_g = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("g", {
        filter: "url(#github_svg__a)"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        fillRule: "evenodd",
        d: "M15.996 2a12.13 12.13 0 0 0-7.774 2.813 11.74 11.74 0 0 0-4.067 7.09 11.62 11.62 0 0 0 1.576 7.991 11.97 11.97 0 0 0 6.47 5.084c.596.11.82-.255.82-.566s-.012-1.21-.016-2.194c-3.338.712-4.043-1.392-4.043-1.392-.545-1.367-1.332-1.727-1.332-1.727-1.089-.73.082-.716.082-.716 1.206.084 1.84 1.216 1.84 1.216 1.069 1.802 2.808 1.281 3.491.977.107-.764.42-1.283.763-1.578-2.666-.297-5.468-1.308-5.468-5.826a4.52 4.52 0 0 1 1.236-3.165c-.124-.297-.535-1.496.117-3.124 0 0 1.007-.316 3.3 1.209a11.6 11.6 0 0 1 6.01 0c2.29-1.525 3.296-1.209 3.296-1.209.654 1.625.243 2.823.12 3.124a4.5 4.5 0 0 1 1.237 3.169c0 4.527-2.807 5.525-5.478 5.816.43.367.813 1.084.813 2.185 0 1.578-.014 2.847-.014 3.235 0 .315.216.681.824.566a11.97 11.97 0 0 0 6.47-5.085 11.62 11.62 0 0 0 1.576-7.991 11.74 11.74 0 0 0-4.07-7.091A12.13 12.13 0 0 0 16 2z",
        clipRule: "evenodd"
    }))), _defs || (_defs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("filter", {
        id: "github_svg__a",
        width: 32,
        height: 31,
        x: 0,
        y: 0,
        colorInterpolationFilters: "sRGB",
        filterUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feFlood", {
        floodOpacity: 0,
        result: "BackgroundImageFix"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        "in": "SourceAlpha",
        result: "hardAlpha",
        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feOffset", {
        dy: 2
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feGaussianBlur", {
        stdDeviation: 2
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feComposite", {
        in2: "hardAlpha",
        operator: "out"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feBlend", {
        in2: "BackgroundImageFix",
        result: "effect1_dropShadow_40_25"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("feBlend", {
        "in": "SourceGraphic",
        in2: "effect1_dropShadow_40_25",
        result: "shape"
    })))));
};
const __TURBOPACK__default__export__ = SvgGithub;
}),
"[project]/src/app/about/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"title":"关于本站","description":"一名热爱技术的在校大学生的个人博客","content":"## 关于我\n\n我是 **eagle-a**，一名热爱技术的在校大学生。\n\n### 教育经历\n- 2022 ~ 至今 **Harbin Engineering University** 本科在读\n\n### 兴趣爱好\n- 编程\n- 前端开发\n- 音乐\n\n### 技能\n- HTML\n- CSS\n- JavaScript\n- Vue\n\n### 个人主页\n- 网站：https://eagle-a.github.io\n- GitHub：https://github.com/eagle-a\n\n---\n\n📦 网站基于 Github 仓库完全存储，所有内容版本可控\n\n🚀 无后端，无 serverless function，纯静态站点\n\n✏️ 文章通过可视化 UI 直接编辑并提交到 Github 仓库\n\n## 技术栈\n\n- Next.js\n- React\n- TypeScript\n- Tailwind CSS\n- Motion\n- Github API\n\n---\n\n© 2026 eagle-a. All rights reserved."});}),
"[project]/src/app/about/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$markdown$2d$render$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-markdown-render.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$about$2f$services$2f$push$2d$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/about/services/push-about.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/like-button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$github$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/github.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$about$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/about/list.json (json)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
function Page() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$about$2f$list$2e$json__$28$json$29$__["default"]);
    const [originalData, setOriginalData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$about$2f$list$2e$json__$28$json$29$__["default"]);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPreviewMode, setIsPreviewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { content, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$markdown$2d$render$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMarkdownRender"])(data.content);
    const hideEditButton = siteContent.hideEditButton ?? false;
    const handleChoosePrivateKey = async (file)=>{
        try {
            const text = await file.text();
            setPrivateKey(text);
            await handleSave();
        } catch (error) {
            console.error('Failed to read private key:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('读取密钥文件失败');
        }
    };
    const handleSaveClick = ()=>{
        if (!isAuth) {
            keyInputRef.current?.click();
        } else {
            handleSave();
        }
    };
    const handleEnterEditMode = ()=>{
        setIsEditMode(true);
        setIsPreviewMode(false);
    };
    const handleSave = async ()=>{
        setIsSaving(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$about$2f$services$2f$push$2d$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pushAbout"])(data);
            setOriginalData(data);
            setIsEditMode(false);
            setIsPreviewMode(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('保存成功！');
        } catch (error) {
            console.error('Failed to save:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`保存失败: ${error?.message || '未知错误'}`);
        } finally{
            setIsSaving(false);
        }
    };
    const handleCancel = ()=>{
        setData(originalData);
        setIsEditMode(false);
        setIsPreviewMode(false);
    };
    const buttonText = isAuth ? '保存' : '导入密钥';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (!isEditMode && (e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                setIsEditMode(true);
                setIsPreviewMode(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        isEditMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: keyInputRef,
                type: "file",
                accept: ".pem",
                className: "hidden",
                onChange: async (e)=>{
                    const f = e.target.files?.[0];
                    if (f) await handleChoosePrivateKey(f);
                    if (e.currentTarget) e.currentTarget.value = '';
                }
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 94,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center px-6 pt-32 pb-12 max-sm:px-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-[800px]",
                    children: [
                        isEditMode ? isPreviewMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-4 text-4xl font-bold",
                                            children: data.title || '标题预览'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-secondary text-lg",
                                            children: data.description || '描述预览'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 9
                                }, this),
                                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-secondary text-center",
                                    children: "预览渲染中..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 10
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card relative p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prose prose-sm max-w-none",
                                        children: content
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/about/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 11
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 10
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 110,
                            columnNumber: 8
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "标题",
                                            className: "w-full px-4 py-3 text-center text-2xl font-bold",
                                            value: data.title,
                                            onChange: (e)=>setData({
                                                    ...data,
                                                    title: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "描述",
                                            className: "w-full px-4 py-3 text-center text-lg",
                                            value: data.description,
                                            onChange: (e)=>setData({
                                                    ...data,
                                                    description: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        placeholder: "Markdown 内容",
                                        className: "min-h-[400px] w-full resize-none text-sm",
                                        value: data.content,
                                        onChange: (e)=>setData({
                                                ...data,
                                                content: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/about/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 10
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 125,
                            columnNumber: 8
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    className: "mb-12 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mb-4 text-4xl font-bold",
                                            children: data.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-secondary text-lg",
                                            children: data.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/about/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 8
                                }, this),
                                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-secondary text-center",
                                    children: "加载中..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 9
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.8
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "card relative p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prose prose-sm max-w-none",
                                        children: content
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/about/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 10
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex items-center justify-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
                                    href: "https://github.com/eagle-a/zhanming-blog-new",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    initial: {
                                        opacity: 0,
                                        scale: 0.6
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    transition: {
                                        delay: 0
                                    },
                                    className: "bg-card flex h-[53px] w-[53px] items-center justify-center rounded-full border",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$github$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/app/about/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    slug: "open-source",
                                    delay: 0
                                }, void 0, false, {
                                    fileName: "[project]/src/app/about/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 170,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/about/page.tsx",
                    lineNumber: 107,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 106,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.6
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "fixed top-4 right-6 z-10 flex gap-3 max-sm:hidden",
                children: isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleCancel,
                            disabled: isSaving,
                            className: "rounded-xl border bg-white/60 px-6 py-2 text-sm",
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 190,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: ()=>setIsPreviewMode((prev)=>!prev),
                            disabled: isSaving,
                            className: `rounded-xl border bg-white/60 px-6 py-2 text-sm`,
                            children: isPreviewMode ? '继续编辑' : '预览'
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 198,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleSaveClick,
                            disabled: isSaving,
                            className: "brand-btn px-6",
                            children: isSaving ? '保存中...' : buttonText
                        }, void 0, false, {
                            fileName: "[project]/src/app/about/page.tsx",
                            lineNumber: 206,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true) : !hideEditButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                    whileHover: {
                        scale: 1.05
                    },
                    whileTap: {
                        scale: 0.95
                    },
                    onClick: handleEnterEditMode,
                    className: "rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80",
                    children: "编辑"
                }, void 0, false, {
                    fileName: "[project]/src/app/about/page.tsx",
                    lineNumber: 212,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/about/page.tsx",
                lineNumber: 187,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_7b437aaa._.js.map