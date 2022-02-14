import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		meta: {
			crumb: 'Homepage'
		},
		component: Home
	},
	{
		path: '/recover',
		name: 'Recover',
		component: () => (/* webpackChunkName: recovery */ import("@/views/Recover.vue"))
	},
	{
		path: '/change-password',
		name: 'ChangePassword',
		component: () => (/* webpackChunkName: recovery */ import("@/views/ChangePassword.vue"))
	},
	{
		path: '/cart',
		name: 'Cart',
		meta: {
			crumb: 'Your Cart'
		},
		component: Cart 
	},
	{
		path: '/checkout',
		name: 'Checkout',
		meta: {
			crumb: 'Your Cart'
		},
		component: Checkout 
	},
	{
		path: '/cateogory',
		name: 'Category',
		component: Category 
	},
	{
		path: '/admin',
		name: 'Admin',
		// component: Admin,
		component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Index.vue")),
		children: [
			{ 
				path: '/',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Dashboard.vue")),
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
