import mongoose from 'mongoose';
import { connectDb } from '../db';

console.log('connect with database...');
connectDb('test', async (connection: mongoose.Connection) => {
    try {
        console.log('deleting database...');
        await connection.dropDatabase();
        console.log('successful delete database');
    } catch (e) {
        console.log(e.message || e);
    }
    process.exit(0);
});
