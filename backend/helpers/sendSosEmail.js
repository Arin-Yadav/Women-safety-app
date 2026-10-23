import nodemailer from "nodemailer";

export const sendSosEmail = async ({ to, senderName, lat, lng }) => {
  const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Suraksha SOS" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🚨 Emergency SOS Alert - Location Shared",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #dc2626;">🚨 Emergency SOS Alert</h2>

        <p>
          <strong>${senderName}</strong> has triggered an SOS alert.
        </p>

        <p>Please check the location immediately:</p>

        <a 
          href="${mapLink}" 
          target="_blank"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #7e22ce;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
          "
        >
          Open Location on Google Maps
        </a>

        <p style="margin-top: 20px; color: #555;">
          Latitude: ${lat}<br />
          Longitude: ${lng}
        </p>

        <p style="color: #777;">
          This alert was sent from Suraksha Women Safety App.
        </p>
      </div>
    `,
  });
};