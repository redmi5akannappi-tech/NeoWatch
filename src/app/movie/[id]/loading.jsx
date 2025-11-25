export default function Loading() {
  return (
    <div className="p-6 max-w-2xl mx-auto animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>

      <div className="flex justify-center">
        <div className="bg-gray-300 w-64 h-96 rounded-lg"></div>
      </div>

      <div className="h-4 bg-gray-300 mt-6 rounded"></div>
      <div className="h-4 bg-gray-300 mt-2 w-2/3 rounded"></div>
      <div className="h-4 bg-gray-300 mt-2 w-1/2 rounded"></div>
    </div>
  );
}
