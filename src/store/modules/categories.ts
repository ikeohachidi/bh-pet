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
	state,
	mutations: {
		addCategory(state: State, category: Category): void {
			state.categories.push(category);
		},
		setCategories(state: State, categories: Category[]): void {
			state.categories = categories;
		},
	},
	actions: {
		listCategories(context: Context, categories: Category[]): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/categories")
					.then(({ data }) => {
						if (data.success) {
							context.commit('setCategories', categories)
							resolve();
						} else {
							reject(data.error);
						}
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

const { dispatch } = getStoreAccessors<State, RootState>("categories");
const { actions } = store;

export const createCategory = dispatch(actions.createCategory);
export const deleteCategory = dispatch(actions.deleteCategory);
export const editCategory = dispatch(actions.editCategory);
export const getCategory = dispatch(actions.getCategory);
export const listCategories = dispatch(actions.listCategories);

export default store;