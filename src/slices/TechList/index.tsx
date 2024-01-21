'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto overflow-hidden relative"
      style={{ maxWidth: '100vw' }}
    >
      {slice.primary.heading && (
        <h2 className="text-3xl font-bold text-center mb-6">{slice.primary.heading}</h2>
      )}

      <div className="flex whitespace-nowrap slider">
        {slice.items.map((item, index) => (
          <div key={index} className="inline-flex items-center justify-center p-2" style={{ minWidth: '80px' }}>
            {item.tech_image && (
              <Image
                src={item.tech_image.url ?? ''}
                alt={item.tech_image.alt || 'Tech Icon'}
                width={80}
                height={80}
                className="object-contain"
              />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
        .slider {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </section>
  );
};


export default TechList;
