export default {

    //zoom
    zoom: {
        speed: 100,
        throttle: 30, // one frame
    },

    grid: {
        time: { max: 20, fontsize: 12 },
        price: { max: 20, fontsize: 12 },
    },

    //pixi
    forceCanvas: false,
    autoStart: true,
    autoDensity: true,
    antialias: true,
    resolution: Math.ceil(window.devicePixelRatio),

    //chart morph animation
    morph: {
        duration: 1.618,
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
        levels: {
            royalLineColors: [0xDDDFDE, 0xB3B7B8],
            goldLineColors: [0xD19F37, 0xFDD77E],
            silverLineColors: [0xC4CAC3, 0xE4E5E9],

            royalColors: [
                { color: '#9CA2A2', offset: 0.17 },
                { color: '#EBCEAE', offset: 0.3743 },
                { color: '#E4E5E9', offset: 0.5467 },
                { color: '#B3B7B8', offset: 0.7083 },
                { color: '#DEE0DF', offset:1 },
            ],

            goldColors: [
                { color: '#D19F37', offset: 0 },
                { color: '#FFD77D', offset: 1 },
            ],
            silverColors: [
                { color: '#B6BBB4', offset: 0 },
                { color: '#E4E5E9', offset: 0.5467 },
                { color: '#C4CAC3', offset: 1 },
            ],
        },
    },

    padding: {
        left: -0.1, // %
        right: 0.3819, // % golden
        top: 0.2, // %
        bottom: 0.3819, // % golden
    },
}
