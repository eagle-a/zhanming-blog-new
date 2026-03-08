(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/file-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fileToBase64NoPrefix",
    ()=>fileToBase64NoPrefix,
    "hashFileSHA256",
    ()=>hashFileSHA256,
    "readFileAsText",
    ()=>readFileAsText
]);
'use client';
function readFileAsText(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
function fileToBase64NoPrefix(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            const dataUrl = String(reader.result || '');
            resolve(dataUrl.replace(/^data:[^;]+;base64,/, ''));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
async function hashFileSHA256(file) {
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const bytes = new Uint8Array(digest);
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        const h = bytes[i].toString(16).padStart(2, '0');
        hex += h;
    }
    return hex.slice(0, 16);
}
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
"[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDateTimeLocal",
    ()=>formatDateTimeLocal,
    "useWriteStore",
    ()=>useWriteStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$load$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/load-blog.ts [app-client] (ecmascript)");
;
;
;
;
const formatDateTimeLocal = (date = new Date())=>{
    const pad = (n)=>String(n).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};
const initialForm = {
    slug: '',
    title: '',
    md: '',
    tags: [],
    date: formatDateTimeLocal(),
    summary: '',
    hidden: false,
    category: ''
};
const useWriteStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        // Mode state
        mode: 'create',
        originalSlug: null,
        setMode: (mode, originalSlug)=>set({
                mode,
                originalSlug: originalSlug || null
            }),
        // Form state
        form: {
            ...initialForm
        },
        updateForm: (updates)=>set((state)=>({
                    form: {
                        ...state.form,
                        ...updates
                    }
                })),
        setForm: (form)=>set({
                form
            }),
        // Image state
        images: [],
        addUrlImage: (url)=>{
            const { images } = get();
            const exists = images.some((it)=>it.type === 'url' && it.url === url);
            if (exists) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('该图片已在列表中');
                return;
            }
            const id = Math.random().toString(36).slice(2, 10);
            set((state)=>({
                    images: [
                        {
                            id,
                            type: 'url',
                            url
                        },
                        ...state.images
                    ]
                }));
        },
        addFiles: async (files)=>{
            const { images } = get();
            const arr = Array.from(files).filter((f)=>f.type.startsWith('image/'));
            if (arr.length === 0) return [];
            const existingHashes = new Map(images.filter((it)=>it.type === 'file' && it.hash).map((it)=>[
                    it.hash,
                    it
                ]));
            const computed = await Promise.all(arr.map(async (file)=>{
                const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
                return {
                    file,
                    hash
                };
            }));
            const seen = new Set();
            const unique = computed.filter(({ hash })=>{
                if (existingHashes.has(hash)) return false;
                if (seen.has(hash)) return false;
                seen.add(hash);
                return true;
            });
            const resultImages = [];
            // 处理已存在的图片
            for (const { hash } of computed){
                if (existingHashes.has(hash)) {
                    resultImages.push(existingHashes.get(hash));
                }
            }
            // 处理新图片
            if (unique.length > 0) {
                const newItems = unique.map(({ file, hash })=>{
                    const id = Math.random().toString(36).slice(2, 10);
                    const previewUrl = URL.createObjectURL(file);
                    const filename = file.name;
                    return {
                        id,
                        type: 'file',
                        file,
                        previewUrl,
                        filename,
                        hash
                    };
                });
                set((state)=>({
                        images: [
                            ...newItems,
                            ...state.images
                        ]
                    }));
                resultImages.push(...newItems);
            } else if (resultImages.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('图片已存在，不重复添加');
            }
            return resultImages;
        },
        deleteImage: (id)=>set((state)=>{
                for (const it of state.images){
                    if (it.type === 'file' && it.id === id) {
                        URL.revokeObjectURL(it.previewUrl);
                        if (it.id === state.cover?.id) {
                            set({
                                cover: null
                            });
                        }
                    }
                }
                return {
                    images: state.images.filter((it)=>it.id !== id)
                };
            }),
        // Cover state
        cover: null,
        setCover: (cover)=>set({
                cover
            }),
        // Publish state
        loading: false,
        setLoading: (loading)=>set({
                loading
            }),
        // Load blog for editing
        loadBlogForEdit: async (slug)=>{
            try {
                set({
                    loading: true
                });
                const blog = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$load$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBlog"])(slug);
                // Parse images from markdown
                const images = [];
                const imageRegex = /!\[.*?\]\((.*?)\)/g;
                let match;
                while((match = imageRegex.exec(blog.markdown)) !== null){
                    const url = match[1];
                    // Skip cover image and only collect content images
                    if (url && url !== blog.cover && !url.startsWith('local-image:')) {
                        // Check if already added
                        if (!images.some((img)=>img.type === 'url' && img.url === url)) {
                            const id = Math.random().toString(36).slice(2, 10);
                            images.push({
                                id,
                                type: 'url',
                                url
                            });
                        }
                    }
                }
                // Set cover
                let cover = null;
                if (blog.cover) {
                    const coverId = Math.random().toString(36).slice(2, 10);
                    cover = {
                        id: coverId,
                        type: 'url',
                        url: blog.cover
                    };
                }
                // Set form
                set({
                    mode: 'edit',
                    originalSlug: slug,
                    form: {
                        slug,
                        title: blog.config.title || '',
                        md: blog.markdown,
                        tags: blog.config.tags || [],
                        date: blog.config.date ? formatDateTimeLocal(new Date(blog.config.date)) : formatDateTimeLocal(),
                        summary: blog.config.summary || '',
                        hidden: blog.config.hidden || false,
                        category: blog.config.category || ''
                    },
                    images,
                    cover,
                    loading: false
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('博客加载成功');
            } catch (err) {
                console.error('Failed to load blog:', err);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.message || '加载博客失败');
                set({
                    loading: false
                });
                throw err;
            }
        },
        // Reset to create mode
        reset: ()=>{
            // Revoke object URLs
            const { images, cover } = get();
            for (const img of images){
                if (img.type === 'file') {
                    URL.revokeObjectURL(img.previewUrl);
                }
            }
            if (cover?.type === 'file') {
                URL.revokeObjectURL(cover.previewUrl);
            }
            set({
                mode: 'create',
                originalSlug: null,
                form: {
                    ...initialForm,
                    date: formatDateTimeLocal()
                },
                images: [],
                cover: null
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/stores/preview-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePreviewStore",
    ()=>usePreviewStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const usePreviewStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isPreview: false,
        openPreview: ()=>set({
                isPreview: true
            }),
        closePreview: ()=>set({
                isPreview: false
            }),
        togglePreview: ()=>set((state)=>({
                    isPreview: !state.isPreview
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WriteEditor",
    ()=>WriteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const defaultText = 'text';
function WriteEditor() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(34);
    if ($[0] !== "9e09bb976e99b77249344b6f1f84b25a48bcb8c23489b89f709d46daba37b775") {
        for(let $i = 0; $i < 34; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9e09bb976e99b77249344b6f1f84b25a48bcb8c23489b89f709d46daba37b775";
    }
    const { form, updateForm, addFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] !== updateForm) {
        t0 = ({
            "WriteEditor[insertText]": (text)=>{
                const textarea = textareaRef.current;
                if (!textarea) {
                    return;
                }
                textarea.focus();
                const success = document.execCommand("insertText", false, text);
                if (!success) {
                    const { selectionStart, selectionEnd, value } = textarea;
                    const before = value.substring(0, selectionStart);
                    const after = value.substring(selectionEnd);
                    updateForm({
                        md: before + text + after
                    });
                    setTimeout({
                        "WriteEditor[insertText > setTimeout()]": ()=>{
                            textarea.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
                            textarea.focus();
                        }
                    }["WriteEditor[insertText > setTimeout()]"], 0);
                }
            }
        })["WriteEditor[insertText]"];
        $[1] = updateForm;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const insertText = t0;
    let t1;
    if ($[3] !== insertText) {
        t1 = ({
            "WriteEditor[handleKeyDown]": (e)=>{
                const textarea_0 = textareaRef.current;
                if (!textarea_0) {
                    return;
                }
                const { selectionStart: selectionStart_0, selectionEnd: selectionEnd_0, value: value_0 } = textarea_0;
                const selectedText = value_0.substring(selectionStart_0, selectionEnd_0);
                if ((e.ctrlKey || e.metaKey) && e.key === "b") {
                    e.preventDefault();
                    const before_0 = value_0.substring(0, selectionStart_0);
                    const after_0 = value_0.substring(selectionEnd_0);
                    const isBold = before_0.endsWith("**") && after_0.startsWith("**");
                    if (isBold && selectedText) {
                        textarea_0.setSelectionRange(selectionStart_0 - 2, selectionEnd_0 + 2);
                        insertText(selectedText);
                    } else {
                        const text_0 = selectedText || defaultText;
                        insertText(`**${text_0}**`);
                        if (!selectedText) {
                            setTimeout({
                                "WriteEditor[handleKeyDown > setTimeout()]": ()=>{
                                    textarea_0.setSelectionRange(selectionStart_0 + 2, selectionStart_0 + 2 + defaultText.length);
                                }
                            }["WriteEditor[handleKeyDown > setTimeout()]"], 0);
                        }
                    }
                    return;
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "i") {
                    e.preventDefault();
                    const before_1 = value_0.substring(0, selectionStart_0);
                    const after_1 = value_0.substring(selectionEnd_0);
                    const isItalic = before_1.endsWith("*") && after_1.startsWith("*") && !(before_1.endsWith("**") && after_1.startsWith("**"));
                    if (isItalic && selectedText) {
                        textarea_0.setSelectionRange(selectionStart_0 - 1, selectionEnd_0 + 1);
                        insertText(selectedText);
                    } else {
                        const text_1 = selectedText || defaultText;
                        insertText(`*${text_1}*`);
                        if (!selectedText) {
                            setTimeout({
                                "WriteEditor[handleKeyDown > setTimeout()]": ()=>{
                                    textarea_0.setSelectionRange(selectionStart_0 + 1, selectionStart_0 + 1 + defaultText.length);
                                }
                            }["WriteEditor[handleKeyDown > setTimeout()]"], 0);
                        }
                    }
                    return;
                }
                if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                    e.preventDefault();
                    const text_2 = selectedText || defaultText;
                    insertText(`[${text_2}](url)`);
                    setTimeout({
                        "WriteEditor[handleKeyDown > setTimeout()]": ()=>{
                            const urlStart = selectionStart_0 + text_2.length + 3;
                            textarea_0.setSelectionRange(urlStart, urlStart + 3);
                        }
                    }["WriteEditor[handleKeyDown > setTimeout()]"], 0);
                    return;
                }
                if (e.key === "Tab" && !e.shiftKey) {
                    e.preventDefault();
                    insertText("\t");
                    return;
                }
                if (e.key === "Tab" && e.shiftKey) {
                    e.preventDefault();
                    const lineStart = value_0.lastIndexOf("\n", selectionStart_0 - 1) + 1;
                    const line = value_0.substring(lineStart, value_0.indexOf("\n", selectionStart_0));
                    if (line.startsWith("\t")) {
                        textarea_0.setSelectionRange(lineStart, lineStart + 1);
                        insertText("");
                    } else {
                        if (line.startsWith("  ")) {
                            textarea_0.setSelectionRange(lineStart, lineStart + 2);
                            insertText("");
                        }
                    }
                    return;
                }
            }
        })["WriteEditor[handleKeyDown]"];
        $[3] = insertText;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const handleKeyDown = t1;
    let t2;
    if ($[5] !== addFiles || $[6] !== insertText) {
        t2 = ({
            "WriteEditor[handlePaste]": async (e_0)=>{
                const items = e_0.clipboardData.items;
                if (!items) {
                    return;
                }
                const imageFiles = [];
                for(let i = 0; i < items.length; i++){
                    const item = items[i];
                    if (item.type.startsWith("image/")) {
                        const file = item.getAsFile();
                        if (file) {
                            imageFiles.push(file);
                        }
                    }
                }
                if (imageFiles.length > 0) {
                    e_0.preventDefault();
                    const resultImages = await addFiles(imageFiles).catch(_WriteEditorHandlePasteAnonymous);
                    if (resultImages && resultImages.length > 0) {
                        const markdowns = resultImages.map(_WriteEditorHandlePasteResultImagesMap).join("\n");
                        insertText(markdowns);
                    }
                }
            }
        })["WriteEditor[handlePaste]"];
        $[5] = addFiles;
        $[6] = insertText;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handlePaste = t2;
    let t3;
    let t4;
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0,
            scale: 0.8
        };
        t4 = {
            opacity: 1,
            scale: 1
        };
        t5 = {
            delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"]
        };
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
    } else {
        t3 = $[8];
        t4 = $[9];
        t5 = $[10];
    }
    let t6;
    if ($[11] !== updateForm) {
        t6 = ({
            "WriteEditor[<input>.onChange]": (e_1)=>updateForm({
                    title: e_1.target.value
                })
        })["WriteEditor[<input>.onChange]"];
        $[11] = updateForm;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== form.title || $[14] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "\u6807\u9898",
            className: "bg-card flex-1 rounded-lg border px-3 py-2 text-sm",
            value: form.title,
            onChange: t6
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/editor.tsx",
            lineNumber: 225,
            columnNumber: 10
        }, this);
        $[13] = form.title;
        $[14] = t6;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] !== updateForm) {
        t8 = ({
            "WriteEditor[<input>.onChange]": (e_2)=>updateForm({
                    slug: e_2.target.value
                })
        })["WriteEditor[<input>.onChange]"];
        $[16] = updateForm;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== form.slug || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "slug\uFF08xx-xx\uFF09",
            className: "bg-card w-[200px] rounded-lg border px-3 py-2 text-sm",
            value: form.slug,
            onChange: t8
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/editor.tsx",
            lineNumber: 246,
            columnNumber: 10
        }, this);
        $[18] = form.slug;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== t7 || $[22] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-3 flex gap-3",
            children: [
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/editor.tsx",
            lineNumber: 255,
            columnNumber: 11
        }, this);
        $[21] = t7;
        $[22] = t9;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    let t11;
    if ($[24] !== updateForm) {
        t11 = ({
            "WriteEditor[<textarea>.onChange]": (e_3)=>updateForm({
                    md: e_3.target.value
                })
        })["WriteEditor[<textarea>.onChange]"];
        $[24] = updateForm;
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== form.md || $[27] !== handleKeyDown || $[28] !== handlePaste || $[29] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            ref: textareaRef,
            placeholder: "Markdown \u5185\u5BB9",
            className: "bg-card h-[650px] w-full flex-1 resize-none rounded-xl border p-4 text-sm",
            value: form.md,
            onChange: t11,
            onKeyDown: handleKeyDown,
            onPaste: handlePaste
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/editor.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[26] = form.md;
        $[27] = handleKeyDown;
        $[28] = handlePaste;
        $[29] = t11;
        $[30] = t12;
    } else {
        t12 = $[30];
    }
    let t13;
    if ($[31] !== t10 || $[32] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t3,
            animate: t4,
            transition: t5,
            className: "bg-card flex min-h-[800px] w-[800px] flex-col rounded-[40px] border p-6 shadow",
            children: [
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/editor.tsx",
            lineNumber: 287,
            columnNumber: 11
        }, this);
        $[31] = t10;
        $[32] = t12;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    return t13;
}
_s(WriteEditor, "x2d1IXvycKb9XffYVEicuezgu8I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"]
    ];
});
_c = WriteEditor;
function _WriteEditorHandlePasteResultImagesMap(item_0) {
    return item_0.type === "url" ? `![](${item_0.url})` : `![](local-image:${item_0.id})`;
}
function _WriteEditorHandlePasteAnonymous() {
    return [];
}
var _c;
__turbopack_context__.k.register(_c, "WriteEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/sections/cover-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoverSection",
    ()=>CoverSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function CoverSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "b6f957c49b237505b4afffa5987fa0bc12d3d1c9b2119fb107aa2834d4ed746a") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b6f957c49b237505b4afffa5987fa0bc12d3d1c9b2119fb107aa2834d4ed746a";
    }
    const { delay: t1 } = t0;
    const delay = t1 === undefined ? 0 : t1;
    const { images, setCover, cover, addFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coverPreviewUrl = cover ? cover.type === "url" ? cover.url : cover.previewUrl : null;
    let t2;
    if ($[1] !== addFiles || $[2] !== images || $[3] !== setCover) {
        t2 = ({
            "CoverSection[handleCoverDrop]": async (e)=>{
                e.preventDefault();
                const md = e.dataTransfer.getData("text/markdown") || e.dataTransfer.getData("text/plain") || "";
                const m = /!\[\]\(([^)]+)\)/.exec(md.trim());
                if (m) {
                    const target = m[1];
                    let foundItem;
                    if (target.startsWith("local-image:")) {
                        const id = target.replace(/^local-image:/, "");
                        foundItem = images.find({
                            "CoverSection[handleCoverDrop > images.find()]": (it)=>it.id === id
                        }["CoverSection[handleCoverDrop > images.find()]"]);
                    } else {
                        foundItem = images.find({
                            "CoverSection[handleCoverDrop > images.find()]": (it_0)=>it_0.type === "url" && it_0.url === target
                        }["CoverSection[handleCoverDrop > images.find()]"]);
                    }
                    if (foundItem) {
                        setCover(foundItem);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("\u5DF2\u8BBE\u7F6E\u5C01\u9762");
                        return;
                    }
                }
                const files = e.dataTransfer.files;
                if (files && files.length > 0) {
                    const imageFiles = Array.from(files).filter(_CoverSectionHandleCoverDropAnonymous);
                    if (imageFiles.length === 0) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u62D6\u5165\u56FE\u7247\u6587\u4EF6");
                        return;
                    }
                    const resultImages = await addFiles(imageFiles);
                    if (resultImages && resultImages.length > 0) {
                        setCover(resultImages[0]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("\u5DF2\u8BBE\u7F6E\u5C01\u9762");
                    }
                    return;
                }
            }
        })["CoverSection[handleCoverDrop]"];
        $[1] = addFiles;
        $[2] = images;
        $[3] = setCover;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleCoverDrop = t2;
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "CoverSection[handleClickUpload]": ()=>{
                fileInputRef.current?.click();
            }
        })["CoverSection[handleClickUpload]"];
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const handleClickUpload = t3;
    let t4;
    if ($[6] !== addFiles || $[7] !== setCover) {
        t4 = ({
            "CoverSection[handleFileChange]": async (e_0)=>{
                const files_0 = e_0.target.files;
                if (!files_0 || files_0.length === 0) {
                    return;
                }
                const resultImages_0 = await addFiles(files_0);
                if (resultImages_0 && resultImages_0.length > 0) {
                    setCover(resultImages_0[0]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("\u5DF2\u8BBE\u7F6E\u5C01\u9762");
                }
                e_0.target.value = "";
            }
        })["CoverSection[handleFileChange]"];
        $[6] = addFiles;
        $[7] = setCover;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const handleFileChange = t4;
    let t5;
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            opacity: 0,
            scale: 0.8
        };
        t6 = {
            opacity: 1,
            scale: 1
        };
        $[9] = t5;
        $[10] = t6;
    } else {
        t5 = $[9];
        t6 = $[10];
    }
    let t7;
    if ($[11] !== delay) {
        t7 = {
            delay
        };
        $[11] = delay;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm",
            children: "封面"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 145,
            columnNumber: 10
        }, this);
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== handleFileChange) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleFileChange
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 152,
            columnNumber: 10
        }, this);
        $[14] = handleFileChange;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== coverPreviewUrl) {
        t10 = !!coverPreviewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: coverPreviewUrl,
            alt: "cover preview",
            className: "h-full w-full rounded-2xl object-cover"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 160,
            columnNumber: 31
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-full w-full cursor-pointer place-items-center transition-colors hover:bg-white/60",
            onClick: handleClickUpload,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl leading-none text-neutral-400",
                children: "+"
            }, void 0, false, {
                fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
                lineNumber: 160,
                columnNumber: 268
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 160,
            columnNumber: 134
        }, this);
        $[16] = coverPreviewUrl;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== handleCoverDrop || $[19] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-card mt-3 h-[150px] overflow-hidden rounded-xl border",
            onDragOver: _CoverSectionDivOnDragOver,
            onDrop: handleCoverDrop,
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[18] = handleCoverDrop;
        $[19] = t10;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== t11 || $[22] !== t7 || $[23] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t5,
            animate: t6,
            transition: t7,
            className: "card relative",
            children: [
                t8,
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/cover-section.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[21] = t11;
        $[22] = t7;
        $[23] = t9;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    return t12;
}
_s(CoverSection, "n4jxflcGKzU5S+7i2qEa/OEhjhw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"]
    ];
});
_c = CoverSection;
function _CoverSectionDivOnDragOver(e_1) {
    e_1.preventDefault();
}
function _CoverSectionHandleCoverDropAnonymous(file) {
    return file.type.startsWith("image/");
}
var _c;
__turbopack_context__.k.register(_c, "CoverSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/ui/tag-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TagInput",
    ()=>TagInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function TagInput(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "47c5b13241890039b47815729c31a6c94201bf8b4107686b2ddcd956d5b48917") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "47c5b13241890039b47815729c31a6c94201bf8b4107686b2ddcd956d5b48917";
    }
    const { tags, onChange } = t0;
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== onChange || $[2] !== tagInput || $[3] !== tags) {
        t1 = ({
            "TagInput[handleAddTag]": ()=>{
                if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                    onChange([
                        ...tags,
                        tagInput.trim()
                    ]);
                    setTagInput("");
                }
            }
        })["TagInput[handleAddTag]"];
        $[1] = onChange;
        $[2] = tagInput;
        $[3] = tags;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const handleAddTag = t1;
    let t2;
    if ($[5] !== onChange || $[6] !== tags) {
        t2 = ({
            "TagInput[handleRemoveTag]": (index)=>{
                onChange(tags.filter({
                    "TagInput[handleRemoveTag > tags.filter()]": (_, i)=>i !== index
                }["TagInput[handleRemoveTag > tags.filter()]"]));
            }
        })["TagInput[handleRemoveTag]"];
        $[5] = onChange;
        $[6] = tags;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handleRemoveTag = t2;
    let t3;
    if ($[8] !== handleRemoveTag || $[9] !== tags) {
        t3 = tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-2 flex flex-wrap gap-2",
            children: tags.map({
                "TagInput[tags.map()]": (tag, index_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1.5 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700",
                        children: [
                            "#",
                            tag,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "TagInput[tags.map() > <button>.onClick]": ()=>handleRemoveTag(index_0)
                                }["TagInput[tags.map() > <button>.onClick]"],
                                className: "text-secondary",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/ui/tag-input.tsx",
                                lineNumber: 57,
                                columnNumber: 170
                            }, this)
                        ]
                    }, index_0, true, {
                        fileName: "[project]/src/app/write/components/ui/tag-input.tsx",
                        lineNumber: 57,
                        columnNumber: 51
                    }, this)
            }["TagInput[tags.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/ui/tag-input.tsx",
            lineNumber: 56,
            columnNumber: 29
        }, this);
        $[8] = handleRemoveTag;
        $[9] = tags;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    let t4;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "TagInput[<input>.onChange]": (e)=>setTagInput(e.target.value)
        })["TagInput[<input>.onChange]"];
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] !== handleAddTag) {
        t5 = ({
            "TagInput[<input>.onKeyDown]": (e_0)=>{
                if (e_0.key === "Enter") {
                    e_0.preventDefault();
                    handleAddTag();
                }
            }
        })["TagInput[<input>.onKeyDown]"];
        $[12] = handleAddTag;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t6;
    if ($[14] !== t5 || $[15] !== tagInput) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "\u6DFB\u52A0\u6807\u7B7E\uFF08\u6309\u56DE\u8F66\uFF09",
            className: "w-full bg-transparent text-sm outline-none",
            value: tagInput,
            onChange: t4,
            onKeyDown: t5
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/ui/tag-input.tsx",
            lineNumber: 93,
            columnNumber: 10
        }, this);
        $[14] = t5;
        $[15] = tagInput;
        $[16] = t6;
    } else {
        t6 = $[16];
    }
    let t7;
    if ($[17] !== t3 || $[18] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-card w-full rounded-lg border px-3 py-2",
            children: [
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/ui/tag-input.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[17] = t3;
        $[18] = t6;
        $[19] = t7;
    } else {
        t7 = $[19];
    }
    return t7;
}
_s(TagInput, "h7VhKuYmn2JG37vm0Ube5ncYBY0=");
_c = TagInput;
var _c;
__turbopack_context__.k.register(_c, "TagInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCategories",
    ()=>useCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const fetcher = async (url)=>{
    const res = await fetch(url, {
        cache: 'no-store'
    });
    if (!res.ok) {
        return {
            categories: []
        };
    }
    const data = await res.json();
    if (Array.isArray(data)) {
        return {
            categories: data.filter((item)=>typeof item === 'string')
        };
    }
    if (Array.isArray(data?.categories)) {
        return {
            categories: data.categories.filter((item)=>typeof item === 'string')
        };
    }
    return {
        categories: []
    };
};
function useCategories() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1d7a9a4d214ff567605479286ebc4ff3eec8abad80a8b19bbaa33d28f7e5d9be") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1d7a9a4d214ff567605479286ebc4ff3eec8abad80a8b19bbaa33d28f7e5d9be";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            revalidateOnFocus: false,
            revalidateOnReconnect: true
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])("/blogs/categories.json", fetcher, t0);
    let t1;
    if ($[2] !== data?.categories) {
        t1 = data?.categories ?? [];
        $[2] = data?.categories;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== error || $[5] !== isLoading || $[6] !== t1) {
        t2 = {
            categories: t1,
            loading: isLoading,
            error
        };
        $[4] = error;
        $[5] = isLoading;
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return t2;
}
_s(useCategories, "9Q3vJD1FHIUIivnilB5iu+ILv9Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Select(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(45);
    if ($[0] !== "b0bccf8058fb8783f186cc4674af9884aafd52154f33b493bc4b5193a0635aa6") {
        for(let $i = 0; $i < 45; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b0bccf8058fb8783f186cc4674af9884aafd52154f33b493bc4b5193a0635aa6";
    }
    const { value, onChange, options, className, disabled } = t0;
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            top: 0,
            left: 0,
            width: 0
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] !== options || $[3] !== value) {
        t2 = options.find({
            "Select[options.find()]": (opt)=>opt.value === value
        }["Select[options.find()]"]) || options[0];
        $[2] = options;
        $[3] = value;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const selectedOption = t2;
    let t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "Select[useEffect()]": ()=>{
                setMounted(true);
            }
        })["Select[useEffect()]"];
        t4 = [];
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    let t6;
    if ($[7] !== open) {
        t5 = ({
            "Select[useEffect()]": ()=>{
                if (open && triggerRef.current) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    setPosition({
                        top: rect.bottom + 8,
                        left: rect.left,
                        width: rect.width
                    });
                }
            }
        })["Select[useEffect()]"];
        t6 = [
            open
        ];
        $[7] = open;
        $[8] = t5;
        $[9] = t6;
    } else {
        t5 = $[8];
        t6 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    let t8;
    if ($[10] !== open) {
        t7 = ({
            "Select[useEffect()]": ()=>{
                if (!open) {
                    return;
                }
                const updatePosition = {
                    "Select[useEffect() > updatePosition]": ()=>{
                        if (triggerRef.current) {
                            const rect_0 = triggerRef.current.getBoundingClientRect();
                            setPosition({
                                top: rect_0.bottom + 8,
                                left: rect_0.left,
                                width: rect_0.width
                            });
                        }
                    }
                }["Select[useEffect() > updatePosition]"];
                const handleClickOutside = {
                    "Select[useEffect() > handleClickOutside]": (e)=>{
                        const target = e.target;
                        if (triggerRef.current && !triggerRef.current.contains(target) && dropdownRef.current && !dropdownRef.current.contains(target)) {
                            setOpen(false);
                        }
                    }
                }["Select[useEffect() > handleClickOutside]"];
                const handleEscape = {
                    "Select[useEffect() > handleEscape]": (e_0)=>{
                        if (e_0.key === "Escape") {
                            setOpen(false);
                        }
                    }
                }["Select[useEffect() > handleEscape]"];
                const handleScroll = {
                    "Select[useEffect() > handleScroll]": ()=>{
                        updatePosition();
                    }
                }["Select[useEffect() > handleScroll]"];
                const handleResize = {
                    "Select[useEffect() > handleResize]": ()=>{
                        updatePosition();
                    }
                }["Select[useEffect() > handleResize]"];
                document.addEventListener("mousedown", handleClickOutside);
                document.addEventListener("keydown", handleEscape);
                window.addEventListener("scroll", handleScroll, true);
                window.addEventListener("resize", handleResize);
                return ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                    document.removeEventListener("keydown", handleEscape);
                    window.removeEventListener("scroll", handleScroll, true);
                    window.removeEventListener("resize", handleResize);
                };
            }
        })["Select[useEffect()]"];
        t8 = [
            open
        ];
        $[10] = open;
        $[11] = t7;
        $[12] = t8;
    } else {
        t7 = $[11];
        t8 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t7, t8);
    let t9;
    if ($[13] !== onChange) {
        t9 = ({
            "Select[handleSelect]": (optionValue)=>{
                onChange(optionValue);
                setOpen(false);
            }
        })["Select[handleSelect]"];
        $[13] = onChange;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    const handleSelect = t9;
    let t10;
    if ($[15] !== disabled || $[16] !== open) {
        t10 = ({
            "Select[<button>.onClick]": ()=>!disabled && setOpen(!open)
        })["Select[<button>.onClick]"];
        $[15] = disabled;
        $[16] = open;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    const t11 = disabled && "cursor-not-allowed opacity-50";
    const t12 = !disabled && "hover:bg-card/80";
    let t13;
    if ($[18] !== className || $[19] !== t11 || $[20] !== t12) {
        t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card relative flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs transition-all", "active:scale-[0.98]", "focus:ring-brand/20 focus:ring-2 focus:outline-none", t11, t12, className);
        $[18] = className;
        $[19] = t11;
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    const t14 = selectedOption?.label;
    let t15;
    if ($[22] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex-1 text-left",
            children: t14
        }, void 0, false, {
            fileName: "[project]/src/components/select.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[22] = t14;
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    const t16 = open && "rotate-180";
    let t17;
    if ($[24] !== t16) {
        t17 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-3.5 w-3.5 transition-transform duration-200", t16);
        $[24] = t16;
        $[25] = t17;
    } else {
        t17 = $[25];
    }
    let t18;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M19 9l-7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/src/components/select.tsx",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[26] = t18;
    } else {
        t18 = $[26];
    }
    let t19;
    if ($[27] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: t17,
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: t18
        }, void 0, false, {
            fileName: "[project]/src/components/select.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[27] = t17;
        $[28] = t19;
    } else {
        t19 = $[28];
    }
    let t20;
    if ($[29] !== disabled || $[30] !== t10 || $[31] !== t13 || $[32] !== t15 || $[33] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            ref: triggerRef,
            type: "button",
            onClick: t10,
            disabled: disabled,
            className: t13,
            children: [
                t15,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/select.tsx",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        $[29] = disabled;
        $[30] = t10;
        $[31] = t13;
        $[32] = t15;
        $[33] = t19;
        $[34] = t20;
    } else {
        t20 = $[34];
    }
    let t21;
    if ($[35] !== handleSelect || $[36] !== mounted || $[37] !== open || $[38] !== options || $[39] !== position || $[40] !== value) {
        t21 = mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                ref: dropdownRef,
                initial: {
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                },
                transition: {
                    duration: 0.2,
                    ease: [
                        0.4,
                        0,
                        0.2,
                        1
                    ]
                },
                className: "bg-card/95 fixed z-50 rounded-xl border backdrop-blur-xl",
                style: {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    width: `${position.width}px`,
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scrollbar-none max-h-64 overflow-y-auto p-1.5",
                    children: options.map({
                        "Select[options.map()]": (option)=>{
                            const isSelected = option.value === value;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "Select[options.map() > <button>.onClick]": ()=>handleSelect(option.value)
                                }["Select[options.map() > <button>.onClick]"],
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full rounded-lg px-3 py-2 text-left text-xs transition-all", "active:scale-[0.98]", isSelected ? "bg-brand/10 text-brand font-medium" : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"),
                                children: option.label
                            }, option.value, false, {
                                fileName: "[project]/src/components/select.tsx",
                                lineNumber: 276,
                                columnNumber: 22
                            }, this);
                        }
                    }["Select[options.map()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/select.tsx",
                    lineNumber: 273,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/select.tsx",
                lineNumber: 253,
                columnNumber: 61
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/select.tsx",
            lineNumber: 253,
            columnNumber: 35
        }, this), document.body);
        $[35] = handleSelect;
        $[36] = mounted;
        $[37] = open;
        $[38] = options;
        $[39] = position;
        $[40] = value;
        $[41] = t21;
    } else {
        t21 = $[41];
    }
    let t22;
    if ($[42] !== t20 || $[43] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t20,
                t21
            ]
        }, void 0, true);
        $[42] = t20;
        $[43] = t21;
        $[44] = t22;
    } else {
        t22 = $[44];
    }
    return t22;
}
_s(Select, "dq/PffLo6w773GKySfNJeRAdPgE=");
_c = Select;
var _c;
__turbopack_context__.k.register(_c, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/sections/meta-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetaSection",
    ()=>MetaSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$ui$2f$tag$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/ui/tag-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function MetaSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "e0233c246c844c1ce0fbe8522a8e5e2b606917f00c0eb51f1c9068bf6c242382") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e0233c246c844c1ce0fbe8522a8e5e2b606917f00c0eb51f1c9068bf6c242382";
    }
    const { delay: t1 } = t0;
    const delay = t1 === undefined ? 0 : t1;
    const { form, updateForm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    console.log(form.date);
    const { categories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategories"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const enableCategories = siteContent.enableCategories ?? false;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            value: "",
            label: "\u672A\u5206\u7C7B"
        };
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    let t3;
    if ($[2] !== categories) {
        t3 = [
            t2,
            ...categories.map(_MetaSectionCategoriesMap)
        ];
        $[2] = categories;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const categoryOptions = t3;
    let t4;
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            opacity: 0,
            scale: 0.8
        };
        t5 = {
            opacity: 1,
            scale: 1
        };
        $[4] = t4;
        $[5] = t5;
    } else {
        t4 = $[4];
        t5 = $[5];
    }
    let t6;
    if ($[6] !== delay) {
        t6 = {
            delay
        };
        $[6] = delay;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-sm",
            children: "元信息"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== updateForm) {
        t8 = ({
            "MetaSection[<textarea>.onChange]": (e)=>updateForm({
                    summary: e.target.value
                })
        })["MetaSection[<textarea>.onChange]"];
        $[9] = updateForm;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== form.summary || $[12] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            placeholder: "\u4E3A\u8FD9\u7BC7\u6587\u7AE0\u5199\u4E00\u6BB5\u7B80\u77ED\u6458\u8981",
            rows: 2,
            className: "bg-card block w-full resize-none rounded-xl border p-3 text-sm",
            value: form.summary,
            onChange: t8
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[11] = form.summary;
        $[12] = t8;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== updateForm) {
        t10 = ({
            "MetaSection[<TagInput>.onChange]": (tags)=>updateForm({
                    tags
                })
        })["MetaSection[<TagInput>.onChange]"];
        $[14] = updateForm;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== form.tags || $[17] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$ui$2f$tag$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TagInput"], {
            tags: form.tags,
            onChange: t10
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[16] = form.tags;
        $[17] = t10;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== categoryOptions || $[20] !== enableCategories || $[21] !== form.category || $[22] !== updateForm) {
        t12 = enableCategories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            className: "w-full text-sm",
            value: form.category || "",
            onChange: {
                "MetaSection[<Select>.onChange]": (value)=>updateForm({
                        category: value
                    })
            }["MetaSection[<Select>.onChange]"],
            options: categoryOptions
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 132,
            columnNumber: 31
        }, this);
        $[19] = categoryOptions;
        $[20] = enableCategories;
        $[21] = form.category;
        $[22] = updateForm;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== updateForm) {
        t13 = ({
            "MetaSection[<input>.onChange]": (e_0)=>{
                updateForm({
                    date: e_0.target.value
                });
            }
        })["MetaSection[<input>.onChange]"];
        $[24] = updateForm;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== form.date || $[27] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "datetime-local",
            placeholder: "\u65E5\u671F",
            className: "bg-card w-full rounded-lg border px-3 py-2 text-sm",
            value: form.date,
            onChange: t13
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[26] = form.date;
        $[27] = t13;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    const t15 = form.hidden || false;
    let t16;
    if ($[29] !== updateForm) {
        t16 = ({
            "MetaSection[<input>.onChange]": (e_1)=>updateForm({
                    hidden: e_1.target.checked
                })
        })["MetaSection[<input>.onChange]"];
        $[29] = updateForm;
        $[30] = t16;
    } else {
        t16 = $[30];
    }
    let t17;
    if ($[31] !== t15 || $[32] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            id: "hidden-check",
            checked: t15,
            onChange: t16,
            className: "h-4 w-4 rounded border-gray-300"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        $[31] = t15;
        $[32] = t16;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "hidden-check",
            className: "cursor-pointer text-sm text-gray-600 select-none",
            children: "隐藏此文章（仅管理员可见）"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 192,
            columnNumber: 11
        }, this);
        $[34] = t18;
    } else {
        t18 = $[34];
    }
    let t19;
    if ($[35] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[35] = t17;
        $[36] = t19;
    } else {
        t19 = $[36];
    }
    let t20;
    if ($[37] !== t11 || $[38] !== t12 || $[39] !== t14 || $[40] !== t19 || $[41] !== t9) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 space-y-2",
            children: [
                t9,
                t11,
                t12,
                t14,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[37] = t11;
        $[38] = t12;
        $[39] = t14;
        $[40] = t19;
        $[41] = t9;
        $[42] = t20;
    } else {
        t20 = $[42];
    }
    let t21;
    if ($[43] !== t20 || $[44] !== t6) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t4,
            animate: t5,
            transition: t6,
            className: "card relative",
            children: [
                t7,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/meta-section.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[43] = t20;
        $[44] = t6;
        $[45] = t21;
    } else {
        t21 = $[45];
    }
    return t21;
}
_s(MetaSection, "sHn86bpbKocmRk7M8BfPqep+Ll0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategories"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = MetaSection;
function _MetaSectionCategoriesMap(cat) {
    return {
        value: cat,
        label: cat
    };
}
var _c;
__turbopack_context__.k.register(_c, "MetaSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/sections/images-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImagesSection",
    ()=>ImagesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ImagesSection(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "435fe657df0750a23e25576275b144e5afb84af1257774eea1e83a76d367d362") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "435fe657df0750a23e25576275b144e5afb84af1257774eea1e83a76d367d362";
    }
    const { delay: t1 } = t0;
    const delay = t1 === undefined ? 0 : t1;
    const { images, cover, addUrlImage, addFiles, deleteImage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coverId = cover?.id ?? null;
    let t2;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            opacity: 0,
            scale: 0.8
        };
        t3 = {
            opacity: 1,
            scale: 1
        };
        $[1] = t2;
        $[2] = t3;
    } else {
        t2 = $[1];
        t3 = $[2];
    }
    let t4;
    if ($[3] !== delay) {
        t4 = {
            delay
        };
        $[3] = delay;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-sm",
                    children: "图片管理"
                }, void 0, false, {
                    fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                    lineNumber: 62,
                    columnNumber: 61
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/image-toolbox",
                    target: "_blank",
                    className: "text-xs hover:underline",
                    children: "压缩工具"
                }, void 0, false, {
                    fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                    lineNumber: 62,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "ImagesSection[<input>.onChange]": (e)=>setUrlInput(e.target.value)
        })["ImagesSection[<input>.onChange]"];
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== urlInput) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "https://...",
            className: "bg-card flex-1 rounded-lg border px-3 py-2 text-sm",
            value: urlInput,
            onChange: t6
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 78,
            columnNumber: 10
        }, this);
        $[7] = urlInput;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== addUrlImage || $[10] !== urlInput) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "rounded-lg border bg-white/70 px-3 py-2 text-sm",
            onClick: {
                "ImagesSection[<button>.onClick]": ()=>{
                    const v = urlInput.trim();
                    if (!v) {
                        return;
                    }
                    addUrlImage(v);
                    setUrlInput("");
                }
            }["ImagesSection[<button>.onClick]"],
            children: "添加"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[9] = addUrlImage;
        $[10] = urlInput;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== t7 || $[13] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 flex items-center gap-2",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== addFiles) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            multiple: true,
            className: "hidden",
            onChange: {
                "ImagesSection[<input>.onChange]": (e_0)=>{
                    const files = e_0.target.files;
                    if (files && files.length > 0) {
                        addFiles(files);
                    }
                    if (e_0.currentTarget) {
                        e_0.currentTarget.value = "";
                    }
                }
            }["ImagesSection[<input>.onChange]"]
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        $[15] = addFiles;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "ImagesSection[<div>.onClick]": ()=>fileInputRef.current?.click()
        })["ImagesSection[<div>.onClick]"];
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== addFiles) {
        t12 = ({
            "ImagesSection[<div>.onDrop]": (e_2)=>{
                e_2.preventDefault();
                const files_0 = e_2.dataTransfer.files;
                if (files_0 && files_0.length) {
                    addFiles(files_0);
                }
            }
        })["ImagesSection[<div>.onDrop]"];
        $[18] = addFiles;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl leading-none text-neutral-400",
            children: "+"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== t12) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group bg-card hover:bg-secondary/20 relative grid aspect-square cursor-pointer place-items-center rounded-lg border",
            onClick: t11,
            onDragOver: _ImagesSectionDivOnDragOver,
            onDrop: t12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== coverId || $[24] !== deleteImage || $[25] !== images) {
        let t16;
        if ($[27] !== coverId || $[28] !== deleteImage) {
            t16 = ({
                "ImagesSection[images.map()]": (item)=>{
                    const isUrl = item.type === "url";
                    const src = isUrl ? item.url : item.previewUrl;
                    const markdown = isUrl ? `![](${item.url})` : `![](local-image:${item.id})`;
                    const isCover = coverId === item.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `group relative aspect-square overflow-hidden rounded-lg border bg-white/50 text-xs ${isCover ? "ring-2 ring-blue-500" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: src,
                                className: "h-full w-full object-cover",
                                draggable: true,
                                onDragStart: {
                                    "ImagesSection[images.map() > <img>.onDragStart]": (e_3)=>{
                                        e_3.dataTransfer.setData("text/plain", markdown);
                                        e_3.dataTransfer.setData("text/markdown", markdown);
                                    }
                                }["ImagesSection[images.map() > <img>.onDragStart]"]
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                                lineNumber: 179,
                                columnNumber: 175
                            }, this),
                            isCover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-1 left-1 rounded-md bg-blue-500 px-1.5 py-0.5 text-white shadow",
                                children: "封面"
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                                lineNumber: 184,
                                columnNumber: 81
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-1 right-1 hidden group-hover:flex",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-md bg-white/80 px-1.5 py-0.5 shadow hover:bg-white",
                                    onClick: {
                                        "ImagesSection[images.map() > <button>.onClick]": ()=>deleteImage(item.id)
                                    }["ImagesSection[images.map() > <button>.onClick]"],
                                    children: "删除"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                                    lineNumber: 184,
                                    columnNumber: 248
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                                lineNumber: 184,
                                columnNumber: 184
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/app/write/components/sections/images-section.tsx",
                        lineNumber: 179,
                        columnNumber: 18
                    }, this);
                }
            })["ImagesSection[images.map()]"];
            $[27] = coverId;
            $[28] = deleteImage;
            $[29] = t16;
        } else {
            t16 = $[29];
        }
        t15 = images.map(t16);
        $[23] = coverId;
        $[24] = deleteImage;
        $[25] = images;
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[30] !== t14 || $[31] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 grid grid-cols-4 gap-2",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[30] = t14;
        $[31] = t15;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== t10 || $[34] !== t16 || $[35] !== t4 || $[36] !== t9) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t2,
            animate: t3,
            transition: t4,
            className: "card relative",
            children: [
                t5,
                t9,
                t10,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sections/images-section.tsx",
            lineNumber: 214,
            columnNumber: 11
        }, this);
        $[33] = t10;
        $[34] = t16;
        $[35] = t4;
        $[36] = t9;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    return t17;
}
_s(ImagesSection, "HBzvRCkq0rZa5xG3PEVZknrt50Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"]
    ];
});
_c = ImagesSection;
function _ImagesSectionDivOnDragOver(e_1) {
    e_1.preventDefault();
}
var _c;
__turbopack_context__.k.register(_c, "ImagesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WriteSidebar",
    ()=>WriteSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$cover$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/sections/cover-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$meta$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/sections/meta-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$images$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/sections/images-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function WriteSidebar() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "49a28b9051106fb0bc6a4a28e3f7695eec34c7ec83f11ee7b08087a6dc652a1d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "49a28b9051106fb0bc6a4a28e3f7695eec34c7ec83f11ee7b08087a6dc652a1d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[320px] space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$cover$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverSection"], {
                    delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 0
                }, void 0, false, {
                    fileName: "[project]/src/app/write/components/sidebar.tsx",
                    lineNumber: 16,
                    columnNumber: 47
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$meta$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetaSection"], {
                    delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1
                }, void 0, false, {
                    fileName: "[project]/src/app/write/components/sidebar.tsx",
                    lineNumber: 16,
                    columnNumber: 104
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sections$2f$images$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagesSection"], {
                    delay: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_DELAY"] + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 2
                }, void 0, false, {
                    fileName: "[project]/src/app/write/components/sidebar.tsx",
                    lineNumber: 16,
                    columnNumber: 160
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/sidebar.tsx",
            lineNumber: 16,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = WriteSidebar;
var _c;
__turbopack_context__.k.register(_c, "WriteSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/aes256-util.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aes256-util.ts [app-client] (ecmascript)");
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
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decrypt"])(encryptedPem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
    } catch  {
        return null;
    }
}
async function savePemToCache(pem) {
    if (typeof sessionStorage === 'undefined') return;
    try {
        // 加密 pem 后存储
        const encryptedPem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encrypt"])(pem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('使用缓存的令牌...');
        return cachedToken;
    }
    // 2. 获取私钥（从缓存）
    const privateKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().privateKey;
    if (!privateKey) {
        throw new Error('需要先设置私钥。请使用 useAuth().setPrivateKey()');
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在签发 JWT...');
    const jwt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signAppJwt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].APP_ID, privateKey);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在获取安装信息...');
    const installationId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInstallationId"])(jwt, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建安装令牌...');
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInstallationToken"])(jwt, installationId);
    saveTokenToCache(token);
    return token;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        isAuth: false,
        privateKey: null,
        setPrivateKey: async (key)=>{
            set({
                isAuth: true,
                privateKey: key
            });
            const { siteContent } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            if (siteContent?.isCachePem) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePemToCache"])(key);
            }
        },
        clearAuth: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAllAuthCache"])();
            set({
                isAuth: false
            });
        },
        refreshAuthState: async ()=>{
            set({
                isAuth: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasAuth"])()
            });
        },
        getAuthToken: async ()=>{
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            get().refreshAuthState();
            return token;
        }
    }));
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPemFromCache"])().then((key)=>{
    if (key) {
        useAuthStore.setState({
            privateKey: key
        });
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasAuth"])().then((isAuth)=>{
    if (isAuth) {
        useAuthStore.setState({
            isAuth
        });
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/github-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsrsasign/lib/jsrsasign.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
const GH_API = 'https://api.github.com';
function handle401Error() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().clearAuth();
    } catch (error) {
        console.error('Failed to clear auth cache:', error);
    }
}
function handle422Error() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('操作太快了，请操作慢一点');
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
    const prv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEYUTIL"].getKey(privateKeyPem);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KJUR"].jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(payload), prv);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/blog-index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareBlogsIndex",
    ()=>prepareBlogsIndex,
    "removeBlogFromIndex",
    ()=>removeBlogFromIndex,
    "removeBlogsFromIndex",
    ()=>removeBlogsFromIndex,
    "upsertBlogsIndex",
    ()=>upsertBlogsIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-client] (ecmascript)");
'use client';
;
async function upsertBlogsIndex(token, owner, repo, item, branch) {
    const indexPath = 'public/blogs/index.json';
    let list = [];
    try {
        const txt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTextFileFromRepo"])(token, owner, repo, indexPath, branch);
        if (txt) list = JSON.parse(txt);
    } catch  {
    // ignore parse errors and start from empty list
    }
    const map = new Map(list.map((i)=>[
            i.slug,
            i
        ]));
    map.set(item.slug, item);
    const next = Array.from(map.values()).sort((a, b)=>(b.date || '').localeCompare(a.date || ''));
    const base64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(JSON.stringify(next, null, 2));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putFile"])(token, owner, repo, indexPath, base64, 'Update blogs index', branch);
}
async function prepareBlogsIndex(token, owner, repo, item, branch) {
    const indexPath = 'public/blogs/index.json';
    let list = [];
    try {
        const txt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTextFileFromRepo"])(token, owner, repo, indexPath, branch);
        if (txt) list = JSON.parse(txt);
    } catch  {
    // ignore parse errors and start from empty list
    }
    const map = new Map(list.map((i)=>[
            i.slug,
            i
        ]));
    map.set(item.slug, item);
    const next = Array.from(map.values()).sort((a, b)=>(b.date || '').localeCompare(a.date || ''));
    return JSON.stringify(next, null, 2);
}
async function removeBlogsFromIndex(token, owner, repo, slugs, branch) {
    const indexPath = 'public/blogs/index.json';
    let list = [];
    try {
        const txt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTextFileFromRepo"])(token, owner, repo, indexPath, branch);
        if (txt) list = JSON.parse(txt);
    } catch  {
    // ignore parse errors and keep empty list
    }
    const slugSet = new Set(slugs.filter(Boolean));
    if (slugSet.size === 0) {
        return JSON.stringify(list, null, 2);
    }
    const next = list.filter((item)=>!slugSet.has(item.slug));
    return JSON.stringify(next, null, 2);
}
async function removeBlogFromIndex(token, owner, repo, slug, branch) {
    return removeBlogsFromIndex(token, owner, repo, [
        slug
    ], branch);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/services/push-blog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushBlog",
    ()=>pushBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/blog-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
async function pushBlog(params) {
    const { form, cover, images, mode = 'create', originalSlug } = params;
    if (!form?.slug) throw new Error('需要 slug');
    if (mode === 'edit' && originalSlug && originalSlug !== form.slug) {
        throw new Error('编辑模式下不支持修改 slug，请保持原 slug 不变');
    }
    // 获取认证 token（自动从全局认证状态获取）
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const basePath = `public/blogs/${form.slug}`;
    const commitMessage = mode === 'edit' ? `更新文章: ${form.slug}` : `新增文章: ${form.slug}`;
    // collect all local images (content + cover)
    const allLocalImages = [];
    // add content images
    for (const img of images || []){
        if (img.type === 'file') {
            allLocalImages.push({
                img,
                id: img.id
            });
        }
    }
    // add cover if local
    if (cover?.type === 'file') {
        allLocalImages.push({
            img: cover,
            id: cover.id
        });
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const uploadedHashes = new Set();
    let mdToUpload = form.md;
    let coverPath;
    // prepare tree items for all files
    const treeItems = [];
    // process all images
    if (allLocalImages.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在上传图片...');
        for (const { img, id } of allLocalImages){
            const hash = img.hash || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFileSHA256"])(img.file);
            const ext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFileExt"])(img.file.name);
            const filename = `${hash}${ext}`;
            const publicPath = `/blogs/${form.slug}/${filename}`;
            if (!uploadedHashes.has(hash)) {
                const path = `${basePath}/${filename}`;
                const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(img.file);
                // create blob for image
                const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
                treeItems.push({
                    path,
                    mode: '100644',
                    type: 'blob',
                    sha: blobData.sha
                });
                uploadedHashes.add(hash);
            }
            // replace placeholder in markdown
            const placeholder = `local-image:${id}`;
            mdToUpload = mdToUpload.split(`(${placeholder})`).join(`(${publicPath})`);
            // set cover path if this is the cover
            if (cover?.type === 'file' && cover.id === id) {
                coverPath = publicPath;
            }
        }
    }
    // handle external cover URL
    if (cover?.type === 'url') {
        coverPath = cover.url;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件...');
    // create blob for index.md
    const mdBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(mdToUpload), 'base64');
    treeItems.push({
        path: `${basePath}/index.md`,
        mode: '100644',
        type: 'blob',
        sha: mdBlob.sha
    });
    // create blob for config.json
    const dateStr = form.date || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTimeLocal"])();
    const config = {
        title: form.title,
        tags: form.tags,
        date: dateStr,
        summary: form.summary,
        cover: coverPath,
        hidden: form.hidden,
        category: form.category
    };
    const configBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(JSON.stringify(config, null, 2)), 'base64');
    treeItems.push({
        path: `${basePath}/config.json`,
        mode: '100644',
        type: 'blob',
        sha: configBlob.sha
    });
    // prepare and create blob for blogs index
    const indexJson = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareBlogsIndex"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, {
        slug: form.slug,
        title: form.title,
        tags: form.tags,
        date: dateStr,
        summary: form.summary,
        cover: coverPath,
        hidden: form.hidden,
        category: form.category
    }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH);
    const indexBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(indexJson), 'base64');
    treeItems.push({
        path: 'public/blogs/index.json',
        mode: '100644',
        type: 'blob',
        sha: indexBlob.sha
    });
    // create tree
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    // create commit
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    // update branch reference
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('发布成功！');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/services/delete-blog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteBlog",
    ()=>deleteBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/blog-index.ts [app-client] (ecmascript)");
;
;
;
;
;
async function deleteBlog(slug) {
    if (!slug) throw new Error('需要 slug');
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const basePath = `public/blogs/${slug}`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在收集文章文件...');
    const files = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listRepoFilesRecursive"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, basePath, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH);
    if (files.length === 0) {
        throw new Error('文章不存在或已删除');
    }
    const treeItems = files.map((path)=>({
            path,
            mode: '100644',
            type: 'blob',
            sha: null
        }));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在更新索引...');
    const indexJson = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blog$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeBlogFromIndex"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, slug, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH);
    const indexBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(indexJson), 'base64');
    treeItems.push({
        path: 'public/blogs/index.json',
        mode: '100644',
        type: 'blob',
        sha: indexBlob.sha
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `删除文章: ${slug}`, treeData.sha, [
        latestCommitSha
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('删除成功！请等待页面部署后刷新');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/hooks/use-publish.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePublish",
    ()=>usePublish
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$services$2f$push$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/services/push-blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$services$2f$delete$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/services/delete-blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function usePublish() {
    _s();
    const { loading, setLoading, form, cover, images, mode, originalSlug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const onChoosePrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePublish.useCallback[onChoosePrivateKey]": async (file)=>{
            const pem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readFileAsText"])(file);
            setPrivateKey(pem);
        }
    }["usePublish.useCallback[onChoosePrivateKey]"], [
        setPrivateKey
    ]);
    const onPublish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePublish.useCallback[onPublish]": async ()=>{
            try {
                setLoading(true);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$services$2f$push$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushBlog"])({
                    form,
                    cover,
                    images,
                    mode,
                    originalSlug
                });
                const successMsg = mode === 'edit' ? '更新成功' : '发布成功';
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(successMsg);
            } catch (err) {
                console.error(err);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.message || '操作失败');
            } finally{
                setLoading(false);
            }
        }
    }["usePublish.useCallback[onPublish]"], [
        form,
        cover,
        images,
        mode,
        originalSlug,
        setLoading
    ]);
    const onDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePublish.useCallback[onDelete]": async ()=>{
            const targetSlug = originalSlug || form.slug;
            if (!targetSlug) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('缺少 slug，无法删除');
                return;
            }
            try {
                setLoading(true);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$services$2f$delete$2d$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBlog"])(targetSlug);
            } catch (err_0) {
                console.error(err_0);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err_0?.message || '删除失败');
            } finally{
                setLoading(false);
            }
        }
    }["usePublish.useCallback[onDelete]"], [
        form.slug,
        originalSlug,
        setLoading
    ]);
    return {
        isAuth,
        loading,
        onChoosePrivateKey,
        onPublish,
        onDelete
    };
}
_s(usePublish, "fEeuZwVAFpYYP05iOykt4grI2VQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/actions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WriteActions",
    ()=>WriteActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/preview-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$publish$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/hooks/use-publish.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function WriteActions() {
    _s();
    const { loading, mode, form, loadBlogForEdit, originalSlug, updateForm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    const { openPreview } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewStore"])();
    const { isAuth, onChoosePrivateKey, onPublish, onDelete } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$publish$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublish"])();
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mdInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleImportOrPublish = ()=>{
        if (!isAuth) {
            keyInputRef.current?.click();
        } else {
            onPublish();
        }
    };
    const handleCancel = ()=>{
        if (!window.confirm('放弃本次修改吗？')) {
            return;
        }
        if (mode === 'edit' && originalSlug) {
            router.push(`/blog/${originalSlug}`);
        } else {
            router.push('/');
        }
    };
    const buttonText = isAuth ? mode === 'edit' ? '更新' : '发布' : '导入密钥';
    const handleDelete = ()=>{
        if (!isAuth) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('请先导入密钥');
            return;
        }
        const confirmMsg = form?.title ? `确定删除《${form.title}》吗？该操作不可恢复。` : '确定删除当前文章吗？该操作不可恢复。';
        if (window.confirm(confirmMsg)) {
            onDelete();
        }
    };
    const handleImportMd = ()=>{
        mdInputRef.current?.click();
    };
    const handleMdFileChange = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            updateForm({
                md: text
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('已导入 Markdown 文件');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('导入失败，请重试');
        } finally{
            if (e.currentTarget) e.currentTarget.value = '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: keyInputRef,
                type: "file",
                accept: ".pem",
                className: "hidden",
                onChange: async (e_0)=>{
                    const f = e_0.target.files?.[0];
                    if (f) await onChoosePrivateKey(f);
                    if (e_0.currentTarget) e_0.currentTarget.value = '';
                }
            }, void 0, false, {
                fileName: "[project]/src/app/write/components/actions.tsx",
                lineNumber: 77,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: mdInputRef,
                type: "file",
                accept: ".md",
                className: "hidden",
                onChange: handleMdFileChange
            }, void 0, false, {
                fileName: "[project]/src/app/write/components/actions.tsx",
                lineNumber: 82,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "absolute top-4 right-6 flex items-center gap-2",
                children: [
                    mode === 'edit' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.6
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border bg-blue-50 px-4 py-2 text-sm text-blue-700",
                                    children: "编辑模式"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/write/components/actions.tsx",
                                    lineNumber: 93,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/actions.tsx",
                                lineNumber: 86,
                                columnNumber: 7
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
                                className: "rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-100",
                                disabled: loading,
                                onClick: handleDelete,
                                children: "删除"
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/actions.tsx",
                                lineNumber: 96,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: handleCancel,
                                disabled: saving,
                                className: "bg-card rounded-xl border px-4 py-2 text-sm",
                                children: "取消"
                            }, void 0, false, {
                                fileName: "[project]/src/app/write/components/actions.tsx",
                                lineNumber: 110,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true),
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
                        className: "bg-card rounded-xl border px-4 py-2 text-sm",
                        disabled: loading,
                        onClick: handleImportMd,
                        children: "导入 MD"
                    }, void 0, false, {
                        fileName: "[project]/src/app/write/components/actions.tsx",
                        lineNumber: 119,
                        columnNumber: 5
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
                        className: "bg-card rounded-xl border px-6 py-2 text-sm",
                        disabled: loading,
                        onClick: openPreview,
                        children: "预览"
                    }, void 0, false, {
                        fileName: "[project]/src/app/write/components/actions.tsx",
                        lineNumber: 132,
                        columnNumber: 5
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
                        className: "brand-btn px-6",
                        disabled: loading,
                        onClick: handleImportOrPublish,
                        children: buttonText
                    }, void 0, false, {
                        fileName: "[project]/src/app/write/components/actions.tsx",
                        lineNumber: 145,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/write/components/actions.tsx",
                lineNumber: 84,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
_s(WriteActions, "g3yMp94TodSqc2PiXpjL1fvKnNg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$publish$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePublish"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = WriteActions;
var _c;
__turbopack_context__.k.register(_c, "WriteActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/src/app/write/hooks/use-write-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWriteData",
    ()=>useWriteData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useWriteData() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "7b64885323a929c9705fe011a570962acfc6a2eafbf883c8a41e447142a440a7") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7b64885323a929c9705fe011a570962acfc6a2eafbf883c8a41e447142a440a7";
    }
    const { form, images } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    let mdForPreview;
    if ($[1] !== form.md || $[2] !== images) {
        mdForPreview = form.md;
        for (const img of images){
            if (img.type === "file") {
                const placeholder = `local-image:${img.id}`;
                mdForPreview = mdForPreview.split(`(${placeholder})`).join(`(${img.previewUrl})`);
            }
        }
        $[1] = form.md;
        $[2] = images;
        $[3] = mdForPreview;
    } else {
        mdForPreview = $[3];
    }
    const processedMarkdown = mdForPreview;
    const title = form.title || "Untitled";
    let t0;
    if ($[4] !== form.date) {
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(form.date).format("YYYY\u5E74 M\u6708 D\u65E5");
        $[4] = form.date;
        $[5] = t0;
    } else {
        t0 = $[5];
    }
    const date = t0;
    let t1;
    if ($[6] !== date || $[7] !== processedMarkdown || $[8] !== title) {
        t1 = {
            markdown: processedMarkdown,
            title,
            date
        };
        $[6] = date;
        $[7] = processedMarkdown;
        $[8] = title;
        $[9] = t1;
    } else {
        t1 = $[9];
    }
    return t1;
}
_s(useWriteData, "jJA1z/CyCtdv8vPVTENZY7UIU7U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/components/preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WritePreview",
    ()=>WritePreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blog-preview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$write$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/hooks/use-write-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function WritePreview(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "2b4428a1301233889ce776b63026939739a4262b9a7a442f4a120a501edb86bf") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2b4428a1301233889ce776b63026939739a4262b9a7a442f4a120a501edb86bf";
    }
    const { form, coverPreviewUrl, onClose, slug } = t0;
    const previewData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$write$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteData"])();
    const t1 = coverPreviewUrl || undefined;
    let t2;
    if ($[1] !== form.summary || $[2] !== form.tags || $[3] !== previewData.date || $[4] !== previewData.markdown || $[5] !== previewData.title || $[6] !== slug || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: _WritePreviewDivOnClick,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blog$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogPreview"], {
                markdown: previewData.markdown,
                title: previewData.title,
                tags: form.tags,
                date: previewData.date,
                summary: form.summary,
                cover: t1,
                slug: slug
            }, void 0, false, {
                fileName: "[project]/src/app/write/components/preview.tsx",
                lineNumber: 30,
                columnNumber: 49
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/preview.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[1] = form.summary;
        $[2] = form.tags;
        $[3] = previewData.date;
        $[4] = previewData.markdown;
        $[5] = previewData.title;
        $[6] = slug;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0,
            scale: 0.6
        };
        t4 = {
            opacity: 1,
            scale: 1
        };
        t5 = {
            scale: 1.05
        };
        t6 = {
            scale: 0.95
        };
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
        $[12] = t6;
    } else {
        t3 = $[9];
        t4 = $[10];
        t5 = $[11];
        t6 = $[12];
    }
    let t7;
    if ($[13] !== onClose) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            initial: t3,
            animate: t4,
            whileHover: t5,
            whileTap: t6,
            className: "absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm",
            onClick: onClose,
            children: "关闭预览"
        }, void 0, false, {
            fileName: "[project]/src/app/write/components/preview.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[13] = onClose;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== t2 || $[16] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t2,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/write/components/preview.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[15] = t2;
        $[16] = t7;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    return t8;
}
_s(WritePreview, "M7wiQ3KzV9ct4d5ATICHs9A/MTw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$hooks$2f$use$2d$write$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteData"]
    ];
});
_c = WritePreview;
function _WritePreviewDivOnClick(e) {
    return e.stopPropagation();
}
var _c;
__turbopack_context__.k.register(_c, "WritePreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/write/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WritePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/write-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/stores/preview-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$actions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/actions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/write/components/preview.tsx [app-client] (ecmascript)");
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
;
function WritePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "8d10df72966ace32b99849eeec5fe3d2dcdb92e0ae1379b5446d8b5f831241ee") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8d10df72966ace32b99849eeec5fe3d2dcdb92e0ae1379b5446d8b5f831241ee";
    }
    const { form, cover, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"])();
    let t0;
    if ($[1] !== reset) {
        t0 = ({
            "WritePage[useEffect()]": ()=>reset()
        })["WritePage[useEffect()]"];
        $[1] = reset;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    const { isPreview, closePreview } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewStore"])();
    const coverPreviewUrl = cover ? cover.type === "url" ? cover.url : cover.previewUrl : null;
    let t2;
    if ($[4] !== closePreview || $[5] !== coverPreviewUrl || $[6] !== form || $[7] !== isPreview) {
        t2 = isPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WritePreview"], {
            form: form,
            coverPreviewUrl: coverPreviewUrl,
            onClose: closePreview
        }, void 0, false, {
            fileName: "[project]/src/app/write/page.tsx",
            lineNumber: 49,
            columnNumber: 22
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full justify-center gap-6 px-6 pt-24 pb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WriteEditor"], {}, void 0, false, {
                            fileName: "[project]/src/app/write/page.tsx",
                            lineNumber: 49,
                            columnNumber: 179
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WriteSidebar"], {}, void 0, false, {
                            fileName: "[project]/src/app/write/page.tsx",
                            lineNumber: 49,
                            columnNumber: 194
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/write/page.tsx",
                    lineNumber: 49,
                    columnNumber: 112
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$components$2f$actions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WriteActions"], {}, void 0, false, {
                    fileName: "[project]/src/app/write/page.tsx",
                    lineNumber: 49,
                    columnNumber: 216
                }, this)
            ]
        }, void 0, true);
        $[4] = closePreview;
        $[5] = coverPreviewUrl;
        $[6] = form;
        $[7] = isPreview;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_s(WritePage, "jQ+bwV2jnTomLP86N9I4q6+nH6Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$write$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$write$2f$stores$2f$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewStore"]
    ];
});
_c = WritePage;
var _c;
__turbopack_context__.k.register(_c, "WritePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_97c7315a._.js.map