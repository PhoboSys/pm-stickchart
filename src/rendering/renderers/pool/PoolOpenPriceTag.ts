import config from '../../../config'
import { RenderingContext } from '../..'
import { GraphicUtils } from '../..'

import { PricePoint } from '../../../chartdata'
import datamath from '../../../lib/datamath'
import { Container, Graphics, Text } from '../../../lib/pixi'
import ui from '../../../lib/ui/index'
import { EPosition } from '../../../enums'
import { PoolHoverEvent, PoolUnhoverEvent } from '../../../events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpenPriceTag extends BasePoolsRenderer {

    static readonly POOL_OPEN_PRICE_TAG_ID: symbol = Symbol('POOL_OPEN_PRICE_TAG_ID')

    private textStyle: any = {
        fill: 0xFFFFFF,
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: 13,
    }

    private coverStyle: any = {
        paddingx: 8,
        paddingy: 5,

        paddingRight: 10,

        radius: 30,
        color: 0x22273F,

        lineStyle: {
            color: 0xFFFFFF,
            width: 2,
        }
    }

    private configAnimations: any = {
        fadein: {
            pixi: {
                alpha: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
            clear: true,
        },
        fadeout: {
            pixi: {
                alpha: 0,
            },
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.2,
        }
    }

    public get rendererId(): symbol {
        return PoolOpenPriceTag.POOL_OPEN_PRICE_TAG_ID
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {
        if (!pool.openPriceTimestamp || !pool.openPriceValue) return this.clear()

        const resolution = this.getResolutionPricePoint(pool, context)
        if (!resolution) return this.clear()

        this.updateOpenPriceTag(pool, context, container, resolution)
    }

    private updateOpenPriceTag(
        pool: any,
        context: RenderingContext,
        container: Container,
        resolution: PricePoint,
    ): void {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)
        const [y] = datamath.scaleReverse([pool.openPriceValue], pricerange, height)

        const priceValue = ui.currency(pool.openPriceValue, context.metapool.quote)
        const [cover, coverState] = this.get('cover', () => this.createPriceText(priceValue))
        if (coverState.new) container.addChild(cover)

        const textGraphic = <Text>cover.getChildAt(1)
        textGraphic.text = priceValue

        const { paddingx, paddingy } = this.coverStyle
        const coverGraphic = <Graphics>cover.getChildAt(0)

        const coverWidth = textGraphic.width + paddingx * 2
        const coverHeight = textGraphic.height + paddingy * 2

        coverGraphic.width = coverWidth
        coverGraphic.height = coverHeight

        coverGraphic.position.x = -coverWidth
        textGraphic.position.x = -coverWidth + paddingx

        cover.position.set(x - this.coverStyle.paddingRight, y)

        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid
            if (!coverState.subscribed) {
                coverState.subscribed = true
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('cover', 'fadein')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('cover', 'fadeout')
                })
            }

            if (coverState.new) {
                cover.alpha = 0
            } else if (coverState.animation !== 'fadein') {
                this.animate('cover', 'fadeout')
            }
        }
    }

    private createPriceText(priceValue): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text(priceValue, this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const { radius, color } = this.coverStyle
        const cover = new Graphics()
            .beginFill(color)
            .lineStyle(this.coverStyle.lineStyle)
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        text.position.x = -width + paddingx
        cover.position.x = -width

        text.position.y = -height / 2 + paddingy
        cover.position.y = -height / 2

        const coveredText = new Container()
        coveredText.addChild(cover, text)

        return coveredText
    }

}
