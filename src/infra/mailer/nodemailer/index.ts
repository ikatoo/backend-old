import { IMail, Mail } from "@/repository/IMail";
import { env } from "@/utils/env";
import nodemailer from "nodemailer";

export default class NodeMailerImplementation implements IMail {
  async send(mail: Mail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_SERVER_ADDRESS,
      port: env.SMTP_SERVER_PORT,
      secure: true,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      html: mail.message
    });
  }
}