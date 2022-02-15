import Vue from 'vue'
import Vuex from 'vuex'

import Admin, { State as AdminState } from './modules/admin';

export type RootState = {
	admin: AdminState
}

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		admin: Admin
	}
})
