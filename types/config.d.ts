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
    maxdensity: number;
    style: {
        background: number;
        backgroundAlpha: number;
        linesize: number;
        linecolor: number;
        rectunged: boolean;
        upcolor: number;
        downcolor: number;
        levels: {
            royalLineColor: number;
            goldLineColor: number;
            silverLineColor: number;
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
