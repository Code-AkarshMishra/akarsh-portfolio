'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);


        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        formData.append("access_key", "2afd5beb-0663-4ce0-91c8-8b9dc1e2dde5");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json' // Ye header Web3Forms ko sahi format deta hai
                }
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                form.reset(); // ✅ FORM YAHAN AUTOMATIC CLEAR HO JAYEGA
                setTimeout(() => setIsSuccess(false), 5000); // 5 sec baad success message gayab
            } else {
                // Agar Web3Forms API se koi error aati hai toh ye batayega kya galat hai
                alert(data.message || "Oops! There was a problem submitting your form");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please check your connection.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {isSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center font-medium">
                    Transmission successful! I will get back to you soon.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Name</label>
                        <input type="text" name="name" required className="w-full bg-navy-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all" placeholder="Name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Email</label>
                        <input type="email" name="email" required className="w-full bg-navy-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all" placeholder="email@example.com" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Message</label>
                    <textarea name="message" required rows={4} className="w-full bg-navy-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all resize-none" placeholder="Let's build something scalable..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-electric-blue to-electric-purple text-navy-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
                </button>
            </form>
        </div>
    );
}