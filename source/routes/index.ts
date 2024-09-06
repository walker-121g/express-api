import { RouteFile } from "../types/file/route";

const file: RouteFile = {
	method: 'get',
	path: '/',
	handler: async (request, response) => {
		response.status(200).send('Status: OK');
		return;
	}
}

export default file;