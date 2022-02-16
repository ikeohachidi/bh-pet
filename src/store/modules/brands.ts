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
	state,
	mutations: {
		addBrand(state: State, brand: Brand): void {
			state.brands.push(brand);
		},
		setBrands(state: State, brands: Brand[]): void {
			state.brands = brands;
		},
	},
	actions: {
		listBrands(context: Context, brands: Brand[]): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/brands")
					.then(({ data }) => {
						if (data.success) {
							context.commit('setBrands', brands)
							resolve();
						} else {
							reject(data.error);
						}
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

const { dispatch } = getStoreAccessors<State, RootState>("brands");
const { actions } = store;

export const createBrand = dispatch(actions.createBrand);
export const deleteBrand = dispatch(actions.deleteBrand);
export const editBrand = dispatch(actions.editBrand);
export const getBrand = dispatch(actions.getBrand);
export const listBrands = dispatch(actions.listBrands);

export default store;