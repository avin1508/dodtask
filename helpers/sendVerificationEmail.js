

const nodemailer = require('nodemailer');
const { SMTP_ENABLED, SMTP_SERVICE, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM } = process.env;

const sendEmailWithAttachment = async (to, subject, body, attachment) => {
    if (!SMTP_ENABLED || SMTP_ENABLED.toLowerCase() !== 'true') {
        console.log('SMTP is not enabled. Email not sent.');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: SMTP_SERVICE,
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT),
            secure: SMTP_PORT === '465', 
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: SMTP_FROM,
            to: to,
            subject: subject,
            html: body,
            attachments: [
                {
                    filename: 'costing-details.xlsx',
                    content: attachment
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmailWithAttachment };
