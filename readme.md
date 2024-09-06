# Express Backend Template
Router, Background Tasks, and Data Persistence

### Setup Instructions
1. Clone the repository
```
git clone https://github.com/walker-121g/express-api.git
```
2. Install NPM packages
```
npm ci
```
3. Set environment variables
```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
AUTH_TOKEN=""
```
4. Update database schema[^1]
	- Go to `prisma/schema.prisma` and add your desired database structure.
	- Run `npx prisma db push` to save your changes.
	- Run `npx prisma generate` to generate the Typescript types.
5. Build the project
```
npm run build
```
6. Run the project
```
npm run start
```

### Configuration
- All routes are contained in the `source/routes` directory. Check `source/routes/index.ts` for an example. New routes are automatically picked up and registered.
- All tasks are contained in the `source/tasks` directory. Check `source/tasks/index.ts` for an example. New tasks are automatically picked up and registered.
- Authentication is handled in `source/utils/auth.ts`; you can set the JWT payload structure in this file.
- 3rd-party plugins can be created in the `source/modules` directory, including file storage, mailing, notifications, etc.

[^1]: Database connection handled by [Prisma](https://prisma.io)