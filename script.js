document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LOCAL DATA PRE-CACHE FOR HUMAN BLUEPRINT INDEXING ---
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

    const localAIBrainFallback = {
        "hello": "Welcome to Surgis Technical Support Terminal. Specify a device specialty classification, quality Directive or specific catalog SKU code to verify material metadata specs instantly.",
        "hi": "Welcome to Surgis Technical Support Terminal. Specify a device specialty classification, quality Directive or specific catalog SKU code to verify material metadata specs instantly.",
        "neuro": "Surgiments Neuro-Arrays feature a zero-glare matte satin surface treatment. Vetted lines include Mahadeviah sub-canal retractors, self-retaining scalp stabilizers, and curved dural scissor sets conforming to ISO 7153-1 specs.",
        "cardio": "Our Cardio-Thoracic sets are forged from premium medical-grade alloys. Core items: Finochietto rib spreaders, DeBakey high-tensile blood vessel trauma clamps, and micro-needle holders.",
        "ortho": "Orthopedic device lines include heavy duty Liston bone cutter pliers, high-torque bone awls, and Kirschner skeletal fixation stabilization wire drivers engineered for extensive autoclave cycles.",
        "ce": "Surgiments instruments comply fully with international CE Mark systems, including our 1998 Institutional Compliance Mark and the updated 2014 Production Quality Directives.",
        "iso": "Our facility logistics operations conform directly to ISO 9001 and ISO 13485 Medical Device Quality Management System standards.",
        "sku": "Please enter the exact alphanumeric design string to retrieve metallurgy records. Standard series map to neuro (SKU-MN-992), torso (SKU-DB-440), and lower extremities (SKU-CO-311)."
    };

    // --- 2. DUAL-LAYER SURGIS AI CONVERSATIONAL DRIVER ENGINE ---
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
        }

        async function processChatWorkflow() {
            if (!inputField || !outputStream) return;
            const text = inputField.value.trim();
            if (!text) return;

            outputStream.innerHTML += `<p class="user-msg">${text}</p>`;
            inputField.value = "";
            outputStream.scrollTop = outputStream.scrollHeight;

            const typingIndicatorIdx = Date.now();
            outputStream.innerHTML += `<p class="bot-msg" id="msg-${typingIndicatorIdx}"><i class="fas fa-spinner fa-spin"></i> Processing master index...</p>`;
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
                    let responseMatch = "Query catalog string logged. Support dispatched to Hosur Industrial facility routing grid hub.";
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
    } catch (e) { console.error("Chat engine safe-catch:", e); }

    // --- 3. HARDENED REVIEWS SLIDER ENGINE (TOUCH GESTURE SWIPING INTERACTION) ---
    try {
        const reviewsTrack = document.getElementById("reviews-dynamic-track");
        const reviewDots = document.querySelectorAll("#reviews-dots-container .review-dot");
        const reviewsContainer = document.querySelector(".reviews-slider-container");
        
        let activeReviewIdx = 0;
        const countTotalReviews = reviewDots.length;
        let reviewsInterval = null;

        function renderActiveReview(index) {
            activeReviewIdx = (index + countTotalReviews) % countTotalReviews;
            const offsetWidthTrack = -activeReviewIdx * 100;
            if (reviewsTrack) reviewsTrack.style.transform = `translateX(${offsetWidthTrack}%)`;
            reviewDots.forEach((dot, idx) => {
                if(idx === activeReviewIdx) dot.classList.add("active");
                else dot.classList.remove("active");
            });
        }

        reviewDots.forEach(dot => {
            dot.addEventListener("click", () => {
                renderActiveReview(parseInt(dot.getAttribute("data-review-idx"), 10));
                resetReviewTimer();
            });
        });

        // Touch Gesture Hooks for Mobile Swipe Processing
        let touchStartReviewX = 0;
        let touchEndReviewX = 0;

        if (reviewsContainer) {
            reviewsContainer.addEventListener("touchstart", (e) => {
                touchStartReviewX = e.touches[0].clientX;
                clearInterval(reviewsInterval);
            }, { passive: true });

            reviewsContainer.addEventListener("touchend", (e) => {
                touchEndReviewX = e.changedTouches[0].clientX;
                const swipeDistance = touchStartReviewX - touchEndReviewX;
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
    } catch (e) { console.error("Reviews touch runtime caught:", e); }

    // --- 4. FLUID HERO SLIDER CAROUSEL (TOUCH SEAMLESS 8-SECOND LOOPS) ---
    try {
        const sliderViewport = document.getElementById("hero-draggable-viewport");
        const sliderWrapper = document.getElementById("hero-slider-wrapper");
        const beads = document.querySelectorAll("#slider-pagination-container .bead");
        
        let currentSlideIndex = 0;
        const countTotalSlides = beads.length;
        let autoCycleTimer = null;
        
        let activeDragMode = false;
        let initialCursorPositionX = 0;
        let cumulativeTransformX = 0;

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

        if(sliderViewport && sliderWrapper) {
            // Mouse Drag Handlers
            sliderViewport.addEventListener("mousedown", (e) => {
                activeDragMode = true;
                clearInterval(autoCycleTimer);
                sliderWrapper.style.transition = "none";
                initialCursorPositionX = e.clientX;
                const matrix = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapper).transform);
                cumulativeTransformX = matrix.m41;
                sliderViewport.style.cursor = "grabbing";
            });

            window.addEventListener("mousemove", (e) => {
                if (!activeDragMode) return;
                const deltaX = e.clientX - initialCursorPositionX;
                sliderWrapper.style.transform = `translateX(${cumulativeTransformX + deltaX}px)`;
            });

            window.addEventListener("mouseup", (e) => {
                if (!activeDragMode) return;
                activeDragMode = false;
                sliderViewport.style.cursor = "grab";
                const displacementX = e.clientX - initialCursorPositionX;
                const structuralWidth = sliderViewport.offsetWidth;
                if (Math.abs(displacementX) > structuralWidth * 0.15) {
                    if (displacementX > 0) renderActiveSlide(currentSlideIndex - 1);
                    else renderActiveSlide(currentSlideIndex + 1);
                } else {
                    renderActiveSlide(currentSlideIndex);
                }
                initAutoCycle();
            });

            // Touch Drag Handlers (Fixes Mobile Hero cutoff scaling vulnerabilities)
            sliderViewport.addEventListener("touchstart", (e) => {
                clearInterval(autoCycleTimer);
                activeDragMode = true;
                sliderWrapper.style.transition = "none";
                initialCursorPositionX = e.touches[0].clientX;
                const matrix = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapper).transform);
                cumulativeTransformX = matrix.m41;
            }, { passive: true });

            sliderViewport.addEventListener("touchmove", (e) => {
                if (!activeDragMode) return;
                const deltaX = e.touches[0].clientX - initialCursorPositionX;
                sliderWrapper.style.transform = `translateX(${cumulativeTransformX + deltaX}px)`;
            }, { passive: true });

            sliderViewport.addEventListener("touchend", (e) => {
                if (!activeDragMode) return;
                activeDragMode = false;
                const displacementX = e.changedTouches[0].clientX - initialCursorPositionX;
                const structuralWidth = sliderViewport.offsetWidth;
                if (Math.abs(displacementX) > structuralWidth * 0.15) {
                    if (displacementX > 0) renderActiveSlide(currentSlideIndex - 1);
                    else renderActiveSlide(currentSlideIndex + 1);
                } else {
                    renderActiveSlide(currentSlideIndex);
                }
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
    } catch (e) { console.error("Hero slider touch catch:", e); }

    // --- 5. THE CARD DECK INTERACTIVE CHANNELS (MOBILE HOVER EMBED REMAP) ---
    try {
        const deckCards = document.querySelectorAll(".portfolio-deck-card");
        
        // Desktop Hover Core Pipeline
        deckCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                if (window.innerWidth < 993) return; // Skip logic engine operations on tablets/smartphones
                const currentIdx = parseInt(card.getAttribute("data-card-idx"), 10);
                deckCards.forEach((c, index) => {
                    if (index === currentIdx) {
                        c.style.transform = "translateX(0px) translateZ(40px) scale(1.05)";
                        c.style.opacity = "1";
                        c.style.zIndex = "50";
                    } else if (index < currentIdx) {
                        const multiplier = currentIdx - index;
                        c.style.transform = `translateX(${60 + (multiplier * 20)}px) translateZ(-${multiplier * 30}px) scale(0.88)`;
                        c.style.opacity = "0.25"; 
                        c.style.zIndex = `${30 - multiplier}`;
                    } else {
                        const multiplier = index - currentIdx;
                        c.style.transform = `translateX(-${60 + (multiplier * 20)}px) translateZ(-${multiplier * 30}px) scale(0.88)`;
                        c.style.opacity = "0.25";
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

            // Mobile Tap Handler Override (Fixes lack of mouse cursor hover on phones)
            card.addEventListener("click", () => {
                if (window.innerWidth > 992) return;
                const wasActive = card.classList.contains("active-mobile-tap");
                deckCards.forEach(c => c.classList.remove("active-mobile-tap"));
                if (!wasActive) card.classList.add("active-mobile-tap");
            });
        });
    } catch (e) { console.error("Card engine remapping safety catch:", e); }

    // --- 6. RESILIENT BI-DIRECTIONAL SCROLL REVEAL SAFETY RUNTIME ---
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

    // --- 7. ANATOMICAL LOOKUP ENGINE PLATFORMS ---
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
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Querying master specification indexes for ${region}...</div>`;
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
    } catch (e) { console.error("Anatomy engine safety bypass:", e); }

    // --- 8. DUAL GATEWAY AUTHENTICATION TAB SWITCHER ---
    try {
        const authTabs = document.querySelectorAll(".auth-tab-btn");
        authTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                authTabs.forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".auth-panel-node").forEach(panel => panel.classList.remove("active"));
                tab.classList.add("active");
                const activePanelId = tab.getAttribute("data-target-form");
                const targetPanel = document.getElementById(activePanelId);
                if(targetPanel) targetPanel.classList.add("active");
            });
        });
    } catch (e) { console.error("Auth routing layer clear:", e); }

    // --- 9. REAL-TIME CURSOR DESKTOP TRACKING TILT PERSPECTIVE ---
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
    } catch (e) { console.error("Torsion trackers catch:", e); }
});
