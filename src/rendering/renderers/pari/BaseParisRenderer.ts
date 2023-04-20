import { RenderingContext } from '@rendering'
import { BasePoolsRenderer } from '@rendering/renderers/pool/BasePoolsRenderer'

import { Container } from '@lib/pixi'
import { isEmpty, forEach } from '@lib/utils'

export abstract class BaseParisRenderer extends BasePoolsRenderer {

    protected prevparis: { [key:string]: string } = {}

    protected newparis: { [key:string]: string } = {}

    protected updatePool(
        pool: any,
        context: RenderingContext,
        layer: Container,
    ): Container {
        const paris = context.paris?.[pool.poolid]
        if (isEmpty(paris)) {
            this.cleanupPari(pool)

            return layer
        }

        this.updateEachPari(pool, paris, context, layer)
        this.cleanupPari(pool)

        return layer
    }

    private updateEachPari(
        pool: any,
        paris: any[],
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(paris, (pari, idx) => {
            this.rebind(pool.poolid, pari.pariid)
            this.updatePari(pool, pari, context, layer, idx)
            this.newparis[pari.pariid] = pari.pariid
        })

    }

    private cleanupPari(pool: any): void {

        forEach(this.prevparis, pariid => {
            if (pariid in this.newparis) return

            this.rebind(pool.poolid, pariid)
            this.clear()
        })

        this.prevparis = this.newparis
        this.newparis = {}
    }

    protected abstract updatePari(pool: any, pari: any, context: RenderingContext, container: Container, index: number): void

}
