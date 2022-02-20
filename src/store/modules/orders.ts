import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Order from '@/types/Order';

export type State = {
	orders: Order[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	orders: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		getOrders(state: State): Order[] {
			return state.orders;
		}
	},
	mutations: {
		addOrder(state: State, order: Order): void {
			state.orders.push(order);
		},
		setOrders(state: State, orders: Order[]): void {
			state.orders = orders;
		},
	},
	actions: {
		fetchOrders(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Order[]>>("/orders")
					.then(({ data }) => {
						context.commit('setOrders', data.data)
						resolve();
					})
					.catch((error) => reject(error))
			})
		},
		fetchUserOrders(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Order[]>>("/user/orders")
					.then(({ data }) => {
						context.commit('setOrders', data.data)
						resolve();
					})
					.catch((error) => reject(error))
			})
		},
		getOrderLocation(): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/orders/shipment-locator`)
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
		getOrderDashboard(): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/orders/dashboard`)
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
		getOrder(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/order/${uuid}`)
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
		deleteOrder(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>(`/order/${uuid}`)
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
		editOrder(context: Context, order: Order): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>(`/order/${order.uuid}`)
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
		createOrder(context: Context, order: Order): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/order/create`, order)
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
		downloadOrderInvoice(context: Context, order: Order): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<Blob>(`/order/${order.uuid}/download`)
					.then(({ data }) => {
						console.log(data)
						// const f = new File([data.data], 'invoice.pdf')
						const file = window.URL.createObjectURL(data);
						window.location.assign(file)
					})
					.catch((error) => reject(error))
			})
		},
	}
}

const { dispatch, read } = getStoreAccessors<State, RootState>("orders");
const { actions, getters } = store;

export const getOrders = read(getters.getOrders);

export const createOrder = dispatch(actions.createOrder);
export const deleteOrder = dispatch(actions.deleteOrder);
export const getOrderDashboard = dispatch(actions.getOrderDashboard);
export const getOrderLocation = dispatch(actions.getOrderLocation);
export const editOrder = dispatch(actions.editOrder);
export const getOrder = dispatch(actions.getOrder);
export const fetchOrders = dispatch(actions.fetchOrders);
export const fetchUserOrders = dispatch(actions.fetchUserOrders);
export const downloadOrderInvoice = dispatch(actions.downloadOrderInvoice );

export default store;