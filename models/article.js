import { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
        enum: ['development', 'datalisters', 'marketing', 'business', 'support', 'other'],
        default: 'other'
    },
    author: {
        type: String,
        trim: true,
        default: 'admin'
    },
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default models.Article || model('Article', ArticleSchema);