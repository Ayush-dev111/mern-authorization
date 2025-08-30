import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js';
import transporter from  './nodemailer.js';

export const sendVerificationEmail = async (email, verifyOtp)=>{
   try{
     const mailOptions = {
        from: {
        name: "Mern Auth App",
        address: process.env.SENDER_EMAIL,
      },
        to: email,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verifyOtp),
    };

    const response = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + response.messageId);
   }catch(error){
    console.error("Error sending verification email: ", error);
   };

}

