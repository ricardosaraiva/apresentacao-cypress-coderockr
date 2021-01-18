import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import bcrypt from 'bcrypt';

const isMail = (mail: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(mail);
};

export type User = {
    name: string,
    email: string,
    password?: string,
};

export type UserDocument = mongoose.Document & User;

export type UserModel = mongoose.Model<UserDocument> & {
    findLoggedUser: (email: string, password: string) => Promise<UserDocument|null>,
};

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [isMail, 'E-mail invalido'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

UserSchema.pre<UserDocument>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.set('toJSON', {
    transform: (doc: Document, user: UserDocument) => {
        delete user.password;
        return user;
    }
});

UserSchema.statics.findLoggedUser = async function(
    email: string,
    password: string
): Promise<UserDocument | null>  {
    const user: UserDocument = await this
        .where('email', email)
        .findOne();

    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!isMatch) {
        return null;
    }

    return user;
};

UserSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
