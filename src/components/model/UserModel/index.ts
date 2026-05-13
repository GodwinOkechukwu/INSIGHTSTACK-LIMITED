interface UserType {
	id: number;
	email: string;
	email_verified_at: string;
	roles: string[];
	created_at: string;
	updated_at: string;
}

interface UserData {
	user: UserType;
	token: string;
}

interface ApiResponse {
	data: UserData;
}
