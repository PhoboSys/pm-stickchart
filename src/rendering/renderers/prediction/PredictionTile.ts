import merge from 'lodash/merge'

import { PRIZEFUNDS, ORCY, DEMO, USDC } from '@constants'

import { RenderingContext, GraphicUtils } from '@rendering'
import {
    UP_ICON_TEXTURE,
    DOWN_ICON_TEXTURE,
    ZERO_ICON_TEXTURE,
    UNDEFINED_ICON_TEXTURE,
    UNKNOWN_ERC20_TEXTURE,
    DEMO_TEXTURE,
    ORCY_TEXTURE,
    USDC_TEXTURE,
    GRADIENT_TEXTURE,
} from '@rendering/textures'

import { Logger } from '@infra'

import datamath from '@lib/datamath'
import { Graphics, Container, Sprite, Assets, gsap } from '@lib/pixi'
import ui from '@lib/ui'
import { actualReturnDecimal, profitPercent } from '@lib/calc-utils'

import { RoundHoverEvent, RoundUnhoverEvent, TouchStartEvent, WithdrawEvent } from '@events'
import { ResolveWithdrawEvent, RoundPinEvent, RoundUnpinEvent } from '@events'
import { ResolveWithdrawNocontestEvent } from '@events'

import { EPosition } from '@enums'

import { GroupComponent } from '@rendering/components/GroupComponent'

import { BasePredictionsRenderer } from './BasePredictionsRenderer'

export class PredictionTile extends BasePredictionsRenderer {

    static readonly PREDICTION_TILE_ID: symbol = Symbol('PREDICTION_TILE_ID')

    public get rendererId(): symbol {
        return PredictionTile.PREDICTION_TILE_ID
    }

    private avatarResolvers = {}

    private groupStyle: any = {

        [EPosition.Up]: {
            offset: [0, 40],
        },

        [EPosition.Down]: {
            offset: [0, -134-62],
        },

        [EPosition.Zero]: {
            offset: [0, 14],
        }

    }

    private contentStyle = {
        offset: [14, (58-32)/2],
    }

