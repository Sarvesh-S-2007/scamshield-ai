import { jsPDF } from 'jspdf';
import { ScamAnalysisResult } from '../types';

export function generateScamReportPdf(result: ScamAnalysisResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper: check page break
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = margin;
      drawPageBorder();
    }
  };

  const drawPageBorder = () => {
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin - 4) * 2);
  };

  drawPageBorder();

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');

  // Title & Brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('SCAMSHIELD AI', margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('FORENSIC CYBERSECURITY THREAT ASSESSMENT REPORT', margin + 6, y + 17);

  // Reference & Date on right side
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text(`REF: ${result.referenceId}`, pageWidth - margin - 6, y + 10, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  const formattedDate = new Date(result.analyzedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  doc.text(formattedDate, pageWidth - margin - 6, y + 17, { align: 'right' });

  y += 30;

  // Classification Card
  let classBg = [254, 242, 242]; // red-50
  let classBorder = [239, 68, 68]; // red-500
  let classText = [185, 28, 28]; // red-700

  if (result.classification === 'Suspicious — Verify Independently') {
    classBg = [254, 252, 232]; // yellow-50
    classBorder = [234, 179, 8]; // yellow-500
    classText = [161, 98, 7]; // yellow-700
  } else if (result.classification === 'No Obvious Scam Indicators Detected') {
    classBg = [240, 253, 244]; // green-50
    classBorder = [34, 197, 94]; // green-500
    classText = [21, 128, 61]; // green-700
  }

  doc.setFillColor(classBg[0], classBg[1], classBg[2]);
  doc.setDrawColor(classBorder[0], classBorder[1], classBorder[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('VERDICT CLASSIFICATION', margin + 6, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(classText[0], classText[1], classText[2]);
  doc.text(result.classification.toUpperCase(), margin + 6, y + 16);

  // Risk Score Badge
  doc.setFillColor(classBorder[0], classBorder[1], classBorder[2]);
  doc.roundedRect(pageWidth - margin - 40, y + 4, 34, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`SCORE: ${result.riskScore}/100`, pageWidth - margin - 23, y + 13, { align: 'center' });

  y += 28;

  // Executive Summary Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Executive Threat Assessment', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(result.summary, contentWidth - 4);
  doc.text(summaryLines, margin + 2, y);
  y += summaryLines.length * 4.5 + 4;

  if (result.riskExplanation) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const expLines = doc.splitTextToSize(`Score Rationale: ${result.riskExplanation}`, contentWidth - 4);
    doc.text(expLines, margin + 2, y);
    y += expLines.length * 4 + 4;
  }

  // Analyzed Content Snippet (if available)
  if (result.analyzedText) {
    ensureSpace(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Inspected Message Text Sample', margin, y);
    y += 4.5;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);

    const truncated = result.analyzedText.length > 320
      ? result.analyzedText.substring(0, 317) + '...'
      : result.analyzedText;
    const msgLines = doc.splitTextToSize(truncated, contentWidth - 10);
    const boxHeight = Math.min(30, msgLines.length * 3.8 + 6);

    doc.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, 'FD');
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(msgLines.slice(0, 7), margin + 5, y + 5);
    y += boxHeight + 6;
  }

  // Observable Threat Indicators
  ensureSpace(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Identified Threat Indicators (${result.indicators.length})`, margin, y);
  y += 5;

  if (result.indicators.length === 0) {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentWidth, 12, 1, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('No explicit high-risk social engineering or fraudulent indicators identified in this text sample.', margin + 5, y + 7);
    y += 16;
  } else {
    for (const ind of result.indicators) {
      ensureSpace(24);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(ind.severity === 'high' ? 248 : 226, ind.severity === 'high' ? 113 : 232, ind.severity === 'high' ? 113 : 240);
      doc.setLineWidth(0.4);

      const expLines = doc.splitTextToSize(ind.explanation, contentWidth - 12);
      const indHeight = 12 + (ind.quote ? 6 : 0) + expLines.length * 3.8;

      doc.roundedRect(margin, y, contentWidth, indHeight, 1.5, 1.5, 'FD');

      // Indicator Title & Severity
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(ind.severity === 'high' ? 185 : 30, ind.severity === 'high' ? 28 : 41, ind.severity === 'high' ? 28 : 59);
      doc.text(`[${ind.severity.toUpperCase()}] ${ind.type}`, margin + 5, y + 5.5);

      let innerY = y + 10;
      if (ind.quote) {
        doc.setFont('courier', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const quoteText = `Evidence: "${ind.quote.length > 85 ? ind.quote.substring(0, 82) + '...' : ind.quote}"`;
        doc.text(quoteText, margin + 5, innerY);
        innerY += 4.5;
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(expLines, margin + 5, innerY);

      y += indHeight + 4;
    }
  }

  // Observable URLs section (if any)
  if (result.observableUrls && result.observableUrls.length > 0) {
    ensureSpace(22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Observable URL & Domain Syntactic Inspection', margin, y);
    y += 5;

    for (const u of result.observableUrls) {
      ensureSpace(16);
      doc.setFillColor(254, 242, 242);
      doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(185, 28, 28);
      doc.text(`URL: ${u.url.length > 60 ? u.url.substring(0, 58) + '...' : u.url}`, margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Observation: ${u.suspiciousTraits.join('; ')}`, margin + 4, y + 10);

      y += 17;
    }
  }

  // Recommended Safety Actions
  ensureSpace(26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Recommended Incident Actions', margin, y);
  y += 5;

  for (let i = 0; i < result.safetyActions.length; i++) {
    const act = result.safetyActions[i];
    ensureSpace(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(14, 116, 144); // cyan-700
    doc.text(`${i + 1}.`, margin + 3, y + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const actLines = doc.splitTextToSize(act, contentWidth - 12);
    doc.text(actLines, margin + 8, y + 3.5);
    y += actLines.length * 4 + 2;
  }

  // Methodology & Legal Disclaimer (Footer area)
  ensureSpace(28);
  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Methodology: ${result.analysisMethod}`, margin, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const disclaimerText =
    'DISCLAIMER: This threat assessment is generated as advisory information based on structural, lexical, and behavioral heuristics. Low-risk or negative detections do NOT guarantee legitimacy. ScamShield AI bears no liability for actions taken on unverified communications. Never share credentials, OTPs, or transfer funds without independent verification.';
  const discLines = doc.splitTextToSize(disclaimerText, contentWidth);
  doc.text(discLines, margin, y);

  // Save/Download file
  const filename = `ScamShield_Report_${result.referenceId}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
