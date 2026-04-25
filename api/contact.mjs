import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, company, phone, interest, message } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'contact@hatfield.ai',
    from: 'noreply@hatfield.ai',
    replyTo: email,
    subject: `New Inquiry from ${name} - hatfield.ai`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Interest:</strong> ${interest || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err.message);
    res.status(500).json({ error: err.message });
  }
}