import VerifyPayment from "@/components/pricing/VerifyPayment";

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function PaymentSuccess({ searchParams }: Props) {
  const { session_id } = await searchParams;
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-16">
      <VerifyPayment sessionId={session_id} />
    </div>
  );
}