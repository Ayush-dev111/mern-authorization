import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    verifyOtp: {
        type: String,
    },
    verifyOtpExpires: {
        type: Date
    }
    //resetPasswordToken: String,
    //resetPasswordExpires: Date,
    //verifyOtp: String,
    //verifyOtpExpires: Date
},
{
    timestamps: true,
}

);

const User = mongoose.model('User', userSchema);
export default User;
