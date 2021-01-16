import mongoose from 'mongoose';
import { connectDb } from '../db';

console.log('connect with database...');
connectDb('test', async (connection: mongoose.Connection) => {
    try {
        var [ collection ] = process.argv.slice(2);

        if (!collection) {
            console.log('PARAMETER COLLECTION IS REQUIRED!');
            process.exit(0);
        }

        console.log('deleting collection...');
        await connection.dropCollection(collection);
        console.log('successful delete database');
    } catch (e) {
        console.log(e.message || e);
    }
    process.exit(0);
});
