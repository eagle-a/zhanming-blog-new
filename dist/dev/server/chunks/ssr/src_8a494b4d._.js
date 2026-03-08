module.exports = [
"[project]/src/app/(home)/hi-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HiCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
        return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
    } else if (hour >= 18 && hour < 22) {
        return 'Good Evening';
    } else {
        return 'Good Night';
    }
}
function HiCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const greeting = getGreeting();
    const styles = cardStyles.hiCard;
    const username = siteContent.meta.username || 'Suni';
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - styles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - styles.height / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "hiCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            className: "relative text-center max-sm:static max-sm:translate-0",
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/christmas/snow-1.webp",
                            alt: "Christmas decoration",
                            className: "pointer-events-none absolute",
                            style: {
                                width: 180,
                                left: -20,
                                top: -25,
                                opacity: 0.9
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/hi-card.tsx",
                            lineNumber: 36,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/christmas/snow-2.webp",
                            alt: "Christmas decoration",
                            className: "pointer-events-none absolute",
                            style: {
                                width: 160,
                                bottom: -12,
                                right: -8,
                                opacity: 0.9
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/hi-card.tsx",
                            lineNumber: 42,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/live2d",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/avatar.png",
                        className: "mx-auto rounded-full",
                        style: {
                            width: 120,
                            height: 120,
                            boxShadow: ' 0 16px 32px -5px #E2D9CE'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/hi-card.tsx",
                        lineNumber: 51,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/hi-card.tsx",
                    lineNumber: 50,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "font-averia mt-3 text-2xl",
                    children: [
                        greeting,
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/app/(home)/hi-card.tsx",
                            lineNumber: 54,
                            columnNumber: 17
                        }, this),
                        " I'm ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-linear text-[32px]",
                            children: username
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/hi-card.tsx",
                            lineNumber: 54,
                            columnNumber: 28
                        }, this),
                        " , Nice to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/app/(home)/hi-card.tsx",
                            lineNumber: 54,
                            columnNumber: 98
                        }, this),
                        " meet you!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/hi-card.tsx",
                    lineNumber: 53,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/hi-card.tsx",
            lineNumber: 33,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/hi-card.tsx",
        lineNumber: 32,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/art-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArtCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function ArtCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const styles = cardStyles.artCard;
    const hiCardStyles = cardStyles.hiCard;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - styles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - hiCardStyles.height / 2 - styles.height - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    const artImages = siteContent.artImages ?? [];
    const currentId = siteContent.currentArtImageId;
    const currentArt = (currentId ? artImages.find((item)=>item.id === currentId) : undefined) ?? artImages[0];
    const artUrl = currentArt?.url || '/images/art/cat.png';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "artCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            className: "p-2 max-sm:static max-sm:translate-0",
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-3.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 160,
                            right: -8,
                            top: -16,
                            opacity: 0.9
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/art-card.tsx",
                        lineNumber: 28,
                        columnNumber: 7
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    onClick: ()=>router.push('/pictures'),
                    src: artUrl,
                    alt: "wall art",
                    className: "h-full w-full rounded-[32px] object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/art-card.tsx",
                    lineNumber: 37,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/art-card.tsx",
            lineNumber: 25,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/art-card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/clock-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClockCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/layout-edit-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
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
function ClockCard() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const editing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.editing);
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const styles = cardStyles.clockCard;
    const hiCardStyles = cardStyles.hiCard;
    const showSeconds = siteContent.clockShowSeconds ?? false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = showSeconds ? 1000 : 5000;
        const timer = setInterval(()=>{
            setTime(new Date());
        }, interval);
        return ()=>clearInterval(timer);
    }, [
        showSeconds
    ]);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + hiCardStyles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - styles.offset - styles.height;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "clockCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            className: "p-2",
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/christmas/snow-5.webp",
                            alt: "Christmas decoration",
                            className: "pointer-events-none absolute",
                            style: {
                                width: 60,
                                left: 2,
                                bottom: 2,
                                opacity: 0.6
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 43,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/christmas/snow-6.webp",
                            alt: "Christmas decoration",
                            className: "pointer-events-none absolute",
                            style: {
                                width: 80,
                                right: -4,
                                top: -10,
                                opacity: 0.6
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 49,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>{
                        if (!editing) {
                            router.push('/clock');
                        }
                    },
                    className: "bg-secondary/20 card-rounded flex h-full w-full cursor-pointer items-center justify-center gap-1.5 p-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                            value: parseInt(hours[0])
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 64,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                            value: parseInt(hours[1])
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 65,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Colon, {}, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 66,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                            value: parseInt(minutes[0])
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 67,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                            value: parseInt(minutes[1])
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/clock-card.tsx",
                            lineNumber: 68,
                            columnNumber: 6
                        }, this),
                        showSeconds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Colon, {}, void 0, false, {
                                    fileName: "[project]/src/app/(home)/clock-card.tsx",
                                    lineNumber: 71,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                                    value: parseInt(seconds[0])
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/clock-card.tsx",
                                    lineNumber: 72,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SevenSegmentDigit, {
                                    value: parseInt(seconds[1])
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/clock-card.tsx",
                                    lineNumber: 73,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/clock-card.tsx",
                    lineNumber: 57,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/clock-card.tsx",
            lineNumber: 40,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/clock-card.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this);
}
function SevenSegmentDigit({ value, className }) {
    const segmentMap = {
        0: [
            true,
            true,
            true,
            true,
            true,
            true,
            false
        ],
        1: [
            false,
            true,
            true,
            false,
            false,
            false,
            false
        ],
        2: [
            true,
            true,
            false,
            true,
            true,
            false,
            true
        ],
        3: [
            true,
            true,
            true,
            true,
            false,
            false,
            true
        ],
        4: [
            false,
            true,
            true,
            false,
            false,
            true,
            true
        ],
        5: [
            true,
            false,
            true,
            true,
            false,
            true,
            true
        ],
        6: [
            true,
            false,
            true,
            true,
            true,
            true,
            true
        ],
        7: [
            true,
            true,
            true,
            false,
            false,
            false,
            false
        ],
        8: [
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ],
        9: [
            true,
            true,
            true,
            true,
            false,
            true,
            true
        ]
    };
    const segments = segmentMap[value] || segmentMap[0];
    const activeColor = 'var(--color-primary)';
    const inactiveColor = 'rgba(0, 0, 0, 0.05)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "29",
        height: "52",
        viewBox: "0 0 29 52",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4.20248 3.49482C2.82797 2.27303 3.69218 0 5.53121 0H22.6867C24.5522 0 25.4019 2.32821 23.975 3.52982L23.5791 3.86316C23.2186 4.16681 22.7623 4.33333 22.2909 4.33333H5.90621C5.41638 4.33333 4.94359 4.15358 4.57748 3.82815L4.20248 3.49482Z",
                fill: segments[0] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 107,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.85122 24.13C4.16644 23.936 4.5293 23.8333 4.89942 23.8333H23.3022C23.6503 23.8333 23.9923 23.9242 24.2945 24.0969L24.5862 24.2635C25.9298 25.0313 25.9298 26.9687 24.5862 27.7365L24.2945 27.9032C23.9923 28.0758 23.6503 28.1667 23.3022 28.1667H4.89942C4.5293 28.1667 4.16644 28.064 3.85122 27.87L3.58039 27.7033C2.31131 26.9224 2.31132 25.0777 3.58039 24.2967L3.85122 24.13Z",
                fill: segments[6] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 111,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.06 23.5458C1.7279 24.3784 -8.31295e-08 23.4207 -1.47217e-07 21.8498L-8.06095e-07 5.69981C-8.77526e-07 3.94893 2.09055 3.04323 3.36788 4.24073L3.70121 4.55323C4.10452 4.93133 4.33333 5.45949 4.33333 6.01231L4.33333 21.6415C4.33333 22.3311 3.97809 22.972 3.39333 23.3375L3.06 23.5458Z",
                fill: segments[5] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 115,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M24.8497 4.25654C26.1428 3.12502 28.1667 4.04338 28.1667 5.76169L28.1667 21.8498C28.1667 23.4207 26.4388 24.3784 25.1067 23.5458L24.7734 23.3375C24.1886 22.972 23.8334 22.3311 23.8334 21.6415L23.8334 6.05336C23.8334 5.47663 24.0823 4.92798 24.5163 4.54821L24.8497 4.25654Z",
                fill: segments[1] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 119,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M23.9259 48.6321C25.1234 49.9094 24.2177 52 22.4669 52L5.69978 52C3.9489 52 3.04321 49.9094 4.24071 48.6321L4.55321 48.2988C4.9313 47.8955 5.45947 47.6667 6.01228 47.6667L22.1544 47.6667C22.7072 47.6667 23.2353 47.8955 23.6134 48.2988L23.9259 48.6321Z",
                fill: segments[3] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 123,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M25.1862 28.489C26.5194 27.7391 28.1667 28.7025 28.1667 30.2322L28.1667 46.6299C28.1667 48.4117 26.0124 49.3041 24.7525 48.0441L24.4191 47.7108C24.0441 47.3357 23.8334 46.827 23.8334 46.2966L23.8334 30.4197C23.8334 29.6971 24.2231 29.0308 24.8528 28.6765L25.1862 28.489Z",
                fill: segments[2] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 127,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.4564 47.7859C2.21509 49.1048 4.23823e-07 48.2263 6.6133e-07 46.4152L2.79423e-06 30.1501C3.00022e-06 28.5793 1.72791 27.6216 3.06 28.4541L3.39333 28.6625C3.9781 29.028 4.33334 29.6689 4.33334 30.3585L4.33333 46.061C4.33333 46.5705 4.13891 47.0607 3.78973 47.4317L3.4564 47.7859Z",
                fill: segments[4] ? activeColor : inactiveColor
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 131,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/clock-card.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, this);
}
function Colon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col justify-center gap-2 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-primary h-1.5 w-1.5"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 142,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-primary h-1.5 w-1.5"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/clock-card.tsx",
                lineNumber: 143,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/clock-card.tsx",
        lineNumber: 141,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/calendar-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CalendarCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$locale$2f$zh$2d$cn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/locale/zh-cn.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].locale('zh-cn');
function CalendarCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const currentDate = now.date();
    const firstDayOfMonth = now.startOf('month');
    const firstDayWeekday = (firstDayOfMonth.day() + 6) % 7;
    const daysInMonth = now.daysInMonth();
    const currentWeekday = (now.day() + 6) % 7;
    const styles = cardStyles.calendarCard;
    const hiCardStyles = cardStyles.hiCard;
    const clockCardStyles = cardStyles.clockCard;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + hiCardStyles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "calendarCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            className: "flex flex-col",
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-7.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 150,
                            right: -12,
                            top: -12,
                            opacity: 0.8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/calendar-card.tsx",
                        lineNumber: 33,
                        columnNumber: 7
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-secondary text-sm",
                    children: [
                        now.format('YYYY/M/D'),
                        " ",
                        now.format('ddd')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/calendar-card.tsx",
                    lineNumber: 42,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-secondary mt-3 grid h-[206px] flex-1 grid-cols-7 gap-2 text-sm', (styles.height < 240 || styles.width < 240) && 'text-xs'),
                    children: [
                        new Array(7).fill(0).map((_, index)=>{
                            const isCurrentWeekday = index === currentWeekday;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center font-medium', isCurrentWeekday && 'text-brand'),
                                children: dates[index]
                            }, index, false, {
                                fileName: "[project]/src/app/(home)/calendar-card.tsx",
                                lineNumber: 49,
                                columnNumber: 8
                            }, this);
                        }),
                        new Array(firstDayWeekday).fill(0).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {}, `empty-${index}`, false, {
                                fileName: "[project]/src/app/(home)/calendar-card.tsx",
                                lineNumber: 56,
                                columnNumber: 7
                            }, this)),
                        new Array(daysInMonth).fill(0).map((_, index)=>{
                            const day = index + 1;
                            const isToday = day === currentDate;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center rounded-lg', isToday && 'bg-linear border font-medium'),
                                children: day
                            }, day, false, {
                                fileName: "[project]/src/app/(home)/calendar-card.tsx",
                                lineNumber: 63,
                                columnNumber: 8
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/calendar-card.tsx",
                    lineNumber: 45,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/calendar-card.tsx",
            lineNumber: 30,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/calendar-card.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, this);
}
const dates = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '日'
];
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
"[project]/src/svgs/juejin.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgJuejin = function SvgJuejin(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#1E80FF",
        d: "M10.903 3.792c-.538.425-1.039.823-1.111.885l-.137.11.257.202c.14.113.278.222.305.246.028.024.422.336.871.696l.82.652.123-.093c.068-.051.545-.432 1.063-.843.514-.412.967-.768 1-.789.039-.024.066-.051.066-.065 0-.01-.226-.202-.504-.418-.281-.22-.531-.418-.559-.442-.374-.306-1.166-.916-1.19-.916-.013.004-.466.35-1.004.775m5.468 4.227c-4.477 3.542-4.443 3.515-4.525 3.463-.072-.044-.271-.199-1.502-1.172-.213-.168-.435-.347-.5-.395-.066-.051-.206-.16-.313-.246-.11-.086-.25-.196-.312-.247-.308-.24-1.666-1.313-2.393-1.886a1.7 1.7 0 0 0-.284-.199c-.017 0-.257.182-.532.401-.274.223-.531.429-.569.456-.041.028-.12.093-.175.144a.4.4 0 0 1-.127.096c-.072 0-.017.072.151.206.096.075.206.161.237.189l.463.363.713.562c.452.357.747.593 2.996 2.37 1.122.884 2.082 1.635 2.13 1.666.085.058.092.058.174-.007q.19-.147.378-.298l.411-.326a695 695 0 0 0 1.917-1.512c.027-.024.291-.23.582-.46.292-.23.888-.696 1.32-1.038l1.447-1.139c.364-.284.652-.528.645-.545a51 51 0 0 0-1.406-1.131c-.017-.01-.435.298-.926.685"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#1E80FF",
        d: "M1.358 11.469c-.357.288-.669.548-.696.576-.055.051-.127-.01 1.875 1.566l1.351 1.067c.243.192.85.672 1.354 1.066l1.235.974c.048.04.538.425 1.086.857.546.432 1.739 1.371 2.647 2.088.912.716 1.667 1.306 1.684 1.313s.175-.103.35-.243c.51-.398 2.115-1.663 2.379-1.872.134-.107.302-.24.374-.295.072-.059.15-.12.171-.137.02-.021.278-.223.57-.453.486-.377 1.384-1.083 1.508-1.186.027-.024.12-.096.205-.161a157.07 157.07 0 0 1 .909-.72c.682-.535.99-.779 2.074-1.632.405-.32.761-.597.789-.621.058-.048.737-.583 1.046-.826.113-.086.212-.168.222-.179.01-.013.141-.113.292-.23.15-.112.308-.24.353-.277l.079-.069-.233-.181c-.127-.103-.24-.192-.25-.203-.028-.03-.525-.432-.707-.569a1 1 0 0 1-.178-.157c-.031-.072-.158.003-.686.421l-.641.504c-.038.035-.247.196-.463.367a19 19 0 0 0-.411.326c-.01.01-.155.127-.326.257-.168.13-.357.274-.415.322-.116.096-.127.103-.476.38-.13.104-.264.207-.292.23-.027.025-.476.378-.994.782-.518.408-.974.768-1.012.8-.037.033-.339.27-.668.527-.33.257-.957.751-1.396 1.097-.435.347-.99.782-1.23.97l-.68.535-.243.196-.103-.072c-.054-.041-.11-.082-.12-.093a5 5 0 0 0-.24-.188c-.277-.216-.339-.264-.39-.309a2 2 0 0 0-.175-.137c-.076-.058-.144-.11-.155-.12-.01-.01-.16-.134-.339-.274a18 18 0 0 1-.377-.295c-.031-.028-.401-.319-.826-.652-.422-.332-.823-.648-.892-.699-.134-.11-.785-.624-2.931-2.314-.81-.638-1.704-1.344-1.989-1.567-1.166-.926-1.292-1.022-1.334-1.018-.02 0-.329.24-.685.528"
    })));
};
const __TURBOPACK__default__export__ = SvgJuejin;
}),
"[project]/src/svgs/email.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgEmail = function SvgEmail(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 32"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "var(--color-brand)",
        fillOpacity: 0.8,
        d: "M1.818 11.007v9.778c0 3.05 2.432 5.608 5.62 5.896a95 95 0 0 0 17.06 0c3.187-.288 5.619-2.846 5.619-5.896v-9.778c0-3.05-2.432-5.608-5.619-5.896a95 95 0 0 0-17.06 0c-3.188.288-5.62 2.846-5.62 5.896"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "var(--color-border)",
        fillOpacity: 0.8,
        d: "M28.445 7.956a.723.723 0 0 0-.003-.993 6.3 6.3 0 0 0-3.945-1.852 95 95 0 0 0-17.06 0 6.28 6.28 0 0 0-4.054 1.974.72.72 0 0 0 .032.996l8.062 8.062c2.156 2.156 5.684 2.246 8.142.195a95 95 0 0 0 8.826-8.382"
    })));
};
const __TURBOPACK__default__export__ = SvgEmail;
}),
"[project]/src/svgs/x.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _rect, _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgX = function SvgX(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _rect || (_rect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("rect", {
        width: 40,
        height: 40,
        fill: "#000",
        rx: 20
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        d: "m8.059 8.51 9.267 12.429L8 31.04h2.1l8.162-8.847 6.596 8.847H32l-9.787-13.126 8.679-9.405h-2.097l-7.518 8.146-6.073-8.146zm3.087 1.549h3.282l14.488 19.43h-3.282z"
    })));
};
const __TURBOPACK__default__export__ = SvgX;
}),
"[project]/src/svgs/tg.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _rect, _path, _defs;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgTg = function SvgTg(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _rect || (_rect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("rect", {
        width: 40,
        height: 40,
        fill: "url(#tg_svg__a)",
        rx: 20
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        fillRule: "evenodd",
        d: "M9.053 19.789q8.746-3.81 11.664-5.024c5.554-2.31 6.708-2.712 7.46-2.725.166-.003.536.038.776.233.202.164.258.386.284.541.027.156.06.51.034.788-.301 3.162-1.604 10.837-2.266 14.379-.28 1.498-.833 2-1.367 2.05-1.162.107-2.043-.767-3.168-1.505-1.76-1.154-2.755-1.872-4.464-2.998-1.974-1.301-.694-2.016.431-3.185.295-.306 5.412-4.96 5.511-5.383.012-.053.024-.25-.093-.354s-.29-.068-.414-.04q-.265.06-8.436 5.576-1.198.822-2.17.801c-.713-.015-2.087-.403-3.108-.735-1.253-.407-2.248-.623-2.161-1.314q.067-.54 1.487-1.105",
        clipRule: "evenodd"
    })), _defs || (_defs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("linearGradient", {
        id: "tg_svg__a",
        x1: 20,
        x2: 20,
        y1: 0,
        y2: 39.703,
        gradientUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        stopColor: "#2AABEE"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        offset: 1,
        stopColor: "#229ED9"
    })))));
};
const __TURBOPACK__default__export__ = SvgTg;
}),
"[project]/src/svgs/wechat.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgWechat = function SvgWechat(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#00C70A",
        d: "M31.406 28.828c1.797-1.328 2.969-3.281 2.969-5.469 0-3.984-3.906-7.187-8.672-7.187-4.765 0-8.594 3.203-8.594 7.187s3.828 7.188 8.594 7.188c1.016 0 1.953-.156 2.813-.39.312-.079.625 0 .703.077l1.953 1.094c.234.156.469 0 .39-.312l-.468-1.72c0-.233.156-.39.312-.468m-8.593-6.64a1.17 1.17 0 1 1-.6-2.264 1.17 1.17 0 0 1 .6 2.264m5.78 0a1.171 1.171 0 1 1-.6-2.265 1.171 1.171 0 0 1 .6 2.265"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#00C70A",
        d: "M16.016 8.203c-5.703 0-10.313 3.906-10.313 8.672 0 2.578 1.328 4.922 3.516 6.484.234.157.39.391.312.782l-.547 1.875c-.078.39.235.547.47.468l2.343-1.328c.234-.156.547-.234.86-.156 2.03.625 3.75.469 3.984.469-1.875-6.563 4.609-10.313 9.609-10-.781-4.063-5.078-7.266-10.234-7.266m-3.438 7.266a1.407 1.407 0 1 1-.658-2.736 1.407 1.407 0 0 1 .658 2.736m6.953 0a1.407 1.407 0 1 1-.658-2.736 1.407 1.407 0 0 1 .658 2.736"
    })));
};
const __TURBOPACK__default__export__ = SvgWechat;
}),
"[project]/src/svgs/facebook.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _rect, _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgFacebook = function SvgFacebook(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _rect || (_rect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("rect", {
        width: 40,
        height: 40,
        fill: "#1877F2",
        rx: 20
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        d: "M27.785 25.781 28.672 20h-5.547v-3.75c0-1.582.773-3.125 3.258-3.125h2.523V8.203s-2.289-.39-4.476-.39c-4.57 0-7.555 2.769-7.555 7.78V20h-5.078v5.781h5.078v13.977q1.531.241 3.125.242 1.595-.001 3.125-.242V25.78z"
    })));
};
const __TURBOPACK__default__export__ = SvgFacebook;
}),
"[project]/src/svgs/tiktok.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _rect, _path, _path2, _path3;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgTiktok = function SvgTiktok(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _rect || (_rect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("rect", {
        width: 40,
        height: 40,
        fill: "#000",
        rx: 20
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FF004F",
        d: "M25.577 16.107a10.92 10.92 0 0 0 6.39 2.052v-4.6q-.679 0-1.343-.141v3.62c-2.382 0-4.587-.76-6.388-2.05v9.388c0 4.697-3.794 8.504-8.474 8.504-1.746 0-3.369-.53-4.717-1.439A8.43 8.43 0 0 0 17.104 34c4.68 0 8.474-3.807 8.474-8.504zm1.656-4.641a6.42 6.42 0 0 1-1.656-3.754V7.12h-1.271a6.44 6.44 0 0 0 2.927 4.346M14.005 27.837a3.9 3.9 0 0 1-.79-2.355 3.883 3.883 0 0 1 5.051-3.707V17.07a8.5 8.5 0 0 0-1.341-.077v3.66a3.883 3.883 0 0 0-5.052 3.708 3.89 3.89 0 0 0 2.132 3.475"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        d: "M24.236 14.987a10.92 10.92 0 0 0 6.388 2.052v-3.622a6.4 6.4 0 0 1-3.391-1.951 6.44 6.44 0 0 1-2.927-4.346h-3.34v18.376a3.883 3.883 0 0 1-3.876 3.877 3.87 3.87 0 0 1-3.086-1.536 3.89 3.89 0 0 1-2.132-3.474 3.883 3.883 0 0 1 5.053-3.708v-3.661c-4.598.095-8.295 3.865-8.295 8.502a8.5 8.5 0 0 0 2.415 5.946 8.4 8.4 0 0 0 4.717 1.438c4.68 0 8.474-3.807 8.474-8.504z"
    })), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#00F2EA",
        d: "M30.624 13.417v-.979a6.37 6.37 0 0 1-3.391-.972c.9.99 2.086 1.672 3.391 1.951M24.306 7.12a7 7 0 0 1-.07-.528V6h-4.611v18.376a3.883 3.883 0 0 1-3.877 3.877c-.627 0-1.22-.15-1.743-.416a3.87 3.87 0 0 0 3.085 1.535 3.883 3.883 0 0 0 3.876-3.876V7.12zm-7.381 9.874v-1.043a8.5 8.5 0 0 0-1.163-.079c-4.68 0-8.474 3.808-8.474 8.504a8.5 8.5 0 0 0 3.757 7.066 8.5 8.5 0 0 1-2.415-5.946c0-4.637 3.697-8.407 8.295-8.502"
    })));
};
const __TURBOPACK__default__export__ = SvgTiktok;
}),
"[project]/src/svgs/instagram.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgInstagram = function SvgInstagram(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 40 40"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#000",
        d: "M20 3.605c5.343 0 5.97.023 8.083.119 1.953.087 3.009.413 3.715.69.937.366 1.604.794 2.303 1.493a6.1 6.1 0 0 1 1.492 2.303c.27.706.604 1.762.691 3.715.096 2.112.12 2.74.12 8.083s-.025 5.97-.12 8.083c-.087 1.953-.413 3.009-.69 3.715-.366.937-.794 1.604-1.493 2.303a6.1 6.1 0 0 1-2.303 1.492c-.706.27-1.762.604-3.715.691-2.112.096-2.74.12-8.083.12s-5.97-.024-8.083-.12c-1.953-.087-3.009-.413-3.715-.69-.937-.366-1.604-.794-2.303-1.493a6.1 6.1 0 0 1-1.492-2.303c-.27-.706-.604-1.762-.691-3.716-.096-2.111-.12-2.739-.12-8.082s.024-5.97.12-8.083c.087-1.953.413-3.009.69-3.715.366-.937.794-1.604 1.493-2.303a6.1 6.1 0 0 1 2.303-1.493c.706-.27 1.762-.603 3.715-.69 2.112-.104 2.748-.12 8.083-.12M20 0c-5.43 0-6.113.024-8.25.12-2.127.094-3.58.436-4.85.928-1.318.508-2.43 1.199-3.542 2.31C2.247 4.47 1.564 5.59 1.048 6.9.556 8.17.214 9.623.119 11.759.024 13.886 0 14.569 0 20s.024 6.113.12 8.25c.094 2.127.436 3.58.928 4.858.508 1.318 1.199 2.43 2.31 3.542C4.47 37.76 5.59 38.444 6.9 38.96c1.27.492 2.723.834 4.859.929 2.135.095 2.81.119 8.249.119s6.114-.024 8.25-.12c2.127-.094 3.58-.436 4.858-.928 1.318-.508 2.43-1.199 3.541-2.31 1.112-1.112 1.795-2.232 2.31-3.542.493-1.27.834-2.723.93-4.859.095-2.136.119-2.81.119-8.249s-.024-6.113-.12-8.25c-.095-2.127-.436-3.58-.928-4.858-.508-1.318-1.199-2.43-2.31-3.541-1.112-1.112-2.232-1.795-3.542-2.31-1.27-.493-2.723-.835-4.859-.93C26.114.024 25.431 0 20 0"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#000",
        d: "M20 9.734c-5.669 0-10.274 4.597-10.274 10.274A10.27 10.27 0 0 0 20 30.282a10.27 10.27 0 0 0 10.274-10.274A10.27 10.27 0 0 0 20 9.734m0 16.935A6.67 6.67 0 0 1 13.33 20 6.67 6.67 0 0 1 20 13.33 6.67 6.67 0 0 1 26.67 20 6.67 6.67 0 0 1 20 26.67M30.679 11.719a2.398 2.398 0 1 0 0-4.796 2.398 2.398 0 0 0 0 4.796"
    })));
};
const __TURBOPACK__default__export__ = SvgInstagram;
}),
"[project]/src/svgs/weibo.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2, _path3, _path4, _path5;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgWeibo = function SvgWeibo(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 64 64"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FEFEFE",
        fillRule: "evenodd",
        d: "M4.705 41.852c0 7.285 9.706 13.195 21.675 13.195s21.674-5.91 21.674-13.195c0-7.284-9.705-13.192-21.674-13.192-11.97 0-21.675 5.908-21.675 13.192",
        clipRule: "evenodd"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#D52C2B",
        fillRule: "evenodd",
        d: "M26.886 53.97c-10.596 1.023-19.74-3.658-20.43-10.46-.688-6.796 7.347-13.138 17.938-14.162 10.598-1.024 19.74 3.657 20.431 10.454.685 6.8-7.345 13.144-17.937 14.168m21.189-22.572c-.903-.263-1.522-.442-1.047-1.601 1.023-2.513 1.126-4.681.019-6.227-2.08-2.903-7.764-2.746-14.28-.078 0-.002-2.044.875-1.52-.71 1.003-3.152.848-5.79-.71-7.313-3.533-3.457-12.936.13-20.996 8.007C3.506 29.381 0 35.636 0 41.043 0 51.39 13.572 57.677 26.85 57.677c17.405 0 28.984-9.882 28.984-17.731 0-4.744-4.087-7.435-7.757-8.548",
        clipRule: "evenodd"
    })), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#E79115",
        fillRule: "evenodd",
        d: "M59.635 12.466C55.432 7.91 49.229 6.174 43.507 7.363c-1.325.278-2.169 1.55-1.886 2.843.28 1.294 1.584 2.12 2.908 1.842 4.073-.844 8.477.392 11.468 3.627a11.59 11.59 0 0 1 2.517 11.52c-.418 1.26.285 2.609 1.577 3.016 1.287.407 2.669-.28 3.088-1.539v-.009a16.28 16.28 0 0 0-3.544-16.197",
        clipRule: "evenodd"
    })), _path4 || (_path4 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#E79115",
        fillRule: "evenodd",
        d: "M53.179 18.16c-2.047-2.218-5.066-3.06-7.855-2.481a2.06 2.06 0 0 0-1.62 2.449c.243 1.109 1.364 1.825 2.5 1.582v.003a4.1 4.1 0 0 1 3.842 1.21 3.87 3.87 0 0 1 .838 3.86h.004a2.056 2.056 0 0 0 1.357 2.6c1.11.344 2.298-.246 2.655-1.331a7.92 7.92 0 0 0-1.721-7.891",
        clipRule: "evenodd"
    })), _path5 || (_path5 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#060101",
        fillRule: "evenodd",
        d: "M27.47 41.655c-.37.62-1.189.918-1.832.658-.63-.253-.83-.944-.468-1.554.367-.605 1.154-.901 1.785-.655.64.227.869.927.515 1.55m-3.374 4.237c-1.028 1.596-3.222 2.297-4.874 1.56-1.63-.724-2.11-2.582-1.085-4.139 1.01-1.554 3.133-2.244 4.773-1.572 1.66.694 2.189 2.536 1.186 4.151m3.847-11.31c-5.042-1.284-10.74 1.172-12.929 5.516-2.23 4.429-.073 9.345 5.02 10.954 5.275 1.663 11.495-.888 13.658-5.666 2.132-4.674-.53-9.487-5.749-10.804",
        clipRule: "evenodd"
    })));
};
const __TURBOPACK__default__export__ = SvgWeibo;
}),
"[project]/src/svgs/小红书.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2, _path3;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var Svg = function Svg(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FF2442",
        d: "M1021.724 836.549V187.488c0-101.872-83.34-185.212-185.212-185.212H187.488C85.616 2.276 2.276 85.616 2.276 187.488v649.06c0 100.853 81.701 183.574 182.226 185.176h654.996c100.488-1.602 182.226-84.286 182.226-185.175"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FFF",
        d: "M726.521 366.364h57.344V386.9c0 1.638.801 2.403 2.367 2.367 34.006-1.02 68.266.072 85.816 34.952 10.449 20.68 8.3 52.138 7.718 76.823-.036 1.456.656 2.257 2.04 2.403 4.004.364 7.9.728 11.686 1.201 67.612 8.12 54.25 71.872 54.468 121.97.11 17.476-1.857 30.256-5.825 38.412-8.374 16.893-23.375 26.578-45.002 28.981h-42.161l-21.554-50.026a1.64 1.64 0 0 1 .109-1.529 1.57 1.57 0 0 1 1.31-.728l45.73-.037c2.549 0 4.952-1.092 6.7-2.985a10.12 10.12 0 0 0 2.694-7.027c-.219-15.292-.328-30.547-.255-45.802 0-13.727-6.481-20.753-19.552-21.118-14.782-.364-42.78-.364-84.031.073-1.457 0-2.185.801-2.185 2.367l-.218 126.812h-57.272l-.182-127.358a2.257 2.257 0 0 0-2.22-2.33h-53.522a2.55 2.55 0 0 1-2.476-2.549l.073-55.414c0-1.857.874-2.804 2.622-2.804l52.902.11a2.51 2.51 0 0 0 1.82-.802 2.77 2.77 0 0 0 .728-1.893v-47.914a3.17 3.17 0 0 0-3.058-3.24l-32.659.145c-1.71 0-2.548-.91-2.548-2.694l-.11-55.706c0-1.638.729-2.439 2.367-2.439h33.824c1.456 0 2.184-.728 2.184-2.294l.365-20.462zm59.383 137.371 35.572-.073c.582 0 1.128-.254 1.529-.691a2.3 2.3 0 0 0 .619-1.602l-.182-44.528c0-3.496-2.549-6.336-5.644-6.336l-28.544.073a5.35 5.35 0 0 0-4.005 1.893 6.8 6.8 0 0 0-1.639 4.552l.182 44.528c0 1.238.983 2.184 2.112 2.184m-367.948 4.005c-13.836.255-38.848 4.114-44.31-13.69-3.313-10.631 4.187-25.45 8.738-35.826a5988 5988 0 0 0 38.157-88.91c.51-1.202 1.383-1.82 2.621-1.82h54.723c.473 0 .874.254 1.092.654a1.46 1.46 0 0 1 .146 1.311l-31.676 74.02c-.728 1.71-.546 3.64.4 5.242a5.17 5.17 0 0 0 4.37 2.476h46.894c.583 0 1.093.291 1.42.765.291.51.364 1.092.11 1.638a32970 32970 0 0 1-40.524 94.044c-1.347 3.095-1.93 5.389-1.71 6.845.472 3.168 2.256 4.77 5.315 4.806l29.673.182c1.711.037 2.257.874 1.566 2.549l-19.188 45.147a3.79 3.79 0 0 1-3.64 2.512c-30.147.364-51.228.364-63.243-.182-19.88-.91-24.758-18.314-17.04-36.263l27.27-63.643a1.38 1.38 0 0 0-.108-1.238 1.24 1.24 0 0 0-1.093-.619zM190.582 694.008h-21.48l-21.045-49.407a1.6 1.6 0 0 1 .109-1.493 1.46 1.46 0 0 1 1.238-.728l29.71-.073a6.954 6.954 0 0 0 6.808-7.1l.801-262.034a2.55 2.55 0 0 1 2.512-2.622h51.118c2.403 0 3.605 1.275 3.641 3.787.219 88.728.219 175.928 0 261.634-.145 35.171-16.457 59.201-53.412 58.036"
    })), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FFF",
        d: "M670.087 694.008H476.174l25.996-58.618a3.46 3.46 0 0 1 3.386-2.221l47.477.073c1.675 0 2.548-.838 2.548-2.549V452.836q0-2.294-2.184-2.294l-31.494-.037c-1.42 0-2.548-1.238-2.548-2.73v-57.053c0-.874.655-1.602 1.492-1.602h128.378c1.602 0 2.367.837 2.367 2.512l.072 56.434c0 1.638-.8 2.476-2.402 2.476h-31.749q-2.185 0-2.185 2.294v177.748c0 1.711.838 2.548 2.44 2.548l50.317.11q2.075 0 2.075 2.184l-.073 58.618zM901.03 394.654c39.613-27.234 67.502 42.198 24.103 54.104-7.064 1.966-18.314 2.075-33.715.364-1.384-.146-2.039-.91-2.039-2.367-.218-16.384-3.459-41.724 11.651-52.064zM354.204 598.8l-26.215 61.057c-2.366 5.462-4.951 5.571-7.827.437-19.297-34.88-25.85-63.351-29.637-106.714-2.913-33.678-5.425-67.356-7.61-101.108q-.109-2.293 2.076-2.293l53.12.036c1.493 0 2.33.801 2.44 2.33 2.73 39.25 5.607 78.389 8.592 117.419.765 10.049 2.476 18.386 5.097 25.013a4.73 4.73 0 0 1-.036 3.823m-279.11-2.258v-2.512a25.7 25.7 0 0 0 4.732-11.505 3997 3997 0 0 0 9.649-129.943c.11-1.347.764-2.04 2.039-2.04h54.249c.473 0 .947.22 1.31.62.328.364.51.874.474 1.383a7226 7226 0 0 1-9.576 119.676c-2.548 28.945-11.796 67.684-31.13 91.168-1.237 1.493-2.293 1.347-3.094-.473zm369.986 97.467h-78.57l-10.012-3.969c-1.42-.546-1.82-1.529-1.165-2.949l24.648-56.433c.729-1.639 1.894-2.258 3.568-1.82 26.943 7.317 58.145 4.295 85.707 4.405 1.711.036 2.184.873 1.456 2.475l-25.632 58.255z"
    })));
};
const __TURBOPACK__default__export__ = Svg;
}),
"[project]/src/svgs/知乎.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var Svg = function Svg(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#06F",
        d: "m656.906 724.29 47.422-33.725h52.69V344.9h-143.32v346.726h35.83z"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#06F",
        d: "M849.92 51.2H174.08c-67.866 0-122.88 55.014-122.88 122.88v675.84c0 67.866 55.014 122.88 122.88 122.88h675.84c67.866 0 122.88-55.014 122.88-122.88V174.08c0-67.866-55.014-122.88-122.88-122.88M495.662 803.348l-101.171-157.05 44.267-31.616 67.451 98.007c-.005 0 23.179 37.995-10.547 90.66m38.994-276.1v25.292H408.197C357.612 876.068 204.8 807.045 204.8 807.045 344.965 697.18 347.597 552.54 347.597 552.54H208.492c0-57.958 52.162-56.914 52.162-56.914h93.793V343.87h-50.585c-18.965 85.366-99.062 81.152-99.062 81.152s32.67-50.585 54.8-137c22.128-86.421 89.574-76.929 89.574-76.929-20.02 35.83-29.507 76.928-29.507 76.928H485.12c40.049 0 37.94 25.293 37.94 25.293v29.512H411.355v152.806h91.684c33.725 0 31.616 31.616 31.616 31.616M819.2 747.5H716.974l-88.52 55.848-8.427-55.848h-64.292V288.015H819.2z"
    })));
};
const __TURBOPACK__default__export__ = Svg;
}),
"[project]/src/svgs/哔哩哔哩.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2, _path3, _path4, _path5, _path6, _path7, _path8;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var Svg = function Svg(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EC5D85",
        d: "M184.32 0h655.36Q1024 0 1024 184.32v655.36Q1024 1024 839.68 1024H184.32Q0 1024 0 839.68V184.32Q0 0 184.32 0"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EF85A7",
        d: "M512 241.961h52.224l65.065-96.317c49.633-50.32 89.64.43 63.857 45.71l-34.315 51.508C916.48 247.89 916.48 285.87 916.48 567.9c0 325.95 0 336.466-404.48 336.466S107.52 893.85 107.52 567.9c0-277.698 0-318.802 253.143-324.956l-39.434-58.368c-31.263-54.907 37.335-90.409 64.686-42.373l60.416 99.81c18.186-.052 41.185-.052 65.669-.052"
    })), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EC5D85",
        d: "M512 338.586c332.8 0 332.8 0 332.8 240.64s0 248.391-332.8 248.391-332.8-7.751-332.8-248.391 0-240.64 332.8-240.64"
    })), _path4 || (_path4 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EF85A7",
        d: "M281.6 558.08a30.72 30.72 0 0 1-27.474-16.978 30.72 30.72 0 0 1 13.732-41.216l122.88-61.44a30.72 30.72 0 0 1 41.216 13.742 30.72 30.72 0 0 1-13.742 41.216l-122.88 61.44a30.6 30.6 0 0 1-13.732 3.236m471.04 0a30.6 30.6 0 0 1-12.851-2.836l-133.12-61.44a30.72 30.72 0 0 1-15.043-40.756 30.72 30.72 0 0 1 40.766-15.022l133.12 61.44a30.72 30.72 0 0 1-12.872 58.614m-297.984 108.8a15.36 15.36 0 0 1-12.288-6.195 15.36 15.36 0 0 1 3.072-21.494l68.506-50.913 50.35 52.623a15.36 15.36 0 0 1-22.2 21.238l-31.591-33.024-46.715 34.724a15.3 15.3 0 0 1-9.134 3.041"
    })), _path5 || (_path5 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FFF",
        d: "M65.536 369.316c15.032 101.908 32.85 147.18 44.544 355.328 14.633 2.181 177.705 10.045 204.052-74.63a16.15 16.15 0 0 0 1.65-10.874c-30.608-80.333-169.217-60.416-169.217-60.416s-10.363-146.504-11.5-238.838zm296.714 13.721 34.816 303.176h34.642l-26.47-305.08zM309.524 536.29h45.487l16.097 158.618-31.826 1.853zm137.34 6.697h45.803v162.345h-33.874zm-150.262-85.012h21.391l5.274 58.992-18.914 2.263zm30.392 0h21.391l2.54 55.808-17.408 1.618zm143.626 1.915h19.456v62.28H470.62zm-30.382 0h22.2v62.28h-16.63z"
    })), _path6 || (_path6 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EB5480",
        d: "M243.569 645.52a275.5 275.5 0 0 1-28.468 23.746 243 243 0 0 1-29.532 17.52 2.703 2.703 0 0 1-4.403-1.955 259 259 0 0 1-5.12-29.573c-1.413-12.186-1.956-25.682-2.16-36.363 0-.307 0-2.508 3.01-1.904a246 246 0 0 1 34.222 9.574 257 257 0 0 1 32.358 15.176c.523.256 2.52 1.485.093 3.778"
    })), _path7 || (_path7 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FFF",
        d: "M513.29 369.316c15.033 101.908 32.85 147.18 44.544 355.328 14.633 2.181 177.705 10.045 204.053-74.63a16.15 16.15 0 0 0 1.648-10.874c-30.607-80.333-169.216-60.416-169.216-60.416s-10.363-146.504-11.5-238.838zm296.714 13.721 34.816 303.176h34.642l-26.47-305.08zM757.28 536.29h45.486l16.097 158.618-31.826 1.853zm137.339 6.697h45.803v162.345h-33.874zm-150.262-85.012h21.391l5.274 58.992-18.913 2.263zm30.392 0h21.392l2.539 55.808-17.408 1.618zm143.626 1.915h19.456v62.28h-19.456zm-30.382 0h22.2v62.28h-16.63z"
    })), _path8 || (_path8 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#EB5480",
        d: "M691.323 645.52a275.5 275.5 0 0 1-28.467 23.746 243 243 0 0 1-29.532 17.52 2.703 2.703 0 0 1-4.404-1.955 259 259 0 0 1-5.12-29.573c-1.413-12.186-1.956-25.682-2.16-36.363 0-.307 0-2.508 3.01-1.904a246 246 0 0 1 34.222 9.574 257 257 0 0 1 32.359 15.176c.522.256 2.519 1.485.092 3.778"
    })));
};
const __TURBOPACK__default__export__ = Svg;
}),
"[project]/src/svgs/qq.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path, _path2, _path3, _path4, _path5, _path6;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgQq = function SvgQq(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#F0AB1B",
        d: "M619.457 875.005c-35.217 0-66.822.903-92.106 3.612-25.284-2.709-56.889-3.612-92.106-3.612-102.039 0-193.241 38.83-193.241 67.725 0 27.993 75.851 24.381 176.987 23.478 40.635 0 78.561-4.515 109.263-11.739 29.799 6.321 66.822 10.836 106.554 10.836 102.039.903 176.987 4.515 176.987-23.478s-90.3-66.822-192.338-66.822m0 0"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#040000",
        d: "M873.2 596.882c-18.964-52.374-40.636-103.845-63.21-154.413.902-12.642 1.805-24.38 1.805-37.023 0-194.144-99.33-351.266-288.056-351.266S235.683 211.302 235.683 405.446c0 11.74.903 23.478 1.806 35.217-23.478 51.471-44.247 103.845-64.113 157.122-39.732 107.457-41.538 204.98-27.993 212.204 9.933 5.418 46.053-32.508 79.464-93.008 22.575 143.576 118.292 251.033 297.989 251.033s275.414-106.554 297.99-250.13c34.313 59.597 69.53 96.62 79.463 91.202 14.448-7.224 12.642-104.747-27.09-212.204m0 0"
    })), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#FFF",
        d: "M450.596 167.958c-27.993.903-49.665 33.41-48.762 73.143.903 39.731 23.478 71.336 51.471 71.336 27.993-.903 49.665-33.41 48.762-73.142s-23.478-71.337-51.47-71.337m153.51.903c-27.993-.903-51.471 30.702-52.374 70.434s21.672 72.24 49.665 72.24c27.993.902 51.47-30.703 52.374-70.434 0-38.83-21.672-71.337-49.665-72.24m104.748 318.758c-54.18 9.03-117.39 14.448-184.212 14.448-65.919 0-127.323-5.418-180.6-14.448-37.023 46.956-39.732 114.68-39.732 189.63 0 138.158 78.561 250.13 223.041 250.13s223.04-111.972 223.04-250.13c-.902-75.852-3.611-143.577-41.537-189.63m0 0"
    })), _path4 || (_path4 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#F0AB1B",
        d: "M526.448 335.915c-97.524 0-176.085 19.866-176.085 35.217s102.942 58.695 176.085 58.695 176.085-44.247 176.085-58.695-78.561-35.217-176.085-35.217m0 0"
    })), _path5 || (_path5 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#DB2921",
        d: "M807.28 438.857v-.903c-71.336 23.478-172.472 37.926-283.541 37.926-111.972 0-213.108-14.448-284.444-38.829-15.351 34.314-29.8 67.725-43.344 102.942 44.247 14.448 93.008 26.187 146.285 34.314v130.935s37.926 7.224 73.143 8.127c25.284.903 51.471-3.612 51.471-3.612V586.949c18.06.903 37.023.903 55.986.903 122.808 0 235.683-18.06 326.885-47.86-12.642-33.41-27.09-66.82-42.44-101.135m0 0"
    })), _path6 || (_path6 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#040000",
        d: "M466.85 218.526c-12.642 0-22.575 12.642-22.575 28.896 0 16.253 9.933 28.895 22.575 28.895s22.575-12.642 22.575-28.895c0-16.254-9.933-28.896-22.575-28.896m162.54 18.06s-9.03-10.836-31.605-8.127c-21.672 2.709-30.702 15.35-32.508 17.157 0 0-5.418 7.224-1.806 11.738 3.612 4.515 10.836-2.708 10.836-2.708s9.933-12.642 23.478-12.642 20.769 5.418 20.769 5.418 6.32 4.515 10.836 0c4.515-5.418 0-10.836 0-10.836m0 0"
    })));
};
const __TURBOPACK__default__export__ = SvgQq;
}),
"[project]/src/app/(home)/social-buttons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SocialButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$github$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/github.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$juejin$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/juejin.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$email$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/email.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$x$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/x.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$tg$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/tg.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$wechat$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/wechat.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$facebook$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/facebook.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$tiktok$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/tiktok.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$instagram$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/instagram.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$weibo$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/weibo.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_5c0f$$_7ea2$$_4e66$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/小红书.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_77e5$$_4e4e$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/知乎.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_54d4$$_54e9$$_54d4$$_54e9$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/哔哩哔哩.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$qq$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/qq.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
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
;
;
function SocialButtons() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { maxSM, init } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const styles = cardStyles.socialButtons;
    const hiCardStyles = cardStyles.hiCard;
    const order = maxSM && init ? 0 : styles.order;
    const delay = maxSM && init ? 0 : 100;
    const sortedButtons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const buttons = siteContent.socialButtons || [];
        return [
            ...buttons
        ].sort((a, b)=>a.order - b.order);
    }, [
        siteContent.socialButtons
    ]);
    const [showStates, setShowStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [openDropdowns, setOpenDropdowns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const dropdownRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const buttonRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const baseDelay = order * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1000;
        sortedButtons.forEach((button, index)=>{
            const showDelay = baseDelay + index * delay;
            setTimeout(()=>{
                setShowStates((prev)=>({
                        ...prev,
                        [button.id]: true
                    }));
            }, showDelay);
        });
        setTimeout(()=>{
            setShowStates((prev)=>({
                    ...prev,
                    container: true
                }));
        }, baseDelay);
    }, [
        order,
        delay,
        sortedButtons
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (e)=>{
            const target = e.target;
            Object.keys(openDropdowns).forEach((buttonId)=>{
                if (openDropdowns[buttonId]) {
                    const buttonRef = buttonRefs.current[buttonId];
                    const dropdownRef = dropdownRefs.current[buttonId];
                    if (buttonRef && !buttonRef.contains(target) && dropdownRef && !dropdownRef.contains(target)) {
                        setOpenDropdowns((prev)=>({
                                ...prev,
                                [buttonId]: false
                            }));
                    }
                }
            });
        };
        if (Object.values(openDropdowns).some(Boolean)) {
            document.addEventListener('mousedown', handleClickOutside);
            return ()=>{
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [
        openDropdowns
    ]);
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - styles.width;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    if (!showStates.container) return null;
    const iconMap = {
        github: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$github$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        juejin: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$juejin$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$email$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        wechat: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$wechat$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        x: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$x$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        tg: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$tg$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        facebook: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$facebook$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        tiktok: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$tiktok$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        instagram: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$instagram$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        weibo: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$weibo$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        xiaohongshu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_5c0f$$_7ea2$$_4e66$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        zhihu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_77e5$$_4e4e$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        bilibili: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f_54d4$$_54e9$$_54d4$$_54e9$$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        qq: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$qq$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        link: ()=>null
    };
    const renderButton = (button)=>{
        if (!showStates[button.id]) return null;
        const commonProps = {
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
            }
        };
        const Icon = iconMap[button.type];
        const hasLabel = Boolean(button.label);
        const iconSize = hasLabel ? 'size-6' : 'size-8';
        if (button.type === 'github') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
                href: button.value,
                target: "_blank",
                ...commonProps,
                className: `font-averia flex items-center gap-2 rounded-xl border bg-[#070707] text-xl text-white ${!hasLabel ? 'p-1.5' : 'px-3 py-1.5'}`,
                style: {
                    boxShadow: ' inset 0 0 12px rgba(255, 255, 255, 0.4)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: 'size-8'
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/social-buttons.tsx",
                        lineNumber: 153,
                        columnNumber: 6
                    }, this),
                    hasLabel && button.label
                ]
            }, button.id, true, {
                fileName: "[project]/src/app/(home)/social-buttons.tsx",
                lineNumber: 146,
                columnNumber: 5
            }, this);
        }
        if (button.type === 'email' || button.type === 'wechat' || button.type === 'qq') {
            const messageMap = {
                email: '邮箱已复制到剪贴板',
                wechat: '微信号已复制到剪贴板',
                qq: 'QQ号已复制到剪贴板'
            };
            const isImagePath = button.value.startsWith('/images/social-buttons/');
            const isOpen = openDropdowns[button.id] || false;
            if (isImagePath && (button.type === 'wechat' || button.type === 'qq')) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            ref: (el)=>{
                                buttonRefs.current[button.id] = el;
                            },
                            onClick: ()=>{
                                setOpenDropdowns((prev)=>({
                                        ...prev,
                                        [button.id]: !prev[button.id]
                                    }));
                            },
                            ...commonProps,
                            className: "card btn relative rounded-xl p-1.5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "size-8"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/social-buttons.tsx",
                                lineNumber: 181,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/social-buttons.tsx",
                            lineNumber: 172,
                            columnNumber: 7
                        }, this),
                        ("TURBOPACK compile-time value", "undefined") !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        onClick: ()=>setOpenDropdowns((prev)=>({
                                                    ...prev,
                                                    [button.id]: false
                                                })),
                                        className: "fixed inset-0 z-40"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/social-buttons.tsx",
                                        lineNumber: 188,
                                        columnNumber: 12
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        ref: (el)=>{
                                            dropdownRefs.current[button.id] = el;
                                        },
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
                                            duration: 0.2
                                        },
                                        className: "bg-card fixed z-50 rounded-2xl border p-4 backdrop-blur-xl",
                                        style: {
                                            top: buttonRefs.current[button.id] ? `${buttonRefs.current[button.id].getBoundingClientRect().bottom + 8}px` : '0px',
                                            left: buttonRefs.current[button.id] ? `${buttonRefs.current[button.id].getBoundingClientRect().left}px` : '0px',
                                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: button.value,
                                            alt: "QR Code",
                                            className: "h-48 w-48 rounded-lg object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/social-buttons.tsx",
                                            lineNumber: 209,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/social-buttons.tsx",
                                        lineNumber: 195,
                                        columnNumber: 12
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/social-buttons.tsx",
                            lineNumber: 185,
                            columnNumber: 9
                        }, this), document.body)
                    ]
                }, button.id, true, {
                    fileName: "[project]/src/app/(home)/social-buttons.tsx",
                    lineNumber: 171,
                    columnNumber: 6
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: ()=>{
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(button.value).then(()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(messageMap[button.type]);
                        });
                    } else {
                        // 降级方案：使用传统的复制方法
                        const textArea = document.createElement('textarea');
                        textArea.value = button.value;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-9999px';
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(messageMap[button.type]);
                        } catch (err) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('复制失败，请手动复制');
                        }
                        document.body.removeChild(textArea);
                    }
                },
                ...commonProps,
                className: "card btn relative rounded-xl p-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "size-8"
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/social-buttons.tsx",
                    lineNumber: 247,
                    columnNumber: 6
                }, this)
            }, button.id, false, {
                fileName: "[project]/src/app/(home)/social-buttons.tsx",
                lineNumber: 221,
                columnNumber: 5
            }, this);
        }
        if (button.type === 'link') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
                href: button.value,
                target: "_blank",
                ...commonProps,
                className: "card relative flex items-center gap-2 rounded-xl px-3 py-2.5 font-medium whitespace-nowrap",
                children: hasLabel ? button.label : button.value
            }, button.id, false, {
                fileName: "[project]/src/app/(home)/social-buttons.tsx",
                lineNumber: 254,
                columnNumber: 5
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
            href: button.value,
            target: "_blank",
            ...commonProps,
            className: `card relative rounded-xl font-medium whitespace-nowrap ${hasLabel ? 'flex items-center gap-2 px-3 py-2.5' : 'p-1.5'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: iconSize
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/social-buttons.tsx",
                    lineNumber: 272,
                    columnNumber: 5
                }, this),
                hasLabel && button.label
            ]
        }, button.id, true, {
            fileName: "[project]/src/app/(home)/social-buttons.tsx",
            lineNumber: 266,
            columnNumber: 4
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "socialButtons",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute max-sm:static",
            animate: {
                left: x,
                top: y
            },
            initial: {
                left: x,
                top: y
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 flex flex-row-reverse items-center gap-3 max-sm:static",
                style: {
                    width: styles.width
                },
                children: sortedButtons.map((button)=>renderButton(button))
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/social-buttons.tsx",
                lineNumber: 281,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(home)/social-buttons.tsx",
            lineNumber: 280,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/social-buttons.tsx",
        lineNumber: 279,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/share/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"name":"iLoveIMG","url":"https://www.iloveimg.com/zh-cn","logo":"/images/share/7e91e93e3cdd586b.svg","description":"免费图片处理网站，我经常用来压缩图片，压缩效果会比 Tinypng 更好。链式处理功能非常好用。","tags":["图片"],"stars":4},{"name":"TinyPNG","url":"https://tinypng.com/","logo":"https://tinypng.com/static/images/george-anim/large_george_x2.webp","description":"国际上比较出名的压缩图片工具，过去的书本中知晓的这个网站，但是有图片大小限制，也有数量限制。挺好的压缩图片替代品。","tags":["图片"],"stars":3},{"name":"removebg","url":"https://www.remove.bg/zh","logo":"/images/share/859bfb2ef1c6a503.svg","description":"AI 抠图工具，特点是界面简洁，效果比 windows 自带的去除背景会更好一些，缺点是有免费有导出大小限制","tags":["图片","AI"],"stars":3},{"name":"Neumorphism","url":"https://neumorphism.io/","logo":"https://neumorphism.io/apple-touch-icon.png","description":"Neumorphism 是一种极具鲜明特色的设计风格，总能给新人一种惊叹感。但是应用并不广泛，实际开发也会有很多不好的点。更多是做一个留念。","tags":["CSS","Github"],"stars":2},{"name":"Nucleo","url":"https://nucleoapp.com/app/?library=core","logo":"/images/share/7e720f35557fa9de.svg","description":"图标库，网站整体很干净。独特的是，它有一类像素风格的图标，很有意思。它的 icon 也很多，还有 grass 风格的。","tags":["Icons"],"stars":3},{"name":"Loadership","url":"https://www.loadership.com/","logo":"https://www.loadership.com/loadership_logo_round.svg","description":"13种 Loader 样式，在线调整使用。在 AI 时代可能意义小很多了。","tags":["CSS","Github"],"stars":3},{"name":"CSS Buttons","url":"https://cssbuttons.io/","logo":"/images/share/2b8118a3645967ee.svg","description":"有不少按钮样式。跟 Neumorphism 有一些关系。","tags":["CSS"],"stars":2},{"name":"Uiverse","url":"https://uiverse.io/","logo":"/images/share/5e7b29cb1a84be80.png","description":"不可错过的参考库，有很多交互效果，包括热门的 Button、Loader 设计，内容丰富，还在不断更新。","tags":["CSS"],"stars":4},{"name":"Magic UI","url":"https://magicui.design/","logo":"https://magicui.design/favicon.ico","description":"shadcn/ui 伴生库，有很多实用设计。取用也很方便，可以自己复制独立的代码。","tags":["组件","Github"],"stars":4},{"name":"Ai lman","url":"https://aliimam.in/docs/backgrounds/shader-rgb","logo":"https://aliimam.in/_next/image?url=%2Fai-logo-black.png&w=128&q=75","description":"类 Magic UI，但是感觉差点意思。可作为看完 Magic 意犹未尽时闲看。","tags":["组件"],"stars":3},{"name":"Awwwards","url":"https://www.awwwards.com/","logo":"https://assets.awwwards.com/assets/images/favicon.svg","description":"网站评选网站，你总能从这里发现惊艳的网站","tags":["网站集"],"stars":3},{"name":"CSS Design Awards","url":"https://www.cssdesignawards.com/","logo":"/images/share/aaae2bf4f74c8eb1.svg","description":"网站评选网站，跟 Awwwards 类似，可以看到每期的优秀网站。观感上会好些。","tags":["网站集"],"stars":3},{"name":"404s.design","logo":"/images/share/5c9a8b7deb717c5f.svg","url":"https://www.404s.design/","description":"收集 404 设计的网站，无聊的时候可以看下。","tags":["网站集"],"stars":3},{"name":"Igloo Inc.","logo":"https://www.igloo.inc/assets/favicon32-af94112f.png","url":"https://www.igloo.inc/","description":"abeto 作品，非常酷炫","tags":["3D"],"stars":4},{"name":"abeto 官网","logo":"https://abeto.co/assets/favicon32-11fb90a3.png","url":"https://abeto.co/","description":"无限绽开的花，飘荡的树叶，复古风格化","tags":["3D"],"stars":4},{"name":"Messenger","logo":"https://messenger.abeto.co/assets/favicon32-BC0QIL61.png","url":"https://messenger.abeto.co/","description":"abeto 作品，卡通送信员在地球小镇上奔跑，联机在线，可换装","tags":["3D"],"stars":4},{"name":"Summer Afternoon","logo":"https://summer-afternoon.vlucendo.com/assets/favicon32-e817b074.png","url":"https://summer-afternoon.vlucendo.com/","description":"夏日午后，小男孩在乡村公路上上游玩","tags":["3D"],"stars":4},{"name":"The Monolith Project","logo":"https://themonolithproject.net/assets/images-next/nose_logo.webp","url":"https://themonolithproject.net/","description":"奇幻宇宙的动画演绎，像看电影一样。“跨越多星之际，一座沉默的巨石碑悄然苏醒。“巨石碑计划”：每一次触碰，皆可重写现实。”","tags":["3D"],"stars":5},{"name":"Making Software","logo":"https://www.makingsoftware.com/favicon.ico","url":"https://www.makingsoftware.com/","description":"面向软件设计和开发人员的参考手册。样式很棒的学习网站。","tags":["学习"],"stars":4},{"name":"Ease 函数参考","logo":"https://easings.net/96.8aa68ac4.png","url":"https://easings.net/","description":"当你在调整动画节奏时，这个 ease 表能帮助直观感受 ease 表现出的效果","tags":["Github"],"stars":3},{"name":"Isocons","logo":"/images/share/97859f1c57799dd2.png","url":"https://www.isocons.app/","description":"3D icons 网站，酷酷的，免费。","tags":["Icons"],"stars":3},{"name":"Webp 转换压缩","logo":"/images/avatar.png","url":"https://eagle-a.github.io/image-toolbox","description":"无限压缩，快且方便，可以直接对比效果","tags":["图片"],"stars":3},{"name":"WoraWork","logo":"https://worawork.vercel.app/Icons/worawork.webp","url":"https://worawork.vercel.app/","description":"方格世界的 Web3D，场景渲染非常棒，非常值得体验","tags":["3D"],"stars":3}]);}),
"[project]/src/app/(home)/share-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/share/list.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
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
function ShareCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const randomItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const randomIndex = Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__["default"].length);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$share$2f$list$2e$json__$28$json$29$__["default"][randomIndex];
    }, []);
    const styles = cardStyles.shareCard;
    const hiCardStyles = cardStyles.hiCard;
    const socialButtonsStyles = cardStyles.socialButtons;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + socialButtonsStyles.height + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "shareCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-12.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 120,
                            left: -12,
                            top: -12,
                            opacity: 0.8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/share-card.tsx",
                        lineNumber: 40,
                        columnNumber: 7
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-secondary text-sm",
                    children: "随机推荐"
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/share-card.tsx",
                    lineNumber: 49,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/share",
                    className: "mt-2 block space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: randomItem.logo,
                                        alt: randomItem.name,
                                        className: "h-full w-full object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/share-card.tsx",
                                        lineNumber: 54,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/share-card.tsx",
                                    lineNumber: 53,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium",
                                    children: randomItem.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/share-card.tsx",
                                    lineNumber: 56,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(home)/share-card.tsx",
                            lineNumber: 52,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-secondary line-clamp-3 text-xs",
                            children: randomItem.description
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/share-card.tsx",
                            lineNumber: 59,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/share-card.tsx",
                    lineNumber: 51,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/share-card.tsx",
            lineNumber: 37,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/share-card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this);
}
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
"[project]/src/hooks/use-blog-index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogIndex",
    ()=>useBlogIndex,
    "useLatestBlog",
    ()=>useLatestBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
;
;
// 改进 fetcher，抛出状态码以便处理 404
const fetcher = async (url)=>{
    const res = await fetch(url, {
        cache: 'no-store'
    });
    if (!res.ok) {
        const error = new Error('Fetch failed');
        error.status = res.status;
        throw error;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
};
function useBlogIndex() {
    const { isAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { data, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('/blogs/index.json', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });
    let result = data || [];
    if (!isAuth) {
        result = result.filter((item)=>!item.hidden);
    }
    return {
        items: result,
        loading: isLoading,
        error
    };
}
function useLatestBlog() {
    const { items, loading, error } = useBlogIndex();
    const latestBlog = items.length > 0 ? items.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null;
    return {
        blog: latestBlog,
        loading,
        error
    };
}
}),
"[project]/src/app/(home)/aritcle-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticleCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$blog$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-blog-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
function ArticleCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { blog, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$blog$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestBlog"])();
    const styles = cardStyles.articleCard;
    const hiCardStyles = cardStyles.hiCard;
    const socialButtonsStyles = cardStyles.socialButtons;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] - styles.width;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "articleCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            className: "space-y-2 max-sm:static",
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-9.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 140,
                            left: -12,
                            top: -16,
                            opacity: 0.8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                        lineNumber: 26,
                        columnNumber: 7
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-secondary text-sm",
                    children: "最新文章"
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                    lineNumber: 35,
                    columnNumber: 5
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-[60px] items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-secondary text-xs",
                        children: "加载中..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                        lineNumber: 39,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                    lineNumber: 38,
                    columnNumber: 6
                }, this) : blog ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: `/blog/${blog.slug}`,
                    className: "flex transition-opacity hover:opacity-80",
                    children: [
                        blog.cover ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: blog.cover,
                            alt: "cover",
                            className: "mr-3 h-12 w-12 shrink-0 rounded-xl border object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                            lineNumber: 44,
                            columnNumber: 8
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-secondary mr-3 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/60",
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                            lineNumber: 46,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "line-clamp-1 text-sm font-medium",
                                    children: blog.title || blog.slug
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                                    lineNumber: 49,
                                    columnNumber: 8
                                }, this),
                                blog.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-secondary mt-1 line-clamp-3 text-xs",
                                    children: blog.summary
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                                    lineNumber: 50,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-secondary mt-3 text-xs",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(blog.date).format('YYYY/M/D')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                                    lineNumber: 51,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                            lineNumber: 48,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                    lineNumber: 42,
                    columnNumber: 6
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-[60px] items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-secondary text-xs",
                        children: "暂无文章"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                        lineNumber: 56,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/aritcle-card.tsx",
                    lineNumber: 55,
                    columnNumber: 6
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/aritcle-card.tsx",
            lineNumber: 23,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/aritcle-card.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/svgs/pen.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgPen = function SvgPen(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        fill: "none"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        d: "M14.1 11.972c.096-1.814-.367-3.728-1.513-4.922-2.035-2.133-3.375-3.932-4.597-5.493-.444-.566-1.293-.759-2.094-.304-.801.457-1.044 1.266-.812 1.951.554 1.63 1.446 3.746 2.37 6.75.485 1.574 1.735 2.889 3.444 3.929zM9.783 5.373c.052.074.07.165.048.258a.395.395 0 0 1-.397.302.324.324 0 0 1-.262-.133L6.83 2.572c-.108-.152-.064-.374.103-.492a.4.4 0 0 1 .309-.064c.08.016.15.061.199.127zM11.573 15.162c.067.123.186.2.319.23s.281.009.412-.07l2.388-1.424c.267-.152.368-.472.23-.715-.14-.243-.466-.315-.733-.163l-2.388 1.43c-.266.15-.37.469-.228.712M6.634 23c-.234 0-.422-.356-.422-.799 0-.438.188-.798.422-.798h7.294c.231 0 .42.356.42.798s-.189.799-.42.799zM12.924 19.643c.849 1.45 3.823 1.008 5.067 3.14l.216-.125-1.9-3.257c-.448.07-.936-.158-1.202-.611-.33-.569-.185-1.27.331-1.562.514-.293 1.199-.07 1.532.5.274.468.218 1.021-.093 1.368l1.892 3.244.237-.135c-1.242-2.13.627-4.454-.22-5.907-.857-1.466-2.706-1.64-4.322-.716-1.62.923-2.407 2.571-1.538 4.06"
    })));
};
const __TURBOPACK__default__export__ = SvgPen;
}),
"[project]/src/svgs/dots.svg.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgDots = function SvgDots(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 32"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        fillOpacity: 0.8,
        d: "M16 23.333a2 2 0 1 1 0 4.001 2 2 0 0 1 0-4m9.333 0a2 2 0 1 1 0 4.001 2 2 0 0 1 0-4m-18.666 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4M16 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4m9.333 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4M6.667 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4M16 4.667a2 2 0 1 1 0 4 2 2 0 0 1 0-4m9.333 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4m-18.666 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4"
    })));
};
const __TURBOPACK__default__export__ = SvgDots;
}),
"[project]/src/app/(home)/write-buttons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$pen$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/pen.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$dots$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/dots.svg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
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
function WriteButton() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, setConfigDialogOpen, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const styles = cardStyles.writeButtons;
    const hiCardStyles = cardStyles.hiCard;
    const clockCardStyles = cardStyles.clockCard;
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>setShow(true), styles.order * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1000);
    }, [
        styles.order
    ]);
    if (maxSM) return null;
    if (!show) return null;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + hiCardStyles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset - styles.height - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] / 2 - clockCardStyles.height;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "writeButtons",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                left: x,
                top: y
            },
            animate: {
                left: x,
                top: y
            },
            className: "absolute flex items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                    onClick: ()=>router.push('/write'),
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
                    style: {
                        boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.4)'
                    },
                    className: "brand-btn whitespace-nowrap",
                    children: [
                        siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/christmas/snow-8.webp",
                                alt: "Christmas decoration",
                                className: "pointer-events-none absolute",
                                style: {
                                    width: 60,
                                    left: -2,
                                    top: -4,
                                    opacity: 0.95
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/write-buttons.tsx",
                                lineNumber: 47,
                                columnNumber: 8
                            }, this)
                        }, void 0, false),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$pen$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(home)/write-buttons.tsx",
                            lineNumber: 56,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "写文章"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/write-buttons.tsx",
                            lineNumber: 57,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/write-buttons.tsx",
                    lineNumber: 37,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
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
                    onClick: ()=>setConfigDialogOpen(true),
                    className: "p-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$dots$2e$svg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        className: "h-6 w-6"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/write-buttons.tsx",
                        lineNumber: 66,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/write-buttons.tsx",
                    lineNumber: 59,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/write-buttons.tsx",
            lineNumber: 36,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/write-buttons.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, this);
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
        const res = await fetch(url, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json().catch(()=>({}));
        return typeof data?.count === 'number' ? data.count : null;
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
            const res = await fetch(url, {
                method: 'POST'
            });
            const data = await res.json().catch(()=>({}));
            if (data.reason == 'rate_limited') (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])('谢谢啦😘，今天已经不能再点赞啦💕');
            const value = typeof data?.count === 'number' ? data.count : (fetchedCount ?? 0) + 1;
            await mutate(value, {
                revalidate: false
            });
        } catch  {
        // ignore
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
                            lineNumber: 104,
                            columnNumber: 8
                        }, this)
                    }, particle.id, false, {
                        fileName: "[project]/src/components/like-button.tsx",
                        lineNumber: 92,
                        columnNumber: 7
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 90,
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
                lineNumber: 110,
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
                    lineNumber: 121,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/like-button.tsx",
                lineNumber: 120,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/like-button.tsx",
        lineNumber: 82,
        columnNumber: 4
    }, this);
}
}),
"[project]/src/app/(home)/like-position.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikePosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/like-button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function LikePosition() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const styles = cardStyles.likePosition;
    const hiCardStyles = cardStyles.hiCard;
    const socialButtonsStyles = cardStyles.socialButtons;
    const musicCardStyles = cardStyles.musicCard;
    const shareCardStyles = cardStyles.shareCard;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width + shareCardStyles.width + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + socialButtonsStyles.height + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + musicCardStyles.height + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "likePosition",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute max-sm:static",
            initial: {
                left: x,
                top: y
            },
            animate: {
                left: x,
                top: y
            },
            children: [
                siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-13.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 40,
                            left: -4,
                            top: -4,
                            opacity: 0.9
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/like-position.tsx",
                        lineNumber: 29,
                        columnNumber: 7
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$like$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    delay: cardStyles.shareCard.order * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1000
                }, void 0, false, {
                    fileName: "[project]/src/app/(home)/like-position.tsx",
                    lineNumber: 38,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(home)/like-position.tsx",
            lineNumber: 26,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/like-position.tsx",
        lineNumber: 25,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/hat-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function HatCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const styles = cardStyles.hatCard;
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [number, setNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>setShow(true), styles.order * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1000);
    }, [
        styles.order
    ]);
    const hatIndex = siteContent.currentHatIndex ?? 1;
    const hatFlipped = siteContent.hatFlipped ?? false;
    if (maxSM) return null;
    if (!show) return null;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - styles.width / 2;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - styles.height;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "hatCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.6,
                left: x,
                top: y,
                width: styles.width,
                height: styles.height
            },
            animate: {
                opacity: 1,
                scale: 1,
                left: x,
                top: y,
                width: styles.width,
                height: styles.height
            },
            whileHover: {
                scale: 1.05
            },
            whileTap: {
                scale: 0.95
            },
            onClick: ()=>setNumber(number + 1),
            className: "absolute flex h-full w-full items-center justify-center",
            children: new Array(number).fill(0).map((_, index)=>index === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: `/images/hats/${hatIndex}.webp`,
                    alt: "hat",
                    className: "h-full w-full object-contain",
                    style: {
                        width: styles.width,
                        height: styles.height,
                        transform: hatFlipped ? 'scaleX(-1)' : 'none'
                    }
                }, index, false, {
                    fileName: "[project]/src/app/(home)/hat-card.tsx",
                    lineNumber: 45,
                    columnNumber: 8
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: `/images/hats/${hatIndex}.webp`,
                    alt: "hat",
                    className: "absolute h-full w-full object-contain",
                    style: {
                        width: styles.width,
                        height: styles.height,
                        transform: hatFlipped ? 'scaleX(-1)' : 'none',
                        bottom: index * 16
                    }
                }, index, false, {
                    fileName: "[project]/src/app/(home)/hat-card.tsx",
                    lineNumber: 53,
                    columnNumber: 8
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/app/(home)/hat-card.tsx",
            lineNumber: 34,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/hat-card.tsx",
        lineNumber: 33,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/beian-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BeianCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function BeianCard() {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const styles = cardStyles.beianCard;
    const hiCardStyles = cardStyles.hiCard;
    const articleCardStyles = cardStyles.articleCard;
    const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - styles.width + 200;
    const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_SPACING"] + 180;
    const beian = siteContent.beian;
    if (!beian?.text) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "beianCard",
        x: x,
        y: y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: styles.width,
            height: styles.height,
            x: x,
            y: y,
            className: "flex items-center justify-center max-sm:static",
            children: beian.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: beian.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-secondary text-xs transition-opacity hover:opacity-80",
                children: beian.text
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/beian-card.tsx",
                lineNumber: 28,
                columnNumber: 6
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-secondary text-xs",
                children: beian.text
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/beian-card.tsx",
                lineNumber: 32,
                columnNumber: 6
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(home)/beian-card.tsx",
            lineNumber: 26,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(home)/beian-card.tsx",
        lineNumber: 25,
        columnNumber: 3
    }, this);
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
"[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/app/(home)/services/push-site-content.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushSiteContent",
    ()=>pushSiteContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
async function pushSiteContent(siteContent, cardStyles, faviconItem, avatarItem, artImageUploads, removedArtImages, backgroundImageUploads, removedBackgroundImages, socialButtonImageUploads) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新站点配置`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    // Handle favicon upload
    if (faviconItem?.type === 'file') {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在上传 Favicon...');
        const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(faviconItem.file);
        const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
        treeItems.push({
            path: 'public/favicon.png',
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
        });
    }
    // Handle avatar upload
    if (avatarItem?.type === 'file') {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在上传 Avatar...');
        const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(avatarItem.file);
        const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
        treeItems.push({
            path: 'public/images/avatar.png',
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
        });
    }
    // Handle art images upload
    if (artImageUploads) {
        for (const [id, item] of Object.entries(artImageUploads)){
            if (item.type !== 'file') continue;
            const artConfig = siteContent.artImages?.find((art)=>art.id === id);
            if (!artConfig) continue;
            // Ensure blob is saved under public directory while keeping URL as /images/...
            const normalizedUrlPath = artConfig.url.startsWith('/') ? artConfig.url : `/${artConfig.url}`;
            const path = `public${normalizedUrlPath}`;
            if (!path) continue;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`正在上传 Art 图片 ${id}...`);
            const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(item.file);
            const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
            treeItems.push({
                path,
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            });
        }
    }
    // Handle art images deletion
    if (removedArtImages && removedArtImages.length > 0) {
        for (const art of removedArtImages){
            const normalizedUrlPath = art.url.startsWith('/') ? art.url : `/${art.url}`;
            const path = `public${normalizedUrlPath}`;
            treeItems.push({
                path,
                mode: '100644',
                type: 'blob',
                sha: null
            });
        }
    }
    // Handle background images upload
    if (backgroundImageUploads) {
        for (const [id, item] of Object.entries(backgroundImageUploads)){
            if (item.type !== 'file') continue;
            const bgConfig = siteContent.backgroundImages?.find((bg)=>bg.id === id);
            if (!bgConfig) continue;
            // Only upload if URL starts with /images/background/ (local file)
            if (!bgConfig.url.startsWith('/images/background/')) continue;
            const normalizedUrlPath = bgConfig.url.startsWith('/') ? bgConfig.url : `/${bgConfig.url}`;
            const path = `public${normalizedUrlPath}`;
            if (!path) continue;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`正在上传背景图片 ${id}...`);
            const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(item.file);
            const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
            treeItems.push({
                path,
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            });
        }
    }
    // Handle background images deletion
    if (removedBackgroundImages && removedBackgroundImages.length > 0) {
        for (const bg of removedBackgroundImages){
            // Only delete if URL starts with /images/background/ (local file)
            if (!bg.url.startsWith('/images/background/')) continue;
            const normalizedUrlPath = bg.url.startsWith('/') ? bg.url : `/${bg.url}`;
            const path = `public${normalizedUrlPath}`;
            treeItems.push({
                path,
                mode: '100644',
                type: 'blob',
                sha: null
            });
        }
    }
    // Handle social button images upload
    if (socialButtonImageUploads) {
        for (const [buttonId, item] of Object.entries(socialButtonImageUploads)){
            if (item.type !== 'file') continue;
            const button = siteContent.socialButtons?.find((btn)=>btn.id === buttonId);
            if (!button) continue;
            // Only upload if URL starts with /images/social-buttons/ (local file)
            if (!button.value.startsWith('/images/social-buttons/')) continue;
            const normalizedUrlPath = button.value.startsWith('/') ? button.value : `/${button.value}`;
            const path = `public${normalizedUrlPath}`;
            if (!path) continue;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`正在上传社交按钮图片 ${buttonId}...`);
            const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(item.file);
            const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
            treeItems.push({
                path,
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            });
        }
    }
    // Handle site content JSON
    const siteContentJson = JSON.stringify(siteContent, null, '\t');
    const siteContentBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBase64Utf8"])(siteContentJson), 'base64');
    treeItems.push({
        path: 'src/config/site-content.json',
        mode: '100644',
        type: 'blob',
        sha: siteContentBlob.sha
    });
    // Handle card styles JSON
    const cardStylesJson = JSON.stringify(cardStyles, null, '\t');
    const cardStylesBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBase64Utf8"])(cardStylesJson), 'base64');
    treeItems.push({
        path: 'src/config/card-styles.json',
        mode: '100644',
        type: 'blob',
        sha: cardStylesBlob.sha
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('保存成功！');
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaviconAvatarUpload",
    ()=>FaviconAvatarUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function FaviconAvatarUpload({ faviconItem, setFaviconItem, avatarItem, setAvatarItem }) {
    const faviconInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const avatarInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFaviconFileSelect = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
            return;
        }
        const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
        const previewUrl = URL.createObjectURL(file);
        setFaviconItem({
            type: 'file',
            file,
            previewUrl,
            hash
        });
        if (e.currentTarget) e.currentTarget.value = '';
    };
    const handleAvatarFileSelect = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
            return;
        }
        const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
        const previewUrl = URL.createObjectURL(file);
        setAvatarItem({
            type: 'file',
            file,
            previewUrl,
            hash
        });
        if (e.currentTarget) e.currentTarget.value = '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mb-2 block text-sm font-medium",
                        children: "Favicon"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 52,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: faviconInputRef,
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: handleFaviconFileSelect
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 53,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border bg-white/60",
                        children: [
                            faviconItem?.type === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: faviconItem.previewUrl,
                                alt: "favicon preview",
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 56,
                                columnNumber: 7
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/favicon.png",
                                alt: "current favicon",
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 58,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-white",
                                    children: faviconItem ? '更换' : '上传'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                    lineNumber: 61,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 60,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                onClick: ()=>faviconInputRef.current?.click()
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 64,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 54,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                lineNumber: 51,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mb-2 block text-sm font-medium",
                        children: "Avatar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 69,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: avatarInputRef,
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: handleAvatarFileSelect
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 70,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative h-20 w-20 cursor-pointer overflow-hidden rounded-full border bg-white/60",
                        children: [
                            avatarItem?.type === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: avatarItem.previewUrl,
                                alt: "avatar preview",
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 73,
                                columnNumber: 7
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/avatar.png",
                                alt: "current avatar",
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 75,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-white",
                                    children: avatarItem ? '更换' : '上传'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                    lineNumber: 78,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 77,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                onClick: ()=>avatarInputRef.current?.click()
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                                lineNumber: 80,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                        lineNumber: 71,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
                lineNumber: 68,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteMetaForm",
    ()=>SiteMetaForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function SiteMetaForm({ formData, setFormData }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-2 block text-sm font-medium",
                                children: "站点标题"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                                lineNumber: 15,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: formData.meta.title,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        meta: {
                                            ...formData.meta,
                                            title: e.target.value
                                        }
                                    }),
                                className: "bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                                lineNumber: 16,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                        lineNumber: 14,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-2 block text-sm font-medium",
                                children: "用户名"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                                lineNumber: 25,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: formData.meta.username || '',
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        meta: {
                                            ...formData.meta,
                                            username: e.target.value
                                        }
                                    }),
                                className: "bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                                lineNumber: 26,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                        lineNumber: 24,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                lineNumber: 13,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mb-2 block text-sm font-medium",
                        children: "站点描述"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                        lineNumber: 36,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: formData.meta.description,
                        onChange: (e)=>setFormData({
                                ...formData,
                                meta: {
                                    ...formData.meta,
                                    description: e.target.value
                                }
                            }),
                        rows: 3,
                        className: "bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                        lineNumber: 37,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx",
                lineNumber: 35,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArtImagesSection",
    ()=>ArtImagesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ArtImagesSection({ formData, setFormData, artImageUploads, setArtImageUploads }) {
    const artInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [artUrlInput, setArtUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleArtFilesSelect = async (e)=>{
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        for (const file of files){
            if (!file.type.startsWith('image/')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
                continue;
            }
            const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
            const ext = file.name.split('.').pop() || 'png';
            const id = hash;
            const targetPath = `/images/art/${id}.${ext}`;
            const previewUrl = URL.createObjectURL(file);
            setArtImageUploads((prev)=>({
                    ...prev,
                    [id]: {
                        type: 'file',
                        file,
                        previewUrl,
                        hash
                    }
                }));
            setFormData((prev)=>{
                const existing = prev.artImages ?? [];
                const filtered = existing.filter((item)=>item.id !== id);
                const artImages = [
                    ...filtered,
                    {
                        id,
                        url: targetPath
                    }
                ];
                return {
                    ...prev,
                    artImages,
                    currentArtImageId: prev.currentArtImageId || id
                };
            });
        }
        setArtUrlInput('');
        if (e.currentTarget) e.currentTarget.value = '';
    };
    const handleArtUrlSubmit = ()=>{
        if (!artUrlInput.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请输入图片 URL');
            return;
        }
        const id = `url-${Date.now()}`;
        setFormData((prev)=>{
            const existing = prev.artImages ?? [];
            const artImages = [
                ...existing,
                {
                    id,
                    url: artUrlInput.trim()
                }
            ];
            return {
                ...prev,
                artImages,
                currentArtImageId: prev.currentArtImageId || id
            };
        });
        setArtUrlInput('');
    };
    const handleSetCurrentArtImage = (id)=>{
        setFormData((prev)=>({
                ...prev,
                currentArtImageId: id
            }));
    };
    const handleRemoveArtImage = (id)=>{
        const uploadItem = artImageUploads[id];
        if (uploadItem?.type === 'file') {
            URL.revokeObjectURL(uploadItem.previewUrl);
        }
        setArtImageUploads((prev)=>{
            const next = {
                ...prev
            };
            delete next[id];
            return next;
        });
        setFormData((prev)=>{
            const existing = prev.artImages ?? [];
            const artImages = existing.filter((item)=>item.id !== id);
            const isCurrent = prev.currentArtImageId === id;
            return {
                ...prev,
                artImages,
                currentArtImageId: isCurrent ? artImages[0]?.id || '' : prev.currentArtImageId
            };
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-sm font-medium",
                children: "首页图片"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                lineNumber: 110,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: artInputRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                className: "hidden",
                onChange: handleArtFilesSelect
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                lineNumber: 111,
                columnNumber: 4
            }, this),
            (formData.artImages?.length ?? 0) === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs text-gray-500",
                children: "暂未配置 Art 图片，点击下方「+」添加。"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                lineNumber: 112,
                columnNumber: 48
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-3 max-sm:grid-cols-3",
                children: [
                    formData.artImages?.map((item)=>{
                        const isActive = formData.currentArtImageId === item.id;
                        const uploadItem = artImageUploads[item.id];
                        const src = uploadItem?.type === 'file' ? uploadItem.previewUrl : item.url;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleSetCurrentArtImage(item.id),
                                    className: `block w-full overflow-hidden rounded-xl border bg-white/60 transition-all ${isActive ? 'ring-brand shadow-md ring-2' : 'hover:border-brand/60'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: src,
                                        alt: "art preview",
                                        className: "h-24 w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                                        lineNumber: 127,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                                    lineNumber: 121,
                                    columnNumber: 8
                                }, this),
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-brand pointer-events-none absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] text-white shadow",
                                    children: "当前使用"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                                    lineNumber: 130,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleRemoveArtImage(item.id),
                                    className: "text-secondary absolute top-1 right-1 hidden rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] shadow group-hover:block",
                                    children: "删除"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                                    lineNumber: 132,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                            lineNumber: 120,
                            columnNumber: 7
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>artInputRef.current?.click(),
                            className: "hover:border-brand/60 flex h-24 w-full items-center justify-center rounded-xl border border-dashed bg-white/40 text-2xl text-gray-400 hover:bg-white/80",
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                            lineNumber: 142,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                        lineNumber: 141,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                lineNumber: 113,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "url",
                        value: artUrlInput,
                        onChange: (e)=>setArtUrlInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleArtUrlSubmit();
                            }
                        },
                        placeholder: "输入图片 URL",
                        className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                        lineNumber: 151,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleArtUrlSubmit,
                        className: "bg-card rounded-lg border px-3 py-1.5 text-xs font-medium",
                        children: "添加 URL"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                        lineNumber: 164,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
                lineNumber: 150,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx",
        lineNumber: 109,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundImagesSection",
    ()=>BackgroundImagesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function BackgroundImagesSection({ formData, setFormData, backgroundImageUploads, setBackgroundImageUploads }) {
    const backgroundInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [backgroundUrlInput, setBackgroundUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleBackgroundFileSelect = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
            return;
        }
        const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
        const ext = file.name.split('.').pop() || 'png';
        const id = hash;
        const targetPath = `/images/background/${id}.${ext}`;
        const previewUrl = URL.createObjectURL(file);
        setBackgroundImageUploads((prev)=>({
                ...prev,
                [id]: {
                    type: 'file',
                    file,
                    previewUrl,
                    hash
                }
            }));
        setFormData((prev)=>{
            const existing = prev.backgroundImages ?? [];
            const filtered = existing.filter((item)=>item.id !== id);
            const backgroundImages = [
                ...filtered,
                {
                    id,
                    url: targetPath
                }
            ];
            return {
                ...prev,
                backgroundImages: backgroundImages,
                currentBackgroundImageId: prev.currentBackgroundImageId || id
            };
        });
        setBackgroundUrlInput('');
        if (e.currentTarget) e.currentTarget.value = '';
    };
    const handleBackgroundUrlSubmit = ()=>{
        if (!backgroundUrlInput.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请输入图片 URL');
            return;
        }
        const id = `url-${Date.now()}`;
        setFormData((prev)=>{
            const existing = prev.backgroundImages ?? [];
            const backgroundImages = [
                ...existing,
                {
                    id,
                    url: backgroundUrlInput.trim()
                }
            ];
            return {
                ...prev,
                backgroundImages: backgroundImages,
                currentBackgroundImageId: prev.currentBackgroundImageId || id
            };
        });
        setBackgroundUrlInput('');
    };
    const handleSetCurrentBackgroundImage = (id)=>{
        setFormData((prev)=>({
                ...prev,
                currentBackgroundImageId: id
            }));
    };
    const handleClearBackgroundImage = ()=>{
        setFormData((prev)=>({
                ...prev,
                currentBackgroundImageId: ''
            }));
    };
    const handleRemoveBackgroundImage = (id)=>{
        const uploadItem = backgroundImageUploads[id];
        if (uploadItem?.type === 'file') {
            URL.revokeObjectURL(uploadItem.previewUrl);
        }
        setBackgroundImageUploads((prev)=>{
            const next = {
                ...prev
            };
            delete next[id];
            return next;
        });
        setFormData((prev)=>{
            const existing = prev.backgroundImages ?? [];
            const backgroundImages = existing.filter((item)=>item.id !== id);
            const isCurrent = prev.currentBackgroundImageId === id;
            return {
                ...prev,
                backgroundImages: backgroundImages,
                currentBackgroundImageId: isCurrent ? backgroundImages[0]?.id || '' : prev.currentBackgroundImageId
            };
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium",
                        children: "背景图片"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                        lineNumber: 116,
                        columnNumber: 5
                    }, this),
                    formData.currentBackgroundImageId && formData.currentBackgroundImageId.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleClearBackgroundImage,
                        className: "text-secondary rounded-lg border bg-white/60 px-3 py-1 text-xs font-medium hover:bg-white/80",
                        children: "取消设置"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                        lineNumber: 118,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                lineNumber: 115,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: backgroundInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleBackgroundFileSelect
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                lineNumber: 126,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-3 max-sm:grid-cols-3",
                children: [
                    (formData.backgroundImages ?? []).filter((item)=>item.url && item.url.trim() !== '').map((item)=>{
                        const isActive = formData.currentBackgroundImageId === item.id;
                        const uploadItem = backgroundImageUploads[item.id];
                        const src = uploadItem?.type === 'file' ? uploadItem.previewUrl : item.url;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleSetCurrentBackgroundImage(item.id),
                                    className: `block w-full overflow-hidden rounded-xl border bg-white/60 transition-all ${isActive ? 'ring-brand shadow-md ring-2' : 'hover:border-brand/60'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: src,
                                        alt: "background preview",
                                        className: "h-24 w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                                        lineNumber: 144,
                                        columnNumber: 10
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                                    lineNumber: 138,
                                    columnNumber: 9
                                }, this),
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-brand pointer-events-none absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] text-white shadow",
                                    children: "当前使用"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                                    lineNumber: 147,
                                    columnNumber: 10
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleRemoveBackgroundImage(item.id),
                                    className: "text-secondary absolute top-1 right-1 hidden rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] shadow group-hover:block",
                                    children: "删除"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                                    lineNumber: 149,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                            lineNumber: 137,
                            columnNumber: 8
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>backgroundInputRef.current?.click(),
                            className: "hover:border-brand/60 flex h-24 w-full items-center justify-center rounded-xl border border-dashed bg-white/40 text-2xl text-gray-400 hover:bg-white/80",
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                            lineNumber: 159,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                        lineNumber: 158,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                lineNumber: 128,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "url",
                        value: backgroundUrlInput,
                        onChange: (e)=>setBackgroundUrlInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleBackgroundUrlSubmit();
                            }
                        },
                        placeholder: "输入图片 URL",
                        className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                        lineNumber: 168,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleBackgroundUrlSubmit,
                        className: "bg-card rounded-lg border px-3 py-1.5 text-xs font-medium",
                        children: "添加 URL"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                        lineNumber: 181,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
                lineNumber: 167,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx",
        lineNumber: 114,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/components/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Select({ value, onChange, options, className, disabled }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0,
        width: 0
    });
    const selectedOption = options.find((opt)=>opt.value === value) || options[0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width
            });
        }
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const updatePosition = ()=>{
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                setPosition({
                    top: rect.bottom + 8,
                    left: rect.left,
                    width: rect.width
                });
            }
        };
        const handleClickOutside = (e)=>{
            const target = e.target;
            if (triggerRef.current && !triggerRef.current.contains(target) && dropdownRef.current && !dropdownRef.current.contains(target)) {
                setOpen(false);
            }
        };
        const handleEscape = (e)=>{
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        const handleScroll = ()=>{
            updatePosition();
        };
        const handleResize = ()=>{
            updatePosition();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [
        open
    ]);
    const handleSelect = (optionValue)=>{
        onChange(optionValue);
        setOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: ()=>!disabled && setOpen(!open),
                disabled: disabled,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card relative flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs transition-all', 'active:scale-[0.98]', 'focus:ring-brand/20 focus:ring-2 focus:outline-none', disabled && 'cursor-not-allowed opacity-50', !disabled && 'hover:bg-card/80', className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1 text-left",
                        children: selectedOption?.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/select.tsx",
                        lineNumber: 114,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180'),
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        strokeWidth: 2,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M19 9l-7 7-7-7"
                        }, void 0, false, {
                            fileName: "[project]/src/components/select.tsx",
                            lineNumber: 121,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/select.tsx",
                        lineNumber: 115,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/select.tsx",
                lineNumber: 101,
                columnNumber: 4
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scrollbar-none max-h-64 overflow-y-auto p-1.5",
                        children: options.map((option)=>{
                            const isSelected = option.value === value;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleSelect(option.value),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-lg px-3 py-2 text-left text-xs transition-all', 'active:scale-[0.98]', isSelected ? 'bg-brand/10 text-brand font-medium' : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50'),
                                children: option.label
                            }, option.value, false, {
                                fileName: "[project]/src/components/select.tsx",
                                lineNumber: 146,
                                columnNumber: 12
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/select.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/select.tsx",
                    lineNumber: 129,
                    columnNumber: 8
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/select.tsx",
                lineNumber: 127,
                columnNumber: 6
            }, this), document.body)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialButtonsSection",
    ()=>SocialButtonsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SocialButtonsSection({ formData, setFormData, socialButtonImageUploads, setSocialButtonImageUploads }) {
    const buttons = formData.socialButtons || [];
    const imageInputRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const handleAddButton = ()=>{
        const newId = `button-${Date.now()}`;
        const newButton = {
            id: newId,
            type: 'link',
            value: '',
            label: '',
            order: buttons.length + 1
        };
        setFormData((prev)=>({
                ...prev,
                socialButtons: [
                    ...prev.socialButtons || [],
                    newButton
                ]
            }));
    };
    const handleUpdateButton = (id, updates)=>{
        setFormData((prev)=>({
                ...prev,
                socialButtons: (prev.socialButtons || []).map((btn)=>btn.id === id ? {
                        ...btn,
                        ...updates,
                        label: updates.label ?? btn.label ?? ''
                    } : btn)
            }));
    };
    const handleRemoveButton = (id)=>{
        setFormData((prev)=>({
                ...prev,
                socialButtons: (prev.socialButtons || []).filter((btn)=>btn.id !== id)
            }));
    };
    const handleMoveButton = (id, direction)=>{
        const currentIndex = buttons.findIndex((btn)=>btn.id === id);
        if (currentIndex === -1) return;
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= buttons.length) return;
        const newButtons = [
            ...buttons
        ];
        [newButtons[currentIndex], newButtons[newIndex]] = [
            newButtons[newIndex],
            newButtons[currentIndex]
        ];
        const updatedButtons = newButtons.map((btn, index)=>({
                ...btn,
                order: index + 1,
                label: btn.label ?? ''
            }));
        setFormData((prev)=>({
                ...prev,
                socialButtons: updatedButtons
            }));
    };
    const handleImageSelect = async (buttonId, e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
            return;
        }
        const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(file);
        const ext = file.name.split('.').pop() || 'png';
        const targetPath = `/images/social-buttons/${hash}.${ext}`;
        const previewUrl = URL.createObjectURL(file);
        setSocialButtonImageUploads((prev)=>({
                ...prev,
                [buttonId]: {
                    type: 'file',
                    file,
                    previewUrl,
                    hash
                }
            }));
        setFormData((prev)=>({
                ...prev,
                socialButtons: (prev.socialButtons || []).map((btn)=>btn.id === buttonId ? {
                        ...btn,
                        value: targetPath
                    } : btn)
            }));
        if (e.currentTarget) e.currentTarget.value = '';
    };
    const handleRemoveImage = (buttonId)=>{
        const uploadItem = socialButtonImageUploads[buttonId];
        if (uploadItem?.type === 'file') {
            URL.revokeObjectURL(uploadItem.previewUrl);
        }
        setSocialButtonImageUploads((prev)=>{
            const next = {
                ...prev
            };
            delete next[buttonId];
            return next;
        });
        setFormData((prev)=>({
                ...prev,
                socialButtons: (prev.socialButtons || []).map((btn)=>btn.id === buttonId ? {
                        ...btn,
                        value: ''
                    } : btn)
            }));
    };
    const sortedButtons = [
        ...buttons
    ].sort((a, b)=>a.order - b.order);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-sm font-medium",
                children: "社交按钮"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                lineNumber: 146,
                columnNumber: 4
            }, this),
            buttons.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs text-gray-500",
                children: "暂未配置社交按钮，点击下方「+」添加。"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                lineNumber: 147,
                columnNumber: 29
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 whitespace-nowrap",
                children: [
                    sortedButtons.map((button, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    value: button.type,
                                    onChange: (value)=>handleUpdateButton(button.id, {
                                            type: value
                                        }),
                                    className: "w-24",
                                    options: [
                                        {
                                            value: 'github',
                                            label: 'Github'
                                        },
                                        {
                                            value: 'juejin',
                                            label: '掘金'
                                        },
                                        {
                                            value: 'email',
                                            label: '邮箱'
                                        },
                                        {
                                            value: 'x',
                                            label: 'X'
                                        },
                                        {
                                            value: 'tg',
                                            label: 'Telegram'
                                        },
                                        {
                                            value: 'wechat',
                                            label: '微信'
                                        },
                                        {
                                            value: 'facebook',
                                            label: 'Facebook'
                                        },
                                        {
                                            value: 'tiktok',
                                            label: 'TikTok'
                                        },
                                        {
                                            value: 'instagram',
                                            label: 'Instagram'
                                        },
                                        {
                                            value: 'weibo',
                                            label: '微博'
                                        },
                                        {
                                            value: 'xiaohongshu',
                                            label: '小红书'
                                        },
                                        {
                                            value: 'zhihu',
                                            label: '知乎'
                                        },
                                        {
                                            value: 'bilibili',
                                            label: '哔哩哔哩'
                                        },
                                        {
                                            value: 'qq',
                                            label: 'QQ'
                                        },
                                        {
                                            value: 'link',
                                            label: '链接'
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 151,
                                    columnNumber: 7
                                }, this),
                                button.type === 'wechat' || button.type === 'qq' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-1 items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: (el)=>{
                                                imageInputRefs.current[button.id] = el;
                                            },
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: (e)=>handleImageSelect(button.id, e)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 175,
                                            columnNumber: 9
                                        }, this),
                                        socialButtonImageUploads[button.id]?.type === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex flex-1 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: socialButtonImageUploads[button.id].previewUrl,
                                                    alt: "preview",
                                                    className: "h-10 w-10 rounded-lg object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: button.value,
                                                    onChange: (e)=>handleUpdateButton(button.id, {
                                                            value: e.target.value
                                                        }),
                                                    placeholder: button.type === 'wechat' ? '微信号或二维码链接' : 'QQ号或二维码链接',
                                                    className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>handleRemoveImage(button.id),
                                                    className: "text-xs text-red-500 hover:text-red-600",
                                                    children: "删除图片"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 185,
                                            columnNumber: 10
                                        }, this) : button.value && button.value.startsWith('/images/social-buttons/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex flex-1 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: button.value,
                                                    alt: "preview",
                                                    className: "h-10 w-10 rounded-lg object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: button.value,
                                                    onChange: (e)=>handleUpdateButton(button.id, {
                                                            value: e.target.value
                                                        }),
                                                    placeholder: button.type === 'wechat' ? '微信号或二维码链接' : 'QQ号或二维码链接',
                                                    className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 203,
                                            columnNumber: 10
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: button.value,
                                                    onChange: (e)=>handleUpdateButton(button.id, {
                                                            value: e.target.value
                                                        }),
                                                    placeholder: button.type === 'wechat' ? '微信号或二维码链接' : 'QQ号或二维码链接',
                                                    className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>imageInputRefs.current[button.id]?.click(),
                                                    className: "bg-card rounded-lg border px-3 py-1.5 text-xs font-medium",
                                                    children: "上传图片"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 174,
                                    columnNumber: 8
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: button.type === 'email' ? 'email' : 'url',
                                    value: button.value,
                                    onChange: (e)=>handleUpdateButton(button.id, {
                                            value: e.target.value
                                        }),
                                    placeholder: button.type === 'email' ? 'example@email.com' : 'https://example.com',
                                    className: "bg-secondary/10 flex-1 rounded-lg border px-3 py-1.5 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 232,
                                    columnNumber: 8
                                }, this),
                                button.type !== 'email' && button.type !== 'wechat' && button.type !== 'qq' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: button.label || '',
                                    onChange: (e)=>handleUpdateButton(button.id, {
                                            label: e.target.value
                                        }),
                                    placeholder: "标签文本（可选）",
                                    className: "bg-secondary/10 w-32 rounded-lg border px-3 py-1.5 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 241,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: button.order,
                                    onChange: (e)=>{
                                        const order = parseInt(e.target.value, 10);
                                        if (!isNaN(order) && order > 0) {
                                            handleUpdateButton(button.id, {
                                                order
                                            });
                                        }
                                    },
                                    min: 1,
                                    placeholder: "顺序",
                                    className: "bg-secondary/10 w-16 rounded-lg border px-2 py-1.5 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 249,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleMoveButton(button.id, 'up'),
                                            disabled: index === 0,
                                            className: "rounded px-2 py-1 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300",
                                            children: "↑"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 263,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleMoveButton(button.id, 'down'),
                                            disabled: index === sortedButtons.length - 1,
                                            className: "rounded px-2 py-1 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300",
                                            children: "↓"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 270,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleRemoveButton(button.id),
                                            className: "rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50",
                                            children: "删除"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                            lineNumber: 277,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                                    lineNumber: 262,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, button.id, true, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                            lineNumber: 150,
                            columnNumber: 6
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleAddButton,
                        className: "hover:border-brand/60 text-secondary hover:bg-card flex w-full items-center justify-center rounded-xl border border-dashed py-2 text-sm",
                        children: "+ 添加按钮"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                        lineNumber: 283,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
                lineNumber: 148,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx",
        lineNumber: 145,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HatSection",
    ()=>HatSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function HatSection({ formData, setFormData }) {
    const currentHatIndex = formData.currentHatIndex ?? 1;
    const hatCount = 24;
    const handleSetHatIndex = (index)=>{
        setFormData((prev)=>({
                ...prev,
                currentHatIndex: index
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-sm font-medium",
                children: "帽子图片"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                lineNumber: 23,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-6 gap-3 max-sm:grid-cols-4",
                children: Array.from({
                    length: hatCount
                }, (_, i)=>i + 1).map((index)=>{
                    const isActive = currentHatIndex === index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleSetHatIndex(index),
                                className: `block w-full overflow-hidden rounded-xl border bg-white/60 transition-all ${isActive ? 'ring-brand shadow-md ring-2' : 'hover:border-brand/60'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: `/images/hats/${index}.webp`,
                                    alt: `hat ${index}`,
                                    className: "h-20 w-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                                    lineNumber: 36,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                                lineNumber: 30,
                                columnNumber: 8
                            }, this),
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-brand pointer-events-none absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] text-white shadow",
                                children: "当前使用"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                                lineNumber: 39,
                                columnNumber: 9
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                        lineNumber: 29,
                        columnNumber: 7
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                lineNumber: 24,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: formData.hatFlipped ?? false,
                            onChange: (e)=>setFormData({
                                    ...formData,
                                    hatFlipped: e.target.checked
                                }),
                            className: "accent-brand h-4 w-4 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                            lineNumber: 47,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "左右翻转"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                            lineNumber: 53,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                    lineNumber: 46,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
                lineNumber: 45,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeianForm",
    ()=>BeianForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function BeianForm({ formData, setFormData }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-sm font-medium",
                children: "备案信息"
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                lineNumber: 13,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-1 block text-xs text-gray-600",
                                children: "备案号"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                                lineNumber: 16,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: formData.beian?.text || '',
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        beian: {
                                            ...formData.beian || {
                                                text: '',
                                                link: ''
                                            },
                                            text: e.target.value
                                        }
                                    }),
                                placeholder: "例如：京ICP备12345678号",
                                className: "bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                                lineNumber: 17,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                        lineNumber: 15,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-1 block text-xs text-gray-600",
                                children: "备案链接（可选）"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                                lineNumber: 26,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "url",
                                value: formData.beian?.link || '',
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        beian: {
                                            ...formData.beian || {
                                                text: '',
                                                link: ''
                                            },
                                            link: e.target.value
                                        }
                                    }),
                                placeholder: "https://beian.miit.gov.cn/",
                                className: "bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                                lineNumber: 27,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                        lineNumber: 25,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
                lineNumber: 14,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/site-settings/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteSettings",
    ()=>SiteSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$favicon$2d$avatar$2d$upload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/favicon-avatar-upload.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$site$2d$meta$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/site-meta-form.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$art$2d$images$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/art-images-section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$background$2d$images$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/background-images-section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$social$2d$buttons$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/social-buttons-section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$hat$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/hat-section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$beian$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/beian-form.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function SiteSettings({ formData, setFormData, faviconItem, setFaviconItem, avatarItem, setAvatarItem, artImageUploads, setArtImageUploads, backgroundImageUploads, setBackgroundImageUploads, socialButtonImageUploads, setSocialButtonImageUploads }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$favicon$2d$avatar$2d$upload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaviconAvatarUpload"], {
                faviconItem: faviconItem,
                setFaviconItem: setFaviconItem,
                avatarItem: avatarItem,
                setAvatarItem: setAvatarItem
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 46,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$site$2d$meta$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteMetaForm"], {
                formData: formData,
                setFormData: setFormData
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 48,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$beian$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BeianForm"], {
                formData: formData,
                setFormData: setFormData
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 50,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$social$2d$buttons$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocialButtonsSection"], {
                formData: formData,
                setFormData: setFormData,
                socialButtonImageUploads: socialButtonImageUploads,
                setSocialButtonImageUploads: setSocialButtonImageUploads
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 52,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$art$2d$images$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArtImagesSection"], {
                formData: formData,
                setFormData: setFormData,
                artImageUploads: artImageUploads,
                setArtImageUploads: setArtImageUploads
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 59,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$background$2d$images$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackgroundImagesSection"], {
                formData: formData,
                setFormData: setFormData,
                backgroundImageUploads: backgroundImageUploads,
                setBackgroundImageUploads: setBackgroundImageUploads
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 61,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.clockShowSeconds ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        clockShowSeconds: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 70,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "时钟显示秒数"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 76,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 69,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.summaryInContent ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        summaryInContent: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 80,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "摘要放入内容"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 86,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 79,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.hideEditButton ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        hideEditButton: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 90,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "隐藏编辑按钮（编辑快捷键 ctrl/cmd + ,）"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 96,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 89,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 68,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.isCachePem ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        isCachePem: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 101,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "缓存PEM(已加密，但存在风险)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 107,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 100,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.enableCategories ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        enableCategories: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 110,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "启用文章分类"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 116,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 109,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: formData.enableChristmas ?? false,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        enableChristmas: e.target.checked
                                    }),
                                className: "accent-brand h-4 w-4 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 119,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "开启圣诞节"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                                lineNumber: 125,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                        lineNumber: 118,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 99,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$hat$2d$section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HatSection"], {
                formData: formData,
                setFormData: setFormData
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
                lineNumber: 129,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/site-settings/index.tsx",
        lineNumber: 45,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/lib/color.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simple color conversion utilities for hex mode
__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "hexToHsva",
    ()=>hexToHsva,
    "hexToRgb",
    ()=>hexToRgb,
    "hexToRgba",
    ()=>hexToRgba,
    "hslToHsv",
    ()=>hslToHsv,
    "hslToRgb",
    ()=>hslToRgb,
    "hsvToHsl",
    ()=>hsvToHsl,
    "hsvaToHex",
    ()=>hsvaToHex,
    "rgbToHex",
    ()=>rgbToHex,
    "rgbToHsl",
    ()=>rgbToHsl,
    "toFixed",
    ()=>toFixed
]);
function hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleaned);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}
function hexToRgba(hex) {
    const cleaned = hex.replace('#', '');
    if (cleaned.length === 6) {
        const r = parseInt(cleaned.slice(0, 2), 16);
        const g = parseInt(cleaned.slice(2, 4), 16);
        const b = parseInt(cleaned.slice(4, 6), 16);
        return {
            r,
            g,
            b,
            a: 1
        };
    }
    if (cleaned.length === 8) {
        const r = parseInt(cleaned.slice(0, 2), 16);
        const g = parseInt(cleaned.slice(2, 4), 16);
        const b = parseInt(cleaned.slice(4, 6), 16);
        const a = parseInt(cleaned.slice(6, 8), 16) / 255;
        return {
            r,
            g,
            b,
            a
        };
    }
    // Fallback
    return {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };
}
function rgbToHex(r, g, b) {
    return '#' + [
        r,
        g,
        b
    ].map((x)=>Math.round(x).toString(16).padStart(2, '0')).join('');
}
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }
    return {
        h: h * 360,
        s: s,
        l: l
    };
}
function hslToRgb(h, s, l) {
    h /= 360;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t)=>{
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function hslToHsv(h, s, l) {
    const v = l + s * Math.min(l, 1 - l);
    const s2 = v === 0 ? 0 : 2 * (1 - l / v);
    return {
        h: h,
        s: s2,
        v: v,
        a: 1
    };
}
function hsvToHsl(h, s, v) {
    let l = v * (2 - s) / 2;
    if (l != 0) {
        if (l == 1) {
            s = 0;
        } else if (l < 0.5) {
            s = s * v / (l * 2);
        } else {
            s = s * v / (2 - l * 2);
        }
    }
    return {
        h,
        s,
        l
    };
}
function hexToHsva(hex) {
    const rgba = hexToRgba(hex);
    const hsl = rgbToHsl(rgba.r, rgba.g, rgba.b);
    const hsv = hslToHsv(hsl.h, hsl.s, hsl.l);
    return {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        a: rgba.a
    };
}
function hsvaToHex(h, s, v, a = 1) {
    const hsl = hsvToHsl(h, s, v);
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    const baseHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    // Normalize alpha between 0 and 1
    const alpha = clamp(a, 0, 1);
    // If fully opaque, keep legacy 6-digit hex for compatibility
    if (alpha >= 1) {
        return baseHex;
    }
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${baseHex}${alphaHex}`;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function toFixed(value, decimals = 2) {
    return Number(value.toFixed(decimals));
}
}),
"[project]/src/components/color-picker-panel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorPickerPanel",
    ()=>ColorPickerPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/color.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const MOUSE_LEFT = 0;
function ColorPickerPanel({ value, onChange, style, className }) {
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hueOffset, setHueOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [alphaOffset, setAlphaOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(255);
    const [saturationOffset, setSaturationOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(255);
    const [brightOffset, setBrightOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const hueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const alphaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hueActive, setHueActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alphaActive, setAlphaActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saturationActive, setSaturationActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [brightActive, setBrightActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevHexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    // Initialize from value (only once on mount)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (value) {
            const hsva = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToHsva"])(value);
            prevHexRef.current = value;
            // Use setTimeout to ensure refs are mounted
            setTimeout(()=>{
                if (hueRef.current && pickerRef.current && alphaRef.current) {
                    const hueWidth = hueRef.current.getBoundingClientRect().width;
                    const pickerWidth = pickerRef.current.getBoundingClientRect().width;
                    const pickerHeight = pickerRef.current.getBoundingClientRect().height;
                    const alphaWidth = alphaRef.current.getBoundingClientRect().width;
                    setHueOffset(hsva.h / 360 * hueWidth);
                    setSaturationOffset(hsva.s * pickerWidth);
                    setBrightOffset((1 - hsva.v) * pickerHeight);
                    setAlphaOffset(hsva.a * alphaWidth);
                    setShow(true);
                }
            }, 0);
        }
    }, []);
    const hue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (hueRef.current) {
            const { width } = hueRef.current.getBoundingClientRect();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFixed"])(hueOffset / width * 360);
        }
        return 0;
    }, [
        hueOffset,
        hueRef.current
    ]);
    const alpha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (alphaRef.current) {
            const { width } = alphaRef.current.getBoundingClientRect();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFixed"])(alphaOffset / width, 4), 0, 1);
        }
        return 1;
    }, [
        alphaOffset,
        alphaRef.current
    ]);
    const saturation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (pickerRef.current) {
            const { width } = pickerRef.current.getBoundingClientRect();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFixed"])(saturationOffset / width, 4), 0, 1);
        }
        return 1;
    }, [
        saturationOffset,
        pickerRef.current
    ]);
    const bright = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (pickerRef.current) {
            const { height } = pickerRef.current.getBoundingClientRect();
            return 1 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFixed"])(brightOffset / height, 4), 0, 1);
        }
        return 0;
    }, [
        brightOffset,
        pickerRef.current
    ]);
    const hsl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsvToHsl"])(hue, saturation, bright);
    }, [
        hue,
        saturation,
        bright
    ]);
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsvaToHex"])(hue, saturation, bright, alpha), [
        hue,
        saturation,
        bright,
        alpha
    ]);
    // Notify parent of color change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (onChange && hex && hex !== prevHexRef.current) {
            prevHexRef.current = hex;
            onChange(hex);
        }
    }, [
        hex,
        onChange
    ]);
    // Handle mouse events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mousemoveHandler = (e)=>{
            if (hueActive && hueRef.current) {
                const { left, right, width } = hueRef.current.getBoundingClientRect();
                if (e.pageX < left) {
                    setHueOffset(0);
                } else if (e.pageX > right) {
                    setHueOffset(width);
                } else {
                    setHueOffset(e.pageX - left);
                }
            }
            if (alphaActive && alphaRef.current) {
                const { left, right, width } = alphaRef.current.getBoundingClientRect();
                if (e.pageX < left) {
                    setAlphaOffset(0);
                } else if (e.pageX > right) {
                    setAlphaOffset(width);
                } else {
                    setAlphaOffset(e.pageX - left);
                }
            }
            if ((saturationActive || brightActive) && pickerRef.current) {
                const { left, top, right, bottom, width, height } = pickerRef.current.getBoundingClientRect();
                if (saturationActive) {
                    if (e.pageX < left) {
                        setSaturationOffset(0);
                    } else if (e.pageX > right) {
                        setSaturationOffset(width);
                    } else {
                        setSaturationOffset(e.pageX - left);
                    }
                }
                if (brightActive) {
                    if (e.pageY < top) {
                        setBrightOffset(0);
                    } else if (e.pageY > bottom) {
                        setBrightOffset(height);
                    } else {
                        setBrightOffset(e.pageY - top);
                    }
                }
            }
        };
        const mouseupHandler = ()=>{
            setHueActive(false);
            setAlphaActive(false);
            setSaturationActive(false);
            setBrightActive(false);
        };
        if (hueActive || alphaActive || saturationActive || brightActive) {
            document.addEventListener('mousemove', mousemoveHandler);
            document.addEventListener('mouseup', mouseupHandler);
            document.addEventListener('mouseleave', mouseupHandler);
        }
        return ()=>{
            document.removeEventListener('mousemove', mousemoveHandler);
            document.removeEventListener('mouseup', mouseupHandler);
            document.removeEventListener('mouseleave', mouseupHandler);
        };
    }, [
        hueActive,
        alphaActive,
        saturationActive,
        brightActive
    ]);
    const handleHexInputChange = (e)=>{
        const inputValue = e.target.value;
        // Support both #RRGGBB and #RRGGBBAA
        if (/^#[0-9A-Fa-f]{0,8}$/.test(inputValue)) {
            if ((inputValue.length === 7 || inputValue.length === 9) && onChange) {
                onChange(inputValue);
            }
            if (inputValue.length === 7 || inputValue.length === 9) {
                const hsva = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToHsva"])(inputValue);
                if (hueRef.current && pickerRef.current && alphaRef.current) {
                    const hueWidth = hueRef.current.getBoundingClientRect().width;
                    const pickerWidth = pickerRef.current.getBoundingClientRect().width;
                    const pickerHeight = pickerRef.current.getBoundingClientRect().height;
                    const alphaWidth = alphaRef.current.getBoundingClientRect().width;
                    setHueOffset(hsva.h / 360 * hueWidth);
                    setSaturationOffset(hsva.s * pickerWidth);
                    setBrightOffset((1 - hsva.v) * pickerHeight);
                    setAlphaOffset(hsva.a * alphaWidth);
                }
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-color-picker-panel": true,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-56 rounded-lg border bg-white p-3 shadow-lg select-none', className, show ? 'opacity-100' : 'opacity-0'),
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: pickerRef,
                onMouseDown: (e)=>{
                    if (e.button === MOUSE_LEFT) {
                        const { left, top, width, height } = pickerRef.current.getBoundingClientRect();
                        setSaturationOffset((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(e.pageX - left, 0, width));
                        setBrightOffset((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(e.pageY - top, 0, height));
                        setSaturationActive(true);
                        setBrightActive(true);
                    }
                },
                className: "relative h-32 w-full cursor-crosshair rounded-t-md",
                style: {
                    backgroundColor: `hsl(${hue}, 100%, 50%)`,
                    backgroundImage: 'linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-crosshair rounded-full border-2 border-white shadow-md",
                    style: {
                        backgroundColor: `hsl(${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}%)`,
                        left: saturationOffset,
                        top: brightOffset
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/color-picker-panel.tsx",
                    lineNumber: 220,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker-panel.tsx",
                lineNumber: 204,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: hueRef,
                onMouseDown: (e)=>{
                    if (e.button === MOUSE_LEFT) {
                        const { left, width } = hueRef.current.getBoundingClientRect();
                        setHueOffset((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(e.pageX - left, 0, width));
                        setHueActive(true);
                    }
                },
                className: "relative flex h-5 cursor-pointer items-center",
                style: {
                    background: 'linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0))'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute h-4 w-4 -translate-x-1/2 cursor-pointer rounded-full border-2 border-white shadow-md",
                    style: {
                        backgroundColor: `hsl(${hue} 100% 50%)`,
                        left: hueOffset
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/color-picker-panel.tsx",
                    lineNumber: 245,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker-panel.tsx",
                lineNumber: 231,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundSize: '12px 12px',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='12' height='12' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 12 0 L 0 0 0 12' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
                },
                className: "rounded-b-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: alphaRef,
                    onMouseDown: (e)=>{
                        if (e.button === MOUSE_LEFT) {
                            const { left, width } = alphaRef.current.getBoundingClientRect();
                            setAlphaOffset((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(e.pageX - left, 0, width));
                            setAlphaActive(true);
                        }
                    },
                    className: "relative flex h-5 cursor-pointer items-center",
                    style: {
                        background: `linear-gradient(to right, hsl(${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}% / 0%), hsl(${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}% / 100%))`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            left: alphaOffset
                        },
                        className: "absolute h-4 w-4 -translate-x-1/2 cursor-pointer rounded-full border-2 border-white bg-white shadow-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full w-full rounded-full",
                            style: {
                                backgroundColor: `hsl(${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}% / ${alpha * 100}%)`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/color-picker-panel.tsx",
                            lineNumber: 272,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/color-picker-panel.tsx",
                        lineNumber: 271,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/color-picker-panel.tsx",
                    lineNumber: 258,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker-panel.tsx",
                lineNumber: 252,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: hex,
                onChange: handleHexInputChange,
                className: "w-full rounded-md border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none",
                placeholder: "#000000"
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker-panel.tsx",
                lineNumber: 278,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/color-picker-panel.tsx",
        lineNumber: 199,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/components/color-picker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorPicker",
    ()=>ColorPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/color-picker-panel.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ColorPicker({ value = '#000000', onChange, className }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // Calculate position when opening
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 240,
                left: rect.left
            });
        }
    }, [
        open
    ]);
    // Close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const handleClickOutside = (e)=>{
            const target = e.target;
            if (triggerRef.current && !triggerRef.current.contains(target)) {
                const panel = document.querySelector('[data-color-picker-panel]');
                if (panel && !panel.contains(target)) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: ()=>setOpen(!open),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-10 w-10 rounded-lg border-2 border-white/20 shadow-sm transition-all hover:scale-105', className),
                style: {
                    backgroundColor: value
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Select color"
                }, void 0, false, {
                    fileName: "[project]/src/components/color-picker.tsx",
                    lineNumber: 63,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker.tsx",
                lineNumber: 57,
                columnNumber: 4
            }, this),
            mounted && open && position.top > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPickerPanel"], {
                value: value,
                onChange: onChange,
                style: {
                    position: 'fixed',
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    zIndex: 1000
                }
            }, void 0, false, {
                fileName: "[project]/src/components/color-picker.tsx",
                lineNumber: 70,
                columnNumber: 6
            }, this), document.body)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/(home)/config-dialog/color-config.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorConfig",
    ()=>ColorConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/color-picker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/site-content.json (json)");
'use client';
;
;
;
;
;
const DEFAULT_THEME_COLORS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"].theme;
const COLOR_PRESETS = [
    {
        name: '春暖',
        theme: {
            colorBrand: '#35bfab',
            colorBrandSecondary: '#1fc9e7',
            colorPrimary: '#334f52',
            colorSecondary: '#7b888e',
            colorBg: '#eeeeee',
            colorBorder: '#ffffff',
            colorCard: '#ffffff66',
            colorArticle: '#ffffffcc'
        },
        backgroundColors: [
            '#EDDD62',
            '#9EE7D1',
            '#84D68A',
            '#EDDD62',
            '#88E6E5',
            '#a7f3d0'
        ]
    },
    {
        name: '秋实',
        theme: {
            colorPrimary: '#4E3F42',
            colorBrand: '#de4331',
            colorBrandSecondary: '#FCC841'
        },
        backgroundColors: [
            '#FCC841',
            '#DFEFFC',
            '#DEDE92',
            '#DE4331',
            '#FE9750',
            '#FCC841'
        ]
    },
    {
        name: '深夜',
        theme: {
            colorBrand: '#2a48f3',
            colorPrimary: '#e6e8e8',
            colorSecondary: '#acadae',
            colorBrandSecondary: '#51d0b9',
            colorBg: '#0a051f',
            colorBorder: '#8a8a8a5e',
            colorCard: '#ffffff0e',
            colorArticle: '#6f6f6f33'
        },
        backgroundColors: [
            '#16007b'
        ]
    }
];
function ColorConfig({ formData, setFormData }) {
    const theme = formData.theme ?? {};
    const handleThemeColorChange = (key, value)=>{
        setFormData((prev)=>({
                ...prev,
                theme: {
                    ...prev.theme,
                    [key]: value
                }
            }));
    };
    const handleBrandColorChange = (value)=>{
        setFormData((prev)=>({
                ...prev,
                theme: {
                    ...prev.theme,
                    colorBrand: value
                }
            }));
    };
    const handleColorChange = (index, value)=>{
        const newColors = [
            ...formData.backgroundColors
        ];
        newColors[index] = value;
        setFormData({
            ...formData,
            backgroundColors: newColors
        });
    };
    const generateRandomColor = ()=>{
        const randomChannel = ()=>Math.floor(Math.random() * 256);
        return `#${[
            randomChannel(),
            randomChannel(),
            randomChannel()
        ].map((channel)=>channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    };
    const handleRandomizeColors = ()=>{
        const count = Math.floor(Math.random() * 5) + 4 // 4 ~ 8 个颜色
        ;
        const backgroundColors = Array.from({
            length: count
        }, ()=>generateRandomColor());
        const colorBrand = generateRandomColor();
        setFormData((prev)=>({
                ...prev,
                backgroundColors,
                theme: {
                    ...prev.theme,
                    colorBrand
                }
            }));
    };
    const handleAddColor = ()=>{
        setFormData({
            ...formData,
            backgroundColors: [
                ...formData.backgroundColors,
                '#EDDD62'
            ]
        });
    };
    const handleRemoveColor = (index)=>{
        if (formData.backgroundColors.length > 1) {
            const newColors = formData.backgroundColors.filter((_, i)=>i !== index);
            setFormData({
                ...formData,
                backgroundColors: newColors
            });
        }
    };
    const handlePresetChange = (preset)=>{
        setFormData((prev)=>({
                ...prev,
                backgroundColors: [
                    ...preset.backgroundColors
                ],
                theme: {
                    ...prev.theme,
                    ...preset.theme
                }
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mb-2 block text-sm font-medium",
                        children: "基础颜色"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                        lineNumber: 142,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: formData.theme?.colorBrand ?? '#35bfab',
                                        onChange: handleBrandColorChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 145,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "主题色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 146,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 144,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorBrandSecondary ?? DEFAULT_THEME_COLORS.colorBrandSecondary,
                                        onChange: (value)=>handleThemeColorChange('colorBrandSecondary', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 149,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "次级主题色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 153,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 148,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorPrimary ?? DEFAULT_THEME_COLORS.colorPrimary,
                                        onChange: (value)=>handleThemeColorChange('colorPrimary', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 156,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "主色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 157,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 155,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorSecondary ?? DEFAULT_THEME_COLORS.colorSecondary,
                                        onChange: (value)=>handleThemeColorChange('colorSecondary', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 160,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "次色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 164,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 159,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorBg ?? DEFAULT_THEME_COLORS.colorBg,
                                        onChange: (value)=>handleThemeColorChange('colorBg', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 167,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "背景色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 168,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 166,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorBorder ?? DEFAULT_THEME_COLORS.colorBorder,
                                        onChange: (value)=>handleThemeColorChange('colorBorder', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 171,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "边框色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 172,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 170,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorCard ?? DEFAULT_THEME_COLORS.colorCard,
                                        onChange: (value)=>handleThemeColorChange('colorCard', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 175,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "卡片色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 176,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 174,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                        value: theme.colorArticle ?? DEFAULT_THEME_COLORS.colorArticle,
                                        onChange: (value)=>handleThemeColorChange('colorArticle', value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 179,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "文章背景"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 180,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 178,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                        lineNumber: 143,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                lineNumber: 141,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium",
                                children: "背景颜色"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 187,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: handleRandomizeColors,
                                        className: "rounded-lg border bg-white/60 px-3 py-1 text-xs whitespace-nowrap",
                                        children: "随机配色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 189,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: handleAddColor,
                                        className: "rounded-lg border bg-white/60 px-3 py-1 text-xs whitespace-nowrap",
                                        children: "+ 添加颜色"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 196,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 188,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                        lineNumber: 186,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: formData.backgroundColors.map((color, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                            value: color,
                                            onChange: (value)=>handleColorChange(index, value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                            lineNumber: 209,
                                            columnNumber: 9
                                        }, this),
                                        formData.backgroundColors.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleRemoveColor(index),
                                            className: "text-secondary absolute -top-1 -right-2 rounded-lg border bg-white/60 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                                className: "size-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                                lineNumber: 214,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                            lineNumber: 211,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                    lineNumber: 208,
                                    columnNumber: 8
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 207,
                                columnNumber: 7
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                        lineNumber: 205,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                lineNumber: 185,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: COLOR_PRESETS.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handlePresetChange(preset),
                        className: "flex items-center gap-3 rounded-lg border bg-white/60 p-3 transition-colors hover:bg-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-10 rounded-lg border-2 border-white/20 shadow-sm",
                                        style: {
                                            backgroundColor: preset.theme.colorBrand ?? DEFAULT_THEME_COLORS.colorBrand
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                        lineNumber: 230,
                                        columnNumber: 8
                                    }, this),
                                    preset.backgroundColors.map((color, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-10 w-10 rounded-lg border-2 border-white/20 shadow-sm",
                                            style: {
                                                backgroundColor: color
                                            }
                                        }, index, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                            lineNumber: 235,
                                            columnNumber: 9
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 229,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium whitespace-nowrap",
                                children: preset.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                                lineNumber: 239,
                                columnNumber: 7
                            }, this)
                        ]
                    }, preset.name, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                        lineNumber: 225,
                        columnNumber: 6
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
                lineNumber: 223,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/color-config.tsx",
        lineNumber: 140,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/config/card-styles-default.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"artCard":{"width":360,"height":200,"order":3,"offsetX":null,"offsetY":null,"enabled":true},"hiCard":{"width":360,"height":288,"order":1,"offsetX":null,"offsetY":null,"enabled":true},"clockCard":{"width":232,"height":132,"offset":92,"order":4,"offsetX":null,"offsetY":null,"enabled":true},"calendarCard":{"width":350,"height":286,"order":5,"offsetX":null,"offsetY":null,"enabled":true},"musicCard":{"width":293,"height":66,"offset":120,"order":6,"offsetX":null,"offsetY":null,"enabled":true},"socialButtons":{"width":315,"height":48,"order":6,"offsetX":null,"offsetY":null,"enabled":true},"shareCard":{"width":200,"height":180,"order":7,"offsetX":null,"offsetY":null,"enabled":true},"articleCard":{"width":266,"height":160,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"writeButtons":{"height":42,"width":180,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"navCard":{"width":280,"height":434,"order":2,"offsetX":null,"offsetY":null,"enabled":true},"likePosition":{"width":54,"height":54,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"hatCard":{"width":120,"height":120,"order":10,"offsetX":null,"offsetY":null,"enabled":false},"beianCard":{"width":200,"height":60,"order":11,"offsetX":null,"offsetY":null,"enabled":false}});}),
"[project]/src/app/(home)/config-dialog/home-layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeLayout",
    ()=>HomeLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/layout-edit-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$card$2d$styles$2d$default$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/card-styles-default.json (json)");
'use client';
;
;
;
;
const CARD_LABELS = {
    artCard: '首图',
    hiCard: '中心',
    clockCard: '时钟',
    calendarCard: '日历',
    musicCard: '音乐',
    socialButtons: '联系',
    shareCard: '分享',
    articleCard: '文章',
    writeButtons: '写作',
    navCard: '导航',
    likePosition: '点赞',
    hatCard: '帽子',
    beianCard: '备案'
};
function HomeLayout({ cardStylesData, setCardStylesData, onClose }) {
    const { setCardStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const startEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.startEditing);
    const editing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.editing);
    const handleStartManualLayout = ()=>{
        setCardStyles(cardStylesData);
        startEditing();
        onClose?.();
    };
    const handleReset = ()=>{
        setCardStylesData(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$card$2d$styles$2d$default$2e$json__$28$json$29$__["default"]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-secondary text-sm",
                        children: "（偏移代表相对中心的偏移）"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                        lineNumber: 48,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-2 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleReset,
                                className: "bg-card rounded-xl border px-3 py-1.5 text-xs font-medium",
                                children: "重置"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                lineNumber: 50,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleStartManualLayout,
                                disabled: editing,
                                className: "bg-card rounded-xl border px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50",
                                children: editing ? '主页正在编辑中' : '进入主页拖拽布局'
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                lineNumber: 53,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                        lineNumber: 49,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                lineNumber: 47,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "mt-3 w-full border-collapse text-sm whitespace-nowrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b text-xs text-gray-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "卡片"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 65,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "宽度"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 66,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "高度"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 67,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "显示顺序"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 68,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "横向偏移"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 69,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "纵向偏移"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 70,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2 text-left font-medium",
                                    children: "启用"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                    lineNumber: 71,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                            lineNumber: 64,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                        lineNumber: 63,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: Object.entries(cardStylesData).map(([key, cardStyle])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2 align-middle whitespace-nowrap",
                                        children: CARD_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').trim()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 77,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: cardStyle.width !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: cardStyle.width,
                                            onChange: (e)=>setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            width: parseInt(e.target.value) || 0
                                                        }
                                                    })),
                                            className: "no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 81,
                                            columnNumber: 10
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-400",
                                            children: "-"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 96,
                                            columnNumber: 10
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 79,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: cardStyle.height !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: cardStyle.height,
                                            onChange: (e)=>setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            height: parseInt(e.target.value) || 0
                                                        }
                                                    })),
                                            className: "no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 101,
                                            columnNumber: 10
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-400",
                                            children: "-"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 116,
                                            columnNumber: 10
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 99,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: cardStyle.order,
                                            onChange: (e)=>setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            order: parseInt(e.target.value) || 0
                                                        }
                                                    })),
                                            className: "bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 120,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 119,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: cardStyle.offsetX ?? '',
                                            placeholder: "null",
                                            onChange: (e)=>{
                                                const value = e.target.value === '' ? null : parseInt(e.target.value) || 0;
                                                setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            offsetX: value
                                                        }
                                                    }));
                                            },
                                            className: "no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 136,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 135,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: cardStyle.offsetY ?? '',
                                            placeholder: "null",
                                            onChange: (e)=>{
                                                const value = e.target.value === '' ? null : parseInt(e.target.value) || 0;
                                                setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            offsetY: value
                                                        }
                                                    }));
                                            },
                                            className: "no-spinner bg-secondary/10 w-full rounded-lg border px-3 py-1.5 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 154,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 153,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-3 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: cardStyle.enabled ?? true,
                                            onChange: (e)=>setCardStylesData((prev)=>({
                                                        ...prev,
                                                        [key]: {
                                                            ...prev[key],
                                                            enabled: e.target.checked
                                                        }
                                                    })),
                                            className: "accent-brand h-4 w-4 rounded border-gray-300"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                            lineNumber: 172,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                        lineNumber: 171,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                                lineNumber: 76,
                                columnNumber: 7
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                        lineNumber: 74,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
                lineNumber: 62,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(home)/config-dialog/home-layout.tsx",
        lineNumber: 46,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/config-dialog/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfigDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$services$2f$push$2d$site$2d$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/services/push-site-content.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/site-settings/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$color$2d$config$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/color-config.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$home$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/home-layout.tsx [app-ssr] (ecmascript)");
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
function ConfigDialog({ open, onClose }) {
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent, setSiteContent, cardStyles, setCardStyles, regenerateBubbles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(siteContent);
    const [cardStylesData, setCardStylesData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cardStyles);
    const [originalData, setOriginalData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(siteContent);
    const [originalCardStyles, setOriginalCardStyles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cardStyles);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('site');
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [faviconItem, setFaviconItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatarItem, setAvatarItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [artImageUploads, setArtImageUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [backgroundImageUploads, setBackgroundImageUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [socialButtonImageUploads, setSocialButtonImageUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) {
            const current = {
                ...siteContent
            };
            const currentCardStyles = {
                ...cardStyles
            };
            setFormData(current);
            setCardStylesData(currentCardStyles);
            setOriginalData(current);
            setOriginalCardStyles(currentCardStyles);
            setFaviconItem(null);
            setAvatarItem(null);
            setArtImageUploads({});
            setBackgroundImageUploads({});
            setSocialButtonImageUploads({});
            setActiveTab('site');
        }
    }, [
        open,
        siteContent,
        cardStyles
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            // Clean up preview URLs on unmount
            if (faviconItem?.type === 'file') {
                URL.revokeObjectURL(faviconItem.previewUrl);
            }
            if (avatarItem?.type === 'file') {
                URL.revokeObjectURL(avatarItem.previewUrl);
            }
            Object.values(artImageUploads).forEach((item)=>{
                if (item.type === 'file') {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
            Object.values(backgroundImageUploads).forEach((item)=>{
                if (item.type === 'file') {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
            Object.values(socialButtonImageUploads).forEach((item)=>{
                if (item.type === 'file') {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
        };
    }, [
        faviconItem,
        avatarItem,
        artImageUploads,
        backgroundImageUploads,
        socialButtonImageUploads
    ]);
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
    const handleSave = async ()=>{
        setIsSaving(true);
        try {
            // Calculate removed art images so that we can delete files in repo
            const originalArtImages = originalData.artImages ?? [];
            const currentArtImages = formData.artImages ?? [];
            const removedArtImages = originalArtImages.filter((orig)=>!currentArtImages.some((current)=>current.id === orig.id));
            // Calculate removed background images
            const originalBackgroundImages = originalData.backgroundImages ?? [];
            const currentBackgroundImages = formData.backgroundImages ?? [];
            const removedBackgroundImages = originalBackgroundImages.filter((orig)=>!currentBackgroundImages.some((current)=>current.id === orig.id));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$services$2f$push$2d$site$2d$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pushSiteContent"])(formData, cardStylesData, faviconItem, avatarItem, artImageUploads, removedArtImages, backgroundImageUploads, removedBackgroundImages, socialButtonImageUploads);
            setSiteContent(formData);
            setCardStyles(cardStylesData);
            updateThemeVariables(formData.theme);
            setFaviconItem(null);
            setAvatarItem(null);
            setArtImageUploads({});
            setBackgroundImageUploads({});
            setSocialButtonImageUploads({});
            onClose();
        } catch (error) {
            console.error('Failed to save:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`保存失败: ${error?.message || '未知错误'}`);
        } finally{
            setIsSaving(false);
        }
    };
    const handleCancel = ()=>{
        // Clean up preview URLs
        if (faviconItem?.type === 'file') {
            URL.revokeObjectURL(faviconItem.previewUrl);
        }
        if (avatarItem?.type === 'file') {
            URL.revokeObjectURL(avatarItem.previewUrl);
        }
        Object.values(artImageUploads).forEach((item)=>{
            if (item.type === 'file') {
                URL.revokeObjectURL(item.previewUrl);
            }
        });
        Object.values(backgroundImageUploads).forEach((item)=>{
            if (item.type === 'file') {
                URL.revokeObjectURL(item.previewUrl);
            }
        });
        Object.values(socialButtonImageUploads).forEach((item)=>{
            if (item.type === 'file') {
                URL.revokeObjectURL(item.previewUrl);
            }
        });
        // Restore to the state when dialog was opened
        setSiteContent(originalData);
        setCardStyles(originalCardStyles);
        regenerateBubbles();
        // Restore document title and meta if they were changed by preview
        if (typeof document !== 'undefined') {
            document.title = originalData.meta.title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', originalData.meta.description);
            }
        }
        updateThemeVariables(originalData.theme);
        setFaviconItem(null);
        setAvatarItem(null);
        setArtImageUploads({});
        setBackgroundImageUploads({});
        setSocialButtonImageUploads({});
        onClose();
    };
    const updateThemeVariables = (theme)=>{
        if (typeof document === 'undefined' || !theme) return;
        const { colorBrand, colorBrandSecondary, colorPrimary, colorSecondary, colorBg, colorBorder, colorCard, colorArticle } = theme;
        const root = document.documentElement;
        if (colorBrand) root.style.setProperty('--color-brand', colorBrand);
        if (colorBrandSecondary) root.style.setProperty('--color-brand-secondary', colorBrandSecondary);
        if (colorPrimary) root.style.setProperty('--color-primary', colorPrimary);
        if (colorSecondary) root.style.setProperty('--color-secondary', colorSecondary);
        if (colorBg) root.style.setProperty('--color-bg', colorBg);
        if (colorBorder) root.style.setProperty('--color-border', colorBorder);
        if (colorCard) root.style.setProperty('--color-card', colorCard);
        if (colorArticle) root.style.setProperty('--color-article', colorArticle);
    };
    const handlePreview = ()=>{
        console.log('formData', formData);
        setSiteContent(formData);
        setCardStyles(cardStylesData);
        regenerateBubbles();
        // Update document title
        if (typeof document !== 'undefined') {
            document.title = formData.meta.title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', formData.meta.description);
            }
        }
        updateThemeVariables(formData.theme);
        onClose();
    };
    const buttonText = isAuth ? '保存' : '导入密钥';
    const tabs = [
        {
            id: 'site',
            label: '网站设置'
        },
        {
            id: 'color',
            label: '色彩配置'
        },
        {
            id: 'layout',
            label: '首页布局'
        }
    ];
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
                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                lineNumber: 232,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogModal"], {
                open: open,
                onClose: handleCancel,
                className: "card scrollbar-none max-h-[90vh] min-h-[600px] w-[640px] overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab(tab.id),
                                        className: `relative px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-brand' : 'text-secondary hover:text-primary'}`,
                                        children: [
                                            tab.label,
                                            activeTab === tab.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-brand absolute right-0 bottom-0 left-0 h-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                                lineNumber: 255,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, tab.id, true, {
                                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                        lineNumber: 248,
                                        columnNumber: 8
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                lineNumber: 246,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: handlePreview,
                                        className: "bg-card rounded-xl border px-6 py-2 text-sm",
                                        children: "预览"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                        lineNumber: 260,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: handleCancel,
                                        disabled: isSaving,
                                        className: "bg-card rounded-xl border px-6 py-2 text-sm",
                                        children: "取消"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                        lineNumber: 267,
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
                                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                        lineNumber: 275,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                lineNumber: 259,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                        lineNumber: 245,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[200px]",
                        children: [
                            activeTab === 'site' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$site$2d$settings$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteSettings"], {
                                formData: formData,
                                setFormData: setFormData,
                                faviconItem: faviconItem,
                                setFaviconItem: setFaviconItem,
                                avatarItem: avatarItem,
                                setAvatarItem: setAvatarItem,
                                artImageUploads: artImageUploads,
                                setArtImageUploads: setArtImageUploads,
                                backgroundImageUploads: backgroundImageUploads,
                                setBackgroundImageUploads: setBackgroundImageUploads,
                                socialButtonImageUploads: socialButtonImageUploads,
                                setSocialButtonImageUploads: setSocialButtonImageUploads
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                lineNumber: 283,
                                columnNumber: 7
                            }, this),
                            activeTab === 'color' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$color$2d$config$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorConfig"], {
                                formData: formData,
                                setFormData: setFormData
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                lineNumber: 298,
                                columnNumber: 32
                            }, this),
                            activeTab === 'layout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$home$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HomeLayout"], {
                                cardStylesData: cardStylesData,
                                setCardStylesData: setCardStylesData,
                                onClose: onClose
                            }, void 0, false, {
                                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                                lineNumber: 299,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                        lineNumber: 281,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/config-dialog/index.tsx",
                lineNumber: 244,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/layout/backgrounds/snowfall.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SnowfallBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const SNOWFLAKE_IMAGES = [
    '/images/christmas/snowflake/1.webp',
    '/images/christmas/snowflake/2.webp',
    '/images/christmas/snowflake/3.webp'
];
const DOT_RATIO = 0.8;
function SnowfallBackground({ zIndex, count = 125 }) {
    const [snowflakes, setSnowflakes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const generateSnowflakes = ()=>{
            const newSnowflakes = [];
            for(let i = 0; i < count; i++){
                const isDot = Math.random() < DOT_RATIO;
                const size = isDot ? Math.random() * 10 + 5 : Math.random() * 40 + 20;
                const duration = Math.random() * 20 + 20;
                const delay = Math.random() * 40;
                const left = Math.random() * 120;
                const imageIndex = isDot ? undefined : Math.floor(Math.random() * SNOWFLAKE_IMAGES.length);
                const rotate = Math.random() * 360 + 180;
                newSnowflakes.push({
                    id: i,
                    type: isDot ? 'dot' : 'image',
                    imageIndex,
                    size,
                    duration,
                    delay,
                    left,
                    rotate
                });
            }
            setSnowflakes(newSnowflakes);
        };
        generateSnowflakes();
    }, [
        count
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            opacity: 1
        },
        initial: {
            opacity: 0
        },
        transition: {
            duration: 1
        },
        className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        style: {
            zIndex
        },
        children: snowflakes.map((snowflake)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute",
                style: {
                    top: -200,
                    left: `${snowflake.left}%`,
                    width: `${snowflake.size}px`,
                    height: `${snowflake.size}px`
                },
                initial: {
                    y: 0,
                    x: 0
                },
                animate: {
                    y: window.innerHeight + 200,
                    x: `-${Math.random() * window.innerWidth / 5}px`,
                    rotate: snowflake.type === 'image' ? snowflake.rotate : 0
                },
                transition: {
                    duration: snowflake.duration,
                    delay: snowflake.delay,
                    repeat: Infinity,
                    ease: 'linear'
                },
                children: snowflake.type === 'dot' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full w-full rounded-full bg-white"
                }, void 0, false, {
                    fileName: "[project]/src/layout/backgrounds/snowfall.tsx",
                    lineNumber: 81,
                    columnNumber: 7
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: SNOWFLAKE_IMAGES[snowflake.imageIndex],
                    alt: "",
                    className: "h-full w-full object-contain",
                    draggable: false
                }, void 0, false, {
                    fileName: "[project]/src/layout/backgrounds/snowfall.tsx",
                    lineNumber: 83,
                    columnNumber: 7
                }, this)
            }, snowflake.id, false, {
                fileName: "[project]/src/layout/backgrounds/snowfall.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/layout/backgrounds/snowfall.tsx",
        lineNumber: 52,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/(home)/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$hi$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/hi-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$art$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/art-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$clock$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/clock-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$calendar$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/calendar-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$social$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/social-buttons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$share$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/share-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$aritcle$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/aritcle-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$write$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/write-buttons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$like$2d$position$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/like-position.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$hat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/hat-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$beian$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/beian-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/layout-edit-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/config-dialog/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$snowfall$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layout/backgrounds/snowfall.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
function Home() {
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const { cardStyles, configDialogOpen, setConfigDialogOpen, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const editing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.editing);
    const saveEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.saveEditing);
    const cancelEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEditStore"])((state)=>state.cancelEditing);
    const handleSave = ()=>{
        saveEditing();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('首页布局偏移已保存（尚未提交到远程配置）');
    };
    const handleCancel = ()=>{
        cancelEditing();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('已取消此次拖拽布局修改');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === ',')) {
                e.preventDefault();
                setConfigDialogOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        setConfigDialogOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$snowfall$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                zIndex: 0,
                count: !maxSM ? 125 : 20
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/page.tsx",
                lineNumber: 56,
                columnNumber: 36
            }, this),
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 shadow-lg backdrop-blur",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-600",
                            children: "正在编辑首页布局，拖拽卡片调整位置"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/page.tsx",
                            lineNumber: 61,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    type: "button",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    onClick: handleCancel,
                                    className: "rounded-xl border bg-white px-3 py-1 text-xs font-medium text-gray-700",
                                    children: "取消"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    type: "button",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    onClick: handleSave,
                                    className: "brand-btn px-3 py-1 text-xs",
                                    children: "保存偏移"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(home)/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(home)/page.tsx",
                            lineNumber: 62,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(home)/page.tsx",
                    lineNumber: 60,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/page.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-6 max-sm:pt-28 max-sm:pb-20",
                children: [
                    cardStyles.artCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$art$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 80,
                        columnNumber: 47
                    }, this),
                    cardStyles.hiCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$hi$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 81,
                        columnNumber: 46
                    }, this),
                    !maxSM && cardStyles.clockCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$clock$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 82,
                        columnNumber: 59
                    }, this),
                    !maxSM && cardStyles.calendarCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$calendar$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 83,
                        columnNumber: 62
                    }, this),
                    cardStyles.socialButtons?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$social$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 84,
                        columnNumber: 53
                    }, this),
                    !maxSM && cardStyles.shareCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$share$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 85,
                        columnNumber: 59
                    }, this),
                    cardStyles.articleCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$aritcle$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 86,
                        columnNumber: 51
                    }, this),
                    !maxSM && cardStyles.writeButtons?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$write$2d$buttons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 87,
                        columnNumber: 62
                    }, this),
                    cardStyles.likePosition?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$like$2d$position$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 88,
                        columnNumber: 52
                    }, this),
                    cardStyles.hatCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$hat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 89,
                        columnNumber: 47
                    }, this),
                    cardStyles.beianCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$beian$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/(home)/page.tsx",
                        lineNumber: 90,
                        columnNumber: 49
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/page.tsx",
                lineNumber: 79,
                columnNumber: 4
            }, this),
            siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$snowfall$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                zIndex: 2,
                count: !maxSM ? 125 : 20
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/page.tsx",
                lineNumber: 93,
                columnNumber: 36
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$config$2d$dialog$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: configDialogOpen,
                onClose: ()=>setConfigDialogOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(home)/page.tsx",
                lineNumber: 94,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_8a494b4d._.js.map