export default {

    pari: {
        historical: true,
    },

    performance: {
        renderMs: 5
    },

    //zoom
    zoom: {
        speed: 100,
        throttle: 30, // once per frame
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

    ui: {
        precision: {
            erc20: 8,
            percent: 2,
        }
    },

    price: {
        showSymbols: true,
        precision: 8,
    },

    //chart
    style: {
        background: 0x000000,
        backgroundAlpha: 0,
        linesize: 3,
        linecolor: 0x009797,
        rectunged: false,
        resolution: {
            upcolor: 0x00A573,
            downcolor: 0xF05750,
            zerocolor: 0x007397,
        },
        poolRoundColors: [
            { color: '#00A57300', offset: 0.0 },
            { color: '#00A573FF', offset: 0.33 },
            { color: '#F07750FF', offset: 0.90 },
            { color: '#F0775000', offset: 1 },
        ],
        poolClaimaColors: [
            { color: '#F7514D00', offset: 0 },
            { color: '#FC8E5FFF', offset: 0.2 },
            { color: '#FBC88BFF', offset: 0.9 },
            { color: '#FBC88B00', offset: 1 },
        ],
        lockCountdownColors: [
            { color: '#FFA00000', offset: 0 },
            { color: '#FFA00000', offset: 0.05 },
            { color: '#FFA000FF', offset: 0.5 },
            { color: '#FFA00000', offset: 0.95 },
            { color: '#FFA00000', offset: 1 },
        ],
        resolutionCountdownColors: [
            { color: '#00979700', offset: 0 },
            { color: '#00979700', offset: 0.05 },
            { color: '#009797FF', offset: 0.5 },
            { color: '#00979700', offset: 0.95 },
            { color: '#00979700', offset: 1 },

        ],
        levels: {
            royalLineColors: [0xDDDFDE, 0xB3B7B8],
            goldLineColors: [0xD19F37, 0xFDD77E],
            silverLineColors: [0xC4CAC3, 0xE4E5E9],
            royalColors: [
                { color: '#9CA2A2', offset: 0.17 },
                { color: '#EBCEAE', offset: 0.3743 },
                { color: '#E4E5E9', offset: 0.5467 },
                { color: '#B3B7B8', offset: 0.7083 },
                { color: '#DEE0DF', offset: 1 },
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
        left: -30, // px
        right: -30, // px
        top: 113, // px
        bottom: 210, // px
    },
}
