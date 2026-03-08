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
"[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AvatarUploadDialog
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
function AvatarUploadDialog(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "1aff4861eb95385ec2ebd81f70dd76b6283c9cb57a8a7f8b63257229b371da41") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1aff4861eb95385ec2ebd81f70dd76b6283c9cb57a8a7f8b63257229b371da41";
    }
    const { currentAvatar, onClose, onSubmit } = t0;
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentAvatar || "");
    const [previewFile, setPreviewFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "AvatarUploadDialog[handleFileSelect]": (e)=>{
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
        })["AvatarUploadDialog[handleFileSelect]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const handleFileSelect = t1;
    let t2;
    if ($[2] !== currentAvatar || $[3] !== onClose || $[4] !== onSubmit || $[5] !== previewFile || $[6] !== urlInput) {
        t2 = ({
            "AvatarUploadDialog[handleSubmit]": (e_0)=>{
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
                setUrlInput(currentAvatar || "");
                onClose();
            }
        })["AvatarUploadDialog[handleSubmit]"];
        $[2] = currentAvatar;
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
    if ($[8] !== currentAvatar || $[9] !== onClose || $[10] !== previewFile) {
        t3 = ({
            "AvatarUploadDialog[handleClose]": ()=>{
                if (previewFile) {
                    URL.revokeObjectURL(previewFile.previewUrl);
                }
                setPreviewFile(null);
                setUrlInput(currentAvatar || "");
                onClose();
            }
        })["AvatarUploadDialog[handleClose]"];
        $[8] = currentAvatar;
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
            children: "选择头像"
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        t7 = ({
            "AvatarUploadDialog[<div>.onClick]": ()=>fileInputRef.current?.click()
        })["AvatarUploadDialog[<div>.onClick]"];
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
                    className: "mx-auto flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-secondary/10 transition-colors hover:bg-gray-200",
                    children: previewFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: previewFile.previewUrl,
                        alt: "preview",
                        className: "h-full w-full rounded-lg object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 146,
                        columnNumber: 222
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "text-secondary mx-auto mb-1 h-8 w-8"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 354
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-secondary text-xs",
                                children: "点击上传图片"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 410
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 146,
                        columnNumber: 325
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                    lineNumber: 146,
                    columnNumber: 23
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                lineNumber: 154,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 162,
                        columnNumber: 95
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                    lineNumber: 162,
                    columnNumber: 41
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-secondary mb-2 block text-sm font-medium",
            children: "图片 URL"
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            "AvatarUploadDialog[<input>.onChange]": (e_1)=>{
                setUrlInput(e_1.target.value);
                if (previewFile) {
                    URL.revokeObjectURL(previewFile.previewUrl);
                    setPreviewFile(null);
                }
            }
        })["AvatarUploadDialog[<input>.onChange]"];
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
                    placeholder: "https://example.com/avatar.png",
                    className: "focus:ring-brand w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 focus:ring-2 focus:outline-none"
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                    lineNumber: 188,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                    lineNumber: 204,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
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
_s(AvatarUploadDialog, "fQaTwPaTLg0uDxucmUgGoRMhVQk=");
_c = AvatarUploadDialog;
var _c;
__turbopack_context__.k.register(_c, "AvatarUploadDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/bloggers/components/blogger-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BloggerCard",
    ()=>BloggerCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/star-rating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editable-star-rating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-client] (ecmascript)");
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
const FALLBACK_AVATAR = '/images/avatar.png';
function BloggerCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(91);
    if ($[0] !== "f3fedd29653897dbea2574365d61988f0705d614909236c57513e62d266fe199") {
        for(let $i = 0; $i < 91; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3fedd29653897dbea2574365d61988f0705d614909236c57513e62d266fe199";
    }
    const { blogger, isEditMode: t1, onUpdate, onDelete } = t0;
    const isEditMode = t1 === undefined ? false : t1;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    const [localBlogger, setLocalBlogger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(blogger);
    const [showAvatarDialog, setShowAvatarDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarItem, setAvatarItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatarError, setAvatarError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    if ($[1] !== avatarItem || $[2] !== blogger || $[3] !== localBlogger || $[4] !== onUpdate) {
        t2 = ({
            "BloggerCard[handleFieldChange]": (field, value)=>{
                const updated = {
                    ...localBlogger,
                    [field]: value
                };
                setLocalBlogger(updated);
                onUpdate?.(updated, blogger, avatarItem || undefined);
            }
        })["BloggerCard[handleFieldChange]"];
        $[1] = avatarItem;
        $[2] = blogger;
        $[3] = localBlogger;
        $[4] = onUpdate;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const handleFieldChange = t2;
    let t3;
    if ($[6] !== blogger || $[7] !== localBlogger || $[8] !== onUpdate) {
        t3 = ({
            "BloggerCard[handleAvatarSubmit]": (avatar)=>{
                setAvatarItem(avatar);
                const avatarUrl = avatar.type === "url" ? avatar.url : avatar.previewUrl;
                const updated_0 = {
                    ...localBlogger,
                    avatar: avatarUrl
                };
                setLocalBlogger(updated_0);
                onUpdate?.(updated_0, blogger, avatar);
                setAvatarError(false);
            }
        })["BloggerCard[handleAvatarSubmit]"];
        $[6] = blogger;
        $[7] = localBlogger;
        $[8] = onUpdate;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    const handleAvatarSubmit = t3;
    let t4;
    if ($[10] !== blogger) {
        t4 = ({
            "BloggerCard[handleCancel]": ()=>{
                setLocalBlogger(blogger);
                setIsEditing(false);
                setAvatarItem(null);
            }
        })["BloggerCard[handleCancel]"];
        $[10] = blogger;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    const handleCancel = t4;
    const canEdit = isEditMode && isEditing;
    let t5;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            opacity: 0,
            scale: 0.6
        };
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== maxSM) {
        t6 = maxSM ? {
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
        $[13] = maxSM;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== handleCancel || $[16] !== isEditMode || $[17] !== isEditing || $[18] !== onDelete) {
        t7 = isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-3 right-3 z-10 flex gap-2",
            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCancel,
                        className: "rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600",
                        children: "取消"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 135,
                        columnNumber: 95
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "BloggerCard[<button>.onClick]": ()=>setIsEditing(false)
                        }["BloggerCard[<button>.onClick]"],
                        className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                        children: "完成"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 135,
                        columnNumber: 232
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "BloggerCard[<button>.onClick]": ()=>setIsEditing(true)
                        }["BloggerCard[<button>.onClick]"],
                        className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                        children: "编辑"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 137,
                        columnNumber: 159
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onDelete,
                        className: "rounded-lg px-2 py-1.5 text-xs text-red-400 transition-colors hover:text-red-600",
                        children: "删除"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 139,
                        columnNumber: 151
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 135,
            columnNumber: 24
        }, this);
        $[15] = handleCancel;
        $[16] = isEditMode;
        $[17] = isEditing;
        $[18] = onDelete;
        $[19] = t7;
    } else {
        t7 = $[19];
    }
    const t8 = avatarError ? FALLBACK_AVATAR : localBlogger.avatar;
    const t9 = localBlogger.name;
    const t10 = canEdit && "cursor-pointer";
    let t11;
    if ($[20] !== t10) {
        t11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-16 w-16 rounded-full object-cover", t10);
        $[20] = t10;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    let t12;
    if ($[22] !== canEdit) {
        t12 = ({
            "BloggerCard[<img>.onClick]": ()=>canEdit && setShowAvatarDialog(true)
        })["BloggerCard[<img>.onClick]"];
        $[22] = canEdit;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = ({
            "BloggerCard[<img>.onError]": ()=>setAvatarError(true)
        })["BloggerCard[<img>.onError]"];
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== localBlogger.name || $[26] !== t11 || $[27] !== t12 || $[28] !== t8) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: t8,
            alt: t9,
            className: t11,
            onClick: t12,
            onError: t13
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[25] = localBlogger.name;
        $[26] = t11;
        $[27] = t12;
        $[28] = t8;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== canEdit) {
        t15 = canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ev pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-white",
                children: "更换"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                lineNumber: 191,
                columnNumber: 190
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 191,
            columnNumber: 22
        }, this);
        $[30] = canEdit;
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] !== t14 || $[33] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[32] = t14;
        $[33] = t15;
        $[34] = t16;
    } else {
        t16 = $[34];
    }
    let t17;
    if ($[35] !== handleFieldChange) {
        t17 = ({
            "BloggerCard[<h3>.onBlur]": (e)=>handleFieldChange("name", e.currentTarget.textContent || "")
        })["BloggerCard[<h3>.onBlur]"];
        $[35] = handleFieldChange;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    const t18 = canEdit && "cursor-text";
    let t19;
    if ($[37] !== t18) {
        t19 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group-hover:text-brand text-lg font-bold transition-colors focus:outline-none", t18);
        $[37] = t18;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    let t20;
    if ($[39] !== canEdit || $[40] !== localBlogger.name || $[41] !== t17 || $[42] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            contentEditable: canEdit,
            suppressContentEditableWarning: true,
            onBlur: t17,
            className: t19,
            children: localBlogger.name
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[39] = canEdit;
        $[40] = localBlogger.name;
        $[41] = t17;
        $[42] = t19;
        $[43] = t20;
    } else {
        t20 = $[43];
    }
    let t21;
    if ($[44] !== canEdit || $[45] !== handleFieldChange || $[46] !== localBlogger.url) {
        t21 = canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: {
                "BloggerCard[<div>.onBlur]": (e_0)=>handleFieldChange("url", e_0.currentTarget.textContent || "")
            }["BloggerCard[<div>.onBlur]"],
            className: "text-secondary mt-1 block max-w-[200px] cursor-text truncate text-xs focus:outline-none",
            children: localBlogger.url
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 238,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: localBlogger.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-secondary hover:text-brand mt-1 block max-w-[200px] truncate text-xs hover:underline",
            children: localBlogger.url
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 240,
            columnNumber: 164
        }, this);
        $[44] = canEdit;
        $[45] = handleFieldChange;
        $[46] = localBlogger.url;
        $[47] = t21;
    } else {
        t21 = $[47];
    }
    let t22;
    if ($[48] !== t20 || $[49] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[48] = t20;
        $[49] = t21;
        $[50] = t22;
    } else {
        t22 = $[50];
    }
    let t23;
    if ($[51] !== t16 || $[52] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center gap-4",
            children: [
                t16,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[51] = t16;
        $[52] = t22;
        $[53] = t23;
    } else {
        t23 = $[53];
    }
    let t24;
    if ($[54] !== canEdit || $[55] !== handleFieldChange || $[56] !== localBlogger.stars) {
        t24 = canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            stars: localBlogger.stars,
            editable: true,
            onChange: {
                "BloggerCard[<EditableStarRating>.onChange]": (stars)=>handleFieldChange("stars", stars)
            }["BloggerCard[<EditableStarRating>.onChange]"]
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 268,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            stars: localBlogger.stars
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 270,
            columnNumber: 59
        }, this);
        $[54] = canEdit;
        $[55] = handleFieldChange;
        $[56] = localBlogger.stars;
        $[57] = t24;
    } else {
        t24 = $[57];
    }
    let t25;
    if ($[58] !== canEdit || $[59] !== handleFieldChange || $[60] !== localBlogger.status) {
        t25 = canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 flex gap-2",
            children: [
                "recent",
                "disconnected"
            ].map({
                "BloggerCard[(anonymous)()]": (status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "BloggerCard[(anonymous)() > <button>.onClick]": ()=>handleFieldChange("status", status)
                        }["BloggerCard[(anonymous)() > <button>.onClick]"],
                        className: `rounded-full px-3 py-1 text-xs transition-colors ${(localBlogger.status ?? "recent") === status ? "bg-brand text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`,
                        children: status === "recent" ? "\u8FD1\u671F\u66F4\u65B0" : "\u957F\u671F\u5931\u8054"
                    }, status, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 281,
                        columnNumber: 49
                    }, this)
            }["BloggerCard[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 280,
            columnNumber: 22
        }, this);
        $[58] = canEdit;
        $[59] = handleFieldChange;
        $[60] = localBlogger.status;
        $[61] = t25;
    } else {
        t25 = $[61];
    }
    let t26;
    if ($[62] !== handleFieldChange) {
        t26 = ({
            "BloggerCard[<p>.onBlur]": (e_1)=>handleFieldChange("description", e_1.currentTarget.textContent || "")
        })["BloggerCard[<p>.onBlur]"];
        $[62] = handleFieldChange;
        $[63] = t26;
    } else {
        t26 = $[63];
    }
    let t27;
    if ($[64] !== canEdit || $[65] !== expanded) {
        t27 = ({
            "BloggerCard[<p>.onClick]": (e_2)=>{
                if (!canEdit) {
                    e_2.preventDefault();
                    setExpanded(!expanded);
                }
            }
        })["BloggerCard[<p>.onClick]"];
        $[64] = canEdit;
        $[65] = expanded;
        $[66] = t27;
    } else {
        t27 = $[66];
    }
    const t28 = canEdit ? "cursor-text" : "cursor-pointer";
    const t29 = !canEdit && (expanded ? "line-clamp-none" : "line-clamp-3");
    let t30;
    if ($[67] !== t28 || $[68] !== t29) {
        t30 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-3 text-sm leading-relaxed text-gray-600 transition-all duration-300 focus:outline-none", t28, t29);
        $[67] = t28;
        $[68] = t29;
        $[69] = t30;
    } else {
        t30 = $[69];
    }
    let t31;
    if ($[70] !== canEdit || $[71] !== localBlogger.description || $[72] !== t26 || $[73] !== t27 || $[74] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            contentEditable: canEdit,
            suppressContentEditableWarning: true,
            onBlur: t26,
            onClick: t27,
            className: t30,
            children: localBlogger.description
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[70] = canEdit;
        $[71] = localBlogger.description;
        $[72] = t26;
        $[73] = t27;
        $[74] = t30;
        $[75] = t31;
    } else {
        t31 = $[75];
    }
    let t32;
    if ($[76] !== t23 || $[77] !== t24 || $[78] !== t25 || $[79] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t23,
                t24,
                t25,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 343,
            columnNumber: 11
        }, this);
        $[76] = t23;
        $[77] = t24;
        $[78] = t25;
        $[79] = t31;
        $[80] = t32;
    } else {
        t32 = $[80];
    }
    let t33;
    if ($[81] !== canEdit || $[82] !== handleAvatarSubmit || $[83] !== localBlogger.avatar || $[84] !== showAvatarDialog) {
        t33 = canEdit && showAvatarDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            currentAvatar: localBlogger.avatar,
            onClose: {
                "BloggerCard[<AvatarUploadDialog>.onClose]": ()=>setShowAvatarDialog(false)
            }["BloggerCard[<AvatarUploadDialog>.onClose]"],
            onSubmit: handleAvatarSubmit
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 354,
            columnNumber: 42
        }, this);
        $[81] = canEdit;
        $[82] = handleAvatarSubmit;
        $[83] = localBlogger.avatar;
        $[84] = showAvatarDialog;
        $[85] = t33;
    } else {
        t33 = $[85];
    }
    let t34;
    if ($[86] !== t32 || $[87] !== t33 || $[88] !== t6 || $[89] !== t7) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t5,
            ...t6,
            className: "card relative block overflow-hidden",
            children: [
                t7,
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[86] = t32;
        $[87] = t33;
        $[88] = t6;
        $[89] = t7;
        $[90] = t34;
    } else {
        t34 = $[90];
    }
    return t34;
}
_s(BloggerCard, "J6dobAdnqRL3B3EhsjdHrsYc3l8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"]
    ];
});
_c = BloggerCard;
var _c;
__turbopack_context__.k.register(_c, "BloggerCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/bloggers/grid-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GridView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$blogger$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/blogger-card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function GridView(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(44);
    if ($[0] !== "940b6ec3deaf3ebaa66722f6a7056de5cc278aa16c26fe34caadb5b007798b77") {
        for(let $i = 0; $i < 44; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "940b6ec3deaf3ebaa66722f6a7056de5cc278aa16c26fe34caadb5b007798b77";
    }
    const { bloggers, isEditMode: t1, onUpdate, onDelete } = t0;
    const isEditMode = t1 === undefined ? false : t1;
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("recent");
    let filteredBloggers;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[1] !== bloggers || $[2] !== isEditMode || $[3] !== onDelete || $[4] !== onUpdate || $[5] !== searchTerm || $[6] !== selectedCategory) {
        let t6;
        if ($[12] !== searchTerm || $[13] !== selectedCategory) {
            t6 = ({
                "GridView[bloggers.filter()]": (blogger)=>{
                    const status = blogger.status ?? "recent";
                    const matchesCategory = status === selectedCategory;
                    const matchesSearch = blogger.name.toLowerCase().includes(searchTerm.toLowerCase()) || blogger.description.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesCategory && matchesSearch;
                }
            })["GridView[bloggers.filter()]"];
            $[12] = searchTerm;
            $[13] = selectedCategory;
            $[14] = t6;
        } else {
            t6 = $[14];
        }
        filteredBloggers = bloggers.filter(t6);
        t4 = "mx-auto w-full max-w-7xl px-6 pt-24 pb-12";
        let t7;
        if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = ({
                "GridView[<input>.onChange]": (e)=>setSearchTerm(e.target.value)
            })["GridView[<input>.onChange]"];
            $[15] = t7;
        } else {
            t7 = $[15];
        }
        let t8;
        if ($[16] !== searchTerm) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "\u641C\u7D22\u535A\u4E3B...",
                value: searchTerm,
                onChange: t7,
                className: "focus:ring-brand mx-auto block w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 74,
                columnNumber: 12
            }, this);
            $[16] = searchTerm;
            $[17] = t8;
        } else {
            t8 = $[17];
        }
        let t9;
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t9 = ({
                "GridView[<button>.onClick]": ()=>setSelectedCategory("recent")
            })["GridView[<button>.onClick]"];
            $[18] = t9;
        } else {
            t9 = $[18];
        }
        const t10 = `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedCategory === "recent" ? "bg-brand text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`;
        let t11;
        if ($[19] !== t10) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: t9,
                className: t10,
                children: "近期更新"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, this);
            $[19] = t10;
            $[20] = t11;
        } else {
            t11 = $[20];
        }
        let t12;
        if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = ({
                "GridView[<button>.onClick]": ()=>setSelectedCategory("disconnected")
            })["GridView[<button>.onClick]"];
            $[21] = t12;
        } else {
            t12 = $[21];
        }
        const t13 = `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedCategory === "disconnected" ? "bg-brand text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`;
        let t14;
        if ($[22] !== t13) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: t12,
                className: t13,
                children: "长期失联"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, this);
            $[22] = t13;
            $[23] = t14;
        } else {
            t14 = $[23];
        }
        let t15;
        if ($[24] !== t11 || $[25] !== t14) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: [
                    t11,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 118,
                columnNumber: 13
            }, this);
            $[24] = t11;
            $[25] = t14;
            $[26] = t15;
        } else {
            t15 = $[26];
        }
        if ($[27] !== t15 || $[28] !== t8) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 space-y-4",
                children: [
                    t8,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 126,
                columnNumber: 12
            }, this);
            $[27] = t15;
            $[28] = t8;
            $[29] = t5;
        } else {
            t5 = $[29];
        }
        t2 = "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3";
        let t16;
        if ($[30] !== isEditMode || $[31] !== onDelete || $[32] !== onUpdate) {
            t16 = ({
                "GridView[filteredBloggers.map()]": (blogger_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$blogger$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BloggerCard"], {
                        blogger: blogger_0,
                        isEditMode: isEditMode,
                        onUpdate: onUpdate,
                        onDelete: {
                            "GridView[filteredBloggers.map() > <BloggerCard>.onDelete]": ()=>onDelete?.(blogger_0)
                        }["GridView[filteredBloggers.map() > <BloggerCard>.onDelete]"]
                    }, blogger_0.url, false, {
                        fileName: "[project]/src/app/bloggers/grid-view.tsx",
                        lineNumber: 137,
                        columnNumber: 58
                    }, this)
            })["GridView[filteredBloggers.map()]"];
            $[30] = isEditMode;
            $[31] = onDelete;
            $[32] = onUpdate;
            $[33] = t16;
        } else {
            t16 = $[33];
        }
        t3 = filteredBloggers.map(t16);
        $[1] = bloggers;
        $[2] = isEditMode;
        $[3] = onDelete;
        $[4] = onUpdate;
        $[5] = searchTerm;
        $[6] = selectedCategory;
        $[7] = filteredBloggers;
        $[8] = t2;
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        filteredBloggers = $[7];
        t2 = $[8];
        t3 = $[9];
        t4 = $[10];
        t5 = $[11];
    }
    let t6;
    if ($[34] !== t2 || $[35] !== t3) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/grid-view.tsx",
            lineNumber: 169,
            columnNumber: 10
        }, this);
        $[34] = t2;
        $[35] = t3;
        $[36] = t6;
    } else {
        t6 = $[36];
    }
    let t7;
    if ($[37] !== filteredBloggers.length) {
        t7 = filteredBloggers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-12 text-center text-gray-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "没有找到相关博主"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 178,
                columnNumber: 92
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/grid-view.tsx",
            lineNumber: 178,
            columnNumber: 43
        }, this);
        $[37] = filteredBloggers.length;
        $[38] = t7;
    } else {
        t7 = $[38];
    }
    let t8;
    if ($[39] !== t4 || $[40] !== t5 || $[41] !== t6 || $[42] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/grid-view.tsx",
            lineNumber: 186,
            columnNumber: 10
        }, this);
        $[39] = t4;
        $[40] = t5;
        $[41] = t6;
        $[42] = t7;
        $[43] = t8;
    } else {
        t8 = $[43];
    }
    return t8;
}
_s(GridView, "ItvXwbZM2p5GR53WsoTr5SwYW0I=");
_c = GridView;
var _c;
__turbopack_context__.k.register(_c, "GridView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/bloggers/components/create-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-client] (ecmascript)");
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(61);
    if ($[0] !== "6ffbec35f9aeb9f8ab79a34ed653764a53a7f20c5db6324ea9de7a0427d2b3a9") {
        for(let $i = 0; $i < 61; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6ffbec35f9aeb9f8ab79a34ed653764a53a7f20c5db6324ea9de7a0427d2b3a9";
    }
    const { blogger, onClose, onSave } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            name: "",
            avatar: "",
            url: "",
            description: "",
            stars: 3
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [showAvatarDialog, setShowAvatarDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    let t3;
    if ($[2] !== blogger) {
        t2 = ({
            "CreateDialog[useEffect()]": ()=>{
                if (blogger) {
                    setFormData(blogger);
                } else {
                    setFormData({
                        name: "",
                        avatar: "",
                        url: "",
                        description: "",
                        stars: 3
                    });
                }
            }
        })["CreateDialog[useEffect()]"];
        t3 = [
            blogger
        ];
        $[2] = blogger;
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
            "CreateDialog[handleAvatarSubmit]": (avatar)=>{
                const avatarUrl = avatar.type === "url" ? avatar.url : avatar.previewUrl;
                setFormData({
                    ...formData,
                    avatar: avatarUrl
                });
            }
        })["CreateDialog[handleAvatarSubmit]"];
        $[5] = formData;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const handleAvatarSubmit = t4;
    let t5;
    if ($[7] !== blogger || $[8] !== formData || $[9] !== onClose || $[10] !== onSave) {
        t5 = ({
            "CreateDialog[handleSubmit]": ()=>{
                if (!formData.name.trim() || !formData.avatar.trim() || !formData.url.trim() || !formData.description.trim()) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("\u8BF7\u586B\u5199\u6240\u6709\u5FC5\u586B\u9879");
                    return;
                }
                onSave(formData);
                onClose();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(blogger ? "\u66F4\u65B0\u6210\u529F" : "\u6DFB\u52A0\u6210\u529F");
            }
        })["CreateDialog[handleSubmit]"];
        $[7] = blogger;
        $[8] = formData;
        $[9] = onClose;
        $[10] = onSave;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const handleSubmit = t5;
    let t6;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "CreateDialog[<div>.onClick]": ()=>setShowAvatarDialog(true)
        })["CreateDialog[<div>.onClick]"];
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== formData.avatar || $[14] !== formData.name) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "group relative cursor-pointer",
            onClick: t6,
            children: formData.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: formData.avatar,
                        alt: formData.name,
                        className: "h-16 w-16 rounded-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 126,
                        columnNumber: 91
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-white",
                            children: "更换"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                            lineNumber: 126,
                            columnNumber: 353
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 126,
                        columnNumber: 188
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-16 w-16 items-center justify-center rounded-full bg-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    className: "h-6 w-6 text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                    lineNumber: 126,
                    columnNumber: 496
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                lineNumber: 126,
                columnNumber: 411
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[13] = formData.avatar;
        $[14] = formData.name;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] !== formData) {
        t8 = ({
            "CreateDialog[<input>.onChange]": (e)=>setFormData({
                    ...formData,
                    name: e.target.value
                })
        })["CreateDialog[<input>.onChange]"];
        $[16] = formData;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== formData.name || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: formData.name,
            onChange: t8,
            placeholder: "\u535A\u4E3B\u540D\u79F0",
            className: "w-full text-lg font-bold focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 148,
            columnNumber: 10
        }, this);
        $[18] = formData.name;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== formData) {
        t10 = ({
            "CreateDialog[<input>.onChange]": (e_0)=>setFormData({
                    ...formData,
                    url: e_0.target.value
                })
        })["CreateDialog[<input>.onChange]"];
        $[21] = formData;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    let t11;
    if ($[23] !== formData.url || $[24] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "url",
            value: formData.url,
            onChange: t10,
            placeholder: "https://example.com",
            className: "text-secondary mt-1 w-full truncate text-xs focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[23] = formData.url;
        $[24] = t10;
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== t11 || $[27] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[26] = t11;
        $[27] = t9;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    let t13;
    if ($[29] !== t12 || $[30] !== t7) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center gap-4",
            children: [
                t7,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 188,
            columnNumber: 11
        }, this);
        $[29] = t12;
        $[30] = t7;
        $[31] = t13;
    } else {
        t13 = $[31];
    }
    let t14;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = [
            1,
            2,
            3,
            4,
            5
        ];
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    let t15;
    if ($[33] !== formData) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0.5",
            children: t14.map({
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
                                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                lineNumber: 210,
                                columnNumber: 208
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                            lineNumber: 210,
                            columnNumber: 86
                        }, this)
                    }, index, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 205,
                        columnNumber: 49
                    }, this)
            }["CreateDialog[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[33] = formData;
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    let t16;
    if ($[35] !== formData) {
        t16 = ({
            "CreateDialog[<textarea>.onChange]": (e_1)=>setFormData({
                    ...formData,
                    description: e_1.target.value
                })
        })["CreateDialog[<textarea>.onChange]"];
        $[35] = formData;
        $[36] = t16;
    } else {
        t16 = $[36];
    }
    let t17;
    if ($[37] !== formData.description || $[38] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            value: formData.description,
            onChange: t16,
            placeholder: "\u535A\u4E3B\u4ECB\u7ECD...",
            className: "mt-3 w-full resize-none text-sm leading-relaxed focus:outline-none",
            rows: 4
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[37] = formData.description;
        $[38] = t16;
        $[39] = t17;
    } else {
        t17 = $[39];
    }
    let t18;
    if ($[40] !== t13 || $[41] !== t15 || $[42] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t13,
                t15,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        $[40] = t13;
        $[41] = t15;
        $[42] = t17;
        $[43] = t18;
    } else {
        t18 = $[43];
    }
    let t19;
    if ($[44] !== onClose) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClose,
            className: "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50",
            children: "取消"
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 251,
            columnNumber: 11
        }, this);
        $[44] = onClose;
        $[45] = t19;
    } else {
        t19 = $[45];
    }
    const t20 = blogger ? "\u4FDD\u5B58" : "\u6DFB\u52A0";
    let t21;
    if ($[46] !== handleSubmit || $[47] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleSubmit,
            className: "brand-btn flex-1 justify-center px-4",
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 260,
            columnNumber: 11
        }, this);
        $[46] = handleSubmit;
        $[47] = t20;
        $[48] = t21;
    } else {
        t21 = $[48];
    }
    let t22;
    if ($[49] !== t19 || $[50] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex gap-3",
            children: [
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 269,
            columnNumber: 11
        }, this);
        $[49] = t19;
        $[50] = t21;
        $[51] = t22;
    } else {
        t22 = $[51];
    }
    let t23;
    if ($[52] !== formData.avatar || $[53] !== handleAvatarSubmit || $[54] !== showAvatarDialog) {
        t23 = showAvatarDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            currentAvatar: formData.avatar,
            onClose: {
                "CreateDialog[<AvatarUploadDialog>.onClose]": ()=>setShowAvatarDialog(false)
            }["CreateDialog[<AvatarUploadDialog>.onClose]"],
            onSubmit: handleAvatarSubmit
        }, void 0, false, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 278,
            columnNumber: 31
        }, this);
        $[52] = formData.avatar;
        $[53] = handleAvatarSubmit;
        $[54] = showAvatarDialog;
        $[55] = t23;
    } else {
        t23 = $[55];
    }
    let t24;
    if ($[56] !== onClose || $[57] !== t18 || $[58] !== t22 || $[59] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogModal"], {
            open: true,
            onClose: onClose,
            className: "card w-sm",
            children: [
                t18,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[56] = onClose;
        $[57] = t18;
        $[58] = t22;
        $[59] = t23;
        $[60] = t24;
    } else {
        t24 = $[60];
    }
    return t24;
}
_s(CreateDialog, "SU4nfYHPJ12YirnuW7IprMZl6AQ=");
_c = CreateDialog;
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
"[project]/src/app/bloggers/services/push-bloggers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushBloggers",
    ()=>pushBloggers
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
async function pushBloggers(params) {
    const { bloggers, avatarItems } = params;
    // 获取认证 token（自动从全局认证状态获取）
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新博主列表`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    const uploadedHashes = new Set();
    let updatedBloggers = [
        ...bloggers
    ];
    // Process avatar uploads
    if (avatarItems && avatarItems.size > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('正在上传头像...');
        for (const [url, avatarItem] of avatarItems.entries()){
            if (avatarItem.type === 'file') {
                const hash = avatarItem.hash || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashFileSHA256"])(avatarItem.file);
                const ext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFileExt"])(avatarItem.file.name);
                const filename = `${hash}${ext}`;
                const publicPath = `/images/blogger/${filename}`;
                if (!uploadedHashes.has(hash)) {
                    const path = `public/images/blogger/${filename}`;
                    const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(avatarItem.file);
                    const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: blobData.sha
                    });
                    uploadedHashes.add(hash);
                }
                // Update blogger avatar URL
                updatedBloggers = updatedBloggers.map((b)=>b.url === url ? {
                        ...b,
                        avatar: publicPath
                    } : b);
            }
        }
    }
    // Create blob for bloggers list.json
    const bloggersJson = JSON.stringify(updatedBloggers, null, '\t');
    const bloggersBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64Utf8"])(bloggersJson), 'base64');
    treeItems.push({
        path: 'src/app/bloggers/list.json',
        mode: '100644',
        type: 'blob',
        sha: bloggersBlob.sha
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
"[project]/src/app/bloggers/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"name\":\"阮一峰的网络日志\",\"avatar\":\"/images/blogger/fe25259da8e3609b.png\",\"url\":\"https://www.ruanyifeng.com/blog/archives.html\",\"description\":\"经典必看，每周更新。无聊是看新闻、还是学习、还是拓展眼界，都是能其中获取到乐趣的。还有很多网友的每周留言。这就是 blog 的含金量。\",\"stars\":5},{\"name\":\"Enji Kusnadi\",\"url\":\"https://enji.dev/\",\"avatar\":\"https://enji.dev/_next/image?url=%2Fassets%2Fimages%2Fme.png&w=1080&q=100\",\"description\":\"第一个在设计样式上惊艳我的人，那时每逢推荐别人blog，我都会提这么一嘴。但这个不算她的blog 网站，只算它的线上简历，没有持续的内容，比较可惜。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Josh W. Comeau\",\"url\":\"https://www.joshwcomeau.com/\",\"avatar\":\"https://www.joshwcomeau.com/favicon.png\",\"description\":\"John blog 更像是一个课程网站，每一篇文章都书写的很好，每次阅读都能吸收到新的东西。网站设计也恰到好处，工整、有趣。\",\"stars\":5},{\"name\":\"nanda\",\"url\":\"https://www.nan.fyi/\",\"avatar\":\"https://www.nan.fyi/favicon.ico\",\"description\":\"设计大师，nanda 。页面只用灰色加线条，都让我觉得叹为观止，内容不多，每篇都精雕细琢。跟 Josh 一样，属于技术网站，但它的教程引导更加出神入化，可称为程序艺术家。\",\"stars\":5},{\"name\":\"Emil Kowalski\",\"url\":\"https://emilkowal.ski/\",\"avatar\":\"https://emilkowal.ski/favicon.ico\",\"description\":\"Blog 就干脆\\\"不设计\\\"，无装饰。技术就比较轻松一些，它更强调动画/交互。Vercel 员工，他的组件很好用，也很 vercel。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Risingle\",\"url\":\"https://www.imrising.cn/\",\"avatar\":\"https://www.imrising.cn/images/logo/logo.webp\",\"description\":\"网站样式很棒，虽然用的别人的模板，但是他用的很棒。是个初出茅庐的程序员。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"無名小栈\",\"url\":\"https://blog.imsyy.top/\",\"avatar\":\"https://blog.imsyy.top/images/logo/logo.webp\",\"description\":\"Risingle blog 的模板主人，或许是头像和网站风格不搭，显得没有 Risingle 的舒服。Github 热门项目还不少，一看就是爱折腾的人，就是不爱写 blog，没啥内容。01 年，挺年轻的，独立开发者？不知道经历了什么。\",\"stars\":2,\"status\":\"disconnected\"},{\"name\":\"韩小韩博客\",\"url\":\"https://www.vvhan.com/\",\"avatar\":\"https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640\",\"description\":\"网站很棒，内容多，头像也帅，不知道人帅不帅。就是这个错位滑动效果一直让我头疼，这个阻尼效果还写blog专业上了。。。一个插件导入的事情，啥时候他能把这个效果关掉就好了。挺想多看下他内容的，但是这个效果太头晕了。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Anthony Fu\",\"url\":\"https://antfu.me/\",\"avatar\":\"https://avatars.githubusercontent.com/u/11247099?v=4\",\"description\":\"很厉害的一个人，好像还很年轻。经常在 b站活跃，开直播（看过）。我记得它几乎毕业就做了很多厉害的事情，vue 系列核心成员，似乎对他来说很轻松的事情。blog 多是英文，生活圈也是大神汇聚，真好。不怎么爱写blog，但相比来说已经算好的了。可以从他这窥探一些 vue \\\"上流社会\\\"\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"enpitsulin 铅笔\",\"url\":\"https://enpitsulin.xyz/\",\"avatar\":\"https://enpitsulin.dev/images/avatar.webp\",\"description\":\"很简洁的blog网站，像 nanda。只不过很久没内容了。他现在的头像一时让我想不起他是谁了，突然发现它过去可爱头像，我想起来这家伙了。\",\"stars\":2},{\"name\":\"Innei 静かな森\",\"url\":\"https://innei.in/\",\"avatar\":\"https://cdn.jsdelivr.net/gh/Innei/static@master/avatar.png\",\"description\":\"网站还行，是典型的那种某个时代的产物，我不太get。但是内容活跃，并且他好像很火？但我没找出他为什么火。项目还是挺多的。\",\"stars\":3},{\"name\":\"秋夜灯雨\",\"url\":\"https://blog.lierhua.top/\",\"avatar\":\"https://blog.lierhua.top/images/web/yyqda3.svg\",\"description\":\"看名字，就知道是过去的残党了。但是我挺喜欢他的设计的，页面清晰，一股书生气。虽然是老人，但能追溯的过去并不多。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"BlogFinder\",\"url\":\"https://bf.zzxworld.com/\",\"avatar\":\"https://bf.zzxworld.com/images/favicon.png\",\"description\":\"一个 blog 收集网站，可以查阅有哪些 blog，也可以直接看最近谁更新了什么\",\"stars\":3},{\"name\":\"Tonsky\",\"url\":\"https://tonsky.me/\",\"avatar\":\"https://avatars.githubusercontent.com/u/285292?v=4\",\"description\":\"一个过去的国外大神，忘了是什么时候发现它的，blog 依旧时不时更新。就是现在 blog 太刺眼了，不知道是不是故意的。\",\"stars\":3},{\"name\":\"Cali\",\"url\":\"https://cali.so/\",\"avatar\":\"https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=96&q=75\",\"description\":\"设计师，网站设计不错，但是 blog 内容很少。但厉害的是他已经自己开公司了，给别人设计网站，影石 Insta360 是他们设计的。很好的 blog 参考。他的 zolplay 网站跟 nanda 风格很像，不知道谁抄的谁。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Chrome Blog\",\"url\":\"https://web.dev/blog?hl=zh-cn\",\"avatar\":\"/images/blogger/2fe46db88bd43683.svg\",\"description\":\"技术团队 blog，咨询、动态、故事。我觉得页面感受还不错。\",\"stars\":4},{\"name\":\"Huozhi\",\"url\":\"https://huozhi.im/\",\"avatar\":\"https://avatars.githubusercontent.com/u/4800338?v=4\",\"description\":\"极简主义者，网站真的极简，但是感觉也不差。内容不多，当你觉得不知道怎么设计blog，或者设计的不好时，看看他。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Brian Lovin\",\"url\":\"https://brianlovin.com/\",\"avatar\":\"https://avatars.githubusercontent.com/u/1923260?v=4\",\"description\":\"早期外国大神，在 Github,Facebook 工作过，现在在notion，资历老、项目多。blog 写成了 Dashboard 风格，蛮奇特的，但是 blog 并不多。\",\"stars\":4},{\"name\":\"Cassie Evans's Blog\",\"url\":\"https://www.cassie.codes/\",\"avatar\":\"https://www.cassie.codes/images/avatar2.jpg\",\"description\":\"彩色网站，真的很酷。并且还是位女士，真的很少见。GASP、SVG、动画很精美，但是没几篇内容，也算是高级 blog 的一种诅咒。在 Twitter 上也是名人。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Niracler 的博物志\",\"url\":\"https://niracler.com/\",\"avatar\":\"https://niracler.com/favicon.svg\",\"description\":\"小透明，偶尔更新一篇blog。但是网站风格还是有特点的，可作为设计 blog 时的参考。\",\"stars\":2},{\"name\":\"講評世界\",\"url\":\"https://blog.moeyua.com/\",\"avatar\":\"https://avatars.githubusercontent.com/u/45156493?v=4\",\"description\":\"小透明，失踪人口。但 blog 网站样式有种字体的美，不知道怎么说。好像是影视飓风成员。\",\"stars\":2,\"status\":\"disconnected\"},{\"name\":\"阿猫的博客\",\"url\":\"https://ameow.xyz/\",\"avatar\":\"https://ameow.xyz/upload/favicon.png\",\"description\":\"可爱的网站，一直在更新他的猫鱼周刊。\",\"stars\":3},{\"name\":\"pseudoyu\",\"url\":\"https://www.pseudoyu.com/\",\"avatar\":\"https://www.pseudoyu.com/avatar.webp\",\"description\":\"区块链开发者，在 Monad 区块链倒腾了一段时间。网站长得跟 Anthony 一模一样。嘴上一直念叨着他的学姐老婆。应该也挺厉害的。\",\"stars\":3},{\"name\":\"季节记忆\",\"avatar\":\"https://www.seamory.com/api/storage/2024112814523200000001349b3aa3c2\",\"url\":\"https://www.seamory.com/\",\"description\":\"好像是为后端/嵌入式？2025 年初建立的 blog，无 UI 设计。但少有后端人显露 blog，应当勉励的。\",\"stars\":1,\"status\":\"disconnected\"},{\"name\":\"微尔微\",\"avatar\":\"https://www.vio.vin/apple-touch-icon.png\",\"url\":\"https://www.vio.vin/\",\"description\":\"23 年新晋散修，如他所说，一天倒腾一些奇怪的东西。应该是以后端为主，喜欢完一些硬件。静森系 blog，25年 blog 稳定输出。\",\"stars\":2},{\"name\":\"搬砖日记\",\"avatar\":\"https://banzhuanriji.com/img/icon.ico\",\"url\":\"https://banzhuanriji.com/\",\"description\":\"白底黑字。但是打理得挺好的。应该是 Andriod 开发者，24 年开始分享各种探索。摸不清根底。\",\"stars\":2},{\"name\":\"博客.cn\",\"avatar\":\"https://xmind.design/favicon.ico\",\"url\":\"https://loud-fear-11e.notion.site/eb29a49346a742989582723f950fcf0f?v=4b4f7b7d24274ba7853426c101a149d7\",\"description\":\"好像是 XMind 的内部 blog notion，不确认，但里面的内容确实专业深刻，先收藏一波\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"KK\",\"avatar\":\"https://avatars.githubusercontent.com/u/44634134?v=4\",\"url\":\"https://kaiyi.cool/\",\"description\":\"kk 是跟很厉害的人。突然看朋友圈想起他了，发现他是有 blog 的，虽然已经不维护了。但他的 blog 还残留一些好东西，或许对你有帮助。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"猫普的精神世界\",\"avatar\":\"https://maplezz.com/_astro/picture.DavLO-HP_1hhoaS.webp\",\"url\":\"https://maplezz.com/\",\"description\":\"通过 issue 发现的另外一个开源的，也是这几天开源的，好巧。液态玻璃感设计，是有这种感觉，挺好的，就是有的花。我还是挺喜欢的。内容从 25年开始。\",\"stars\":3},{\"name\":\"手里有只毛毛虫\",\"avatar\":\"https://www.krjojo.com/wp-content/uploads/2024/05/avatar.avif\",\"url\":\"https://www.krjojo.com/\",\"description\":\"网站很舒服，一位六边形战士的独立开发者。文章目录能一眼看完就好了，想翻点想看的比较不容易。\",\"stars\":4},{\"name\":\"Honesty\",\"avatar\":\"https://cdn.jsdelivr.net/gh/listener-He/images@default/202309111525908.jpeg\",\"url\":\"https://blog.hehouhui.cn/\",\"description\":\"折腾 blog 的后端，是个后端学习的榜样，折腾了这么多年。网站弄得还挺好的，就是加载内容有点慢。\",\"stars\":3},{\"name\":\"ElysiumStack\",\"avatar\":\"/images/avatar.png\",\"url\":\"https://www.elysium-stack.cn/\",\"description\":\"UI 设计师 blogger，少见，blog 设计的很棒。一股游戏感铺面而来，25 年开始的内容。\",\"stars\":3},{\"name\":\"十玖八柒\",\"avatar\":\"https://ahzoo.cn/img/avatar.webp\",\"url\":\"https://blog.ahzoo.cn/\",\"description\":\"Z次元，后端开发，记录了很多后端研究。但折腾前端和 blog 还不少。把 blog 打理得有自己独特得舒适，实属难得\",\"stars\":3},{\"name\":\"纸鹿摸鱼处\",\"avatar\":\"https://weavatar.com/avatar/47c0f2e82b76d9b10eb3023df9e02e4e3fdbeaf5b74b842063f207971e7fbe7b?s=160\",\"url\":\"https://blog.zhilu.site/\",\"description\":\"棒棒的开源 blog 主，今天蹭了蹭他群友，🤣，给他多加一分🤣🤣🤣。\",\"stars\":4},{\"name\":\"灯火不休时\",\"avatar\":\"https://file.dhbxs.top/ylvwvjjs.jpg\",\"url\":\"https://blog.dhbxs.top/\",\"description\":\"群友，JAVAR，干净blog，让我看到几个人的影子。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"23朵毒蘑菇\",\"avatar\":\"https://blog.dumogu.top/web-assets/v-last/public/user.jpg\",\"url\":\"https://blog.dumogu.top/\",\"description\":\"前端开发，页面小巧，结构简单，寻常记录\",\"stars\":3}]"));}),
"[project]/src/app/bloggers/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/grid-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/create-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$services$2f$push$2d$bloggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/services/push-bloggers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/list.json (json)");
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
    const [bloggers, setBloggers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__["default"]);
    const [originalBloggers, setOriginalBloggers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__["default"]);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingBlogger, setEditingBlogger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarItems, setAvatarItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const hideEditButton = siteContent.hideEditButton ?? false;
    const handleUpdate = (updatedBlogger, oldBlogger, avatarItem)=>{
        setBloggers((prev)=>prev.map((b)=>b.url === oldBlogger.url ? updatedBlogger : b));
        if (avatarItem) {
            setAvatarItems((prev_0)=>{
                const newMap = new Map(prev_0);
                newMap.set(updatedBlogger.url, avatarItem);
                return newMap;
            });
        }
    };
    const handleAdd = ()=>{
        setEditingBlogger(null);
        setIsCreateDialogOpen(true);
    };
    const handleSaveBlogger = (updatedBlogger_0)=>{
        if (editingBlogger) {
            const updated = bloggers.map((b_0)=>b_0.url === editingBlogger.url ? updatedBlogger_0 : b_0);
            setBloggers(updated);
        } else {
            setBloggers([
                ...bloggers,
                updatedBlogger_0
            ]);
        }
    };
    const handleDelete = (blogger)=>{
        if (confirm(`确定要删除 ${blogger.name} 吗？`)) {
            setBloggers(bloggers.filter((b_1)=>b_1.url !== blogger.url));
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$services$2f$push$2d$bloggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushBloggers"])({
                bloggers,
                avatarItems
            });
            setOriginalBloggers(bloggers);
            setAvatarItems(new Map());
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
        setBloggers(originalBloggers);
        setAvatarItems(new Map());
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
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 112,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$grid$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                bloggers: bloggers,
                isEditMode: isEditMode,
                onUpdate: handleUpdate,
                onDelete: handleDelete
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 118,
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
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 128,
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
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 135,
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
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 142,
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
                    fileName: "[project]/src/app/bloggers/page.tsx",
                    lineNumber: 149,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 120,
                columnNumber: 4
            }, this),
            isCreateDialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                blogger: editingBlogger,
                onClose: ()=>setIsCreateDialogOpen(false),
                onSave: handleSaveBlogger
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 158,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true);
}
_s(Page, "wrhET99Yk/CP21flk6uWnKWUKEw=", false, function() {
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

//# sourceMappingURL=src_b7a5d4d4._.js.map