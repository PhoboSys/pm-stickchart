import { EntityUtils, RenderingContext } from '@rendering'

import { Logger } from '@infra'
import {
    GRADIENT_TEXTURE,
    DEMO_GOLD_TEXTURE,
    DEMO_SILVER_TEXTURE,
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

import { RoundHoverEvent, RoundUnhoverEvent } from '@events'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundBackground extends BaseRoundsRenderer {

    static readonly ROUND_BACKGROUND_ID: symbol = Symbol('ROUND_BACKGROUND_ID')

    public get rendererId(): symbol {
        return RoundBackground.ROUND_BACKGROUND_ID
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

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const isHistorical = this.isHistoricalRound(round, context)

        if (!round.entryPriceTimestamp || !round.entryPriceValue || !isHistorical) return this.clear()

        const { width } = context.screen

        const { timerange } = context.plotdata
        const { entryPriceTimestamp, endDate } = round

        const rprice = this.getResolutionPricePoint(round, context)
        const rdate = rprice?.timestamp || endDate

        const predictions = context.predictions?.[round.roundid]
        const resolution = this.getRoundResolution(round, context)
        const nocontest = resolution === EPosition.NoContest
        const hasWonPrediction = predictions && predictions.some(prediction =>
            prediction.position === resolution && isHistorical && !nocontest && !prediction.phantom
        )
        const hashClaimablePrediction = predictions && predictions.some(prediction => {
            const phantom = prediction.phantom
            const win = prediction.position === resolution
            const won = win && isHistorical && !nocontest && !phantom
            const reverted = EntityUtils.isEnityReverted(context, prediction.predictionid)
            const propagating = EntityUtils.isEntityPropagating(context, prediction.predictionid)
            const orphan = phantom && reverted || isHistorical && phantom && !propagating
            const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom

            return claimable
        })
        const shouldRenderClaimable = !isEmpty(predictions) && hashClaimablePrediction

        const [ox, rx] = datamath.scale([entryPriceTimestamp, rdate], timerange, width)

        this.udateDefaultBackground(context, container, [ox, rx], round, !shouldRenderClaimable)

        let bgTextureColorStops
        if (hasWonPrediction) bgTextureColorStops = config.style.roundRoundWinColors
        else if (nocontest) bgTextureColorStops = config.style.roundRoundNoContestColors
        this.udateClaimableBackground(context, container, [ox, rx], round, bgTextureColorStops, shouldRenderClaimable)

        let borderTextureColorStops
        if (hasWonPrediction) borderTextureColorStops = config.style.roundRoundWinBorderColors
        else if (nocontest) borderTextureColorStops = config.style.roundRoundNoContestBorderColors
        this.updateClaimableBorder(context, container, [ox, rx], round, borderTextureColorStops, shouldRenderClaimable)

        this.updateCoinIcon(context, container, [ox, rx], round, hasWonPrediction, shouldRenderClaimable)
    }

    private udateDefaultBackground(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        round: any,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('backgroundContainer')
            this.clear('background')

            return
        }

        const { height, width } = context.screen
        const roundid = round.roundid

        const [backgroundContainer, backgroundContainerState] = this.get('backgroundContainer', () => new Container())
        if (backgroundContainerState.new) {
            container.addChild(backgroundContainer)
            backgroundContainer.alpha = 0
        }
        if (!backgroundContainerState.subscribed) {
            backgroundContainerState.subscribed = true
            context.eventTarget.addEventListener('roundhover', (e: RoundHoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
                this.animate('backgroundContainer', 'hover_bg', { pixi: { alpha: 1 } })
            })
            context.eventTarget.addEventListener('roundunhover', (e: RoundUnhoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
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
                colorStops: config.style.roundRoundColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill()
    }

    private updateClaimableBorder(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        round: any,
        colorStops: any,
        shouldRender: boolean,
    ): void {
        if (!shouldRender) {
            this.clear('borderLeft')
            this.clear('borderRight')

            return
        }

        const { height } = context.screen
        const roundid = round.roundid

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
            context.eventTarget.addEventListener('roundhover', (e: RoundHoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
                this.animate('borderLeft', 'hover_border')
                this.animate('borderRight', 'hover_border')
            })
            context.eventTarget.addEventListener('roundunhover', (e: RoundUnhoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
                this.animate('borderLeft', 'unhover_border')
                this.animate('borderRight', 'unhover_border')
            })
        }
    }

    private udateClaimableBackground(
        context: RenderingContext,
        container: Container,
        [x1, x2],
        round: any,
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
                colorStops: config.style.roundRoundBottomColors,
            }) })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        const roundid = round.roundid
        if (!claimableContainerState.subscribed) {
            claimableContainerState.subscribed = true
            context.eventTarget.addEventListener('roundhover', (e: RoundHoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
                this.animate('topContainer', 'hover_bg', { pixi: { y: 0, alpha: this.backgroundStyle.hoverAlpha } })
                this.animate('bottomContainer', 'hover_bg', { pixi: { alpha: this.backgroundStyle.hoverAlpha } })
            })
            context.eventTarget.addEventListener('roundunhover', (e: RoundUnhoverEvent) => {
                if (e.roundid !== roundid) return

                this.rebind(roundid)
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
        round: any,
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
        const key = `${context.game?.currency}_${win ? 'GOLD' : 'SILVER'}`

        switch (key) {
            case 'DEMO_SILVER':
                return DEMO_SILVER_TEXTURE
            case 'DEMO_GOLD':
                return DEMO_GOLD_TEXTURE
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
