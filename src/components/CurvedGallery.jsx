import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/projects";

export default function CurvedGallery() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [dragLimits, setDragLimits] = useState({ left: 0, right: 0 });
  const [cardW, setCardW] = useState(320);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 26, mass: 0.55 });

  // Measure cards + set drag bounds so first/last never sit half off-screen
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;

      const vw = viewportRef.current.offsetWidth;
      const isMobile = vw < 768;

      // Card width roughly matches reference proportions
      const nextCardW = isMobile
        ? Math.min(300, vw * 0.72)
        : Math.min(340, vw * 0.26);

      setCardW(nextCardW);

      // Let layout settle then measure full track
      requestAnimationFrame(() => {
        if (!trackRef.current || !viewportRef.current) return;
        const trackWidth = trackRef.current.scrollWidth;
        const viewWidth = viewportRef.current.offsetWidth;
        const maxDrag = Math.max(0, trackWidth - viewWidth);
        setDragLimits({ left: -maxDrag, right: 0 });
      });
    };

    measure();
    const t = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const gap = 14; // px between frames — close like the reference

  return (
    <div className="relative w-full select-none py-6 md:py-10">
      {/* Outer viewport */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        {/* Soft side fades (keeps edges elegant, never harsh crop) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-10 md:w-20 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-10 md:w-20 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent" />

        {/* 3D track */}
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={dragLimits}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 350 }}
          style={{
            x: springX,
            transformStyle: "preserve-3d",
          }}
          className="flex items-center py-8 md:py-12"
          onDrag={(_, info) => {
            x.set(x.get() + info.delta.x);
          }}
        >
          {/* Leading spacer so first card starts fully on-screen */}
          <div className="shrink-0" style={{ width: "max(16px, 6vw)" }} />

          {projects.map((project, i) => {
            // Cylinder math — gentle like the reference (not extreme)
            // Center of the strip is flattest; edges rotate away
            const mid = (projects.length - 1) / 2;
            const offset = i - mid;

            // Reference-style gentle curve
            const rotateY = offset * -11;          // degrees
            const translateZ = -Math.abs(offset) * 38;
            const translateY = Math.abs(offset) * 6;

            return (
              <div
                key={project.id}
                className="shrink-0"
                style={{
                  width: cardW,
                  marginRight: i === projects.length - 1 ? 0 : gap,
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative overflow-hidden bg-gray-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]"
                  style={{
                    width: cardW,
                    height: cardW * 1.35,
                    borderRadius: 2,
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
              </div>
            );
          })}

          {/* Trailing spacer so last card can rest fully on-screen */}
          <div className="shrink-0" style={{ width: "max(16px, 6vw)" }} />
        </motion.div>
      </div>

      {/* Curved white "bowl" shadow under the strip — matches reference */}
      <div className="pointer-events-none relative z-10 -mt-6 md:-mt-8 flex justify-center">
        <div
          className="h-10 md:h-14 w-[94%] max-w-5xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 40%, transparent 72%)",
            borderRadius: "50%",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Drag / swipe hint */}
      <div className="mt-2 flex justify-center md:mt-0">
        <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 md:flex">
          <span>Drag</span>
          <span className="h-px w-6 bg-gray-300" />
          <span>Explore</span>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 md:hidden">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}