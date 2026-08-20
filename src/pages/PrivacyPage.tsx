export function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-serif text-4xl text-almond-900 mb-2">Privacy Policy</h1>
        <p className="text-almond-400 text-sm mb-10">Last updated: February 1, 2025</p>

        <div className="space-y-8 text-almond-600 leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">1. Information we collect</h2>
            <p>When you use Petal Assist, we may collect the following types of information:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li>Contact information you provide (name, email address, phone number, company name)</li>
              <li>Account credentials (email and encrypted password)</li>
              <li>Service preferences and messages submitted through our contact forms</li>
              <li>Order and billing information (processed securely via Stripe)</li>
              <li>Usage data such as pages visited and features used (via anonymised analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">2. How we use your information</h2>
            <p className="text-sm">We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li>Provide, operate, and improve our services</li>
              <li>Match you with the right virtual assistant</li>
              <li>Send service-related communications (onboarding, updates, invoices)</li>
              <li>Respond to your enquiries and support requests</li>
              <li>Send marketing emails if you have opted in (you can unsubscribe at any time)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">3. Data sharing</h2>
            <p className="text-sm">
              We do not sell your personal data. We may share your information with trusted third-party
              service providers who assist us in operating our platform (such as Supabase for database
              hosting, Stripe for payment processing, and email delivery providers). These providers are
              contractually obligated to keep your data secure and use it only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">4. Data retention</h2>
            <p className="text-sm">
              We retain your personal data for as long as your account is active or as needed to provide
              services. You may request deletion of your data at any time by emailing
              hello@petalassist.com. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">5. Cookies</h2>
            <p className="text-sm">
              We use essential cookies to keep you logged in and remember your preferences. We do not
              use third-party advertising cookies. You can disable cookies in your browser settings,
              though some features of the site may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">6. Your rights</h2>
            <p className="text-sm">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability (receive your data in a machine-readable format)</li>
            </ul>
            <p className="text-sm mt-3">To exercise any of these rights, contact us at hello@petalassist.com.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">7. Security</h2>
            <p className="text-sm">
              We implement industry-standard security measures including encrypted data transmission (TLS),
              encrypted storage, and access controls. However, no method of transmission over the internet
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">8. Changes to this policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by email or by posting a notice on our website. Your continued use of our services
              after changes take effect constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">9. Contact</h2>
            <p className="text-sm">
              If you have questions about this Privacy Policy, please contact us at:<br />
              <a href="mailto:hello@petalassist.com" className="text-pink-600 hover:underline">hello@petalassist.com</a><br />
              Petal Assist · Remote · Worldwide
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
