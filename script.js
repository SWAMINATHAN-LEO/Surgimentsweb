document.addEventListener("DOMContentLoaded", () => {

    const localAIBrainFallback = {
        "neuro": "Our skull base sets utilize lightweight non-glare high passivation alloy templates.",
        "cardio": "Sternal assemblies undergo specialized micro-polishing for smooth intraoperative adjustments.",
        "ortho": "Titanium line components offer exceptional structural rigidity under high torque limits."
    };

    const anatomyPreloadedDatabase = {
        "head": [
            { name: "Micro-Neuro Instruments Kit", sku: "SKU-MN-992", specialty: "Neurosurgery Cranial Open Access" },
            { name: "Cushing Scalp Retractors", sku: "SKU-CR-102", specialty: "Neurological Hemostasis Processing" },
            { name: "Yasargil Micro-Scissors (Curved)", sku: "SKU-YS-551", specialty: "Microsurgical Tissue Dissection" }
        ],
        "torso": [
            { name: "DeBakey Vascular Tissue Forceps", sku: "SKU-DB-440", specialty: "Cardiovascular/Thoracic Surgery" },
            { name: "Finochietto Rib Spreader Series", sku: "SKU-FR-881", specialty: "Internal Thoracic Sternal Access" },
            { name: "Metzenbaum Precision Dissecting Scissors", sku: "SKU-MS-220", specialty: "General Laparotomy Soft Tissue" }
        ],
        "extremities": [
            { name: "Charnley Orthopedic Bone Retractors", sku: "SKU-CO-311", specialty: "Lower Extremity Arthroplasty" },
            { name: "Liston Bone Cutting Pliers", sku: "SKU-LB-095", specialty: "Orthopedic Structural Trauma Repair" },
            { name: "Kirschner Tension Wire Drivers", sku: "SKU-KW-712", specialty: "Extremity Skeletal Stabilization" }
        ]
    };

    // --- 1. SAFE CHICKEN-EXIT SCROLL REVEALS ---
    try {
        const revealElements = document.querySelectorAll(".scroll-trigger-reveal");
        if (revealElements.length > 0 && 'IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-active");
                    }
                });
            }, { threshold: 0.01, rootMargin: "0px 0px -50px 0px" });
            revealElements.forEach(element => revealObserver.observe(element));
        } else {
            document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active"));
        }
    } catch (e) {
        document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active"));
    }

    // --- 2. SMOOTH STACK STEPPING CONTROLLER ---
    try {
        const deckCards = document.querySelectorAll(".portfolio-deck-card");
        
        deckCards.forEach(card => {
            const currentIdx = parseInt(card.getAttribute("data-card-idx"), 10);
            
            card.addEventListener("mouseenter", () => {
                if (window.innerWidth < 993) return;
                deckCards.forEach((c, index) => {
                    if (index === currentIdx) {
                        c.style.transform = "translateZ(30px) scale(1.03)";
                        c.style.opacity = "1";
                        c.style.zIndex = "50";
                    } else if (index < currentIdx) {
                        const multiplier = currentIdx - index;
                        c.style.transform = `translateX(${40 + (multiplier * 15)}px) translateZ(-${multiplier * 20}px) scale(0.92)`;
                        c.style.opacity = "0.3"; 
                        c.style.zIndex = `${30 - multiplier}`;
                    } else {
                        const multiplier = index - currentIdx;
                        c.style.transform = `translateX(-${40 + (multiplier * 15)}px) translateZ(-${multiplier * 20}px) scale(0.92)`;
                        c.style.opacity = "0.3";
                        c.style.zIndex = `${30 - multiplier}`;
                    }
                });
            });

            card.addEventListener("mouseleave", () => {
                if (window.innerWidth < 993) return;
                deckCards.forEach(c => {
                    c.style.transform = "translateX(0px) translateZ(0px) scale(1)";
                    c.style.opacity = "1";
                    c.style.zIndex = "10";
                });
            });
        });
    } catch (e) { console.error(e); }

    // --- 3. LIVELY TESTIMONIAL MEDIA SCAN ENGINE ---
    try {
        const testimonialPlay = document.getElementById("testimonial-play-trigger");
        const testimonialFrame = document.querySelector(".video-mockup-frame");
        if (testimonialPlay && testimonialFrame) {
            testimonialPlay.addEventListener("click", () => {
                testimonialFrame.classList.toggle("scan-active-shimmer");
            });
        }
    } catch(e) { console.error(e); }

    // --- 4. REVIEWS TESTIMONIAL SWIPER ENGINE ---
    let activeReviewIdx = 0;
    let reviewsInterval = null;
    const reviewDots = document.querySelectorAll("#reviews-dots-container .review-dot");
    const countTotalReviews = reviewDots.length;
    const reviewsTrack = document.getElementById("reviews-dynamic-track");

    function renderActiveReview(index) {
        activeReviewIdx = (index + countTotalReviews) % countTotalReviews;
        const offsetWidthTrack = -activeReviewIdx * 100;
        if (reviewsTrack) reviewsTrack.style.transform = `translateX(${offsetWidthTrack}%)`;
        reviewDots.forEach((dot, idx) => {
            if(idx === activeReviewIdx) dot.classList.add("active");
            else dot.classList.remove("active");
        });
    }

    try {
        const reviewsContainer = document.querySelector(".reviews-slider-container");
        const reviewPrev = document.getElementById("review-prev-btn");
        const reviewNext = document.getElementById("review-next-btn");

        if(reviewPrev) reviewPrev.addEventListener("click", () => { renderActiveReview(activeReviewIdx - 1); resetReviewTimer(); });
        if(reviewNext) reviewNext.addEventListener("click", () => { renderActiveReview(activeReviewIdx + 1); resetReviewTimer(); });

        reviewDots.forEach(dot => {
            dot.addEventListener("click", () => {
                renderActiveReview(parseInt(dot.getAttribute("data-review-idx"), 10));
                resetReviewTimer();
            });
        });

        let touchStartReviewX = 0;
        if (reviewsContainer) {
            reviewsContainer.addEventListener("touchstart", (e) => {
                touchStartReviewX = e.touches[0].clientX;
                clearInterval(reviewsInterval);
            }, { passive: true });

            reviewsContainer.addEventListener("touchend", (e) => {
                const swipeDistance = touchStartReviewX - e.changedTouches[0].clientX;
                if (Math.abs(swipeDistance) > 50) {
                    if (swipeDistance > 0) renderActiveReview(activeReviewIdx + 1);
                    else renderActiveReview(activeReviewIdx - 1);
                }
                startReviewTimer();
            });
        }

        function startReviewTimer() {
            reviewsInterval = setInterval(() => { renderActiveReview(activeReviewIdx + 1); }, 4000);
        }
        function resetReviewTimer() { clearInterval(reviewsInterval); startReviewTimer(); }
        startReviewTimer();
    } catch (e) { console.error(e); }

    // --- 5. HERO SLIDER LOGISTICS ENGINE ---
    let currentSlideIndex = 0;
    let autoCycleTimer = null;
    const beads = document.querySelectorAll("#slider-pagination-container .bead");
    const countTotalSlides = beads.length;
    const sliderWrapper = document.getElementById("hero-slider-wrapper");

    function renderActiveSlide(index) {
        currentSlideIndex = (index + countTotalSlides) % countTotalSlides;
        const offsetTrack = -currentSlideIndex * 100;
        if (sliderWrapper) {
            sliderWrapper.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            sliderWrapper.style.transform = `translateX(${offsetTrack}%)`;
        }
        beads.forEach((bead, idx) => {
            if(idx === currentSlideIndex) bead.classList.add("active");
            else bead.classList.remove("active");
        });
    }

    function initAutoCycle() {
        clearInterval(autoCycleTimer);
        autoCycleTimer = setInterval(() => { renderActiveSlide(currentSlideIndex + 1); }, 8000);
    }

    try {
        const sliderViewport = document.getElementById("hero-draggable-viewport");
        let activeDragMode = false;
        let initialCursorPositionX = 0;
        let cumulativeTransformX = 0;

        if(sliderViewport && sliderWrapper) {
            sliderViewport.addEventListener("mousedown", (e) => {
                activeDragMode = true;
                clearInterval(autoCycleTimer);
                sliderWrapper.style.transition = "none";
                initialCursorPositionX = e.clientX;
                cumulativeTransformX = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapper).transform).m41;
                sliderViewport.style.cursor = "grabbing";
            });
            window.addEventListener("mousemove", (e) => {
                if (!activeDragMode) return;
                sliderWrapper.style.transform = `translateX(${cumulativeTransformX + (e.clientX - initialCursorPositionX)}px)`;
            });
            window.addEventListener("mouseup", (e) => {
                if (!activeDragMode) return;
                activeDragMode = false;
                sliderViewport.style.cursor = "grab";
                const displacementX = e.clientX - initialCursorPositionX;
                if (Math.abs(displacementX) > sliderViewport.offsetWidth * 0.15) {
                    if (displacementX > 0) renderActiveSlide(currentSlideIndex - 1);
                    else renderActiveSlide(currentSlideIndex + 1);
                } else { renderActiveSlide(currentSlideIndex); }
                initAutoCycle();
            });

            sliderViewport.addEventListener("touchstart", (e) => {
                clearInterval(autoCycleTimer);
                activeDragMode = true;
                sliderWrapper.style.transition = "none";
                initialCursorPositionX = e.touches[0].clientX;
                cumulativeTransformX = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapper).transform).m41;
            }, { passive: true });
            sliderViewport.addEventListener("touchmove", (e) => {
                if (!activeDragMode) return;
                sliderWrapper.style.transform = `translateX(${cumulativeTransformX + (e.touches[0].clientX - initialCursorPositionX)}px)`;
            }, { passive: true });
            sliderViewport.addEventListener("touchend", (e) => {
                if (!activeDragMode) return;
                activeDragMode = false;
                const displacementX = e.changedTouches[0].clientX - initialCursorPositionX;
                if (Math.abs(displacementX) > sliderViewport.offsetWidth * 0.15) {
                    if (displacementX > 0) renderActiveSlide(currentSlideIndex - 1);
                    else renderActiveSlide(currentSlideIndex + 1);
                } else { renderActiveSlide(currentSlideIndex); }
                initAutoCycle();
            });

            beads.forEach(bead => {
                bead.addEventListener("click", () => {
                    renderActiveSlide(parseInt(bead.getAttribute("data-slide-index"), 10));
                    initAutoCycle();
                });
            });
            initAutoCycle();
        }
    } catch (e) { console.error(e); }

    // --- SMARTPHONE INTERACTIVE MOBILE HEADER MENU DRIVER ---
    const menuToggleBtn = document.getElementById("mobile-hamburger-btn");
    const navigationMenu = document.getElementById("main-navigation-menu");
    if (menuToggleBtn && navigationMenu) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navigationMenu.classList.toggle("mobile-menu-expanded");
        });
    }

    // --- PURE SMOOTH-SCROLL EVENT INTERCEPTOR ---
    document.querySelectorAll('a[href="#home"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- GLOBAL WINDOW-BOUND ARROW KEYBOARD ROUTING PIPELINE ---
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            const reviewBounding = document.getElementById("testimonials").getBoundingClientRect();
            if (reviewBounding.top < window.innerHeight && reviewBounding.bottom > 0) {
                renderActiveReview(activeReviewIdx - 1);
                resetReviewTimer();
            } else {
                renderActiveSlide(currentSlideIndex - 1);
                initAutoCycle();
            }
        } 
        else if (e.key === "ArrowRight") {
            const reviewBounding = document.getElementById("testimonials").getBoundingClientRect();
            if (reviewBounding.top < window.innerHeight && reviewBounding.bottom > 0) {
                renderActiveReview(activeReviewIdx + 1);
                resetReviewTimer();
            } else {
                renderActiveSlide(currentSlideIndex + 1);
                initAutoCycle();
            }
        }
    });

    // --- HARDENED VIDEO AUTO-PLAYBACK ENGINE ---
    const promoVid = document.getElementById("hero-promo-video");
    if (promoVid) {
        promoVid.muted = true;
        promoVid.setAttribute('muted', '');
        promoVid.setAttribute('playsinline', '');
        
        const triggerVideoPlayback = () => {
            let playPromise = promoVid.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    promoVid.muted = true;
                    promoVid.play();
                });
            }
        };

        if (promoVid.readyState >= 1) {
            triggerVideoPlayback();
        } else {
            promoVid.addEventListener('loadedmetadata', triggerVideoPlayback);
            promoVid.addEventListener('canplay', triggerVideoPlayback);
        }
    }

    // --- 6. THE "LASER-SCAN" BLUEPRINT SWEEP ---
    try {
        const hotspots = document.querySelectorAll(".anatomy-svg-hotspot");
        const fetchTarget = document.getElementById("anatomy-fetch-target");
        const label = document.getElementById("anatomy-ui-marker");
        const laserLine = document.getElementById("blueprint-laser-scan-line");

        hotspots.forEach(spot => {
            spot.addEventListener("mouseenter", (e) => { if (label) label.innerText = e.target.getAttribute("data-anatomy-region").toUpperCase(); });
            spot.addEventListener("mouseleave", () => { if (label) label.innerText = "Select Structural Node"; });
            
            spot.addEventListener("click", async (e) => {
                hotspots.forEach(h => h.classList.remove("active-node"));
                e.target.classList.add("active-node");
                const region = e.target.getAttribute("data-anatomy-region");
                if (label) label.innerText = region.toUpperCase();

                if (laserLine) {
                    laserLine.classList.remove("run-laser-sweep");
                    void laserLine.offsetWidth; 
                    laserLine.classList.add("run-laser-sweep");
                }

                if (fetchTarget) {
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Scanning local database...</div>`;
                    
                    let deviceSpecificationsArray = [];
                    try {
                        const res = await fetch(`http://127.0.0.1:8000/api/instruments/?anatomy=${region}`);
                        if (!res.ok) throw new Error();
                        deviceSpecificationsArray = await res.json();
                    } catch (err) {
                        deviceSpecificationsArray = anatomyPreloadedDatabase[region] || [];
                    }

                    fetchTarget.innerHTML = "";
                    deviceSpecificationsArray.forEach((item, index) => {
                        const cardContainerNode = document.createElement("div");
                        cardContainerNode.className = "instrument-item diagnostic-card-hidden";
                        cardContainerNode.innerHTML = `
                            <h5>${item.name} (${item.sku})</h5>
                            <p>${item.specialty}</p>
                            <span class="cached-badge"><i class="fas fa-microchip"></i> Scan Verified</span>
                        `;
                        fetchTarget.appendChild(cardContainerNode);

                        setTimeout(() => {
                            cardContainerNode.classList.remove("diagnostic-card-hidden");
                            cardContainerNode.classList.add("diagnostic-card-revealed");
                        }, index * 100);
                    });
                }
            });
        });
    } catch (e) { console.error("Anatomical matrix fault isolated:", e); }

    // --- 7. CLEANROOM PASSIVATION CHAMBER PARTICLES BACKGROUND ---
    try {
        const fluidCanvas = document.getElementById("cleanroom-passivation-canvas");
        if (fluidCanvas) {
            const ctx = fluidCanvas.getContext("2d");
            if (ctx) {
                let activeNodesArray = [];
                let cursorTrackingPointer = { x: null, y: null, currentRadius: 100 };

                const resizeCanvasViewport = () => {
                    fluidCanvas.width = window.innerWidth;
                    fluidCanvas.height = window.innerHeight;
                };
                window.addEventListener("resize", resizeCanvasViewport);
                resizeCanvasViewport();

                window.addEventListener("mousemove", (e) => {
                    cursorTrackingPointer.x = e.clientX;
                    cursorTrackingPointer.y = e.clientY;
                });

                class CleanroomNodeParticle {
                    constructor() {
                        this.x = Math.random() * fluidCanvas.width;
                        this.y = Math.random() * fluidCanvas.height;
                        this.velocityHorizontal = (Math.random() - 0.5) * 0.4;
                        this.velocityVertical = (Math.random() - 0.5) * 0.4;
                        this.baseSize = Math.random() * 2 + 1;
                    }
                    render() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(11, 34, 68, 0.04)";
                        ctx.fill();
                    }
                    reposition() {
                        if (this.x > fluidCanvas.width || this.x < 0) this.velocityHorizontal = -this.velocityHorizontal;
                        if (this.y > fluidCanvas.height || this.y < 0) this.velocityVertical = -this.velocityVertical;
                        this.x += this.velocityHorizontal;
                        this.y += this.velocityVertical;
                    }
                }

                for (let i = 0; i < 40; i++) {
                    activeNodesArray.push(new CleanroomNodeParticle());
                }

                const operationalRenderLoop = () => {
                    ctx.clearRect(0, 0, fluidCanvas.width, fluidCanvas.height);
                    activeNodesArray.forEach(node => {
                        node.reposition();
                        node.render();
                    });
                    requestAnimationFrame(operationalRenderLoop);
                };
                operationalRenderLoop();
            }
        }
    } catch(canvasErr) { console.warn(canvasErr); }
});
