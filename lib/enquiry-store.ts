import crypto from 'node:crypto';

/** Generate a non-sensitive reference for a completed service enquiry. */
export function generateEnquiryId(): string {
  const year = new Date().getFullYear();
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `ENQ-${year}-${randomSuffix}`;
}
