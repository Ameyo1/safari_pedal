// // app/gallery/page.tsx (Next.js App Router)
// import { getParkImages } from '@/lib/getImages';

// export default async function GalleryPage() {
//   const images = await getParkImages();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//       {images.map((img) => (
//         <div key={img.id} className="rounded overflow-hidden shadow-lg">
//           <img
//             src={img.imageGallery}
//             alt={img. ?? 'Park image'}
//             className="w-full h-64 object-cover"
//           />
//           {img.name && (
//             <div className="p-2 text-center text-sm text-gray-700">{img.name}</div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
