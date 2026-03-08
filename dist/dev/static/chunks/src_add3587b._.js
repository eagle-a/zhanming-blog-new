(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/star-rating.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function StarRating(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "91a8771cc9545fa902dff560717c4683f50cbe5de7560cac2fb3b12a943a5fd5") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "91a8771cc9545fa902dff560717c4683f50cbe5de7560cac2fb3b12a943a5fd5";
    }
    const { stars } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            1,
            2,
            3,
            4,
            5
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== stars) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0.5",
            children: t1.map({
                "StarRating[(anonymous)()]": (index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StarIcon, {
                        filled: index <= stars
                    }, index, false, {
                        fileName: "[project]/src/components/star-rating.tsx",
                        lineNumber: 23,
                        columnNumber: 47
                    }, this)
            }["StarRating[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/star-rating.tsx",
            lineNumber: 22,
            columnNumber: 10
        }, this);
        $[2] = stars;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_c = StarRating;
function StarIcon(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "91a8771cc9545fa902dff560717c4683f50cbe5de7560cac2fb3b12a943a5fd5") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "91a8771cc9545fa902dff560717c4683f50cbe5de7560cac2fb3b12a943a5fd5";
    }
    const { filled } = t0;
    const t1 = filled ? "fill-yellow-400" : "fill-gray-300";
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }, void 0, false, {
            fileName: "[project]/src/components/star-rating.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    let t3;
    if ($[2] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/star-rating.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    return t3;
}
_c1 = StarIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "StarRating");
__turbopack_context__.k.register(_c1, "StarIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editable-star-rating.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditableStarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function EditableStarRating(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6c9cc8c4ecc25f2a3f86a1c2ab785af2f4bcbb66567d33bd8e566427bac37ed4") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6c9cc8c4ecc25f2a3f86a1c2ab785af2f4bcbb66567d33bd8e566427bac37ed4";
    }
    const { stars, editable: t1, onChange } = t0;
    const editable = t1 === undefined ? false : t1;
    let t2;
    if ($[1] !== editable || $[2] !== onChange) {
        t2 = ({
            "EditableStarRating[handleClick]": (index)=>{
                if (editable && onChange) {
                    onChange(index);
                }
            }
        })["EditableStarRating[handleClick]"];
        $[1] = editable;
        $[2] = onChange;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleClick = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = [
            1,
            2,
            3,
            4,
            5
        ];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== editable || $[6] !== handleClick || $[7] !== stars) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0.5",
            children: t3.map({
                "EditableStarRating[(anonymous)()]": (index_0)=>{
                    const filled = index_0 <= stars;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: {
                            "EditableStarRating[(anonymous)() > <div>.onClick]": ()=>handleClick(index_0)
                        }["EditableStarRating[(anonymous)() > <div>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(editable && "cursor-pointer"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StarIcon, {
                            filled: filled
                        }, void 0, false, {
                            fileName: "[project]/src/components/editable-star-rating.tsx",
                            lineNumber: 54,
                            columnNumber: 112
                        }, this)
                    }, index_0, false, {
                        fileName: "[project]/src/components/editable-star-rating.tsx",
                        lineNumber: 52,
                        columnNumber: 18
                    }, this);
                }
            }["EditableStarRating[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/editable-star-rating.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[5] = editable;
        $[6] = handleClick;
        $[7] = stars;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    return t4;
}
_c = EditableStarRating;
function StarIcon(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "6c9cc8c4ecc25f2a3f86a1c2ab785af2f4bcbb66567d33bd8e566427bac37ed4") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6c9cc8c4ecc25f2a3f86a1c2ab785af2f4bcbb66567d33bd8e566427bac37ed4";
    }
    const { filled } = t0;
    const t1 = filled ? "fill-yellow-400" : "fill-gray-300";
    let t2;
    if ($[1] !== t1) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(t1);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }, void 0, false, {
            fileName: "[project]/src/components/editable-star-rating.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            className: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/components/editable-star-rating.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[4] = t2;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    return t4;
}
_c1 = StarIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "EditableStarRating");
__turbopack_context__.k.register(_c1, "StarIcon");
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
"[project]/src/app/share/components/logo-upload-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogoUploadDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function LogoUploadDialog(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "6817b1a3c573a0796a29f8b5b6d7868ced30c709e83e351354c0507e73a4c665") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6817b1a3c573a0796a29f8b5b6d7868ced30c709e83e351354c0507e73a4c665";
    }
    const { currentLogo, onClose, onSubmit } = t0;
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentLogo || "");
    const [previewFile, setPreviewFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "LogoUploadDialog[handleFileSelect]": (e)=>{
                const file = e.target.files?.[0];
                if (!file) {
                    return;
                }
                if (!file.type.startsWith("image/")) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u9009\u62E9\u56FE\u7247\u6587\u4EF6");
                    return;
                }
                const previewUrl = URL.createObjectURL(file);
                setPreviewFile({
                    file,
                    previewUrl
                });
                setUrlInput("");
            }
        })["LogoUploadDialog[handleFileSelect]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const handleFileSelect = t1;
    let t2;
    if ($[2] !== currentLogo || $[3] !== onClose || $[4] !== onSubmit || $[5] !== previewFile || $[6] !== urlInput) {
        t2 = ({
            "LogoUploadDialog[handleSubmit]": (e_0)=>{
                e_0.preventDefault();
                if (previewFile) {
                    onSubmit({
                        type: "file",
                        file: previewFile.file,
                        previewUrl: previewFile.previewUrl
                    });
                } else {
                    if (urlInput.trim()) {
                        onSubmit({
                            type: "url",
                            url: urlInput.trim()
                        });
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u4E0A\u4F20\u56FE\u7247\u6216\u8F93\u5165 URL");
                        return;
                    }
                }
                setPreviewFile(null);
                setUrlInput(currentLogo || "");
                onClose();
            }
        })["LogoUploadDialog[handleSubmit]"];
        $[2] = currentLogo;
        $[3] = onClose;
        $[4] = onSubmit;
        $[5] = previewFile;
        $[6] = urlInput;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handleSubmit = t2;
    let t3;
    if ($[8] !== currentLogo || $[9] !== onClose || $[10] !== previewFile) {
        t3 = ({
            "LogoUploadDialog[handleClose]": ()=>{
                if (previewFile) {
                    URL.revokeObjectURL(previewFile.previewUrl);
                }
                setPreviewFile(null);
                setUrlInput(currentLogo || "");
                onClose();
            }
        })["LogoUploadDialog[handleClose]"];
        $[8] = currentLogo;
        $[9] = onClose;
        $[10] = previewFile;
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    const handleClose = t3;
    let t4;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mb-4 text-xl font-bold",
            children: "选择图标"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 122,
            columnNumber: 10
        }, this);
        $[12] = t4;
    } else {
        t4 = $[12];
    }
    let t5;
    let t6;
    let t7;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-secondary mb-2 block text-sm font-medium",
            children: "上传图片"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 131,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleFileSelect
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        t7 = ({
            "LogoUploadDialog[<div>.onClick]": ()=>fileInputRef.current?.click()
        })["LogoUploadDialog[<div>.onClick]"];
        $[13] = t5;
        $[14] = t6;
        $[15] = t7;
    } else {
        t5 = $[13];
        t6 = $[14];
        t7 = $[15];
    }
    let t8;
    if ($[16] !== previewFile) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t5,
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: t7,
                    className: "mx-auto flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-secondary/10 transition-colors hover:bg-gray-200",
                    children: previewFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: previewFile.previewUrl,
                        alt: "preview",
                        className: "h-full w-full rounded-xl object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                        lineNumber: 146,
                        columnNumber: 220
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "text-secondary mx-auto mb-1 h-8 w-8"
                            }, void 0, false, {
                                fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 352
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-secondary text-xs",
                                children: "点击上传图片"
                            }, void 0, false, {
                                fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 408
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                        lineNumber: 146,
                        columnNumber: 323
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                    lineNumber: 146,
                    columnNumber: 23
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 146,
            columnNumber: 10
        }, this);
        $[16] = previewFile;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full border-t border-gray-300"
            }, void 0, false, {
                fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                lineNumber: 154,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 154,
            columnNumber: 10
        }, this);
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex justify-center text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-secondary rounded-lg bg-white px-4 py-1",
                        children: "或"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                        lineNumber: 162,
                        columnNumber: 95
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                    lineNumber: 162,
                    columnNumber: 41
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-secondary mb-2 block text-sm font-medium",
            children: "图片 URL"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t11;
    } else {
        t10 = $[19];
        t11 = $[20];
    }
    let t12;
    if ($[21] !== previewFile) {
        t12 = ({
            "LogoUploadDialog[<input>.onChange]": (e_1)=>{
                setUrlInput(e_1.target.value);
                if (previewFile) {
                    URL.revokeObjectURL(previewFile.previewUrl);
                    setPreviewFile(null);
                }
            }
        })["LogoUploadDialog[<input>.onChange]"];
        $[21] = previewFile;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== t12 || $[24] !== urlInput) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "url",
                    value: urlInput,
                    onChange: t12,
                    placeholder: "https://example.com/logo.png",
                    className: "focus:ring-brand w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 focus:ring-2 focus:outline-none"
                }, void 0, false, {
                    fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                    lineNumber: 188,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 188,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = urlInput;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "brand-btn flex-1 justify-center rounded-lg px-6 py-2.5",
            children: "确认"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] !== handleClose) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3 pt-2",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleClose,
                    className: "flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 transition-colors hover:bg-gray-50",
                    children: "取消"
                }, void 0, false, {
                    fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
                    lineNumber: 204,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[27] = handleClose;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== handleSubmit || $[30] !== t13 || $[31] !== t15 || $[32] !== t8) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
                t8,
                t10,
                t13,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[29] = handleSubmit;
        $[30] = t13;
        $[31] = t15;
        $[32] = t8;
        $[33] = t16;
    } else {
        t16 = $[33];
    }
    let t17;
    if ($[34] !== handleClose || $[35] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogModal"], {
            open: true,
            onClose: handleClose,
            className: "card w-md",
            children: [
                t4,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/logo-upload-dialog.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        $[34] = handleClose;
        $[35] = t16;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    return t17;
}
_s(LogoUploadDialog, "jjHCOKROXDtOWpxYBuwW4tHjTI0=");
_c = LogoUploadDialog;
var _c;
__turbopack_context__.k.register(_c, "LogoUploadDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/share/components/share-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShareCard",
    ()=>ShareCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/star-rating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editable-star-rating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$logo$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/components/logo-upload-dialog.tsx [app-client] (ecmascript)");
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
// 默认占位图
const FALLBACK_LOGO = '/images/avatar.png';
function ShareCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(95);
    if ($[0] !== "a2480bd59f8ff21c6468fc785c56087623b76ff1f8ce326a51cb634d02665625") {
        for(let $i = 0; $i < 95; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a2480bd59f8ff21c6468fc785c56087623b76ff1f8ce326a51cb634d02665625";
    }
    const { share, isEditMode: t1, onUpdate, onDelete } = t0;
    const isEditMode = t1 === undefined ? false : t1;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    const [localShare, setLocalShare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(share);
    const [showLogoDialog, setShowLogoDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoItem, setLogoItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [logoError, setLogoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    if ($[1] !== localShare || $[2] !== logoItem || $[3] !== onUpdate || $[4] !== share) {
        t2 = ({
            "ShareCard[handleFieldChange]": (field, value)=>{
                const updated = {
                    ...localShare,
                    [field]: value
                };
                setLocalShare(updated);
                onUpdate?.(updated, share, logoItem || undefined);
            }
        })["ShareCard[handleFieldChange]"];
        $[1] = localShare;
        $[2] = logoItem;
        $[3] = onUpdate;
        $[4] = share;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const handleFieldChange = t2;
    let t3;
    if ($[6] !== localShare || $[7] !== onUpdate || $[8] !== share) {
        t3 = ({
            "ShareCard[handleLogoSubmit]": (logo)=>{
                setLogoItem(logo);
                const logoUrl = logo.type === "url" ? logo.url : logo.previewUrl;
                const updated_0 = {
                    ...localShare,
                    logo: logoUrl
                };
                setLocalShare(updated_0);
                onUpdate?.(updated_0, share, logo);
                setLogoError(false);
            }
        })["ShareCard[handleLogoSubmit]"];
        $[6] = localShare;
        $[7] = onUpdate;
        $[8] = share;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    const handleLogoSubmit = t3;
    let t4;
    if ($[10] !== handleFieldChange) {
        t4 = ({
            "ShareCard[handleTagsChange]": (tagsStr)=>{
                const tags = tagsStr.split(",").map(_ShareCardHandleTagsChangeAnonymous).filter(_ShareCardHandleTagsChangeAnonymous2);
                handleFieldChange("tags", tags);
            }
        })["ShareCard[handleTagsChange]"];
        $[10] = handleFieldChange;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    const handleTagsChange = t4;
    let t5;
    if ($[12] !== share) {
        t5 = ({
            "ShareCard[handleCancel]": ()=>{
                setLocalShare(share);
                setIsEditing(false);
                setLogoItem(null);
            }
        })["ShareCard[handleCancel]"];
        $[12] = share;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    const handleCancel = t5;
    const canEdit = isEditMode && isEditing;
    let t6;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            opacity: 0,
            scale: 0.6
        };
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== maxSM) {
        t7 = maxSM ? {
            animate: {
                opacity: 1,
                scale: 1
            }
        } : {
            whileInView: {
                opacity: 1,
                scale: 1
            }
        };
        $[15] = maxSM;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== handleCancel || $[18] !== isEditMode || $[19] !== isEditing || $[20] !== onDelete) {
        t8 = isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-3 right-3 z-10 flex gap-2",
            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCancel,
                        className: "rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600",
                        children: "取消"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/share-card.tsx",
                        lineNumber: 156,
                        columnNumber: 95
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "ShareCard[<button>.onClick]": ()=>setIsEditing(false)
                        }["ShareCard[<button>.onClick]"],
                        className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                        children: "完成"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/share-card.tsx",
                        lineNumber: 156,
                        columnNumber: 232
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "ShareCard[<button>.onClick]": ()=>setIsEditing(true)
                        }["ShareCard[<button>.onClick]"],
                        className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                        children: "编辑"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/share-card.tsx",
                        lineNumber: 158,
                        columnNumber: 157
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onDelete,
                        className: "rounded-lg px-2 py-1.5 text-xs text-red-400 transition-colors hover:text-red-600",
                        children: "删除"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/share-card.tsx",
                        lineNumber: 160,
                        columnNumber: 149
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 156,
            columnNumber: 24
        }, this);
        $[17] = handleCancel;
        $[18] = isEditMode;
        $[19] = isEditing;
        $[20] = onDelete;
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    const t9 = logoError ? FALLBACK_LOGO : localShare.logo;
    const t10 = localShare.name;
    const t11 = canEdit && "cursor-pointer";
    let t12;
    if ($[22] !== t11) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-16 w-16 rounded-xl object-cover", t11);
        $[22] = t11;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== canEdit) {
        t13 = ({
            "ShareCard[<img>.onClick]": ()=>canEdit && setShowLogoDialog(true)
        })["ShareCard[<img>.onClick]"];
        $[24] = canEdit;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "ShareCard[<img>.onError]": ()=>setLogoError(true)
        })["ShareCard[<img>.onError]"];
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] !== localShare.name || $[28] !== t12 || $[29] !== t13 || $[30] !== t9) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: t9,
            alt: t10,
            className: t12,
            onClick: t13,
            onError: t14
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[27] = localShare.name;
        $[28] = t12;
        $[29] = t13;
        $[30] = t9;
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] !== canEdit) {
        t16 = canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ev pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-white",
                children: "更换"
            }, void 0, false, {
                fileName: "[project]/src/app/share/components/share-card.tsx",
                lineNumber: 212,
                columnNumber: 188
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 212,
            columnNumber: 22
        }, this);
        $[32] = canEdit;
        $[33] = t16;
    } else {
        t16 = $[33];
    }
    let t17;
    if ($[34] !== t15 || $[35] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative",
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 220,
            columnNumber: 11
        }, this);
        $[34] = t15;
        $[35] = t16;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    let t18;
    if ($[37] !== handleFieldChange) {
        t18 = ({
            "ShareCard[<h3>.onBlur]": (e)=>handleFieldChange("name", e.currentTarget.textContent || "")
        })["ShareCard[<h3>.onBlur]"];
        $[37] = handleFieldChange;
        $[38] = t18;
    } else {
        t18 = $[38];
    }
    const t19 = canEdit && "cursor-text";
    let t20;
    if ($[39] !== t19) {
        t20 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group-hover:text-brand text-lg font-bold transition-colors focus:outline-none", t19);
        $[39] = t19;
        $[40] = t20;
    } else {
        t20 = $[40];
    }
    let t21;
    if ($[41] !== canEdit || $[42] !== localShare.name || $[43] !== t18 || $[44] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            contentEditable: canEdit,
            suppressContentEditableWarning: true,
            onBlur: t18,
            className: t20,
            children: localShare.name
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[41] = canEdit;
        $[42] = localShare.name;
        $[43] = t18;
        $[44] = t20;
        $[45] = t21;
    } else {
        t21 = $[45];
    }
    let t22;
    if ($[46] !== canEdit || $[47] !== handleFieldChange || $[48] !== localShare.url) {
        t22 = canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: {
                "ShareCard[<div>.onBlur]": (e_0)=>handleFieldChange("url", e_0.currentTarget.textContent || "")
            }["ShareCard[<div>.onBlur]"],
            className: "text-secondary mt-1 block max-w-[200px] cursor-text truncate text-xs focus:outline-none",
            children: localShare.url
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 259,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: localShare.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-secondary hover:text-brand mt-1 block max-w-[200px] truncate text-xs hover:underline",
            children: localShare.url
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 261,
            columnNumber: 160
        }, this);
        $[46] = canEdit;
        $[47] = handleFieldChange;
        $[48] = localShare.url;
        $[49] = t22;
    } else {
        t22 = $[49];
    }
    let t23;
    if ($[50] !== t21 || $[51] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[50] = t21;
        $[51] = t22;
        $[52] = t23;
    } else {
        t23 = $[52];
    }
    let t24;
    if ($[53] !== t17 || $[54] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center gap-4",
            children: [
                t17,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, this);
        $[53] = t17;
        $[54] = t23;
        $[55] = t24;
    } else {
        t24 = $[55];
    }
    let t25;
    if ($[56] !== canEdit || $[57] !== handleFieldChange || $[58] !== localShare.stars) {
        t25 = canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            stars: localShare.stars,
            editable: true,
            onChange: {
                "ShareCard[<EditableStarRating>.onChange]": (stars)=>handleFieldChange("stars", stars)
            }["ShareCard[<EditableStarRating>.onChange]"]
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 289,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            stars: localShare.stars
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 291,
            columnNumber: 57
        }, this);
        $[56] = canEdit;
        $[57] = handleFieldChange;
        $[58] = localShare.stars;
        $[59] = t25;
    } else {
        t25 = $[59];
    }
    let t26;
    if ($[60] !== canEdit || $[61] !== handleTagsChange || $[62] !== localShare.tags) {
        t26 = canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: localShare.tags.join(", "),
            onChange: {
                "ShareCard[<input>.onChange]": (e_1)=>handleTagsChange(e_1.target.value)
            }["ShareCard[<input>.onChange]"],
            placeholder: "\u6807\u7B7E\uFF0C\u7528\u9017\u53F7\u5206\u9694",
            className: "w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-xs focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 301,
            columnNumber: 21
        }, this) : localShare.tags.map(_ShareCardLocalShareTagsMap);
        $[60] = canEdit;
        $[61] = handleTagsChange;
        $[62] = localShare.tags;
        $[63] = t26;
    } else {
        t26 = $[63];
    }
    let t27;
    if ($[64] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 flex flex-wrap gap-1.5",
            children: t26
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 313,
            columnNumber: 11
        }, this);
        $[64] = t26;
        $[65] = t27;
    } else {
        t27 = $[65];
    }
    let t28;
    if ($[66] !== handleFieldChange) {
        t28 = ({
            "ShareCard[<p>.onBlur]": (e_2)=>handleFieldChange("description", e_2.currentTarget.textContent || "")
        })["ShareCard[<p>.onBlur]"];
        $[66] = handleFieldChange;
        $[67] = t28;
    } else {
        t28 = $[67];
    }
    let t29;
    if ($[68] !== canEdit || $[69] !== expanded) {
        t29 = ({
            "ShareCard[<p>.onClick]": (e_3)=>{
                if (!canEdit) {
                    e_3.preventDefault();
                    setExpanded(!expanded);
                }
            }
        })["ShareCard[<p>.onClick]"];
        $[68] = canEdit;
        $[69] = expanded;
        $[70] = t29;
    } else {
        t29 = $[70];
    }
    const t30 = canEdit ? "cursor-text" : "cursor-pointer";
    const t31 = !canEdit && (expanded ? "line-clamp-none" : "line-clamp-3");
    let t32;
    if ($[71] !== t30 || $[72] !== t31) {
        t32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-3 text-sm leading-relaxed text-gray-600 transition-all duration-300 focus:outline-none", t30, t31);
        $[71] = t30;
        $[72] = t31;
        $[73] = t32;
    } else {
        t32 = $[73];
    }
    let t33;
    if ($[74] !== canEdit || $[75] !== localShare.description || $[76] !== t28 || $[77] !== t29 || $[78] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            contentEditable: canEdit,
            suppressContentEditableWarning: true,
            onBlur: t28,
            onClick: t29,
            className: t32,
            children: localShare.description
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[74] = canEdit;
        $[75] = localShare.description;
        $[76] = t28;
        $[77] = t29;
        $[78] = t32;
        $[79] = t33;
    } else {
        t33 = $[79];
    }
    let t34;
    if ($[80] !== t24 || $[81] !== t25 || $[82] !== t27 || $[83] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t24,
                t25,
                t27,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[80] = t24;
        $[81] = t25;
        $[82] = t27;
        $[83] = t33;
        $[84] = t34;
    } else {
        t34 = $[84];
    }
    let t35;
    if ($[85] !== canEdit || $[86] !== handleLogoSubmit || $[87] !== localShare.logo || $[88] !== showLogoDialog) {
        t35 = canEdit && showLogoDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$logo$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            currentLogo: localShare.logo,
            onClose: {
                "ShareCard[<LogoUploadDialog>.onClose]": ()=>setShowLogoDialog(false)
            }["ShareCard[<LogoUploadDialog>.onClose]"],
            onSubmit: handleLogoSubmit
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 381,
            columnNumber: 40
        }, this);
        $[85] = canEdit;
        $[86] = handleLogoSubmit;
        $[87] = localShare.logo;
        $[88] = showLogoDialog;
        $[89] = t35;
    } else {
        t35 = $[89];
    }
    let t36;
    if ($[90] !== t34 || $[91] !== t35 || $[92] !== t7 || $[93] !== t8) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t6,
            ...t7,
            className: "card relative block overflow-hidden",
            children: [
                t8,
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/share-card.tsx",
            lineNumber: 394,
            columnNumber: 11
        }, this);
        $[90] = t34;
        $[91] = t35;
        $[92] = t7;
        $[93] = t8;
        $[94] = t36;
    } else {
        t36 = $[94];
    }
    return t36;
}
_s(ShareCard, "2QZVeIBuKkG9MhYUHSoRu2Kv080=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"]
    ];
});
_c = ShareCard;
function _ShareCardLocalShareTagsMap(tag) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "bg-secondary/10 rounded-full px-2.5 py-0.5 text-xs",
        children: tag
    }, tag, false, {
        fileName: "[project]/src/app/share/components/share-card.tsx",
        lineNumber: 406,
        columnNumber: 10
    }, this);
}
function _ShareCardHandleTagsChangeAnonymous2(t_0) {
    return t_0;
}
function _ShareCardHandleTagsChangeAnonymous(t) {
    return t.trim();
}
var _c;
__turbopack_context__.k.register(_c, "ShareCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/share/grid-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GridView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$share$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/components/share-card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function GridView(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(47);
    if ($[0] !== "5aed444b7513cf722d90851a7b142e69adf4d7c1e0490db196500af8fe624ae6") {
        for(let $i = 0; $i < 47; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5aed444b7513cf722d90851a7b142e69adf4d7c1e0490db196500af8fe624ae6";
    }
    const { shares, isEditMode: t1, onUpdate, onDelete } = t0;
    const isEditMode = t1 === undefined ? false : t1;
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedTag, setSelectedTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    let t2;
    if ($[1] !== shares) {
        t2 = Array.from(new Set(shares.flatMap(_GridViewSharesFlatMap)));
        $[1] = shares;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const allTags = t2;
    let filteredShares;
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[3] !== allTags || $[4] !== isEditMode || $[5] !== onDelete || $[6] !== onUpdate || $[7] !== searchTerm || $[8] !== selectedTag || $[9] !== shares) {
        let t7;
        if ($[15] !== searchTerm || $[16] !== selectedTag) {
            t7 = ({
                "GridView[shares.filter()]": (share_0)=>{
                    const matchesSearch = share_0.name.toLowerCase().includes(searchTerm.toLowerCase()) || share_0.description.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesTag = selectedTag === "all" || share_0.tags.includes(selectedTag);
                    return matchesSearch && matchesTag;
                }
            })["GridView[shares.filter()]"];
            $[15] = searchTerm;
            $[16] = selectedTag;
            $[17] = t7;
        } else {
            t7 = $[17];
        }
        filteredShares = shares.filter(t7);
        t5 = "mx-auto w-full max-w-7xl px-6 pt-24 pb-12";
        let t8;
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t8 = ({
                "GridView[<input>.onChange]": (e)=>setSearchTerm(e.target.value)
            })["GridView[<input>.onChange]"];
            $[18] = t8;
        } else {
            t8 = $[18];
        }
        let t9;
        if ($[19] !== searchTerm) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "\u641C\u7D22\u8D44\u6E90...",
                value: searchTerm,
                onChange: t8,
                className: "focus:ring-brand mx-auto block w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/src/app/share/grid-view.tsx",
                lineNumber: 73,
                columnNumber: 12
            }, this);
            $[19] = searchTerm;
            $[20] = t9;
        } else {
            t9 = $[20];
        }
        let t10;
        if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = ({
                "GridView[<button>.onClick]": ()=>setSelectedTag("all")
            })["GridView[<button>.onClick]"];
            $[21] = t10;
        } else {
            t10 = $[21];
        }
        const t11 = `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedTag === "all" ? "bg-brand text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`;
        let t12;
        if ($[22] !== t11) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: t10,
                className: t11,
                children: "全部"
            }, void 0, false, {
                fileName: "[project]/src/app/share/grid-view.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this);
            $[22] = t11;
            $[23] = t12;
        } else {
            t12 = $[23];
        }
        let t13;
        if ($[24] !== allTags || $[25] !== selectedTag) {
            t13 = allTags.map({
                "GridView[allTags.map()]": (tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "GridView[allTags.map() > <button>.onClick]": ()=>setSelectedTag(tag)
                        }["GridView[allTags.map() > <button>.onClick]"],
                        className: `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedTag === tag ? "bg-brand text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
                        children: tag
                    }, tag, false, {
                        fileName: "[project]/src/app/share/grid-view.tsx",
                        lineNumber: 100,
                        columnNumber: 43
                    }, this)
            }["GridView[allTags.map()]"]);
            $[24] = allTags;
            $[25] = selectedTag;
            $[26] = t13;
        } else {
            t13 = $[26];
        }
        let t14;
        if ($[27] !== t12 || $[28] !== t13) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: [
                    t12,
                    t13
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/share/grid-view.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, this);
            $[27] = t12;
            $[28] = t13;
            $[29] = t14;
        } else {
            t14 = $[29];
        }
        if ($[30] !== t14 || $[31] !== t9) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 space-y-4",
                children: [
                    t9,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/share/grid-view.tsx",
                lineNumber: 120,
                columnNumber: 12
            }, this);
            $[30] = t14;
            $[31] = t9;
            $[32] = t6;
        } else {
            t6 = $[32];
        }
        t3 = "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3";
        let t15;
        if ($[33] !== isEditMode || $[34] !== onDelete || $[35] !== onUpdate) {
            t15 = ({
                "GridView[filteredShares.map()]": (share_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$share$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShareCard"], {
                        share: share_1,
                        isEditMode: isEditMode,
                        onUpdate: onUpdate,
                        onDelete: {
                            "GridView[filteredShares.map() > <ShareCard>.onDelete]": ()=>onDelete?.(share_1)
                        }["GridView[filteredShares.map() > <ShareCard>.onDelete]"]
                    }, share_1.url, false, {
                        fileName: "[project]/src/app/share/grid-view.tsx",
                        lineNumber: 131,
                        columnNumber: 54
                    }, this)
            })["GridView[filteredShares.map()]"];
            $[33] = isEditMode;
            $[34] = onDelete;
            $[35] = onUpdate;
            $[36] = t15;
        } else {
            t15 = $[36];
        }
        t4 = filteredShares.map(t15);
        $[3] = allTags;
        $[4] = isEditMode;
        $[5] = onDelete;
        $[6] = onUpdate;
        $[7] = searchTerm;
        $[8] = selectedTag;
        $[9] = shares;
        $[10] = filteredShares;
        $[11] = t3;
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
    } else {
        filteredShares = $[10];
        t3 = $[11];
        t4 = $[12];
        t5 = $[13];
        t6 = $[14];
    }
    let t7;
    if ($[37] !== t3 || $[38] !== t4) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/app/share/grid-view.tsx",
            lineNumber: 164,
            columnNumber: 10
        }, this);
        $[37] = t3;
        $[38] = t4;
        $[39] = t7;
    } else {
        t7 = $[39];
    }
    let t8;
    if ($[40] !== filteredShares.length) {
        t8 = filteredShares.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-12 text-center text-gray-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "没有找到相关资源"
            }, void 0, false, {
                fileName: "[project]/src/app/share/grid-view.tsx",
                lineNumber: 173,
                columnNumber: 90
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/share/grid-view.tsx",
            lineNumber: 173,
            columnNumber: 41
        }, this);
        $[40] = filteredShares.length;
        $[41] = t8;
    } else {
        t8 = $[41];
    }
    let t9;
    if ($[42] !== t5 || $[43] !== t6 || $[44] !== t7 || $[45] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/grid-view.tsx",
            lineNumber: 181,
            columnNumber: 10
        }, this);
        $[42] = t5;
        $[43] = t6;
        $[44] = t7;
        $[45] = t8;
        $[46] = t9;
    } else {
        t9 = $[46];
    }
    return t9;
}
_s(GridView, "3mCyOzToNDGQS5WURauMitIAGSw=");
_c = GridView;
function _GridViewSharesFlatMap(share) {
    return share.tags;
}
var _c;
__turbopack_context__.k.register(_c, "GridView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/share/components/create-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$logo$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/components/logo-upload-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CreateDialog(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(76);
    if ($[0] !== "5d78500d5478c242aee468f0da8036f8390edc6def0196aaf6d04be050b3ac4f") {
        for(let $i = 0; $i < 76; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5d78500d5478c242aee468f0da8036f8390edc6def0196aaf6d04be050b3ac4f";
    }
    const { share, onClose, onSave } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            name: "",
            logo: "",
            url: "",
            description: "",
            tags: [],
            stars: 3
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [showLogoDialog, setShowLogoDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tagsInput, setTagsInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t2;
    let t3;
    if ($[2] !== share) {
        t2 = ({
            "CreateDialog[useEffect()]": ()=>{
                if (share) {
                    setFormData(share);
                    setTagsInput(share.tags.join(", "));
                } else {
                    setFormData({
                        name: "",
                        logo: "",
                        url: "",
                        description: "",
                        tags: [],
                        stars: 3
                    });
                    setTagsInput("");
                }
            }
        })["CreateDialog[useEffect()]"];
        t3 = [
            share
        ];
        $[2] = share;
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[5] !== formData) {
        t4 = ({
            "CreateDialog[handleLogoSubmit]": (logo)=>{
                const logoUrl = logo.type === "url" ? logo.url : logo.previewUrl;
                setFormData({
                    ...formData,
                    logo: logoUrl
                });
            }
        })["CreateDialog[handleLogoSubmit]"];
        $[5] = formData;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const handleLogoSubmit = t4;
    let t5;
    if ($[7] !== formData) {
        t5 = ({
            "CreateDialog[handleTagsChange]": (value)=>{
                setTagsInput(value);
                const tags = value.split(",").map(_CreateDialogHandleTagsChangeAnonymous).filter(_CreateDialogHandleTagsChangeAnonymous2);
                setFormData({
                    ...formData,
                    tags
                });
            }
        })["CreateDialog[handleTagsChange]"];
        $[7] = formData;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const handleTagsChange = t5;
    let t6;
    if ($[9] !== formData || $[10] !== onClose || $[11] !== onSave || $[12] !== share) {
        t6 = ({
            "CreateDialog[handleSubmit]": ()=>{
                if (!formData.name.trim() || !formData.logo.trim() || !formData.url.trim() || !formData.description.trim()) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u586B\u5199\u6240\u6709\u5FC5\u586B\u9879");
                    return;
                }
                if (formData.tags.length === 0) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u6807\u7B7E");
                    return;
                }
                onSave(formData);
                onClose();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(share ? "\u66F4\u65B0\u6210\u529F" : "\u6DFB\u52A0\u6210\u529F");
            }
        })["CreateDialog[handleSubmit]"];
        $[9] = formData;
        $[10] = onClose;
        $[11] = onSave;
        $[12] = share;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    const handleSubmit = t6;
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "CreateDialog[<div>.onClick]": ()=>setShowLogoDialog(true)
        })["CreateDialog[<div>.onClick]"];
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== formData.logo || $[16] !== formData.name) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative cursor-pointer",
            onClick: t7,
            children: formData.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: formData.logo,
                        alt: formData.name,
                        className: "h-16 w-16 rounded-xl object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/create-dialog.tsx",
                        lineNumber: 147,
                        columnNumber: 89
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-white",
                            children: "更换"
                        }, void 0, false, {
                            fileName: "[project]/src/app/share/components/create-dialog.tsx",
                            lineNumber: 147,
                            columnNumber: 345
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/share/components/create-dialog.tsx",
                        lineNumber: 147,
                        columnNumber: 182
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-16 w-16 items-center justify-center rounded-xl bg-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    className: "h-6 w-6 text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/share/components/create-dialog.tsx",
                    lineNumber: 147,
                    columnNumber: 486
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/share/components/create-dialog.tsx",
                lineNumber: 147,
                columnNumber: 403
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 147,
            columnNumber: 10
        }, this);
        $[15] = formData.logo;
        $[16] = formData.name;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== formData) {
        t9 = ({
            "CreateDialog[<input>.onChange]": (e)=>setFormData({
                    ...formData,
                    name: e.target.value
                })
        })["CreateDialog[<input>.onChange]"];
        $[18] = formData;
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] !== formData.name || $[21] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: formData.name,
            onChange: t9,
            placeholder: "\u8D44\u6E90\u540D\u79F0",
            className: "w-full text-lg font-bold focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[20] = formData.name;
        $[21] = t9;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    let t11;
    if ($[23] !== formData) {
        t11 = ({
            "CreateDialog[<input>.onChange]": (e_0)=>setFormData({
                    ...formData,
                    url: e_0.target.value
                })
        })["CreateDialog[<input>.onChange]"];
        $[23] = formData;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    let t12;
    if ($[25] !== formData.url || $[26] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "url",
            value: formData.url,
            onChange: t11,
            placeholder: "https://example.com",
            className: "text-secondary mt-1 w-full truncate text-xs focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[25] = formData.url;
        $[26] = t11;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== t10 || $[29] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t12;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== t13 || $[32] !== t8) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center gap-4",
            children: [
                t8,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[31] = t13;
        $[32] = t8;
        $[33] = t14;
    } else {
        t14 = $[33];
    }
    let t15;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = [
            1,
            2,
            3,
            4,
            5
        ];
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    let t16;
    if ($[35] !== formData) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0.5",
            children: t15.map({
                "CreateDialog[(anonymous)()]": (index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: {
                            "CreateDialog[(anonymous)() > <div>.onClick]": ()=>setFormData({
                                    ...formData,
                                    stars: index
                                })
                        }["CreateDialog[(anonymous)() > <div>.onClick]"],
                        className: "cursor-pointer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            className: index <= formData.stars ? "fill-yellow-400" : "fill-gray-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            }, void 0, false, {
                                fileName: "[project]/src/app/share/components/create-dialog.tsx",
                                lineNumber: 231,
                                columnNumber: 208
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/share/components/create-dialog.tsx",
                            lineNumber: 231,
                            columnNumber: 86
                        }, this)
                    }, index, false, {
                        fileName: "[project]/src/app/share/components/create-dialog.tsx",
                        lineNumber: 226,
                        columnNumber: 49
                    }, this)
            }["CreateDialog[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 225,
            columnNumber: 11
        }, this);
        $[35] = formData;
        $[36] = t16;
    } else {
        t16 = $[36];
    }
    let t17;
    if ($[37] !== handleTagsChange) {
        t17 = ({
            "CreateDialog[<input>.onChange]": (e_1)=>handleTagsChange(e_1.target.value)
        })["CreateDialog[<input>.onChange]"];
        $[37] = handleTagsChange;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== t17 || $[40] !== tagsInput) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: tagsInput,
            onChange: t17,
            placeholder: "\u6807\u7B7E\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF08\u5982\uFF1A\u56FE\u7247, \u5DE5\u5177\uFF09",
            className: "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[39] = t17;
        $[40] = tagsInput;
        $[41] = t18;
    } else {
        t18 = $[41];
    }
    let t19;
    if ($[42] !== formData.tags) {
        t19 = formData.tags.map(_CreateDialogFormDataTagsMap);
        $[42] = formData.tags;
        $[43] = t19;
    } else {
        t19 = $[43];
    }
    let t20;
    if ($[44] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 flex flex-wrap gap-1.5",
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[44] = t19;
        $[45] = t20;
    } else {
        t20 = $[45];
    }
    let t21;
    if ($[46] !== t18 || $[47] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3",
            children: [
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[46] = t18;
        $[47] = t20;
        $[48] = t21;
    } else {
        t21 = $[48];
    }
    let t22;
    if ($[49] !== formData) {
        t22 = ({
            "CreateDialog[<textarea>.onChange]": (e_2)=>setFormData({
                    ...formData,
                    description: e_2.target.value
                })
        })["CreateDialog[<textarea>.onChange]"];
        $[49] = formData;
        $[50] = t22;
    } else {
        t22 = $[50];
    }
    let t23;
    if ($[51] !== formData.description || $[52] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            value: formData.description,
            onChange: t22,
            placeholder: "\u8D44\u6E90\u4ECB\u7ECD...",
            className: "mt-3 w-full resize-none text-sm leading-relaxed focus:outline-none",
            rows: 4
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[51] = formData.description;
        $[52] = t22;
        $[53] = t23;
    } else {
        t23 = $[53];
    }
    let t24;
    if ($[54] !== t14 || $[55] !== t16 || $[56] !== t21 || $[57] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t14,
                t16,
                t21,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 306,
            columnNumber: 11
        }, this);
        $[54] = t14;
        $[55] = t16;
        $[56] = t21;
        $[57] = t23;
        $[58] = t24;
    } else {
        t24 = $[58];
    }
    let t25;
    if ($[59] !== onClose) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50",
            children: "取消"
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 317,
            columnNumber: 11
        }, this);
        $[59] = onClose;
        $[60] = t25;
    } else {
        t25 = $[60];
    }
    const t26 = share ? "\u4FDD\u5B58" : "\u6DFB\u52A0";
    let t27;
    if ($[61] !== handleSubmit || $[62] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleSubmit,
            className: "brand-btn flex-1 justify-center px-4",
            children: t26
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[61] = handleSubmit;
        $[62] = t26;
        $[63] = t27;
    } else {
        t27 = $[63];
    }
    let t28;
    if ($[64] !== t25 || $[65] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex gap-3",
            children: [
                t25,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 335,
            columnNumber: 11
        }, this);
        $[64] = t25;
        $[65] = t27;
        $[66] = t28;
    } else {
        t28 = $[66];
    }
    let t29;
    if ($[67] !== formData.logo || $[68] !== handleLogoSubmit || $[69] !== showLogoDialog) {
        t29 = showLogoDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$logo$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            currentLogo: formData.logo,
            onClose: {
                "CreateDialog[<LogoUploadDialog>.onClose]": ()=>setShowLogoDialog(false)
            }["CreateDialog[<LogoUploadDialog>.onClose]"],
            onSubmit: handleLogoSubmit
        }, void 0, false, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 344,
            columnNumber: 29
        }, this);
        $[67] = formData.logo;
        $[68] = handleLogoSubmit;
        $[69] = showLogoDialog;
        $[70] = t29;
    } else {
        t29 = $[70];
    }
    let t30;
    if ($[71] !== onClose || $[72] !== t24 || $[73] !== t28 || $[74] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogModal"], {
            open: true,
            onClose: onClose,
            className: "card max-h-[90vh] w-sm overflow-y-auto",
            children: [
                t24,
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/share/components/create-dialog.tsx",
            lineNumber: 356,
            columnNumber: 11
        }, this);
        $[71] = onClose;
        $[72] = t24;
        $[73] = t28;
        $[74] = t29;
        $[75] = t30;
    } else {
        t30 = $[75];
    }
    return t30;
}
_s(CreateDialog, "dfRFdH5ayQGSkSytAbK5b64FGMI=");
_c = CreateDialog;
function _CreateDialogFormDataTagsMap(tag) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs text-gray-600",
        children: tag
    }, tag, false, {
        fileName: "[project]/src/app/share/components/create-dialog.tsx",
        lineNumber: 368,
        columnNumber: 10
    }, this);
}
function _CreateDialogHandleTagsChangeAnonymous2(t_0) {
    return t_0;
}
function _CreateDialogHandleTagsChangeAnonymous(t) {
    return t.trim();
}
var _c;
__turbopack_context__.k.register(_c, "CreateDialog");
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
"[project]/src/app/share/services/push-shares.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushShares",
    ()=>pushShares
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
async function pushShares(params) {
    const { shares, logoItems } = params;
    // 获取认证 token（自动从全局认证状态获取）
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新分享列表`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    const uploadedHashes = new Set();
    let updatedShares = [
        ...shares
    ];
    // Process logo uploads
    if (logoItems && logoItems.size > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在上传图标...');
        for (const [url, logoItem] of logoItems.entries()){
            if (logoItem.type === 'file') {
                const hash = logoItem.hash || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFileSHA256"])(logoItem.file);
                const ext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFileExt"])(logoItem.file.name);
                const filename = `${hash}${ext}`;
                const publicPath = `/images/share/${filename}`;
                if (!uploadedHashes.has(hash)) {
                    const path = `public/images/share/${filename}`;
                    const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(logoItem.file);
                    const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: blobData.sha
                    });
                    uploadedHashes.add(hash);
                }
                // Update share logo URL
                updatedShares = updatedShares.map((s)=>s.url === url ? {
                        ...s,
                        logo: publicPath
                    } : s);
            }
        }
    }
    // Create blob for shares list.json
    const sharesJson = JSON.stringify(updatedShares, null, '\t');
    const sharesBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(sharesJson), 'base64');
    treeItems.push({
        path: 'src/app/share/list.json',
        mode: '100644',
        type: 'blob',
        sha: sharesBlob.sha
    });
    // Create tree
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    // Create commit
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    // Update branch reference
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('发布成功！');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/share/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"name":"iLoveIMG","url":"https://www.iloveimg.com/zh-cn","logo":"/images/share/7e91e93e3cdd586b.svg","description":"免费图片处理网站，我经常用来压缩图片，压缩效果会比 Tinypng 更好。链式处理功能非常好用。","tags":["图片"],"stars":4},{"name":"TinyPNG","url":"https://tinypng.com/","logo":"https://tinypng.com/static/images/george-anim/large_george_x2.webp","description":"国际上比较出名的压缩图片工具，过去的书本中知晓的这个网站，但是有图片大小限制，也有数量限制。挺好的压缩图片替代品。","tags":["图片"],"stars":3},{"name":"removebg","url":"https://www.remove.bg/zh","logo":"/images/share/859bfb2ef1c6a503.svg","description":"AI 抠图工具，特点是界面简洁，效果比 windows 自带的去除背景会更好一些，缺点是有免费有导出大小限制","tags":["图片","AI"],"stars":3},{"name":"Neumorphism","url":"https://neumorphism.io/","logo":"https://neumorphism.io/apple-touch-icon.png","description":"Neumorphism 是一种极具鲜明特色的设计风格，总能给新人一种惊叹感。但是应用并不广泛，实际开发也会有很多不好的点。更多是做一个留念。","tags":["CSS","Github"],"stars":2},{"name":"Nucleo","url":"https://nucleoapp.com/app/?library=core","logo":"/images/share/7e720f35557fa9de.svg","description":"图标库，网站整体很干净。独特的是，它有一类像素风格的图标，很有意思。它的 icon 也很多，还有 grass 风格的。","tags":["Icons"],"stars":3},{"name":"Loadership","url":"https://www.loadership.com/","logo":"https://www.loadership.com/loadership_logo_round.svg","description":"13种 Loader 样式，在线调整使用。在 AI 时代可能意义小很多了。","tags":["CSS","Github"],"stars":3},{"name":"CSS Buttons","url":"https://cssbuttons.io/","logo":"/images/share/2b8118a3645967ee.svg","description":"有不少按钮样式。跟 Neumorphism 有一些关系。","tags":["CSS"],"stars":2},{"name":"Uiverse","url":"https://uiverse.io/","logo":"/images/share/5e7b29cb1a84be80.png","description":"不可错过的参考库，有很多交互效果，包括热门的 Button、Loader 设计，内容丰富，还在不断更新。","tags":["CSS"],"stars":4},{"name":"Magic UI","url":"https://magicui.design/","logo":"https://magicui.design/favicon.ico","description":"shadcn/ui 伴生库，有很多实用设计。取用也很方便，可以自己复制独立的代码。","tags":["组件","Github"],"stars":4},{"name":"Ai lman","url":"https://aliimam.in/docs/backgrounds/shader-rgb","logo":"https://aliimam.in/_next/image?url=%2Fai-logo-black.png&w=128&q=75","description":"类 Magic UI，但是感觉差点意思。可作为看完 Magic 意犹未尽时闲看。","tags":["组件"],"stars":3},{"name":"Awwwards","url":"https://www.awwwards.com/","logo":"/images/avatar.png","description":"网站评选网站，你总能从这里发现惊艳的网站","tags":["网站集"],"stars":3},{"name":"CSS Design Awards","url":"https://www.cssdesignawards.com/","logo":"/images/share/aaae2bf4f74c8eb1.svg","description":"网站评选网站，跟 Awwwards 类似，可以看到每期的优秀网站。观感上会好些。","tags":["网站集"],"stars":3},{"name":"404s.design","logo":"/images/share/5c9a8b7deb717c5f.svg","url":"https://www.404s.design/","description":"收集 404 设计的网站，无聊的时候可以看下。","tags":["网站集"],"stars":3},{"name":"Igloo Inc.","logo":"https://www.igloo.inc/assets/favicon32-af94112f.png","url":"https://www.igloo.inc/","description":"abeto 作品，非常酷炫","tags":["3D"],"stars":4},{"name":"abeto 官网","logo":"https://abeto.co/assets/favicon32-11fb90a3.png","url":"https://abeto.co/","description":"无限绽开的花，飘荡的树叶，复古风格化","tags":["3D"],"stars":4},{"name":"Messenger","logo":"https://messenger.abeto.co/assets/favicon32-BC0QIL61.png","url":"https://messenger.abeto.co/","description":"abeto 作品，卡通送信员在地球小镇上奔跑，联机在线，可换装","tags":["3D"],"stars":4},{"name":"Summer Afternoon","logo":"https://summer-afternoon.vlucendo.com/assets/favicon32-e817b074.png","url":"https://summer-afternoon.vlucendo.com/","description":"夏日午后，小男孩在乡村公路上上游玩","tags":["3D"],"stars":4},{"name":"The Monolith Project","logo":"https://themonolithproject.net/assets/images-next/nose_logo.webp","url":"https://themonolithproject.net/","description":"奇幻宇宙的动画演绎，像看电影一样。“跨越多星之际，一座沉默的巨石碑悄然苏醒。“巨石碑计划”：每一次触碰，皆可重写现实。”","tags":["3D"],"stars":5},{"name":"Making Software","logo":"https://www.makingsoftware.com/favicon.ico","url":"https://www.makingsoftware.com/","description":"面向软件设计和开发人员的参考手册。样式很棒的学习网站。","tags":["学习"],"stars":4},{"name":"Ease 函数参考","logo":"https://easings.net/96.8aa68ac4.png","url":"https://easings.net/","description":"当你在调整动画节奏时，这个 ease 表能帮助直观感受 ease 表现出的效果","tags":["Github"],"stars":3},{"name":"Isocons","logo":"/images/share/97859f1c57799dd2.png","url":"https://www.isocons.app/","description":"3D icons 网站，酷酷的，免费。","tags":["Icons"],"stars":3},{"name":"Webp 转换压缩","logo":"/images/avatar.png","url":"https://eagle-a.github.io/image-toolbox","description":"无限压缩，快且方便，可以直接对比效果","tags":["图片"],"stars":3},{"name":"WoraWork","logo":"/images/avatar.png","url":"https://worawork.vercel.app/","description":"方格世界的 Web3D，场景渲染非常棒，非常值得体验","tags":["3D"],"stars":3}]);}),
"[project]/src/app/share/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/grid-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/components/create-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$services$2f$push$2d$shares$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/share/services/push-shares.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/share/list.json (json)");
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
;
function Page() {
    _s();
    const [shares, setShares] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__["default"]);
    const [originalShares, setOriginalShares] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__["default"]);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingShare, setEditingShare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoItems, setLogoItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const hideEditButton = siteContent.hideEditButton ?? false;
    const handleUpdate = (updatedShare, oldShare, logoItem)=>{
        setShares((prev)=>prev.map((s)=>s.url === oldShare.url ? updatedShare : s));
        if (logoItem) {
            setLogoItems((prev_0)=>{
                const newMap = new Map(prev_0);
                newMap.set(updatedShare.url, logoItem);
                return newMap;
            });
        }
    };
    const handleAdd = ()=>{
        setEditingShare(null);
        setIsCreateDialogOpen(true);
    };
    const handleSaveShare = (updatedShare_0)=>{
        if (editingShare) {
            const updated = shares.map((s_0)=>s_0.url === editingShare.url ? updatedShare_0 : s_0);
            setShares(updated);
        } else {
            setShares([
                ...shares,
                updatedShare_0
            ]);
        }
    };
    const handleDelete = (share)=>{
        if (confirm(`确定要删除 ${share.name} 吗？`)) {
            setShares(shares.filter((s_1)=>s_1.url !== share.url));
        }
    };
    const handleChoosePrivateKey = async (file)=>{
        try {
            const text = await file.text();
            setPrivateKey(text);
            // 选择文件后自动保存
            await handleSave();
        } catch (error) {
            console.error('Failed to read private key:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('读取密钥文件失败');
        }
    };
    const handleSaveClick = ()=>{
        if (!isAuth) {
            keyInputRef.current?.click();
        } else {
            handleSave();
        }
    };
    const handleSave = async ()=>{
        setIsSaving(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$services$2f$push$2d$shares$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushShares"])({
                shares,
                logoItems
            });
            setOriginalShares(shares);
            setLogoItems(new Map());
            setIsEditMode(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('保存成功！');
        } catch (error_0) {
            console.error('Failed to save:', error_0);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`保存失败: ${error_0?.message || '未知错误'}`);
        } finally{
            setIsSaving(false);
        }
    };
    const handleCancel = ()=>{
        setShares(originalShares);
        setLogoItems(new Map());
        setIsEditMode(false);
    };
    const buttonText = isAuth ? '保存' : '导入密钥';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const handleKeyDown = {
                "Page.useEffect.handleKeyDown": (e)=>{
                    if (!isEditMode && (e.ctrlKey || e.metaKey) && e.key === ',') {
                        e.preventDefault();
                        setIsEditMode(true);
                    }
                }
            }["Page.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "Page.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                }
            })["Page.useEffect"];
        }
    }["Page.useEffect"], [
        isEditMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: keyInputRef,
                type: "file",
                accept: ".pem",
                className: "hidden",
                onChange: async (e_0)=>{
                    const f = e_0.target.files?.[0];
                    if (f) await handleChoosePrivateKey(f);
                    if (e_0.currentTarget) e_0.currentTarget.value = '';
                }
            }, void 0, false, {
                fileName: "[project]/src/app/share/page.tsx",
                lineNumber: 113,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                shares: shares,
                isEditMode: isEditMode,
                onUpdate: handleUpdate,
                onDelete: handleDelete
            }, void 0, false, {
                fileName: "[project]/src/app/share/page.tsx",
                lineNumber: 119,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.6
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "absolute top-4 right-6 flex gap-3 max-sm:hidden",
                children: isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                            fileName: "[project]/src/app/share/page.tsx",
                            lineNumber: 129,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleAdd,
                            className: "rounded-xl border bg-white/60 px-6 py-2 text-sm",
                            children: "添加"
                        }, void 0, false, {
                            fileName: "[project]/src/app/share/page.tsx",
                            lineNumber: 136,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                            fileName: "[project]/src/app/share/page.tsx",
                            lineNumber: 143,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true) : !hideEditButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                    whileHover: {
                        scale: 1.05
                    },
                    whileTap: {
                        scale: 0.95
                    },
                    onClick: ()=>setIsEditMode(true),
                    className: "bg-card rounded-xl border px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80",
                    children: "编辑"
                }, void 0, false, {
                    fileName: "[project]/src/app/share/page.tsx",
                    lineNumber: 150,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/share/page.tsx",
                lineNumber: 121,
                columnNumber: 4
            }, this),
            isCreateDialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                share: editingShare,
                onClose: ()=>setIsCreateDialogOpen(false),
                onSave: handleSaveShare
            }, void 0, false, {
                fileName: "[project]/src/app/share/page.tsx",
                lineNumber: 159,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true);
}
_s(Page, "eQdZ+IQCebbIKAJyOUgkg/uGMr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_add3587b._.js.map