    private wagerContainerBaseStyles: any = {
        [EPosition.Up]: {
            offset: [24, 0],
            background: {
                width: 170,
                height: 58,
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0x01A37A,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
        [EPosition.Zero]: {
            offset: [-24, 0],
            background: {
                width: 170,
                height: 58,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0xB7BDD7,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
        [EPosition.Down]: {
            offset: [24, 0],
            background: {
                width: 170,
                height: 58,
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0xD7335B,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
    }

    private wagerContainerMobileBaseStyles: any = {
        [EPosition.Up]: {
            offset: [24, 0],
            background: {
                width: 150,
                height: 58,
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0x01A37A,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
        [EPosition.Zero]: {
            offset: [-24, 0],
            background: {
                width: 150,
                height: 58,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0xB7BDD7,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
        [EPosition.Down]: {
            offset: [24, 0],
            background: {
                width: 150,
                height: 58,
                radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                color: 0xD7335B,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                },
            },
        },
    }

    private wagerOrphanContainerStyles: any = merge({}, this.wagerContainerBaseStyles, {
        [EPosition.Up]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
        [EPosition.Zero]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
        [EPosition.Down]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
    })

    private wagerOrphanContainerMobileStyles: any = merge({}, this.wagerContainerMobileBaseStyles, {
        [EPosition.Up]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
        [EPosition.Zero]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
        [EPosition.Down]: {
            background: {
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                },
            }
        },
    })

    private wagerContainerStyles: any = this.wagerContainerBaseStyles

    private wagerContainerMobileStyles: any = this.wagerContainerMobileBaseStyles

    private wagerTextStyle: any = {
        [EPosition.Up]: {
            text: {
                fill: 0xFFFFFFBF,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
                trim: true,
            },
            offset: [32+16, 0]
        },
        [EPosition.Zero]: {
            text: {
                fill: 0x071226BF,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
                trim: true,
            },
            offset: [32+16, 0]
        },
        [EPosition.Down]: {
            text: {
                fill: 0xFFFFFFBF,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
                trim: true,
            },
            offset: [32+16, 0]
        },
    }

    private wagerStyle: any = {
        [EPosition.Up]: {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 16,
                trim: true,
            },
            offset: [32+16, 20]
        },
        [EPosition.Zero]: {
            text: {
                fill: 0x071226,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 16,
                trim: true,
            },
            offset: [32+16, 20]
        },
        [EPosition.Down]: {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 16,
                trim: true,
            },
            offset: [32+16, 20]
        },
        orphan: {
            text: {
                fill: 0xD32F2F,
            },
        }
    }

    private profitContainerStyle = {

        [EPosition.Up]: {
            default: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 170,
                        height: 58,
                        points: [0, 58, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },

        [EPosition.Down]: {
            default: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 170,
                        height: 58,
                        points: [0, 58, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },

        [EPosition.Zero]: {
            default: {
                offset: [-170-24-8, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 170,
                        height: 58,
                        points: [0, 58, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-170-24-8, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },
    }

    private profitContainerMobileStyle = {

        [EPosition.Up]: {
            default: {
                offset: [-24, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 150,
                        height: 58,
                        points: [0, 58, 150, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-24, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },

        [EPosition.Down]: {
            default: {
                offset: [-24, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 150,
                        height: 58,
                        points: [0, 58, 150, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-24, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },

        [EPosition.Zero]: {
            default: {
                offset: [-150-24-8, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                    gradient: {
                        width: 150,
                        height: 58,
                        points: [0, 58, 150, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            claimable: {
                offset: [-150-24-8, 0],
                background: {
                    width: 150,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: <[number, number, number, number]>[28, 28, 28, 28],
                    color: 0x0F2668,
                },
            },
        },
    }

    private profitBorderBottomStyle = {
        offset: [0, -1],
        background: {
            width: 170,
            height: 58,
            radiuses: <[number, number, number, number]>[28, 28, 28, 28],
            lineStyle: {
                color: 0xFFFFFF,
                width: 1,
                alpha: 0.2,
                alignment: 0,
            }
        },
    }

    private profitBorderBottomMobileStyle = {
        offset: [0, -1],
        background: {
            width: 150,
            height: 58,
            radiuses: <[number, number, number, number]>[28, 28, 28, 28],
            lineStyle: {
                color: 0xFFFFFF,
                width: 1,
                alpha: 0.2,
                alignment: 0,
            }
        },
    }

    private profitTextStyle: any = {
        default: {
            text: {
                fill: 0x0F1F43,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
                trim: true,
                alpha: 0.8
            },
            offset: [44+0, 0]
        },
        claimable: {
            text: {
                fill: 0xF7C15B,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
                trim: true,
                alpha: 0.8
            },
            offset: [44+0, 0]
        }
    }

    private percentStyle: any = {
        default: {
            text: {
                fill: 0x0F1F43,
                fontWeight: 400,
                fontFamily: 'Roboto',
                fontSize: 12,
                trim: true,
                alpha: 0.8,
            },
            offset: [32+12+31+8, 0],
        },
        claimable: {
            text: {
                fill: 0xF7C15B,
                fontWeight: 400,
                fontFamily: 'Roboto',
                fontSize: 12,
                trim: true,
                alpha: 0.8,
            },
            offset: [32+12+31+8, 0],
        },
    }

    private payoutStyle: any = {
        default: {
            text: {
                fill: 0x0F1F43,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 16,
                trim: true,
            },
            offset: [44+0, 19.5]
        },
        claimable: {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 16,
                trim: true,
            },
            offset: [44+0, 19.5]
        }
    }

    private claimStyle = {
        [EPosition.Up]: {
            offset: [-24, 58+10],
            background: {
                width: 170,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 170,
                    height: 48,
                    points: [0, 48, 170, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
        [EPosition.Down]: {
            offset: [-24, -10-48],
            background: {
                width: 170,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 170,
                    height: 48,
                    points: [0, 48, 170, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
        [EPosition.Zero]: {
            offset: [-24-170-8, 58+10],
            background: {
                width: 170,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 170,
                    height: 48,
                    points: [0, 48, 170, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
    }

    private claimMobileStyle = {
        [EPosition.Up]: {
            offset: [-24, 58+10],
            background: {
                width: 150,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 150,
                    height: 48,
                    points: [0, 48, 150, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
        [EPosition.Down]: {
            offset: [-24, -10-48],
            background: {
                width: 150,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 150,
                    height: 48,
                    points: [0, 48, 150, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
        [EPosition.Zero]: {
            offset: [-24-150-8, 58+10],
            background: {
                width: 150,
                height: 48,
                anchor: [-1, 0],
                radiuses: <[number, number, number, number]>[23, 23, 23, 23],
                color: 0xFFFFFF,
                gradient: {
                    width: 150,
                    height: 48,
                    points: [0, 48, 150, 0],
                    colorStops: [
                        { color: '#F7C15B', offset: 0 },
                        { color: '#FFD78D', offset: 1 },
                    ]
                }
            },
        },
    }

    private claimBorderBottomStyle = {
        offset: [0, -1],
        background: {
            width: 170,
            height: 48,
            radiuses: <[number, number, number, number]>[23, 23, 23, 23],
            lineStyle: {
                color: 0xFFE7BA,
                width: 1,
                alpha: 1,
                alignment: 0,
            }
        },
    }

    private claimBorderBottomMobileStyle = {
        offset: [0, -1],
        background: {
            width: 150,
            height: 48,
            radiuses: <[number, number, number, number]>[23, 23, 23, 23],
            lineStyle: {
                color: 0xFFE7BA,
                width: 1,
                alpha: 1,
                alignment: 0,
            }
        },
    }

    private claimTextStyle = {
        text: {
            fill: 0x0F1F43,
            fontWeight: 700,
            fontFamily: 'Proxima Nova',
            fontSize: 16,
        },
        offset: <[number, number]>[0, 0]
    }

    private positionIconCircleStyle: any = {
        [EPosition.Up]: {
            offset: [0, 58/2],
            radius: 16,
            color: 0x01A37A,
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
                alpha: 1,
                alignment: 0,
            },
        },
        [EPosition.Down]: {
            offset: [0, 58/2],
            radius: 16,
            color: 0xD7335B,
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
                alpha: 1,
                alignment: 0,
            },
        },
        [EPosition.Zero]: {
            offset: [0, 58/2],
            radius: 16,
            color: 0xB7BDD7,
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
                alpha: 1,
                alignment: 0,
            },
        },
        orphan: {
            offset: [0, 58/2],
            radius: 16,
            color: 0x081327,
            lineStyle: {
                color: 0xD32F2F,
                width: 2,
                alpha: 1,
                alignment: 0,
            },
        }
    }

    private positionIconStyle: any = {
        [EPosition.Up]: {
            size: 32,
            offset: [0, 58/2],
            anchor: [0.5, 0.5],
            tint: 0xFFFFFF,
        },
        [EPosition.Down]: {
            size: 32,
            offset: [0, 58/2],
            anchor: [0.5, 0.5],
            tint: 0xFFFFFF,
        },
        [EPosition.Zero]: {
            size: 32,
            offset: [0, 58/2],
            anchor: [0.5, 0.5],
            tint: 0x071226,
            orphanTint: 0xFFFFFF,
        }
    }

    private profitCurrencyIconStyle: any = {
        default: {
            offset: [6, 6],
            size: 20,
            radius: 16,
            circleTint: 0x0F1F43,
            iconTint: 0xF9C462,
        },
        claimable: {
            offset: [6, 6],
            size: 20,
            radius: 16,
            circleTint: 0xF7C15B,
            iconTint: 0x092A73,
        },
    }

    private avatarStyle: any = {
        radius: 20,
        offset: [-5, -4],
        lineStyle: {
            width: 1,
            color: 0xFFFFFF,
            alignment: 1,
            alpha: 1,
        }
    }

    private wagerCurrencyIconContainerStyle: any = {
        offset: [32+16+7, 18],
    }

    private wagerCurrencyCircleStyle: any = {
        [EPosition.Up]: {
            color: 0xFFFFFF,
            radius: 8,
        },
        [EPosition.Down]: {
            color: 0xFFFFFF,
            radius: 8,
        },
        [EPosition.Zero]: {
            color: 0x071226,
            radius: 8,
        },
        orphan: {
            color: 0xD32F2F,
            radius: 8,
        },
    }

    private wagerCurrencyIconStyle: any = {
        [EPosition.Up]: {
            offset: [2, 2],
            tint: 0x01A37A,
            size: 12,
        },
        [EPosition.Down]: {
            offset: [2, 2],
            tint: 0xD7335B,
            size: 12,
        },
        [EPosition.Zero]: {
            offset: [2, 2],
            tint: 0xB7BDD7,
            size: 12,
        },
        orphan: {
            offset: [2, 2],
            tint: 0x081327,
            size: 12,
        }
    }

    private validPredictionPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
        hover_claim: {
            pixi: {
                alpha: 1.2,
                scale: 1.02,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
        },
        unhover_claim: {
            pixi: {
                alpha: 1,
                scale: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
        },
        tab_claim: {
            pixi: {
                scale: 1.04,
            },
            duration: 0.2,
            ease: 'back.out(2)',
            repeat: 1,
            yoyo: true,
            yoyoEase: 'power2.out',
        },
        show_propagating_bg: {
            duration: 0.3,
            ease: 'power2.out',
        },
        hide_propagating_bg: {
            pixi: {
                alpha: 0
            },
            duration: 0.3,
            ease: 'power2.out',
        },
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePrediction(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!(prediction.position in this.validPredictionPositions)) return this.clear()
        if (!round.entryPriceTimestamp || !round.entryPriceValue) return this.clear()

        const state = this.getPredictionState(round, prediction, context)

        if (!state.win && !state.nocontest && state.isHistorical) return this.clear()

        const [group] = this.renderGroup(round, prediction, context, container, state)

        this.updatePositionIcon(round, prediction, context, group, state)
        this.updateWager(round, prediction, context, group, state)
        this.updateProfit(round, prediction, context, group, state)
        this.updateClaim(round, prediction, context, group, state)
    }

    private getGroupPosition(
        context: RenderingContext,
        round: any,
        position: EPosition,
    ): [number, number] {
        const [ox] = datamath.scale([round.entryPriceTimestamp], context.plotdata.timerange, context.screen.width)
        const [oy] = datamath.scaleReverse([round.entryPriceValue], context.plotdata.pricerange, context.screen.height)

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = context.screen.height

        const bgStyle = this.groupStyle[position]

        const [ofx, ofy] = bgStyle.offset
        const bgx = ox + ofx
        const bgy = vertical + ofy

        return [bgx, bgy]
    }

    private renderGroup(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): any[] {

        const [groupElement] = this.get('groupElement', () => new GroupComponent())

        const [group, groupstate] = groupElement.update(context, {
            roundid: round.roundid,
            predictionState: state,
        })

        if (group) {

            if (groupstate.new) {
                container.sortableChildren = true
                container.addChild(group)
            }

            const [bgx, bgy] = this.getGroupPosition(context, round, prediction.position)

            group.position.set(bgx, bgy)
        }

        return [group, groupstate]
    }

    private updatePositionIcon(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const { orphan } = state

        const circleStyle = orphan ? this.positionIconCircleStyle.orphan : this.positionIconCircleStyle[prediction.position]
        const { lineStyle, color, radius, offset: [ofx, ofy] } = circleStyle

        const [positionIconCircle, positionIconCircleState] = this.get('positionIconCircle', () => new Graphics())
        if (positionIconCircleState.new) container.addChild(positionIconCircle)

        positionIconCircle
            .clear()
            .lineStyle(lineStyle)
            .beginFill(color)
            .drawCircle(ofx, ofy, radius)
            .endFill()

        const iconStyle = this.positionIconStyle[prediction.position]
        const [positionIcon, positionIconState] = this.get(
            'positionIcon',
            () => this.createIcon(context, this.getPositionIconTextureName(prediction.position), iconStyle)
        )
        if (positionIconState.new) container.addChild(positionIcon)
        if (orphan && iconStyle.orphanTint) positionIcon.tint = iconStyle.orphanTint
        else positionIcon.tint = iconStyle.tint
    }

    private updateProfit(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Graphics | Container,
        state: any,
    ): void {

        const {
            emptyround,
            nocontest,
            undef,
            win,
            phantom,
            orphan,
            propagating,
            claimable,
        } = state

        if (orphan || (emptyround && !claimable)) {
            this.clear('profit')
            this.clear('profitcontent')
            this.clear('profitCurrency')
            this.clear('payout')
            this.clear('prizeAmount')
            this.clear('profitText')
            this.clear('percent')
            this.clear('percentText')
            this.clear('profitpropagatingContainer')
            this.clear('profitpropagating')

            return
        }

        const [profit, profitState] = this.get(
            'profit',
            () => this.createProfitContainer(context, prediction.position, claimable),
            [claimable]
        )
        if (profitState.new) container.addChild(profit)
        profit.alpha = 0

        const [profitcontent, profitcontentState] = this.get(
            'profitcontent',
            () => this.createContainer(this.contentStyle)
        )
        if (profitcontentState.new || profitState.new) profit.addChild(profitcontent)

        const [profitCurrency, profitCurrencyState] = this.get(
            'profitCurrency',
            () => this.createProfitCurrencyIcon(context)
        )
        if (profitCurrencyState.new) profitcontent.addChild(profitCurrency)

        profitCurrency.tint = claimable ?
            this.profitCurrencyIconStyle.claimable.circleTint :
            this.profitCurrencyIconStyle.default.circleTint
        const icon = (<Sprite> profitCurrency.getChildAt(0))
        icon.tint = claimable ?
            this.profitCurrencyIconStyle.claimable.iconTint :
            this.profitCurrencyIconStyle.default.iconTint

        if (!undef) {
            const [payout, payoutState] = this.get('payout', () => GraphicUtils.createText(
                0,
                this.payoutStyle.default.offset,
                this.payoutStyle.default.text,
            ))
            if (payoutState.new) profitcontent.addChild(payout)
            payout.style.fill = claimable ? this.payoutStyle.claimable.text.fill : this.payoutStyle.default.text.fill

            if (win && !emptyround) {
                profit.alpha = 1

                const [prizeAmount] = this.get(
                    'prizeAmount',
                    () => {
                        if (prediction.claimed) {
                            return ui.erc20(prediction.payout)
                        } else {
                            return ui.erc20(actualReturnDecimal(round.prizefunds, prediction.wager, prediction.position, prediction.erc20))
                        }
                    },
                    [prediction.wager, prediction.position, prediction.claimed, round.prizefunds[PRIZEFUNDS.TOTAL]]
                )
                payout.text = prizeAmount
                payout.position.set(...this.payoutStyle.default.offset)

                const [profitText, profitTextState] = this.get('profitText', () => GraphicUtils.createText(
                    'Profit',
                    this.profitTextStyle.default.offset,
                    this.profitTextStyle.default.text,
                ))
                if (profitTextState.new) profitcontent.addChild(profitText)
                profitText.alpha = this.profitTextStyle.default.text.alpha
                profitText.style.fill = claimable ? this.profitTextStyle.claimable.text.fill : this.profitTextStyle.default.text.fill

                const [percentAmount] = this.get(
                    'percent',
                    () => ui.percent(profitPercent(prizeAmount, prediction.wager)),
                    [prizeAmount, prediction.wager]
                )
                const [percentText, percentTextState] = this.get('percentText', () => GraphicUtils.createText(
                    percentAmount,
                    this.percentStyle.default.offset,
                    this.percentStyle.default.text,
                ))
                if (percentTextState.new) profitcontent.addChild(percentText)
                percentText.alpha = this.percentStyle.default.text.alpha
                percentText.text = percentAmount
                percentText.style.fill = claimable ? this.percentStyle.claimable.text.fill : this.percentStyle.default.text.fill
            } else {
                const [profitText] = this.read('profitText')
                if (profitText) profitText.alpha = 0
                const [percentText] = this.read('percentText')
                if (percentText) percentText.alpha = 0

                let payoutAmount: any = 0

                if (prediction.claimed) {
                    profit.alpha = 1
                    payoutAmount = ui.erc20(prediction.payout)
                } else if ((nocontest || emptyround) && !phantom) {
                    profit.alpha = 1
                    payoutAmount = ui.erc20(prediction.wager)
                } else {
                    profit.alpha = 0
                }

                const [ofx] = this.payoutStyle.default.offset
                payout.text = payoutAmount
                payout.position.set(ofx, (profitcontent.height-payout.height)/2)
            }
        }

        const [profitpropagatingContainer, profitpropagatingContainerState] = this.get(
            'profitpropagatingContainer',
            () => this.createPropagatingContainer((
                context.options.isMobile
                    ? this.profitContainerMobileStyle
                    : this.profitContainerStyle
            )[prediction.position].default)
        )
        if (profitpropagatingContainerState.new || profitState.new) profit.addChild(profitpropagatingContainer)

        const [[profitpropagating, profitpropagatingtimeline], profitpropagatingState] = this.get(
            'profitpropagating',
            () => this.createPropagatingBackground()
        )
        if (profitpropagatingState.new) {
            profitpropagatingContainerState.timeline = profitpropagatingtimeline
            profitpropagatingContainer.addChild(profitpropagating)
        }

        if (propagating) this.animate('profitpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.07 } })
        else this.animate('profitpropagatingContainer', 'hide_propagating_bg')
    }

    private updateClaim(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Graphics | Container,
        state: any,
    ): void {
        const { claimable, emptyround, isHistorical, propagating } = state

        if (claimable) {
            const roundid = round.roundid
            const predictionid = prediction.predictionid
            const erc20 = prediction.erc20

            const [claim, claimState] = this.get('claim', () => this.createClaim(context, prediction.position))
            if (claimState.new) {
                container.addChild(claim)

                this.get('resolved', () => round.resolved, [round.resolved])
                this.get('settlment', () => context.settlments?.[round.endDate], [context.settlments?.[round.endDate]])
                this.get('nocontest', () => state.nocontest, [state.nocontest])

                claim.interactive = true
                claim.cursor = 'pointer'

                const pointerover = (e): void => {
                    this.rebind(roundid, predictionid)
                    this.animate('claim', 'hover_claim')
                    context.eventTarget.dispatchEvent(new RoundHoverEvent(roundid, e))
                }

                const pointerout = (e): void  => {
                    this.rebind(roundid, predictionid)
                    this.animate('claim', 'unhover_claim')
                    context.eventTarget.dispatchEvent(new RoundUnhoverEvent(roundid, e))
                }

                const pointertap = (e): void  => {
                    this.rebind(roundid, predictionid)
                    this.animate('claim', 'tab_claim')
                    const [rslvd] = this.read('resolved')
                    const [sttlmnt] = this.read('settlment')
                    const [nocontest] = this.read('nocontest')

                    if (rslvd) {
                        context.eventTarget.dispatchEvent(
                            new WithdrawEvent(
                                roundid,
                                predictionid,
                                erc20,
                                e
                            )
                        )
                    }

                    if (!rslvd) {
                        if (nocontest && emptyround) {
                            context.eventTarget.dispatchEvent(
                                new ResolveWithdrawNocontestEvent(
                                    roundid,
                                    predictionid,
                                    erc20,
                                    e
                                )
                            )
                        } else if (sttlmnt) {
                            context.eventTarget.dispatchEvent(
                                new ResolveWithdrawEvent(
                                    roundid,
                                    predictionid,
                                    erc20,
                                    sttlmnt.exitPrice,
                                    sttlmnt.controlPrice,
                                    e
                                )
                            )
                        }
                    }
                }

                if (context.options.isMobile) {

                    context.eventTarget.addEventListener('touchstart', (e: TouchStartEvent) => {
                        if (e.multitouch) {
                            claim.removeEventListener('pointerover', pointerover)
                            claim.removeEventListener('pointerout', pointerout)
                            claim.removeEventListener('pointertap', pointertap)
                        } else {
                            claim.addEventListener('pointerover', pointerover)
                            claim.addEventListener('pointerout', pointerout)
                            claim.addEventListener('pointertap', pointertap)
                        }
                    })
                }

                claim.addEventListener('pointerover', pointerover)
                claim.addEventListener('pointerout', pointerout)
                claim.addEventListener('pointertap', pointertap)
            }

            if (isHistorical && !claimState.subscribed) {
                claimState.subscribed = true

                context.eventTarget.addEventListener('roundpin', (e: RoundPinEvent) => {
                    if (e.roundid !== roundid) return

                    this.rebind(roundid, predictionid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = true
                })

                context.eventTarget.addEventListener('roundunpin', (e: RoundUnpinEvent) => {
                    if (e.roundid !== roundid) return

                    this.rebind(roundid, predictionid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = false
                })

            }

            const [[claimFragment, claimFragmentTimeline], claimFragmentState] = this.get(
                'claimFragment',
                () => this.createClaimFragment(claim.width)
            )
            if (claimFragmentState.new) {
                claimFragmentState.timeline = claimFragmentTimeline
                claim.addChild(claimFragment)
            }

            const [claimpropagatingContainer, claimpropagatingContainerState] = this.get(
                'claimpropagatingContainer',
                () => this.createPropagatingContainer(
                    (
                        context.options?.isMobile ?
                            this.claimMobileStyle :
                            this.claimStyle
                    )[prediction.position]
                )
            )
            if (claimpropagatingContainerState.new) claim.addChild(claimpropagatingContainer)

            const [[claimpropagating, claimpropagatingtimeline], claimpropagatingState] = this.get(
                'claimpropagating',
                () => this.createPropagatingBackground()
            )
            if (claimpropagatingState.new) {
                claimpropagatingState.timeline = claimpropagatingtimeline
                claimpropagatingContainer.addChild(claimpropagating)
            }

            if (propagating) this.animate('claimpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.3 } })
            else this.animate('claimpropagatingContainer', 'hide_propagating_bg')

        } else {
            this.clear('claim')
            this.clear('resolved')
            this.clear('settlment')
            this.clear('nocontest')
        }
    }

    private updateWager(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
        state,
    ): void {
        const { propagating, orphan } = state

        const position = prediction.position

        const wagerContainerStyles = context.options.isMobile
            ? this.wagerContainerMobileStyles[position]
            : this.wagerContainerStyles[position]

        const wagerOrphanContainerStyles = context.options.isMobile
            ? this.wagerOrphanContainerMobileStyles[position]
            : this.wagerOrphanContainerStyles[position]

        const [wager, wagerState] = this.get(
            'wager',
            () => this.createContainer(orphan ? wagerOrphanContainerStyles : wagerContainerStyles),
            [orphan]
        )
        if (wagerState.new) container.addChild(wager)

        const [wagercontent, wagercontentState] = this.get(
            'wagercontent',
            () => this.createContainer(this.contentStyle)
        )
        if (wagercontentState.new || wagerState.new) wager.addChild(wagercontent)

        const [avatar, avatarState] = this.get(
            'avatar',
            () => this.createAvatar(context.bettor.avatarUrl),
            [context.bettor.avatarUrl]
        )
        if (avatarState.new) wagercontent.addChild(avatar)

        const [wagerText, wagerTextState] = this.get('wagerText', () => GraphicUtils.createText(
            'Deposit',
            this.wagerTextStyle[position].offset,
            this.wagerTextStyle[position].text,
        ))
        if (wagerTextState.new) wagercontent.addChild(wagerText)

        const [wagerAmount, wagerAmountState] = this.get('wagerAmount', () => GraphicUtils.createText(
            ui.erc20(prediction.wager),
            this.wagerStyle[position].offset,
            this.wagerStyle[position].text,
        ))
        if (wagerAmountState.new) wagercontent.addChild(wagerAmount)
        wagerAmount.text = ui.erc20(prediction.wager)
        wagerAmount.style.fill = orphan ?
            this.wagerStyle.orphan.text.fill :
            this.wagerStyle[position].text.fill

        this.updateWagerCurrencyIcon(context, wagercontent, position, [wagerAmount.width, 0], orphan)

        const [wagerpropagatingContainer, wagerpropagatingContainerState] = this.get(
            'wagerpropagatingContainer',
            () => this.createPropagatingContainer(wagerContainerStyles)
        )
        if (wagerpropagatingContainerState.new || wagerState.new) wager.addChild(wagerpropagatingContainer)

        const [[wagerpropagating, wagerpropagatingtimeline], wagerpropagatingState] = this.get(
            'wagerpropagating',
            () => this.createPropagatingBackground()
        )
        if (wagerpropagatingState.new) {
            wagerpropagatingState.timeline = wagerpropagatingtimeline
            wagerpropagatingContainer.addChild(wagerpropagating)
        }

        if (propagating) this.animate('wagerpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.15 } })
        else this.animate('wagerpropagatingContainer', 'hide_propagating_bg')
    }

    private updateWagerCurrencyIcon(
        context: RenderingContext,
        container: Container,
        position: EPosition,
        [ofx, ofy]: [number, number],
        orphan: boolean,
    ): void {

        const { offset: containerOffset } = this.wagerCurrencyIconContainerStyle

        const [wagerCurrencyContainer, wagerCurrencyContainerState] = this.get(
            'wagerCurrencyContainer',
            () => new Container(),
        )
        if (wagerCurrencyContainerState.new) container.addChild(wagerCurrencyContainer)
        wagerCurrencyContainer.position.set(containerOffset[0] + ofx, containerOffset[1] + ofy)

        const [wagerCurrencyCircle, wagerCurrencyCircleState] = this.get(
            'wagerCurrencyCircle',
            () => new Graphics(),
        )
        if (wagerCurrencyCircleState.new) wagerCurrencyContainer.addChild(wagerCurrencyCircle)

        const { radius, color } = orphan ? this.wagerCurrencyCircleStyle.orphan : this.wagerCurrencyCircleStyle[position]

        wagerCurrencyCircle
            .clear()
            .beginFill(color, 1)
            .drawCircle(radius, radius, radius)
            .endFill()

        const [wagerCurrencyIcon, wagerCurrencyIconState] = this.get(
            'wagerCurrencyIcon',
            () => this.createIcon(
                context,
                this.getPredictionCurrencyIconTextureName(context),
                this.wagerCurrencyIconStyle[position],
            ),
        )
        if (wagerCurrencyIconState.new) wagerCurrencyContainer.addChild(wagerCurrencyIcon)
        wagerCurrencyIcon.tint = orphan ?
            this.wagerCurrencyIconStyle.orphan.tint :
            this.wagerCurrencyIconStyle[position].tint
    }

    private getPositionIconTextureName(position: EPosition): symbol {

        switch (position) {
            case EPosition.Up:
                return UP_ICON_TEXTURE
            case EPosition.Down:
                return DOWN_ICON_TEXTURE
            case EPosition.Zero:
                return ZERO_ICON_TEXTURE

            default:
                Logger.error(`prediction position "${position}" is not supported, fallback to Undeliden`)

                return UNDEFINED_ICON_TEXTURE
        }

    }

    private getPredictionCurrencyIconTextureName(context: RenderingContext): symbol {
        const key = context.game?.currency

        switch (key) {
            case ORCY:
                return ORCY_TEXTURE
            case DEMO:
                return DEMO_TEXTURE
            case USDC:
                return USDC_TEXTURE
            default:
                Logger.error(`currency "${key}" is not supported, fallback to Undeliden`)

                return UNKNOWN_ERC20_TEXTURE
        }
    }

    private createIcon(
        context: RenderingContext,
        textureName: symbol,
        style,
    ): Sprite {
        const { size, offset, tint, alpha, anchor } = style

        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)

        icon.scale.set(size / icon.height)
        if (offset) icon.position.set(...offset)
        if (tint) icon.tint = tint
        if (alpha) icon.alpha = alpha
        if (anchor) icon.anchor.set(...anchor)

        return icon
    }

    private createProfitCurrencyIcon(
        context: RenderingContext,
    ): Graphics {

        const {
            radius
        } = this.profitCurrencyIconStyle.default

        const circle = (new Graphics())
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill()

        const icon = this.createIcon(
            context,
            this.getPredictionCurrencyIconTextureName(context),
            this.profitCurrencyIconStyle.default
        )

        circle.addChild(icon)

        return circle
    }

    private createAvatar(url): Container {
        const { radius, lineStyle, offset } = this.avatarStyle

        const circle = (new Graphics())
            .lineStyle(lineStyle)
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill()

        const container = new Container()

        // Presist avatarResolvers to prevent showing pixi warnings about loading same assets
        this.avatarResolvers[url] = this.avatarResolvers[url] || Assets.load(url)
        this.avatarResolvers[url].then((texture) => {
            const icon = new Sprite(texture)
            icon.scale.set(2*radius/texture.height)
            container.addChild(icon)
        })

        const mask = (new Graphics())
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill()
        container.mask = mask

        circle.addChild(container)
        container.addChild(mask)

        circle.position.set(...offset)

        return circle
    }

    private createContainer(style: any): Container {

        let { offset: [ofx, ofy] } = style
        const { background: backgroundStyle } = style

        const container = new Container()

        if (backgroundStyle) {
            const {
                width,
                height,
                anchor,
                lineStyle,
                radiuses,
                color,
                texture,
                alpha,
            } = backgroundStyle

            const background = GraphicUtils.createRoundedRect(
                [0, 0],
                [width, height],
                radiuses,
                { color, lineStyle, texture, alpha }
            )
            container.addChild(background)

            if (anchor) {
                const [ax, ay] = anchor
                ofx = ax * width + ofx
                ofy = ay * height + ofy
            }
        }

        container.position.set(ofx, ofy)

        return container
    }

    private createProfitContainer(context, position, claimable): Container {
        const isMobile = context.options?.isMobile
        const profitContainerStyle = (isMobile ? this.profitContainerMobileStyle : this.profitContainerStyle)[position]
        if (claimable) {
            const profit = this.createContainer(profitContainerStyle.claimable)
            const mask = (<Graphics> profit.getChildAt(0)).clone()
            profit.addChild(mask)
            profit.mask = mask
            const borderBottom = this.createContainerBorderBottom(
                isMobile
                    ? this.profitBorderBottomMobileStyle
                    : this.profitBorderBottomStyle
            )
            profit.addChild(borderBottom)

            return profit
        } else {
            const style = profitContainerStyle.default
            const texture = context.textures.get(GRADIENT_TEXTURE, style.background.gradient)

            return this.createContainer({ ...style, background: { ...style.background, texture } })
        }
    }

    private createClaim(context, position): Container {
        const style = context.options?.isMobile ? this.claimMobileStyle[position] : this.claimStyle[position]
        const containerTexture = context.textures.get(GRADIENT_TEXTURE, style.background.gradient)

        const container = this.createContainer({ ...style, background: { ...style.background, texture: containerTexture } })
        const mask = (<Graphics> container.getChildAt(0)).clone()
        container.addChild(mask)
        container.mask = mask
        const text = GraphicUtils.createText(
            'Withdraw',
            this.claimTextStyle.offset,
            this.claimTextStyle.text,
        )
        container.addChild(text)
        text.position.set((container.width - text.width) / 2, (container.height - text.height) / 2)

        const borderBottom = this.createContainerBorderBottom(
            context.options?.isMobile
                ? this.claimBorderBottomMobileStyle
                : this.claimBorderBottomStyle
        )
        container.addChild(borderBottom)

        return container
    }

    private createClaimFragment(claimwidth): [Graphics, gsap.core.Timeline] {

        const rect = (new Graphics())
            .beginFill(0xFFFFFF, 0.2)
            .drawPolygon([
                27, 0,
                55, 0,
                28, 46,
                0, 46,
            ])
            .drawPolygon([
                66, 0,
                75, 0,
                48, 46,
                39, 46,
            ])
            .endFill()

        rect.pivot.x = rect.width
        rect.position.y = 1

        const timeline = gsap.timeline().to(rect, {
            pixi: { x: claimwidth + rect.width },
            delay: 5,
            repeatDelay: 5,
            duration: 1,
            ease: 'none',
            repeat: -1
        })

        return [rect, timeline]
    }

    private createPropagatingContainer(style): Container {
        const container = new Container()
        const mask = this.createContainer(style)
        mask.position.set(0, 0)
        container.mask = mask
        container.addChild(mask)
        container.alpha = 0

        return container
    }

    private createPropagatingBackground(): [Container, gsap.core.Timeline] {
        const [propagatingBackground, gsaptimeline] = GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [{ color: 0xffffff, alpha: 1 }],
            duration: 1,
        })

        propagatingBackground.rotation = 3*Math.PI/4
        propagatingBackground.pivot.x = 150
        propagatingBackground.pivot.y = 155
        propagatingBackground.position.set(150, 50)

        return [propagatingBackground, gsaptimeline]
    }

    private createContainerBorderBottom(style): Graphics {
        const {
            offset: [x, y],
            background: {
                height,
                width,
                radiuses: [, , r3, r4],
                lineStyle,
            }
        } = style

        const rect = new Graphics()
        rect.lineStyle(lineStyle)
        rect
            .moveTo(x-0.25, y+(height/2))
            .arcTo(x-0.25, y+height, x+r4, y+height, r4)

            .lineTo(x+width - r3, y+height)
            .arcTo(x+width+0.25, y+height, x+width+0.25, y+(height/2), r3)

        return rect
    }

}
