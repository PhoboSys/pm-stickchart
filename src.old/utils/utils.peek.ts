import { ValueRange } from './utils.valueRange'
export class Peek<T> {
    constructor(
        public max: T,
        public min: T,
        private isSmaller: (target: T, value: T) => boolean,
    ) { }

    public changePeek(...values: T[]): void {
        const { isSmaller } = this

        for (const value of values) {
            const { max: from, min: to } = this

            if (!isSmaller(from, value)) {
                this.max = value

                continue
            }

            if (isSmaller(to, value)) {
                this.min = value

                continue
            }
        }
    }
}
