/* eslint-disable max-len */
import config from '@config'
import { Logger } from '@infra'

import { Application, RenderTexture, GradientFactory } from '@lib/pixi'
import { Texture, Renderer } from '@lib/pixi'
import { ITextureStorage } from '@rendering/abstraction'

import {
    DOWN_WAGET_TEXTURE,
    UP_WAGET_TEXTURE,
    ETH_DARK_TEXTURE,
    USDT_DARK_TEXTURE,
    USDC_DARK_TEXTURE,
    UNKNOWN_DARK_TEXTURE,
    CHAINLINK_TEXTURE,
    PARI_DARK_TEXTURE,
    WINNING_COUNTDOWN_TEXTURE,
} from './symbols'

import { PRICE_LINE_TEXTURE } from './symbols'
import { LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE } from './symbols'
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from './symbols'

import { UP_ICON_TEXTURE, DOWN_ICON_TEXTURE } from './symbols'
import { ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE } from './symbols'

import { GRADIENT_TEXTURE } from './symbols'

import { POOL_CLAIM_TEXTURE } from './symbols'

export class TextureStorage implements ITextureStorage {

    private readonly textures: { [key: string]: RenderTexture } = {}

    private readonly precreate: symbol[] = [
        UP_ICON_TEXTURE,
        DOWN_ICON_TEXTURE,
        ZERO_ICON_TEXTURE,
        ETH_DARK_TEXTURE,
        USDC_DARK_TEXTURE,
        USDT_DARK_TEXTURE,
        UNKNOWN_DARK_TEXTURE,
        CHAINLINK_TEXTURE,
        PARI_DARK_TEXTURE,
    ]

    constructor(
        private readonly application: Application,
    ) {
        for (const t of this.precreate) this.get(t)
    }

    public get(name: symbol, params?: object): RenderTexture {
        const key = `${name.description}_${JSON.stringify(params)}`

        if (!this.textures[key]) {
            Logger.warn('Create Texture', name)
            if (this[name] instanceof Function) {
                this.textures[key] = this[name](params)
            } else {
                Logger.warn(Symbol.keyFor(name), 'Texture is not supported create empty')
                this.textures[key] = this.EMPTY()
            }
        }

        return this.textures[key]
    }

