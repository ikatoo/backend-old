import nodemailer from 'nodemailer';
import { describe, expect, test, vi } from "vitest";
import NodeMailerImplementation from ".";

describe('Mailer:', () => {
  const mailer = new NodeMailerImplementation()

  test('should sucess on send email', async () => {
    const mock = {
      from: 'from@email.com',
      to: 'to@email.com',
      subject: 'subject test',
      message: '<p>message</p>'
    }

    vi.spyOn(nodemailer, 'createTransport').mockReturnValue({
      sendMail: vi.fn().mockResolvedValueOnce({
        response: 'ok',
        envelope: {},
        messageId: 'messageID',
        accepted: 'accepted',
        rejected: '',
        pending: 'pending'
      })
    } as any);

    const { accepted, response } = await mailer.send(mock)

    expect(accepted).toBeTruthy()
    expect(response).toEqual('ok')
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