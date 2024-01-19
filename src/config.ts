export default {

    positioning: {
        alert: 30_000, // 30 sec
    },

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
        maxstack: 10,
        animation: {
            duration: 1.618,
            ease: 'power2.out',
        }
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
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    },

    //chart
    style: {
        background: 0x000000,
        backgroundAlpha: 0,
        linesize: 3,
        linecolor: 0xffffff,
        gradient: {
            enabled: true,
            color: 0x1F4EEF54,
        },
        linearresolution: {
            upcolor: 0x02A179,
            downcolor: 0xD7335B,
            zerocolor: 0xFFFFFF,
            nocontest: 0x474C67,
        },
        curvedresolution: {
            linesize: 16,
            linecolor: 0xffffff,
            upcolor: 0x02A179,
            downcolor: 0xD7335B,
            zerocolor: 0xFFFFFF,
            nocontest: 0x474C67,
        },
        poolRoundColor: 0x1F50F7,
        poolClaimaColors: [
            { color: '#F7514D00', offset: 0 },
            { color: '#FC8E5FFF', offset: 0.2 },
            { color: '#FBC88BFF', offset: 0.9 },
            { color: '#FBC88B00', offset: 1 },
        ],
        lockCountdown: {
            colors: [
                { color: '#7CD0FFFF', offset: 0 },
                { color: '#7CD0FF80', offset: 1 },
            ],
            padding: 50,
        },
        resolutionCountdown: {
            colors: [
                { color: '#1F50F7FF', offset: 0 },
                { color: '#1F50F7BF', offset: 1 },

            ],
            padding: 25,
        },
        levels: {
            royalLineColor: 0xFFFFFF,
            goldLineColor: 0xFFFFFF,
            silverLineColor: 0xFFFFFF,
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

    features: {
        rectungedPriceLine: false,
        curvedResolutionLines: false,
        pariTileNewDesign: true,
    },
}
