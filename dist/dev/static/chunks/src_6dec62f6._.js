(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/use-center.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCenterInit",
    ()=>useCenterInit,
    "useCenterStore",
    ()=>useCenterStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const computeCenter = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2) - 24,
        centerX: Math.floor(width / 2),
        centerY: Math.floor(height / 2),
        width,
        height
    };
};
const useCenterStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        x: 0,
        y: 0,
        centerX: 0,
        centerY: 0,
        width: 0,
        height: 0,
        setCenter: (x, y)=>set({
                x,
                y
            }),
        recalc: ()=>{
            const c = computeCenter();
            set({
                x: c.x,
                y: c.y,
                width: c.width,
                height: c.height,
                centerX: c.centerX,
                centerY: c.centerY
            });
        }
    }));
function useCenterInit() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "473556aa1ec9c765968277973fbc6bf10f1dc1167dd2e2104a00cd9c7dab31b7") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "473556aa1ec9c765968277973fbc6bf10f1dc1167dd2e2104a00cd9c7dab31b7";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_useCenterInitUseEffect, t0);
}
_s(useCenterInit, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function _useCenterInitUseEffect() {
    const update = _useCenterInitUseEffectUpdate;
    update();
    window.addEventListener("resize", update);
    return ()=>window.removeEventListener("resize", update);
}
function _useCenterInitUseEffectUpdate() {
    return useCenterStore.getState().recalc();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/site-content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"meta":{"title":"eagle-a","description":"eagle-a 的个人博客，一名热爱技术的在校大学生，记录前端开发、探索、笔记。","username":"eagle-a"},"theme":{"colorBrand":"#de4331","colorPrimary":"#4E3F42","colorSecondary":"#7b888e","colorBrandSecondary":"#FCC841","colorBg":"#eeeeee","colorBorder":"#ffffff","colorCard":"#ffffff66","colorArticle":"#ffffffcc"},"backgroundColors":["#FCC841","#DFEFFC","#DEDE92","#DE4331","#FE9750","#FCC841"],"artImages":[{"id":"cat","url":"/images/art/cat.png"},{"id":"a46372ff45bc5524","url":"/images/art/a46372ff45bc5524.jpg"}],"currentArtImageId":"a46372ff45bc5524","backgroundImages":[{"id":"","url":""}],"currentBackgroundImageId":"","socialButtons":[{"id":"github","type":"github","value":"https://github.com/eagle-a","label":"Github","order":3},{"id":"zhihu","type":"zhihu","value":"https://www.zhihu.com/people/23-86-80-47-84","label":"知乎","order":2},{"id":"email","type":"email","value":"2121612901@qq.com","label":"","order":1}],"clockShowSeconds":false,"summaryInContent":false,"isCachePem":false,"hideEditButton":false,"enableCategories":true,"currentHatIndex":3,"hatFlipped":false,"enableChristmas":false,"beian":{"text":"","link":""}});}),
"[project]/src/layout/backgrounds/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simplex noise implementation (small, inline) adapted from Jonas Wagner (public domain)
// https://github.com/jwagner/simplex-noise.js (trimmed for 2D)
__turbopack_context__.s([
    "makeNoise2D",
    ()=>makeNoise2D,
    "rand",
    ()=>rand
]);
function makeNoise2D(random = Math.random) {
    const p = new Uint8Array(256);
    for(let i = 0; i < 256; i++)p[i] = random() * 256 | 0;
    function grad2(hash, x, y) {
        const h = hash & 7;
        const u = h < 4 ? x : y;
        const v = h < 4 ? y : x;
        return (h & 1 ? -u : u) + (h & 2 ? -2 * v : 2 * v);
    }
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    return function noise2D(xin, yin) {
        let n0 = 0, n1 = 0, n2 = 0;
        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        const i1 = x0 > y0 ? 1 : 0;
        const j1 = x0 > y0 ? 0 : 1;
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;
        const ii = i & 255;
        const jj = j & 255;
        const t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = p[ii + p[jj]];
            const t0_4 = t0 * t0 * t0 * t0;
            n0 = t0_4 * grad2(gi0, x0, y0);
        }
        const t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = p[ii + i1 + p[jj + j1]];
            const t1_4 = t1 * t1 * t1 * t1;
            n1 = t1_4 * grad2(gi1, x1, y1);
        }
        const t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = p[ii + 1 + p[jj + 1]];
            const t2_4 = t2 * t2 * t2 * t2;
            n2 = t2_4 * grad2(gi2, x2, y2);
        }
        return 40 * (n0 + n1 + n2);
    };
}
function rand(a, b) {
    return a + Math.random() * (b - a);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/layout/backgrounds/blurred-bubbles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlurredBubblesBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/site-content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layout/backgrounds/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function BlurredBubblesBackground({ count = 6, colors = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"].backgroundColors, minRadius = 250, maxRadius = 400, bottomBandStart = 0.8, speed = 0.12, noiseScale = 0.0008, noiseTimeScale = 0.00015, targetFps = 6, debugFps = false, startDelayMs = 1500, regenerateKey = 0 }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const noise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeNoise2D"])());
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlurredBubblesBackground.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let width = canvas.width = canvas.clientWidth;
            let height = canvas.height = canvas.clientHeight;
            const DPR = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.floor(width * DPR);
            canvas.height = Math.floor(height * DPR);
            ctx.scale(DPR, DPR);
            const effectiveFps = Math.max(1, targetFps);
            // 1s debounce for resize observer
            let resizeTimer = null;
            const handleResize = {
                "BlurredBubblesBackground.useEffect.handleResize": ()=>{
                    if (!canvas || !ctx) return;
                    const nextWidth = canvas.clientWidth;
                    const nextHeight = canvas.clientHeight;
                    if (nextWidth === width && nextHeight === height) return;
                    width = nextWidth;
                    height = nextHeight;
                    canvas.width = Math.floor(width * DPR);
                    canvas.height = Math.floor(height * DPR);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.scale(DPR, DPR);
                    // Recompute occupancy grid on resize
                    allocateGrid();
                    draw();
                }
            }["BlurredBubblesBackground.useEffect.handleResize"];
            const onResize = {
                "BlurredBubblesBackground.useEffect.onResize": (...args)=>{
                    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
                    resizeTimer = window.setTimeout({
                        "BlurredBubblesBackground.useEffect.onResize": ()=>{
                            handleResize(...args);
                            resizeTimer = null;
                        }
                    }["BlurredBubblesBackground.useEffect.onResize"], 1000);
                }
            }["BlurredBubblesBackground.useEffect.onResize"];
            const ro = new ResizeObserver(onResize);
            ro.observe(canvas);
            // --- Occupancy grid (for coverage guidance) ---
            const gridCell = 80; // px
            let gridCols = 0, gridRows = 0, grid;
            function allocateGrid() {
                gridCols = Math.max(1, Math.ceil(width / gridCell));
                gridRows = Math.max(1, Math.ceil(height / gridCell));
                grid = new Float32Array(gridCols * gridRows);
            }
            function stampOccupancy(x, y, r) {
                // Add a small amount to nearby cells so paths get balanced over time
                const c0 = Math.floor((x - r) / gridCell);
                const c1 = Math.floor((x + r) / gridCell);
                const r0 = Math.floor((y - r) / gridCell);
                const r1 = Math.floor((y + r) / gridCell);
                for(let cy = r0; cy <= r1; cy++){
                    for(let cx = c0; cx <= c1; cx++){
                        if (cx < 0 || cy < 0 || cx >= gridCols || cy >= gridRows) continue;
                        const idx = cy * gridCols + cx;
                        grid[idx] += 0.5; // weight
                    }
                }
            }
            function lowestOccupancyTarget() {
                // Find the lowest occupancy cell inside the bottom band
                const startRow = Math.floor(gridRows * bottomBandStart);
                let bestIdx = startRow * gridCols;
                let bestVal = Infinity;
                for(let cy_0 = startRow; cy_0 < gridRows; cy_0++){
                    for(let cx_0 = 0; cx_0 < gridCols; cx_0++){
                        const idx_0 = cy_0 * gridCols + cx_0;
                        const v = grid[idx_0];
                        if (v < bestVal) {
                            bestVal = v;
                            bestIdx = idx_0;
                        }
                    }
                }
                const ty = (Math.floor(bestIdx / gridCols) + 0.5) * gridCell;
                const tx = (bestIdx % gridCols + 0.5) * gridCell;
                return {
                    tx,
                    ty
                };
            }
            allocateGrid();
            // Poisson-ish initial placement to avoid clusters
            const bubbles = [];
            const minDist = Math.max(minRadius * 0.2, 80);
            const maxTries = 5000;
            let tries = 0;
            while(bubbles.length < count && tries < maxTries){
                tries++;
                const r_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(minRadius, maxRadius);
                const x_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(-r_0 / 2, width + r_0 / 2);
                const y_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(height * bottomBandStart, height * 1.2);
                let ok = true;
                for (let b of bubbles){
                    const dx = b.x - x_0;
                    const dy = b.y - y_0;
                    if (Math.hypot(dx, dy) < (b.r + r_0) * 0.6 || Math.hypot(dx, dy) < minDist) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    bubbles.push({
                        x: x_0,
                        y: y_0,
                        r: r_0,
                        color: colors[bubbles.length % colors.length | 0],
                        vx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(-0.2, 0.2),
                        vy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(-0.2, 0.2),
                        jitter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(0.6, 1.2),
                        blur: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rand"])(200, 400)
                    });
                }
            }
            // console.log('[bg] tries:', tries)
            // console.log('[bg] bubbles count:', bubbles.length)
            // --- Animation loop ---
            const FRAME_INTERVAL = 1000 / effectiveFps;
            let lastTime = 0;
            let accumulatedTime = 0;
            let fpsCounter = 0;
            let fpsStart = 0;
            function updatePhysics(t) {
                const { tx: tx_0, ty: ty_0 } = lowestOccupancyTarget();
                // Update physics
                for(let i = 0; i < bubbles.length; i++){
                    const b_0 = bubbles[i];
                    // 1) Flow field (smooth wandering)
                    const n = noise.current(b_0.x * noiseScale, b_0.y * noiseScale + t * noiseTimeScale);
                    const angle = n * Math.PI * 2;
                    const fx = Math.cos(angle) * speed * b_0.jitter;
                    const fy = Math.sin(angle) * speed * b_0.jitter;
                    // 2) Separation (avoid clumping)
                    let sx = 0, sy = 0;
                    for(let j = 0; j < bubbles.length; j++)if (j !== i) {
                        const o = bubbles[j];
                        const dx_0 = b_0.x - o.x;
                        const dy_0 = b_0.y - o.y;
                        const d2 = dx_0 * dx_0 + dy_0 * dy_0;
                        const minD = (b_0.r + o.r) * 0.4;
                        if (d2 < minD * minD && d2 > 0.001) {
                            const d = Math.sqrt(d2);
                            const push = (minD - d) / minD; // 0..1
                            sx += dx_0 / d * push * 0.8;
                            sy += dy_0 / d * push * 0.8;
                        }
                    }
                    // 3) Coverage bias (drift toward emptier cells)
                    const dxT = tx_0 - b_0.x;
                    const dyT = ty_0 - b_0.y;
                    const dT = Math.hypot(dxT, dyT) + 1e-3;
                    const cx_1 = dxT / dT * 0.05; // gentle
                    const cy_1 = dyT / dT * 0.05;
                    // 4) Vertical band constraint
                    const bandMin = height * bottomBandStart;
                    const bandMax = height * 1.5;
                    let bx = 0, by = 0;
                    if (b_0.y < bandMin) by += (bandMin - b_0.y) * 0.01;
                    if (b_0.y > bandMax) by -= (b_0.y - bandMax) * 0.01;
                    // Combine forces
                    b_0.vx += fx + sx + cx_1 + bx;
                    b_0.vy += fy + sy + cy_1 + by;
                    // Apply damping to prevent velocity accumulation
                    const damping = 0.95;
                    b_0.vx *= damping;
                    b_0.vy *= damping;
                    // Velocity limits to prevent runaway motion
                    const maxVel = 2;
                    const vel = Math.hypot(b_0.vx, b_0.vy);
                    if (vel > maxVel) {
                        b_0.vx = b_0.vx / vel * maxVel;
                        b_0.vy = b_0.vy / vel * maxVel;
                    }
                    // Integrate
                    b_0.x += b_0.vx;
                    b_0.y += b_0.vy;
                    // Soft wrap horizontally to avoid bunching at edges
                    if (b_0.x < -b_0.r - b_0.blur / 3) b_0.x = width + b_0.r + b_0.blur / 3;
                    if (b_0.x > width + b_0.r + b_0.blur / 3) b_0.x = -b_0.r - b_0.blur / 3;
                    // Keep a little padding from exact edge vertically
                    b_0.y = Math.min(Math.max(b_0.y, bandMin - b_0.r * 0.25), bandMax + b_0.r * 0.25);
                    // Occupancy stamp
                    stampOccupancy(b_0.x, b_0.y, b_0.r * 0.6);
                }
            }
            function draw() {
                for (const b_1 of bubbles){
                    ctx.save();
                    ctx.filter = `blur(${b_1.blur}px)`;
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.fillStyle = b_1.color;
                    ctx.arc(b_1.x, b_1.y, b_1.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
            function frame(t_0) {
                if (!ctx) return;
                // Rate limiting
                {
                    if (document.hidden) {
                        animRef.current = requestAnimationFrame(frame);
                        return;
                    }
                    // Frame rate limiting
                    const deltaTime = lastTime ? t_0 - lastTime : 0;
                    lastTime = t_0;
                    accumulatedTime += deltaTime;
                    if (accumulatedTime < FRAME_INTERVAL) {
                        animRef.current = requestAnimationFrame(frame);
                        return;
                    }
                    accumulatedTime = 0;
                }
                ctx.clearRect(0, 0, width, height);
                updatePhysics(t_0);
                draw();
                // FPS measurement (optional)
                if (debugFps) {
                    if (fpsStart === 0) fpsStart = t_0;
                    fpsCounter++;
                    if (t_0 - fpsStart >= 1000) {
                        // Log measured fps vs target
                        // eslint-disable-next-line no-console
                        console.log('[blurred-bubbles] fps=', fpsCounter, 'target=', effectiveFps);
                        fpsCounter = 0;
                        fpsStart = t_0;
                    }
                }
                animRef.current = requestAnimationFrame(frame);
            }
            if (window.innerWidth < 640) {
                setTimeout({
                    "BlurredBubblesBackground.useEffect": ()=>{
                        animRef.current = requestAnimationFrame(frame);
                    }
                }["BlurredBubblesBackground.useEffect"], startDelayMs);
            }
            draw();
            return ({
                "BlurredBubblesBackground.useEffect": ()=>{
                    cancelAnimationFrame(animRef.current);
                    ro.disconnect();
                    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
                }
            })["BlurredBubblesBackground.useEffect"];
        }
    }["BlurredBubblesBackground.useEffect"], [
        colors,
        regenerateKey
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            opacity: 1
        },
        initial: {
            opacity: 0
        },
        transition: {
            duration: 1
        },
        className: "fixed inset-0 z-0 overflow-hidden",
        style: {
            filter: 'blur(50px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: ref,
            className: "h-full w-full",
            style: {
                display: 'block'
            }
        }, void 0, false, {
            fileName: "[project]/src/layout/backgrounds/blurred-bubbles.tsx",
            lineNumber: 318,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/layout/backgrounds/blurred-bubbles.tsx",
        lineNumber: 309,
        columnNumber: 10
    }, this);
}
_s(BlurredBubblesBackground, "vy+r8G4NF/tHv20rZ4BSBbTMFn4=");
_c = BlurredBubblesBackground;
var _c;
__turbopack_context__.k.register(_c, "BlurredBubblesBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/consts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIMATION_DELAY",
    ()=>ANIMATION_DELAY,
    "BLOG_SLUG_KEY",
    ()=>BLOG_SLUG_KEY,
    "CARD_SPACING",
    ()=>CARD_SPACING,
    "CARD_SPACING_SM",
    ()=>CARD_SPACING_SM,
    "GITHUB_CONFIG",
    ()=>GITHUB_CONFIG,
    "INIT_DELAY",
    ()=>INIT_DELAY
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const INIT_DELAY = 0.3;
const ANIMATION_DELAY = 0.1;
const CARD_SPACING = 36;
const CARD_SPACING_SM = 24;
const BLOG_SLUG_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BLOG_SLUG_KEY || '';
const GITHUB_CONFIG = {
    OWNER: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GITHUB_OWNER || 'eagle-a',
    REPO: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GITHUB_REPO || 'zhanming-blog-new',
    BRANCH: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
    APP_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GITHUB_APP_ID || '-',
    ENCRYPT_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GITHUB_ENCRYPT_KEY || 'wudishiduomejimo'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "getFileExt",
    ()=>getFileExt,
    "rand",
    ()=>rand,
    "thousandsSeparator",
    ()=>thousandsSeparator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(inputs));
}
function thousandsSeparator(n, sign = ',') {
    if (typeof n === 'string' || typeof n === 'number') {
        n = String(n);
        const reg = /\B(?=(\d{3})+($|\.))/g;
        if (n.includes('.')) {
            const nArr = n.split('.');
            nArr[0] = nArr[0].replace(reg, `$&${sign}`);
            return nArr.join('.');
        }
        return n.replace(reg, `$&${sign}`);
    } else return 0;
}
function getFileExt(filename) {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.jpg')) return '.jpg';
    if (lower.endsWith('.jpeg')) return '.jpeg';
    if (lower.endsWith('.webp')) return '.webp';
    if (lower.endsWith('.png')) return '.png';
    if (lower.endsWith('.svg')) return '.svg';
    return '.png';
}
function rand(a, b) {
    return a + Math.random() * (b - a);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-size.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSize",
    ()=>useSize,
    "useSizeInit",
    ()=>useSizeInit,
    "useSizeStore",
    ()=>useSizeStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const initState = {
    init: false,
    maxXL: false,
    maxLG: false,
    maxMD: false,
    maxSM: false,
    maxXS: false
};
const computeSize = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const width = window.innerWidth;
        return {
            init: true,
            maxXL: width < 1280,
            maxLG: width < 1024,
            maxMD: width < 768,
            maxSM: width < 640,
            maxXS: width < 360
        };
    }
    //TURBOPACK unreachable
    ;
};
const useSizeStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        ...initState,
        recalc: ()=>{
            set(computeSize());
        }
    }));
