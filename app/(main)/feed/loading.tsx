// ⚠️ Server Component فقط، مفيش "use client" هنا
export default function LoadingFeed() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-2xl shadow-md p-4 space-y-4 animate-pulse"
        >
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-600 rounded w-1/2" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="h-48 bg-gray-800 rounded-lg mt-2" />
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-2">
            <div className="h-8 w-20 bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
