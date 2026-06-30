document.addEventListener("DOMContentLoaded", () => {

    // --- 1. HUMAN ANATOMY DATABASE PRE-CACHE LAYER ---
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

    // --- 2. MAGNETIC INTERACTION ENGINE FOR CTA ELEMENTS ---
    const magneticElements = document.querySelectorAll('.magnetic-target');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Pull the element slightly toward the cursor position
            el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // --- 3. APPLE-STYLE INERTIAL ANCHOR NAVIGATION SMOOTHING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. SCROLL INTERSECTION & RESPONSIVE PROGRESS INDICATORS ---
    const scrollProgressBar = document.getElementById("scroll-progress-bar");
    const mainHeader = document.querySelector(".main-header");
    
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            if(scrollProgressBar) scrollProgressBar.style.width = `${progress}%`;
        }

        if(mainHeader) {
            if (window.scrollY > 50) {
                mainHeader.classList.add("header-scrolled");
            } else {
                mainHeader.classList.remove("header-scrolled");
            }
        }
    });

    // --- 5. HIGH-PERFORMANCE REVEAL LOGIC FOR SECTIONS ---
    try {
        const revealElements = document.querySelectorAll(".scroll-trigger-reveal");
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                } else {
                    entry.target.classList.remove("reveal-active");
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
        revealElements.forEach(element => revealObserver.observe(element));
    } catch (e) {
        console.error("Reveal engine setup fault:", e);
    }

    // --- 6. DRAGGABLE HERO CAROUSEL ENGINE (5s CYCLE LOOP) ---
    const sliderViewport = document.getElementById("hero-draggable-viewport");
    const sliderWrapper = document.getElementById("hero-slider-wrapper");
    const textNodes = document.querySelectorAll(".hero-slide-text-node");
    const beads = document.querySelectorAll("#slider-pagination-container .bead");
    
    let currentSlideIndex = 0;
    const countTotalSlides = textNodes.length;
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
        
        textNodes.forEach((node, idx) => {
            if(idx === currentSlideIndex) node.classList.add("active");
            else node.classList.remove("active");
        });

        beads.forEach((bead, idx) => {
            if(idx === currentSlideIndex) bead.classList.add("active");
            else bead.classList.remove("active");
        });
    }

    function initAutoCycle() {
        clearInterval(autoCycleTimer);
        autoCycleTimer = setInterval(() => {
            renderActiveSlide(currentSlideIndex + 1);
        }, 5000);
    }

    if(sliderViewport && sliderWrapper) {
        // Desktop Drag System Setup
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

        // Mobile/Tablet Touch System
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

    // --- 7. HIGH-PERFORMANCE 3D CARD TILT ARCHITECTURE ---
    const tiltCards = document.querySelectorAll(".tilt-target");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 12; // Amplified rotational impact
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    // --- 8. MOUSE SPOTLIGHT RADIAL MOCKUP MATRIX ---
    const spotlightGrid = document.querySelector(".mouse-spotlight-grid");
    if (spotlightGrid) {
        spotlightGrid.addEventListener("mousemove", (e) => {
            document.querySelectorAll(".spotlight-element").forEach(el => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            });
        });
    }

    // --- 9. HERO PARALLAX EFFECTS & SCROLL IMAGE ZOOM ---
    const parallaxBg = document.getElementById("hero-parallax-bg");
    const zoomImages = document.querySelectorAll(".scroll-zoom-img");
    
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        if (parallaxBg) parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;

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

    // --- 10. METRICS INTERSECTION COUNT RUNTIMES ---
    try {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.hasAttribute("data-animated")) {
                        entry.target.setAttribute("data-animated", "true");
                        const target = parseInt(entry.target.getAttribute("data-target"), 10);
                        let current = 0;
                        const step = target > 1000 ? Math.floor(target / 35) : 1;

                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                entry.target.innerText = target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                entry.target.innerText = current.toLocaleString();
                            }
                        }, 20);
                    }
                } else {
                    entry.target.innerText = "0";
                    entry.target.removeAttribute("data-animated");
                }
            });
        });
        document.querySelectorAll(".count-target").forEach(el => countObserver.observe(el));
    } catch (e) {
        console.error("Counter engine tracking fail:", e);
    }

    // --- 11. ANATOMICAL ENGINE LOOKUP CONTEXTS ---
    try {
        const hotspots = document.querySelectorAll(".anatomy-svg-hotspot");
        const fetchTarget = document.getElementById("anatomy-fetch-target");
        const label = document.getElementById("anatomy-ui-marker");

        function appendFailsafeData(regionCode) {
            fetchTarget.innerHTML = "";
            const staticListing = anatomyPreloadedDatabase[regionCode];
            if (staticListing) {
                staticListing.forEach(item => {
                    fetchTarget.innerHTML += `
                        <div class="instrument-item">
                            <h5>${item.name} (${item.sku})</h5>
                            <p>${item.specialty}</p>
                            <span class="cached-badge"><i class="fas fa-shield-alt"></i> Cached Data Spec</span>
                        </div>`;
                });
            }
        }

        hotspots.forEach(spot => {
            spot.addEventListener("mouseenter", (e) => {
                if (label) label.innerText = e.target.getAttribute("data-anatomy-region").toUpperCase();
            });
            spot.addEventListener("mouseleave", () => {
                if (label) label.innerText = "Select Anatomy Target";
            });
            spot.addEventListener("click", async (e) => {
                hotspots.forEach(h => h.classList.remove("active-node"));
                e.target.classList.add("active-node");
                const region = e.target.getAttribute("data-anatomy-region");

                if (fetchTarget) {
                    fetchTarget.innerHTML = `<div class="fallback-prompt">Querying database for ${region}...</div>`;
                    try {
                        const res = await fetch(`http://127.0.0.1:8000/api/instruments/?anatomy=${region}`);
                        if (!res.ok) throw new Error();
                        const data = await res.json();
                        fetchTarget.innerHTML = "";
                        if (data.length === 0) { appendFailsafeData(region); return; }
                        data.forEach(item => {
                            fetchTarget.innerHTML += `<div class="instrument-item"><h5>${item.name} (${item.sku})</h5><p>${item.specialty}</p></div>`;
                        });
                    } catch (err) {
                        appendFailsafeData(region);
                    }
                }
            });
        });
    } catch (e) {
        console.error("Anatomy framework loop initialization fault:", e);
    }

    // --- 12. SURGIS AI CONVERSATIONAL FLOATING LOGIC ---
    try {
        const chatIcon = document.getElementById("chatbot-icon");
        const chatWindow = document.getElementById("chatbot-window");
        const closeBtn = document.getElementById("close-chat");
        const sendBtn = document.getElementById("send-chat");
        const inputField = document.getElementById("chat-input-field");
        const outputStream = document.getElementById("chat-stream-output");

        if (chatIcon && chatWindow && closeBtn) {
            chatIcon.addEventListener("click", () => chatWindow.classList.remove("hidden"));
            closeBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));
        }

        async function sendChat() {
            if (!inputField || !outputStream) return;
            const text = inputField.value.trim();
            if (!text) return;

            outputStream.innerHTML += `<p class="user-msg">${text}</p>`;
            inputField.value = "";
            outputStream.scrollTop = outputStream.scrollHeight;

            try {
                const res = await fetch("http://127.0.0.1:8000/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text })
                });
                const data = await res.json();
                outputStream.innerHTML += `<p class="bot-msg">${data.reply}</p>`;
            } catch (err) {
                outputStream.innerHTML += `<p class="bot-msg" style="color:var(--crimson-accent);">Failed to connect to Surgis AI.</p>`;
            }
            outputStream.scrollTop = outputStream.scrollHeight;
        }

        if (sendBtn) sendBtn.addEventListener("click", sendChat);
        if (inputField) inputField.addEventListener("keypress", (e) => { if (e.key === "Enter") sendChat(); });
    } catch (e) {
        console.error("Chatbot loop execution handling error:", e);
    }
});
