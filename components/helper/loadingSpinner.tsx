// export default function LoadingSpinner({ text = "Loading..." }) {
//   return (
//     <p className="text-center text-gray-600 animate-pulse">{text}</p>
//   );
// }

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
