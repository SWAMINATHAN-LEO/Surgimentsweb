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

    // --- 1. HIGH-END DESKTOP HORIZONTAL SCROLL STACKING CONTROLLER ---
    const scrollWrapper = document.getElementById("catalog-scroll-pin-wrapper");
    const horizontalTrack = document.getElementById("horizontal-scroll-track-node");
    
    if (scrollWrapper && horizontalTrack) {
        window.addEventListener("scroll", () => {
            if (window.innerWidth < 993) {
                horizontalTrack.style.transform = "none";
                return;
            }
            const wrapperTop = scrollWrapper.offsetTop;
            const wrapperHeight = scrollWrapper.offsetHeight;
            const viewportHeight = window.innerHeight;
            const currentScroll = window.pageYOffset;

            if (currentScroll >= wrapperTop && currentScroll <= (wrapperTop + wrapperHeight - viewportHeight)) {
                const scrollPercentage = (currentScroll - wrapperTop) / (wrapperHeight - viewportHeight);
                const maxPanWidth = horizontalTrack.scrollWidth - window.innerWidth * 0.9;
                horizontalTrack.style.transform = `translateX(${-scrollPercentage * maxPanWidth}px)`;
            }
        });
    }

    // --- 2. 3D PERSPECTIVE GLARE SHEEN HOVER ENGINE ---
    const tiltNodes = document.querySelectorAll(".glare-tilt-node");
    if (window.innerWidth > 768) {
        tiltNodes.forEach(node => {
            const reflectionSheen = node.querySelector(".glare-reflection-sheen");
            
            node.addEventListener("mousemove", (e) => {
                const bounding = node.getBoundingClientRect();
                const mouseX = e.clientX - bounding.left;
                const mouseY = e.clientY - bounding.top;
                
                const rotateX = ((bounding.height / 2 - mouseY) / (bounding.height / 2)) * 15;
                const rotateY = ((mouseX - bounding.width / 2) / (bounding.width / 2)) * 15;
                
                node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                
                if (reflectionSheen) {
                    const percentageX = (mouseX / bounding.width) * 100;
                    const percentageY = (mouseY / bounding.height) * 100;
                    reflectionSheen.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,255,255,0.18) 0%, transparent 75%)`;
                }
            });

            node.addEventListener("mouseleave", () => {
                node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                if (reflectionSheen) {
                    reflectionSheen.style.background = "transparent";
                }
            });
        });
    }

    // --- 3. CLEANROOM PASSIVATION PARTICLES BACKDROP ---
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
                        if (this.x > fluidCanvas.width || this.x < 0) this.velocityHorizontal = -this.velocityHorizontal;
                        if (this.y > fluidCanvas.height || this.y < 0) this.velocityVertical = -this.velocityVertical;

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

                for (let i = 0; i < 45; i++) {
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
    } catch (e) { console.error(e); }

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
    } catch (e) { console.error(e); }

    // --- 4. THE "LASER-SCAN" BLUEPRINT SWEEP ---
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
    } catch (e) { console.error(e); }

    // --- 7. HARDENED SCROLL OBSERVERS ---
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
    } catch (e) { document.querySelectorAll(".scroll-trigger-reveal").forEach(el => el.classList.add("reveal-active")); }

    // --- OUTSIDE CLOSING ACTION HANDLER ENGINE ---
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
