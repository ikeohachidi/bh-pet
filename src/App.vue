<template>
	<v-app>
		<Navbar @show-login="showLogin = true"/>
		<Login :show="showLogin" @close="showLogin = false" @show-signup="displaySignup"/>
		<Signup :show="showSignup" @close="showSignup = false" @show-login="displayLogin"/>

		<v-main>
			<router-view/>
		</v-main>

		<Footer/>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Navbar from '@/components/Navbar/Navbar.vue';
import Login from '@/components/Login/Login.vue';
import Signup from '@/components/Signup/Signup.vue';
import Footer from '@/components/Footer/Footer.vue';

@Component({
	components: {
		Navbar,
		Login,
		Signup,
		Footer
	}
})
export default class App extends Vue {
	private showLogin = false;
	private showSignup = false;
	private showCart = false;

	private displaySignup() {
		this.showLogin = false;
		this.showSignup = true;
	}

	private displayLogin() {
		this.showSignup = false;
		this.showLogin = true;
	}
}
</script>
