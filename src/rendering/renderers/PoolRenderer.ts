import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class PoolRenderer extends BaseRenderer {

    static readonly POOL_ID: symbol = Symbol('POOL_ID')

    private readonly lineStyle: any
    private readonly textStyle: any
    private readonly textCoverStyle: any
    private readonly pointStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 2,
            color: 0x00A573,
            alpha: 1,
            join: 'round',
            cap: 'round',
            paddingx: 6,
        }

        this.textStyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 13,
        }

        this.textCoverStyle = {
            color: 0x00A573,
            childPadding: 10,
            paddingx: 10,
            paddingy: 5,
            anchorx: 1.5,
            anchory: 0.5,
            radius: 30,
        }

        this.pointStyle = {
            color: 0xFFFFFF,
            radius: 5
        }
    }

    public get rendererId() {
        return PoolRenderer.POOL_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {

        const {
            xdata,
            ydata,

            xrange,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const result = new Graphics()
        return result
    }


}
