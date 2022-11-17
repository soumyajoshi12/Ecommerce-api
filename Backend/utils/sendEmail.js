const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "robbin3101@gmail.com", // generated ethereal user
      pass: "Mohit@3101", // generated ethereal password
    },
  });

  const mailOptions = {
    from: '"node mail"<robbin3101@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
  console.log("done");
};
