"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupComponent = void 0;
const _rendering_1 = require("../index.js");
const pixi_1 = require("../../lib/pixi");
class GroupComponent extends _rendering_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.configAnimations = {
            winning_group_primary: {
                pixi: {
                    alpha: 1,
                    zIndex: 5,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            loseing_group_primary: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            winning_group_secondary: {
                pixi: {
                    alpha: 0.25,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
                new: 'set'
            },
            loseing_group_secondary: {
                pixi: {
                    alpha: 0.25,
                    zIndex: 2,
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
                new: 'set'
            },
            pin_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 7,
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
                    zIndex: 6,
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
        const focusroundid = context.focusroundid;
        const { roundid, predictionState } = props;
        const { win, isHistorical, nocontest, emptyround, claimable, } = predictionState;
        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.clear();
                }
            });
            return [];
        }
        this.get('claimable', () => claimable, [claimable]);
        const [group, groupstate] = this.get('group', () => new pixi_1.Container(), []);
        if (groupstate.new)
            group.alpha = 0;
        if (focusroundid) {
            if (roundid === focusroundid) {
                if (claimable)
                    this.animate('group', 'pin_group_claimable');
                else
                    this.animate('group', 'pin_group_unclaimable');
            }
            else if (isHistorical) {
                if (claimable) {
                    if (groupstate.animation !== 'pin_group_claimable') {
                        this.animate('group', 'hide_group_claimable');
                    }
                    else {
                        this.animate('group', 'unpin_group_claimable');
                    }
                }
                else {
                    this.animate('group', 'unpin_group_unclaimable');
                }
            }
            else {
                // NOTE: Highlight the actual round if the focus round is out of the timeframe
                const focusround = context.rounds[focusroundid];
                if ((focusround === null || focusround === void 0 ? void 0 : focusround.endDate) < context.timeframe.since) {
                    if (win && !emptyround)
                        this.animate('group', 'winning_group_primary');
                    else
                        this.animate('group', 'loseing_group_primary');
                }
                else {
                    if (win && !emptyround)
                        this.animate('group', 'winning_group_secondary');
                    else
                        this.animate('group', 'loseing_group_secondary');
                }
            }
        }
        else {
            if (isHistorical) {
                if (claimable) {
                    if (groupstate.animation !== 'pin_group_claimable') {
                        this.animate('group', 'hide_group_claimable');
                    }
                    else {
                        this.animate('group', 'unpin_group_claimable');
                    }
                }
                else {
                    this.animate('group', 'unpin_group_unclaimable');
                }
            }
            else {
                if (win && !emptyround)
                    this.animate('group', 'winning_group_primary');
                else
                    this.animate('group', 'loseing_group_primary');
            }
        }
        return [group, groupstate];
    }
}
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=GroupComponent.js.map