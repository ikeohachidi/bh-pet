import axios from 'axios';

export type HTTPResponse<T> = {
	success: number;
	data: T,
	error: string,
	errors: string[],
	extra: string
}

export default axios.create({
	baseURL: 'https://pet-shop.buckhill.com.hr/api/v1',
})