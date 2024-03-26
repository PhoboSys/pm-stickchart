import { EntityUtils, RenderingContext } from '@rendering'

import { Logger } from '@infra'
import {
    GRADIENT_TEXTURE,
    PARI_GOLD_TEXTURE,
    PARI_SILVER_TEXTURE,
    USDC_GOLD_TEXTURE,
    USDC_SILVER_TEXTURE,
    UNKNOWN_CURRENCY_TEXTURE,
    COIN_SHINE,
} from '@rendering/textures'
import config from '@config'
import datamath from '@lib/datamath'
import { Graphics, Container, AnimatedSprite, BlurFilter } from '@lib/pixi'
import { isEmpty } from '@lib/utils'

import { EPosition } from '@enums'

import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolBackground extends BasePoolsRenderer {

    static readonly POOL_BACKGROUND_ID: symbol = Symbol('POOL_BACKGROUND_ID')

    public get rendererId(): symbol {
        return PoolBackground.POOL_BACKGROUND_ID
    }

    private bgAnimOffset = 0.19

    private borderStyle: any = {
        left: {
            width: 2,
            offset: [0, 0],
            alpha: 0.33,
        },
        right: {
            width: 2,
            offset: [-2, 0],
            alpha: 0.33,
        }
    }

    private backgroundStyle: any = {
        alpha: 0.25,
        hoverAlpha: 0.39,
    }

    private coinStyle: any = {
        scale: 0.44,
        speed: 0.33,
        offsetY: 0.075,
        anchor: [0.5, 0.5],
    }

    private coinShineStyle: any = {
        gold: {
            blur: 20,
            alpha: 0.5,
            radius: 75,
            colorStops: config.style.goldCoinShineColors,
        },
        silver: {
            blur: 20,
            alpha: 0.3,
            radius: 75,
            colorStops: config.style.silverCoinShineColors,
        },
    }

    private coinCurrencyStyle: any = {
        scale: 0.2,
        anchor: [0.5, 0.5],
    }

    private configAnimations: any = {
        hover_bg: {
            duration: 0.5,
            ease: 'power2.out',
            clear: true,
        },
        unhover_bg: {
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
        },
        hover_border: {
            pixi: {
                alpha: 0.5
            },
            duration: 0.5,
            ease: 'power2.out',
            clear: true,
        },
        unhover_border: {
            pixi: {
                alpha: 0.33,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
        },
        show_coin: {
            pixi: {
                alpha: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
        },
        hide_coin: {
            pixi: {
                alpha: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
        }
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const isHistorical = this.isHistoricalPool(pool, context)

        if (!pool.openPriceTimestamp || !pool.openPriceValue || !isHistorical) return this.clear()

        const { width } = context.screen

        const { timerange } = context.plotdata
        const { openPriceTimestamp, endDate } = pool

        const rprice = this.getResolutionPricePoint(pool, context)
        const rdate = rprice?.timestamp || endDate

        const paris = context.paris?.[pool.poolid]
        const resolution = this.getPoolResolution(pool, context)
        const nocontest = resolution === EPosition.NoContest
        const hasWonPari = paris && paris.some(pari => pari.position === resolution && isHistorical && !nocontest && !pari.phantom)
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
        const shouldRenderClaimable = !isEmpty(paris) && hashClaimablePari

        const [ox, rx] = datamath.scale([openPriceTimestamp, rdate], timerange, width)

        this.udateDefaultBackground(context, container, [ox, rx], pool, !shouldRenderClaimable)

        let bgTextureColorStops
        if (hasWonPari) bgTextureColorStops = config.style.poolRoundWinColors
        else if (nocontest) bgTextureColorStops = config.style.poolRoundNoContestColors
        this.udateClaimableBackground(context, container, [ox, rx], pool, bgTextureColorStops, shouldRenderClaimable)

        let borderTextureColorStops
        if (hasWonPari) borderTextureColorStops = config.style.poolRoundWinBorderColors
        else if (nocontest) borderTextureColorStops = config.style.poolRoundNoContestBorderColors
        this.updateClaimableBorder(context, container, [ox, rx], pool, borderTextureColorStops, shouldRenderClaimable)

        this.updateCoinIcon(context, container, [ox, rx], pool, hasWonPari, shouldRenderClaimable)
    }

    private udateDefaultBackground(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        pool: any,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('backgroundContainer')
            this.clear('background')

            return
        }

        const { height, width } = context.screen
        const poolid = pool.poolid

        const [backgroundContainer, backgroundContainerState] = this.get('backgroundContainer', () => new Container())
        if (backgroundContainerState.new) {
            container.addChild(backgroundContainer)
            backgroundContainer.alpha = 0
        }
        if (!backgroundContainerState.subscribed) {
            backgroundContainerState.subscribed = true
            context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('backgroundContainer', 'hover_bg', { pixi: { alpha: 1 } })
            })
            context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('backgroundContainer', 'unhover_bg', { pixi: { alpha: 0.5 } })
            })
        }
        if (backgroundContainerState.animation !== 'hover_bg') this.animate('backgroundContainer', 'unhover_bg', { pixi: { alpha: 0.5 } })

        const shape = [
            x1, 0,
            x2, 0,
            x2, height,
            x1, height,
        ]

        const [background, backgroundState] = this.get('background', () => new Graphics())
        if (backgroundState.new) backgroundContainer.addChild(background)

        background
            .clear()
            .beginTextureFill({ texture: context.textures.get(GRADIENT_TEXTURE, {
                width,
                height,
                points: [0, 0, 0, height],
                colorStops: config.style.poolRoundColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill()
    }

    private updateClaimableBorder(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        pool: any,
        colorStops: any,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('borderLeft')
            this.clear('borderRight')

            return
        }

        const { height } = context.screen
        const poolid = pool.poolid

        const [borderLeft, borderLeftState] = this.get(
            'borderLeft',
            () => this.createBorder(context, height, { ...this.borderStyle.left, colorStops }),
            [height]
        )
        if (borderLeftState.new) container.addChild(borderLeft)
        borderLeft.position.x = x1

        const [borderRight, borderRightState] = this.get(
            'borderRight',
            () => this.createBorder(context, height, { ...this.borderStyle.right, colorStops }),
            [height]
        )
        if (borderRightState.new) container.addChild(borderRight)
        borderRight.position.x = x2

        if (!borderLeftState.subscribed) {
            borderLeftState.subscribed = true
            context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('borderLeft', 'hover_border')
                this.animate('borderRight', 'hover_border')
            })
            context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('borderLeft', 'unhover_border')
                this.animate('borderRight', 'unhover_border')
            })
        }
    }

    private udateClaimableBackground(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        pool: any,
        textureColorStops: any,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('claimableContainer')
            this.clear('topContainer')
            this.clear('topGradient')
            this.clear('bottomContainer')
            this.clear('bottomGradient')

            return
        }

        const [claimableContainer, claimableContainerState] = this.get('claimableContainer', () => new Container())
        if (claimableContainerState.new) container.addChild(claimableContainer)

        const [topContainer, topContainerState] = this.get('topContainer', () => new Container())
        if (topContainerState.new) {
            topContainer.alpha = 0
            claimableContainer.addChild(topContainer)
        }

        const { height, width } = context.screen

        const bgheight = height*(1+this.bgAnimOffset)

        const shape = [
            x1, 0,
            x2, 0,
            x2, bgheight,
            x1, bgheight,
        ]

        const [topGradient, topGradientState] = this.get('topGradient', () => new Graphics())
        if (topGradientState.new) topContainer.addChild(topGradient)

        topGradient
            .clear()
            .beginTextureFill({ texture: context.textures.get(GRADIENT_TEXTURE, {
                width,
                height: bgheight,
                points: [0, 0, 0, bgheight],
                colorStops: textureColorStops,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        const [bottomContainer, bottomContainerState] = this.get('bottomContainer', () => new Container())
        if (bottomContainerState.new) {
            bottomContainer.alpha = 0
            claimableContainer.addChild(bottomContainer)
        }

        const [bottomGradient, bottomGradientState] = this.get('bottomGradient', () => new Graphics())
        if (bottomGradientState.new) bottomContainer.addChild(bottomGradient)

        bottomGradient
            .clear()
            .beginTextureFill({ texture: context.textures.get(GRADIENT_TEXTURE, {
                width,
                height: bgheight,
                points: [0, 0, 0, bgheight],
                colorStops: config.style.poolRoundBottomColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        const poolid = pool.poolid
        if (!claimableContainerState.subscribed) {
            claimableContainerState.subscribed = true
            context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('topContainer', 'hover_bg', { pixi: { y: 0, alpha: this.backgroundStyle.hoverAlpha } })
                this.animate('bottomContainer', 'hover_bg', { pixi: { alpha: this.backgroundStyle.hoverAlpha } })
            })
            context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                if (e.poolid !== poolid) return

                this.rebind(poolid)
                this.animate('topContainer', 'unhover_bg', {
                    pixi: { y: -height*this.bgAnimOffset, alpha: this.backgroundStyle.alpha }
                })
                this.animate('bottomContainer', 'unhover_bg', { pixi: { alpha: this.backgroundStyle.alpha } })
            })
        }

        if (topContainerState.animation !== 'hover_bg') {
            this.animate('topContainer', 'unhover_bg', {
                pixi: { y: -height*this.bgAnimOffset, alpha: this.backgroundStyle.alpha }
            })
        }

        if (bottomContainerState.animation !== 'hover_bg') {
            this.animate('bottomContainer', 'unhover_bg', { pixi: { alpha: this.backgroundStyle.alpha } })
        }
    }

    updateCoinIcon(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        pool: any,
        win: boolean,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('iconContainer')
            this.clear('coinShine')
            this.clear('coin')

            return
        }

        const { height } = context.screen

        const [iconContainer, iconContainerState] = this.get('iconContainer', () => new Container())
        if (iconContainerState.new) {
            iconContainer.alpha = 0
            container.addChild(iconContainer)
        }

        const ox = (x1+x2)/2
        const oy = this.coinStyle.offsetY*height

        const [coinShine, coinShineState] = this.get('coinShine', () => this.createCoinShine(context, win), [win])
        if (coinShineState.new) iconContainer.addChild(coinShine)
        coinShine.position.set(ox, oy)

        const [coin, coinState] = this.get('coin', () => this.createCoin(context, win), [win])
        if (coinState.new) iconContainer.addChild(coin)
        coin.position.set(ox, oy)

        if ((x2-x1) > coin.width+20 && iconContainerState.animation !== 'show_coin') this.animate('iconContainer', 'show_coin')
        else if ((x2-x1) < coin.width+20 && iconContainerState.animation !== 'hide_coin') this.animate('iconContainer', 'hide_coin')

    }

    private createBorder(
        context: RenderingContext,
        height: number,
        style: any,
    ): Container {

        const container = new Container()

        const { offset: [ofx, ofy], width, colorStops, alpha } = style

        const texture = context.textures.get(GRADIENT_TEXTURE, {
            width,
            height,
            points: [0, 0, 0, height],
            colorStops,
        })

        const border = (new Graphics())
            .beginTextureFill({ texture })
            .drawRect(ofx, ofy, width, height)
            .endFill()

        container.alpha = alpha
        container.addChild(border)

        return container

    }

    private createCoin(
        context: RenderingContext,
        win: boolean,
    ): AnimatedSprite {
        const { scale, anchor, speed } = this.coinStyle

        const name = this.getCointAnimationName(context, win)
        const animation = context.textures.animations(name)
        const icon = new AnimatedSprite(animation)

        // animation
        icon.play()
        icon.animationSpeed = speed

        icon.scale.set(scale)
        icon.anchor.set(...anchor)

        return icon
    }

    private createCoinShine(
        context: RenderingContext,
        win: boolean,
    ): Graphics {
        const style = win ? this.coinShineStyle.gold : this.coinShineStyle.silver
        const { radius, blur, alpha, colorStops } = style

        const texture = context.textures.get(COIN_SHINE, { radius, colorStops })

        const shine = (new Graphics())
            .beginTextureFill({ texture, alpha })
            .drawCircle(radius, radius, radius)
        shine.pivot.set(radius, radius)
        shine.filters = [new BlurFilter(blur)]

        return shine
    }

    private getCointAnimationName(context: RenderingContext, win: boolean): symbol {
        const key = `${context.metapool?.currency}_${win ? 'GOLD' : 'SILVER'}`

        switch (key) {
            case 'PARI_SILVER':
                return PARI_SILVER_TEXTURE
            case 'PARI_GOLD':
                return PARI_GOLD_TEXTURE
            case 'USDC_SILVER':
                return USDC_SILVER_TEXTURE
            case 'USDC_GOLD':
                return USDC_GOLD_TEXTURE
            default:
                Logger.error(`currency "${key}" is not supported, fallback to UNKNOWN_CURRENCY_TEXTURE`)

                return UNKNOWN_CURRENCY_TEXTURE
        }
    }

}
