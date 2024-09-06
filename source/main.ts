import express from 'express';
import { readdir } from 'fs/promises';
import { CronJob } from 'cron';
import { config } from 'dotenv';
import { join } from 'path';

import { print } from './utils/logger';

import { RouteFile } from './types/file/route';
import { TaskFile } from './types/file/task';

config();

const main = async () => {
	const ROUTE_PATH = join(__dirname, 'routes');
	const TASK_PATH = join(__dirname, 'tasks');

	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	const loadRoutes = async () => {
		let routes = await readdir(ROUTE_PATH, { withFileTypes: true, recursive: true });
		routes = routes.filter((route) => route.isFile() && (route.name.includes('.js') || route.name.includes('.ts')));
		for (const route of routes) {
			try {
				const routeFile: { default: RouteFile } = await import(join(__dirname, 'routes', route.parentPath || "", route.name));
				app[routeFile.default.method](routeFile.default.path, async (req, res) => {
					print(`Request received at (${routeFile.default.method.toUpperCase()}) ${routeFile.default.path}`, 'info', 'main');
					await routeFile.default.handler(req, res);
				});

				print(`Successfully listening at (${routeFile.default.method.toUpperCase()}) ${routeFile.default.path}`, 'info', 'main');
			} catch (error) {
				print(`Error loading route ${route.name}: ${error}`, 'error', 'main');
			}
		}
	}

	const loadTasks = async () => {
		let tasks = await readdir(TASK_PATH, { withFileTypes: true, recursive: true });
		tasks = tasks.filter((task) => task.isFile() && (task.name.includes('.js') || task.name.includes('.ts')));
		for (const task of tasks) {
			try {
				const taskFile: { default: TaskFile } = await import(join(__dirname, 'tasks', task.parentPath || "", task.name));
				new CronJob(taskFile.default.expression, taskFile.default.handler, null, true, 'America/New_York');

				print(`Successfully loaded task ${taskFile.default.name}`, 'info', 'main');
			} catch (error) {
				print(`Error executing task ${task.name}: ${error}`, 'error', 'main');
			}
		}
	}

	await loadRoutes();
	await loadTasks();

	app.listen(process.env.PORT || 3000, () => {
		print(`Server is running on port ${process.env.PORT || 3000}`, 'info', 'main');
	});
}

main();