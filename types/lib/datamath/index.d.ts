export default class datamath {
    static min(data: number[]): number;
    static max(data: number[]): number;
    static minmax(data: number[]): [number, number];
    static singlePercent(data: number, [minv, maxv]: [number, number]): number;
    static percent(data: number[], [minv, maxv]: [number, number]): number[];
    static rangeSize([minv, maxv]: [number, number]): number;
    static range(data: number[], minpadd?: number, maxpadd?: number): [number, number];
    static datastep([minv, maxv]: [number, number]): number;
    static steps([minv, maxv]: [number, number], step?: number): number[];
}
