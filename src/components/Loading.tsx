interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}
