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

    // --- HERO SLIDER VARIABLES (Properly Scoped Globally Within Initializer) ---
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
            console.log("Video source issue detected. Skipping to static slider image framework...");
            if (currentSlideIndex === 0) renderActiveSlide(1);
        });

        setTimeout(() => {
            if ((promoVid.paused || promoVid.currentTime === 0) && currentSlideIndex === 0) {
                console.log("Video timeout reached. Skipping to primary layout image asset...");
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

    // --- HERO SLIDER DRAGGABLE VIEWPORT ACTIVATION ---
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

    // --- HIGH FREQUENCY POINTER OVERRIDE FOR CARDS ---
    try {
        const deckCards = document.querySelectorAll(".portfolio-deck-card");
        let activeRAFIndex = null;

        deckCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                if (window.innerWidth < 993) return;
                if (activeRAFIndex) cancelAnimationFrame(activeRAFIndex);
                activeRAFIndex = requestAnimationFrame(() => {
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
                if (window.innerWidth < 993) return;
                if (activeRAFIndex) cancelAnimationFrame(activeRAFIndex);
                activeRAFIndex = requestAnimationFrame(() => {
                    deckCards.forEach(c => {
                        c.style.transform = "translateX(0px) translateZ(0px) scale(1)";
                        c.style.opacity = "1";
                        c.style.zIndex = "10";
                    });
                });
            });

            card.addEventListener("click", () => {
                if (window.innerWidth > 992) return;
                const wasActive = card.classList.contains("active-mobile-tap");
                deckCards.forEach(c => c.classList.remove("active-mobile-tap"));
                if (!wasActive) card.classList.add("active-mobile-tap");
            });
        });
    } catch (e) { console.error("High-speed stacking array exceptions:", e); }

    // --- SCROLL REVEAL TIMING RUNTIME ---
    try {
        const revealElements = document.querySelectorAll(".scroll-trigger-reveal");
        if (revealElements.length > 0 && 'IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add("reveal-active");
                    else entry.target.classList.remove("reveal-active");
                });
            }, { threshold: 0.01, rootMargin: "0px 0px -10px 0px" });
            revealElements.forEach(element => revealObserver.observe(element));
        } else {
            document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active"));
        }
    } catch (e) { document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active")); }

    // --- ANATOMICAL CONTROLLERS ---
    try {
        const hotspots = document.querySelectorAll(".anatomy-svg-hotspot");
        const fetchTarget = document.getElementById("anatomy-fetch-target");
        const label = document.getElementById("anatomy-ui-marker");

        hotspots.forEach(spot => {
            spot.addEventListener("mouseenter", (e) => { if (label) label.innerText = e.target.getAttribute("data-anatomy-region").toUpperCase(); });
            spot.addEventListener("mouseleave", () => { if (label) label.innerText = "Select Structural Node"; });
            spot.addEventListener("click", async (e) => {
                hotspots.forEach(h => h.classList.remove("active-node"));
                e.target.classList.add("active-node");
                const region = e.target.getAttribute("data-anatomy-region");
                if (label) label.innerText = region.toUpperCase();

                if (fetchTarget) {
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Querying master specifications index for ${region}...</div>`;
                    try {
                        const res = await fetch(`http://127.0.0.1:8000/api/instruments/?anatomy=${region}`);
                        if (!res.ok) throw new Error();
                        const data = await res.json();
                        fetchTarget.innerHTML = "";
                        data.forEach(item => { fetchTarget.innerHTML += `<div class="instrument-item"><h5>${item.name} (${item.sku})</h5><p>${item.specialty}</p></div>`; });
                    } catch (err) {
                        fetchTarget.innerHTML = "";
                        const staticListing = anatomyPreloadedDatabase[region];
                        if (staticListing) {
                            staticListing.forEach(item => {
                                fetchTarget.innerHTML += `<div class="instrument-item"><h5>${item.name} (${item.sku})</h5><p>${item.specialty}</p><span class="cached-badge"><i class="fas fa-shield-alt"></i> Verified Spec</span></div>`;
                            });
                        }
                    }
                }
            });
        });
    } catch (e) { console.error("Anatomical lookup fault:", e); }

    // --- OUTSIDE CLOSING ACTION HANDLER ENGINE FOR SURGIS AI TERMINAL ---
    try {
        const chatIcon = document.getElementById("chatbot-icon");
        const chatWindow = document.getElementById("chatbot-window");
        const closeBtn = document.getElementById("close-chat");
        const sendBtn = document.getElementById("send-chat");
        const inputField = document.getElementById("chat-input-field");
        const outputStream = document.getElementById("chat-stream-output");

        if (chatIcon && chatWindow) {
            chatIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                chatWindow.classList.toggle("hidden");
            });
            if (closeBtn) {
                closeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    chatWindow.classList.add("hidden");
                });
            }
            window.addEventListener("click", (e) => {
                if (!chatWindow.classList.contains("hidden") && !chatWindow.contains(e.target) && !chatIcon.contains(e.target)) {
                    chatWindow.classList.add("hidden");
                }
            });
        }

        async function processChatWorkflow() {
            if (!inputField || !outputStream) return;
            const text = inputField.value.trim();
            if (!text) return;

            outputStream.innerHTML += `<p class="user-msg">${text}</p>`;
            inputField.value = "";
            outputStream.scrollTop = outputStream.scrollHeight;

            const typingIndicatorIdx = Date.now();
            outputStream.innerHTML += `<p class="bot-msg" id="msg-${typingIndicatorIdx}"><i class="fas fa-spinner fa-spin"></i> Processing index...</p>`;
            outputStream.scrollTop = outputStream.scrollHeight;
            const loadingBubble = document.getElementById(`msg-${typingIndicatorIdx}`);

            try {
                const res = await fetch("http://127.0.0.1:8000/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text })
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                if(loadingBubble) loadingBubble.innerHTML = data.reply;
            } catch (err) {
                setTimeout(() => {
                    const normalizedQuery = text.toLowerCase();
                    let responseMatch = "Inquiry logged. Dispatched to Hosur Facility regulatory database.";
                    for (const keyString in localAIBrainFallback) {
                        if (normalizedQuery.includes(keyString)) {
                            responseMatch = localAIBrainFallback[keyString];
                            break;
                        }
                    }
                    if(loadingBubble) loadingBubble.innerHTML = responseMatch;
                    outputStream.scrollTop = outputStream.scrollHeight;
                }, 400); 
            }
        }
        if (sendBtn) sendBtn.addEventListener("click", processChatWorkflow);
        if (inputField) inputField.addEventListener("keypress", (e) => { if (e.key === "Enter") processChatWorkflow(); });
    } catch (e) { console.error("Chat terminal engine catch:", e); }
});
