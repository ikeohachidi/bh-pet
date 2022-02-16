import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Credential from '@/models/Credential';
import User from '@/types/User';

export type State = {
	token: string;
	users: User[]
}

type Context = ActionContext<State, RootState>;

const state: State = {
	token: '',
	users: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		users(state: State): User[] {
			return state.users;
		}
	},
	mutations: {
		setToken(state: State, token: string):void {
			state.token = token;
		},
		setUsers(state: State, users: User[]):void {
			state.users = users;
		},
	},
	actions: {
		logIn(context: Context, credential: Credential): Promise<string> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<{ token: string }>>("/admin/login", credential)
					.then(({ data }) => {
						if (data.success) {
							context.commit('setToken', data.data.token);
							localStorage.setItem('pet-token', data.data.token);

							resolve(data.data.token);
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
		getAllUsers(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<User[]>>(`/admin/user-listing`, )
					.then(({ data }) => {
						context.commit('setUsers', data.data)	
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

const { dispatch, read } = getStoreAccessors<State, RootState>("admin");
const { actions, getters } = store;

export const users = read(getters.users);
export const logIn = dispatch(actions.logIn);
export const logOut = dispatch(actions.logOut);
export const getAllUsers = dispatch(actions.getAllUsers);
export const deleteUser = dispatch(actions.deleteUser);

export default store;