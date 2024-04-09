import merge from 'lodash/merge'

import config from '@config'

import { Options } from './types'

export * from './types'

const defaultOptions = {
    positioningFlickeringAt: config.limit.positioningFlickering,
    positioningHushedAt: config.limit.positioningHushed,
}

export function createOptions(options?: Options): Options {
    return merge({}, defaultOptions, options)
}
