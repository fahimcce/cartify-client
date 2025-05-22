export default function SkeletonFeatureCard() {
  return (
    <div className="p-4">
      <div className="rounded-lg shadow-md bg-gray-200 animate-pulse">
        <div className="h-32 bg-gray-300 rounded-t-md" />
        <div className="p-2">
          <div className="h-4 bg-gray-300 rounded-md mb-2" />
          <div className="h-4 bg-gray-300 rounded-md w-3/4" />
        </div>
      </div>
    </div>
  );
}
