'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 pt-24">
        <div className="max-w-[1400px] mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl opacity-90"
          >
            Your privacy is important to us. Learn how we protect your data.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-0">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 2, 2025
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6">
            Welcome to Admitverse. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We may collect the following personal information when you interact with our services:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Name and contact information (email address, phone number)</li>
            <li>Academic qualifications and educational background</li>
            <li>Career interests and goals</li>
            <li>Documents uploaded for review (CV, SOP, transcripts)</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We automatically collect certain non-personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referral sources</li>
            <li>Usage patterns and preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookies and Tracking Technologies</h3>
          <p className="text-gray-700 mb-6">
            We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Provide academic counseling and consultation services</li>
            <li>Process applications and document reviews</li>
            <li>Communicate with you about our services and updates</li>
            <li>Improve our website functionality and user experience</li>
            <li>Conduct research and analytics to enhance our services</li>
            <li>Comply with legal obligations and prevent fraud</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our business</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government investigation</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
            <li><strong>Safety:</strong> To protect the safety and security of our users and services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights and Choices</h2>
          <p className="text-gray-700 mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-700 mb-6">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy and applicable laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this privacy policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
          </p>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-0">
              By using our website and services, you acknowledge that you have read and understood this privacy policy and agree to the collection, use, and disclosure of your information as described herein.
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}