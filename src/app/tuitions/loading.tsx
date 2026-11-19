export default function Loading() {
  return (
    <section className="container-x py-14">
      <div className="h-10 w-72 animate-pulse rounded-xl bg-muted" />
      <div className="mt-8 h-40 animate-pulse rounded-3xl bg-muted" />
      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[26rem] animate-pulse rounded-3xl bg-muted" />
        ))}
      </div>
    </section>
  );
}