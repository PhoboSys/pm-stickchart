export default {

    //zoom
    zoom: {
        speed: 100,
        throttle: 30, // one frame
    },

    //pixi
    forceCanvas: false,
    autoStart: true,
    autoDensity: true,
    antialias: true,
    resolution: Math.ceil(window.devicePixelRatio),

    //chart morph animation
    morph: {
        duration: 0.6819,
        ease: 'power2.out',
    },

    //data
    maxdensity: 500,

    //chart
    style: {
        background: 0x000000,
        backgroundAlpha: 0,
        linesize: 3,
        linecolor: 0x009797,
        rectunged: false,
        upcolor: 0x00A573,
        downcolor: 0xF05750,
    },

    padding: {
        left: -0.1, // %
        right: 0.3819, // % golden
        top: 0.2, // %
        bottom: 0.3819, // % golden
    },
}
