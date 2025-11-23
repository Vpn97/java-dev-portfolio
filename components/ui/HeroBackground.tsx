"use client";
"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const HeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: 0, y: 0 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        resizeCanvas();

        // Code symbols to draw
        const symbols = ["{ }", "< >", "/>", ";", "//", "&&", "||", "=>", "[]"];
        const hexChars = ["0", "1", "A", "B", "C", "D", "E", "F"];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            text: string;
            color: string;
            alpha: number;
            targetAlpha: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 14 + 10;

                // Randomly choose between a symbol or a hex char
                if (Math.random() > 0.5) {
                    this.text = symbols[Math.floor(Math.random() * symbols.length)];
                } else {
                    this.text = hexChars[Math.floor(Math.random() * hexChars.length)];
                }

                this.alpha = Math.random() * 0.5;
                this.targetAlpha = Math.random() * 0.5;

                // Colors based on theme
                const colors = isDark
                    ? ["#3B82F6", "#8B5CF6", "#06B6D4", "#64748B"] // Light/Bright colors for dark bg
                    : ["#2563EB", "#7C3AED", "#0891B2", "#475569"]; // Darker colors for light bg
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;

                // Mouse interaction (glow effect)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    this.alpha = Math.min(1, this.alpha + 0.02);
                } else {
                    this.alpha += (this.targetAlpha - this.alpha) * 0.05;
                }

                // Randomly change target alpha for twinkling effect
                if (Math.random() < 0.01) {
                    this.targetAlpha = Math.random() * 0.5;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.font = `${this.size}px monospace`;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fillText(this.text, this.x, this.y);
                ctx.globalAlpha = 1.0;
            }
        }

        const init = () => {
            particles = [];
            const particleCount = Math.min(100, (canvas.width * canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            // Clear with a slight fade for trail effect
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connecting lines for nearby particles
            particles.forEach((a, index) => {
                a.update();
                a.draw();

                // Connect particles
                for (let i = index + 1; i < particles.length; i++) {
                    const b = particles[i];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = a.color;
                        ctx.globalAlpha = (1 - distance / 150) * 0.15; // Faint lines
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-slate-200 dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#020617] transition-colors duration-500"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            {/* Canvas for Particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default HeroBackground;
