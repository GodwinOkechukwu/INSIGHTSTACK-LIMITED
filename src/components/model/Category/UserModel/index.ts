interface AuthToken {
    accessToken: string;
    refreshToken: string;
}

interface UserData {
    email: string;
    userId: string;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    isActive: boolean;
    gender: 'male' | 'female' | 'other'; // Adjust based on actual possible values
    role: string; // Depending on what role values are used, this could be more specific
    authToken: AuthToken;
}