"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}
