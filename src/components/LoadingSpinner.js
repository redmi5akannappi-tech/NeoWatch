export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
