import { ITextStyle } from '@pixi/text';
export interface IMarkStyle extends Partial<ITextStyle> {
    verticalBottomPadding: number;
    horizontalRightPadding: number;
    horizontalBottomPadding: number;
    alpha: number;
}
