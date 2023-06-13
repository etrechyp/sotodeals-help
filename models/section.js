import { Schema, model, models } from 'mongoose';

const SectionSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
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

export default models.Section || model('Section', SectionSchema);