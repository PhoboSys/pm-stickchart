import factory from 'debug'

export class Logger {

    private ns
    private debuginfo
    private debugwarn
    private debugerror

    constructor (namespace: string) {
        this.ns = namespace
        this.debuginfo = factory(this.ns + ':info')
        this.debugwarn = factory(this.ns + ':warn')
        this.debugerror = factory(this.ns + ':error')
    }

    public info(...args: any[]) {
        this.debuginfo(...args)
    }

    public error(...args: any[]) {
        this.debugerror(...args)
        console.error(...args) // eslint-disable-line
    }

    public warn(...args: any[]) {
        this.debugwarn(...args)
    }

}

