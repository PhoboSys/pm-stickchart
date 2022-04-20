import { Peek } from '../utils/utils.peek'

export class DataManager<T> {
    public valuePeek: Peek<number> | undefined

    constructor(
        public data: T[],
        private valuesDataMapper: ((data: T) => number[]),
    ) {
        this.createValuePeek()
    }

    private createValuePeek(): void {
        const values = this.data.map(this.valuesDataMapper).reduce((acum, el) => [...acum, ...el], [])

        if (values.length < 1) return

        const min = Math.min(...values)
        const max = Math.max(...values)

        const peek = new Peek<number>(
            max,
            min,
            (target, value) => target < value,
        )

        this.valuePeek = peek
    }

    public addNext(data: T): void {
        this.data.push(data)

        this.valuePeek?.changePeek(...this.valuesDataMapper(data))
    }
}
