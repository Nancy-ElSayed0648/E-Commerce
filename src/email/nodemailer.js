import nodemailer from 'nodemailer'






export const sendEmail =async (options)=>{
    
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "nancyelsayed0648@gmail.com",
        pass: "jedc hvrv gaie ippa",
    }
  });








const info = await transporter.sendMail({
    // from: '"Route"<nancynancy0648@gmail.com>', // sender address
    // to: "nancynancy0648@gmail.com", // list of receivers
    from: '"E-Commerce"<nancyelsayed0648@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    html: options.html, // html body
  });
  console.log("Message sent: %s", info.messageId);
}





export const mailToforgetPassword =async (options)=>{
    
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "nancyelsayed0648@gmail.com",
            pass: "jedc hvrv gaie ippa",
        }
      });
    
    
    
    
    
    
   
    
    const info = await transporter.sendMail({
        
        from: '"E-Commerce"<nancyelsayed0648@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: "Reset Password", // Subject line
        
        html:forgetPassHtmlCode(options.newPassword), // html body
      });
      console.log("Message sent fp: %s", info.messageId);
    }



    
 
    
//    export const sendReminderEmail = async (userEmail) => {
      

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'nancynancy0648@gmail.com',
//           pass: 'jybgmjwahkdrhgpm'
//       },
//     });

//     const info = await transporter.sendMail( {
//         from: 'oute"<nancynancy0648@gmail.com>',
//         to: userEmail,
//         subject: 'Reminder: Confirm Your Email',
//         text: 'Please confirm your email to prevent deletion of your account.',
//       });
//       console.log("Message sent fp: %s", info.messageId);
      
//     };