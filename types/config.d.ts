declare const _default: {
    positioning: {
        alert: number;
    };
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
        minimumFractionDigits: number;
        maximumFractionDigits: number;
    };
    style: {
        background: number;
        backgroundAlpha: number;
        linesize: number;
        linecolor: number;
        gradient: {
            enabled: boolean;
            color: number;
        };
        linearresolution: {
            upcolor: number;
            downcolor: number;
            zerocolor: number;
            nocontest: number;
            won: number;
        };
        curvedresolution: {
            linesize: number;
            linecolor: number;
            upcolor: number;
            downcolor: number;
            zerocolor: number;
            nocontest: number;
        };
        poolActualRoundColor: number;
        goldCoinShineColors: {
            color: string;
            offset: number;
        }[];
        silverCoinShineColors: {
            color: string;
            offset: number;
        }[];
        poolRoundColors: {
            color: string;
            offset: number;
        }[];
        poolRoundWinColors: {
            color: string;
            offset: number;
        }[];
        poolRoundBottomColors: {
            color: string;
            offset: number;
        }[];
        poolRoundWinBorderColors: {
            color: string;
            offset: number;
        }[];
        poolRoundNoContestColors: {
            color: string;
            offset: number;
        }[];
        poolRoundNoContestBorderColors: {
            color: string;
            offset: number;
        }[];
        lockCountdown: {
            colors: {
                color: string;
                offset: number;
            }[];
            textColors: string[];
            paddingTop: number;
        };
        shadowCountdown: {
            colors: {
                color: string;
                offset: number;
            }[];
            paddingTop: number;
        };
        winningCountdown: {
            colors: {
                color: string;
                offset: number;
            }[];
            padding: number;
        };
        resolutionCountdown: {
            colors: {
                color: string;
                offset: number;
            }[];
            padding: number;
        };
        levels: {
            bronzeLineColor: number;
            silverLineColor: number;
            goldLineColor: number;
            bronzeColors: {
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
    features: {
        rectungedPriceLine: boolean;
        curvedResolutionLines: boolean;
    };
};
export default _default;
