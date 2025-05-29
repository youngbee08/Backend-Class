const transporter = require("./transporter");
const sendEmailVerification = (email,userFirstName,token)=>{
    const options = {
        to:`${email}`,
        subject:"Verify Your Account",
        from:'Backend Class backendclass@gmail.com',
        replyTo:`backendclass@gmail.com`,
        html:`
          <div style="background: white; padding: .5rem;">
            <h2>Hi,${userFirstName}</h2>
            <p>Welcome to our website,verify your account now</p>
            <a href="${process.env.client_domain}verify/${token}" style="background: blue; color: white; padding: .5rem 1rem; border: none; border-radius: 5px;">
              Verify
            </a>
          </div>
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
module.exports = sendEmailVerification