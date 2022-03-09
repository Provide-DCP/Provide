import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    emailList: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.userDetails ||
  mongoose.model('userDetails', userDetailsSchema);
