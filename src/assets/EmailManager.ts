
import nodemailer from "nodemailer"

export default class EmailManager {

    private transporter

    constructor() {

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

    }

    public sendEmail(url:string , user:{nome:string,email:string}) {

        const {nome, email} = user

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: ``,
            text: ``
        };

        this.transporter.sendMail(mailOptions)

    }

}