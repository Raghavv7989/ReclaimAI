export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Match Detail</h1>
      <p>Match ID: {id}</p>
    </div>
  );
}
