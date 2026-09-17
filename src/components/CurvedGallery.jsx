import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { projects } from "../data/projects";

export default function CurvedGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 28, mass: 0.6 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const trackW = trackRef.current.scrollWidth;
      // Keep first & last cards fully inside the viewport with side padding
      const maxDrag = Math.max(0, trackW - containerW);
      setConstraints({ left: -maxDrag, right: 0 });
      // Start slightly inset so half of first image is never off-screen
      x.set(0);
    };

    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [x]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 md:py-16 select-none"
      style={{
        perspective: isMobile ? "900px" : "1400px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Soft edge fades so cards never look cut off */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 z-20 bg-gradient-to-r from-[#fafafa] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 z-20 bg-gradient-to-l from-[#fafafa] to-transparent" />

      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={isMobile ? 0.18 : 0.08}
        dragTransition={{ bounceStiffness: 180, bounceDamping: 22 }}
        style={{ x: springX }}
        onDrag={(_, info) => x.set(x.get() + info.delta.x)}
        className="flex items-center gap-3 md:gap-5 px-6 md:px-[12vw] cursor-grab active:cursor-grabbing"
        style={{
          x: springX,
          transformStyle: "preserve-3d",
        }}
      >
        {projects.map((project, i) => (
          <GalleryCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            x={springX}
            containerRef={containerRef}
            isMobile={isMobile}
          />
        ))}
      </motion.div>

      {/* Mobile swipe hint */}
      <div className="md:hidden flex justify-center mt-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}

function GalleryCard({ project, index, total, x, containerRef, isMobile }) {
  const cardRef = useRef(null);
  const [centerOffset, setCenterOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!cardRef.current || !containerRef.current) return;
      const cardBox = cardRef.current.getBoundingClientRect();
      const containerBox = containerRef.current.getBoundingClientRect();
      const cardCenter = cardBox.left + cardBox.width / 2;
      const containerCenter = containerBox.left + containerBox.width / 2;
      setCenterOffset(cardCenter - containerCenter);
    };
    update();
    const unsub = x.on("change", update);
    window.addEventListener("resize", update);
    return () => {
      unsub();
      window.removeEventListener("resize", update);
    };
  }, [x, containerRef]);

  // Map distance from center → 3D transforms
  // Mobile = crazier curve / depth / tilt
  const maxRot = isMobile ? 42 : 18;
  const maxZ = isMobile ? 160 : 70;
  const maxY = isMobile ? 28 : 10;
  const range = isMobile ? 280 : 420;

  const rotateY = useTransform(x, () => {
    const d = centerOffset;
    const t = Math.max(-1, Math.min(1, d / range));
    return t * -maxRot;
  });

  const translateZ = useTransform(x, () => {
    const d = Math.abs(centerOffset);
    const t = Math.min(1, d / range);
    return -t * maxZ;
  });

  const translateY = useTransform(x, () => {
    const d = Math.abs(centerOffset);
    const t = Math.min(1, d / range);
    return t * maxY;
  });

  const scale = useTransform(x, () => {
    const d = Math.abs(centerOffset);
    const t = Math.min(1, d / range);
    return isMobile ? 1 - t * 0.18 : 1 - t * 0.08;
  });

  const brightness = useTransform(x, () => {
    const d = Math.abs(centerOffset);
    const t = Math.min(1, d / range);
    return 1 - t * (isMobile ? 0.35 : 0.15);
  });

  return (
    <motion.div
      ref={cardRef}
      className="relative shrink-0 w-[78vw] sm:w-[55vw] md:w-[28vw] min-w-[260px] max-w-[420px] h-[52vh] min-h-[340px] max-h-[520px] rounded-sm overflow-hidden shadow-2xl bg-gray-200"
      style={{
        rotateY,
        translateZ,
        y: translateY,
        scale,
        transformStyle: "preserve-3d",
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        WebkitFilter: useTransform(brightness, (b) => `brightness(${b})`),
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />
      {/* subtle inner vignette for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/5" />
    </motion.div>
  );
}