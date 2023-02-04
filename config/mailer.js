import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.centronutricionalrodriguez.com",
    port: 465,
    secure: true,
    auth: {
      user: "no-reply",
      pass: "qwerty$1234",
    },
    tls: {
      rejectUnauthorized: false
    }
});

transporter.verify().then( () => {
    console.log("Listo para enviar correos");
})
