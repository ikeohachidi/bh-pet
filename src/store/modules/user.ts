import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse, TOKEN } from '../http';
import { RootState } from '..';
import User, { Credential } from '@/types/User';

export type State = {
	user: User;
}

type Context = ActionContext<State, RootState>;

const state: State = {
	user: new User 
} 

const store = {
	namespaced: true,
	state,
	mutations: {
		setUser(state: State, user: User): void {
			state.user = user;
		},
		clearUser(state: State): void {
			state.user = new User();
		}
	},
	actions: {
		fetchUserData(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/user")
					.then(({ data }) => {
						if (data.success) {
							context.commit('setUser', data.data)
							resolve();
						} else {
							localStorage.removeItem(TOKEN)
							reject(data.error);
						}
					})
					.catch((error) => {
						localStorage.removeItem(TOKEN)
						reject(error)
					})
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
				http.post<HTTPResponse<{ token: string }>>("/user/login", credential)
					.then(({ data }) => {
						if (data.success) {
							localStorage.setItem(TOKEN, data.data.token);
							context.dispatch('fetchUserData')
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
							localStorage.removeItem(TOKEN);
							context.commit('clearUser');
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		createUser(context: Context, user: User): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/user/create", user)
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

export const fetchUserData = dispatch(actions.fetchUserData);
export const createUser = dispatch(actions.createUser);
export const editUser = dispatch(actions.editUser);
export const deleteUser = dispatch(actions.deleteUser);
export const getUserOrders = dispatch(actions.getUserOrders);
export const forgotPassword = dispatch(actions.forgotPassword);
export const resetPasswordToken = dispatch(actions.resetPasswordToken);
export const logOut = dispatch(actions.logOut);
export const logIn = dispatch(actions.login);

export default store;