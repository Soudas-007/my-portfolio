"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScrollytellingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 89;
    const imageSeq = { frame: 0 };

    // Placeholder drawing showing the frame scrubbing
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#FFF9F0"); // var(--color-surface)
      gradient.addColorStop(1, "#F6F1E8"); // var(--color-background)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#3D3B40"; // var(--color-primary)
      ctx.font = "48px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Scrollytelling Canvas`, canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = "24px sans-serif";
      ctx.fillText(`Frame ${Math.round(imageSeq.frame)} of ${frameCount}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText(`(Waiting for WebP assets)`, canvas.width / 2, canvas.height / 2 + 60);
    };

    render();

    // GSAP ScrollTrigger
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 0.5,
        pin: true,
      },
      onUpdate: render,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-surface border-y-4 border-primary">
      <canvas ref={canvasRef} className="w-full h-full object-cover pixelated" />
      
      {/* Parallax Overlay Text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <h2 className="font-pixel text-5xl md:text-7xl text-primary drop-shadow-[4px_4px_0px_#6CC6FF] opacity-50">
          The Journey
        </h2>
      </div>
    </div>
  );
}
