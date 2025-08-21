export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <p className="text-center text-gray-600 animate-pulse">{text}</p>
  );
}
