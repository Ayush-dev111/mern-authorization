import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateOtp } from '../utils/generateOtp.js';
import { generateJwtToken } from '../utils/jwtToken.js';
import { sendVerificationEmail } from '../nodemailer/email.js';


export const userSignup = async (req, res) => {

    try {

        //getting user details from request body
        const {fullName , email, password}= req.body;

        // checking from missing fields
        if(!fullName || !email || !password){
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        };

        // checking if user already exists
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({
                success: false,
                message: "user already exists",
            });
        };

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // generating verification otp
        const verifyOtp = generateOtp();

        // creating user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            verifyOtp,
            verifyOtpExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })

        //saving in db
        await user.save();

        //generating jwt token
        generateJwtToken(res, user._id);

        // sending verification email
        await sendVerificationEmail(email, verifyOtp);

        //sending response
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data : {
                ...user._doc,
                password: undefined,
                verificationToken: undefined,
                verificationTokenExpires: undefined,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })

    }
};

export const verifyEmail = async (req, res)=>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verifyOtp: code,
            verifyOtpExpires: {$gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid otp",
            });
        }

        user.isVerified = true;
        user.verifyOtp = undefined;
        user.verifyOtpExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "email verified successfully",
        });

    } catch (error) {
        console.log("error in verifyEmail route:", error);
    }

}

export const userLogin = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "all fields are required",
        });
    };

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "invalid credentials",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            success: false,
            message: "invalid credentials",
        });
    };


    generateJwtToken(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
        success: true,
        message: "Login successful",
        data : {
                ...user._doc,
                password: undefined,
                verificationToken: undefined,
                verificationTokenExpires: undefined,
            }
        });

}  

export const userLogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "logout successful",
    });
};