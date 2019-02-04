import nodemailer from 'nodemailer';
import token from './tokenGenerator';

const from = '"MMPD" <info@mmdp.com>';

function setup() {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
export function sendConfirmationEmail(data) {
  const transport = setup();
  const userEmail = data.email;

  const generateConfirmationUrl = () =>
    `${process.env.HOST}/confirmation/${token(userEmail)}`;

  const email = {
    from,
    to: userEmail,
    subject: 'Welcome to MMPD',
    text: `
    Welcome to MMPD. We are very happy to have you here. Please activate your account using the link below.
    ${generateConfirmationUrl()}
    `,
    html: `
    <h2 style="display: flex; align-items: center;"><img style="height: 25px; margin-right: .5em" src="http://3.17.158.38/assets/images/common/group-2@2x.png" alt="mmdp logo"> Welcome to MMPD</h2>
   <p>We are very happy to have you here. Please activate your account using the link below.</p>
    ${generateConfirmationUrl()}
    `,
  };
  transport.sendMail(email);
}
