import mongoose from 'mongoose';

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
let database =  process.env.DB_DATABASE;

export const connectDb = (forceEnv?: string, cb ?: Function) => {
    const env = forceEnv || process.env.APP_ENV;
    if (env === 'test') {
        database = `${database}-test`;
    }

    const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;

    mongoose.connect(connectionUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, () => {
        if(cb) {
            cb(mongoose.connection);
        }
    });
};
