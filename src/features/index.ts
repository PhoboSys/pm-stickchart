export * from './types'

import { Features } from './types'

import config from '@config'

export function createFeatures(features: Partial<Features>): Features {

    return {
        rectungedPriceLine: features?.rectungedPriceLine ?? config.features.rectungedPriceLine,
        curvedResolutionLines: features?.curvedResolutionLines ?? config.features.curvedResolutionLines,
    }
}
