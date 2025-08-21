'use client'

import Image from "next/image";
import { useState } from "react";

// Types
interface Subcategory {
  title: string;
  description: string;
  image: string;
}

interface Category {
  title: string;
  description: string;
  image: string;
  subcategories?: Subcategory[];
}

export default function EventCategories() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      newSet.has(title) ? newSet.delete(title) : newSet.add(title);
      return newSet;
    });
  };

  const categories: Category[] = [
    {
      title: 'The Vanpool Category',
      description:
        'The Vanpool Category is for participants who prefer not to ride or ride only occasionally. Vanpoolers are guaranteed space on a van at any time we travel from one point to another. Cyclists seeking a break from their bicycles can take turns at vanpooling.',
      image: '/images/h3.jpg',
    },
    {
      title: 'The Noncompetitive Category',
      description:
        'The Noncompetitive Category is designed for those who want to enjoy the experience without the pressure of competition. It’s all about camaraderie and shared adventure.',
      image: '/images/h2.jpg',
    },
    {
      title: 'The Race/Competitive Category',
      description:
        'The Race/Competitive Category is for those who thrive on competition and seek to push their limits. It’s about challenging yourself and achieving new personal bests. Whenever there is no scheduled race, all participants default to the two remaining categories: the noncompetitive and the vanpool.',
      image: '/images/h1.jpg',
      subcategories: [
        {
          title: 'City Circuit Races',
          description:
            'The circuit can be around a portion of a city or municipality we visit. Such settings are geared at engagement of locals so they share in the experience.',
          image: '/images/h4.jpg',
        },
        {
          title: 'Open Road Challenges',
          description: 'Long-distance races on designated safe stretches of open road.',
          image: '/images/h4.jpg',
        },
      ],
    },
    {
      title: 'Competitive Race SubCategories',
      description:
        'The two main divisions within the race category are off-road and on paved-road:',
      image: '/images/h1.jpg',
      subcategories: [
        {
          title: 'The Offroad Subcategory',
          description:
            'Includes mountain biking and considers other subcategories for offroad inclusion if compelling cases are made for their addition.',
          image: '/images/h1.jpg',
        },
        {
          title: 'The On-Paved-Road Subcategory',
          description:
            'Takes place on paved / tarred roads, with divisions to distinguish between bicycles with differing mechanical advantages.',
          image: '/images/h1.jpg',
        },
      ],
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Pedal Safari Events Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="bg-white-500 p-6 rounded-lg shadow hover:shadow-md transition">
            <Image
              src={category.image}
              alt={category.title}
              width={300}
              height={150}
              className="object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-lg text-gray-700 mb-4">{category.description}</p>

            {category.subcategories && (
              <>
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="text-blue-600 hover:underline text-sm mb-2"
                  aria-expanded={expandedCategories.has(category.title)}
                >
                  {expandedCategories.has(category.title) ? 'Hide Subcategories' : 'Show Subcategories'}
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedCategories.has(category.title)
                      ? 'max-h-[2000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4 mt-4">
                    {category.subcategories.map((sub) => (
                      <div key={sub.title} className="bg-gray-100 p-3 rounded flex flex-col items-center">
                        <Image
                          src={sub.image}
                          alt={sub.title}
                          width={200}
                          height={150}
                          className="object-cover rounded mb-2"
                        />
                        <h4 className="text-md font-semibold">{sub.title}</h4>
                        <p className="text-sm text-gray-600 text-center">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
