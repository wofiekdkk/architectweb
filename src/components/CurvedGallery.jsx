import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";

export default function CurvedGallery() {
  const containerRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(260);

  const x = useMotionValue(0);
  // Ultra-snappy spring for touch momentum
  const smoothX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.8 });

  const gap = 16; // spacing between cards

  useLayoutEffect(() => {
    const updateSizes = () => {
      if (!containerRef.current) return;
      const vw = containerRef.current.offsetWidth;
      setViewportWidth(vw);

      // Responsive card sizing
      if (vw < 640) {
        setCardWidth(Math.min(vw * 0.68, 250)); // Mobile: peek left/right cards
      } else if (vw < 1024) {
        setCardWidth(280);
      } else {
        setCardWidth(320); // Desktop
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // Calculate start padding so the 1st card rests perfectly aligned without slicing
  const sidePadding = Math.max(20, (viewportWidth - cardWidth) / 2);
  const totalTrackWidth = projects.length * cardWidth + (projects.length - 1) * gap;
  const maxScroll = Math.max(0, totalTrackWidth - (viewportWidth - sidePadding * 2));

  return (
    <div className="relative w-full py-8 md:py-12 select-none overflow-hidden">
      {/* Side gradient overlays for seamless fading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-8 md:w-20 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-8 md:w-20 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent" />

      <div
        ref={containerRef}
        className="w-full overflow-hidden touch-pan-y"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.15}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          style={{ x }}
          className="flex items-center cursor-grab active:cursor-grabbing py-6 md:py-10"
        >
          {/* Start padding spacer */}
          <div className="shrink-0" style={{ width: sidePadding }} />

          {projects.map((project, i) => (
            <CardItem
              key={project.id}
              project={project}
              index={i}
              x={smoothX}
              cardWidth={cardWidth}
              gap={gap}
              viewportWidth={viewportWidth}
              sidePadding={sidePadding}
            />
          ))}

          {/* End padding spacer */}
          <div className="shrink-0" style={{ width: sidePadding }} />
        </motion.div>
      </div>

      {/* Curved Shadow Base - matching reference design */}
      <div className="pointer-events-none relative z-10 -mt-6 md:-mt-8 flex justify-center">
        <div
          className="h-8 md:h-12 w-[90%] max-w-4xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.03) 50%, transparent 80%)",
            borderRadius: "50%",
            filter: "blur(3px)",
          }}
        />
      </div>

      {/* Touch/Swipe indicator */}
      <div className="mt-2 flex justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}

function CardItem({ project, index, x, cardWidth, gap, viewportWidth, sidePadding }) {
  // Base X position of this card relative to the track start
  const cardOffset = index * (cardWidth + gap);

  // Calculate rotation & Z-depth dynamically as you swipe!
  const rotateY = useTransform(x, (currentX) => {
    if (!viewportWidth) return 0;
    // Current center of this card on screen
    const cardCenter = sidePadding + cardOffset + cardWidth / 2 + currentX;
    const screenCenter = viewportWidth / 2;
    const diff = cardCenter - screenCenter;
    
    // Normalize distance (-1 to 1)
    const norm = Math.max(-1, Math.min(1, diff / (cardWidth * 2)));
    return norm * -16; // 16deg maximum curve angle like the reference
  });

  const translateZ = useTransform(x, (currentX) => {
    if (!viewportWidth) return 0;
    const cardCenter = sidePadding + cardOffset + cardWidth / 2 + currentX;
    const screenCenter = viewportWidth / 2;
    const diff = Math.abs(cardCenter - screenCenter);
    
    const norm = Math.min(1, diff / (cardWidth * 2));
    return -norm * 45; // Depth curve receding back
  });

  const translateY = useTransform(x, (currentX) => {
    if (!viewportWidth) return 0;
    const cardCenter = sidePadding + cardOffset + cardWidth / 2 + currentX;
    const screenCenter = viewportWidth / 2;
    const diff = Math.abs(cardCenter - screenCenter);
    
    const norm = Math.min(1, diff / (cardWidth * 2));
    return norm * 8; // Gentle arc bowl effect
  });

  return (
    <motion.div
      className="shrink-0"
      style={{
        width: cardWidth,
        marginRight: gap,
        rotateY,
        translateZ,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative overflow-hidden bg-gray-200 shadow-xl"
        style={{
          width: cardWidth,
          height: cardWidth * 1.35,
          borderRadius: "3px",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover pointer-events-none"
        />
      </div>
    </motion.div>
  );
}