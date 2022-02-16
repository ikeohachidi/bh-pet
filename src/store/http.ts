import axios from 'axios';

export type HTTPResponse<T> = {
	success: number;
	data: T,
	error: string,
	errors: string[],
	extra: string
}

const http = axios.create({
	baseURL: 'https://pet-shop.buckhill.com.hr/api/v1',
})

http.interceptors.request.use((request) => {
	const token = localStorage.getItem('pet-token');

	if (request.headers && token) {
		request.headers['Authorization'] = `Bearer ${token}`;
	}

	return request;
})

export default http;