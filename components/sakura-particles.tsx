"use client";

import { useEffect, useRef } from "react";

export function SakuraParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        // Petal properties
        const particleCount = 18;
        const particles: {
            x: number;
            y: number;
            size: number;
            speed: number;
            sway: number;
            swayOffset: number;
            rotation: number;
            rotationSpeed: number;
            color: string;
        }[] = [];

        const colors = ["#FFB7C5", "#FF9EAA", "#FF6B8B"];

        // Initialize particles scattered across the canvas
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height, // Start scattered
                size: Math.random() * 6 + 4,
                speed: Math.random() * 3 + 2,
                sway: Math.random() * 1 + 0.5,
                swayOffset: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        let lastScrollY = window.scrollY;
        let isScrolling = false;
        let scrollTimeout: NodeJS.Timeout;

        const onScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 50); // "Instant" stop (approx 3 frames)
        };

        window.addEventListener("scroll", onScroll);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p) => {
                if (isScrolling) {
                    p.y += p.speed;
                    p.x += Math.sin(p.swayOffset) * p.sway;
                    p.swayOffset += 0.02;
                    p.rotation += p.rotationSpeed;

                    // Wrap around if out of view
                    if (p.y > height) {
                        p.y = -20;
                        p.x = Math.random() * width;
                    }
                    if (p.x > width) p.x = 0;
                    if (p.x < 0) p.x = width;
                }

                // Draw petal (ellipse)
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.ellipse(
                    p.x,
                    p.y,
                    p.size,
                    p.size * 0.6,
                    p.rotation,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50 w-full h-full"
            style={{ mixBlendMode: "multiply" }}
        />
    );
}
