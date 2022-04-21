import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class PoolRenderer extends BaseRenderer {

    static readonly POOL_ID: symbol = Symbol('POOL_ID')

    private readonly openPoolStyle: any
    private readonly lockPoolStyle: any
    private readonly resolutionPoolStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)

        const basicLineStyle = {
            width: 2,
            alpha: 1,
            join: 'round',
            cap: 'round',
            torusPadding: 5,
        }

        const basicTorusStyle = {
            innerr: 2.5,
            outterr: 5,
        }

        const basicTextNameStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        }

        const basicCoveredTextStyle = {
            radius: 20,
            paddingx: 10,
            paddingy: 5,
            linePadding: 5,
        }

        this.openPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: {
                ...basicLineStyle,
                color: 0xB7BDD7,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xB7BDD7,

            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0x303550,
                },
                linePadding: -5,
                color: 0xB7BDD7,
                anchorx: 1,
                anchory: 0,
            }
        }

        this.lockPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: {
                ...basicLineStyle,
                color: 0x00A573,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0x00A573
            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0xFFFFFF,
                },
                color: 0x00A573,
                anchorx: 0,
                anchory: 0,
            }
        }

        this.resolutionPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: {
                ...basicLineStyle,
                color: 0xF05350,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xF05350
            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0xFFFFFF,
                },
                color: 0xF05350,
                anchorx: 0,
                anchory: 0,
            }
        }
    }

    public get rendererId() {
        return PoolRenderer.POOL_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        if (!context.pool) return new Graphics()

        const {
            lockDate,
            openDate,
            resolutionDate,
        } = context.pool

        const openPool = this.createPool(context, 'Open', openDate, this.openPoolStyle)
        const lockPool = this.createPool(context, 'Lock', lockDate, this.lockPoolStyle)
        const resolutionPool = this.createPool(context, 'Resolution', resolutionDate, this.resolutionPoolStyle)

        const result = new Graphics()
        result.addChild(openPool, lockPool, resolutionPool)
        return result
    }

    private createPool(context: RenderingContext, name: string, poolDate, style): Graphics {
        const {
            xrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], xrange, width)

        const { coveredNameStyle } = style
        const { linePadding: coverpadding } = coveredNameStyle
        const coveredName = GraphicUtils.createCoveredText(
            name,
            [x + coverpadding, paddingTop],
            coveredNameStyle
        )

        const covery = coveredName.y + coveredName.height
        const { torusstyle } = style
        const torus = GraphicUtils.createTorus(
            [x, covery],
            [torusstyle.innerr, torusstyle.outterr],
            torusstyle,
        )

        const torusy = torus.y + torusstyle.outterr
        const { linestyle } = style
        const { torusPadding } = linestyle
        const line = GraphicUtils.createLine( // TODO: dash-line
            [x, torusy + torusPadding],
            [x, height - paddingBottom],
            style.linestyle
        )

        const pool = new Graphics()
        pool.addChild(coveredName, torus, line)
        return pool
    }
}
