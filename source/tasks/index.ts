import { TaskFile } from "../types/file/task";

const file: TaskFile = {
	name: 'example',
	expression: '* * * * *',
	handler: async () => {
		console.log('Task executed');
	}
}

export default file;