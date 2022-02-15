import Vue from 'vue'
import Vuex from 'vuex'

import Admin, { State as AdminState } from './modules/admin';
import User, { State as UserState } from './modules/user';
import Product, { State as ProductState } from './modules/products';

export type RootState = {
	admin: AdminState,
	user: UserState,
	products: ProductState
}

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		admin: Admin,
		user: User,
		products: Product
	}
})
