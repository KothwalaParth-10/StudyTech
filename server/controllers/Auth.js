//sendotp -->done
//signup  --> done
//Login    --> done
//changePassword  --> done
const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require("../models/Profile")
const jwt = require('jsonwebtoken')
const mailSender = require("../utlis/mailSender")
require('dotenv').config()
const {passwordUpdated} = require("../mail/templates/passwordUpdate")


exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        // console.log("OTP generated: ", otp);

        let result = await OTP.findOne({ otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.find({ otp })
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: 'OTP Sent Successfully',
            otp
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.signUp = async (req, res) => {
    /*
          data Fetch from request body
          1.validatation
          2.password match
          check user existance

          find most recent OTP stored for the user
          validate OTP
          Hash password 
          entry create in DB
          //return res
       */
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body
        //check if koi data empty hoy toh
        console.log(firstname,lastname,email,password,confirmPassword,otp);
        
        
        if (!firstname || !lastname || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword does not match, please try again"
            })
        }


        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
        //otp doocuments ne sort karse createdat filed thi -1 aetle descending order ma and limit(1)aetle first document return karse
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(otp);
        
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not Found"
            })
        } else if (recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
        })

        return res.status(200).json({
            success: true,
            message: "User Regesitered Successfully",
            user
        })



    } catch (error) {
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User Cannot be registered. please try again"
        })
    }
}

exports.login = async (req, res) => {
    //getdatafrom req body
    //validation data
    //user check exist or not
    //generate JWT, after password matching
    //create cookie and send response

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required, please try again'
            })
        }
        const user = await User.findOne({ email }).populate("additionalDetails")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first"
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "Logged in Successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }

    } catch (error) {
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again."
        })
    }
}


exports.changepassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;
          console.log(oldPassword+" "+newPassword);
          
		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};