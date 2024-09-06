export interface TaskFile {
	name: string;
	expression: string;
	handler: (test?: boolean) => Promise<void>;
}