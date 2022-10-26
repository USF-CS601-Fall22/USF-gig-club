

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "f3ba012d89f667", // generated ethereal user
    pass: "b59a259fb05b68", // generated ethereal password
  },
});


async function sendMail(fromMail, toMail, subject, data){

    let info = await transporter.sendMail({
        from: fromMail, // sender address
        to: toMail, // list of receivers
        subject: subject, // Subject line
        html: data, // html body
      });

}


module.exports = {
    sendMail
}
