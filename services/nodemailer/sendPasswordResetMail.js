const transporter = require("./transporter");
const sendPasswordResetEmail = (email,userFirstName,token)=>{
    const options = {
        to: `${email}`,
        subject: "Reset Your Password",
        from: 'Backend Class <backendclass@gmail.com>',
        replyTo: 'backendclass@gmail.com',
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <tr>
                    <td style="background-color: #2d3748; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Password Reset Request</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; color: #333333; font-size: 16px;">
                    <p style="margin-bottom: 20px;">Hello,${userFirstName}</p>
                    <p style="margin-bottom: 20px;">We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
                    <p style="text-align: center; margin: 30px 0;">
                        <a href="http://localhost:5173/resetPassword/${token}" style="background-color: #2b6cb0; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block;">Reset Password</a>
                    </p>
                    <p style="margin-bottom: 20px;">If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
                    <p style="margin-bottom: 0;">Thanks,<br><strong>Your Backend Class</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #edf2f7; padding: 20px; text-align: center; font-size: 12px; color: #718096;">
                    <p style="margin: 0;">If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
                    <p style="word-break: break-all; margin: 5px 0 0;">http://localhost:5173/resetPassword/${token}</p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
        `
    };

    transporter.sendMail(options, (err,info)=>{
        if (err) {
            console.log(err.message)
        } else {
            console.log("Email verification sent")
            console.log(info)
        }
    })
}
module.exports = sendPasswordResetEmail