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
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    default: 'other'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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