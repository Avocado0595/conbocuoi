import dotenv from 'dotenv';
dotenv.config();
export default (userId: string) => userId === process.env.ADMIN_ID;