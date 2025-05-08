---
title: 'Barra de navegación fluida con Bootstrap'
description: 'Barra de navegación con Bootstrap, navegación fluida al hacer clic a un enlace y activación del enlace en función del scroll.'
pubDate: 2025-02-06
image:
    url: '/blog/bootstrap_smooth_scrolling.svg'
    alt: 'Bootstrap smooth scrolling'
    bgColor: '#e9ecef'
tags: ["frontend", "css", "javascript", "bootstrap"]
---

<a href="/demo/bootstrap_smooth_scrolling" target="_blank" rel="noopener noreferrer">Demo</a>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My website</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <style>
    body, section {
      padding-top: 56px;
    }

    section#home {
      background: url('https://picsum.photos/1200/800/?blur');
    }
  </style>
</head>
<body>

  <!-- navbar -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a id="homeBtn" class="navbar-brand" href="#">RGM</a>
        <button id="toggleNavBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#about-me">Sobre mi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skills">Skills</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#projects">Proyectos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <!-- home -->
    <section id="home">
      <div class="px-4 py-5 text-center text-white">
        <h1 class="display-5 fw-bold text-body-emphasis">Rubén González Martín</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Desarrollador Web</p>
        </div>
      </div>
    </section>

    <!-- about me -->
    <section id="about-me">
      <div class="container">
        <h2>Sobre mi</h2>

        <div class="row">
          <div class="col-12 col-md-6">
            <p>Vivo en un acogedor pueblo de La Rioja llamado Alberite, a pocos kilómetros de Logroño, aunque esto es
              desde
              Septiembre de 2020, nací y crecí en Getafe, al sur de Madrid, llevo programando y sin parar de aprender
              desde el
              2014, adoro el mundo del desarrollo web... Lorem ipsum dolor amaet...</p>
          </div>
          <div class="col-12 col-md-6">
            <img src="https://picsum.photos/1200/800" class="img-fluid" alt="">
          </div>
        </div>
      </div>
    </section>

    <!-- skills -->
    <section id="skills">
      <div class="container">
        <h2>Skills</h2>

        <div class="row row-cols-2 row-cols-md-4 g-4">

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

        </div>

        <div class="row row-cols-2 row-cols-md-4 g-4">

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

        </div>

        <div class="row row-cols-2 row-cols-md-4 g-4">

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

          <div class="col">
            <div class="card text-center p-4">
              <img src="https://picsum.photos/300/300" class="card-img-top" alt="">
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- projects -->
    <section id="projects">
      <div class="container">
        <h2>Proyectos</h2>

        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style="background-image: url('https://picsum.photos/300/600');">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                      class="rounded-circle border border-white">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>3d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style="background-image: url('https://picsum.photos/300/600');">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                      class="rounded-circle border border-white">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>Pakistan</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style="background-image: url('https://picsum.photos/300/600');">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h2>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                      class="rounded-circle border border-white">
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#geo-fill"></use>
                    </svg>
                    <small>California</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <svg class="bi me-2" width="1em" height="1em">
                      <use xlink:href="#calendar3"></use>
                    </svg>
                    <small>5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- contact -->
    <section id="contact">
      <div class="container">
        <h2>Contacto</h2>
        <p>rubengm410@gmail.com</p>
      </div>
    </section>

  </main>

  <!-- footer -->
  <footer class="container">
    <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Company, Inc</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <img src="./assets/libs/bootstrap-icons/1.11.2/twitter.svg" alt="">
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <img src="./assets/libs/bootstrap-icons/1.11.2/github.svg" alt="">
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <img src="./assets/libs/bootstrap-icons/1.11.2/linkedin.svg" alt="">
          </a>
        </li>
      </ul>
    </div>
  </footer>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <script>
    $(document).ready(function() {
      $(document).on("scroll", onScroll)
      closeResponsiveNavigation()
      $("#home").height($(window).height() - 112)
    });

    function onScroll(event) {
      let scrollPos = $(document).scrollTop()
      $("#navbarMain ul li a").each(function() {
        let currLink = $(this)
        let refElement = $(currLink.attr("href"))
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height()> scrollPos) {
          $("#navbarMain ul li a").removeClass("active")
          currLink.addClass("active")
        } else {
          currLink.removeClass("active")
        }
      });
    }

    function closeResponsiveNavigation() {
      let menuToggle = $("#navbarMain")
      let bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false })
      let navLinks = $(".nav-item")
      navLinks.each(function() {
        $(this).on("click", () => {
          if ($("#toggleNavBtn").is(":visible")) {
            bsCollapse.toggle()
          }
        })
      })
    }
  </script>
</body>
</html>
```