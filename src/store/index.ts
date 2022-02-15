import Vue from 'vue'
import Vuex from 'vuex'

import Admin, { State as AdminState } from './modules/admin';
import User, { State as UserState } from './modules/user';

export type RootState = {
	admin: AdminState,
	user: UserState
}

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		admin: Admin,
		user: User
	}
})
