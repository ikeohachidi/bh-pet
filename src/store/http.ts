import axios from 'axios';

export type HTTPResponse<T> = {
	success: number;
	data: T,
	error: string,
	errors: string[],
	extra: string
}

const TOKEN = 'pet-token';

const http = axios.create({
	baseURL: process.env.VUE_APP_API
})

http.interceptors.request.use((request) => {
	const token = localStorage.getItem(TOKEN);

	if (request.headers && token) {
		request.headers['Authorization'] = `Bearer ${token}`;
	}

	return request;
})

export {
	TOKEN
}

export default http;