import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Credential from '@/models/Credential';

export type State = {
	users: unknown[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	users: []
} 

const store = {
	namespaced: true,
	state,
	actions: {
		getUser(context: Context, credential: Credential): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/user")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		deleteUser(context: Context, credential: Credential): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>("/user")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		getUserOrders(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>("/user/orders")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		editUser(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>("/user/edit")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		login(context: Context, credential: Credential): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/user/login", credential)
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		logOut(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/user/logout")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		createUser(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/user/create")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		forgotPassword(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/user/forgot-password")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		resetPasswordToken(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/user/reset-password-token")
					.then(({ data }) => {
						if (data.success) {
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
	}
}

const { dispatch } = getStoreAccessors<State, RootState>("user");
const { actions } = store;

export const getUser = dispatch(actions.getUser);
export const createUser = dispatch(actions.createUser);
export const editUser = dispatch(actions.editUser);
export const deleteUser = dispatch(actions.deleteUser);
export const getUserOrders = dispatch(actions.getUserOrders);
export const forgotPassword = dispatch(actions.forgotPassword);
export const resetPasswordToken = dispatch(actions.resetPasswordToken);
export const logOut = dispatch(actions.logOut);
export const logIn = dispatch(actions.login);

export default store;