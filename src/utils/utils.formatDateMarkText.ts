import moment from 'moment'

export const formatDateMarkText = (date: Date, interval: number): string => {
    // console.log(date)

    const hasSeconds = date.getSeconds() > 0
    const hasMinutes = date.getMinutes() > 0

    const formatLine = 'HH:mm' + (hasSeconds ? ':ss' : '')

    return moment(date).format(formatLine)
}
