import { RenderingContext, BaseComponent } from '@rendering'
import { PoolPinEvent, PoolUnpinEvent } from '@events'

import { Container } from '@lib/pixi'

export class GroupComponent extends BaseComponent {

    private configAnimations: any = {
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
    }

    protected get animations(): any {
        return this.configAnimations
    }

    public update(
        context: RenderingContext,
        props,
    ): any[] {

        const { poolid, pariState } = props
        const { win, isHistorical, nocontest, emptypool, claimable } = pariState

        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.clear()
                }
            })

            return []
        }

        const [group, groupstate] = this.get('group', () => new Container(), [])
        if (groupstate.new) group.alpha = 0

        if (isHistorical) {

            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable') this.animate('group', 'hide_group_claimable')
            } else {
                if (groupstate.animation !== 'pin_group_unclaimable') this.animate('group', 'unpin_group_unclaimable')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true
                this.get('claimable', () => claimable, [claimable])

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {

                    if (e.poolid !== poolid) return

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {

                    if (e.poolid !== poolid) return

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'unpin_group_claimable')
                    else this.animate('group', 'unpin_group_unclaimable')
                })

            }

        } else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group')
            } else {
                this.animate('group', 'loseing_group')
            }

        }

        return [group, groupstate]
    }

}
