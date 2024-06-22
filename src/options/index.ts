import merge from 'lodash/merge'

import config from '@config'

import { Options } from './types'

export * from './types'

const defaultOptions = {
    entryFlickeringAt: config.limit.entryFlickering,
    entryHushedAt: config.limit.entryHushed,
}

export function createOptions(options?: Options): Options {
    return merge({}, defaultOptions, options)
}
