/**
 * Surgiments Advanced Cinematic Interaction Engine
 * Handles Cleanroom Canvas Particles, Blueprint Lasers, and Parallax Shards
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CLEANROOM PASSIVATION FLUID CANVAS BACKGROUND ---
    try {
        const passivationCanvas = document.getElementById("cleanroom-passivation-canvas");
        if (passivationCanvas) {
            const ctx = passivationCanvas.getContext("2d");
            if (ctx) {
                let particleArray = [];
                let mousePointer = { x: null, y: null, activeRadius: 120 };

                const maximizeCanvasArea = () => {
                    passivationCanvas.width = window.innerWidth;
                    passivationCanvas.height = window.innerHeight;
                };
                window.addEventListener("resize", maximizeCanvasArea);
                maximizeCanvasArea();

                window.addEventListener("mousemove", (e) => {
                    mousePointer.x = e.clientX;
                    mousePointer.y = e.clientY;
                });
                window.addEventListener("mouseleave", () => {
                    mousePointer.x = null;
                    mousePointer.y = null;
                });

                class CleanroomParticle {
                    constructor() {
                        this.x = Math.random() * passivationCanvas.width;
                        this.y = Math.random() * passivationCanvas.height;
                        this.speedX = (Math.random() - 0.5) * 0.35;
                        this.speedY = (Math.random() - 0.5) * 0.35;
                        this.radius = Math.random() * 2 + 1;
                    }
                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(11, 34, 68, 0.05)";
                        ctx.fill();
                    }
                    update() {
                        if (this.x > passivationCanvas.width || this.x < 0) this.speedX = -this.speedX;
                        if (this.y > passivationCanvas.height || this.y < 0) this.speedY = -this.speedY;

                        if (mousePointer.x !== null && mousePointer.y !== null) {
                            let dx = this.x - mousePointer.x;
                            let dy = this.y - mousePointer.y;
                            let distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < mousePointer.activeRadius) {
                                let angle = Math.atan2(dy, dx);
                                let force = (mousePointer.activeRadius - distance) / mousePointer.activeRadius;
                                this.x += Math.cos(angle) * force * 2;
                                this.y += Math.sin(angle) * force * 2;
                            }
                        }
                        this.x += this.speedX;
                        this.y += this.speedY;
                    }
                }

                for (let i = 0; i < 50; i++) {
                    particleArray.push(new CleanroomParticle());
                }

                const animateFluidPassivation = () => {
                    ctx.clearRect(0, 0, passivationCanvas.width, passivationCanvas.height);
                    particleArray.forEach(p => {
                        p.update();
                        p.draw();
                    });
                    requestAnimationFrame(animateFluidPassivation);
                };
                animateFluidPassivation();
            }
        }
    } catch(err) { console.warn(err); }

    // --- 2. CRYSTALLINE GLASS SHARD PARALLAX DEPTH MATRIX ---
    try {
        window.addEventListener("mousemove", (e) => {
            if (window.innerWidth < 992) return;
            const offsetX = (e.clientX / window.innerWidth) - 0.5;
            const offsetY = (e.clientY / window.innerHeight) - 0.5;

            const leftShard = document.getElementById("parallax-shard-left");
            const rightShard = document.getElementById("parallax-shard-right");

            if (leftShard) leftShard.style.transform = `translate3d(${offsetX * -20}px, ${offsetY * -12}px, 0px)`;
            if (rightShard) rightShard.style.transform = `translate3d(${offsetX * 25}px, ${offsetY * 18}px, 0px)`;
        });
    } catch(e) { console.error(e); }

    // --- 3. HARDWARE-ACCELERATED FIGMA MAGNETIC TRACKING TARGETS ---
    try {
        const interactiveButtons = document.querySelectorAll(".unique-figma-magnetic, .slider-arrow-btn, #chatbot-icon");
        interactiveButtons.forEach(btn => {
            btn.addEventListener("mouseenter", () => {
                btn.style.transition = "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s";
            });
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0px) scale(1.02)`;
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s";
                btn.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
            });
        });
    } catch(e) { console.error(e); }
});
