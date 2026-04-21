import { jsPDF } from "jspdf";
import { getSettings } from "@/lib/settings";

export async function generateLoanAgreementPDF(data: any) {
  const settings = await getSettings();
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 30;

  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 51); // Henrytee Green
  doc.text("LOAN ACKNOWLEDGMENT AGREEMENT", pageWidth / 2, y, { align: "center" });
  
  y += 15;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Application ID: ${data.applicationId}`, pageWidth / 2, y, { align: "center" });
  
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
    "• The Borrower confirms that all information provided in the application is true and correct.",
    `• This document must be signed and returned to ${settings.adminEmail} to finalize disbursement.`
  ];
  
  terms.forEach(term => {
    const lines = doc.splitTextToSize(term, pageWidth - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 6;
  });

  y += 20;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("4. SIGNATURE SECTION", margin, y);
  
  y += 20;
  doc.line(margin, y, margin + 80, y); // Borrower line
  doc.line(pageWidth - margin - 80, y, pageWidth - margin, y); // Lender line
  
  y += 7;
  doc.setFontSize(10);
  doc.text("Borrower's Signature & Date", margin, y);
  doc.text("Lender's Signature (Henrytee Loans)", pageWidth - margin - 80, y);

  y += 30;
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`This is a computer-generated document. For official inquiries, contact ${settings.supportPhone1}.`, pageWidth / 2, y, { align: "center" });

  // Return as Buffer or Base64
  return doc.output("arraybuffer");
}
