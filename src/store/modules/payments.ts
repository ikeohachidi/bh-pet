import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Payment from '@/types/Payment';

export type State = {
	payments: Payment[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	payments: []
} 

const store = {
	state,
	mutations: {
		addPayment(state: State, payment: Payment): void {
			state.payments.push(payment);
		},
		setPayments(state: State, payments: Payment[]): void {
			state.payments = payments;
		},
	},
	actions: {
		listPayments(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Payment[]>>("/payments")
					.then(({ data }) => {
						if (data.success) {
							context.commit('setPayments', data.data)
							resolve();
						} else {
							reject(data.error);
						}
					})
					.catch((error) => reject(error))
			})
		},
		getPayment(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<void>>(`/payment/${uuid}`)
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
		deletePayment(context: Context, uuid: string): Promise<void> {
			return new Promise((resolve, reject) => {
				http.delete<HTTPResponse<void>>(`/payment/${uuid}`)
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
		editPayment(context: Context, payment: Payment): Promise<void> {
			return new Promise((resolve, reject) => {
				http.put<HTTPResponse<void>>(`/payment/${payment.uuid}`)
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
		createPayment(context: Context, payment: Payment): Promise<void> {
			return new Promise((resolve, reject) => {
				http.post<HTTPResponse<void>>(`/products/create`, payment)
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

const { dispatch } = getStoreAccessors<State, RootState>("payments");
const { actions } = store;

export const createPayment = dispatch(actions.createPayment);
export const deletePayment = dispatch(actions.deletePayment);
export const editPayment = dispatch(actions.editPayment);
export const getPayment = dispatch(actions.getPayment);
export const listPayments = dispatch(actions.listPayments);

export default store;