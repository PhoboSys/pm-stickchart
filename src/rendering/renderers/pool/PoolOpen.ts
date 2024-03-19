import { EntityUtils, GraphicUtils, RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import { isEmpty } from '@lib/utils'

import { EPosition } from '@enums'

import { GroupComponent } from '@rendering/components/GroupComponent'

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

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const paris = context.paris?.[pool.poolid]
        if (!pool.openPriceTimestamp || !this.isActualPool(pool, context) && isEmpty(paris)) return this.clear()

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
            const propagating = EntityUtils.isEntityPropagating(context, pari.pariid)
            const orphan = phantom && reverted || isHistorical && phantom && !propagating
            const claimable = !pari.claimed && (won || nocontest) && !orphan && !phantom

            return claimable
        })

        const [groupElement] = this.get('groupElement', () => new GroupComponent())
        const state = { win: hasWinPari, isHistorical, nocontest, emptypool, claimable: hashClaimablePari }
        const [group, groupstate] = groupElement.update(context, { poolid: pool.poolid, pariState: state })
        if (group && groupstate.new) container.addChild(group)

        this.updateOpenLine(pool, context, group)

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
        ), [height])

        if (linestate.new) container.addChild(line)

        line.position.x = x
    }

}
