export class ScrollEvent {
    constructor(
        public readonly mouseX: number,
        public readonly mouseY: number,
        public readonly dragX: number,
        public readonly dragY: number,
    ) { }
}
