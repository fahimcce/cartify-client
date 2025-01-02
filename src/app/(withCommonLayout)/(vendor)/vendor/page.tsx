export default function VendorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md w-11/12 max-w-lg">
        <h1 className="text-xl font-semibold">Warning</h1>
        <p className="mt-2">
          A vendor can only operate one shop. If you already have a shop, please
          do not attempt to create another.
        </p>
      </div>
    </div>
  );
}
