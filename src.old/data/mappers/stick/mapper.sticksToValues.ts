import { IStick } from '../../../../types/interfaces/interface.stick'

export const sticksToValuesDataMapper = (stick: IStick): number[] => {
    return [stick.high, stick.low]
}
