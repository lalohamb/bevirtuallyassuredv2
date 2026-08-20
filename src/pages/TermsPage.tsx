export function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-serif text-4xl text-almond-900 mb-2">Terms of Service</h1>
        <p className="text-almond-400 text-sm mb-10">Last updated: February 1, 2025</p>

        <div className="space-y-8 text-almond-600 leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">1. Acceptance of terms</h2>
            <p className="text-sm">
              By accessing or using Petal Assist ("the Service"), you agree to be bound by these Terms
              of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">2. Description of service</h2>
            <p className="text-sm">
              Petal Assist provides virtual assistant services to entrepreneurs and small businesses.
              Services are delivered by trained virtual assistants according to the plan selected by
              the client. The scope of services is defined by the package purchased and any additional
              agreements made during onboarding.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">3. Accounts and eligibility</h2>
            <p className="text-sm">
              You must be at least 18 years old and capable of entering into a binding contract to use
              the Service. You are responsible for maintaining the confidentiality of your account
              credentials and for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">4. Payment and billing</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All plans are billed monthly in advance.</li>
              <li>Payments are processed securely via Stripe.</li>
              <li>Plans are month-to-month with no long-term commitment.</li>
              <li>You may cancel at any time; cancellation takes effect at the end of the current billing period.</li>
              <li>Unused hours may roll over up to 25% into the following month, as specified in your plan.</li>
              <li>Refunds are not provided for partial months or unused hours beyond the rollover allowance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">5. Confidentiality</h2>
            <p className="text-sm">
              Petal Assist treats all client information as strictly confidential. All assistants sign
              non-disclosure agreements before engaging with any client. We will not share your business
              information, data, or communications with any third party except as required by law or as
              necessary to deliver the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">6. Client responsibilities</h2>
            <p className="text-sm">You agree to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li>Provide clear, timely instructions to your assigned assistant</li>
              <li>Not request tasks that are illegal, unethical, or outside the agreed scope of service</li>
              <li>Maintain accurate account and billing information</li>
              <li>Not attempt to directly hire or solicit Petal Assist assistants outside of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">7. Limitation of liability</h2>
            <p className="text-sm">
              Petal Assist is not liable for any indirect, incidental, or consequential damages arising
              from the use of the Service. Our total liability to you for any claim arising from the
              Service shall not exceed the amount paid by you in the three months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">8. Termination</h2>
            <p className="text-sm">
              Either party may terminate the service relationship at any time. Petal Assist reserves
              the right to suspend or terminate accounts that violate these Terms. Upon termination,
              your access to the Service will cease at the end of the current billing period.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">9. Changes to terms</h2>
            <p className="text-sm">
              We may update these Terms from time to time. We will notify you of material changes by
              email at least 14 days before they take effect. Continued use of the Service after
              changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">10. Governing law</h2>
            <p className="text-sm">
              These Terms are governed by the laws of the State of Delaware, United States, without
              regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-almond-900 mb-3">11. Contact</h2>
            <p className="text-sm">
              For questions about these Terms, contact us at:<br />
              <a href="mailto:hello@petalassist.com" className="text-pink-600 hover:underline">hello@petalassist.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
