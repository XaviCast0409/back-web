const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const transporter = nodemailer.createTransport({
  service: "gmail", // O tu servicio de correo preferido
  auth: {
    user: "xavier.montero.0409@gmail.com",
    pass: "dble ecxo zfrd quwu",
  },
});

//end point para enviar email con nodemailer
app.post("/send-email", async (req, res) => {
  const { email, name, message, phone } = req.body;

  const mailOptions = {
    from: "",
    to: "xaviermontero.0409.1995@gmail.com",
    subject: "correo de prueba",
    html: `
      <h1>Información de contacto</h1>
      <ul>
        <li>Nombre: ${name}</li>
        <li>Email: ${email}</li>
        <li>Teléfono: ${phone}</li>
        </ul>
        <p>${message}</p>
        `,
  };
  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado con éxito" });
    console.log("Correo enviado con éxito");
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el correo" });
    console.error("Error al enviar el correo:", error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