    private EMPTY(): RenderTexture {
        return RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height,
        })
    }

    private [UP_WAGET_TEXTURE](): RenderTexture {
        const height = this.application.screen.height

        const x0 = 0
        const y0 = 0
        const x1 = 0
        const y1 = height

        const top = '#' + config.style.linearresolution.upcolor.toString(16).padStart(6, '0')
        const bottom = top + '00' // same color with opacity = 0

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({
                width: this.application.renderer.width,
                height: this.application.renderer.height,
            }),
            {
                x0, y0,
                x1, y1,
                colorStops : [
                    { color: top, offset: 0 },
                    { color: bottom, offset: 1 },
                ],
            },
        )

        return gradient

    }

    private [DOWN_WAGET_TEXTURE](): RenderTexture {
        const height = this.application.screen.height

        const x0 = 0
        const y0 = 0
        const x1 = 0
        const y1 = height

        const top = '#' + config.style.linearresolution.downcolor.toString(16).padStart(6, '0')
        const bottom = top + '00' // same color with opacity = 0

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({
                width: this.application.renderer.width,
                height: this.application.renderer.height,
            }),
            {
                x0, y0,
                x1, y1,
                colorStops : [
                    { color: top, offset: 0 },
                    { color: bottom, offset: 1 },
                ],
            },
        )

        return gradient
    }

    private [PRICE_LINE_TEXTURE](): RenderTexture {
        const x0 = 0
        const y0 = 0 + config.padding.top
        const x1 = 0
        const y1 = this.application.screen.height

        const top = '#' + config.style.gradient.color.toString(16).padStart(6, '0')
        const bottom = top.slice(0, 7) + '00' // same color with opacity = 0

        const { renderer } = this.application
        const gradient = GradientFactory.createLinearGradient(
            <Renderer>renderer,
            RenderTexture.create({
                width: renderer.width,
                height: renderer.height,
            }),
            {
                x0, y0,
                x1, y1,
                colorStops : [
                    { color: top, offset: 0 },
                    { color: bottom, offset: 1 },
                ],
            },
        )

        return gradient
    }

    private [POOL_CLAIM_TEXTURE](): RenderTexture {
        const x0 = 0
        const y0 = 0 + config.padding.top
        const x1 = 0
        const y1 = this.application.screen.height

        const { renderer } = this.application
        const gradient = GradientFactory.createLinearGradient(
            <Renderer>renderer,
            RenderTexture.create({
                width: renderer.width,
                height: renderer.height,
            }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.poolClaimaColors
            },
        )

        return gradient
    }

    // SVGS
    //

    private [UP_ICON_TEXTURE](): Texture {
        const svg = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="100" height="100" rx="50" fill="url(#paint0_linear_3734_10563)"/>
			<path d="M37.5125 57.3459L50.6062 44.2522L63.6999 57.3459C65.0161 58.662 67.1421 58.662 68.4582 57.3459C69.7743 56.0298 69.7743 53.9038 68.4582 52.5876L52.9685 37.0979C51.6524 35.7818 49.5263 35.7818 48.2102 37.0979L32.7204 52.5876C31.4043 53.9037 31.4043 56.0298 32.7204 57.3459C34.0366 58.6283 36.1963 58.662 37.5125 57.3459V57.3459Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_3734_10563" x1="1.49012e-06" y1="100" x2="116.569" y2="73.8446" gradientUnits="userSpaceOnUse">
					<stop stop-color="#009797"/>
					<stop offset="1" stop-color="#00A573"/>
				</linearGradient>
			</defs>
		</svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [DOWN_ICON_TEXTURE](): Texture {
        const svg = `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="100" y="100" width="100" height="100" rx="50" transform="rotate(-180 100 100)" fill="url(#paint0_linear_3734_10566)"/>
			<path d="M62.4895 42.6531L49.3957 55.7468L36.302 42.6531C34.9859 41.337 32.8599 41.337 31.5437 42.6531C30.2276 43.9692 30.2276 46.0953 31.5437 47.4114L47.0335 62.9011C48.3496 64.2173 50.4756 64.2173 51.7918 62.9011L67.2815 47.4114C68.5976 46.0953 68.5976 43.9692 67.2815 42.6531C65.9654 41.3707 63.8056 41.337 62.4895 42.6531V42.6531Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_3734_10566" x1="100" y1="200" x2="216.569" y2="173.845" gradientUnits="userSpaceOnUse">
					<stop stop-color="#F05750"/>
					<stop offset="1" stop-color="#F07750"/>
				</linearGradient>
			</defs>
		</svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [ZERO_ICON_TEXTURE](): Texture {
        const svg = `
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="50" fill="url(#paint0_linear_4046_11916)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.405 47.3919C23.9642 47.3919 22.7962 48.5599 22.7962 50.0007C22.7963 51.4413 23.9643 52.6092 25.4049 52.6094L31.0472 52.6093C31.5939 56.6032 33.4024 60.4576 36.4727 63.5279C43.9436 70.9988 56.0564 70.9988 63.5273 63.5279C66.5976 60.4576 68.4061 56.6032 68.9528 52.6093L74.5951 52.6094C76.0357 52.6092 77.2037 51.4413 77.2038 50.0007C77.2038 48.5599 76.0358 47.3919 74.595 47.3919L68.9528 47.3919C68.4061 43.3979 66.5976 39.5437 63.5273 36.4733C56.0564 29.0024 43.9436 29.0024 36.4727 36.4733C33.4024 39.5437 31.5939 43.3979 31.0472 47.3919L25.405 47.3919ZM36.3324 52.6092C36.8354 55.2579 38.1119 57.7886 40.162 59.8386C45.5954 65.272 54.4046 65.272 59.838 59.8386C61.8881 57.7886 63.1646 55.2579 63.6677 52.6094L36.3324 52.6092ZM63.6677 47.3919L36.3324 47.3919C36.8354 44.7433 38.1119 42.2127 40.162 40.1626C45.5954 34.7292 54.4046 34.7292 59.838 40.1626C61.8881 42.2127 63.1646 44.7433 63.6677 47.3919Z" fill="#303550"/>
                <defs>
                <linearGradient id="paint0_linear_4046_11916" x1="1.27458e-06" y1="100" x2="90.6146" y2="89.3081" gradientUnits="userSpaceOnUse">
                <stop stop-color="#B7BDD7"/>
                <stop offset="1" stop-color="#E9EDFF"/>
                </linearGradient>
                </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [UNDEFINED_ICON_TEXTURE](): Texture {
        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    // Gradients

    private [GRADIENT_TEXTURE]({ width, height, points, colorStops }): RenderTexture {
        const [x0, y0, x1, y1] = points

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops
            },
        )

        return gradient
    }

    private [SILVER_LEVEL_TEXTURE]({ width, height }): RenderTexture {
        const x0 = 0
        const y0 = height + height
        const x1 = width
        const y1 = 0 - height

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.levels.silverColors
            },
        )

        return gradient
    }

    private [GOLD_LEVEL_TEXTURE]({ width, height }): RenderTexture {
        const x0 = 0
        const y0 = height + height
        const x1 = width
        const y1 = 0 - height

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.levels.goldColors
            },
        )

        return gradient
    }

    private [ROYAL_LEVEL_TEXTURE]({ width, height }): RenderTexture {
        const x0 = 0
        const y0 = height + height
        const x1 = width
        const y1 = 0 - height

        const gradient = GradientFactory.createLinearGradient(
            <Renderer> this.application.renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.levels.royalColors,
            },
        )

        return gradient
    }

    private [RESOLUTION_COUNTDOWN_TEXTURE]({ width }): RenderTexture {
        const { height } = this.application.screen

        const x0 = 0
        const y0 = 0
        const x1 = width
        const y1 = 0

        const renderer = <Renderer> this.application.renderer
        const gradient = GradientFactory.createLinearGradient(
            renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.resolutionCountdown.colors,
            },
        )

        return gradient
    }

    private [LOCK_COUNTDOWN_TEXTURE]({ width }): RenderTexture {
        const { height } = this.application.screen

        const x0 = 0
        const y0 = 0
        const x1 = width
        const y1 = 0

        const renderer = <Renderer> this.application.renderer
        const gradient = GradientFactory.createLinearGradient(
            renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.lockCountdown.colors,
            },
        )

        return gradient
    }

    private [WINNING_COUNTDOWN_TEXTURE]({ width, height }): RenderTexture {

        const x0 = 0
        const y0 = 0
        const x1 = 0
        const y1 = height

        const renderer = <Renderer> this.application.renderer
        const gradient = GradientFactory.createLinearGradient(
            renderer,
            RenderTexture.create({ width, height }),
            {
                x0, y0,
                x1, y1,
                colorStops: config.style.winningCountdown.colors
            },
        )

        return gradient
    }

    private [ETH_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [USDT_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="80" height="160" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28302 14.1505C3.28302 14.6194 3.28302 15.0594 3.28302 15.4993C3.28302 15.9464 3.33492 15.9965 3.79495 15.9989C4.04029 16.0001 4.28564 16.0007 4.53039 15.9989C4.93262 15.9965 5.00221 15.9246 5.00339 15.5153C5.00398 15.0576 5.00339 14.6005 5.00339 14.1523C5.14788 14.1181 5.25286 14.0939 5.35725 14.068C7.24098 13.602 8.38573 11.8764 8.06607 9.98734C7.89209 8.9576 7.23744 8.28998 6.36281 7.83408C5.67101 7.47314 4.92672 7.21423 4.22253 6.87453C3.73302 6.63862 3.23053 6.39504 2.80767 6.06123C2.22026 5.59767 2.26095 4.78437 2.83539 4.30017C3.33257 3.88084 3.92647 3.78648 4.54926 3.85254C5.32187 3.93451 5.98831 4.27422 6.59518 4.74486C6.84878 4.94125 6.9744 4.91589 7.13069 4.63516C7.33594 4.26773 7.5223 3.8891 7.73934 3.52816C7.88147 3.29166 7.82662 3.12417 7.62905 2.97142C7.5052 2.87528 7.38194 2.77738 7.25396 2.68774C6.58398 2.21769 5.82258 1.98414 5.00221 1.85262C5.00221 1.36252 5.00398 0.883625 5.00162 0.40473C4.99985 0.092741 4.91492 0.0072247 4.5988 0.0030963C4.29507 -0.0010321 3.99075 -0.0010321 3.68643 0.0030963C3.36618 0.0072247 3.28538 0.0874336 3.28302 0.401782C3.28008 0.813442 3.27595 1.22569 3.28479 1.63735C3.28892 1.81664 3.26179 1.92221 3.04712 1.95642C2.81887 1.99358 2.5924 2.07791 2.37949 2.17346C1.22649 2.68951 0.415555 3.50811 0.235085 4.80148C0.0410504 6.19039 0.602513 7.25788 1.78383 7.97681C2.32406 8.3059 2.9156 8.55066 3.48886 8.8249C4.07096 9.10327 4.68019 9.33092 5.23753 9.65117C6.20357 10.2061 6.15698 11.3827 5.17324 11.91C4.75509 12.1341 4.30687 12.2061 3.83564 12.1477C2.92031 12.0344 2.14005 11.6328 1.44589 11.0407C1.16751 10.803 1.08318 10.8148 0.859062 11.1109C0.646155 11.3922 0.436786 11.6764 0.226238 11.9595C-0.0934182 12.3895 -0.0869309 12.4349 0.326499 12.7958C1.16751 13.5295 2.1483 13.9636 3.28126 14.1505H3.28302Z" fill="#303550" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [USDC_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="80" height="160" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28302 14.1505C3.28302 14.6194 3.28302 15.0594 3.28302 15.4993C3.28302 15.9464 3.33492 15.9965 3.79495 15.9989C4.04029 16.0001 4.28564 16.0007 4.53039 15.9989C4.93262 15.9965 5.00221 15.9246 5.00339 15.5153C5.00398 15.0576 5.00339 14.6005 5.00339 14.1523C5.14788 14.1181 5.25286 14.0939 5.35725 14.068C7.24098 13.602 8.38573 11.8764 8.06607 9.98734C7.89209 8.9576 7.23744 8.28998 6.36281 7.83408C5.67101 7.47314 4.92672 7.21423 4.22253 6.87453C3.73302 6.63862 3.23053 6.39504 2.80767 6.06123C2.22026 5.59767 2.26095 4.78437 2.83539 4.30017C3.33257 3.88084 3.92647 3.78648 4.54926 3.85254C5.32187 3.93451 5.98831 4.27422 6.59518 4.74486C6.84878 4.94125 6.9744 4.91589 7.13069 4.63516C7.33594 4.26773 7.5223 3.8891 7.73934 3.52816C7.88147 3.29166 7.82662 3.12417 7.62905 2.97142C7.5052 2.87528 7.38194 2.77738 7.25396 2.68774C6.58398 2.21769 5.82258 1.98414 5.00221 1.85262C5.00221 1.36252 5.00398 0.883625 5.00162 0.40473C4.99985 0.092741 4.91492 0.0072247 4.5988 0.0030963C4.29507 -0.0010321 3.99075 -0.0010321 3.68643 0.0030963C3.36618 0.0072247 3.28538 0.0874336 3.28302 0.401782C3.28008 0.813442 3.27595 1.22569 3.28479 1.63735C3.28892 1.81664 3.26179 1.92221 3.04712 1.95642C2.81887 1.99358 2.5924 2.07791 2.37949 2.17346C1.22649 2.68951 0.415555 3.50811 0.235085 4.80148C0.0410504 6.19039 0.602513 7.25788 1.78383 7.97681C2.32406 8.3059 2.9156 8.55066 3.48886 8.8249C4.07096 9.10327 4.68019 9.33092 5.23753 9.65117C6.20357 10.2061 6.15698 11.3827 5.17324 11.91C4.75509 12.1341 4.30687 12.2061 3.83564 12.1477C2.92031 12.0344 2.14005 11.6328 1.44589 11.0407C1.16751 10.803 1.08318 10.8148 0.859062 11.1109C0.646155 11.3922 0.436786 11.6764 0.226238 11.9595C-0.0934182 12.3895 -0.0869309 12.4349 0.326499 12.7958C1.16751 13.5295 2.1483 13.9636 3.28126 14.1505H3.28302Z" fill="#303550" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [PARI_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M63.2534 0C32.6338 0 6.94371 21.0443 0.260488 49.3065C-1.01928 56.8056 2.34603 66.695 11.9206 67.7261C21.4951 68.7104 25.4292 67.3512 25.6662 62.1955C25.6662 62.0081 25.7136 61.7737 25.761 61.5862C26.3298 52.5873 30.1691 44.1977 36.7101 37.7298C43.8199 30.6994 53.2522 26.8561 63.3008 26.8561C73.3493 26.8561 82.7816 30.7462 89.8914 37.7298C97.0012 44.7602 100.888 54.0871 100.888 64.0234C100.888 73.9597 96.9538 83.2867 89.8914 90.3171C82.7816 97.3475 73.3493 101.191 63.3008 101.191C56.5702 101.191 50.0765 99.4566 44.3887 96.1758C28.6523 86.0989 61.31 86.2863 73.9181 80.662C92.8302 71.3819 87.1897 50.7594 77.236 47.9473C59.3667 42.7448 49.7921 55.9619 45.1471 64.0234C40.502 72.085 34.1032 74.3347 27.7991 76.3501C27.4673 76.4438 27.183 76.5844 26.8986 76.6781C21.1159 78.881 15.1437 81.9275 13.9113 88.208C12.0628 97.5818 14.3853 105.878 23.1067 114.174C34.1506 122.844 48.1332 128 63.3008 128C99.0394 128 128 99.3629 128 64.0234C127.953 28.6371 98.992 0 63.2534 0Z" fill="#303550"/>
            </svg>        
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [UNKNOWN_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [CHAINLINK_TEXTURE](): Texture {
        const svg = `
            <svg width="910" height="240" viewBox="0 0 91 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4881 8.53014L10.4552 5.08508L4.43889 8.55765V15.4754L10.4718 18.915L16.4881 15.4478V8.53014ZM10.4497 0.003163L10.4552 0H10.4442L10.4497 0.003163ZM8.24128 1.27677L10.4497 0.003163L12.6581 1.26577L18.691 4.71085L20.9049 5.97662V8.51913V15.4369V17.9794L18.691 19.2507L12.6747 22.7232L10.4607 24L8.24682 22.7343L2.21391 19.2892L0 18.0234V15.4809V8.56867V6.02615L2.21391 4.74938L8.24128 1.27677ZM56.033 6.38357C55.8958 6.32845 55.7489 6.301 55.601 6.30282C55.3092 6.30984 55.0318 6.43009 54.8281 6.63772C54.6242 6.84542 54.5102 7.12418 54.5103 7.41437C54.5103 7.70732 54.6273 7.98836 54.8357 8.19551C55.0441 8.40275 55.3267 8.51914 55.6214 8.51914C55.916 8.51914 56.1987 8.40275 56.407 8.19551C56.6154 7.98836 56.7324 7.70732 56.7324 7.41437C56.7324 7.26722 56.7031 7.12158 56.6461 6.98587C56.5891 6.85008 56.5055 6.72698 56.4002 6.6236C56.295 6.52015 56.1702 6.43861 56.033 6.38357ZM54.7677 9.92032V17.0811L56.4547 17.0475V9.92032H54.7677ZM38.4805 17.0474H40.1877L40.2216 12.8574C40.2038 12.6528 40.2289 12.4468 40.2954 12.2525C40.3619 12.058 40.4682 11.8795 40.6077 11.7282C40.7471 11.5768 40.9168 11.4559 41.1057 11.3731C41.2947 11.2903 41.4989 11.2475 41.7053 11.2474C41.9134 11.2318 42.1223 11.2632 42.3165 11.339C42.5108 11.4149 42.6853 11.5332 42.8272 11.6853C42.9691 11.8374 43.0746 12.0193 43.1362 12.2175C43.1977 12.4158 43.2134 12.6253 43.1823 12.8304V17.0474H44.8421V12.5408C44.8421 10.9711 43.9885 9.71142 42.2202 9.71142C41.8354 9.69833 41.4526 9.77214 41.1005 9.92733C40.7485 10.0825 40.4365 10.315 40.1877 10.6074V6.45098H38.4805V17.0474ZM27.3279 9.81526C27.0752 10.4695 26.9582 11.1678 26.9838 11.8681C26.9426 12.5742 27.0486 13.281 27.2951 13.9445C27.5416 14.6079 27.9233 15.2135 28.4163 15.7233C28.9093 16.2331 29.5029 16.636 30.1599 16.907C30.8169 17.1779 31.5232 17.3109 32.2344 17.2976C33.3005 17.3495 34.3524 17.0369 35.2152 16.4119C36.0779 15.7868 36.6996 14.8871 36.9767 13.8621L35.3576 13.3366C35.1726 14.008 34.7662 14.5981 34.2035 15.0122C33.6407 15.4264 32.9544 15.6405 32.2546 15.6203C30.4729 15.6203 28.7927 14.4212 28.7927 11.9018C28.7927 9.38235 30.5135 8.13611 32.2344 8.13611C32.9303 8.08825 33.6202 8.29138 34.1778 8.70837C34.7352 9.12536 35.1228 9.72821 35.2695 10.4063L36.9361 9.8472C36.4619 8.02832 34.8901 6.47896 32.2344 6.47896C31.5295 6.4758 30.8314 6.61428 30.1817 6.88617C29.5321 7.15799 28.9444 7.55763 28.454 8.06096C27.9636 8.5643 27.5805 9.161 27.3279 9.81526ZM48.6568 12.9645L50.4928 12.6816C50.9061 12.6276 51.0212 12.4188 51.0212 12.1695C51.0212 11.57 50.6147 11.085 49.6662 11.085C49.4834 11.0694 49.2992 11.0909 49.1249 11.1481C48.9505 11.2055 48.7898 11.2973 48.6523 11.4183C48.5148 11.5393 48.4035 11.6867 48.3251 11.8518C48.2467 12.0168 48.2027 12.196 48.1961 12.3784L46.6379 12.0281C46.7666 10.7953 47.8912 9.69727 49.6527 9.69727C51.8613 9.69727 52.7014 10.9435 52.7014 12.3918V15.9285C52.6975 16.3121 52.7269 16.6952 52.7895 17.0737H51.1974C51.1427 16.7738 51.12 16.4689 51.1296 16.1643C50.8918 16.5267 50.563 16.8212 50.1756 17.0185C49.7882 17.2158 49.3558 17.3091 48.921 17.2893C48.6179 17.314 48.3128 17.2774 48.0244 17.1817C47.7359 17.086 47.4699 16.933 47.2426 16.7321C47.0153 16.5312 46.8312 16.2866 46.7017 16.0131C46.5721 15.7394 46.4997 15.4425 46.4888 15.1404C46.4888 13.8402 47.4305 13.1396 48.6568 12.9645ZM51.0212 14.1096V13.7863L49.1514 14.0625C48.8972 14.0712 48.6562 14.1767 48.4784 14.3573C48.3005 14.538 48.1994 14.7797 48.1961 15.0326C48.1982 15.1631 48.2276 15.2917 48.2823 15.4103C48.337 15.529 48.416 15.6349 48.514 15.7217C48.6121 15.8084 48.7272 15.874 48.852 15.9142C48.977 15.9545 49.1088 15.9685 49.2395 15.9554C49.4861 15.9805 49.7354 15.9493 49.9682 15.8642C50.201 15.7792 50.4113 15.6424 50.583 15.4645C50.7548 15.2866 50.8834 15.0721 50.9594 14.8374C51.0353 14.6026 51.0565 14.3538 51.0212 14.1096ZM60.3705 17.0485H58.6632V9.9214H60.3298V10.8712C60.5461 10.5066 60.8572 10.2065 61.2303 10.0027C61.6034 9.79878 62.0249 9.69855 62.4504 9.71251C64.1983 9.71251 65.0384 10.9722 65.0384 12.5419V17.0485H63.3312V12.8315C63.3312 11.9558 62.9314 11.2485 61.861 11.2485C61.6479 11.2497 61.4375 11.2959 61.2436 11.3837C61.0498 11.4715 60.8768 11.5992 60.736 11.7582C60.5953 11.9172 60.4899 12.1041 60.4269 12.3066C60.3639 12.5089 60.3447 12.7223 60.3705 12.9326V17.0485ZM67.1184 6.45098V17.0474H68.8256V6.45098H67.1184ZM71.8742 6.30273C72.1707 6.30273 72.455 6.41984 72.6646 6.62833C72.8745 6.83674 72.992 7.11944 72.992 7.41428C72.9905 7.63216 72.9242 7.84484 72.802 8.02549C72.6794 8.20615 72.5058 8.34667 72.3031 8.42947C72.1003 8.51227 71.8775 8.53356 71.6625 8.49074C71.4477 8.44785 71.2503 8.34281 71.0953 8.18865C70.9404 8.03456 70.8347 7.83837 70.7916 7.62467C70.7485 7.41097 70.77 7.18947 70.8532 6.98783C70.9364 6.78628 71.0778 6.61366 71.2595 6.49175C71.4412 6.36984 71.655 6.30407 71.8742 6.30273ZM71.0341 17.081V9.92024H72.7278V17.0474L71.0341 17.081ZM74.9368 17.0483H76.644V12.9323C76.6172 12.7223 76.6354 12.5092 76.6977 12.3068C76.76 12.1043 76.8641 11.9174 77.0044 11.7583C77.1448 11.599 77.3175 11.4713 77.5115 11.3834C77.7047 11.2954 77.9152 11.2494 78.1273 11.2482C78.3355 11.2327 78.5445 11.2641 78.7384 11.3398C78.9332 11.4157 79.1075 11.5341 79.2494 11.6861C79.3914 11.8382 79.497 12.0201 79.5585 12.2184C79.6201 12.4166 79.6358 12.6261 79.6043 12.8312V17.0483H81.3115V12.5416C81.3115 10.972 80.4717 9.71226 78.7172 9.71226C78.2921 9.6998 77.871 9.80058 77.498 10.0043C77.1251 10.2081 76.8136 10.5073 76.5967 10.871V9.92115H74.9368V17.0483ZM87.1514 12.9315L90.1598 17.0474H88.0661L85.9591 14.1103L85.0783 15.0332V17.0541H83.3845V6.45098H85.0783V12.8034L87.8296 9.92031H90.099L87.1514 12.9315Z" fill="#007397" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

}
