document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    
    const marketingCollection = [
        {
            title: "slide 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue justo, feugiat ornare nunc sit amet, imperdiet laoreet lacus. Suspendisse imperdiet ultricies nisl."
        },
        {
            title: "slide 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            title: "slide 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue justo, feugiat ornare nunc sit amet, imperdiet laoreet lacus. Suspendisse imperdiet ultricies."
        },
        {
            title: "slide 4",
            description: "Etiam imperdiet, dui vitae aliquet elementum, lectus urna vestibulum eros, id condimentum quam neque sed ligula. Nam consequat gravida turpis."
        },
        {
            title: "slide 5",
            description: ""
        },
        {
            title: "",
            description: "Nunc egestas dapibus tellus ut ullamcorper. Maecenas id tellus ex. Pellentesque id dolor pulvinar lectus feugiat vehicula. Proin bibendum, felis eget eleifend convallis, velit nulla tempus neque, in sagittis dolor nisi non orci. Aliquam sit amet justo in diam tempor mattis vel non arcu. "
        },
        {
            title: "Nunc egestas dapibus tellus ut ullamcorper. Maecenas id tellus ex. Pellentesque id dolor pulvinar lectus feugiat vehicula. Proin bibendum, felis eget eleifend convallis, velit nulla tempus neque, in sagittis dolor nisi non orci. Aliquam sit amet justo in diam tempor mattis vel non arcu. ",
            description: "Praesent iaculis auctor dolor."
        },
        {
            title: "s",
            description: ""
        },
        {
            title: "d",
            description: ""
        },
        {
            title: "",
            description: "Etiam venenatis tempus"
        }
    ];

    let validSlides = marketingCollection.filter(slide => slide.title.trim() !== "");
    let selectedSlides = [];
    while (selectedSlides.length < 3 && validSlides.length > 0) {
        let index = Math.floor(Math.random() * validSlides.length);
        selectedSlides.push(validSlides.splice(index, 1)[0]);
    }
    
    let contentHeroes = document.querySelectorAll(".contentHero");
    selectedSlides.forEach((slide, index) => {
        if (contentHeroes[index]) {
            contentHeroes[index].querySelector("h1").textContent = slide.title;
            contentHeroes[index].querySelector(".descriptionHero").textContent = slide.description;
        }
    });

    let slides = document.querySelectorAll(".displayHero");

    if (window.innerWidth >= 768) {
        gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".heroWrapper",
                pin: true,
                scrub: 1,
                snap: 1 / (slides.length - 1),
                end: () => "+=" + document.querySelector(".heroWrapper").offsetWidth
            }
        });

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let content = entry.target.querySelector(".contentHero");
                    if (content) {
                        content.classList.add("animate");
                    }
                }
            });
        }, { threshold: 0.6 });

        slides.forEach((slide) => {
            observer.observe(slide);
        });

    } else {
        let slider = tns({
            container: ".heroSlider",
            items: 1,
            slideBy: "page",
            autoplay: true,
            autoplayTimeout: 3000,
            controls: false,
            nav: false,
            mouseDrag: true,
            touch: true,
            speed: 800,
            mode: "gallery",
        });
    }

    
    async function fetchProducts() {
        const carouselContainer = document.getElementById("carousel");
        const response = await fetch("https://dummyjson.com/products?limit=10&skip=20");

        if (response && response.ok) {
            const data = await response.json();

            carouselContainer.innerHTML = ""; 

            data.products.forEach((product, index) => {
                const item = document.createElement("a");
                item.href = product.images[0];
                item.target = "_blank";
                item.classList.add("boxCarousel");
                item.style.backgroundImage = `url('${product.thumbnail}')`; 
                item.style.backgroundSize = "contain";
                item.style.backgroundPosition = "center";

                item.innerHTML = `
                    <div class="contentBoxCarousel">
                        <h3 ${index === 0 ? 'id="firstTitle"' : ''}>${product.title}</h3>
                        <img class="arrowRight" src="./images/arrow-right.png" />
                        <p class="descriptionCarousel">${product.description}</p>
                    </div>
                `;
                carouselContainer.appendChild(item);
            });
            let items = gsap.utils.toArray(".boxCarousel");

            items.forEach((item, index) => {
                gsap.fromTo(item, 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power1.out", 
                      scrollTrigger: {
                          trigger: item,
                          start: "top 80%",
                          end: "top 80%",
                          toggleActions: index === 0 ? "play none none none" : "play none reverse none",
                          once: false
                      }
                    }
                );
            });

            if (window.innerWidth >= 1024) {
                setTimeout(() => {
                const stickyTitle = document.getElementById("stickyTitle");
                const firstTitle = document.getElementById("firstTitle");
                const nextTitle = document.getElementById("nextTitle");

                ScrollTrigger.create({
                    trigger: stickyTitle,
                    start: "center-=50 top",
                    endTrigger: nextTitle,
                    end: "top center",
                    pin: stickyTitle,
                    pinSpacing: false,
                    toggleActions: "play none none reverse"
                });

                ScrollTrigger.refresh();
            }, 500);
            }else{
                setTimeout(() => {
                const stickyTitle = document.getElementById("stickyTitle");
                const nextTitle = document.getElementById("nextTitle");

                ScrollTrigger.create({
                    trigger: stickyTitle,
                    start: "center-=20 top",
                    endTrigger: nextTitle,
                    end: "top center",
                    pin: stickyTitle,
                    pinSpacing: false,
                    toggleActions: "play none none reverse"
                });

                ScrollTrigger.refresh();
            }, 500);
            }
            
        } else {
            console.error("Eroare API");
        }
    }

    async function fetchRotatorProducts() {
        try {
            const response = await fetch("https://dummyjson.com/products?limit=4&skip=10");

            const data = await response.json();
            setupRotator(data.products);
        } catch (error) {
            console.error(error);
        }
    }

    function setupRotator(products) {
    const leftProduct = document.querySelector(".leftProduct");
    const numberElement = leftProduct.querySelector(".firstLetter");
    const descriptionElement = leftProduct.querySelector(".productDescription");
    const rightSections = document.querySelectorAll(".rightProduct");
    const lastProduct = document.getElementById("lastProduct");
    const dotsContainer = document.querySelector(".dots");

    let currentIndex = 0;

    ScrollTrigger.create({
        trigger: leftProduct,
        start: "top center",
        endTrigger: lastProduct,
        end: "bottom center",
        pin: true,
        anticipatePin: 1
    });

    setupDots(products, rightSections);

    rightSections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => updateLeftContent(index),
            onEnterBack: () => updateLeftContent(index)
        });

        if (products[index]) {
            section.style.backgroundImage = `url('${products[index].thumbnail}')`;
            section.style.backgroundSize = "cover";
            section.style.backgroundPosition = "center";
            title = products[index].title;

            const titleElement = section.querySelector(".titleProduct");
            if (titleElement) {
                titleElement.textContent = products[index].title;
            }
        }
    });

    function updateLeftContent(index) {
        if (!products[index] || currentIndex === index) return;
        currentIndex = index;

        gsap.to(numberElement, {
            rotationX: 90,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                numberElement.textContent = index + 1;
                gsap.fromTo(numberElement, 
                    { rotationX: -90, opacity: 0 }, 
                    { rotationX: 0, opacity: 1, duration: 0.2 }
                );
            }
        });

        gsap.to(descriptionElement, { opacity: 0, y: 10, duration: 0.2, onComplete: () => {
            descriptionElement.textContent = products[index].description || "No description available.";
            gsap.to(descriptionElement, { opacity: 1, y: 0, duration: 0.2 });
        }});

        updateActiveDot(index);
    }

    function setupDots(products, rightSections) {
    const dotsContainer = document.querySelector(".dots");
    dotsContainer.innerHTML = "";

    products.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("dot-active");

        dot.addEventListener("click", () => {
            const targetElement = rightSections[index];

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 350; 

                dotsContainer.style.pointerEvents = "none"; 

                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: "smooth" 
                });

                setTimeout(() => {
                    dotsContainer.style.pointerEvents = "auto";
                }, 1000);
            }
        });

        dotsContainer.appendChild(dot);
    });
}
    function updateActiveDot(index) {
        const dots = document.querySelectorAll(".dot");
        dots.forEach(dot => dot.classList.remove("dot-active"));
        dots[index]?.classList.add("dot-active");
    }

    updateActiveDot(0);
    }

    fetchProducts();
    fetchRotatorProducts();


    const sectionThree = document.querySelector(".sectionThree");
    const containerRSThree = document.querySelector(".containerRSThree");
    const originalParent = sectionThree.parentElement;
    function moveSection() {
        if (window.innerWidth < 768) {
            if (!containerRSThree.contains(sectionThree)) {
                containerRSThree.appendChild(sectionThree);
            }
        } else {
            if (!originalParent.contains(sectionThree)) {
                originalParent.appendChild(sectionThree);
            }
        }
    }

    moveSection(); 
    window.addEventListener("resize", moveSection);
});