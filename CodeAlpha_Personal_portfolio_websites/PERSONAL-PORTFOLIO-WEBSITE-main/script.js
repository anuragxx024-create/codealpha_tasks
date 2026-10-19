/* =====================================
   MOBILE MENU
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("show");

});


/* Close menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


/* =====================================
   FOOTER YEAR
===================================== */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


/* =====================================
   NAVBAR SCROLL EFFECT
===================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(4, 15, 23, 0.97)";

    } else {

        navbar.style.background =
            "rgba(6, 19, 29, 0.90)";

    }

});


/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.style.color = "#55c9ff";

        }

    });

});


/* =====================================
   PROJECT LINK CHECK
===================================== */

const projectLinks =
    document.querySelectorAll(".project-links a");

projectLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const url = link.getAttribute("href");

        if (
            !url ||
            url.includes("YOUR-")
        ) {

            event.preventDefault();

            alert(
                "Please add your project link first."
            );

        }

    });

});