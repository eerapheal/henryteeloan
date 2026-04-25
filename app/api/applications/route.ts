import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendAdminNotification, sendApplicantConfirmation, sendGuarantorNotification } from '@/lib/email';
import { generateLoanAgreementPDF } from '@/lib/pdf';
import { getSettings } from '@/lib/settings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields for the new Loan Agreement form
    const requiredFields = [
      'borrowerName',
      'loanAmount',
      'totalLoan',
      'fullName',
      'phone',
      'email',
      'nin',
      'loanDuration',
      'placeOfWork',
      'homeAddress',
      'officeAddress',
      'guarantorName',
      'guarantorPhone',
      'guarantorEmail',
      'ninCopy',
      'accountName',
      'bankName',
      'accountNumber'
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('henrytee_loans');
    const applicationsCollection = db.collection('applications');

    // Create application document
    const application = {
      agreementDate: `${body.agreementDay} ${body.agreementMonth} 20${body.agreementYear}`,
      borrowerName: body.borrowerName,
      loanAmount: parseFloat(body.loanAmount),
      previousLoan: parseFloat(body.previousLoan || '0'),
      totalLoan: parseFloat(body.totalLoan),
      interestRate: body.interestRate || `${(await getSettings()).interestRate}%`,
      
      // Personal Details
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      nin: body.nin,
      ninCopy: body.ninCopy, // Store base64 or reference
      loanDuration: body.loanDuration,
      placeOfWork: body.placeOfWork,
      homeAddress: body.homeAddress,
      officeAddress: body.officeAddress,
      
      // Guarantor Details
      guarantorName: body.guarantorName,
      guarantorPhone: body.guarantorPhone,
      guarantorEmail: body.guarantorEmail,
      
      // Bank Details
      accountName: body.accountName,
      bankName: body.bankName,
      accountNumber: body.accountNumber,
      
      // Status
      status: 'pending',
      submittedAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert into database
    const result = await applicationsCollection.insertOne(application);
    const applicationId = result.insertedId.toString();

    // Send emails to admin and applicant
    try {
      const emailData = {
        ...application,
        applicationId,
      };

      // Generate Loan Agreement PDF
      const pdfBuffer = await generateLoanAgreementPDF(emailData);

      // Send admin notification
      await sendAdminNotification(emailData as any, pdfBuffer);
      
      // Send applicant confirmation with PDF
      await sendApplicantConfirmation(emailData as any, pdfBuffer);

      // Send guarantor notification
      await sendGuarantorNotification(emailData as any);
      
      console.log('[v0] Emails sent successfully for application:', applicationId);
    } catch (emailError) {
      console.error('[v0] Email sending failed:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Loan agreement submitted successfully',
        applicationId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('henrytee_loans');
    const applicationsCollection = db.collection('applications');

    const applications = await applicationsCollection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
