import dayjs from 'dayjs';

export const getRandomNumber = (max: number, ignore: number[]): number => {
	const rand = Math.floor(Math.random() * max);

	if (ignore.includes(rand)) return getRandomNumber(max, ignore);

	return rand;
}

export const formatTextToDate = (text: string): string => {
	return dayjs(text).format('D.MM.YYYY')
}

export const getMonth = (text: string): number => {
	return dayjs(text).month();
}

export const getYear = (text: string): number => {
	return dayjs(text).month();
}