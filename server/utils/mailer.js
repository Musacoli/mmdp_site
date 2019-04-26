import nodemailer from 'nodemailer';
import token from './tokenGenerator';

const from = '"MMDP" <info@mmdp.com>';

function setup() {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

export function sendConfirmationEmail(data) {
  const transport = setup();
  const userEmail = data.email;

  const generateConfirmationUrl = () =>
    `${process.env.HOST}/confirmation/${token(userEmail)}`;

  const email = {
    from,
    to: userEmail,
    subject: 'Welcome to MMDP',
    text: `
    Welcome to MMDP. We are very happy to have you here. Please activate your account using the link below.
    ${generateConfirmationUrl()}
    `,
    html: `
    <h2 style="display: flex; align-items: center;"><img style="height: 25px; margin-right: .5em" src="http://3.17.158.38/assets/images/common/group-2@2x.png" alt="mmdp logo"> Welcome to MMDP</h2>
   <p>We are very happy to have you here. Please activate your account using the link below.</p>
    ${generateConfirmationUrl()}
    `,
  };
  transport.sendMail(email);
}

export async function sendResetPasswordEmail(data) {
  let transport;
  try {
    transport = await setup();
    const { email, baseUrl } = data;

    const generateConfirmationUrl = () =>
      `${baseUrl}/change-password.html?token=${token(email)}`;

    const confirmationUrl = generateConfirmationUrl();
    const ResetEmail = {
      from,
      to: email,
      subject: 'Reset your Password to MMDP Coordination Matrix',
      text: `
      Please, reset your password using the link below.
      ${confirmationUrl}
      `,
      html: `
      <h2 style="display: flex; align-items: center;"><img style="height: 25px; margin-right: .5em" src="http://3.17.158.38/assets/images/common/group-2@2x.png" alt="mmdp logo"> Welcome to MMDP</h2>
     <p>Please, reset your password using the link below.</p>
      ${confirmationUrl}
      `,
    };
    await transport.sendMail(ResetEmail);
  } catch (err) {
    return false;
  }
}
