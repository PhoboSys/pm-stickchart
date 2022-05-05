"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //events
    zoomspeed: 100,
    //pixi
    forceCanvas: false,
    autoStart: true,
    autoDensity: true,
    antialias: true,
    resolution: Math.ceil(window.devicePixelRatio),
    //data
    maxdensity: 100,
    //chart
    style: {
        background: 0x22273F,
        linesize: 3,
        linecolor: 0x009797,
        rectunged: false,
        upcolor: 0x00A573,
        downcolor: 0xF05750,
    },
    padding: {
        left: -0.1,
        right: 0.3819,
        top: 0.1,
        bottom: 0.3819, // % golden
    },
};
//# sourceMappingURL=config.js.map