import { RenderingContext } from '@rendering'

import { BaseElement } from './BaseElement'

export abstract class BaseComponent extends BaseElement {

    protected abstract update(context: RenderingContext, props: any): any[]
}
