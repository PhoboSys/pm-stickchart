import factory from 'debug'

export class Logger {

    private static readonly ns = 'pm:'
    private static readonly debuginfo = factory(Logger.ns + ':info')
    private static readonly debugwarn = factory(Logger.ns + ':warn')
    private static readonly debugerror = factory(Logger.ns + ':error')

    public static info(...args: any[]) {
        Logger.debuginfo(...args)
    }

    public static error(...args: any[]) {
        Logger.debugerror(...args)
        console.error(...args) // eslint-disable-line
    }

    public static warn(...args: any[]) {
        Logger.debugwarn(...args)
    }

}

