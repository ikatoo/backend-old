import { IMail, Mail, MailerResult } from "@/repository/IMail";
import { env } from "@/utils/env";
import nodemailer from "nodemailer";

export default class NodeMailerImplementation implements IMail {
  async send(mail: Mail): Promise<MailerResult> {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_SERVER_ADDRESS,
      port: env.SMTP_SERVER_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD
      }
    });

    const { response, ...info } = await transporter.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      html: mail.message
    });

    const accepted = !!info.accepted.length && !info.rejected.length

    return { accepted, response }
  }
}