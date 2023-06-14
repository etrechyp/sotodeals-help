import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    return user;
};

export default models.User || model('User', UserSchema);