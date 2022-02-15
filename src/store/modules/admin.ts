import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Credential from '@/models/Credential';

export type State = {
	token: string;
}

type Context = ActionContext<State, RootState>;

const state: State = {
	token: '' 
} 

const store = {
	state,
	mutations: {
		setToken(state: State, token: string):void {
			state.token = token;
		},
	},
	actions: {
		login(context: Context, credential: Credential): Promise<string> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<{ token: string }>>("/admin/login", credential)
					.then(({ data }) => {
						if (data.success) {
							context.commit('setToken', data.data.token)
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		logOut(context: Context, credential: Credential): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>("/admin/logout", credential)
					.then(({ data }) => {
						if (data.success) {
							context.commit('setToken', '')
							resolve()
						} else {
							reject(data.error)
						}
					})
					.catch((error) => reject(error))
			})
		},
		getAllUsers(): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<unknown[]>>(`/admin/user-delete/user-listing`)
					.then(({ data }) => {
						if (data.success) {
							resolve()
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		deleteUser(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/admin/user-delete/${uuid}`)
					.then(({ data }) => {
						if (data.success) {
							resolve()	
						} else {
							reject(data.error)
						}
					})
					.catch((error) => reject(error))
			})
		}
	}
}

const { dispatch } = getStoreAccessors<State, RootState>("admin");
const { actions } = store;

export const logIn = dispatch(actions.login);
export const logOut = dispatch(actions.logOut);
export const getAllUsers = dispatch(actions.getAllUsers);
export const deleteUser = dispatch(actions.deleteUser);

export default store;