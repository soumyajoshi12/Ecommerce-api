const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: "harshhrrathore31@gmail.com",
      pass: "uzxrapzjgkupwqco",
    },
  });

  const mailOptions = {
    from: "<harshhrrathore31@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
