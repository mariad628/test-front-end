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

    let slides = gsap.utils.toArray(".displayHero");
    
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

    
    async function fetchProducts() {
        const carouselContainer = document.getElementById("carousel");
        const response = await fetch("https://dummyjson.com/products?limit=10&skip=20");

        if (response && response.ok) {
            const data = await response.json();
            console.log("Produse primite de la API:", data.products);

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

            
            setTimeout(() => {
                const stickyTitle = document.getElementById("stickyTitle");
                const firstTitle = document.getElementById("firstTitle");
                const nextTitle = document.getElementById("nextTitle");

                ScrollTrigger.create({
                    trigger: firstTitle,
                    start: "top-=50 center",
                    endTrigger: nextTitle,
                    end: "top center",
                    pin: stickyTitle,
                    pinSpacing: false,
                    toggleActions: "play none none reverse",
                    markers: true
                });

                ScrollTrigger.refresh();
            }, 500);
        } else {
            console.error("Eroare API");
        }
    }

    fetchProducts();
});