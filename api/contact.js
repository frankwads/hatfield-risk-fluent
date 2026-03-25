// api/contact.js  (place at root of project, next to package.json)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, company, phone, interest, message } = req.body;

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'frank.wadsworth@hatfield.ai',
    from: 'frank.w.wadsworth@gmail.com',  // must be verified in SendGrid
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
    res.status(500).json({ error: err.message });
  }
}