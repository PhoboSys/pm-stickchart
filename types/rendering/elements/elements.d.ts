import { RenderingContext, BaseElement } from '@rendering';
declare class GroupElement extends BaseElement {
    private configAnimations;
    protected get animations(): any;
    render(context: RenderingContext, poolid: any, win: any, isHistorical: any, nocontest: any, emptypool: any, claimable: any): any[];
}
export default GroupElement;
