import user from '../models/user.model.js'
import nodemailer from 'nodemailer'

const nameRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


//Registration
export const signup = async (req, res) => {
    const {name, email, password, conformPassword} = req.body
    try {
        if(!name){
            return res.status(400).json({name: "Please enter your name"})
        }else if (!nameRegex.test(name)) {
            return res.status(400).json({ name: "Please enter a valid name" });
        }

        let existingEmail = await user.findOne({email})
        if(!email){
            return res.status(400).json({email: "Please enter your email"})
        }else if(!emailRegex.test(email)){
            return res.status(400).json({ email: "Please enter a valid email" })
        }else if(existingEmail){
            return res.status(400).json({email: "Email already exist please login"})
        }
        
        if(!password){
            return res.status(400).json({password: "Please create password"})
        }else if(!passwordRegex.test(password)){
            return res.status(400).json({password: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number"})
        }

        if(!conformPassword){
            return res.status(400).json({conformPassword: "Please re-enter password"})
        }else if(conformPassword !== password){
            return res.status(400).json({conformPassword: "Password do not match"})
        }

        let newUser = await user.create(req.body)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({error})
    }
}


//Login
export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        let existingUser = await user.findOne({email})
        if(!email){
            return res.status(400).json({email: "Please enter your email"})
        }else if(!emailRegex.test(email)){
            return res.status(400).json({ email: "Please enter a valid email address" })
        }else if(!existingUser){
            return res.status(400).json({email: "Your email not registered"})
        }

        if(!password){
            return res.status(400).json({password: "Please enter your password"})
        }else if(existingUser.password !== password){
            return res.status(400).json({password: "Invalid password please enter valid password"})
        }
        return res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({error})
    }
}

//Forgot Password
export const forgot = async (req, res) => {
    const { email } = req.body;
    let date = new Date()
    // 30 mins ahead time
    // save this time in db
    // email send successfully
    // user clicked on the link 
    // when he tries to submit password then we check the current time 
    // now compare saved db time and current time 
    // if currnet time >> db saved time => error reseting password link is expired 
    // else passsword reset
    try {
        if (!email) {
            return res.status(400).json({ email: "Please enter your email" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ email: "Please enter a valid email address" });
        }

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ email: "Your email is not registered" });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "ajit9888402576@gmail.com",
                pass: "zqwn zhio ackf xqot",
            },
        });

        transporter.verify(function(error, success) {
            if (error) {
                console.error("Transporter verification failed:", error);
            } else {
                console.log("Transporter is ready to send emails");
            }
        });

        async function main() {
            try {
                const info = await transporter.sendMail({
                    from: 'ajit9888402576@gmail.com',
                    to: email,
                    subject: "Password Reset Request",
                    text: "You have requested a password reset.",
                    html: `"<b>You have requested a password reset.</b>" <br /> <a href="http://localhost:3000" target="_blank">click kro mere upr</a> `,
                });
                console.log("Message sent: %s", info.messageId);
                return info;
            } catch (error) {
                throw new Error("Failed to send email");
            }
        }

        await main();
        return res.status(200).json(existingUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};