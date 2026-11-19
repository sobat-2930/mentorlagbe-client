export default function Loading() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <span className="loading loading-ring loading-lg text-primary" />
        <p className="mt-3 font-display text-lg text-primary">Loading MentorLagbe…</p>
      </div>
    </div>
  );
}