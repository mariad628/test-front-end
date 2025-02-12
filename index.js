document.addEventListener("DOMContentLoaded", function () {
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

    //animation for contentHero

    let slides = document.querySelectorAll(".displayHero");

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
});
