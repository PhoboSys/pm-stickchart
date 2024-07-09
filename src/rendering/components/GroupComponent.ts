import { RenderingContext, BaseComponent } from '@rendering'

import { Container } from '@lib/pixi'
import { isEmpty } from '@lib/utils'

export class GroupComponent extends BaseComponent {

    private configAnimations: any = {
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
    }

    protected get animations(): any {
        return this.configAnimations
    }

    public update(
        context: RenderingContext,
        props,
    ): any[] {

        const pinnedRoundid = context.focusroundid
        const { roundid, predictionState } = props
        const {
            win,
            isHistorical,
            nocontest,
            emptyround,
            claimable,
        } = predictionState

        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.clear()
                }
            })

            return []
        }

        this.get('claimable', () => claimable, [claimable])

        const [group, groupstate] = this.get('group', () => new Container(), [])
        if (groupstate.new) group.alpha = 0

        if (pinnedRoundid) {

            if (roundid === pinnedRoundid) {

                if (claimable) this.animate('group', 'pin_group_claimable')
                else this.animate('group', 'pin_group_unclaimable')

            } else if (isHistorical) {

                if (claimable) {
                    if (groupstate.animation !== 'pin_group_claimable') {
                        this.animate('group', 'hide_group_claimable')
                    } else {
                        this.animate('group', 'unpin_group_claimable')
                    }
                } else {
                    this.animate('group', 'unpin_group_unclaimable')
                }

            } else {

                if (win && !emptyround) this.animate('group', 'winning_group_secondary')
                else this.animate('group', 'loseing_group_secondary')

            }

        } else {

            if (isHistorical) {

                if (claimable) {
                    if (groupstate.animation !== 'pin_group_claimable') {
                        this.animate('group', 'hide_group_claimable')
                    } else {
                        this.animate('group', 'unpin_group_claimable')
                    }
                } else {
                    this.animate('group', 'unpin_group_unclaimable')
                }

            } else {

                if (this.isPrimaryRound(roundid, context)) {
                    if (win && !emptyround) this.animate('group', 'winning_group_primary')
                    else this.animate('group', 'loseing_group_primary')

                } else {
                    if (win && !emptyround) this.animate('group', 'winning_group_secondary')
                    else this.animate('group', 'loseing_group_secondary')

                }

            }

        }

        return [group, groupstate]
    }

    private isPrimaryRound(roundid, context): boolean {
        const actualRoundid = context.actualRoundid
        const actualPredictions = context.predictions[actualRoundid]

        if (isEmpty(actualPredictions)) {
            return true
        } else {
            if (roundid === actualRoundid) return true
            else return false
        }
    }

}
