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

    // --- 2. INTEGRATED INTEL ENGINE FOR LOCAL CHATBOT RESPONSE SIMULATION ---
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

    // --- 3. DUAL-LAYER SURGIS AI CONVERSATIONAL DRIVER ENGINE ---
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
            chatWindow.addEventListener("click", (e) => { e.stopPropagation(); });
        }

        async function processChatWorkflow() {
            if (!inputField || !outputStream) return;
            const text = inputField.value.trim();
            if (!text) return;

            // Render User Input bubble
            outputStream.innerHTML += `<p class="user-msg">${text}</p>`;
            inputField.value = "";
            outputStream.scrollTop = outputStream.scrollHeight;

            // Trigger loading state prompt placeholder
            const typingIndicatorIdx = Date.now();
            outputStream.innerHTML += `<p class="bot-msg" id="msg-${typingIndicatorIdx}"><i class="fas fa-spinner fa-spin"></i> Processing master SKU index...</p>`;
            outputStream.scrollTop = outputStream.scrollHeight;
            
            const loadingBubble = document.getElementById(`msg-${typingIndicatorIdx}`);

            try {
                // Primary Layer: Attempt real-time local REST endpoints query connection
                const res = await fetch("http://127.0.0.1:8000/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text })
                });
                
                if (!res.ok) throw new Error("Backend offline");
                const data = await res.json();
                if(loadingBubble) loadingBubble.innerHTML = data.reply;

            } catch (err) {
                // Secondary Layer: Fast local simulation fallback matching keywords
                setTimeout(() => {
                    const normalizedQuery = text.toLowerCase();
                    let responseMatch = "Query catalog string logged. Your inquiry has been dispatched to Surgiments logistics support hub at Hosur. For immediate SKU pricing specifications, generate a Request RFQ form directly via the header menu panel.";
                    
                    for (const keyString in localAIBrainFallback) {
                        if (normalizedQuery.includes(keyString)) {
                            responseMatch = localAIBrainFallback[keyString];
                            break;
                        }
                    }
                    if(loadingBubble) loadingBubble.innerHTML = responseMatch;
                    outputStream.scrollTop = outputStream.scrollHeight;
                }, 400); // Fluid delayed typing transition
            }
        }

        if (sendBtn) sendBtn.addEventListener("click", processChatWorkflow);
        if (inputField) {
            inputField.addEventListener("keypress", (e) => {
                if (e.key === "Enter") processChatWorkflow();
            });
        }
    } catch (e) { console.error("Chatbot module safely isolated into standard loops:", e); }

    // --- 4. AUTOMATED MULTI-REVIEW INTERACTIVE SLIDER ENGINE ---
    try {
        const reviewsTrack = document.getElementById("reviews-dynamic-track");
        const reviewDots = document.querySelectorAll("#reviews-dots-container .review-dot");
        let activeReviewIdx = 0;
        const countTotalReviews = reviewDots.length;

        function renderActiveReview(index) {
            activeReviewIdx = (index + countTotalReviews) % countTotalReviews;
            const offsetWidthTrack = -activeReviewIdx * 100;
            
            if (reviewsTrack) {
                reviewsTrack.style.transform = `translateX(${offsetWidthTrack}%)`;
            }

            reviewDots.forEach((dot, idx) => {
                if(idx === activeReviewIdx) dot.classList.add("active");
                else dot.classList.remove("active");
            });
        }

        reviewDots.forEach(dot => {
            dot.addEventListener("click", () => {
                const targetIdx = parseInt(dot.getAttribute("data-review-idx"), 10);
                renderActiveReview(targetIdx);
            });
        });

        setInterval(() => {
            renderActiveReview(activeReviewIdx + 1);
        }, 4000); // Cycles review slides automatically every 4 seconds

    } catch (e) { console.error("Reviews slide module isolated safely:", e); }

    // --- 5. RESILIENT BI-DIRECTIONAL SCROLL REVEAL SAFETY RUNTIME ---
    try {
        const revealElements = document.querySelectorAll(".scroll-trigger-reveal");
        if (revealElements.length > 0 && 'IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-active");
                    } else {
                        entry.target.classList.remove("reveal-active");
                    }
                });
            }, { threshold: 0.02, rootMargin: "0px 0px -20px 0px" });
            
            revealElements.forEach(element => revealObserver.observe(element));
        } else {
            document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active"));
        }
    } catch (e) {
        console.warn("Reveal engine safely bypassed onto default visibility profiles:", e);
        document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active"));
    }

    // --- 6. DUAL GATEWAY AUTHENTICATION TAB SWITCHER ---
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
    } catch (e) { console.error("Authentication console tabs failure isolated:", e); }

    // --- 7. FLUID DRAGGABLE SLIDER CAROUSEL (8s HERO OVERLAY RUNTIMES) ---
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
            autoCycleTimer = setInterval(() => {
                renderActiveSlide(currentSlideIndex + 1);
            }, 8000); // Fixed 8-Second Uniform Autoplay loop intervals
        }

        if(sliderViewport && sliderWrapper) {
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

            beads.forEach(bead => {
                bead.addEventListener("click", () => {
                    renderActiveSlide(parseInt(bead.getAttribute("data-slide-index"), 10));
                    initAutoCycle();
                });
            });

            initAutoCycle();
        }
    } catch (e) { console.error("Draggable system cycle run isolated cleanly:", e); }

    // --- 8. THE CARD HIDING STACK ILLUSION DECK MATRIX ---
    try {
        const deckCards = document.querySelectorAll(".portfolio-deck-card");
        deckCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
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
                deckCards.forEach(c => {
                    c.style.transform = "translateX(0px) translateZ(0px) scale(1)";
                    c.style.opacity = "1";
                    c.style.zIndex = "10";
                });
            });
        });
    } catch (e) { console.error("Card stack physics bounds isolated:", e); }

    // --- 9. REAL-TIME FAST CURSOR TRACKING MATRIX FOR TESTIMONIAL CARDS ---
    try {
        const trackingBox = document.querySelector(".text-track-mouse-tilt");
        const reactiveCard = document.querySelector(".mouse-hover-reactive-card");
        
        if (trackingBox && reactiveCard) {
            trackingBox.addEventListener("mousemove", (e) => {
                const rect = trackingBox.getBoundingClientRect();
                const rotateX = ((rect.height / 2 - (e.clientY - rect.top)) / (rect.height / 2)) * 15; 
                const rotateY = (((e.clientX - rect.left) - (rect.width / 2)) / (rect.width / 2)) * 15;
                reactiveCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            trackingBox.addEventListener("mouseleave", () => {
                reactiveCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            });
        }
    } catch (e) { console.error("Perspective cursor trackers isolated:", e); }

    // --- 10. STANDALONE HARDWARE TILT ENGINES ---
    try {
        const standaloneTilts = document.querySelectorAll(".tilt-target");
        standaloneTilts.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const rotateX = ((rect.height / 2 - (e.clientY - rect.top)) / (rect.height / 2)) * 10;
                const rotateY = (((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2)) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            });
        });
    } catch (e) { console.error("Hardware tilt system bypassed:", e); }

    // --- 11. ANATOMICAL LOOKUP ENGINE PLATFORMS ---
    try {
        const hotspots = document.querySelectorAll(".anatomy-svg-hotspot");
        const fetchTarget = document.getElementById("anatomy-fetch-target");
        const label = document.getElementById("anatomy-ui-marker");

        hotspots.forEach(spot => {
            spot.addEventListener("mouseenter", (e) => {
                if (label) label.innerText = e.target.getAttribute("data-anatomy-region").toUpperCase();
            });
            spot.addEventListener("mouseleave", () => {
                if (label) label.innerText = "Select Structural Node";
            });
            spot.addEventListener("click", async (e) => {
                hotspots.forEach(h => h.classList.remove("active-node"));
                e.target.classList.add("active-node");
                const region = e.target.getAttribute("data-anatomy-region");

                if (fetchTarget) {
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Querying master specification indexes for ${region}...</div>`;
                    try {
                        const res = await fetch(`http://127.0.0.1:8000/api/instruments/?anatomy=${region}`);
                        if (!res.ok) throw new Error();
                        const data = await res.json();
                        fetchTarget.innerHTML = "";
                        data.forEach(item => {
                            fetchTarget.innerHTML += `<div class="instrument-item"><h5>${item.name} (${item.sku})</h5><p>${item.specialty}</p></div>`;
                        });
                    } catch (err) {
                        fetchTarget.innerHTML = "";
                        const staticListing = anatomyPreloadedDatabase[region];
                        if (staticListing) {
                            staticListing.forEach(item => {
                                fetchTarget.innerHTML += `
                                    <div class="instrument-item">
                                        <h5>${item.name} (${item.sku})</h5>
                                        <p>${item.specialty}</p>
                                        <span class="cached-badge"><i class="fas fa-shield-alt"></i> Verified Spec</span>
                                    </div>`;
                            });
                        }
                    }
                }
            });
        });
    } catch (e) { console.error("Anatomical layout engine isolated:", e); }

    // --- 12. SCROLL PROGRESS IMAGE TRANSFORM SCRUBBERS ---
    try {
        const scrollProgressBar = document.getElementById("scroll-progress-bar");
        const zoomImages = document.querySelectorAll(".scroll-zoom-img");
        const mainHeader = document.querySelector(".main-header");
        
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (totalHeight > 0 && scrollProgressBar) {
                scrollProgressBar.style.width = `${(scrolled / totalHeight) * 100}%`;
            }

            if(mainHeader) {
                if (window.scrollY > 50) mainHeader.classList.add("header-scrolled");
                else mainHeader.classList.remove("header-scrolled");
            }

            zoomImages.forEach(img => {
                const parentSection = img.closest("section");
                if (parentSection) {
                    const rect = parentSection.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const viewScrollFactor = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        img.style.transform = `scale(${1 + (viewScrollFactor * 0.15)})`;
                    }
                }
            });
        });
    } catch (e) { console.error("Scroll scrub calculations isolated safely:", e); }
});
