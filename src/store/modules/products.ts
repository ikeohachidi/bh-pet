import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Product from '@/types/Product';

export type State = {
	products: Product[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	products: []
} 

const store = {
	state,
	mutations: {
		addProduct(state: State, product: Product): void {
			state.products.push(product);
		},
		setProducts(state: State, products: Product[]): void {
			state.products = products;
		},
	},
	actions: {
		listProducts(context: Context, products: Product[]): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>("/products")
					.then(({ data }) => {
						if (data.success) {
							context.commit('setProducts', products)
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		getProduct(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/products/${uuid}`)
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
		deleteProduct(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>(`/products/${uuid}`)
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
		editProduct(context: Context, product: Product): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>(`/products/${product.uuid}`)
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
		createProduct(context: Context, product: Product): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/products/create`, product)
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

const { dispatch } = getStoreAccessors<State, RootState>("products");
const { actions } = store;

const createProduct = dispatch(actions.createProduct);
const deleteProduct = dispatch(actions.deleteProduct);
const editProduct = dispatch(actions.editProduct);
const getProduct = dispatch(actions.getProduct);
const listProducts = dispatch(actions.listProducts);

export default store;