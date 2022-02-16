export default class User {
	address = '';
	avatar = '';
	created_at = '';
	email = '';
	email_verified_at = '';
	first_name = '';
	last_name = '';
	location = '';
	phone_number = '';
	password = '';
	password_confirmation = '';
	is_marketing = false;

	get fullName(): string {
		return `${this.first_name} ${this.last_name}`;
	}
}