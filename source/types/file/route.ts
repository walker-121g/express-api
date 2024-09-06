import { Request, Response } from "express";

export interface RouteFile {
	method: 'get' | 'post' | 'put' | 'delete';
	path: string;
	handler: (request: Request, response: Response) => Promise<string | number | boolean | undefined | null | void>;
}