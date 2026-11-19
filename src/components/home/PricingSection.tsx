import PricingPlans from "@/components/pricing/PricingPlans";

export default function PricingSection() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="mb-10 text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title mt-4">Simple plans, no surprises</h2>
          <p className="section-sub mx-auto">Start free. Upgrade to Pro whenever you want more.</p>
        </div>
        <PricingPlans />
      </div>
    </section>
  );
}