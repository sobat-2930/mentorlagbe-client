import PricingPlans from "@/components/pricing/PricingPlans";

export const metadata = { title: "Pricing — MentorLagbe" };

const faqs = [
  { q: "Is the Pro plan a monthly subscription?", a: "Pro is a one-time upgrade for your account. Pay once through Stripe and enjoy Pro features." },
  { q: "How many tuitions can a free tutor post?", a: "Free tutors can post up to 2 tuitions. Pro tutors can post unlimited tuitions." },
  { q: "Is my payment secure?", a: "Yes. Payments are processed by Stripe. We never store your card details." },
  { q: "When does my plan become Pro?", a: "Right after a successful payment. Your account is upgraded automatically." },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/60 py-14 text-center">
        <div className="container-x">
          <span className="eyebrow">Pricing</span>
          <h1 className="section-title mt-4">Choose the plan that fits you</h1>
          <p className="section-sub mx-auto">Free for everyone. Upgrade to Pro for priority and unlimited posting.</p>
        </div>
      </section>

      <section className="container-x py-16">
        <PricingPlans />
      </section>

      <section className="container-x pb-24">
        <h2 className="section-title text-center">Frequently asked questions</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="paper-card group p-5">
              <summary className="cursor-pointer list-none font-semibold text-primary">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}