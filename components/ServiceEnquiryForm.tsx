'use client';

import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export const SERVICE_OPTIONS = [
  'Full-Stack Web Development',
  'Frontend Development',
  'Backend Development and API Development',
  'Portfolio or Personal Website',
  'Business Website Development',
  'E-commerce Website Development',
  'AI/ML Application Development',
  'Generative AI and LLM Integration',
  'Computer Vision and Machine Learning Projects',
  'Research Project Development',
  'Website Redesign and UI/UX Improvement',
  'SEO and Website Optimization',
  'Technical Consultation',
  'Other',
] as const;

type FormState = {
  name: string;
  mobile: string;
  email: string;
  requestedService: string;
  reason: string;
  additionalEnquiry: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof FormState | 'general', string>>;

export default function ServiceEnquiryForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    mobile: '',
    email: '',
    requestedService: '',
    reason: '',
    additionalEnquiry: '',
    consent: false,
  });

  const [enquiryId, setEnquiryId] = useState('');
  const [visitorConfirmationSent, setVisitorConfirmationSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Bot detection timing
  const formStartedAt = useRef<number | null>(null);

  const markStarted = () => {
    if (formStartedAt.current === null) {
      formStartedAt.current = Date.now();
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};

    // 1. Full Name
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = 'Full name is required.';
    } else if (trimmedName.length < 2 || trimmedName.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters.';
    }

    // 2. Mobile (10-digit Indian)
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    let finalMobile = cleanMobile;
    if (cleanMobile.length === 12 && cleanMobile.startsWith('91')) {
      finalMobile = cleanMobile.slice(2);
    } else if (cleanMobile.length === 11 && cleanMobile.startsWith('0')) {
      finalMobile = cleanMobile.slice(1);
    }

    if (!finalMobile) {
      errors.mobile = 'Mobile number is required.';
    } else if (finalMobile.length !== 10 || !/^[6-9]\d{9}$/.test(finalMobile)) {
      errors.mobile = 'Enter a valid 10-digit Indian mobile number (e.g., 9876543210).';
    }

    // 3. Email
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address.';
    }

    // 4. Requested Service
    if (!formData.requestedService) {
      errors.requestedService = 'Please select a requested service.';
    }

    // 5. Reason for Enquiry
    const trimmedReason = formData.reason.trim();
    if (!trimmedReason) {
      errors.reason = 'Reason for enquiry is required.';
    } else if (trimmedReason.length < 10) {
      errors.reason = 'Please explain your enquiry in at least 10 characters.';
    } else if (trimmedReason.length > 3000) {
      errors.reason = 'Reason must not exceed 3,000 characters.';
    }

    // 6. Additional Enquiry (optional)
    if (formData.additionalEnquiry.trim().length > 3000) {
      errors.additionalEnquiry = 'Additional enquiry must not exceed 3,000 characters.';
    }

    // 7. Consent
    if (!formData.consent) {
      errors.consent = 'You must agree to be contacted regarding this enquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const elapsedMs = formStartedAt.current === null ? 2000 : Date.now() - formStartedAt.current;

    try {
      const response = await fetch('/api/enquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          requestedService: formData.requestedService,
          reason: formData.reason,
          additionalEnquiry: formData.additionalEnquiry,
          consent: formData.consent,
          elapsedMs,
          sourcePage: typeof window !== 'undefined' ? window.location.href : 'Portfolio Direct',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralError(data.message || 'Unable to submit enquiry. Please check your details.');
        return;
      }

      setEnquiryId(data.enquiryId);
      setVisitorConfirmationSent(data.visitorConfirmationSent === true);
      setIsSuccess(true);
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setGeneralError('Network error. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      requestedService: '',
      reason: '',
      additionalEnquiry: '',
      consent: false,
    });
    setEnquiryId('');
    setVisitorConfirmationSent(false);
    setFieldErrors({});
    setGeneralError(null);
    formStartedAt.current = null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Main Form Container Card */}
      <div className="rounded-3xl border-2 border-sand bg-cyber-card p-6 sm:p-8 md:p-10 shadow-premium transition duration-300">
        
        {/* Header Indicator */}
        <div className="mb-8 flex items-center justify-between border-b border-sand pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyber-blue text-xs font-bold text-white shadow-glow-blue/40">
              <Sparkles size={14} />
            </span>
            <span className="text-sm font-extrabold text-ink uppercase tracking-wider">
              Service Enquiry &amp; Direct Consultation
            </span>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full border border-sand bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-taupe font-mono">
            Direct SMTP · Google Sheets
          </span>
        </div>

        {/* Global Error Banner */}
        {generalError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800"
          >
            <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
            <div className="flex-1">{generalError}</div>
          </div>
        )}

        {/* Form View */}
        {!isSuccess ? (
          <form
            onSubmit={handleSubmit}
            onFocusCapture={markStarted}
            onChangeCapture={markStarted}
            noValidate
            className="space-y-6 text-left"
          >
            {/* Honeypot field for bot protection */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="enquiry-website">Leave this field blank</label>
              <input
                id="enquiry-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: Full Name & Mobile */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="enquiry-name"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
                >
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-cyber-blue" />
                    Full Name <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-taupe font-normal">Mandatory</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink outline-none transition placeholder:text-taupe/50 focus:ring-2 ${
                    fieldErrors.name
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-sand focus:border-cyber-blue focus:ring-cyber-blue/15'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-[11px] font-semibold text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              {/* Mobile Number (10-Digit Indian) */}
              <div className="space-y-2">
                <label
                  htmlFor="enquiry-mobile"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-cyber-emerald" />
                    Mobile Number (India) <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-taupe font-normal">10 digits</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-taupe font-mono select-none">
                    +91
                  </span>
                  <input
                    id="enquiry-mobile"
                    type="tel"
                    name="mobile"
                    required
                    maxLength={14}
                    value={formData.mobile}
                    onChange={(e) => {
                      setFormData({ ...formData, mobile: e.target.value });
                      if (fieldErrors.mobile) setFieldErrors({ ...fieldErrors, mobile: undefined });
                    }}
                    placeholder="9876543210"
                    className={`w-full rounded-xl border bg-white py-3 pl-12 pr-4 text-xs sm:text-sm font-mono font-semibold text-ink outline-none transition placeholder:text-taupe/50 focus:ring-2 ${
                      fieldErrors.mobile
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-sand focus:border-cyber-blue focus:ring-cyber-blue/15'
                    }`}
                  />
                </div>
                {fieldErrors.mobile && (
                  <p className="text-[11px] font-semibold text-red-600">{fieldErrors.mobile}</p>
                )}
              </div>
            </div>

            {/* Row 2: Email Address & Requested Service */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Email Address */}
              <div className="space-y-2">
                <label
                  htmlFor="enquiry-email"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
                >
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-cyber-cyan" />
                    Email Address <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-taupe font-normal">No email OTP required</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="rahul@example.com"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink outline-none transition placeholder:text-taupe/50 focus:ring-2 ${
                    fieldErrors.email
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-sand focus:border-cyber-blue focus:ring-cyber-blue/15'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[11px] font-semibold text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Requested Service Dropdown */}
              <div className="space-y-2">
                <label
                  htmlFor="enquiry-service"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
                >
                  <span>
                    Requested Service <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-taupe font-normal">Select Primary</span>
                </label>
                <select
                  id="enquiry-service"
                  name="requestedService"
                  required
                  value={formData.requestedService}
                  onChange={(e) => {
                    setFormData({ ...formData, requestedService: e.target.value });
                    if (fieldErrors.requestedService)
                      setFieldErrors({ ...fieldErrors, requestedService: undefined });
                  }}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink outline-none transition focus:ring-2 ${
                    fieldErrors.requestedService
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-sand focus:border-cyber-blue focus:ring-cyber-blue/15'
                  }`}
                >
                  <option value="">-- Choose a Service --</option>
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {fieldErrors.requestedService && (
                  <p className="text-[11px] font-semibold text-red-600">
                    {fieldErrors.requestedService}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Reason for Enquiry */}
            <div className="space-y-2">
              <label
                htmlFor="enquiry-reason"
                className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
              >
                <span>
                  Reason for Enquiry <span className="text-red-500">*</span>
                </span>
                <span className="text-[10px] text-taupe font-normal">
                  Min 10 characters ({formData.reason.length}/3000)
                </span>
              </label>
              <textarea
                id="enquiry-reason"
                name="reason"
                required
                rows={4}
                maxLength={3000}
                value={formData.reason}
                onChange={(e) => {
                  setFormData({ ...formData, reason: e.target.value });
                  if (fieldErrors.reason) setFieldErrors({ ...fieldErrors, reason: undefined });
                }}
                placeholder="Explain what you want to build, the problems you are solving, or key goals..."
                className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink outline-none transition placeholder:text-taupe/50 focus:ring-2 ${
                  fieldErrors.reason
                    ? 'border-red-400 focus:ring-red-200'
                    : 'border-sand focus:border-cyber-blue focus:ring-cyber-blue/15'
                }`}
              />
              {fieldErrors.reason && (
                <p className="text-[11px] font-semibold text-red-600">{fieldErrors.reason}</p>
              )}
            </div>

            {/* Row 4: Additional Enquiry (Optional) */}
            <div className="space-y-2">
              <label
                htmlFor="enquiry-additional"
                className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink"
              >
                <span>Additional Enquiry / Project Scope</span>
                <span className="text-[10px] text-taupe font-normal">Optional</span>
              </label>
              <textarea
                id="enquiry-additional"
                name="additionalEnquiry"
                rows={3}
                maxLength={3000}
                value={formData.additionalEnquiry}
                onChange={(e) => setFormData({ ...formData, additionalEnquiry: e.target.value })}
                placeholder="Describe timeline, budget expectations, preferred technologies, or existing repositories/links..."
                className="w-full resize-none rounded-xl border border-sand bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink outline-none transition placeholder:text-taupe/50 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/15"
              />
            </div>

            {/* Row 5: Consent Checkbox */}
            <div className="rounded-2xl border border-sand bg-white/70 p-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (fieldErrors.consent) setFieldErrors({ ...fieldErrors, consent: undefined });
                  }}
                  className="mt-1 h-4 w-4 rounded border-sand text-cyber-blue focus:ring-cyber-blue/20 cursor-pointer"
                />
                <span className="text-xs leading-relaxed text-taupe font-medium">
                  I agree to be contacted by email or phone regarding this enquiry, and I acknowledge the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPrivacyModalOpen(true);
                    }}
                    className="font-bold text-cyber-blue hover:underline inline"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>
              {fieldErrors.consent && (
                <p className="mt-2 text-[11px] font-semibold text-red-600 pl-7">{fieldErrors.consent}</p>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink px-6 py-4 text-sm font-bold text-cyber-bg transition hover:-translate-y-0.5 hover:shadow-glow-blue/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Submitting Enquiry &amp; Dispatching Emails...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Service Enquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-taupe mt-3">
                Your message is sent directly to Akarsh Mishra via authenticated SMTP and recorded into Google Sheets.
              </p>
            </div>
          </form>
        ) : (
          /* Confirmed Success State */
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 shadow-glow-emerald/30">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-300/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Enquiry Dispatched &amp; Logged
              </span>
              <h3 className="text-2xl font-black text-ink">Service Enquiry Submitted!</h3>
              <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your enquiry for{' '}
                <strong className="text-ink">{formData.requestedService}</strong> has been received,
                recorded into our private Google Sheet, and emailed to Akarsh.
              </p>
            </div>

            {/* Reference Card */}
            <div className="max-w-md mx-auto rounded-2xl border-2 border-sand bg-cyber-bg p-5 text-left space-y-2">
              <div className="flex items-center justify-between border-b border-sand pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-taupe">
                  Reference ID
                </span>
                <span className="font-mono text-sm font-extrabold text-cyber-blue">
                  {enquiryId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-taupe pt-1">
                <span>Client Contact:</span>
                <span className="font-semibold text-ink">+91 {formData.mobile}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-taupe">
                <span>Receipt Email:</span>
                <span className="font-semibold text-ink">{visitorConfirmationSent ? `Sent to ${formData.email}` : 'Receipt unavailable'}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-taupe">
                <span>Storage Destination:</span>
                <span className="font-semibold text-emerald-600">Google Sheets API</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-sand bg-white px-6 py-2.5 text-xs font-bold text-taupe hover:border-cyber-blue hover:text-cyber-blue transition shadow-sm"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
