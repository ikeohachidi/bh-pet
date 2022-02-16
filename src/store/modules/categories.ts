import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Category from '@/types/Category';

export type State = {
	categories: Category[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	categories: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		getCategories(state: State): Category[] {
			return state.categories;
		}
	},
	mutations: {
		addCategory(state: State, category: Category): void {
			state.categories.push(category);
		},
		setCategories(state: State, categories: Category[]): void {
			state.categories = categories;
		},
	},
	actions: {
		fetchCategories(context: Context): Promise<Category[]> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Category[]>>("/categories")
					.then(({ data }) => {
						context.commit('setCategories', data.data)
						resolve(data.data);
					})
					.catch((error) => reject(error))
			})
		},
		getCategory(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/category/${uuid}`)
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
		deleteCategory(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>(`/category/${uuid}`)
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
		editCategory(context: Context, category: Category): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>(`/category/${category.uuid}`)
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
		createCategory(context: Context, category: Category): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/category/create`, category)
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

const { dispatch, read } = getStoreAccessors<State, RootState>("category");
const { actions, getters } = store;

export const getCategories = read(getters.getCategories);

export const fetchCategories = dispatch(actions.fetchCategories);
export const createCategory = dispatch(actions.createCategory);
export const deleteCategory = dispatch(actions.deleteCategory);
export const editCategory = dispatch(actions.editCategory);
export const getCategory = dispatch(actions.getCategory);

export default store;