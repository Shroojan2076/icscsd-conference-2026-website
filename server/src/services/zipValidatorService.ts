import AdmZip from 'adm-zip';
import { PDFDocument } from 'pdf-lib';

export interface ZipValidationResult {
  valid: boolean;
  paperId: string;
  pdfFound: boolean;
  pdfFilename?: string;
  sourceFound: boolean;
  sourceType?: 'WORD' | 'LATEX';
  pageCount: number;
  message?: string;
}

export async function validateCameraReadyZip(
  zipFilePathOrBuffer: string | Buffer,
  originalFilename: string
): Promise<ZipValidationResult> {
  // 1. Verify filename pattern: ICSCSD2026-ID_<PaperID>.zip
  const match = originalFilename.match(/^ICSCSD2026-ID_([A-Za-z0-9_-]+)\.zip$/i);
  if (!match) {
    throw new Error(
      `Invalid package filename format: "${originalFilename}". Must strictly follow: ICSCSD2026-ID_<PaperID>.zip (e.g. ICSCSD2026-ID_042.zip)`
    );
  }

  const paperId = match[1];

  // 2. Open zip using AdmZip
  let zip: AdmZip;
  try {
    zip = new AdmZip(zipFilePathOrBuffer);
  } catch (err: any) {
    throw new Error(`Failed to read uploaded .zip file: ${err.message}`);
  }

  const entries = zip.getEntries();
  if (entries.length === 0) {
    throw new Error('The uploaded .zip archive is empty.');
  }

  let pdfEntry: AdmZip.IZipEntry | null = null;
  let sourceEntry: AdmZip.IZipEntry | null = null;
  let sourceType: 'WORD' | 'LATEX' | undefined;

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const nameLower = entry.name.toLowerCase();

    if (nameLower.endsWith('.pdf')) {
      pdfEntry = entry;
    } else if (nameLower.endsWith('.docx') || nameLower.endsWith('.doc')) {
      sourceEntry = entry;
      sourceType = 'WORD';
    } else if (nameLower.endsWith('.tex')) {
      sourceEntry = entry;
      sourceType = 'LATEX';
    }
  }

  if (!pdfEntry) {
    throw new Error(
      'Missing compiled PDF manuscript! Your .zip archive must contain the final compiled IEEE format PDF.'
    );
  }

  if (!sourceEntry) {
    throw new Error(
      'Missing editable manuscript source files! Your .zip archive must contain your original Word (.docx/.doc) or LaTeX (.tex) files.'
    );
  }

  // 3. Inspect PDF buffer using pdf-lib to check page count (4–6 pages)
  let pageCount = 0;
  try {
    const pdfBuffer = pdfEntry.getData();
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    pageCount = pdfDoc.getPageCount();
  } catch (pdfErr: any) {
    throw new Error(`Failed to parse enclosed PDF manuscript: ${pdfErr.message}`);
  }

  if (pageCount < 4 || pageCount > 6) {
    throw new Error(
      `Page count violation: Manuscript contains ${pageCount} pages. ICSCSD 2026 IEEE guidelines strictly require between 4 and 6 pages.`
    );
  }

  return {
    valid: true,
    paperId,
    pdfFound: true,
    pdfFilename: pdfEntry.name,
    sourceFound: true,
    sourceType,
    pageCount,
    message: `Validation successful! Verified 4–6 page PDF (${pageCount} pages) and ${sourceType} source file.`
  };
}
