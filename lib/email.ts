import nodemailer from 'nodemailer';

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface ApplicationData {
  fullName: string;
  phone: string;
  email: string;
  nin: string;
  loanAmount: number;
  totalLoan: number;
  loanDuration: string;
  placeOfWork: string;
  guarantorName: string;
  guarantorEmail: string;
  guarantorPhone: string;
  applicationId: string;
  agreementDate: string;
}

export async function sendAdminNotification(data: ApplicationData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'support@henryteeloans.com';

  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f0; margin: 0; padding: 40px 20px; color: #013220;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #006633; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Loan Agreement</h1>
          <p style="color: #d1d5db; margin: 10px 0 0 0; font-size: 14px;">Application ID: ${data.applicationId}</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; color: #006633; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">Borrower Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 40%;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.fullName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">NIN</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.nin}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Workplace</td><td style="padding: 8px 0; font-weight: 600;">${data.placeOfWork}</td></tr>
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; color: #006633; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Loan Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 40%;">Loan Amount</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #006633;">₦${data.loanAmount.toLocaleString()}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Total Repayable</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #c5a059;">₦${data.totalLoan.toLocaleString()}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Duration</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${data.loanDuration}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Agreement Date</td><td style="padding: 8px 0; font-weight: 600;">${data.agreementDate}</td></tr>
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 18px; color: #006633; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Guarantor</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 40%;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.guarantorName}</td></tr>
            </table>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="display: inline-block; background-color: #006633; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Review Agreement</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">Automated Alert from Henrytee Loans Internal System.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `[NEW LOAN] ${data.fullName} - ₦${data.loanAmount.toLocaleString()}`,
      html: emailContent,
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
}

export async function sendApplicantConfirmation(data: ApplicationData) {
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f0; margin: 0; padding: 40px 20px; color: #013220;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #006633; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Agreement Received</h1>
          <p style="color: #d1d5db; margin: 15px 0 0 0; font-size: 16px;">Thank you for choosing Henrytee Loans.</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear ${data.fullName},</p>
          <p style="font-size: 16px; line-height: 1.6;">Your loan agreement has been successfully submitted and is currently under review by our underwriting team.</p>
          
          <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
            <p style="margin: 0; font-size: 15px; color: #065f46;">
              <strong>What's Next?</strong> We will review your documents and contact you within <strong>24 hours</strong> to finalize the disbursement.
            </p>
          </div>

          <h3 style="font-size: 18px; color: #006633; margin: 30px 0 15px 0;">Summary of Agreement</h3>
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 45%;">Application ID</td><td style="padding: 8px 0; font-weight: 700; font-family: monospace;">${data.applicationId}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Loan Amount</td><td style="padding: 8px 0; font-weight: 700; color: #006633;">₦${data.loanAmount.toLocaleString()}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Duration</td><td style="padding: 8px 0; font-weight: 600;">${data.loanDuration}</td></tr>
            </table>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
            <strong>Important:</strong> Please inform your guarantor, <strong>${data.guarantorName}</strong>, to check their email (${data.guarantorEmail}) and "do the needful" by contacting us on our official lines to confirm their acceptance. Your application cannot be finalized until this step is completed.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">If we require any further clarification, a dedicated loan officer will reach out to you directly.</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 40px; margin-bottom: 0;">Best regards,</p>
          <p style="font-size: 16px; font-weight: 700; color: #006633; margin-top: 5px;">The Henrytee Loans Team</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #013220; padding: 30px; text-align: center;">
          <p style="margin: 0; color: #9ca3af; font-size: 13px;">
            Henrytee Loans - Fast & Reliable Financing<br>
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Note: Recipient email should be taken from data.email, but for now we'll assume it's passed or available.
  // I need to make sure the email is available in data.
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Loan Agreement Received - Henrytee Loans',
      html: emailContent,
    });
  } catch (error) {
    console.error('Error sending applicant confirmation:', error);
    throw error;
  }
}

export async function sendGuarantorNotification(data: ApplicationData) {
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f0; margin: 0; padding: 40px 20px; color: #013220;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #006633; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Guarantor Request</h1>
          <p style="color: #d1d5db; margin: 15px 0 0 0; font-size: 16px;">Action Required for Loan Approval</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear ${data.guarantorName},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>${data.fullName}</strong> has listed you as a guarantor for a personal loan of <strong>₦${data.loanAmount.toLocaleString()}</strong> with Henrytee Loans.
          </p>
          
          <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 0 8px 8px 0; margin: 30px 0;">
            <p style="margin: 0; font-size: 15px; color: #92400e;">
              <strong>What does this mean?</strong> As a guarantor, you are confirming the character of the applicant and agree to be contacted in the event of any repayment issues as stipulated in the loan agreement.
            </p>
          </div>

          <h3 style="font-size: 18px; color: #006633; margin: 30px 0 15px 0;">Next Steps</h3>
          <p style="font-size: 16px; line-height: 1.6;">If you accept to be the guarantor for this loan, please contact us immediately on our official lines to confirm your acceptance:</p>
          
          <div style="margin: 25px 0; text-align: center;">
            <p style="font-size: 18px; font-weight: 700; color: #006633; margin: 10px 0;">
              📞 08034783848
            </p>
            <p style="font-size: 18px; font-weight: 700; color: #006633; margin: 10px 0;">
              📞 07025251073
            </p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">If you did not authorize this request or have any concerns, please contact us immediately.</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 40px; margin-bottom: 0;">Best regards,</p>
          <p style="font-size: 16px; font-weight: 700; color: #006633; margin-top: 5px;">The Henrytee Loans Team</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #013220; padding: 30px; text-align: center;">
          <p style="margin: 0; color: #9ca3af; font-size: 13px;">
            Henrytee Loans - Fast & Reliable Financing<br>
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.guarantorEmail,
      subject: `Guarantor Notification: Loan for ${data.fullName}`,
      html: emailContent,
    });
  } catch (error) {
    console.error('Error sending guarantor notification:', error);
    throw error;
  }
}
