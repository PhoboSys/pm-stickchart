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
        throttle: 30, // once per 30ms
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
            erc20: 3,
            percent: 1,
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
            nocontest: 0xCBE4EF,
            won: 0xF7C15B,
        },
        curvedresolution: {
            linesize: 16,
            linecolor: 0xffffff,
            upcolor: 0x02A179,
            downcolor: 0xD7335B,
            zerocolor: 0xFFFFFF,
            nocontest: 0x474C67,
        },
        poolActualRoundColor: 0x1F50F7,
        goldCoinShineColors: [
            { color: '#EEBC61B8', offset: 0 },
            { color: '#EEBC6100', offset: 1 },
        ],
        silverCoinShineColors: [
            { color: '#D4ECF3B8', offset: 0 },
            { color: '#D4ECF300', offset: 1 },
        ],
        poolRoundColors: [
            { color: '#1F4EEF00', offset: 0 },
            { color: '#1F4EEF33', offset: 1 },
        ],
        poolRoundWinColors: [
            { color: '#F7C15BFF', offset: 0 },
            { color: '#F7C15BFF', offset: 0.27 },
            { color: '#1C48DA00', offset: 0.79 },
            { color: '#1C48DA00', offset: 1 },
        ],
        poolRoundBottomColors: [
            { color: '#1C48DA00', offset: 0 },
            { color: '#1C48DA00', offset: 0.27 },
            { color: '#1C48DA54', offset: 0.79 },
            { color: '#1C48DA54', offset: 1 },
        ],
        poolRoundWinBorderColors: [
            { color: '#EDBC6200', offset: 0.13 },
            { color: '#EDBC62FF', offset: 0.38 },
            { color: '#1D49DBFF', offset: 0.65 },
            { color: '#1D49DB00', offset: 0.94 },
        ],
        poolRoundNoContestColors: [
            { color: '#7A7A7AFF', offset: 0 },
            { color: '#7A7A7AFF', offset: 0.27 },
            { color: '#1C48DA00', offset: 0.79 },
            { color: '#1C48DA00', offset: 1 },
        ],
        poolRoundNoContestBorderColors: [
            { color: '#AECBDF0D', offset: 0 },
            { color: '#AECBDF80', offset: 0.5 },
            { color: '#AECBDF0D', offset: 1 },
        ],
        lockCountdown: {
            colors: [
                { color: '#FEBF85', offset: 0 },
                { color: '#F07E77', offset: 0.73 },
                { color: '#F07E77', offset: 1 },
            ],
            paddingTop: 24,
        },
        shadowCountdown: {
            colors: [
                { color: '#00000066', offset: 0 },
                { color: '#00000000', offset: 1 },
            ],
            paddingTop: 24,
        },
        winningCountdown: {
            colors: [
                { color: '#F7C15B00', offset: 0 },
                { color: '#F7C15B00', offset: 0.1 },
                { color: '#F7C15BFF', offset: 0.49 },
                { color: '#F7C15BFF', offset: 0.51 },
                { color: '#F7C15B00', offset: 0.9 },
                { color: '#F7C15B00', offset: 1 },
            ],
            padding: 24,
        },
        resolutionCountdown: {
            colors: [
                { color: '#1F50F7FF', offset: 0 },
                { color: '#1F50F7BF', offset: 1 },

            ],
            padding: 24,
        },
        levels: {
            bronzeLineColor: 0xFFFFFF,
            silverLineColor: 0xFFFFFF,
            goldLineColor: 0xFFFFFF,
            bronzeColors: [
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
    },

    limit: {
        entryFlickering: 20,
        entryHushed: 10,
    }
}
