import { sign, verify } from 'jsonwebtoken';

export type Token = {
	id: number;
	email: string;
}

export const createToken = (data: Token): string => {
	return sign(
		data, process.env.AUTH_TOKEN!, {
			expiresIn: '7d',
			algorithm: 'HS256',
			issuer: '',
			audience: ''
		}
	);
}

export const verifyToken = (token: string): Token | null => {
	try {
		return verify(token, process.env.AUTH_TOKEN!, {
			algorithms: ['HS256'],
			issuer: '',
			audience: ''
		}) as Token;
	} catch {
		return null;
	}
}