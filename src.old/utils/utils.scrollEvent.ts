export class ScrollEvent extends Event {
    constructor(
        public readonly mouseX: number,
        public readonly mouseY: number,
        public readonly dragX: number,
        public readonly dragY: number,
    ) {
        super('scroll')
    }
}
