'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border-2 border-sand bg-cyber-card shadow-2xl text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-sand px-6 py-4 bg-cyber-bg/50">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-cyber-blue" size={20} />
                <h2 className="text-base font-extrabold text-ink">Service Enquiry Privacy Policy</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Privacy Policy"
                className="rounded-full border border-sand p-1.5 text-taupe hover:bg-black/5 hover:text-ink transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed text-taupe">
              <div>
                <h3 className="text-sm font-bold text-ink mb-1">1. Information We Collect</h3>
                <p>
                  When you submit a service enquiry through Akarsh Mishra&apos;s portfolio, we collect your full name, 10-digit Indian mobile number, verified email address, reason for enquiry, requested service category, and any optional project requirements you provide.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink mb-1">2. Purpose of Collection</h3>
                <p>
                  Your information is gathered solely to evaluate your project scope, schedule a consultation, and communicate directly regarding your enquiry. We never use your data for unsolicited marketing or sell it to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink mb-1">3. Storage &amp; Security</h3>
                <p>
                  Submitted enquiries are stored in a private Google Spreadsheet and sent to Akarsh through authenticated server-side SMTP. Sensitive credentials remain on the backend and are not exposed in client bundles. If either service is unavailable, the site reports that the submission could not be completed.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink mb-1">4. Submission &amp; Anti-Spam</h3>
                <p>
                  Email OTP is not required. The form validates submitted fields on the server and uses a hidden anti-spam field and minimum completion time. A visitor email address is used as Reply-To for the notification.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink mb-1">5. Retention &amp; Rights</h3>
                <p>
                  Enquiry records are retained for the duration of the prospective project engagement and archived afterward. You may request the deletion or correction of your enquiry data at any time by emailing{' '}
                  <a href="mailto:akarshmishra3145@gmail.com" className="font-semibold text-cyber-blue hover:underline">
                    akarshmishra3145@gmail.com
                  </a>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-sand px-6 py-4 bg-cyber-bg/50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-ink text-cyber-bg px-5 py-2 text-xs font-bold transition hover:bg-cyber-blue"
              >
                Understood &amp; Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
