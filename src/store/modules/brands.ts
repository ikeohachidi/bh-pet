import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Brand from '@/types/Brand';

export type State = {
	brands: Brand[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	brands: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		getBrands(state: State): Brand[] {
			return state.brands;
		}
	},
	mutations: {
		addBrand(state: State, brand: Brand): void {
			state.brands.push(brand);
		},
		setBrands(state: State, brands: Brand[]): void {
			state.brands = brands;
		},
	},
	actions: {
		fetchBrands(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Brand[]>>("/brands")
					.then(({ data }) => {
						context.commit('setBrands', data.data)
						resolve();
					})
					.catch((error) => reject(error))
			})
		},
		getBrand(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/brand/${uuid}`)
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
		deleteBrand(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>(`/brand/${uuid}`)
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
		editBrand(context: Context, brand: Brand): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>(`/brand/${brand.uuid}`)
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
		createBrand(context: Context, brand: Brand): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/brand/create`, brand)
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

const { dispatch, read } = getStoreAccessors<State, RootState>("brands");
const { actions, getters } = store;

export const getBrands = read(getters.getBrands);

export const createBrand = dispatch(actions.createBrand);
export const deleteBrand = dispatch(actions.deleteBrand);
export const editBrand = dispatch(actions.editBrand);
export const getBrand = dispatch(actions.getBrand);
export const fetchBrands = dispatch(actions.fetchBrands);

export default store;