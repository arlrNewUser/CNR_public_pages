import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import { transporter } from "./config/mailer.js"

const app = express()

// Set default directory
const __dirname = fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(__dirname, "public")))

// Express json parser
app.use(express.json());

// Env variables
dotenv.config();

// Routes
app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.post("/contact", multer().array(), async (req, res) => {
    const { name, email, cellphone, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({
            msg: "Debe ingresar los siguientes campos: name, email, message"
        })
    }

    try {
        // Send email
        await transporter.sendMail({
            from: '"Página web" <no-reply@centronutricionalrodriguez.com>',
            to: "ventas@centronutricionalrodriguez.com",
            subject: `${subject}`,
            html: `
            <span><strong>Nombre: </strong>${name}</span>
            <br>
            <span><strong>Correo: </strong>${email}</span>
            <br>
            <span><strong>Teléfono: </strong>${cellphone}</span>
            <br>
            <span><strong>Mensaje: </strong>${message}</span>
            `,
        });
    } catch {
        return res.status(400).json({
            msg: "Error al enviar el formulario"
        })
    }

    return res.json({
        msg: "Formulario enviado exitosamente"
    })
})

app.get('*', function(req, res) {
    res.redirect('/');
});


// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
