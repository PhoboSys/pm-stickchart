"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //debug
    debugtime: false,
    debugprice: false,
    debuglatest: false,
    //events
    zoomspeed: 100,
    //pixi
    forceCanvas: false,
    autoStart: true,
    autoDensity: true,
    antialias: true,
    resolution: Math.ceil(window.devicePixelRatio),
    //data
    maxdensity: 500,
    //chart
    style: {
        background: 0x22273F,
        linesize: 3,
        linecolor: 0x009797,
        rectunged: false,
    },
    padding: {
        left: -0.1,
        right: 0.3819,
        top: 0.1,
        bottom: 0.25, // %
    },
};
//# sourceMappingURL=config.js.map