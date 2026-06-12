export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Item Detail</h1>
      <p>Item ID: {id}</p>
    </div>
  );
}
