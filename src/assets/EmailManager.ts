
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

    public async sendEmail(url:string , user:{nome:string,email:string}) {

        const {nome, email} = user

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Verificação Feito`,
            html: `Bem vindo ${nome} ao FEITO. para finalizar acesse esse link <a href="${url}">verificação</a>`
        };

        this.transporter.sendMail(mailOptions)

    }

}