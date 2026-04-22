import { jsPDF } from "jspdf";
import { getSettings } from "@/lib/settings";
import fs from "fs";
import path from "path";

// ─── Color Palette ────────────────────────────────────────────────────────────
const COLOR = {
  green:       [0,  102,  51]  as [number, number, number],
  greenLight:  [0,  140,  70]  as [number, number, number],
  greenMuted:  [230, 245, 235] as [number, number, number],
  charcoal:    [30,  30,  30]  as [number, number, number],
  midGray:     [100, 100, 100] as [number, number, number],
  lightGray:   [220, 220, 220] as [number, number, number],
  paleGray:    [248, 248, 248] as [number, number, number],
  white:       [255, 255, 255] as [number, number, number],
  gold:        [180, 140,  20] as [number, number, number],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function setFill(doc: jsPDF, rgb: [number, number, number]) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}
function setDraw(doc: jsPDF, rgb: [number, number, number]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}
function setTextColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function sectionHeading(doc: jsPDF, label: string, y: number, pageWidth: number, margin: number): number {
  setFill(doc, COLOR.green);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 8, 1, 1, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.white);
  doc.text(label.toUpperCase(), margin + 4, y + 5.5);
  return y + 14;
}

// ─── Key-Value Row ────────────────────────────────────────────────────────────
function kvRow(
  doc: jsPDF,
  label: string,
  value: string,
  y: number,
  margin: number,
  pageWidth: number,
  shade: boolean,
  highlight = false
): number {
  const rowH = 8;
  const colW = (pageWidth - margin * 2) / 2;

  if (shade) {
    setFill(doc, COLOR.paleGray);
    doc.rect(margin, y, pageWidth - margin * 2, rowH, "F");
  }
  if (highlight) {
    setFill(doc, COLOR.greenMuted);
    doc.rect(margin, y, pageWidth - margin * 2, rowH, "F");
  }

  // Label
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.midGray);
  doc.text(label, margin + 3, y + 5.5);

  // Value
  doc.setFont("helvetica", highlight ? "bold" : "normal");
  setTextColor(doc, highlight ? COLOR.green : COLOR.charcoal);
  doc.text(value, margin + colW + 3, y + 5.5);

  // Bottom border
  setDraw(doc, COLOR.lightGray);
  doc.setLineWidth(0.2);
  doc.line(margin, y + rowH, pageWidth - margin, y + rowH);

  return y + rowH;
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export async function generateLoanAgreementPDF(data: any): Promise<ArrayBuffer> {
  const settings = await getSettings();
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 0;

  // ── Header Band ────────────────────────────────────────────────────────────
  setFill(doc, COLOR.green);
  doc.rect(0, 0, pageWidth, 38, "F");

  // Thin gold accent strip
  setFill(doc, COLOR.gold);
  doc.rect(0, 38, pageWidth, 1.2, "F");

  // Logo / Wordmark
  let logoLoaded = false;
  try {
    const logoPath = path.join(process.cwd(), "public", "henrytee.png");
    if (fs.existsSync(logoPath)) {
      const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
      doc.addImage(logoBase64, "PNG", margin, 8, 42, 14);
      logoLoaded = true;
    }
  } catch (_) {}

  if (!logoLoaded) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    setTextColor(doc, COLOR.white);
    doc.text("HENRYTEE LOANS", margin, 20);
  }

  // Right-side contact block inside header
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, [200, 235, 210]);
  const contactX = pageWidth - margin;
  doc.text("123 Business Avenue, Suite 400", contactX, 11, { align: "right" });
  doc.text("Victoria Island, Lagos, Nigeria", contactX, 16, { align: "right" });
  doc.text(`${settings.supportPhone1}  ·  ${settings.adminEmail}`, contactX, 21, { align: "right" });
  doc.text("www.henryteeloans.com", contactX, 26, { align: "right" });

  // Ref tag (pill shape) bottom-right of header
  setFill(doc, COLOR.greenLight);
  doc.roundedRect(pageWidth - margin - 58, 28, 58, 8, 2, 2, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.white);
  doc.text(`REF: ${data.applicationId}`, pageWidth - margin - 29, 33, { align: "center" });

  y = 50;

  // ── Document Title ─────────────────────────────────────────────────────────
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.charcoal);
  doc.text("LOAN ACKNOWLEDGMENT AGREEMENT", pageWidth / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.midGray);
  doc.text(`Issued on ${data.agreementDate}  ·  Application ID: ${data.applicationId}`, pageWidth / 2, y, { align: "center" });

  y += 10;
  // Full-width thin divider
  setDraw(doc, COLOR.lightGray);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // ── Section 1: Parties ─────────────────────────────────────────────────────
  y = sectionHeading(doc, "1.  Parties to the Agreement", y, pageWidth, margin);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.charcoal);
  const introText = `This Loan Acknowledgment Agreement ("Agreement") is entered into on ${data.agreementDate} between:`;
  doc.text(doc.splitTextToSize(introText, pageWidth - margin * 2), margin, y);
  y += 10;

  // Parties table
  const halfW = (pageWidth - margin * 2) / 2 - 3;

  // Lender box
  setFill(doc, COLOR.greenMuted);
  setDraw(doc, COLOR.green);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, halfW, 22, 2, 2, "FD");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.green);
  doc.text("THE LENDER", margin + 4, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTextColor(doc, COLOR.charcoal);
  doc.text("Henrytee Loans", margin + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setTextColor(doc, COLOR.midGray);
  doc.text("Victoria Island, Lagos, Nigeria", margin + 4, y + 18);

  // Borrower box
  const bx = margin + halfW + 6;
  setFill(doc, COLOR.paleGray);
  setDraw(doc, COLOR.lightGray);
  doc.setLineWidth(0.4);
  doc.roundedRect(bx, y, halfW, 22, 2, 2, "FD");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.midGray);
  doc.text("THE BORROWER", bx + 4, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTextColor(doc, COLOR.charcoal);
  doc.text(data.fullName, bx + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setTextColor(doc, COLOR.midGray);
  doc.text(data.borrowerAddress ?? "As provided in application", bx + 4, y + 18);

  y += 30;

  // ── Section 2: Loan Details ────────────────────────────────────────────────
  y = sectionHeading(doc, "2.  Loan Details", y, pageWidth, margin);

  // Table header row
  setFill(doc, COLOR.charcoal);
  doc.rect(margin, y, pageWidth - margin * 2, 7, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.white);
  const col1 = margin + 3;
  const col2 = margin + (pageWidth - margin * 2) / 2 + 3;
  doc.text("DESCRIPTION", col1, y + 4.8);
  doc.text("VALUE", col2, y + 4.8);
  y += 7;

  const rows: [string, string, boolean, boolean?][] = [
    ["Principal Loan Amount", `NGN ${Number(data.loanAmount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, false],
    ["Monthly Interest Rate", data.interestRate, true],
    ["Loan Duration", data.loanDuration, false],
    ["Disbursement Date", data.disbursementDate ?? data.agreementDate, true],
    ["Repayment Due Date", data.repaymentDate ?? "As per schedule", false],
    ["Total Repayable Amount", `NGN ${Number(data.totalLoan).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, true, true],
  ];

  rows.forEach(([label, value, shade, highlight]) => {
    y = kvRow(doc, label, value, y, margin, pageWidth, shade, highlight);
  });

  y += 10;

  // ── Section 3: Terms & Conditions ─────────────────────────────────────────
  y = sectionHeading(doc, "3.  Terms and Conditions", y, pageWidth, margin);

  const terms: [string, string][] = [
    [
      "3.1  Repayment Obligation",
      `The Borrower agrees to repay the total amount of NGN ${Number(data.totalLoan).toLocaleString()} within the agreed loan duration commencing from the disbursement date.`,
    ],
    [
      "3.2  Late Payment Penalty",
      "Any outstanding balance not settled by the due date shall attract a late payment fee of 5% of the outstanding balance per week until fully settled.",
    ],
    [
      "3.3  Accuracy of Information",
      "The Borrower warrants that all information provided during the loan application process is true, complete, and accurate. Any misrepresentation may result in immediate recall of the loan.",
    ],
    [
      "3.4  Governing Law",
      "This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.",
    ],
  ];

  doc.setFontSize(8.5);
  terms.forEach(([heading, body], i) => {
    // Alternating row background
    if (i % 2 === 0) {
      setFill(doc, COLOR.paleGray);
      const textH = doc.splitTextToSize(body, pageWidth - margin * 2 - 6).length * 5 + 12;
      doc.rect(margin, y, pageWidth - margin * 2, textH, "F");
    }

    doc.setFont("helvetica", "bold");
    setTextColor(doc, COLOR.green);
    doc.text(heading, margin + 3, y + 6);
    y += 8;

    doc.setFont("helvetica", "normal");
    setTextColor(doc, COLOR.charcoal);
    const lines = doc.splitTextToSize(body, pageWidth - margin * 2 - 6);
    doc.text(lines, margin + 3, y);
    y += lines.length * 5 + 6;
  });

  y += 4;

  // ── Section 4: Acknowledgment ──────────────────────────────────────────────
  y = sectionHeading(doc, "4.  Borrower's Acknowledgment", y, pageWidth, margin);

  setFill(doc, COLOR.greenMuted);
  setDraw(doc, COLOR.green);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 2, 2, "FD");

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  setTextColor(doc, COLOR.charcoal);
  const ackText = `I, ${data.fullName}, hereby acknowledge receipt of this agreement and confirm that all information provided is accurate. I agree to abide by the terms and conditions stated herein.`;
  const ackLines = doc.splitTextToSize(ackText, pageWidth - margin * 2 - 8);
  doc.text(ackLines, margin + 4, y + 7);
  y += 28;

  // ── Footer ─────────────────────────────────────────────────────────────────
  setFill(doc, COLOR.green);
  doc.rect(0, pageHeight - 14, pageWidth, 14, "F");

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, [180, 220, 190]);
  doc.text(
    `This is a computer-generated document.  For enquiries contact ${settings.supportPhone1} or ${settings.adminEmail}`,
    pageWidth / 2,
    pageHeight - 7,
    { align: "center" }
  );

  // Page number
  setTextColor(doc, [150, 200, 160]);
  doc.text(`Page 1 of 1`, pageWidth - margin, pageHeight - 7, { align: "right" });

  return doc.output("arraybuffer");
}