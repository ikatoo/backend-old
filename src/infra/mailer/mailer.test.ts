import { env } from "@/utils/env";
import nodemailer from 'nodemailer';
import { describe, expect, test, vi } from "vitest";
import NodeMailerImplementation from "./nodemailer";

describe('Mailer:', () => {
  const mailer = new NodeMailerImplementation()

  test('should sucess on send email', async () => {
    const {accepted, response} = await mailer.send({
      from: 'from@email.com',
      to: 'to@email.com',
      subject: 'subject test',
      message: '<p>message</p>'
    })

    expect(accepted).toBeTruthy()
    expect(response.startsWith('250 Accepted [STATUS=new MSGID='))
  })

  test('should fail on send mail', async () => {
    nodemailer.createTransport = vi.fn().mockResolvedValue({
      sendMail: vi.fn().mockResolvedValue({})
    })

    await expect(mailer.send({
      from: 'from@email.com',
      to: 'to@email.com',
      subject: 'subject test',
      message: '<p>message</p>'
    })).rejects.toThrowError()
  })
})