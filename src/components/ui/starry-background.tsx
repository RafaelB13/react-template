// src/components/ui/starry-background.tsx
import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      mousePos.current = { x: clientX, y: clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const { innerWidth, innerHeight } = window;

      // Target position based on mouse, creating parallax effect
      const targetX = (mousePos.current.x / innerWidth - 0.5) * -40; // Increased range for more effect
      const targetY = (mousePos.current.y / innerHeight - 0.5) * -40;

      // Lerp for smooth transition (e.g., move 5% of the distance each frame)
      currentPos.current.x += (targetX - currentPos.current.x) * 0.05;
      currentPos.current.y += (targetY - currentPos.current.y) * 0.05;

      if (svgRef.current) {
        svgRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const stars = [...Array(150)].map((_, i) => ({
    // Increased star count
    key: i,
    cx: Math.random() * 2000,
    cy: Math.random() * 2000,
    r: Math.random() * 0.8 + 0.2, // Slightly larger stars
    animationDelay: `${Math.random() * 10}s`, // Slower twinkle
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-transparent">
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.9; }
          }
          .star {
            animation: twinkle 5s infinite ease-in-out;
          }
        `}
      </style>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 2000 2000"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <rect width="100%" height="100%" fill="transparent" />
        {stars.map((star) => (
          <circle
            key={star.key}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#fff"
            className="star"
            style={{ animationDelay: star.animationDelay }}
          />
        ))}
      </svg>
    </div>
  );
};

export default StarryBackground;
