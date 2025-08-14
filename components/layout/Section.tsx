// components/layout/Section.tsx
import { ReactNode } from 'react';
import clsx from 'clsx';

type SectionProps = {
  children: ReactNode;
  className?: string;
  center?: boolean;
  bg?: 'white' | 'gray' | 'yellow' | 'transparent';
  id?: string;
};

export default function Section({
  children,
  className,
  center = false,
  bg = 'white',
  id,
}: SectionProps) {
  const bgClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    yellow: 'bg-yellow-50',
    transparent: 'bg-transparent',
  }[bg];

  return (
    <section
      id={id}
      className={clsx(
        'py-16 px-4 sm:px-6 lg:px-8',
        bgClass,
        center && 'text-center',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
