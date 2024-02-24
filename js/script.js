
const navToggle = document.querySelector(".navbar-toggle");
navToggle.addEventListener("click", function () {
    document.querySelector(".portfolio-navbar").classList.toggle("show");
});


const button = document.querySelector('.settings');
const closeButton = document.querySelector('.close');
const quickSettings = document.querySelector('.quick-settings');

button.addEventListener('click', () => {
    quickSettings.classList.remove('none');
    quickSettings.classList.remove('hide');
});

closeButton.addEventListener('click', () => {
    quickSettings.classList.add('hide');
});


// Tab interface for different section of resume

const resumeHeading = document.querySelector(".resume-heading");
const resumeItems = document.querySelectorAll(".resume-item");
const resumeTabs = document.querySelectorAll(".resume-tab");

resumeHeading.onclick = (event) => {
    event.preventDefault();
    const clickedItemId = event.target.dataset.id;
    if (clickedItemId) {
        resumeItems.forEach((item) => {
            item.classList.remove("active");
        });
        event.target.parentElement.classList.add("active");

        resumeTabs.forEach((tab) => {
            tab.classList.remove("active");
        });
        const correspondingTab = document.getElementById(clickedItemId);
        correspondingTab.classList.add("active");
    }
};

// Navbar header sticky while scrolling

function stickyNav() {
    let headerHeight = document.querySelector("#about").offsetHeight / 2;
    let navbar = document.querySelector("header");
    let scrollValue = window.scrollY;

    if (scrollValue > headerHeight) {
        navbar.classList.add("header-sticky");
    } else if (scrollValue < headerHeight) {
        navbar.classList.remove("header-sticky");
    }
}

window.addEventListener("scroll", stickyNav);

// Active link on page scroll

const sections = document.querySelectorAll("section[id]");

function scrollTracker() {
    const currentYScroll = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const id = section.getAttribute("id");
        const currentNavLink = document.querySelector(
            `header .portfolio-navbar a[href*="#${id}"]`
        );
        if (
            currentYScroll > sectionTop &&
            currentYScroll <= sectionTop + sectionHeight
        ) {
            currentNavLink.classList.add("active-link");
        } else {
            currentNavLink.classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollTracker);

// Dark and Light Theme Toggle

function isLight() {
    return localStorage.getItem("dark-mode");
}

function toggleRootClass() {
    document.querySelector("body").classList.toggle("dark");
}

function toggleLocalStorageItem() {
    if (isLight()) {
        localStorage.removeItem("dark-mode");
    } else {
        localStorage.setItem("dark-mode", "set");
    }
}

if (isLight()) {
    toggleRootClass();
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
    toggleLocalStorageItem();
    toggleRootClass();
});

// Scroll to top

// Scroll reveal

const sr = ScrollReveal({
    // reset: true,
    distance: "60px",
    duration: 2500,
    delay: 400,
});

sr.reveal(".about-intro, .project-slider", {
    origin: "left",
});
sr.reveal(
    ".resume-heading,.contact-info,.footer-contact,.testimonial-heading",
    {
        origin: "bottom",
    }
);
sr.reveal(".service-row", {
    origin: "bottom",
    interval: 800,
});
sr.reveal(".resume-body", {
    origin: "top",
});


document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    // Switch dark/light
    document.querySelector(".switch").addEventListener('click', function () {
        let body = document.body;
        if (body.classList.contains("light")) {
            body.classList.remove("light");
            document.querySelector(".switch").classList.remove("switched");
        } else {
            body.classList.add("light");
            document.querySelector(".switch").classList.add("switched");
        }
    });

    // Scroll back to top
    let progressPath = document.querySelector('.progress-wrap path');
    let pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    function updateProgress() {
        let scroll = window.pageYOffset || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - window.innerHeight;
        let progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress);

    let offset = 50;
    let duration = 550;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > offset) {
            document.querySelector('.progress-wrap').classList.add('active-progress');
        } else {
            document.querySelector('.progress-wrap').classList.remove('active-progress');
        }
    });

    document.querySelector('.progress-wrap').addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var range = document.querySelector('input[type="range"]');

    range.addEventListener('input', function() {
        document.body.style.setProperty('--pos', this.value + '%');
    });
});


const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start,end,t) => start * (1-t) + end * t;

function updateScroll() {
    startY = lerp(startY,endY,easing);
    gallery.style.height = `${track.clientHeight}px`;
    track.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const {top} = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
    activateParallax();
    startScroll();
}

window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);

