declare const _default: {
    positioning: {
        alert: number;
    };
    prediction: {
        historical: boolean;
    };
    performance: {
        renderMs: number;
    };
    zoom: {
        speed: number;
        throttle: number;
    };
    pinch: {
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
        roundActualRoundColor: number;
        goldCoinShineColors: {
            color: string;
            offset: number;
        }[];
        silverCoinShineColors: {
            color: string;
            offset: number;
        }[];
        roundRoundColors: {
            color: string;
            offset: number;
        }[];
        roundRoundWinColors: {
            color: string;
            offset: number;
        }[];
        roundRoundBottomColors: {
            color: string;
            offset: number;
        }[];
        roundRoundWinBorderColors: {
            color: string;
            offset: number;
        }[];
        roundRoundNoContestColors: {
            color: string;
            offset: number;
        }[];
        roundRoundNoContestBorderColors: {
            color: string;
            offset: number;
        }[];
        lockCountdown: {
            colors: {
                color: string;
                offset: number;
            }[];
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
    limit: {
        entryFlickering: number;
        entryHushed: number;
    };
};
export default _default;
