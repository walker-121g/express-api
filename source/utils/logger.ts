export const print = (
	message: string,
	type: 'info' | 'error' | 'warn' | 'success' = 'info',
	origin?: string
) => {
	console.log(`[${type.toUpperCase()}]${origin ? ` [${origin}]` : ''} ${message}`);
}