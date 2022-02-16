import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';

import http, { HTTPResponse } from '../http';
import { RootState } from '..';
import Promotion from '@/types/Promotion';

export type State = {
	promotions: Promotion[];
	posts: unknown[];
}

type Context = ActionContext<State, RootState>;

const state: State = {
	promotions: [],
	posts: []
} 

const store = {
	namespaced: true,
	state,
	getters: {
		promotions(state: State): Promotion[] {
			return state.promotions;
		},
		posts(state: State): unknown[] {
			return state.posts;
		}
	},
	mutations: {
		setPromotions(state: State, promotions: Promotion[]): void {
			state.promotions = promotions;
		},
		setPosts(state: State, posts: unknown[]): void {
			state.posts = posts;
		},
	},
	actions: {
		fetchPromotions(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<Promotion[]>>("/main/promotions")
					.then(({ data }) => {
						context.commit('setPromotions', data.data)
						resolve();
					})
					.catch((error) => reject(error))
			})
		},
		fetchBlogPosts(context: Context): Promise<void> {
			return new Promise((resolve, reject) => {
				http.get<HTTPResponse<unknown[]>>("/main/blog")
					.then(({ data }) => {
						context.commit('setPosts', data.data)
						resolve();
					})
					.catch((error) => reject(error))
			})
		},
	}
}

const { dispatch, read } = getStoreAccessors<State, RootState>("shop");
const { actions, getters } = store;

export const getPromotions = read(getters.promotions);
export const getPosts = read(getters.posts);

export const fetchPromotions = dispatch(actions.fetchPromotions);
export const fetchBlogPosts  = dispatch(actions.fetchBlogPosts);

export default store;