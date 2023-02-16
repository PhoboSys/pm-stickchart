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
    UNKNOWN_DARK_TEXTURE
} from './symbols'
import {
    AUD_TEXTURE,
    CAD_TEXTURE,
    CHF_TEXTURE,
    JPY_TEXTURE,
    ETH_TEXTURE,
    BTC_TEXTURE,
    SOL_TEXTURE,
    MATIC_TEXTURE,
    BNB_TEXTURE,
    USD_TEXTURE
} from './symbols'

import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols'
import { LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE } from './symbols'
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from './symbols'

import { LOCK_ICON_TEXTURE, UP_ICON_TEXTURE, DOWN_ICON_TEXTURE } from './symbols'
import { ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE } from './symbols'

import { GRADIENT_TEXTURE } from './symbols'

import { POOL_CLAIM_TEXTURE } from './symbols'

export class TextureStorage implements ITextureStorage {

    private readonly textures: { [key: string]: RenderTexture } = {}

    private readonly precreate: symbol[] = [
        LOCK_ICON_TEXTURE,
        UP_ICON_TEXTURE,
        DOWN_ICON_TEXTURE,
        ZERO_ICON_TEXTURE,
        ETH_DARK_TEXTURE,
        USDC_DARK_TEXTURE,
        USDT_DARK_TEXTURE,
        UNKNOWN_DARK_TEXTURE,
        AUD_TEXTURE,
        CAD_TEXTURE,
        CHF_TEXTURE,
        JPY_TEXTURE,
        USD_TEXTURE,
        ETH_TEXTURE,
        BTC_TEXTURE,
        SOL_TEXTURE,
        MATIC_TEXTURE,
        BNB_TEXTURE,
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

        const top = '#' + config.style.resolution.upcolor.toString(16).padStart(6, '0')
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

        const top = '#' + config.style.resolution.downcolor.toString(16).padStart(6, '0')
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

        const top = '#' + config.style.linecolor.toString(16).padStart(6, '0')
        const bottom = top + '00' // same color with opacity = 0

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

    private [POOL_ROUND_TEXTURE](): RenderTexture {
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
                colorStops: config.style.poolRoundColors
            },
        )

        return gradient
    }

    // SVGS
    //
    private [LOCK_ICON_TEXTURE](): Texture {
        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

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
			<rect width="100" height="100" rx="50" fill="url(#paint0_linear_1403_836)"/>
			<path d="M69.3491 30.6514C68.4812 29.7829 67.0793 29.7829 66.2114 30.6514L61.0264 35.8399C58.0445 33.5908 54.3282 32.2324 50.3004 32.2324C40.4645 32.2324 32.4979 40.2046 32.4979 50.0473C32.4979 54.0779 33.8554 57.7968 36.1029 60.7808L30.6509 66.2143C29.783 67.0828 29.783 68.4857 30.6509 69.3542C31.096 69.7996 31.6523 70 32.2309 70C32.8095 70 33.3658 69.7773 33.8108 69.3542L39.2184 63.9429C42.267 66.3702 46.1168 67.8399 50.3004 67.8399C60.1363 67.8399 68.1029 59.8678 68.1029 50.0251C68.1029 45.8163 66.6342 41.9638 64.2086 38.9353L69.3491 33.7912C70.217 32.9228 70.217 31.5198 69.3491 30.6514V30.6514ZM36.9485 50.0473C36.9485 42.6764 42.9346 36.6862 50.3004 36.6862C53.1043 36.6862 55.6857 37.5546 57.8442 39.0244L39.2851 57.5964C37.8164 55.4586 36.9485 52.8532 36.9485 50.0473ZM63.6523 50.0473C63.6523 57.4182 57.6662 63.4085 50.3004 63.4085C47.3407 63.4085 44.6036 62.4287 42.3783 60.7808L61.0264 42.1197C62.6732 44.3466 63.6523 47.0633 63.6523 50.0473V50.0473Z" fill="white"/>
			<defs>
				<linearGradient id="paint0_linear_1403_836" x1="1.49012e-06" y1="100" x2="116.569" y2="73.8446" gradientUnits="userSpaceOnUse">
					<stop stop-color="#007397"/>
					<stop offset="1" stop-color="#009797"/>
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

    private [RESOLUTION_COUNTDOWN_TEXTURE](): RenderTexture {
        const { width, height } = this.application.screen

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
                colorStops: config.style.resolutionCountdownColors,
            },
        )

        return gradient
    }

    private [LOCK_COUNTDOWN_TEXTURE](): RenderTexture {
        const { width, height } = this.application.screen

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
                colorStops: config.style.lockCountdownColors,
            },
        )

        return gradient
    }

    private [AUD_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [CAD_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [CHF_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [JPY_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [USD_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [ETH_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [BTC_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [SOL_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [MATIC_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [BNB_TEXTURE](): Texture {
        const svg = `
            <svg width="300" height="300" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 23.2837 23.2837 30 15 30C6.71625 30 0 23.2837 0 15C0 15.0038 15 0.00125 15 0C23.2837 0 30 6.71625 30 15Z" fill="#0052B4"/>
            <path d="M14.9597 15H14.9997V14.96L14.9597 15Z" fill="#F0F0F0"/>
            <path d="M15 7.82723L14.9975 0.000976562C6.715 0.00222656 0 6.71723 0 15.001H7.82625V10.5935L12.2337 15.001H14.96L15 14.961V12.2335L10.5925 7.82723H15Z" fill="#F0F0F0"/>
            <path d="M7.58868 1.95605C5.24014 3.29459 3.29472 5.24001 1.95618 7.58855V14.9998H5.86868V5.8698H14.9999V1.9573H7.58868V1.95605ZM14.9999 13.1548L9.67118 7.82605H7.82618L14.9999 14.9998V13.1548V13.1548Z" fill="#D80027"/>
            <path d="M9.04617 17.6089L9.86992 19.3301L11.7287 18.9001L10.8962 20.6176L12.3912 21.8026L10.5299 22.2226L10.5349 24.1301L9.04617 22.9364L7.55742 24.1301L7.56242 22.2226L5.70117 21.8026L7.19617 20.6176L6.36367 18.9014L8.22242 19.3314L9.04617 17.6101V17.6089Z" fill="#F0F0F0"/>
            <path d="M22.4573 20.8701L22.8686 21.7314L23.7986 21.5164L23.3823 22.3751L24.1298 22.9676L23.1986 23.1776L23.2011 24.1314L22.4573 23.5339L21.7136 24.1314L21.7161 23.1776L20.7848 22.9676L21.5323 22.3751L21.1161 21.5164L22.0461 21.7314L22.4573 20.8701Z" fill="#F0F0F0"/>
            <path d="M18.6285 11.7388L19.0398 12.6L19.9698 12.385L19.5535 13.2438L20.301 13.8363L19.3698 14.0463L19.3723 15L18.6285 14.4038L17.8848 15L17.8873 14.0463L16.9573 13.8363L17.7048 13.2438L17.2885 12.385L18.2185 12.6L18.6298 11.7388H18.6285Z" fill="#F0F0F0"/>
            <path d="M22.4573 6.52148L22.8686 7.38274L23.7986 7.16773L23.3823 8.02648L24.1298 8.61899L23.1986 8.82899L23.2011 9.78274L22.4573 9.18524L21.7136 9.78274L21.7161 8.82899L20.7848 8.61899L21.5323 8.02648L21.1161 7.16773L22.0461 7.38274L22.4573 6.52148Z" fill="#F0F0F0"/>
            <path d="M25.8022 10.4351L26.2134 11.2963L27.1434 11.0813L26.7272 11.9401L27.4747 12.5326L26.5447 12.7426L26.5472 13.6963L25.8034 13.0988L25.0597 13.6963L25.0622 12.7426L24.1322 12.5326L24.8797 11.9401L24.4634 11.0813L25.3922 11.2963L25.8034 10.4351H25.8022ZM23.4109 15.0001L23.7347 15.9963H24.7822L23.9347 16.6126L24.2584 17.6088L23.4109 16.9926L22.5634 17.6088L22.8872 16.6126L22.0397 15.9963H23.0872L23.4109 15.0001Z" fill="#F0F0F0"/>
            <g clipPath="url(#clip0_4069_11935)">
            <path d="M15 30C23.2837 30 30 23.2837 30 15C30 6.71625 23.2837 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2837 6.71625 30 15 30Z" fill="#F3BA2F"/>
            <path d="M11.1158 13.4042L15 9.52L18.8858 13.4058L21.1458 11.1458L15 5L8.85583 11.1442L11.1158 13.4042ZM5 15L7.26 12.7392L9.52 15L7.26 17.26L5 15ZM11.1158 16.5958L15 20.48L18.8858 16.5942L21.1458 18.8542L15 25L8.8525 18.8525L11.1158 16.5958ZM20.48 15.0008L22.74 12.7408L25 15.0008L22.74 17.2608L20.48 15.0008ZM17.2925 14.9992L15 12.7058L12.7058 15L15.0008 17.295L17.2925 14.9992Z" fill="white"/>
            </g>
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="2"/>
            <defs>
            <clipPath id="clip0_4069_11935">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }

    private [ETH_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
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

    private [UNKNOWN_DARK_TEXTURE](): Texture {
        const svg = `
            <svg width="100" height="160" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.99884 9.94937e-05L4.9989 0V0.000198987L9.99736 8.14821L9.99768 8.14835L9.99751 8.14845L9.99768 8.14873L9.99731 8.14857L4.9989 11.0502V11.0503L4.99884 11.0502L4.99878 11.0503V11.0502L0.000368504 8.14857L0 8.14873L0.000171268 8.14845L0 8.14835L0.000319988 8.14821L4.99878 0.000198987V0L4.99884 9.94937e-05ZM4.99878 15.9997V15.9999L4.99884 15.9998L4.9989 15.9999V15.9997L10.0006 9.07898L4.99884 11.9809L0 9.07898L4.99878 15.9997Z" fill="#303550" />
            </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)

        return RenderTexture.from(url)
    }
}
