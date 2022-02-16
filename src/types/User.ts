export default class User {
	address = '';
	avatar = '';
	created_at = '';
	email = '';
	email_verified_at = '';
	first_name = '';
	last_name = '';
	phone_number = '';

	get fullName() {
		return `${this.first_name} ${this.last_name}`;
	}
}