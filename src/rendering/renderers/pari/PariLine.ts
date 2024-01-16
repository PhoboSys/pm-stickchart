import { RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { EPosition } from '@enums'

import { PoolPinEvent, PoolUnpinEvent } from '@events'

import { BaseParisRenderer } from './BaseParisRenderer'
export class PariLine extends BaseParisRenderer {

    static readonly PARI_LINE_ID: symbol = Symbol('PARI_LINE_ID')

    public get rendererId(): symbol {
        return PariLine.PARI_LINE_ID
    }

    private nocontestLineStyle: any = {

        [EPosition.Up]: {
            startOffset: [0, -8],
            endOffset: [0, 40+(56-32)/2+32],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        },

        [EPosition.Down]: {
            startOffset: [0, 8],
            endOffset: [0, -134-62+(56-32)/2],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            startOffset: [0, 8],
            endOffset: [0, 14+(56-32)/2],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        }
    }

    private winlineStyle: any = {

        [EPosition.Up]: {
            startOffset: [0, -8],
            endOffset: [0, 40+(56-32)/2+32],
            lineStyle: {
                color: 0xD66F35,
                width: 2,
            }
        },

        [EPosition.Down]: {
            startOffset: [0, 8],
            endOffset: [0, -134-62+(56-32)/2],
            lineStyle: {
                color: 0xD66F35,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            startOffset: [0, 8],
            endOffset: [0, 14+(56-32)/2],
            lineStyle: {
                color: 0xD66F35,
                width: 2,
            }
        }
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
        winning_group: {
            pixi: {
                alpha: 1,
                zIndex: 3,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
            new: 'set'
        },
        loseing_group: {
            pixi: {
                alpha: 1,
                zIndex: 3,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
            new: 'set'
        },
        pin_group_claimable: {
            pixi: {
                alpha: 1,
                zIndex: 4,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
        },
        unpin_group_claimable: {
            pixi: {
                alpha: 0,
                zIndex: 1,
            },
            duration: 0.3,
            ease: 'power2.out',
        },
        hide_group_claimable: {
            pixi: {
                alpha: 0,
                zIndex: 1,
            },
            duration: 0.6,
            ease: 'power2.out',
            delay: 5,
            new: 'set'
        },
        pin_group_unclaimable: {
            pixi: {
                alpha: 0.9,
                zIndex: 3,
            },
            duration: 0.3,
            ease: 'power2.out',
            clear: true,
        },
        unpin_group_unclaimable: {
            pixi: {
                alpha: 0,
                zIndex: 0,
            },
            duration: 0.3,
            ease: 'power2.out',
            new: 'set'
        },
        hide_group: {
            pixi: {
                alpha: 0,
                zIndex: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
        },
        hover_claim: {
            pixi: {
                alpha: 1.2,
                scale: 1.1,
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
                scale: 1.2,
            },
            duration: 0.2,
            ease: 'back.out(2)',
            repeat: 1,
            yoyo: true,
            yoyoEase: 'power2.out',
        },
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePari(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!context.features.pariTileNewDesign) return this.clear()
        if (!(pari.position in this.validPariPositions)) return this.clear()

        const state = this.getPariState(pool, pari, context)

        this.updateGroup(pool, pari, context, container, state)

        if (!state.win && !state.nocontest && state.isHistorical) return

        const [group] = this.read('group')
        this.updateLine(pool, pari, context, group, state)

    }

    private updateGroup(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const poolid = pool.poolid
        const pariid = pari.pariid

        const { isHistorical, win, claimable, emptypool, nocontest } = state

        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid)
                    this.clear()
                }
            })

            return
        }

        const [group, groupstate] = this.get('group', () => new Container(), [])
        if (groupstate.new) {
            container.addChild(group)
            group.alpha = 0
        }

        if (isHistorical) {

            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable') this.animate('group', 'hide_group_claimable')
            } else {
                if (groupstate.animation !== 'pin_group_unclaimable') this.animate('group', 'unpin_group_unclaimable')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true
                this.get('claimable', () => state.claimable, [state.claimable])

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'unpin_group_claimable')
                    else this.animate('group', 'unpin_group_unclaimable')
                })

            }

        } else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group')
            } else {
                this.animate('group', 'loseing_group')
            }

        }
    }

    private updateLine(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const position = pari.position
        const { win } = state

        if (!container) return this.clear('line')

        const { height } = context.screen
        const { pricerange } = context.plotdata
        const { openPriceValue, openPriceTimestamp } = pool

        const [ox] = datamath.scale([openPriceTimestamp], context.plotdata.timerange, context.screen.width)
        const [oy] = datamath.scaleReverse([openPriceValue], pricerange, height)

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) container.addChild(line)

        const style = win ? this.winlineStyle : this.nocontestLineStyle

        const [startx, starty] = style[pari.position].startOffset
        const [endx, endy] = style[pari.position].endOffset

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = context.screen.height

        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(ox+startx, oy+starty)
            .lineTo(ox+endx, vertical+endy)

        line.position.y = -container.position.y

    }

}
