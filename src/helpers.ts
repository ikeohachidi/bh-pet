import dayjs from 'dayjs';


export const formatTextToDate = (text: string): string => {
	return dayjs(text).format('D.MM.YYYY')
}