import { EntityUtils, GraphicUtils, RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import { isEmpty } from '@lib/utils'

import { EPosition } from '@enums'

import { PoolPinEvent, PoolUnpinEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpen extends BasePoolsRenderer {

    static readonly POOL_OPEN_ID: symbol = Symbol('POOL_OPEN_ID')

    private dashLineStyle: any = {
        width: 1,
        join: 'round',
        cap: 'round',
        gap: 8,
        dash: 6,
        color: 0xFFFFFF,
    }

    public get rendererId(): symbol {
        return PoolOpen.POOL_OPEN_ID
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
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const paris = context.paris?.[pool.poolid]
        if (!this.isActualPool(pool) && isEmpty(paris)) return this.clear()

        this.updateGroup(pool, paris, context, container)
        const [group] = this.read('group')
        this.updateOpenLine(pool, context, group)

    }

    private updateGroup(
        pool: any,
        paris: any,
        context: RenderingContext,
        container,
    ): void {
        const poolid = pool.poolid
        const resolution = this.getPoolResolution(pool, context)
        const hasWinPari = paris && paris.some(pari => pari.position === resolution)
        const isHistorical = this.isHistoricalPool(pool, context)
        const nocontest = resolution === EPosition.NoContest
        const emptypool = this.isNoContestEmptyPool(pool)
        const hashClaimablePari = paris && paris.some(pari => {
            const phantom = pari.phantom
            const win = pari.position === resolution
            const won = win && isHistorical && !nocontest && !phantom
            const reverted = EntityUtils.isEnityReverted(context, pari.pariid)
            const orphan = phantom && reverted
            const claimable = !pari.claimed && (won || nocontest) && !orphan

            return claimable
        })

        if (!hasWinPari && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid)
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

            if (hashClaimablePari) {
                if (groupstate.animation !== 'pin_group_claimable') this.animate('group', 'hide_group_claimable')
            } else {
                if (groupstate.animation !== 'pin_group_unclaimable') this.animate('group', 'unpin_group_unclaimable')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true
                this.get('hashClaimablePari', () => hashClaimablePari, [hashClaimablePari])

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)

                    const [hashClaimablePari] = this.read('hashClaimablePari')
                    if (hashClaimablePari) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)

                    const [hashClaimablePari] = this.read('hashClaimablePari')
                    if (hashClaimablePari) this.animate('group', 'unpin_group_claimable')
                    else this.animate('group', 'unpin_group_unclaimable')
                })

            }

        } else {
            if (hasWinPari && !emptypool) {
                this.animate('group', 'winning_group')
            } else {
                this.animate('group', 'loseing_group')
            }

        }
    }

    private updateOpenLine(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {
        if (!container) return this.clear('line')

        const { width, height } = context.screen
        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)

        const [line, linestate] = this.get('line', () => GraphicUtils.createVerticalDashLine(
            0,
            [0, context.screen.height],
            this.dashLineStyle
        ))

        if (linestate.new) container.addChild(line)

        line.position.x = x
        line.height = height
    }

}
