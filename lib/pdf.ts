import { jsPDF } from "jspdf";
import { getSettings } from "@/lib/settings";
import fs from 'fs';
import path from 'path';

export async function generateLoanAgreementPDF(data: any) {
  const settings = await getSettings();
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Add Logo
  try {
    const logoPath = path.join(process.cwd(), 'public', 'henrytee.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
      doc.addImage(logoBase64, 'PNG', margin, y, 50, 15);
    } else {
      doc.setFontSize(20);
      doc.setTextColor(0, 102, 51);
      doc.text("Henrytee Loans", margin, y + 10);
    }
  } catch (error) {
    console.error("Error loading logo for PDF:", error);
  }

  // Add Company Address (Right aligned)
  doc.setFontSize(9);
  doc.setTextColor(100);
  const addressX = pageWidth - margin;
  doc.text("Henrytee Loans", addressX, y + 5, { align: "right" });
  doc.text("123 Business Avenue, Suite 400", addressX, y + 10, { align: "right" });
  doc.text("Victoria Island, Lagos, Nigeria", addressX, y + 15, { align: "right" });
  doc.text(`${settings.supportPhone1} | ${settings.adminEmail}`, addressX, y + 20, { align: "right" });

  y += 40;
  
  // Divider Line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  
  y += 15;

  // Document Title
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 51); // Henrytee Green
  doc.setFont("helvetica", "bold");
  doc.text("LOAN ACKNOWLEDGMENT AGREEMENT", pageWidth / 2, y, { align: "center" });
  
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont("helvetica", "normal");
  doc.text(`Application ID: ${data.applicationId}   |   Date: ${data.agreementDate}`, pageWidth / 2, y, { align: "center" });
  
  y += 20;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("1. PARTIES TO THE AGREEMENT", margin, y);
  
  y += 10;
  doc.setFont("helvetica", "normal");
  const introText = `This agreement is made on ${data.agreementDate} between Henrytee Loans (The Lender) and ${data.fullName} (The Borrower).`;
  doc.text(doc.splitTextToSize(introText, pageWidth - margin * 2), margin, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("2. LOAN DETAILS", margin, y);
  
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Principal Loan Amount: ₦${data.loanAmount.toLocaleString()}`, margin, y);
  y += 7;
  doc.text(`Interest Rate: ${data.interestRate} Monthly`, margin, y);
  y += 7;
  doc.text(`Loan Duration: ${data.loanDuration}`, margin, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Repayable Amount: ₦${data.totalLoan.toLocaleString()}`, margin, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("3. TERMS AND CONDITIONS", margin, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const terms = [
    "• The Borrower agrees to repay the total amount as stipulated above within the agreed duration.",
    "• Failure to repay on time may attract additional late payment fees of 5% per week.",
    "• The Borrower confirms that all information provided in the application is true and correct."
  ];
  
  terms.forEach(term => {
    const lines = doc.splitTextToSize(term, pageWidth - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 6;
  });

  y += 20;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("4. ACKNOWLEDGMENT", margin, y);
  
  y += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  const ackText = `I, ${data.fullName}, hereby confirm that all information provided is accurate and I agree to the terms of this loan agreement as stated above.`;
  const ackLines = doc.splitTextToSize(ackText, pageWidth - margin * 2);
  doc.text(ackLines, margin, y);

  y += 30;
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`This is a computer-generated document. For official inquiries, contact ${settings.supportPhone1}.`, pageWidth / 2, y, { align: "center" });

  // Return as Buffer or Base64
  return doc.output("arraybuffer");
}
