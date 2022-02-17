import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Shop from '../views/Shop.vue'
import ShopIndex from '../views/Index.vue';
import Category from '../views/Category.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{ 
		path: '/',
		redirect: '/shop'
	},
	{
		path: '/shop',
		name: 'Shop',
		component: Shop,
		children: [
			{
				path: '', 
				component: ShopIndex
			},
			{
				path: 'category/:id', 
				component: Category 
			},
			{ 
				path: 'product/:id', 
				component: Product 
			},
		]
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
		component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Index.vue")),
		children: [
			{ 
				path: '/',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Dashboard.vue")),
				meta: {
					title: 'Dashboard'
				}
			},
			{ 
				path: 'login',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Login.vue")),
				meta: {
					title: 'Login',
					showNavigation: false
				}
			},
			{ 
				path: '/shipment',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Shipment.vue")),
				meta: {
					title: 'Shipment Locator'
				}
			},
			{ 
				path: '/customers',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Customers.vue")),
				meta: {
					title: 'Customers'
				}
			},
			{ 
				path: '/products',
				component: () => (/* webpackChunkName: admin */ import("@/views/Admin/Products.vue")),
				meta: {
					title: 'Products'
				}
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
