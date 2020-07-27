const nodemailer = require('nodemailer');
const emailServer = 'riothings.system@gmail.com';

const nodemailerTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailServer,
    pass: '92525233jr',
  },
});

const sendEmail = async (email, pass) => {
  try {
    await nodemailerTransporter.sendMail({
      from: emailServer,
      to: email,
      subject: 'CONVITE PARA COLABORAR - RIOT SYSTEM',
      html: `<html>
      <h2>SENHA TEMPORÁRIA</h1>
      <p>
        Use este codigo: ${pass} para acessar sua conta
      </p>
      <p>
        Link para acesso do sistema: 
          <i>http://riot-frontend.herokuapp.com</i>
      </p>
    </html>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendEmail };
