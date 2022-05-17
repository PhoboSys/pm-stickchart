declare const _default: {
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
        duration: number;
        ease: string;
    };
    countdownPeriod: number;
    maxdensity: number;
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
        upcolor: number;
        downcolor: number;
        lockCountdownColors: {
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
