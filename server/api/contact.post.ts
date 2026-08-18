import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }
  console.log('DEBUG - CONTACT_EMAIL is:', process.env.CONTACT_EMAIL)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name} (portfolio contact form)`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
    })

    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
  }
})