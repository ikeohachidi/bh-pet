import Vue from 'vue'
import Vuex from 'vuex'

import Admin, { State as AdminState } from './modules/admin';
import User, { State as UserState } from './modules/user';
import Product, { State as ProductState } from './modules/products';
import Payment, { State as PaymentState } from './modules/payments';
import Category, { State as CategoryState } from './modules/categories';
import Brand, { State as BrandState } from './modules/brands';
import Order, { State as OrderState } from './modules/orders';
import Shop, { State as ShopState } from './modules/shop';

export type RootState = {
	admin: AdminState,
	user: UserState,
	products: ProductState,
	payment: PaymentState,
	category: CategoryState,
	brand: BrandState,
	order: OrderState,
	shop: ShopState
}

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		admin: Admin,
		user: User,
		products: Product,
		payments: Payment,
		category: Category,
		brands: Brand,
		orders: Order,
		shop: Shop 
	}
})
