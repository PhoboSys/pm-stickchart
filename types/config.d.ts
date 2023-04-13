declare const _default: {
    pari: {
        historical: boolean;
    };
    performance: {
        renderMs: number;
    };
    zoom: {
        speed: number;
        throttle: number;
    };
    grid: {
        time: {
            max: number;
            fontsize: number;
        };
        price: {
            max: number;
            fontsize: number;
        };
    };
    forceCanvas: boolean;
    autoStart: boolean;
    autoDensity: boolean;
    antialias: boolean;
    resolution: number;
    morph: {
        maxstack: number;
        animation: {
            duration: number;
            ease: string;
        };
    };
    maxdensity: number;
    ui: {
        precision: {
            erc20: number;
            percent: number;
        };
    };
    price: {
        showSymbols: boolean;
        precision: number;
    };
    style: {
        background: number;
        backgroundAlpha: number;
        linesize: number;
        linecolor: number;
        rectunged: boolean;
        resolution: {
            upcolor: number;
            downcolor: number;
            zerocolor: number;
            nocontest: number;
        };
        poolRoundColors: {
            color: string;
            offset: number;
        }[];
        poolClaimaColors: {
            color: string;
            offset: number;
        }[];
        lockCountdownColors: {
            color: string;
            offset: number;
        }[];
        resolutionCountdownColors: {
            color: string;
            offset: number;
        }[];
        levels: {
            royalLineColors: number[];
            goldLineColors: number[];
            silverLineColors: number[];
            royalColors: {
                color: string;
                offset: number;
            }[];
            goldColors: {
                color: string;
                offset: number;
            }[];
            silverColors: {
                color: string;
                offset: number;
            }[];
        };
    };
    padding: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
};
export default _default;
