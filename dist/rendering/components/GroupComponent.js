"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupComponent = void 0;
const _rendering_1 = require("../index.js");
const pixi_1 = require("../../lib/pixi");
class GroupComponent extends _rendering_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.configAnimations = {
            winning_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            loseing_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            pin_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unpin_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.3,
                ease: 'power2.out',
            },
            hide_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.6,
                ease: 'power2.out',
                delay: 5,
                new: 'set'
            },
            pin_group_unclaimable: {
                pixi: {
                    alpha: 0.9,
                    zIndex: 3,
                },
                duration: 0.3,
                ease: 'power2.out',
                clear: true,
            },
            unpin_group_unclaimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
                new: 'set'
            },
            hide_group: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
        };
    }
    get animations() {
        return this.configAnimations;
    }
    update(context, props) {
        const { poolid, pariState } = props;
        const { win, isHistorical, nocontest, emptypool, claimable } = pariState;
        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.clear();
                }
            });
            return [];
        }
        const [group, groupstate] = this.get('group', () => new pixi_1.Container(), []);
        if (groupstate.new)
            group.alpha = 0;
        if (isHistorical) {
            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'pin_group_unclaimable')
                    this.animate('group', 'unpin_group_unclaimable');
            }
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                this.get('claimable', () => claimable, [claimable]);
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'pin_group_claimable');
                    else
                        this.animate('group', 'pin_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'unpin_group_claimable');
                    else
                        this.animate('group', 'unpin_group_unclaimable');
                });
            }
        }
        else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('group', 'loseing_group');
            }
        }
        return [group, groupstate];
    }
}
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=GroupComponent.js.map