function useSizeInit() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "cfc5a408bde530489c8debe028813f93eaeecfbeeeaf0f568923af2f21ece9cd") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cfc5a408bde530489c8debe028813f93eaeecfbeeeaf0f568923af2f21ece9cd";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_useSizeInitUseEffect, t0);
}
_s(useSizeInit, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function _useSizeInitUseEffect() {
    const update = _useSizeInitUseEffectUpdate;
    update();
    window.addEventListener("resize", update);
    return ()=>window.removeEventListener("resize", update);
}
function _useSizeInitUseEffectUpdate() {
    return useSizeStore.getState().recalc();
}
const useSize = useSizeStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Card({ children, order, width, height, x, y, className }) {
    _s();
    const { maxSM, init } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    let [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (maxSM && init) order = 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Card.useEffect": ()=>{
            if (show) return;
            if (x === 0 && y === 0) return;
            setTimeout({
                "Card.useEffect": ()=>{
                    setShow(true);
                }
            }["Card.useEffect"], order * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_DELAY"] * 1000);
        }
    }["Card.useEffect"], [
        x,
        y,
        show
    ]);
    if (show) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('card squircle', className),
        initial: {
            opacity: 0,
            scale: 0.6,
            left: x,
            top: y,
            width,
            height
        },
        animate: {
            opacity: 1,
            scale: 1,
            left: x,
            top: y,
            width,
            height
        },
        whileHover: {
            scale: 1.05
        },
        whileTap: {
            scale: 0.95
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/card.tsx",
        lineNumber: 39,
        columnNumber: 20
    }, this);
    return null;
}
_s(Card, "OsRcjJWRyEMf6gW8y/I6yLEt/N4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"]
    ];
});
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/scroll-outline.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path, _path2, _mask, _path3, _path4, _path5;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgScrollOutline = function SvgScrollOutline(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "currentColor",
        strokeWidth: 1.5,
        d: "M8.4 4.328H22.09c.657 0 1.084.163 1.355.4.267.231.479.616.543 1.258l.001.009.001.01c.122.975.036 2.068-.09 3.356h-2.56v12.262c0 .587-.13 1.026-.333 1.351-.184.294-.451.53-.816.707-.19.018-.377.058-.504.083-.22.044-.332.064-.397.064H6.066c-.696 0-1.237-.22-1.598-.569-.358-.344-.607-.876-.607-1.636v-.806H6.04V6.689c0-1.428 1.04-2.361 2.361-2.361Z"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M9.022 10.733h9.022c.778 0 1.09-.31 1.09-.622 0-.467-.467-.778-1.09-.778H9.022c-.466 0-.778.309-.778.778 0 .311.312.622.778.622"
    })), _mask || (_mask = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("mask", {
        id: "scroll-outline_svg__a",
        fill: "#fff"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        d: "M9.178 13.222c-.467 0-.778.156-.778.623 0 .526.1.655.622.777h4.511c.467 0 .778-.31.778-.777 0-.312-.311-.623-.778-.623z"
    }))), _path3 || (_path3 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "m9.022 14.622-.342 1.46.169.04h.173zm-.622-.777h1.5a.8.8 0 0 1-.079.326 1 1 0 0 1-.335.408c-.242.173-.427.143-.308.143v-3c-.349 0-.922.048-1.436.416-.615.44-.842 1.103-.842 1.707zm.778-.623v1.5h4.355v-3H9.178zm4.355 0v1.5a.65.65 0 0 1-.412-.166.93.93 0 0 1-.31-.711h3c0-1.349-1.208-2.123-2.278-2.123zm.778.623h-1.5a.73.73 0 0 1 .226-.497.73.73 0 0 1 .496-.226v3c.574 0 1.17-.198 1.625-.653s.653-1.05.653-1.624zm-.778.777v-1.5h-4.51v3h4.51zm-4.51 0 .34-1.46c-.098-.024-.09-.028-.04-.005.067.03.223.114.365.293.144.18.192.353.207.428.011.057.005.067.005-.034h-3c0 .249-.007.912.442 1.476.446.56 1.091.705 1.338.763z",
        mask: "url(#scroll-outline_svg__a)"
    })), _path4 || (_path4 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "currentColor",
        strokeWidth: 1.5,
        d: "M6.2 20.82h11.5l1 3.28"
    })), _path5 || (_path5 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M20.59 9.499a.75.75 0 1 0 1.5.002l-.75-.001zm.75-3.554-.75.001zm0 3.555h.75v-.094l.001-1.156V5.944l-.75.001-.75.001a979 979 0 0 1 0 3.458v.095zm0-3.555.75-.001c0-.126.027-.345.124-.536a.7.7 0 0 1 .48-.384L22.5 4.3l-.194-.724a2.2 2.2 0 0 0-1.43 1.155 2.76 2.76 0 0 0-.286 1.215z"
    })));
};
_c = SvgScrollOutline;
const __TURBOPACK__default__export__ = SvgScrollOutline;
var _c;
__turbopack_context__.k.register(_c, "SvgScrollOutline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/scroll-filled.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgScrollFilled = function SvgScrollFilled(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M24.733 5.911c-.155-1.555-1.089-2.333-2.644-2.333H8.4c-1.711 0-3.111 1.244-3.111 3.11v13.379H3.11v1.555c0 1.867 1.245 2.956 2.956 2.956h13.222c.311 0 .778-.156 1.089-.156 1.089-.466 1.71-1.4 1.71-2.8V10.111h2.49c.155-1.555.31-2.955.155-4.2m-7.31 17.111h-11.2c-1.09 0-1.712-.622-1.712-1.555v-.156h12.6c.156.622.311 1.089.467 1.711zM8.4 13.844c0-.466.311-.622.778-.622h4.355c.467 0 .778.311.778.622 0 .467-.311.778-.778.778h-4.51c-.312-.155-.623-.31-.623-.778m9.644-3.11H9.022c-.466 0-.778-.312-.778-.623.156-.467.312-.778.778-.778h9.022c.623 0 1.09.311 1.09.778 0 .311-.312.622-1.09.622m5.29-2.178h-1.09v-2.8c0-.312.311-.467.467-.467.311 0 .467.311.467.467v2.8z"
    })));
};
_c = SvgScrollFilled;
const __TURBOPACK__default__export__ = SvgScrollFilled;
var _c;
__turbopack_context__.k.register(_c, "SvgScrollFilled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/projects-filled.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgProjectsFilled = function SvgProjectsFilled(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M10.171 5.156q.597 0 1.025.407.426.407.425.999v5.67q.001.588-.425 1.01-.426.42-1.025.42H4.425q-.596 0-1.012-.42A1.4 1.4 0 0 1 3 12.232v-5.67q0-.589.413-.999a1.39 1.39 0 0 1 1.012-.407zm0 11.338q.597 0 1.025.407.426.407.425 1v5.693q.001.588-.425.999A1.43 1.43 0 0 1 10.17 25H4.425q-.596 0-1.012-.407a1.34 1.34 0 0 1-.413-1V17.9q0-.589.413-.999a1.38 1.38 0 0 1 1.012-.407zm11.514 0q.597 0 1.012.407.414.407.413 1v5.693q0 .588-.413.999a1.39 1.39 0 0 1-1.012.407h-5.743q-.598 0-1.025-.407a1.32 1.32 0 0 1-.425-1V17.9q-.001-.589.425-.999a1.43 1.43 0 0 1 1.024-.407zm2.855-8.846q.461.454.46 1.065.001.611-.46 1.045l-4.276 4.219q-.459.454-1.066.453-.61 0-1.067-.453l-4.276-4.22a1.41 1.41 0 0 1-.437-1.044q0-.613.437-1.065l4.274-4.216A1.5 1.5 0 0 1 19.195 3q.61 0 1.067.432z"
    })));
};
_c = SvgProjectsFilled;
const __TURBOPACK__default__export__ = SvgProjectsFilled;
var _c;
__turbopack_context__.k.register(_c, "SvgProjectsFilled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/projects-outline.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgProjectsOutline = function SvgProjectsOutline(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "currentColor",
        strokeWidth: 1.5,
        d: "M4.426 17.494h5.745c.144 0 .238.039.335.131a.33.33 0 0 1 .115.275v5.694c0 .12-.03.191-.115.274a.43.43 0 0 1-.335.132H4.426a.4.4 0 0 1-.314-.122C4.035 23.802 4 23.73 4 23.594V17.9a.36.36 0 0 1 .118-.29c.078-.077.156-.116.308-.116Zm11.515 0h5.744c.107 0 .18.021.248.067l.065.055a.35.35 0 0 1 .112.284v5.694a.36.36 0 0 1-.115.287.39.39 0 0 1-.31.119H15.94a.44.44 0 0 1-.335-.132.33.33 0 0 1-.115-.274V17.9c0-.12.03-.192.115-.275a.43.43 0 0 1 .335-.13ZM19.195 4c.107 0 .197.023.287.084l.092.074 4.264 4.201v.001c.128.127.162.23.162.353 0 .124-.033.212-.145.316l-.008.008-.01.009-4.276 4.219c-.133.131-.239.166-.364.166-.127 0-.234-.037-.361-.163l-.003-.003-4.275-4.22a.42.42 0 0 1-.14-.332c0-.107.023-.194.082-.28l.072-.087 4.247-4.19A.5.5 0 0 1 19.195 4ZM4.425 6.155h5.746c.144 0 .238.04.335.132.083.08.115.148.115.275v5.67a.37.37 0 0 1-.128.298.4.4 0 0 1-.322.132H4.426a.37.37 0 0 1-.3-.119h.002A.4.4 0 0 1 4 12.231v-5.67l.007-.087a.35.35 0 0 1 .108-.2.4.4 0 0 1 .31-.119Z"
    })));
};
_c = SvgProjectsOutline;
const __TURBOPACK__default__export__ = SvgProjectsOutline;
var _c;
__turbopack_context__.k.register(_c, "SvgProjectsOutline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/about-filled.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _circle, _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgAboutFilled = function SvgAboutFilled(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _circle || (_circle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("circle", {
        cx: 14,
        cy: 14,
        r: 11,
        fill: "currentColor"
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "#fff",
        strokeLinecap: "round",
        strokeWidth: 1.5,
        d: "M10 18c2.5 2.5 5.5 2.5 8 0"
    })));
};
_c = SvgAboutFilled;
const __TURBOPACK__default__export__ = SvgAboutFilled;
var _c;
__turbopack_context__.k.register(_c, "SvgAboutFilled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/about-outline.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _circle, _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgAboutOutline = function SvgAboutOutline(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _circle || (_circle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("circle", {
        cx: 14,
        cy: 14,
        r: 10,
        stroke: "currentColor",
        strokeWidth: 1.6
    })), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: 1.5,
        d: "M10 18c2.5 2.5 5.5 2.5 8 0"
    })));
};
_c = SvgAboutOutline;
const __TURBOPACK__default__export__ = SvgAboutOutline;
var _c;
__turbopack_context__.k.register(_c, "SvgAboutOutline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/share-filled.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgShareFilled = function SvgShareFilled(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M7.59 25.25c-.287 0-.57-.09-.814-.266a1.38 1.38 0 0 1-.57-1.237l.51-6.34-4.139-4.83a1.38 1.38 0 0 1-.266-1.335 1.38 1.38 0 0 1 1-.923l6.188-1.475 3.314-5.429A1.38 1.38 0 0 1 14 2.75c.488 0 .932.249 1.187.666l3.314 5.43 6.188 1.474a1.38 1.38 0 0 1 1 .923c.151.465.052.964-.267 1.335l-4.138 4.83.509 6.34c.04.487-.174.95-.57 1.237-.394.287-.899.347-1.351.158L14 22.698l-5.873 2.444a1.4 1.4 0 0 1-.536.109"
    })));
};
_c = SvgShareFilled;
const __TURBOPACK__default__export__ = SvgShareFilled;
var _c;
__turbopack_context__.k.register(_c, "SvgShareFilled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/share-outline.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgShareOutline = function SvgShareOutline(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M7.59 25.25c-.287 0-.57-.09-.814-.266a1.38 1.38 0 0 1-.57-1.237l.51-6.34-4.139-4.83a1.38 1.38 0 0 1-.266-1.335 1.38 1.38 0 0 1 1-.923l6.188-1.475 3.314-5.429A1.38 1.38 0 0 1 14 2.75c.488 0 .932.249 1.187.666l3.314 5.43 6.188 1.474a1.38 1.38 0 0 1 1 .923c.151.465.052.964-.267 1.335l-4.139 4.83.51 6.34c.039.487-.174.95-.57 1.237-.394.287-.899.347-1.351.158L14 22.698l-5.873 2.444a1.4 1.4 0 0 1-.536.109M14 21.037q.273 0 .533.107l5.591 2.327-.484-6.036a1.4 1.4 0 0 1 .33-1.015l3.94-4.599-5.89-1.404a1.4 1.4 0 0 1-.865-.628L14 4.62l-3.155 5.168a1.4 1.4 0 0 1-.866.628L4.09 11.82l3.941 4.598c.239.279.36.649.33 1.016l-.485 6.036 5.59-2.326q.261-.108.535-.108M18.398 8.82h.002z"
    })));
};
_c = SvgShareOutline;
const __TURBOPACK__default__export__ = SvgShareOutline;
var _c;
__turbopack_context__.k.register(_c, "SvgShareOutline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/website-filled.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgWebsiteFilled = function SvgWebsiteFilled(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M14 19.649a11 11 0 0 1 2.712.334c.26.065.41.331.339.59a15 15 0 0 1-.506 1.506c-.406 1.013-.87 1.773-1.337 2.265-.465.49-.873.656-1.208.656-.333 0-.743-.166-1.208-.656-.467-.492-.928-1.253-1.335-2.268q-.277-.691-.507-1.504a.473.473 0 0 1 .338-.59A11 11 0 0 1 14 19.65m-5.393 1.4c.276-.154.616.003.706.305q.212.704.482 1.386.113.287.241.567c.193.42-.198.894-.62.702a11 11 0 0 1-2.18-1.317.462.462 0 0 1 0-.734q.651-.505 1.37-.909m10.08.304c.091-.303.431-.46.707-.305q.72.403 1.373.908a.462.462 0 0 1 0 .733c-.67.52-1.397.959-2.167 1.31-.423.194-.822-.287-.63-.71q.123-.27.235-.55.27-.683.483-1.386m5.771-6.46c.292 0 .523.248.485.538a10.93 10.93 0 0 1-2.153 5.219.497.497 0 0 1-.71.07 13 13 0 0 0-2.484-1.578.52.52 0 0 1-.288-.548q.257-1.598.329-3.216a.507.507 0 0 1 .504-.486zm-16.599 0c.27 0 .492.215.504.486q.071 1.617.33 3.217a.52.52 0 0 1-.29.549c-.885.428-1.718.956-2.481 1.573a.497.497 0 0 1-.71-.07 10.93 10.93 0 0 1-2.153-5.217.48.48 0 0 1 .485-.539zm9.489 0c.282 0 .509.232.495.514a27 27 0 0 1-.223 2.395.51.51 0 0 1-.627.414c-.96-.23-1.963-.35-2.993-.35-1.008-.001-2.012.117-2.992.35a.51.51 0 0 1-.627-.412 27 27 0 0 1-.224-2.397.493.493 0 0 1 .495-.515zM5.528 6.95l.001.001c.868.761 1.835 1.401 2.873 1.904a.52.52 0 0 1 .29.55 28 28 0 0 0-.327 3.217.506.506 0 0 1-.504.486h-4.32a.482.482 0 0 1-.484-.539A10.93 10.93 0 0 1 5.529 6.95m11.464 2.834a.51.51 0 0 1 .628.414q.166 1.193.224 2.396a.493.493 0 0 1-.495.514h-6.7a.493.493 0 0 1-.494-.515q.059-1.202.227-2.396a.51.51 0 0 1 .627-.413c.98.233 1.983.351 2.991.35 1.008.001 2.013-.117 2.992-.35m5.089-2.504a.497.497 0 0 1 .71.07 10.93 10.93 0 0 1 2.152 5.22.482.482 0 0 1-.485.538H20.14a.506.506 0 0 1-.504-.485c-.051-1.12-.162-2.2-.327-3.218a.52.52 0 0 1 .29-.55A13 13 0 0 0 22.08 7.28M14 3c.335 0 .743.165 1.208.656.467.492.929 1.253 1.337 2.268q.293.74.507 1.505a.47.47 0 0 1-.338.588c-.868.218-1.777.334-2.714.334a11 11 0 0 1-2.71-.334.474.474 0 0 1-.34-.59q.23-.814.508-1.506c.406-1.013.869-1.773 1.334-2.265C13.259 3.166 13.667 3 14 3M9.397 4c.424-.193.824.29.632.714q-.12.266-.234.546-.261.654-.482 1.39c-.09.302-.429.456-.703.303q-.723-.405-1.375-.91a.463.463 0 0 1 0-.735A11 11 0 0 1 9.396 4m8.572.71c-.193-.423.206-.905.63-.711.768.351 1.495.79 2.164 1.31a.462.462 0 0 1 0 .733q-.652.505-1.373.91c-.276.153-.615-.003-.705-.305a16 16 0 0 0-.481-1.387 13 13 0 0 0-.235-.55"
    })));
};
_c = SvgWebsiteFilled;
const __TURBOPACK__default__export__ = SvgWebsiteFilled;
var _c;
__turbopack_context__.k.register(_c, "SvgWebsiteFilled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/website-outline.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgWebsiteOutline = function SvgWebsiteOutline(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 28"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "currentColor",
        d: "M3 14a11 11 0 1 1 22 0 11 11 0 0 1-22 0m8.142-9.025a9.45 9.45 0 0 0-3.33 1.862c.614.53 1.293.982 2.026 1.341.162-.609.348-1.178.555-1.699.221-.549.47-1.059.75-1.504M6.734 7.931a9.42 9.42 0 0 0-2.168 5.302h4.586c.035-1.238.156-2.422.351-3.518a11 11 0 0 1-2.769-1.78zm10.124 15.094a9.5 9.5 0 0 0 3.33-1.864 9.5 9.5 0 0 0-2.026-1.341q-.226.867-.555 1.699c-.22.55-.47 1.058-.75 1.504zm4.408-2.961a9.4 9.4 0 0 0 2.169-5.297H18.85a24 24 0 0 1-.353 3.517 11.1 11.1 0 0 1 2.769 1.782zm2.169-6.831a9.42 9.42 0 0 0-2.17-5.299 11 11 0 0 1-2.767 1.78c.194 1.097.315 2.281.352 3.519zm-3.25-6.396a9.45 9.45 0 0 0-3.33-1.863c.28.448.53.956.75 1.505q.314.784.554 1.7a9.5 9.5 0 0 0 2.026-1.342m-9.043 16.19a9.6 9.6 0 0 1-.749-1.506 15 15 0 0 1-.554-1.7 9.5 9.5 0 0 0-2.026 1.342 9.45 9.45 0 0 0 3.33 1.863m-4.406-2.961a11 11 0 0 1 2.767-1.78 24 24 0 0 1-.353-3.519H4.567a9.42 9.42 0 0 0 2.17 5.299zM14 4.535c-.286 0-.635.143-1.036.565-.4.423-.797 1.077-1.145 1.949a13 13 0 0 0-.54 1.694c.883.264 1.8.397 2.721.396.947 0 1.86-.138 2.723-.396a13 13 0 0 0-.54-1.693c-.35-.873-.746-1.527-1.147-1.95-.4-.422-.749-.565-1.036-.565m-3.314 8.698h6.628q-.043-1.501-.281-2.982c-.986.281-2.007.424-3.033.423-1.025 0-2.046-.142-3.031-.423q-.24 1.48-.284 2.982zm.283 4.517A11 11 0 0 1 14 17.326c1.051 0 2.069.147 3.033.424.15-.927.248-1.93.28-2.983h-6.627c.033 1.053.13 2.057.283 2.983M14 18.86a9.5 9.5 0 0 0-2.721.397c.155.618.337 1.186.54 1.693.348.873.744 1.527 1.145 1.95.4.422.75.565 1.036.565s.637-.143 1.036-.565c.4-.423.798-1.077 1.147-1.949q.304-.763.538-1.694A9.5 9.5 0 0 0 14 18.86"
    })));
};
_c = SvgWebsiteOutline;
const __TURBOPACK__default__export__ = SvgWebsiteOutline;
var _c;
__turbopack_context__.k.register(_c, "SvgWebsiteOutline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/card-styles.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"artCard":{"width":360,"height":200,"order":3,"offsetX":null,"offsetY":null,"enabled":true},"hiCard":{"width":360,"height":288,"order":1,"offsetX":null,"offsetY":null,"enabled":true},"clockCard":{"width":232,"height":132,"offset":92,"order":4,"offsetX":null,"offsetY":null,"enabled":true},"calendarCard":{"width":350,"height":286,"order":5,"offsetX":null,"offsetY":null,"enabled":true},"musicCard":{"width":293,"height":66,"offset":120,"order":6,"offsetX":null,"offsetY":null,"enabled":true},"socialButtons":{"width":315,"height":48,"order":6,"offsetX":null,"offsetY":null,"enabled":true},"shareCard":{"width":200,"height":180,"order":7,"offsetX":null,"offsetY":null,"enabled":true},"articleCard":{"width":266,"height":160,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"writeButtons":{"height":42,"width":180,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"navCard":{"width":280,"height":434,"order":2,"offsetX":null,"offsetY":null,"enabled":true},"likePosition":{"width":54,"height":54,"order":8,"offsetX":null,"offsetY":null,"enabled":true},"hatCard":{"width":99,"height":105,"order":10,"offsetX":-48,"offsetY":-168,"enabled":false},"beianCard":{"width":200,"height":60,"order":11,"offsetX":null,"offsetY":null,"enabled":false}});}),
"[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConfigStore",
    ()=>useConfigStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/site-content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$card$2d$styles$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/card-styles.json (json)");
;
;
;
const useConfigStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        siteContent: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"]
        },
        cardStyles: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$card$2d$styles$2e$json__$28$json$29$__["default"]
        },
        regenerateKey: 0,
        configDialogOpen: false,
        setSiteContent: (content)=>{
            set({
                siteContent: content
            });
        },
        setCardStyles: (styles)=>{
            set({
                cardStyles: styles
            });
        },
        resetSiteContent: ()=>{
            set({
                siteContent: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"]
                }
            });
        },
        resetCardStyles: ()=>{
            set({
                cardStyles: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$card$2d$styles$2e$json__$28$json$29$__["default"]
                }
            });
        },
        regenerateBubbles: ()=>{
            set((state)=>({
                    regenerateKey: state.regenerateKey + 1
                }));
        },
        setConfigDialogOpen: (open)=>{
            set({
                configDialogOpen: open
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(home)/stores/layout-edit-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLayoutEditStore",
    ()=>useLayoutEditStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
'use client';
;
;
const useLayoutEditStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        editing: false,
        snapshot: null,
        startEditing: ()=>{
            const { cardStyles } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            set({
                editing: true,
                snapshot: {
                    ...cardStyles
                }
            });
        },
        cancelEditing: ()=>{
            const { snapshot } = get();
            if (!snapshot) {
                set({
                    editing: false,
                    snapshot: null
                });
                return;
            }
            const { setCardStyles } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            setCardStyles(snapshot);
            set({
                editing: false,
                snapshot: null
            });
        },
        saveEditing: ()=>{
            set({
                editing: false,
                snapshot: null
            });
        },
        setOffset: (key, offsetX, offsetY)=>{
            const { cardStyles, setCardStyles } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            const next = {
                ...cardStyles,
                [key]: {
                    ...cardStyles[key],
                    offsetX,
                    offsetY
                }
            };
            setCardStyles(next);
        },
        setSize: (key, width, height)=>{
            const { cardStyles, setCardStyles } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            const next = {
                ...cardStyles,
                [key]: {
                    ...cardStyles[key],
                    width,
                    height
                }
            };
            setCardStyles(next);
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/dragger.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgDragger = function SvgDragger(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: 2.5,
        d: "M22.087 2.83c-2.132 10.216-8.305 16.903-19.696 19.623"
    })));
};
_c = SvgDragger;
const __TURBOPACK__default__export__ = SvgDragger;
var _c;
__turbopack_context__.k.register(_c, "SvgDragger");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(home)/home-draggable-layer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeDraggableLayer",
    ()=>HomeDraggableLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/layout-edit-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$dragger$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/dragger.svg.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function HomeDraggableLayer({ cardKey, x, y, width, height, children }) {
    _s();
    const editing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"])({
        "HomeDraggableLayer.useLayoutEditStore[editing]": (state)=>state.editing
    }["HomeDraggableLayer.useLayoutEditStore[editing]"]);
    const setOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"])({
        "HomeDraggableLayer.useLayoutEditStore[setOffset]": (state_0)=>state_0.setOffset
    }["HomeDraggableLayer.useLayoutEditStore[setOffset]"]);
    const setSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"])({
        "HomeDraggableLayer.useLayoutEditStore[setSize]": (state_1)=>state_1.setSize
    }["HomeDraggableLayer.useLayoutEditStore[setSize]"]);
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const dragStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        dragging: false,
        startX: 0,
        startY: 0,
        initialOffsetX: 0,
        initialOffsetY: 0
    });
    const resizeStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        resizing: false,
        startX: 0,
        startY: 0,
        initialWidth: 0,
        initialHeight: 0
    });
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleMouseMove]": (event)=>{
            const state_2 = dragStateRef.current;
            if (!state_2.dragging) return;
            const dx = event.clientX - state_2.startX;
            const dy = event.clientY - state_2.startY;
            const nextOffsetX = Math.round(state_2.initialOffsetX + dx);
            const nextOffsetY = Math.round(state_2.initialOffsetY + dy);
            setOffset(cardKey, nextOffsetX, nextOffsetY);
        }
    }["HomeDraggableLayer.useCallback[handleMouseMove]"], [
        cardKey,
        setOffset
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleTouchMove]": (event_0)=>{
            const touch = event_0.touches[0];
            if (!touch) return;
            const state_3 = dragStateRef.current;
            if (!state_3.dragging) return;
            const dx_0 = touch.clientX - state_3.startX;
            const dy_0 = touch.clientY - state_3.startY;
            const nextOffsetX_0 = Math.round(state_3.initialOffsetX + dx_0);
            const nextOffsetY_0 = Math.round(state_3.initialOffsetY + dy_0);
            setOffset(cardKey, nextOffsetX_0, nextOffsetY_0);
        }
    }["HomeDraggableLayer.useCallback[handleTouchMove]"], [
        cardKey,
        setOffset
    ]);
    const handleEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleEnd]": ()=>{
            dragStateRef.current.dragging = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('touchcancel', handleEnd);
        }
    }["HomeDraggableLayer.useCallback[handleEnd]"], [
        handleMouseMove,
        handleTouchMove
    ]);
    const handleResizeMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleResizeMouseMove]": (event_1)=>{
            const state_4 = resizeStateRef.current;
            if (!state_4.resizing) return;
            const dx_1 = event_1.clientX - state_4.startX;
            const dy_1 = event_1.clientY - state_4.startY;
            const nextWidth = Math.max(50, Math.round(state_4.initialWidth + dx_1));
            const nextHeight = Math.max(50, Math.round(state_4.initialHeight + dy_1));
            setSize(cardKey, nextWidth, nextHeight);
        }
    }["HomeDraggableLayer.useCallback[handleResizeMouseMove]"], [
        cardKey,
        setSize
    ]);
    const handleResizeTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleResizeTouchMove]": (event_2)=>{
            const touch_0 = event_2.touches[0];
            if (!touch_0) return;
            const state_5 = resizeStateRef.current;
            if (!state_5.resizing) return;
            const dx_2 = touch_0.clientX - state_5.startX;
            const dy_2 = touch_0.clientY - state_5.startY;
            const nextWidth_0 = Math.max(50, Math.round(state_5.initialWidth + dx_2));
            const nextHeight_0 = Math.max(50, Math.round(state_5.initialHeight + dy_2));
            setSize(cardKey, nextWidth_0, nextHeight_0);
        }
    }["HomeDraggableLayer.useCallback[handleResizeTouchMove]"], [
        cardKey,
        setSize
    ]);
    const handleResizeEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[handleResizeEnd]": ()=>{
            resizeStateRef.current.resizing = false;
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeEnd);
            window.removeEventListener('touchmove', handleResizeTouchMove);
            window.removeEventListener('touchend', handleResizeEnd);
            window.removeEventListener('touchcancel', handleResizeEnd);
        }
    }["HomeDraggableLayer.useCallback[handleResizeEnd]"], [
        handleResizeMouseMove,
        handleResizeTouchMove
    ]);
    const startResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[startResize]": (clientX, clientY)=>{
            if (!editing || width === undefined || height === undefined) return;
            resizeStateRef.current = {
                resizing: true,
                startX: clientX,
                startY: clientY,
                initialWidth: width,
                initialHeight: height
            };
            window.addEventListener('mousemove', handleResizeMouseMove);
            window.addEventListener('mouseup', handleResizeEnd);
            window.addEventListener('touchmove', handleResizeTouchMove);
            window.addEventListener('touchend', handleResizeEnd);
            window.addEventListener('touchcancel', handleResizeEnd);
        }
    }["HomeDraggableLayer.useCallback[startResize]"], [
        editing,
        width,
        height,
        handleResizeMouseMove,
        handleResizeEnd,
        handleResizeTouchMove
    ]);
    const handleResizeMouseDown = (event_3)=>{
        event_3.preventDefault();
        event_3.stopPropagation();
        startResize(event_3.clientX, event_3.clientY);
    };
    const handleResizeTouchStart = (event_4)=>{
        const touch_1 = event_4.touches[0];
        if (!touch_1) return;
        event_4.preventDefault();
        event_4.stopPropagation();
        startResize(touch_1.clientX, touch_1.clientY);
    };
    const startDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeDraggableLayer.useCallback[startDrag]": (clientX_0, clientY_0)=>{
            if (!editing) return;
            const initialOffsetX = x - center.x;
            const initialOffsetY = y - center.y;
            dragStateRef.current = {
                dragging: true,
                startX: clientX_0,
                startY: clientY_0,
                initialOffsetX,
                initialOffsetY
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleEnd);
            window.addEventListener('touchcancel', handleEnd);
        }
    }["HomeDraggableLayer.useCallback[startDrag]"], [
        editing,
        x,
        y,
        center.x,
        center.y,
        handleMouseMove,
        handleEnd,
        handleTouchMove
    ]);
    const handleMouseDown = (event_5)=>{
        event_5.preventDefault();
        startDrag(event_5.clientX, event_5.clientY);
    };
    const handleTouchStart = (event_6)=>{
        const touch_2 = event_6.touches[0];
        if (!touch_2) return;
        startDrag(touch_2.clientX, touch_2.clientY);
    };
    const canResize = editing && width !== undefined && height !== undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-brand/70 bg-brand/5 pointer-events-auto absolute z-40 cursor-move rounded-[40px] border border-dashed",
                style: {
                    left: x,
                    top: y,
                    width,
                    height
                },
                onMouseDown: handleMouseDown,
                onTouchStart: handleTouchStart,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none h-full w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/home-draggable-layer.tsx",
                        lineNumber: 174,
                        columnNumber: 6
                    }, this),
                    canResize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 bottom-0 z-50 translate-x-1 translate-y-1 cursor-nwse-resize hover:scale-110",
                        onMouseDown: handleResizeMouseDown,
                        onTouchStart: handleResizeTouchStart,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$dragger$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "text-brand size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(home)/home-draggable-layer.tsx",
                            lineNumber: 176,
                            columnNumber: 8
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(home)/home-draggable-layer.tsx",
                        lineNumber: 175,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(home)/home-draggable-layer.tsx",
                lineNumber: 168,
                columnNumber: 16
            }, this),
            children
        ]
    }, void 0, true);
}
_s(HomeDraggableLayer, "GwFwoDknT0tJWESyeX1CL0hk37M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$layout$2d$edit$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEditStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"]
    ];
});
_c = HomeDraggableLayer;
var _c;
__turbopack_context__.k.register(_c, "HomeDraggableLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/nav-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$scroll$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/scroll-outline.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$scroll$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/scroll-filled.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$projects$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/projects-filled.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$projects$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/projects-outline.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$about$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/about-filled.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$about$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/about-outline.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$share$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/share-filled.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$share$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/share-outline.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$website$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/website-filled.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$website$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/website-outline.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-client] (ecmascript)");
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
const list = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$scroll$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        iconActive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$scroll$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        label: '近期文章',
        href: '/blog'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$projects$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        iconActive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$projects$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        label: '我的项目',
        href: '/projects'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$about$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        iconActive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$about$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        label: '关于网站',
        href: '/about'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$share$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        iconActive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$share$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        label: '推荐分享',
        href: '/share'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$website$2d$outline$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        iconActive: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$website$2d$filled$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        label: '优秀博客',
        href: '/bloggers'
    }
];
const extraSize = 8;
function NavCard() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    const [hoveredIndex, setHoveredIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const { siteContent, cardStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const styles = cardStyles.navCard;
    const hiCardStyles = cardStyles.hiCard;
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NavCard.useMemo[activeIndex]": ()=>{
            const index = list.findIndex({
                "NavCard.useMemo[activeIndex].index": (item)=>pathname === item.href
            }["NavCard.useMemo[activeIndex].index"]);
            return index >= 0 ? index : undefined;
        }
    }["NavCard.useMemo[activeIndex]"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavCard.useEffect": ()=>{
            setShow(true);
        }
    }["NavCard.useEffect"], []);
    let form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NavCard.useMemo[form]": ()=>{
            if (pathname == '/') return 'full';
            else if (pathname == '/write') return 'mini';
            else return 'icons';
        }
    }["NavCard.useMemo[form]"], [
        pathname
    ]);
    if (maxSM) form = 'icons';
    const itemHeight = form === 'full' ? 52 : 28;
    let position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NavCard.useMemo[position]": ()=>{
            if (form === 'full') {
                const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - hiCardStyles.width / 2 - styles.width - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CARD_SPACING"];
                const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 - styles.height;
                return {
                    x,
                    y
                };
            }
            return {
                x: 24,
                y: 16
            };
        }
    }["NavCard.useMemo[position]"], [
        form,
        center,
        styles,
        hiCardStyles
    ]);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NavCard.useMemo[size]": ()=>{
            if (form === 'mini') return {
                width: 64,
                height: 64
            };
            else if (form === 'icons') return {
                width: 340,
                height: 64
            };
            else return {
                width: styles.width,
                height: styles.height
            };
        }
    }["NavCard.useMemo[size]"], [
        form,
        styles
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavCard.useEffect": ()=>{
            if (form === 'icons' && activeIndex !== undefined && hoveredIndex !== activeIndex) {
                const timer = setTimeout({
                    "NavCard.useEffect.timer": ()=>{
                        setHoveredIndex(activeIndex);
                    }
                }["NavCard.useEffect.timer"], 1500);
                return ({
                    "NavCard.useEffect": ()=>clearTimeout(timer)
                })["NavCard.useEffect"];
            }
        }
    }["NavCard.useEffect"], [
        hoveredIndex,
        activeIndex,
        form
    ]);
    if (maxSM) position = {
        x: center.x - size.width / 2,
        y: 16
    };
    if (show) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
        cardKey: "navCard",
        x: position.x,
        y: position.y,
        width: styles.width,
        height: styles.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            order: styles.order,
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(form != 'full' && 'overflow-hidden', form === 'mini' && 'p-3', form === 'icons' && 'flex items-center gap-6 p-3'),
            children: [
                form === 'full' && siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/images/christmas/snow-4.webp",
                        alt: "Christmas decoration",
                        className: "pointer-events-none absolute",
                        style: {
                            width: 160,
                            left: -18,
                            top: -20,
                            opacity: 0.9
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/nav-card.tsx",
                        lineNumber: 120,
                        columnNumber: 8
                    }, this)
                }, void 0, false),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "flex items-center gap-3",
                    href: "/",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/avatar.png",
                            alt: "avatar",
                            width: 40,
                            height: 40,
                            loading: "eager",
                            priority: true,
                            style: {
                                boxShadow: ' 0 12px 20px -5px #E2D9CE'
                            },
                            className: "rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav-card.tsx",
                            lineNumber: 129,
                            columnNumber: 7
                        }, this),
                        form === 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-averia mt-1 text-2xl leading-none font-medium",
                            children: siteContent.meta.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav-card.tsx",
                            lineNumber: 132,
                            columnNumber: 27
                        }, this),
                        form === 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-brand mt-2 text-xs font-medium",
                            children: "(开发中)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav-card.tsx",
                            lineNumber: 133,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/nav-card.tsx",
                    lineNumber: 128,
                    columnNumber: 6
                }, this),
                (form === 'full' || form === 'icons') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        form !== 'icons' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-secondary mt-6 text-sm uppercase",
                            children: "General"
                        }, void 0, false, {
                            fileName: "[project]/src/components/nav-card.tsx",
                            lineNumber: 137,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative mt-2 space-y-2', form === 'icons' && 'mt-0 flex items-center gap-6 space-y-0'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute max-w-[230px] rounded-full border",
                                    layoutId: "nav-hover",
                                    initial: false,
                                    animate: form === 'icons' ? {
                                        left: hoveredIndex * (itemHeight + 24) - extraSize,
                                        top: -extraSize,
                                        width: itemHeight + extraSize * 2,
                                        height: itemHeight + extraSize * 2
                                    } : {
                                        top: hoveredIndex * (itemHeight + 8),
                                        left: 0,
                                        width: '100%',
                                        height: itemHeight
                                    },
                                    transition: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 30
                                    },
                                    style: {
                                        backgroundImage: 'linear-gradient(to right bottom, var(--color-border) 60%, var(--color-card) 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/nav-card.tsx",
                                    lineNumber: 140,
                                    columnNumber: 9
                                }, this),
                                list.map((item_0, index_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item_0.href,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-secondary text-md relative z-10 flex items-center gap-3 rounded-full px-5 py-3', form === 'icons' && 'p-0'),
                                        onMouseEnter: ()=>setHoveredIndex(index_0),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-7 w-7 items-center justify-center",
                                                children: hoveredIndex == index_0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item_0.iconActive, {
                                                    className: "text-brand absolute h-7 w-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/nav-card.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 39
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item_0.icon, {
                                                    className: "absolute h-7 w-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/nav-card.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 103
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/nav-card.tsx",
                                                lineNumber: 159,
                                                columnNumber: 11
                                            }, this),
                                            form !== 'icons' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(index_0 == hoveredIndex && 'text-primary font-medium'),
                                                children: item_0.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/nav-card.tsx",
                                                lineNumber: 162,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, item_0.href, true, {
                                        fileName: "[project]/src/components/nav-card.tsx",
                                        lineNumber: 158,
                                        columnNumber: 40
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/nav-card.tsx",
                            lineNumber: 139,
                            columnNumber: 8
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/nav-card.tsx",
            lineNumber: 118,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/nav-card.tsx",
        lineNumber: 117,
        columnNumber: 20
    }, this);
}
_s(NavCard, "8RHzu/nMIHDmeF1G55ztNFMGuFQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = NavCard;
var _c;
__turbopack_context__.k.register(_c, "NavCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/top.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _g, _defs;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgTop = function SvgTop(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 32"
    }, props), _g || (_g = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("g", {
        filter: "url(#top_svg__a)"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "#fff",
        fillOpacity: 0.4,
        d: "M16.827 4.491a1.2 1.2 0 0 0-1.838.013l-8.93 10.785c-.647.783-.09 1.966.925 1.966h2.75a1.2 1.2 0 0 1 1.2 1.206l-.044 8.93a1.2 1.2 0 0 0 1.2 1.207h7.599a1.2 1.2 0 0 0 1.2-1.2V18.4a1.2 1.2 0 0 1 1.18-1.2l2.956-.047c1.014-.016 1.552-1.205.894-1.978z",
        shapeRendering: "crispEdges"
    }))), _defs || (_defs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("filter", {
        id: "top_svg__a",
        width: 24.426,
        height: 28.529,
        x: 3.781,
        y: 3.069,
        colorInterpolationFilters: "sRGB",
        filterUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feFlood", {
        floodOpacity: 0,
        result: "BackgroundImageFix"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        "in": "SourceAlpha",
        result: "hardAlpha",
        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feOffset", {
        dy: 1
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feGaussianBlur", {
        stdDeviation: 1
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feComposite", {
        in2: "hardAlpha",
        operator: "out"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feBlend", {
        in2: "BackgroundImageFix",
        result: "effect1_dropShadow_175_120"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feBlend", {
        "in": "SourceGraphic",
        in2: "effect1_dropShadow_175_120",
        result: "shape"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        "in": "SourceAlpha",
        result: "hardAlpha",
        values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feOffset", null), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feGaussianBlur", {
        stdDeviation: 1.5
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feComposite", {
        in2: "hardAlpha",
        k2: -1,
        k3: 1,
        operator: "arithmetic"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feColorMatrix", {
        values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("feBlend", {
        in2: "shape",
        result: "effect2_innerShadow_175_120"
    })))));
};
_c = SvgTop;
const __TURBOPACK__default__export__ = SvgTop;
var _c;
__turbopack_context__.k.register(_c, "SvgTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/scroll-top-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollTopButton",
    ()=>ScrollTopButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$top$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/top.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ScrollTopButton(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "00bed035192804615a70da1ed683ba68e4bc71b9b3940052e5ca561091e2f90e") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "00bed035192804615a70da1ed683ba68e4bc71b9b3940052e5ca561091e2f90e";
    }
    const { className, delay } = t0;
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    if ($[1] !== delay) {
        t1 = ({
            "ScrollTopButton[useEffect()]": ()=>{
                setTimeout({
                    "ScrollTopButton[useEffect() > setTimeout()]": ()=>setShow(true)
                }["ScrollTopButton[useEffect() > setTimeout()]"], delay || 1000);
            }
        })["ScrollTopButton[useEffect()]"];
        t2 = [
            delay
        ];
        $[1] = delay;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "ScrollTopButton[useEffect()]": ()=>{
                const handleScroll = {
                    "ScrollTopButton[useEffect() > handleScroll]": ()=>{
                        setActive(window.scrollY > 200);
                    }
                }["ScrollTopButton[useEffect() > handleScroll]"];
                handleScroll();
                window.addEventListener("scroll", handleScroll, {
                    passive: true
                });
                return ()=>window.removeEventListener("scroll", handleScroll);
            }
        })["ScrollTopButton[useEffect()]"];
        t4 = [];
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    if (!show || !active) {
        return null;
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "ScrollTopButton[handleClick]": ()=>{
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                setTimeout({
                    "ScrollTopButton[handleClick > setTimeout()]": ()=>setActive(false)
                }["ScrollTopButton[handleClick > setTimeout()]"], 1000);
            }
        })["ScrollTopButton[handleClick]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleClick = t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            opacity: 0,
            scale: 0.4
        };
        t7 = {
            opacity: 1,
            scale: 1
        };
        t8 = {
            scale: 1.05
        };
        t9 = {
            scale: 0.95
        };
        $[7] = t6;
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
    } else {
        t6 = $[7];
        t7 = $[8];
        t8 = $[9];
        t9 = $[10];
    }
    let t10;
    if ($[11] !== className) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("card text-secondary static gap-2 rounded-full p-3 text-sm", className);
        $[11] = className;
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$top$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "w-7"
        }, void 0, false, {
            fileName: "[project]/src/components/scroll-top-button.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[13] = t11;
    } else {
        t11 = $[13];
    }
    let t12;
    if ($[14] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            initial: t6,
            animate: t7,
            whileHover: t8,
            whileTap: t9,
            onClick: handleClick,
            "aria-label": "Scroll to top",
            className: t10,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/scroll-top-button.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[14] = t10;
        $[15] = t12;
    } else {
        t12 = $[15];
    }
    return t12;
}
_s(ScrollTopButton, "VyJ8rZPBzz/VYRjH2x8WBBOEKOQ=");
_c = ScrollTopButton;
var _c;
__turbopack_context__.k.register(_c, "ScrollTopButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/music.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path, _path2, _defs;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgMusic = function SvgMusic(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        width: 32,
        height: 32,
        fill: "none"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "url(#music_svg__a)",
        fillOpacity: 0.8,
        d: "m16.787 25.18 2.484-19.74s1.513 3.444 3.96 5.029c1.542.988 3.598.857 4.272 1.814.448.648.057 2.763-.107 3.567-.004.031.04.052.06.024.357-.859 1.359-3.38.954-4.24-.544-1.127-2.835-1.478-4.321-2.537-1.888-1.327-3.475-5.668-4.287-6.518-.248-.249-.632-.297-.848-.309-.847-.075-1.62.497-1.726 1.34L14.55 24.899z"
    })), _path2 || (_path2 = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "url(#music_svg__b)",
        fillOpacity: 0.8,
        d: "M2.997 23.414a4.4 4.4 0 0 0 .267 2.119c.264.694.698 1.35 1.276 1.928a7.3 7.3 0 0 0 2.09 1.445 8.7 8.7 0 0 0 2.589.74 8.7 8.7 0 0 0 2.69-.076 7.3 7.3 0 0 0 2.385-.881 5.55 5.55 0 0 0 1.714-1.552 4.4 4.4 0 0 0 .783-1.987c.179-1.423-.376-2.879-1.543-4.047-1.167-1.17-2.85-1.955-4.68-2.185-1.828-.23-3.654.114-5.074.957s-2.318 2.116-2.497 3.54"
    })), _defs || (_defs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("linearGradient", {
        id: "music_svg__a",
        x1: 18.646,
        x2: 31.951,
        y1: 9.253,
        y2: 16.32,
        gradientUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        stopColor: "var(--color-brand)"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        offset: 1,
        stopColor: "var(--color-brand-secondary)"
    })), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("linearGradient", {
        id: "music_svg__b",
        x1: 5.634,
        x2: 14.351,
        y1: 21.599,
        y2: 31.855,
        gradientUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        stopColor: "var(--color-brand)"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        offset: 1,
        stopColor: "var(--color-brand-secondary)"
    })))));
};
_c = SvgMusic;
const __TURBOPACK__default__export__ = SvgMusic;
var _c;
__turbopack_context__.k.register(_c, "SvgMusic");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/svgs/play.svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _path, _defs;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
var SvgPlay = function SvgPlay(props) {
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        width: 15,
        height: 16,
        fill: "none"
    }, props), _path || (_path = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", {
        fill: "url(#play_svg__a)",
        fillOpacity: 0.8,
        d: "M13.154 4.84c2.461 1.404 2.461 4.916 0 6.32l-7.616 4.346C3.077 16.91 0 15.155 0 12.346V3.654C0 .845 3.077-.91 5.538.495z"
    })), _defs || (_defs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("linearGradient", {
        id: "play_svg__a",
        x1: 2.579,
        x2: 16.198,
        y1: 4.848,
        y2: 13.938,
        gradientUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        stopColor: "var(--color-brand)"
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("stop", {
        offset: 1,
        stopColor: "var(--color-brand-secondary)"
    })))));
};
_c = SvgPlay;
const __TURBOPACK__default__export__ = SvgPlay;
var _c;
__turbopack_context__.k.register(_c, "SvgPlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/music-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MusicCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$music$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/music.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$play$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/svgs/play.svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/home-draggable-layer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
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
;
;
;
const MUSIC_FILES = [
    '/music/close-to-you.mp3'
];
function MusicCard() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(48);
    if ($[0] !== "a7190c41a382a81e50f39b10e20ea22eb4e651a0de0f45ce8f2bf9c6c8f40c6c") {
        for(let $i = 0; $i < 48; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a7190c41a382a81e50f39b10e20ea22eb4e651a0de0f45ce8f2bf9c6c8f40c6c";
    }
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { cardStyles, siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const styles = cardStyles.musicCard;
    const hiCardStyles = cardStyles.hiCard;
    const clockCardStyles = cardStyles.clockCard;
    const calendarCardStyles = cardStyles.calendarCard;
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentIndexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isHomePage = pathname === "/";
    let t0;
    bb0: {
        if (!isHomePage) {
            const t1 = center.width - styles.width - 16;
            const t2 = center.height - styles.height - 16;
            let t3;
            if ($[1] !== t1 || $[2] !== t2) {
                t3 = {
                    x: t1,
                    y: t2
                };
                $[1] = t1;
                $[2] = t2;
                $[3] = t3;
            } else {
                t3 = $[3];
            }
            t0 = t3;
            break bb0;
        }
        const t1 = styles.offsetX !== null ? center.x + styles.offsetX : center.x + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CARD_SPACING"] + hiCardStyles.width / 2 - styles.offset;
        const t2 = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CARD_SPACING"] + calendarCardStyles.height + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CARD_SPACING"];
        let t3;
        if ($[4] !== t1 || $[5] !== t2) {
            t3 = {
                x: t1,
                y: t2
            };
            $[4] = t1;
            $[5] = t2;
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        t0 = t3;
    }
    const position = t0;
    const { x, y } = position;
    let t1;
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "MusicCard[useEffect()]": ()=>{
                if (!audioRef.current) {
                    audioRef.current = new Audio();
                }
                const audio = audioRef.current;
                const updateProgress = {
                    "MusicCard[useEffect() > updateProgress]": ()=>{
                        if (audio.duration) {
                            setProgress(audio.currentTime / audio.duration * 100);
                        }
                    }
                }["MusicCard[useEffect() > updateProgress]"];
                const handleEnded = {
                    "MusicCard[useEffect() > handleEnded]": ()=>{
                        const nextIndex = (currentIndexRef.current + 1) % MUSIC_FILES.length;
                        currentIndexRef.current = nextIndex;
                        setCurrentIndex(nextIndex);
                        setProgress(0);
                    }
                }["MusicCard[useEffect() > handleEnded]"];
                const handleTimeUpdate = {
                    "MusicCard[useEffect() > handleTimeUpdate]": ()=>{
                        updateProgress();
                    }
                }["MusicCard[useEffect() > handleTimeUpdate]"];
                const handleLoadedMetadata = {
                    "MusicCard[useEffect() > handleLoadedMetadata]": ()=>{
                        updateProgress();
                    }
                }["MusicCard[useEffect() > handleLoadedMetadata]"];
                audio.addEventListener("timeupdate", handleTimeUpdate);
                audio.addEventListener("ended", handleEnded);
                audio.addEventListener("loadedmetadata", handleLoadedMetadata);
                return ()=>{
                    audio.removeEventListener("timeupdate", handleTimeUpdate);
                    audio.removeEventListener("ended", handleEnded);
                    audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                };
            }
        })["MusicCard[useEffect()]"];
        t2 = [];
        $[7] = t1;
        $[8] = t2;
    } else {
        t1 = $[7];
        t2 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    if ($[9] !== currentIndex) {
        t3 = ({
            "MusicCard[useEffect()]": ()=>{
                currentIndexRef.current = currentIndex;
                if (audioRef.current) {
                    const wasPlaying = !audioRef.current.paused;
                    audioRef.current.pause();
                    audioRef.current.src = MUSIC_FILES[currentIndex];
                    audioRef.current.loop = false;
                    setProgress(0);
                    if (wasPlaying) {
                        audioRef.current.play().catch(console.error);
                    }
                }
            }
        })["MusicCard[useEffect()]"];
        t4 = [
            currentIndex
        ];
        $[9] = currentIndex;
        $[10] = t3;
        $[11] = t4;
    } else {
        t3 = $[10];
        t4 = $[11];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    let t6;
    if ($[12] !== isPlaying) {
        t5 = ({
            "MusicCard[useEffect()]": ()=>{
                if (!audioRef.current) {
                    return;
                }
                if (isPlaying) {
                    audioRef.current.play().catch(console.error);
                } else {
                    audioRef.current.pause();
                }
            }
        })["MusicCard[useEffect()]"];
        t6 = [
            isPlaying
        ];
        $[12] = isPlaying;
        $[13] = t5;
        $[14] = t6;
    } else {
        t5 = $[13];
        t6 = $[14];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "MusicCard[useEffect()]": ()=>()=>{
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.src = "";
                    }
                }
        })["MusicCard[useEffect()]"];
        t8 = [];
        $[15] = t7;
        $[16] = t8;
    } else {
        t7 = $[15];
        t8 = $[16];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t7, t8);
    let t9;
    if ($[17] !== isPlaying) {
        t9 = ({
            "MusicCard[togglePlayPause]": ()=>{
                setIsPlaying(!isPlaying);
            }
        })["MusicCard[togglePlayPause]"];
        $[17] = isPlaying;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    const togglePlayPause = t9;
    if (!isHomePage && !isPlaying) {
        return null;
    }
    const t10 = styles.width;
    const t11 = styles.height;
    const t12 = styles.order;
    const t13 = styles.width;
    const t14 = styles.height;
    const t15 = !isHomePage && "fixed";
    let t16;
    if ($[19] !== t15) {
        t16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex items-center gap-3", t15);
        $[19] = t15;
        $[20] = t16;
    } else {
        t16 = $[20];
    }
    let t17;
    if ($[21] !== siteContent.enableChristmas) {
        t17 = siteContent.enableChristmas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/images/christmas/snow-10.webp",
                    alt: "Christmas decoration",
                    className: "pointer-events-none absolute",
                    style: {
                        width: 120,
                        left: -8,
                        top: -12,
                        opacity: 0.8
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/music-card.tsx",
                    lineNumber: 235,
                    columnNumber: 44
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/images/christmas/snow-11.webp",
                    alt: "Christmas decoration",
                    className: "pointer-events-none absolute",
                    style: {
                        width: 80,
                        right: -10,
                        top: -12,
                        opacity: 0.8
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/music-card.tsx",
                    lineNumber: 240,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true);
        $[21] = siteContent.enableChristmas;
        $[22] = t17;
    } else {
        t17 = $[22];
    }
    let t18;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$music$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-8 w-8"
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 253,
            columnNumber: 11
        }, this);
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-secondary text-sm",
            children: "Close To You"
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 260,
            columnNumber: 11
        }, this);
        $[24] = t19;
    } else {
        t19 = $[24];
    }
    const t20 = `${progress}%`;
    let t21;
    if ($[25] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-1 h-2 rounded-full bg-white/60",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-linear h-full rounded-full transition-all duration-300",
                        style: {
                            width: t20
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/music-card.tsx",
                        lineNumber: 268,
                        columnNumber: 91
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/music-card.tsx",
                    lineNumber: 268,
                    columnNumber: 40
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 268,
            columnNumber: 11
        }, this);
        $[25] = t20;
        $[26] = t21;
    } else {
        t21 = $[26];
    }
    let t22;
    if ($[27] !== isPlaying) {
        t22 = isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
            className: "text-brand h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 278,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$svgs$2f$play$2e$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "text-brand ml-1 h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 278,
            columnNumber: 66
        }, this);
        $[27] = isPlaying;
        $[28] = t22;
    } else {
        t22 = $[28];
    }
    let t23;
    if ($[29] !== t22 || $[30] !== togglePlayPause) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: togglePlayPause,
            className: "flex h-10 w-10 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80",
            children: t22
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 286,
            columnNumber: 11
        }, this);
        $[29] = t22;
        $[30] = togglePlayPause;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] !== styles.height || $[33] !== styles.order || $[34] !== styles.width || $[35] !== t16 || $[36] !== t17 || $[37] !== t21 || $[38] !== t23 || $[39] !== x || $[40] !== y) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            order: t12,
            width: t13,
            height: t14,
            x: x,
            y: y,
            className: t16,
            children: [
                t17,
                t18,
                t21,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 295,
            columnNumber: 11
        }, this);
        $[32] = styles.height;
        $[33] = styles.order;
        $[34] = styles.width;
        $[35] = t16;
        $[36] = t17;
        $[37] = t21;
        $[38] = t23;
        $[39] = x;
        $[40] = y;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    let t25;
    if ($[42] !== styles.height || $[43] !== styles.width || $[44] !== t24 || $[45] !== x || $[46] !== y) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$home$2d$draggable$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeDraggableLayer"], {
            cardKey: "musicCard",
            x: x,
            y: y,
            width: t10,
            height: t11,
            children: t24
        }, void 0, false, {
            fileName: "[project]/src/components/music-card.tsx",
            lineNumber: 311,
            columnNumber: 11
        }, this);
        $[42] = styles.height;
        $[43] = styles.width;
        $[44] = t24;
        $[45] = x;
        $[46] = y;
        $[47] = t25;
    } else {
        t25 = $[47];
    }
    return t25;
}
_s(MusicCard, "tlLrdhrjml6Ql76UOHmYDrQQOdA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"]
    ];
});
_c = MusicCard;
var _c;
__turbopack_context__.k.register(_c, "MusicCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/layout/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$blurred$2d$bubbles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layout/backgrounds/blurred-bubbles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nav$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/nav-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/octagon-x.js [app-client] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scroll$2d$top$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/scroll-top-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$music$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/music-card.tsx [app-client] (ecmascript)");
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
;
function Layout(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(29);
    if ($[0] !== "0661dec3c02c466816579706b131ad517d67325ce9c374df414f214ab1f9bf02") {
        for(let $i = 0; $i < 29; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0661dec3c02c466816579706b131ad517d67325ce9c374df414f214ab1f9bf02";
    }
    const { children } = t0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterInit"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSizeInit"])();
    const { cardStyles, siteContent, regenerateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const { maxSM, init } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])();
    let t1;
    if ($[1] !== siteContent.backgroundImages) {
        t1 = siteContent.backgroundImages ?? [];
        $[1] = siteContent.backgroundImages;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const backgroundImages = t1;
    const currentBackgroundImageId = siteContent.currentBackgroundImageId;
    let t2;
    if ($[3] !== backgroundImages || $[4] !== currentBackgroundImageId) {
        t2 = currentBackgroundImageId && currentBackgroundImageId.trim() ? backgroundImages.find({
            "Layout[backgroundImages.find()]": (item)=>item.id === currentBackgroundImageId
        }["Layout[backgroundImages.find()]"]) : null;
        $[3] = backgroundImages;
        $[4] = currentBackgroundImageId;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const currentBackgroundImage = t2;
    let t3;
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/layout/index.tsx",
                lineNumber: 65,
                columnNumber: 16
            }, this),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/layout/index.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/layout/index.tsx",
                lineNumber: 67,
                columnNumber: 16
            }, this),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/layout/index.tsx",
                lineNumber: 68,
                columnNumber: 14
            }, this),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
                className: "size-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/layout/index.tsx",
                lineNumber: 69,
                columnNumber: 16
            }, this)
        };
        t4 = {
            "--border-radius": "12px"
        };
        $[6] = t3;
        $[7] = t4;
    } else {
        t3 = $[6];
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
            position: "bottom-right",
            richColors: true,
            icons: t3,
            style: t4
        }, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== currentBackgroundImage) {
        t6 = currentBackgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-0 overflow-hidden",
            style: {
                backgroundImage: `url(${currentBackgroundImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }
        }, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 89,
            columnNumber: 36
        }, this);
        $[9] = currentBackgroundImage;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== regenerateKey || $[12] !== siteContent.backgroundColors) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layout$2f$backgrounds$2f$blurred$2d$bubbles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            colors: siteContent.backgroundColors,
            regenerateKey: regenerateKey
        }, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[11] = regenerateKey;
        $[12] = siteContent.backgroundColors;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nav$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 111,
            columnNumber: 10
        }, this);
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== cardStyles || $[16] !== maxSM) {
        t9 = !maxSM && cardStyles.musicCard?.enabled !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$music$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 118,
            columnNumber: 63
        }, this);
        $[15] = cardStyles;
        $[16] = maxSM;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] !== children || $[19] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "relative z-10 h-full",
            children: [
                children,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[18] = children;
        $[19] = t9;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== init || $[22] !== maxSM) {
        t11 = maxSM && init && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scroll$2d$top$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTopButton"], {
            className: "bg-brand/20 fixed right-6 bottom-8 z-50 shadow-md"
        }, void 0, false, {
            fileName: "[project]/src/layout/index.tsx",
            lineNumber: 136,
            columnNumber: 28
        }, this);
        $[21] = init;
        $[22] = maxSM;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[24] !== t10 || $[25] !== t11 || $[26] !== t6 || $[27] !== t7) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t5,
                t6,
                t7,
                t10,
                t11
            ]
        }, void 0, true);
        $[24] = t10;
        $[25] = t11;
        $[26] = t6;
        $[27] = t7;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    return t12;
}
_s(Layout, "Bxg/9ACmtIufFRgzkjDTcrc50/4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCenterInit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSizeInit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfigStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"]
    ];
});
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6dec62f6._.js.map