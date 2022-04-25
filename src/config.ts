export default {
    //debug
    debugtime: false,
    debugprice: false,
    debuglatest: false,

    //events
    zoomspeed: 100,

    //pixi
    forceCanvas: true,
    autoStart: false,
    autoDensity: true,
    antialias: false,
    resolution: Math.ceil(window.devicePixelRatio),

    //data
    maxdensity: 500,

    //chart
    style: {
        background: 0x22273F,
        linesize: 3,
        rectunged: false,
    },

    padding: {
        left: -0.1, // %
        right: 0.3819, // % golden
        top: 0.1, // %
        bottom: 0.25, // %
    }
}
