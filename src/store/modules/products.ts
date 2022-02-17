import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Product from '@/types/Product';

export type State = {
	products: Product[];
	cart: string[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	products: [],
	cart: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		cartItems(state: State): string[] {
			return state.cart;
		},
		getProductsByCategoryId(state: State): (uuid: string) => Product[] {
			return (uuid: string) => {
				return state.products.filter(product => product.category_uuid === uuid);
			}
		},
	},
	mutations: {
		addProduct(state: State, product: Product): void {
			state.products.push(product);
		},
		setProducts(state: State, products: Product[]): void {
			state.products = products;
		},
		addProductToCart(state: State, productUUID: string): void {
			state.cart.push(productUUID);
		},
		removeProductFromCart(state: State, productUUID: string): void {
			const index = state.cart.indexOf(productUUID)
			if (index === -1) return;

			state.cart.splice(index, 1);
		},
	},
	actions: {
		fetchProducts(context: Context): Promise<Product[]> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Product[]>>("/products")
					.then(({ data }) => {
						context.commit('setProducts', data.data)
						resolve(data.data);
					})
					.catch((error) => reject(error))
			})
		},
		getProduct(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/product/${uuid}`)
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
				http.delete<HTTPResponse<void>>(`/product/${uuid}`)
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
				http.put<HTTPResponse<void>>(`/product/${product.uuid}`)
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
				http.post<HTTPResponse<void>>(`/product/create`, product)
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

const { dispatch, read, commit } = getStoreAccessors<State, RootState>("products");
const { actions, getters, mutations } = store;

export const getProductsByCategoryId = read(getters.getProductsByCategoryId);
export const cartItems = read(getters.cartItems);

export const addProductToCart = commit(mutations.addProductToCart);
export const removeProductFromCart = commit(mutations.removeProductFromCart);

export const createProduct = dispatch(actions.createProduct);
export const deleteProduct = dispatch(actions.deleteProduct);
export const editProduct = dispatch(actions.editProduct);
export const getProduct = dispatch(actions.getProduct);
export const fetchProducts = dispatch(actions.fetchProducts);

export default store;