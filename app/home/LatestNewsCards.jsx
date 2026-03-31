"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

let globalId = 0;
const makeCard = (imageIndex, slot) => ({
  id: globalId++,
  imageIndex,
  slot,
});

const createInitialCards = (centerIdx, totalImages) => {
  if (totalImages === 0) return [];
  const N = totalImages;
  return [
    makeCard((centerIdx - 2 + N * 100) % N, -2),
    makeCard((centerIdx - 1 + N * 100) % N, -1),
    makeCard(centerIdx % N, 0),
    makeCard((centerIdx + 1) % N, 1),
    makeCard((centerIdx + 2) % N, 2),
  ];
};

export default function LatestNewsCards({ news = [], onActiveIndexChange }) {
  const images = news.filter((item) => item.image?.asset);
  const [cards, setCards] = useState(
    images.length > 0 ? createInitialCards(0, images.length) : [],
  );
  const [centerIdx, setCenterIdx] = useState(0);
  const animatingRef = useRef(false);

  const N = images.length;

  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(centerIdx);
    }
  }, [centerIdx, onActiveIndexChange]);

  if (N === 0) return null;

  const goNext = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;

    const newCenter = (centerIdx + 1) % N;
    const newImageIdx = (newCenter + 2) % N;

    setCards((prev) => {
      const shifted = prev.map((c) => ({ ...c, slot: c.slot - 1 }));
      const filtered = shifted.filter((c) => c.slot >= -2);
      filtered.push(makeCard(newImageIdx, 2));
      return filtered;
    });

    setCenterIdx(newCenter);
    setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [centerIdx, N]);

  const goPrev = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;

    const newCenter = (centerIdx - 1 + N) % N;
    const newImageIdx = (newCenter - 2 + N * 100) % N;

    setCards((prev) => {
      const shifted = prev.map((c) => ({ ...c, slot: c.slot + 1 }));
      const filtered = shifted.filter((c) => c.slot <= 2);
      filtered.push(makeCard(newImageIdx, -2));
      return filtered;
    });

    setCenterIdx(newCenter);
    setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [centerIdx, N]);

  // Handler for clicking on side images
  const handleCardClick = (slot) => {
    if (animatingRef.current) return;
    if (slot === -1) {
      goPrev();
    } else if (slot === 1) {
      goNext();
    }
    // No action for center (slot 0) or hidden slots
  };

  return (
    <div className="relative w-full h-full md:py-[1vw] bg-black overflow-hidden">
      <style>{`
        .card-slot-m2 { transform: translate(calc(-50% - 150vw), -50%) rotateY(45deg) scale(0.6); opacity: 0; z-index: 0; pointer-events: none; }
        .card-slot-m1 { transform: translate(calc(-50% - 38vw), -50%) rotate(-6deg) scale(0.92); opacity: 0.75; z-index: 2; filter: brightness(0.7) blur(2px); cursor: pointer; }
        .card-slot-0  { transform: translate(-50%, -50%) rotateY(0deg) scale(1.08); opacity: 1; z-index: 10; filter: brightness(1); cursor: default;}
        .card-slot-1  { transform: translate(calc(-50% + 38vw), -50%) rotate(6deg) scale(0.92); opacity: 0.75; z-index: 2; filter: brightness(0.7) blur(2px); cursor: pointer; }
        .card-slot-2  { transform: translate(calc(-50% + 150vw), -50%) rotateY(-45deg) scale(0.6); opacity: 0; z-index: 0; pointer-events: none; }
        
        .latest-card {
           width: 55vw;
           height: 70vw;
           border-radius: 3vw;
        }
        @media (min-width: 768px) {
          .card-slot-m2 { transform: translate(calc(-50% - 97vw), -50%) rotateY(45deg) scale(0.6); }
          .card-slot-m1 { transform: translate(calc(-50% - 27vw), -50%) rotate(-5deg) scale(0.92); }
          .card-slot-1  { transform: translate(calc(-50% + 27vw), -50%) rotate(5deg) scale(0.92); }
          .card-slot-2  { transform: translate(calc(-50% + 97vw), -50%) rotateY(-45deg) scale(0.6); }
          .latest-card {
             width: 24vw;
             height: 34vw;
             border-radius: 1.2vw;
          }
        }
        @media (min-width: 1280px) {
          .latest-card {
             width: 22vw;
             height: 32vw;
             border-radius: 1vw;
          }
        }
      `}</style>
      <div
        className="relative w-full h-[75vw] md:h-full"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
      >
        <button
          onClick={goPrev}
          className="absolute left-[1vw] top-1/2 -translate-y-1/2 z-40 w-[12vw] md:w-[60px] h-[12vw] md:h-[60px] flex items-center justify-center text-white"
        >
          <span className="text-[8vw] md:text-3xl font-bold font-sans pb-[1vw] md:pb-1">
            ‹
          </span>
        </button>

        {cards.map((card) => (
          <div
            key={card.id}
            // Only add onClick for left and right images
            onClick={
              card.slot === -1
                ? () => handleCardClick(-1)
                : card.slot === 1
                  ? () => handleCardClick(1)
                  : undefined
            }
            // Add role and tabIndex for accessibility if clickable
            role={card.slot === -1 || card.slot === 1 ? "button" : undefined}
            tabIndex={card.slot === -1 || card.slot === 1 ? 0 : undefined}
            aria-label={
              card.slot === -1
                ? "Previous slide"
                : card.slot === 1
                  ? "Next slide"
                  : undefined
            }
            // Keyboard accessibility for left/right images
            onKeyDown={
              card.slot === -1 || card.slot === 1
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(card.slot);
                    }
                  }
                : undefined
            }
            className={`group latest-card card-slot-${card.slot < 0 ? "m" + Math.abs(card.slot) : card.slot} absolute left-1/2 top-1/2 overflow-hidden`}
            style={{
              transition:
                "transform .75s cubic-bezier(.22,1,.36,1), opacity .5s ease, filter .5s ease",
            }}
          >
            <Image
              src={urlFor(images[card.imageIndex].image).url()}
              alt={`${images[card.imageIndex].title || "Latest News"} | Peckers Halal Chicken Hertfordshire`}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}

        <button
          onClick={goNext}
          className="absolute right-[1vw] top-1/2 -translate-y-1/2 z-40 w-[12vw] md:w-[60px] h-[12vw] md:h-[60px] flex items-center justify-center text-white"
        >
          <span className="text-[8vw] md:text-3xl font-bold font-sans pb-[1vw] md:pb-1">
            ›
          </span>
        </button>
      </div>
    </div>
  );
}
