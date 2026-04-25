import { jsPDF } from "jspdf";
import { getSettings } from "@/lib/settings";
import fs from "fs";
import path from "path";

// ─── Color Palette ────────────────────────────────────────────────────────────
const COLOR = {
  navy: [15, 43, 70] as [number, number, number],    // #0F2B46
  navyLight: [25, 65, 100] as [number, number, number],
  gold: [200, 153, 44] as [number, number, number],   // #C8992C
  goldMuted: [245, 240, 225] as [number, number, number],
  charcoal: [30, 30, 30] as [number, number, number],
  midGray: [100, 100, 100] as [number, number, number],
  lightGray: [220, 220, 220] as [number, number, number],
  paleGray: [248, 248, 248] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
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
  setFill(doc, COLOR.navy);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 7, 1, 1, "F");
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.white);
  doc.text(label.toUpperCase(), margin + 4, y + 4.8);
  return y + 10;
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
  const rowH = 7;
  const colW = (pageWidth - margin * 2) / 2;

  if (shade) {
    setFill(doc, COLOR.paleGray);
    doc.rect(margin, y, pageWidth - margin * 2, rowH, "F");
  }
  if (highlight) {
    setFill(doc, COLOR.goldMuted);
    doc.rect(margin, y, pageWidth - margin * 2, rowH, "F");
  }

  // Label
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.midGray);
  doc.text(label, margin + 3, y + 4.8);

  // Value
  doc.setFont("helvetica", highlight ? "bold" : "normal");
  setTextColor(doc, highlight ? COLOR.navy : COLOR.charcoal);
  doc.text(value, margin + colW + 3, y + 4.8);

  // Bottom border
  setDraw(doc, COLOR.lightGray);
  doc.setLineWidth(0.15);
  doc.line(margin, y + rowH, pageWidth - margin, y + rowH);

  return y + rowH;
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export async function generateLoanAgreementPDF(data: any): Promise<ArrayBuffer> {
  const settings = await getSettings();
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const margin = 15; // Slightly reduced margin to fit on one page
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 0;

  // ── Header Band ────────────────────────────────────────────────────────────
  setFill(doc, COLOR.navy);
  doc.rect(0, 0, pageWidth, 35, "F");

  // Thin gold accent strip
  setFill(doc, COLOR.gold);
  doc.rect(0, 35, pageWidth, 1, "F");

  // Logo / Wordmark
  let logoLoaded = false;
  try {
    const logoPath = path.join(process.cwd(), "public", "henrytee.png");
    if (fs.existsSync(logoPath)) {
      const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
      doc.addImage(logoBase64, "PNG", margin, 7, 38, 12);
      logoLoaded = true;
    }
  } catch (_) { }

  if (!logoLoaded) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    setTextColor(doc, COLOR.white);
    doc.text("HENRYTEE LOANS", margin, 18);
  }

  // Right-side contact block inside header
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, [210, 225, 240]);
  const contactX = pageWidth - margin;
  doc.text("123 Business Avenue, Suite 400", contactX, 10, { align: "right" });
  doc.text("Victoria Island, Lagos, Nigeria", contactX, 14, { align: "right" });
  doc.text(`${settings.supportPhone1}  ·  ${settings.adminEmail}`, contactX, 18, { align: "right" });
  doc.text("www.henryteeloans.com", contactX, 22, { align: "right" });
  
  y = 45;

  // ── Document Title ─────────────────────────────────────────────────────────
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.charcoal);
  doc.text("LOAN ACKNOWLEDGMENT AGREEMENT", pageWidth / 2, y, { align: "center" });

  y += 5;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.midGray);
  doc.text(`Issued on ${data.agreementDate}  ·  Application ID: ${data.applicationId}`, pageWidth / 2, y, { align: "center" });

  y += 8;
  // Full-width thin divider
  setDraw(doc, COLOR.lightGray);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ── Section 1: Parties ─────────────────────────────────────────────────────
  y = sectionHeading(doc, "1.  Parties to the Agreement", y, pageWidth, margin);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, COLOR.charcoal);
  const introText = `This Agreement is entered into on ${data.agreementDate} between:`;
  doc.text(introText, margin, y);
  y += 8;

  // Parties table
  const halfW = (pageWidth - margin * 2) / 2 - 3;

  // Lender box
  setFill(doc, [240, 245, 250]);
  setDraw(doc, COLOR.navy);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, halfW, 20, 1.5, 1.5, "FD");

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.navy);
  doc.text("THE LENDER", margin + 4, y + 5);
  doc.setFontSize(8.5);
  setTextColor(doc, COLOR.charcoal);
  doc.text("Henrytee Loans", margin + 4, y + 10);
  doc.setFontSize(7.5);
  setTextColor(doc, COLOR.midGray);
  doc.text("Victoria Island, Lagos, Nigeria", margin + 4, y + 15);

  // Borrower box
  const bx = margin + halfW + 6;
  setFill(doc, COLOR.paleGray);
  setDraw(doc, COLOR.lightGray);
  doc.roundedRect(bx, y, halfW, 20, 1.5, 1.5, "FD");

  doc.setFontSize(6.5);
  setTextColor(doc, COLOR.midGray);
  doc.text("THE BORROWER", bx + 4, y + 5);
  doc.setFontSize(8.5);
  setTextColor(doc, COLOR.charcoal);
  doc.text(data.fullName, bx + 4, y + 10);
  doc.setFontSize(7.5);
  setTextColor(doc, COLOR.midGray);
  doc.text(data.homeAddress?.substring(0, 40) || "As provided in application", bx + 4, y + 15);

  y += 26;

  // ── Section 2: Loan Details ────────────────────────────────────────────────
  y = sectionHeading(doc, "2.  Loan Details", y, pageWidth, margin);

  // Table header row
  setFill(doc, COLOR.navy);
  doc.rect(margin, y, pageWidth - margin * 2, 6, "F");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  setTextColor(doc, COLOR.white);
  const col1 = margin + 3;
  const col2 = margin + (pageWidth - margin * 2) / 2 + 3;
  doc.text("DESCRIPTION", col1, y + 4.2);
  doc.text("VALUE", col2, y + 4.2);
  y += 6;

  const rows: [string, string, boolean, boolean?][] = [
    ["Principal Loan Amount", `NGN ${Number(data.loanAmount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, false],
    ["Monthly Interest Rate", data.interestRate, true],
    ["Loan Duration", `${data.loanDuration} Months`, false],
    ["Total Repayable Amount", `NGN ${Number(data.totalLoan).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, true, true],
  ];

  rows.forEach(([label, value, shade, highlight]) => {
    y = kvRow(doc, label, value, y, margin, pageWidth, shade, highlight);
  });

  y += 8;
  
  // ── Section 3: Disbursement Details ────────────────────────────────────────
  y = sectionHeading(doc, "3.  Disbursement Details (Bank Account)", y, pageWidth, margin);
  
  const bankRows: [string, string, boolean, boolean?][] = [
    ["Account Name", data.accountName || "N/A", false],
    ["Bank Name", data.bankName || "N/A", true],
    ["Account Number", data.accountNumber || "N/A", false, true],
  ];

  bankRows.forEach(([label, value, shade, highlight]) => {
    y = kvRow(doc, label, value, y, margin, pageWidth, shade, highlight);
  });

  y += 8;

  // ── Section 4: Terms & Conditions ─────────────────────────────────────────
  y = sectionHeading(doc, "4.  Terms and Conditions", y, pageWidth, margin);
  y += 2;
  const terms: [string, string][] = [
    [
      "4.1  Repayment Obligation",
      `The Borrower agrees to repay NGN ${Number(data.totalLoan).toLocaleString()} within the agreed duration commencing from disbursement.`,
    ],
    [
      "4.2  Late Payment Penalty",
      "Outstanding balances attract a 5% fee per week until fully settled.",
    ],
    [
      "4.3  Accuracy",
      "Borrower warrants all info is true. Misrepresentation results in immediate recall.",
    ],
    [
      "4.4  Governing Law",
      "Governed by the laws of the Federal Republic of Nigeria.",
    ],
  ];

  doc.setFontSize(8);
  terms.forEach(([heading, body], i) => {
    // Alternating row background
    if (i % 2 === 0) {
      setFill(doc, COLOR.paleGray);
      doc.rect(margin, y, pageWidth - margin * 2, 10, "F");
    }

    doc.setFont("helvetica", "bold");
    setTextColor(doc, COLOR.navy);
    doc.text(heading, margin + 3, y + 4);

      y += 4; // Spacing between heading and body

    doc.setFont("helvetica", "normal");
    setTextColor(doc, COLOR.charcoal);
    const lines = doc.splitTextToSize(body, pageWidth - margin * 2 - 6);
    doc.text(lines, margin + 3, y);
    y += 4; // Next row spacing
  });

  y += 6;

  // ── Section 5: Acknowledgment ──────────────────────────────────────────────
  y = sectionHeading(doc, "5.  Acknowledgment", y, pageWidth, margin);

  setFill(doc, [245, 250, 245]);
  setDraw(doc, COLOR.navy);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 18, 1.5, 1.5, "FD");

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  setTextColor(doc, COLOR.charcoal);
  const ackText = `I, ${data.fullName}, acknowledge receipt of this agreement and confirm that all information provided is accurate. I agree to abide by the terms and conditions stated herein.`;
  const ackLines = doc.splitTextToSize(ackText, pageWidth - margin * 2 - 8);
  doc.text(ackLines, margin + 4, y + 6);
  y += 22;

  // ── Footer ─────────────────────────────────────────────────────────────────
  setFill(doc, COLOR.navy);
  doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  setTextColor(doc, [180, 200, 220]);
  doc.text(
    `This is a computer-generated document. For enquiries contact ${settings.supportPhone1} or ${settings.adminEmail}`,
    pageWidth / 2,
    pageHeight - 6,
    { align: "center" }
  );

  // Page number
  setTextColor(doc, [140, 160, 180]);
  doc.text(`Page 1 of 1`, pageWidth - margin, pageHeight - 6, { align: "right" });

  return doc.output("arraybuffer");
}