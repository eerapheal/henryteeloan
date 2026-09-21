import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendAdminNotification, sendApplicantConfirmation, sendGuarantorNotification } from '@/lib/email';
import { generateLoanAgreementPDF } from '@/lib/pdf';
import { getSettings } from '@/lib/settings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'loanAmount',
      'fullName',
      'phone',
      'email',
      'nin',
      'loanDuration',
      'accountName',
      'bankName',
      'accountNumber'
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Please provide your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}` },
          { status: 400 }
        );
      }
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('henrytee_loans');
    const applicationsCollection = db.collection('applications');

    // Compute agreement date safely
    const now = new Date();
    const day = body.agreementDay || now.getDate().toString();
    const month = body.agreementMonth || now.toLocaleString('en-US', { month: 'long' });
    const year = body.agreementYear 
      ? (body.agreementYear.length === 2 ? `20${body.agreementYear}` : body.agreementYear) 
      : now.getFullYear().toString();
    const agreementDate = body.agreementDate || `${day} ${month} ${year}`;

    const loanAmount = parseFloat(body.loanAmount) || 0;
    const previousLoan = parseFloat(body.previousLoan || '0') || 0;
    const totalLoan = parseFloat(body.totalLoan) || (loanAmount + previousLoan);
    const settings = await getSettings();

    // Create application document
    const application = {
      agreementDate,
      borrowerName: body.borrowerName || body.fullName || 'Applicant',
      loanAmount,
      previousLoan,
      totalLoan,
      interestRate: body.interestRate || `${settings.interestRate}%`,
      
      // Personal Details
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      nin: body.nin,
      ninCopy: body.ninCopy || '',
      loanDuration: body.loanDuration,
      placeOfWork: body.placeOfWork || '',
      homeAddress: body.homeAddress || '',
      officeAddress: body.officeAddress || '',
      
      // Guarantor Details
      guarantorName: body.guarantorName || '',
      guarantorPhone: body.guarantorPhone || '',
      guarantorEmail: body.guarantorEmail || '',
      
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

    // Dispatch emails in background so applicant gets immediate response
    (async () => {
      try {
        const emailData = {
          ...application,
          applicationId,
        };

        const pdfBuffer = await generateLoanAgreementPDF(emailData);

        await Promise.allSettled([
          sendAdminNotification(emailData as any, pdfBuffer),
          sendApplicantConfirmation(emailData as any, pdfBuffer),
          sendGuarantorNotification(emailData as any),
        ]);
        
        console.log('[Henrytee Loans] Emails dispatched for application:', applicationId);
      } catch (emailError) {
        console.error('[Henrytee Loans] Email notification failed:', emailError);
      }
    })();

    return NextResponse.json(
      {
        success: true,
        message: 'Loan agreement submitted successfully',
        applicationId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/applications Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit application' },
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
      .project({ ninCopy: 0 })
      .sort({ submittedAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/applications Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
