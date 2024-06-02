import * as nodemailer from 'nodemailer';

export default function generateMail(userEmailId,password){
    let fromMail = 'prernapatil060@gmail.com';
            let toMail = userEmailId;
            let subject = 'One Time Password  grocery shopping cart ';
            let text = ` Please update your password  One Time Password is ${password}`

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'prernapatil060@gmail.com',
                    pass: 'Prerna2003@'
                }
            });
            // email options
            let mailOptions = {
                from: fromMail,
                to: toMail,
                subject: subject,
                text: text
            };
            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.log(error);
                }
                console.log(response)
            });
}