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

    // --- 1. INTERACTIVE CLEANROOM PASSIVATION CANVASES FRAMEWORK ---
    const fluidCanvas = document.getElementById("cleanroom-passivation-canvas");
    if (fluidCanvas && window.innerWidth > 768) {
        const ctx = fluidCanvas.getContext("2d");
        let activeNodesArray = [];
        let cursorTrackingPointer = { x: null, y: null, currentRadius: 90 };

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
        window.addEventListener("mouseleave", () => {
            cursorTrackingPointer.x = null;
            cursorTrackingPointer.y = null;
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
                // Bounds enforcement checks
                if (this.x > fluidCanvas.width || this.x < 0) this.velocityHorizontal = -this.velocityHorizontal;
                if (this.y > fluidCanvas.height || this.y < 0) this.velocityVertical = -this.velocityVertical;

                // Mouse force field physics (Warp nodes away when cursor triggers proximity limits)
                if (cursorTrackingPointer.x !== null && cursorTrackingPointer.y !== null) {
                    let diffX = this.x - cursorTrackingPointer.x;
                    let diffY = this.y - cursorTrackingPointer.y;
                    let calculatedDistance = Math.sqrt(diffX * diffX + diffY * diffY);
                    if (calculatedDistance < cursorTrackingPointer.currentRadius) {
                        let pushAngle = Math.atan2(diffY, diffX);
                        let localizedForce = (cursorTrackingPointer.currentRadius - calculatedDistance) / cursorTrackingPointer.currentRadius;
                        this.x += Math.cos(pushAngle) * localizedForce * 3;
                        this.y += Math.sin(pushAngle) * localizedForce * 3;
                    }
                }
                this.x += this.velocityHorizontal;
                this.y += this.velocityVertical;
            }
        }

        for (let i = 0; i < 65; i++) {
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

    // --- 2. THE CRYSTALLINE SHARD DEPTH-PARALLAX MATRIX ---
    window.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 992) return;
        const normalizedCoordX = (e.clientX / window.innerWidth) - 0.5;
        const normalizedCoordY = (e.clientY / window.innerHeight) - 0.5;

        const shardLeft = document.getElementById("parallax-shard-left");
        const shardRight = document.getElementById("parallax-shard-right");

        if (shardLeft) {
            shardLeft.style.transform = `translate3d(${normalizedCoordX * -35}px, ${normalizedCoordY * -20}px, 0px) rotate(0.01deg)`;
        }
        if (shardRight) {
            shardRight.style.transform = `translate3d(${normalizedCoordX * 45}px, ${normalizedCoordY * 30}px, 0px) rotate(0.01deg)`;
        }
    });

    // --- 3. THE "MAGNETIC SHIELD" SNAPPING ALIGNMENT ENGINE ---
    const pullTargets = document.querySelectorAll(".magnetic-pull-target");
    if (window.innerWidth > 768) {
        pullTargets.forEach(target => {
            window.addEventListener("mousemove", (e) => {
                const itemBoundingRect = target.getBoundingClientRect();
                const nodeCenterX = itemBoundingRect.left + (itemBoundingRect.width / 2);
                const nodeCenterY = itemBoundingRect.top + (itemBoundingRect.height / 2);

                const vectorX = e.clientX - nodeCenterX;
                const vectorY = e.clientY - nodeCenterY;
                const linearHypotenuse = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

                // Magnetic Proximity Snapping Boundary Limits
                if (linearHypotenuse < 45) {
                    target.style.transform = `translate3d(${vectorX * 0.45}px, ${vectorY * 0.45}px, 0px) scale(1.03)`;
                    target.style.zIndex = "100005";
                } else {
                    target.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
                }
            });
            target.addEventListener("mouseleave", () => {
                target.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
            });
        });
    }

    // --- SMARTPHONE INTERACTIVE MOBILE HEADER MENU DRIVER ---
    const menuToggleBtn = document.getElementById("mobile-hamburger-btn");
    const navigationMenu = document.getElementById("main-navigation-menu");
    if (menuToggleBtn && navigationMenu) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navigationMenu.classList.toggle("mobile-menu-expanded");
        });
        document.querySelectorAll("#main-navigation-menu .nav-item").forEach(item => {
            item.addEventListener("click", () => {
                navigationMenu.classList.remove("mobile-menu-expanded");
            });
        });
    }

    // --- REVIEWS TESTIMONIAL NAVIGATION CONTROL SYSTEM ---
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

    // --- HERO SLIDER VARIABLES ---
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

    // --- PURE SMOOTH-SCROLL EVENT INTERCEPTOR FOR HOME VIEWPORT SHIFTS ---
    document.querySelectorAll('a[href="#home"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (history.pushState) {
                history.pushState(null, null, ' ');
            } else {
                window.location.hash = '';
            }
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

    // --- ENHANCED HARDENED VIDEO LOGISTICS & AUTO-PLAYBACK PIPELINE ---
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

        promoVid.addEventListener('error', () => {
            if (currentSlideIndex === 0) renderActiveSlide(1);
        });

        setTimeout(() => {
            if ((promoVid.paused || promoVid.currentTime === 0) && currentSlideIndex === 0) {
                renderActiveSlide(1);
            }
        }, 1500);
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
    } catch (e) { console.error("Review tracking system isolate:", e); }

    // --- HERO SLIDER DRAGGABLE VIEWPORT ---
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
    } catch (e) { console.error("Hero touch pipeline exception:", e); }

    // --- DYNAMIC ADVENTUROUS "VORTEX MATRIX FLUSH & DISSOLVE" ENGINE ---
    try {
        const deckCards = document.querySelectorAll(".portfolio-deck-card");
        const drainNode = document.getElementById("vortex-drain-node");
        const rootContainer = document.getElementById("vortex-deck-trigger-root");
        let highFrequencyPointerRAF = null;

        deckCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                if (window.innerWidth < 993 || rootContainer.classList.contains("chamber-vortex-locked")) return;
                if (highFrequencyPointerRAF) cancelAnimationFrame(highFrequencyPointerRAF);
                
                highFrequencyPointerRAF = requestAnimationFrame(() => {
                    const currentIdx = parseInt(card.getAttribute("data-card-idx"), 10);
                    deckCards.forEach((c, index) => {
                        if (index === currentIdx) {
                            c.style.transform = "translateX(0px) translateZ(40px) scale(1.05)";
                            c.style.opacity = "1";
                            c.style.zIndex = "50";
                        } else if (index < currentIdx) {
                            const mult = currentIdx - index;
                            c.style.transform = `translateX(${60 + (mult * 20)}px) translateZ(-${mult * 30}px) scale(0.88)`;
                            c.style.opacity = "0.25"; 
                            c.style.zIndex = `${30 - mult}`;
                        } else {
                            const mult = index - currentIdx;
                            c.style.transform = `translateX(-${60 + (mult * 20)}px) translateZ(-${mult * 30}px) scale(0.88)`;
                            c.style.opacity = "0.25";
                            c.style.zIndex = `${30 - mult}`;
                        }
                    });
                });
            });

            card.addEventListener("mouseleave", () => {
                if (window.innerWidth < 993 || rootContainer.classList.contains("chamber-vortex-locked")) return;
                if (highFrequencyPointerRAF) cancelAnimationFrame(highFrequencyPointerRAF);
                
                highFrequencyPointerRAF = requestAnimationFrame(() => {
                    deckCards.forEach(c => {
                        c.style.transform = "translateX(0px) translateZ(0px) scale(1)";
                        c.style.opacity = "1";
                        c.style.zIndex = "10";
                    });
                });
            });

            card.addEventListener("click", (e) => {
                if (rootContainer.classList.contains("chamber-vortex-locked") || card.classList.contains("vortex-flush-active-node")) return;
                
                e.stopPropagation();
                rootContainer.classList.add("chamber-vortex-locked");
                card.classList.add("vortex-flush-active-node");
                if (drainNode) drainNode.classList.add("drain-core-active");

                deckCards.forEach(c => {
                    if (c !== card) c.classList.add("vortex-flushed-trash-node");
                });
            });

            const resetBtn = card.querySelector(".btn-restore-cards");
            if (resetBtn) {
                resetBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    rootContainer.classList.remove("chamber-vortex-locked");
                    card.classList.remove("vortex-flush-active-node");
                    if (drainNode) drainNode.classList.remove("drain-core-active");

                    deckCards.forEach(c => {
                        c.classList.remove("vortex-flushed-trash-node");
                        c.style.transform = "translateX(0px) translateZ(0px) scale(1)";
                        c.style.opacity = "1";
                    });
                });
            }
        });
    } catch (e) { console.error("Vortex flush fault catch:", e); }

    // --- 4. THE "LASER-SCAN" BLUEPRINT SWEEP & DIGITAL TERMINAL TYPER ENGINE ---
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

                // Trigger dynamic absolute horizontal hardware sweep beam animation
                if (laserLine) {
                    laserLine.classList.remove("run-laser-sweep");
                    void laserLine.offsetWidth; // Reflow reset hook
                    laserLine.classList.add("run-laser-sweep");
                }

                if (fetchTarget) {
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Initiating localized blueprint array scan...</div>`;
                    
                    let deviceSpecificationsArray = [];
                    try {
                        const res = await fetch(`http://127.0.0.1:8000/api/instruments/?anatomy=${region}`);
                        if (!res.ok) throw new Error();
                        deviceSpecificationsArray = await res.json();
                    } catch (err) {
                        deviceSpecificationsArray = anatomyPreloadedDatabase[region] || [];
                    }

                    // Render dynamic typing cascade sequence loop
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

                        // Cascade reveals across localized timer indexes
                        setTimeout(() => {
                            cardContainerNode.classList.remove("diagnostic-card-hidden");
                            cardContainerNode.classList.add("diagnostic-card-revealed");
                        }, index * 140);
                    });
                }
            });
        });
    } catch (e) { console.error("Anatomical diagnostic matrix fault:", e); }

    // --- GATEWAY SWITCHERS ---
    try {
        const authTabs = document.querySelectorAll(".auth-tab-btn");
        authTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                authTabs.forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".auth-panel-node").forEach(panel => panel.classList.remove("active"));
                tab.classList.add("active");
                const targetPanel = document.getElementById(tab.getAttribute("data-target-form"));
                if(targetPanel) targetPanel.classList.add("active");
            });
        });
    } catch (e) { console.error("Tab switcher failure:", e); }

    // --- VECTOR CURSOR ROTATION PERSPECTIVE GRAPHICS ---
    try {
        const trackingBox = document.querySelector(".text-track-mouse-tilt");
        const reactiveCard = document.querySelector(".mouse-hover-reactive-card");
        if (trackingBox && reactiveCard) {
            trackingBox.addEventListener("mousemove", (e) => {
                if (window.innerWidth < 769) return;
                const rect = trackingBox.getBoundingClientRect();
                const rotateX = ((rect.height / 2 - (e.clientY - rect.top)) / (rect.height / 2)) * 15; 
                const rotateY = (((e.clientX - rect.left) - (rect.width / 2)) / (rect.width / 2)) * 15;
                reactiveCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            trackingBox.addEventListener("mouseleave", () => { reactiveCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"; });
        }
    } catch (e) { console.error("Torsion vector logic track catch:", e); }
});
