export default async function PublicItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Item</h1>
      <p>Item ID: {id}</p>
    </div>
  );
}
