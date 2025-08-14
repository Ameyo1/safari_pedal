// 'use client';

// import { useRouter } from 'next/navigation';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';

// export default function MapEmbed() {
//   const router = useRouter();
//   const [geoData, setGeoData] = useState(null);

//   useEffect(() => {
//     // Load simplified GeoJSON for East Africa
//     fetch('/geo/east-africa.json')
//       .then((res) => res.json())
//       .then(setGeoData);
//   }, []);

//   const onRegionClick = (e: any) => {
//     const region = e.layer.feature.properties.name.toLowerCase();
//     router.push(`/tours?region=${region}`);
//   };

//   return (
//     <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
//       <MapContainer center={[0.5, 34.5]} zoom={5} style={{ height: '100%', width: '100%' }}>
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {geoData && (
//           <GeoJSON
//             data={geoData}
//             onEachFeature={(feature, layer) => {
//               layer.on({ click: onRegionClick });
//               layer.bindTooltip(feature.properties.name, { permanent: false });
//               layer.setStyle({
//                 color: '#2c3e50',
//                 weight: 2,
//                 fillOpacity: 0.3,
//               });
//             }}
//           />
//         )}
//       </MapContainer>
//     </div>
//   );
// }
