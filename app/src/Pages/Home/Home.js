import React, { useEffect, useState, useRef } from "react";
import "./scss/main_fullpage.css";
import "./scss/normalize.css";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom/dist";
import { TEXT_HEADER_HOME, TEXT_HOME } from "../../Config/Text";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Home = () => {
  const navigate = useNavigate();

  let initLang = "en";
  if (localStorage.getItem("flagLang") === "true") {
    initLang = "ch";
  }
  const [lang, setLang] = useState(initLang);

  useEffect(() => {
    if (navigator.userAgent.match(/samsung/i)) {
      let msg = textHome.incompatibleBrowser;
      NotificationManager.info(msg, '', 2000000);
    }

    const sections = document.querySelectorAll("section");
    const bg_wrapper = document.querySelectorAll(".bg_wrapper");
    const contents = document.querySelectorAll(".contents");
    const progress_circle = document.querySelectorAll(
      ".scroll_wheel svg circle"
    );
    const slideshow = document.querySelectorAll(".slide_show");
    //const headings = gsap.utils.toArray(".section-heading");
    const about_item = document.querySelectorAll(
      ".about_group .about_item img"
    );
    const play_item = document.querySelectorAll(".kv_play .small_kv");
    const nft_oval = document.querySelectorAll(".nft_oval");
    const nft_img = document.querySelectorAll(".nft_eatie img");
    const nft_shadow = document.querySelectorAll(".nft_oval .shadow");
    const color_obj = document.querySelectorAll(".color_obj");
    const color_wheel = document.querySelectorAll("#scroll_wheel circle");
    const bg_color_obj = document.querySelectorAll(".bg_color_obj");
    const theLogo = document.querySelector(".logo");

    const animationDuration = 1000;
    let lastTime = 0;
    var current_state = 0;

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    console.log(theLogo);
    theLogo.addEventListener("mouseup", function () {
      if (listening) {
        listening = false;
        startTouch = false;
        console.log("aaa");
        goHome();
      }
    });

    let mm = gsap.matchMedia(),
      breakPoint = 600;

    let listening = false,
      direction = "down",
      current,
      next = 0;

    const touch = {
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      startTime: 0,
      dt: 0,
    };

    const tlDefaults = {
      ease: "power2.out",
      duration: 1,
    };

    //Progress wheel
    function addClass(elements, myClass) {
      if (!elements) {
        return;
      }

      if (typeof elements === "string") {
        elements = document.querySelectorAll(elements);
      } else if (elements.tagName) {
        elements = [elements];
      }
      // add class
      for (var i = 0; i < elements.length; i++) {
        elements[i].className = "";
        elements[i].classList.toggle(myClass);
      }
    }

    /////////////////////////////////////////////////////////////////////////////// Slide Show
    var slideDelay = 4;
    var slideDuration = 0.3;
    var wrap = true;

    var slides = document.querySelectorAll(".slide");
    var progressWrap = gsap.utils.wrap(0, 1);

    var numSlides = slides.length;

    gsap.set(slides, {
      xPercent: (i) => i * 100,
    });

    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);

    var animation = gsap.to(slides, {
      xPercent: "-=" + numSlides * 100,
      duration: 1,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrapX,
      },
    });

    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;

    resize();

    window.addEventListener("resize", resize);

    function updateDraggable() {
      timer.restart(true);
      slideAnimation.kill();
      this.update();
    }

    function animateSlides(direction) {
      timer.restart(true);
      slideAnimation.kill();
      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onUpdate: updateProgress,
      });
    }

    function autoPlay() {
      //timer.restart(true);
      animateSlides(-1);
    }

    function updateProgress() {
      animation.progress(
        progressWrap(gsap.getProperty(proxy, "x") / wrapWidth)
      );
    }

    function snapX(value) {
      let snapped = gsap.utils.snap(slideWidth, value);
      return wrap
        ? snapped
        : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;

      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;

      // wrap || draggable.applyBounds({minX: -slideWidth * (numSlides - 1), maxX: 0});

      gsap.set(proxy, {
        x: norm * wrapWidth,
      });

      animateSlides(0);
      slideAnimation.progress(1);
    }

    ///////////////////////////////////////////////////////////STORES
    gsap
      .timeline({
        ease: "power2.out",
        duration: 12,
        repeat: -1,
        onComplete: () => { },
      })
      .to(".store01", { autoAlpha: 1 }, 0)
      .to(".store04", { autoAlpha: 0 }, 0)
      .to(".store02", { autoAlpha: 1 }, 3)
      .to(".store01", { autoAlpha: 0 }, 3)
      .to(".store03", { autoAlpha: 1 }, 6)
      .to(".store02", { autoAlpha: 0 }, 6)
      .to(".store04", { autoAlpha: 1 }, 9)
      .to(".store03", { autoAlpha: 0 }, 9);

    ///////////////////////////////////////////////////////////SET

    gsap.set(".about_oval", { top: "110vh" });
    gsap.set(".play_oval", { autoAlpha: 0, scale: 0.01 });
    gsap.set(".oval_group", { autoAlpha: 0 });
    gsap.set(nft_oval, { autoAlpha: 0 });
    gsap.set(".map_bg", { autoAlpha: 0 });
    gsap.set(".connect_bread", { top: "45vh", right: "-150vw", autoAlpha: 1 });

    function car_moving() {
      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop, isMobile, reduceMotion } = context.conditions;

          gsap.fromTo(
            ".bread_car",
            {
              translateX: isDesktop ? "0" : "0",
              translateY: isDesktop ? "0" : "35%",
            },
            {
              translateX: isDesktop ? "-620%" : "-580%",
              translateY: isDesktop ? "400%" : "440%",
              duration: 4,
              repeat: -1,
              repeatDelay: 1,
            }
          );

          return () => { };
        }
      );
    }
    car_moving();

    /////////////////////////////////////////////////////////////////////////////// Scroll Down
    function slideIn() {
      // The first time this function runs, current is undefined
      if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });
      if (current !== undefined) gsap.set(bg_wrapper[current], { zIndex: 0 });
      if (current !== 0) gsap.to(contents[current - 1], { autoAlpha: 0 });

      switch (next) {
        case 0:
          // index
          addClass("#scroll_wheel", "percent_0");

          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(".logo", { y: "65vh", autoAlpha: 0, scale: 0.5 });
          gsap.set(".slogan", { y: "51vh", autoAlpha: 0 });
          gsap.set(".slide_show", { x: "-250vh" });
          gsap.set(".languages", { autoAlpha: 0 });
          gsap.set(".login", { autoAlpha: 0 });
          gsap.set(".footer_wrapper", { autoAlpha: 0 });
          gsap.set(about_item, { y: 0, autoAlpha: 0 });
          gsap.set(".about_oval", {
            top: "110vh",
            width: "130vw",
            height: "300vh",
          });

          mm.add(
            {
              // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    listening = true;
                    current = next;
                  },
                })
                .to(".logo", {
                  y: isDesktop ? "35vh" : "18vh",
                  scale: isDesktop ? 1.8 : 1.3,
                  autoAlpha: 1,
                  duration: 2,
                  ease: "elastic",
                })
                .to(
                  ".slogan",
                  {
                    y: isDesktop ? "46vh" : "28vh",
                    autoAlpha: 1,
                    duration: 0.8,
                  },
                  1
                )
                .to(".slide_show", { x: "0vw", duration: 1.5, ease: "back" }, 2)
                .to(".languages", { autoAlpha: 1 })
                .to(".login", { autoAlpha: 1 }, "-=1");
              // .to("footer", { autoAlpha: 1 }, "-=0.5");
              return () => {
                // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
                // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
              };
            }
          );
          break;

        case 1:
          // index to about
          //console.log("1 begin current:"+current+" next:"+next);
          addClass("#scroll_wheel", "percent_20");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 82,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".kv_about", { autoAlpha: 1, visibility: true });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => { },
                })
                .to(".logo", { y: 5, scale: 1, fill: "#000000" }, 0)
                .to(".slogan", { autoAlpha: 0 }, 0)
                .to(".slide_show", { y: "-110vh" }, 0)
                .to(".about_oval", {
                  top: "-10vh",
                  width: "300vw",
                  height: "200vh",
                })
                .to(color_obj, { backgroundColor: "#F290D7" }, "<")
                .to(bg_color_obj, { color: "#F290D7" }, "<")
                .to(color_wheel, { stroke: "#F290D7" }, "<");

              gsap.set(about_item, { autoAlpha: 0, y: 0 });
              gsap
                .timeline({
                  duration: 1,
                  onComplete: () => { },
                })
                .to(".about1 img", {
                  autoAlpha: 1,
                  // y: isDesktop ? "30vw" : "24vh",
                  y: isDesktop ? "30vw" : "15vh",
                  x: isDesktop ? "0" : "18vw",
                  ease: "back",
                })
                .to(
                  ".about2 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "25vw" : "16vh",
                    y: isDesktop ? "25vw" : "7vh",
                    x: isDesktop ? "0" : "-43vw",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about3 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "30vw" : "24vh",
                    y: isDesktop ? "40vw" : "24vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about4 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "25vw" : "34vh",
                    y: isDesktop ? "25vw" : "25vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about5 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "45vw" : "70vh",
                    y: isDesktop ? "52vw" : "70vh",
                    x: isDesktop ? "12vh" : "12vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about6 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "45vw" : "27vh",
                    x: isDesktop ? "6vw" : "0",
                    y: isDesktop ? "42vw" : "27vh",
                    ease: "back",
                  },
                  "-=.3"
                );

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    //console.log("1 onComplete current:"+current+" next:"+next);
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                    //console.log("1 End current:"+current+" next:"+next);
                  },
                })
                .from(".kv_about", { autoAlpha: 0, yPercent: 10 })
                .to(contents[current], { autoAlpha: 1 });
              return () => { };
            }
          );
          break;

        case 2:
          // about to play
          console.log("2 begin current:" + current + " next:" + next);
          addClass("#scroll_wheel", "percent_40");
          //gsap.to(contents[current-1], { autoAlpha: 0 })

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".kv_about", { zIndex: 1 });
          gsap.set(".play_oval", { autoAlpha: 1, scale: 0.001 });
          gsap.set(".kv_play", { autoAlpha: 0 });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;
              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => { },
                })
                .to(
                  about_item,
                  { duration: 0.5, y: isDesktop ? "150vw" : "150vh" },
                  0
                )
                .to(".kv_about", { autoAlpha: 0 }, 0.5)
                .to(".play_oval", { scale: 2 })
                .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
                .to(bg_color_obj, { color: "#FFFFFF" }, "<")
                .to(color_wheel, { stroke: "#FFFFFF" }, "<")
                .to(".kv_play", { autoAlpha: 1 });

              gsap
                .timeline({
                  ease: "elastic",
                  duration: 0.8,
                  onComplete: () => { },
                })
                .from(play_item, {
                  duration: 1.5,
                  stagger: 0.2,
                  autoAlpha: 0,
                  x: 500,
                  ease: "back",
                });

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    //console.log("2 onComplete current:"+current+" next:"+next);
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                    //console.log("2 End current:"+current+" next:"+next);
                  },
                })
                .to(contents[current], { autoAlpha: 1 });
              return () => { };
            }
          );
          break;

        case 3:
          //play > nft
          addClass("#scroll_wheel", "percent_60");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".oval_group", { xPercent: 0, autoAlpha: 1, zIndex: 4 });
          gsap.set(".play_oval", { zIndex: 1, backgroundColor: "#ffffff" });
          gsap.set(".nft_oval", { autoAlpha: 1, scale: 8 });
          gsap.set(nft_img, { yPercent: 5 });
          gsap.set(nft_shadow, { autoAlpha: 1, filter: "blur(0px)" });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;
              gsap
                .timeline({
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                .to(".kv_play", {
                  autoAlpha: 0,
                  duration: 0.5,
                  ease: "power2.out",
                })
                .to(
                  ".nft05",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.9 : 0.5,
                    xPercent: isDesktop ? -12 : -35,
                    yPercent: isDesktop ? -30 : -95,
                  },
                  1.1
                )
                .to(
                  ".nft01",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.4 : 0.3,
                    xPercent: isDesktop ? -40 : -16,
                    yPercent: isDesktop ? -36 : -50,
                  },
                  1.2
                )
                .to(
                  ".nft02",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.7 : 0.5,
                    xPercent: isDesktop ? -14 : 30,
                    yPercent: isDesktop ? -36 : 5,
                  },
                  1.2
                )
                .to(
                  ".nft03",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 1.2 : 1,
                    xPercent: isDesktop ? 70 : 150,
                    yPercent: isDesktop ? -15 : 5,
                  },
                  1.3
                )
                .to(
                  ".nft04",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 1.4 : 1,
                    xPercent: isDesktop ? -70 : -25,
                    yPercent: isDesktop ? -22 : -55,
                  },
                  1.3
                )
                .to(nft_img, {
                  duration: 0.4,
                  yPercent: -100,
                  stagger: 0.1,
                  ease: "back",
                })
                .to(
                  nft_shadow,
                  {
                    duration: 0.4,
                    autoAlpha: 0.3,
                    filter: "blur(10px)",
                    stagger: 0.1,
                  },
                  "-=0.8"
                )
                .to(color_obj, { backgroundColor: "#F290D7" }, "<")
                .to(bg_color_obj, { color: "#F290D7" }, "<")
                .to(color_wheel, { stroke: "#F290D7" }, "<")
                .to(contents[current], { autoAlpha: 1 });
              return () => { };
            }
          );
          break;

        case 4:
          //nft > map
          addClass("#scroll_wheel", "percent_80");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".oval_group", { autoAlpha: 1, zIndex: 2 });
          gsap.set(".map_bg", { autoAlpha: 0, visibility: true, zIndex: 2 });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              // gsap.set(".oval_group", { xPercent: 0, autoAlpha: 1, zIndex: 4 });
              // gsap.set(".play_oval", { zIndex: 1, backgroundColor: "#ffffff" });
              // gsap.set(".nft_oval", { autoAlpha: 1, scale: 8 });
              // gsap.set(nft_img, { yPercent: 5 });
              // gsap.set(nft_shadow, { autoAlpha: 1, filter: "blur(0px)" });


              gsap.set(".map_group", {
                /* bottom:isDesktop ? '-125vh' : '-62vh', */ autoAlpha: 0,
                visibility: true,
                rotate: "90deg",
              });

              gsap
                .timeline({
                  onComplete: () => {
                    // gsap.set(sections[current], {
                    //   autoAlpha: 0,
                    //   visibility: false,
                    //   zIndex: 0,
                    // });
                    // listening = true;
                    // current = next;
                  },
                })
                .to(nft_img, {
                  duration: 0.4,
                  yPercent: 5,
                  stagger: 0.1,
                  ease: "back",
                })
                .to(
                  nft_shadow,
                  {
                    duration: 0.4,
                    autoAlpha: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                  },
                  "-=0.8"
                )
                .to(nft_oval, {
                  duration: 0.6,
                  autoAlpha: 1,
                  scale: 8,
                });


              // .to(".play_oval", { backgroundColor: "#f290d7" })
              // .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
              // .to(bg_color_obj, { color: "#FFFFFF" }, "<")
              // .to(color_wheel, { stroke: "#FFFFFF" }, "<")
              // .to(".kv_play", { autoAlpha: 1 })
              // .to(nft_oval, { autoAlpha: 0 })
              // .to(contents[next - 1], { autoAlpha: 1 });

              setTimeout(function () {
                gsap
                  .timeline({
                    onComplete: () => {
                      gsap.set(sections[current], {
                        autoAlpha: 0,
                        visibility: false,
                        zIndex: 0,
                      });
                      listening = true;
                      current = next;
                    },
                  })
                  // .to(
                  //   ".oval_group",
                  //   { xPercent: -280, duration: 0.8, ease: "power2.out" },
                  //   0
                  // )
                  .to(".play_oval", { backgroundColor: "#f290d7" }, 0)
                  .to(
                    ".map_bg",
                    { duration: 0.5, autoAlpha: 1, ease: "power2.out" },
                    0.8
                  )
                  .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
                  .to(bg_color_obj, { color: "#FFFFFF" }, "<")
                  .to(color_wheel, { stroke: "#FFFFFF" }, "<")
                  .to(".map_group", {
                    translateX: isDesktop ? "0" : "27%",
                    translateY: isDesktop ? "40%" : "60%",
                    duration: 0.8,
                    autoAlpha: 1,
                    rotate: isDesktop ? "0deg" : "-40deg",
                    ease: "power2.out",
                  })
                  .to(contents[current], { autoAlpha: 1 });
              }, 800);
              return () => { };

            }
          );



          // gsap.set(sections[current], { zIndex: 0 });
          // gsap.set(sections[next], {
          //   autoAlpha: 1,
          //   visibility: true,
          //   zIndex: 8,
          // });
          // gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          // gsap.set(".oval_group", { autoAlpha: 1, zIndex: 2 });
          // gsap.set(".map_bg", { autoAlpha: 0, visibility: true, zIndex: 2 });

          // mm.add(
          //   {
          //     isDesktop: `(min-width: ${breakPoint}px)`,
          //     isMobile: `(max-width: ${breakPoint - 1}px)`,
          //     reduceMotion: "(prefers-reduced-motion: reduce)",
          //   },
          //   (context) => {
          //     let { isDesktop, isMobile, reduceMotion } = context.conditions;

          //     gsap.set(".map_group", {
          //       /* bottom:isDesktop ? '-125vh' : '-62vh', */ autoAlpha: 0,
          //       visibility: true,
          //       rotate: "90deg",
          //     });
          //     gsap
          //       .timeline({
          //         onComplete: () => {
          //           gsap.set(sections[current], {
          //             autoAlpha: 0,
          //             visibility: false,
          //             zIndex: 0,
          //           });
          //           listening = true;
          //           current = next;
          //         },
          //       })
          //       .to(
          //         ".oval_group",
          //         { xPercent: -280, duration: 0.8, ease: "power2.out" },
          //         0
          //       )
          //       .to(".play_oval", { backgroundColor: "#f290d7" }, 0)
          //       .to(
          //         ".map_bg",
          //         { duration: 0.5, autoAlpha: 1, ease: "power2.out" },
          //         0.8
          //       )
          //       .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
          //       .to(bg_color_obj, { color: "#FFFFFF" }, "<")
          //       .to(color_wheel, { stroke: "#FFFFFF" }, "<")
          //       .to(".map_group", {
          //         translateX: isDesktop ? "0" : "27%",
          //         translateY: isDesktop ? "38%" : "60%",
          //         duration: 0.8,
          //         autoAlpha: 1,
          //         rotate: isDesktop ? "0deg" : "-40deg",
          //         ease: "power2.out",
          //       })
          //       .to(contents[current], { autoAlpha: 1 });
          //     return () => { };
          //   }
          // );
          break;

        case 5:
          //map > connect
          addClass("#scroll_wheel", "percent_100");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap.set(".connect_bread", {
                top: isDesktop ? "40vh" : "60vh",
                right: "-100vw",
                zIndex: 5,
              });
              gsap.set(".bread_car", {
                translateX: isDesktop ? "0" : "0%",
                translateY: isDesktop ? "0" : "35%",
              });
              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    listening = true;
                    current = next;
                  },
                })
                .to(
                  ".map_group",
                  { translateY: "10%", rotate: "90deg", autoAlpha: 0 },
                  0
                )
                .to(".connect_bread", {
                  top: isDesktop ? "30vh" : "60vh",
                  right: isDesktop ? "-4vw" : "-8vw",
                })
                .to(contents[current], { autoAlpha: 1 });

              gsap
                .to(".footer_wrapper", { autoAlpha: 1 }, "-=0.5");
              return () => { };
            }
          );
          break;
        default:
          console.log("unknow");
      }
    }

    /////////////////////////////////////////////////////////////////////////////// Scroll Up
    function slideOut() {
      //gsap.set(sections[next], { autoAlpha: 0, zIndex: 8 });
      gsap.to(contents[current], { autoAlpha: 0 });

      switch (next) {
        case 0:
          // about > index
          addClass("#scroll_wheel", "percent_0");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(".slogan", { y: "51vh", autoAlpha: 0 });
          gsap.set(".slide_show", { y: "-120vh" });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 0.8,
                  onComplete: () => { },
                })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(".kv_about", { autoAlpha: 0 }, 0.5)
                .to(
                  about_item,
                  { duration: 0.5, y: isDesktop ? "150vw" : "150vh" },
                  0.5
                )
                .to(".about_oval", {
                  top: "110vh",
                  width: "130vw",
                  height: "300vh",
                })
                .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
                .to(bg_color_obj, { color: "#FFFFFF" }, "<")
                .to(color_wheel, { stroke: "#FFFFFF" }, "<")
                .to(".logo", {
                  y: isDesktop ? "35vh" : "18vh",
                  scale: isDesktop ? 1.8 : 1.3,
                })
                .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6");

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 0.8,
                  onComplete: () => {
                    listening = true;
                    current = next;
                  },
                })
                .to(".slogan", {
                  y: isDesktop ? "46vh" : "28vh",
                  autoAlpha: 1,
                  duration: 1.2,
                })
                .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6");
              return () => { };
            }
          );
          break;

        case 1:
          // play > about
          addClass("#scroll_wheel", "percent_20");

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(about_item, { autoAlpha: 0, y: "0vw" });
          gsap.set(".about_group", { zIndex: 2 });
          gsap.set(contents[current - 1], { visibility: true, zIndex: 2 });
          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 0.8,
                  onComplete: () => {
                    listening = true;
                    current = next;
                  },
                })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(
                  ".kv_play",
                  { autoAlpha: 0, duration: 0.5, ease: "power2.out" },
                  0.5
                )
                .to(".play_oval", { scale: 0.01, autoAlpha: 0 })
                .to(".about1 img", {
                  autoAlpha: 1,
                  // y: isDesktop ? "30vw" : "24vh",
                  y: isDesktop ? "30vw" : "15vh",
                  x: isDesktop ? "0" : "18vw",
                  ease: "back",
                })
                .to(
                  ".about2 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "25vw" : "16vh",
                    y: isDesktop ? "25vw" : "11vh",
                    x: isDesktop ? "0" : "-43vw",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about3 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "30vw" : "24vh",
                    y: isDesktop ? "40vw" : "24vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about4 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "25vw" : "34vh",
                    y: isDesktop ? "25vw" : "25vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about5 img",
                  {
                    autoAlpha: 1,
                    // y: isDesktop ? "45vw" : "70vh",
                    y: isDesktop ? "52vw" : "70vh",
                    x: isDesktop ? "12vh" : "12vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(
                  ".about6 img",
                  {
                    autoAlpha: 1,
                    y: isDesktop ? "45vw" : "27vh",
                    ease: "back",
                  },
                  "-=.3"
                )
                .to(".kv_about", { autoAlpha: 1, yPercent: 0 })
                .to(color_obj, { backgroundColor: "#F290D7" }, "<")
                .to(bg_color_obj, { color: "#F290D7" }, "<")
                .to(color_wheel, { stroke: "#F290D7" }, "<")
                .to(contents[next - 1], { autoAlpha: 1 });
              return () => { };
            }
          );
          break;
        case 2:
          // nft > play
          addClass("#scroll_wheel", "percent_40");

          gsap.set(sections[current], { zIndex: 7 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              // gsap.set(".oval_group", { xPercent: 0, autoAlpha: 1, zIndex: 4 });
              // gsap.set(".play_oval", { zIndex: 1, backgroundColor: "#ffffff" });
              // gsap.set(".nft_oval", { autoAlpha: 1, scale: 8 });
              // gsap.set(nft_img, { yPercent: 5 });
              // gsap.set(nft_shadow, { autoAlpha: 1, filter: "blur(0px)" });


              gsap
                .timeline({
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                // .to(".kv_play", {
                //   autoAlpha: 0,
                //   duration: 0.5,
                //   ease: "power2.out",
                // })

                // .to(
                //   ".nft05",
                //   {
                //     duration: 0.6,
                //     // scale: isDesktop ? 0.9 : 0.5,
                //     // xPercent: isDesktop ? -12 : -35,
                //     yPercent: 5,
                //   },
                //   1.1
                // )
                // .to(
                //   ".nft01",
                //   {
                //     duration: 0.6,
                //     // scale: isDesktop ? 0.4 : 0.3,
                //     // xPercent: isDesktop ? -40 : -16,
                //     // yPercent: isDesktop ? -36 : -50,
                //     yPercent: 5,
                //   },
                //   1.2
                // )
                // .to(
                //   ".nft02",
                //   {
                //     duration: 0.6,
                //     // scale: isDesktop ? 0.7 : 0.5,
                //     // xPercent: isDesktop ? -14 : 30,
                //     // yPercent: isDesktop ? -36 : 5,
                //     yPercent: 5,
                //   },
                //   1.2
                // )
                // .to(
                //   ".nft03",
                //   {
                //     duration: 0.6,
                //     // scale: isDesktop ? 1.2 : 1,
                //     // xPercent: isDesktop ? 70 : 150,
                //     // yPercent: isDesktop ? -15 : 5,
                //     yPercent: 5,
                //   },
                //   1.3
                // )
                // .to(
                //   ".nft04",
                //   {
                //     duration: 0.6,
                //     // scale: isDesktop ? 1.4 : 1,
                //     // xPercent: isDesktop ? -70 : -25,
                //     // yPercent: isDesktop ? -22 : -55,
                //     yPercent: 5,
                //   },
                //   1.3
                // )
                .to(nft_img, {
                  duration: 0.4,
                  yPercent: 5,
                  stagger: 0.1,
                  ease: "back",
                })
                .to(
                  nft_shadow,
                  {
                    duration: 0.4,
                    autoAlpha: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                  },
                  "-=0.8"
                )
                .to(nft_oval, {
                  duration: 0.6,
                  autoAlpha: 1,
                  scale: 8,
                })


                .to(".play_oval", { backgroundColor: "#f290d7" })
                .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
                .to(bg_color_obj, { color: "#FFFFFF" }, "<")
                .to(color_wheel, { stroke: "#FFFFFF" }, "<")
                .to(".kv_play", { autoAlpha: 1 })
                .to(nft_oval, { autoAlpha: 0 })
                .to(contents[next - 1], { autoAlpha: 1 });


              gsap
                .timeline({
                  ease: "elastic",
                  duration: 0.8,
                  onComplete: () => { },
                })
                .from(play_item, {
                  duration: 1.5,
                  stagger: 0.2,
                  autoAlpha: 0,
                  x: 500,
                  ease: "back",
                });
              return () => { };

              // gsap
              //   .timeline({
              //     ease: "power2.out",
              //     duration: 1,
              //     onComplete: () => {
              //       gsap.set(sections[current], {
              //         autoAlpha: 0,
              //         visibility: false,
              //         zIndex: 0,
              //       });
              //       listening = true;
              //       current = next;
              //     },
              //   })
              //   .to(contents[next], { autoAlpha: 0 }, 0)
              //   .to(
              //     ".oval_group",
              //     { xPercent: 140, duration: 0.8, ease: "power2.out" },
              //     0
              //   )
              //   .to(".play_oval", { backgroundColor: "#f290d7" })
              //   .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
              //   .to(bg_color_obj, { color: "#FFFFFF" }, "<")
              //   .to(color_wheel, { stroke: "#FFFFFF" }, "<")
              //   .to(".kv_play", { autoAlpha: 1 })
              //   .to(contents[next - 1], { autoAlpha: 1 });

              // gsap
              //   .timeline({
              //     ease: "elastic",
              //     duration: 0.8,
              //     onComplete: () => { },
              //   })
              //   .from(play_item, {
              //     duration: 1.5,
              //     stagger: 0.2,
              //     autoAlpha: 0,
              //     x: 500,
              //     ease: "back",
              //   });
              // return () => { };
            }
          );

          break;

        case 3:
          // map > nft
          addClass("#scroll_wheel", "percent_60");


          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".oval_group", { xPercent: 0, autoAlpha: 1, zIndex: 4 });
          gsap.set(".play_oval", { zIndex: 1, backgroundColor: "#ffffff" });
          gsap.set(".nft_oval", { autoAlpha: 1, scale: 8 });
          gsap.set(nft_img, { yPercent: 5 });
          gsap.set(nft_shadow, { autoAlpha: 1, filter: "blur(0px)" });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;
              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(".map_group", { rotate: "90deg", autoAlpha: 0 })
                .to(".map_bg", { autoAlpha: 0 })
                .to(
                  ".nft05",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.9 : 0.5,
                    xPercent: isDesktop ? -12 : -35,
                    yPercent: isDesktop ? -30 : -95,
                  },
                  1.1
                )
                .to(
                  ".nft01",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.4 : 0.3,
                    xPercent: isDesktop ? -40 : -16,
                    yPercent: isDesktop ? -36 : -50,
                  },
                  1.2
                )
                .to(
                  ".nft02",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 0.7 : 0.5,
                    xPercent: isDesktop ? -14 : 30,
                    yPercent: isDesktop ? -36 : 5,
                  },
                  1.2
                )
                .to(
                  ".nft03",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 1.2 : 1,
                    xPercent: isDesktop ? 70 : 150,
                    yPercent: isDesktop ? -15 : 5,
                  },
                  1.3
                )
                .to(
                  ".nft04",
                  {
                    duration: 0.6,
                    scale: isDesktop ? 1.4 : 1,
                    xPercent: isDesktop ? -70 : -25,
                    yPercent: isDesktop ? -22 : -55,
                  },
                  1.3
                )
                .to(nft_img, {
                  duration: 0.4,
                  yPercent: -100,
                  stagger: 0.1,
                  ease: "back",
                })
                .to(
                  nft_shadow,
                  {
                    duration: 0.4,
                    autoAlpha: 0.3,
                    filter: "blur(10px)",
                    stagger: 0.1,
                  },
                  "-=0.8"
                )
                .to(color_obj, { backgroundColor: "#F290D7" }, "<")
                .to(bg_color_obj, { color: "#F290D7" }, "<")
                .to(color_wheel, { stroke: "#F290D7" }, "<")
                .to(contents[next - 1], { autoAlpha: 1 });
              return () => { };
            }
          );



          // gsap.set(sections[current], { zIndex: 7 });
          // gsap.set(sections[next], {
          //   autoAlpha: 1,
          //   visibility: true,
          //   zIndex: 8,
          // });
          // gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          // gsap.set(".play_oval", { autoAlpha: 1, visibility: true, zIndex: 2 });
          // gsap.set(".oval_group", { zIndex: 3 });

          // mm.add(
          //   {
          //     isDesktop: `(min-width: ${breakPoint}px)`,
          //     isMobile: `(max-width: ${breakPoint - 1}px)`,
          //     reduceMotion: "(prefers-reduced-motion: reduce)",
          //   },
          //   (context) => {
          //     let { isDesktop, isMobile, reduceMotion } = context.conditions;

          //     gsap
          //       .timeline({
          //         ease: "power2.out",
          //         duration: 1,
          //         onComplete: () => {
          //           gsap.set(sections[current], {
          //             autoAlpha: 0,
          //             visibility: false,
          //             zIndex: 0,
          //           });
          //           gsap.set(".map_bg", { autoAlpha: 0 });
          //           listening = true;
          //           current = next;
          //         },
          //       })
          //       .to(contents[next], { autoAlpha: 0 }, 0)
          //       .to(".map_group", { rotate: "90deg", autoAlpha: 0 })
          //       .to(".play_oval", { backgroundColor: "#ffffff" })
          //       .to(color_obj, { backgroundColor: "#F290D7" }, "<")
          //       .to(bg_color_obj, { color: "#F290D7" }, "<")
          //       .to(color_wheel, { stroke: "#F290D7" }, "<")
          //       .to(".oval_group", {
          //         xPercent: 0,
          //         duration: 0.8,
          //         ease: "power2.out",
          //       })
          //       .to(contents[next - 1], { autoAlpha: 1 });
          //     return () => { };
          //   }
          // );
          break;
        case 4:
          // connect > map
          addClass("#scroll_wheel", "percent_80");

          // gsap.set(sections[current], { zIndex: 8 });
          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".map_group", {
            autoAlpha: 0,
            visibility: true,
            rotate: "90deg",
          });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                .to(".footer_wrapper", { autoAlpha: 0 }, "-=0.5")
                .to(contents[next], { autoAlpha: 0 })
                .to(".connect_bread", {
                  top: isDesktop ? "45vh" : "60vh",
                  right: isDesktop ? "-150vw" : "-150vw",
                })
                .to(".map_group", {
                  translateX: isDesktop ? "0" : "27%",
                  translateY: isDesktop ? "38%" : "60%",
                  duration: 0.8,
                  autoAlpha: 1,
                  rotate: isDesktop ? "0deg" : "-40deg",
                  ease: "power2.out",
                })
                .to(contents[next - 1], { autoAlpha: 1 });

              return () => { };
            }
          );
          break;
        case 5:
          // connect
          addClass("#scroll_wheel", "percent_100");
          console.log("connect");
          break;
        default:
          // code block
          console.log("unknow");
      }
    }


    /////////////////////////////////////////////////////////////////////////////// Scroll Up
    function goHome() {
      window.location.reload(false);
      return;

      gsap.to(contents[current], { autoAlpha: 0 });

      console.log("current", current);

      if (!current || current === 0)
        return;

      next = 0;

      addClass("#scroll_wheel", "percent_0");
      gsap.set(sections[next], {
        autoAlpha: 1,
        visibility: true,
        zIndex: 8,
      });

      switch (current) {
        case 1:
          gsap.set(sections[current], { zIndex: 0 });
          // gsap.set(".slogan", { y: "51vh", autoAlpha: 0 });
          // gsap.set(".slide_show", { y: "-120vh" });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 0.8,
                  onComplete: () => { },
                })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(".kv_about", { autoAlpha: 0 }, 0.5)
                .to(
                  about_item,
                  { duration: 0.5, y: isDesktop ? "150vw" : "150vh" },
                  0.5
                )
                .to(".about_oval", {
                  top: "110vh",
                  width: "130vw",
                  height: "300vh",
                });
              return () => { };
            }
          );
          break;
        case 2:

          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(about_item, { autoAlpha: 0, y: "0vw" });
          gsap.set(".about_group", { zIndex: 2 });
          // gsap.set(".play_oval", { zIndex: 1, backgroundColor: "#ffffff" });
          // gsap.set(contents[current - 1], { visibility: true, zIndex: 2 });
          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 0.8,
                  onComplete: () => { },
                })
                .to(contents[current - 1], { autoAlpha: 0 })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(".about_oval", {
                  top: "110vh",
                  width: "130vw",
                  height: "300vh",
                })
                .to(".play_oval", { scale: 0.01, autoAlpha: 0 })
                .to(
                  ".kv_play",
                  { autoAlpha: 0, duration: 0.5, ease: "power2.out" },
                  0.5
                );
              // .to(".play_oval", { scale: 0.01, autoAlpha: 0 })
              // .to(color_obj, { backgroundColor: "#F290D7" }, "<")
              // .to(bg_color_obj, { color: "#F290D7" }, "<")
              // .to(color_wheel, { stroke: "#F290D7" }, "<");
              return () => { };
            }
          );
          break;
        case 3:
          // nft > play
          addClass("#scroll_wheel", "percent_40");

          gsap.set(sections[current], { zIndex: 7 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                .to(nft_img, {
                  duration: 0.4,
                  yPercent: 5,
                  stagger: 0.1,
                  ease: "back",
                })
                .to(
                  nft_shadow,
                  {
                    duration: 0.4,
                    autoAlpha: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                  },
                  "-=0.8"
                )
                .to(nft_oval, {
                  duration: 0.6,
                  autoAlpha: 1,
                  scale: 8,
                })
                .to(".play_oval", { backgroundColor: "#f290d7" })
                .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
                .to(bg_color_obj, { color: "#FFFFFF" }, "<")
                .to(color_wheel, { stroke: "#FFFFFF" }, "<")
                .to(".kv_play", { autoAlpha: 1 })
                .to(nft_oval, { autoAlpha: 0 });
              // .to(contents[next - 1], { autoAlpha: 1 });


              // gsap
              //   .timeline({
              //     ease: "elastic",
              //     duration: 0.8,
              //     onComplete: () => { },
              //   })
              //   .from(play_item, {
              //     duration: 1.5,
              //     stagger: 0.2,
              //     autoAlpha: 0,
              //     x: 500,
              //     ease: "back",
              //   });
              return () => { };
            }
          );

          break;
        case 4:
          // map > nft
          addClass("#scroll_wheel", "percent_60");

          gsap.set(sections[current], { zIndex: 7 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".play_oval", { autoAlpha: 1, visibility: true, zIndex: 2 });
          gsap.set(".oval_group", { zIndex: 3 });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    gsap.set(".map_bg", { autoAlpha: 0 });
                    listening = true;
                    current = next;
                  },
                })
                .to(contents[next], { autoAlpha: 0 }, 0)
                .to(".map_group", { rotate: "90deg", autoAlpha: 0 })
                .to(".play_oval", { backgroundColor: "#ffffff" })
                .to(color_obj, { backgroundColor: "#F290D7" }, "<")
                .to(bg_color_obj, { color: "#F290D7" }, "<")
                .to(color_wheel, { stroke: "#F290D7" }, "<")
                .to(".oval_group", {
                  xPercent: 0,
                  duration: 0.8,
                  ease: "power2.out",
                })
                .to(contents[next - 1], { autoAlpha: 1 });
              return () => { };
            }
          );
          break;
        case 5:
          // connect > map
          addClass("#scroll_wheel", "percent_80");

          // gsap.set(sections[current], { zIndex: 8 });
          gsap.set(sections[current], { zIndex: 0 });
          gsap.set(sections[next], {
            autoAlpha: 1,
            visibility: true,
            zIndex: 8,
          });
          gsap.set(contents[current], { autoAlpha: 0, visibility: true });
          gsap.set(".map_group", {
            autoAlpha: 0,
            visibility: true,
            rotate: "90deg",
          });

          mm.add(
            {
              isDesktop: `(min-width: ${breakPoint}px)`,
              isMobile: `(max-width: ${breakPoint - 1}px)`,
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              let { isDesktop, isMobile, reduceMotion } = context.conditions;

              gsap
                .timeline({
                  ease: "power2.out",
                  duration: 1,
                  onComplete: () => {
                    gsap.set(sections[current], {
                      autoAlpha: 0,
                      visibility: false,
                      zIndex: 0,
                    });
                    listening = true;
                    current = next;
                  },
                })
                .to("footer", { autoAlpha: 0 }, "-=0.5")
                .to(contents[next], { autoAlpha: 0 })
                .to(".connect_bread", {
                  top: isDesktop ? "45vh" : "60vh",
                  right: isDesktop ? "-150vw" : "-150vw",
                })
                .to(".map_group", {
                  translateX: isDesktop ? "0" : "27%",
                  translateY: isDesktop ? "38%" : "60%",
                  duration: 0.8,
                  autoAlpha: 1,
                  rotate: isDesktop ? "0deg" : "-40deg",
                  ease: "power2.out",
                })
                .to(contents[next - 1], { autoAlpha: 1 });

              return () => { };
            }
          );
          break;
        default:
          // code block
          console.log("unknow");
      }

      // play index
      gsap.set(sections[next], {
        autoAlpha: 1,
        visibility: true,
        zIndex: 8,
      });

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isDesktop, isMobile, reduceMotion } = context.conditions;

          // gsap
          //   .timeline({
          //     ease: "power2.out",
          //     duration: 0.8,
          //     onComplete: () => {
          //       listening = true;
          //       current = next;
          //     },
          //   })
          //   .to(".slogan", {
          //     y: isDesktop ? "46vh" : "28vh",
          //     autoAlpha: 1,
          //     duration: 1.2,
          //   })
          //   .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6")
          //   .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
          //   .to(bg_color_obj, { color: "#FFFFFF" }, "<")
          //   .to(color_wheel, { stroke: "#FFFFFF" }, "<")
          //   .to(".logo", {
          //     y: isDesktop ? "35vh" : "18vh",
          //     scale: isDesktop ? 1.8 : 1.3,
          //   })
          //   .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6")

          gsap
            .timeline({
              ease: "power2.out",
              duration: 0.8,
              delay: 0.5,
              onComplete: () => { },
            })
            .to(contents[next], { autoAlpha: 0 }, 0)
            .to(
              about_item,
              { duration: 0.5, y: isDesktop ? "150vw" : "150vh" },
              0.5
            )
            .to(color_obj, { backgroundColor: "#FFFFFF" }, "<")
            .to(bg_color_obj, { color: "#FFFFFF" }, "<")
            .to(color_wheel, { stroke: "#FFFFFF" }, "<")
            .to(".logo", {
              y: isDesktop ? "35vh" : "18vh",
              scale: isDesktop ? 1.8 : 1.3,
            })
            .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6");

          gsap
            .timeline({
              ease: "power2.out",
              duration: 0.8,
              delay: 0.5,
              onComplete: () => {
                listening = true;
                current = next;
              },
            })
            .to(".slogan", {
              y: isDesktop ? "46vh" : "28vh",
              autoAlpha: 1,
              duration: 1.2,
            })
            .to(".slide_show", { y: "0vh", duration: 0.8 }, "-=0.6");
          return () => { };
        }
      );

      current = next;
    }

    function handleDirection() {
      listening = false;

      if (direction === "down") {
        if (next < 5) {
          next = current + 1;
          slideIn();
        } else {
          console.log("it's at bottom");
          listening = true;
        }
      }
      if (direction === "up") {
        if (next >= 1) {
          next = current - 1;
          slideOut();
        } else {
          console.log("it's at top");
          listening = true;
        }
      }
    }

    /* function handleWheel(e) {
      if (!listening) return;
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    } */

    function handleWheel(e) {
      if (!listening) return;
      const currentTime = new Date().getTime();

      if (currentTime - lastTime < animationDuration) {
        e.preventDefault();
        return;
      }
      direction = e.wheelDeltaY < 0 ? "down" : "up";

      handleDirection();
    }

    let startTouch = false;
    function handleTouchStart(e) {
      if (langRef.current && langRef.current.contains(e.target)) {
        startTouch = false;
        return;
      }

      if (footerRef.current && footerRef.current.contains(e.target)) {
        startTouch = false;
        return;
      }

      if (logoRef.current && logoRef.current.contains(e.target)) {
        startTouch = false;

        console.log("aaa");

        if (!listening)
          return listening = false;
        goHome();
        return;
      }

      if (!listening) return;

      startTouch = true;

      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    }

    function handleTouchMove(e) {
      if (!listening) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!listening || !startTouch) return;
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;
      touch.dy = t.pageY - touch.startY;
      if (touch.dy > 10) direction = "up";
      if (touch.dy < -10) direction = "down";
      handleDirection();
      startTouch = false;
    }

    slideIn();

    function check_device() {
      var w = window.innerWidth;
      if (w > 600) {
        current_state = 2;
      } else if (w <= 600) {
        current_state = 1;
      }
      console.log("current size:" + current_state);
    }
    check_device();

    window.addEventListener(
      "resize",
      function (event) {
        var win_state = 0;
        var w = window.innerWidth;
        if (w > 600 && current_state == 1) {
          //console.log("mob to desktop")
          next = 0;
          current = 0;
          window.location.reload(false);
        } else if (w <= 600 && current_state == 2) {
          //console.log("desktop to mob")
          next = 0;
          current = 0;
          window.location.reload(false);
        }
        //console.log("window size:" + w + "current : " + current_state);
      },
      true
    );
  }, []);

  const [textHeaderHome, setTextHeader] = useState(
    localStorage.getItem("flagLang") === "true"
      ? TEXT_HEADER_HOME.CH
      : TEXT_HEADER_HOME.EN
  );

  const [textHome, setTextHome] = useState(
    localStorage.getItem("flagLang") === "true" ? TEXT_HOME.CH : TEXT_HOME.EN
  );

  const langRef = useRef(null);
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  return (
    <>
      <NotificationContainer />
      <header className={`lang_${lang}`}>
        <div className="languages" ref={langRef}>
          <ul>
            <li
              className="en color_obj"
              onClick={(e) => {
                if (localStorage.getItem("flagLang") === "true") {
                  localStorage.removeItem("flagLang");
                  localStorage.setItem("flagLang", "false");
                  setTextHeader(TEXT_HEADER_HOME.EN);
                  setTextHome(TEXT_HOME.EN);
                  setLang("en");
                } else {
                  localStorage.removeItem("flagLang");
                  localStorage.setItem("flagLang", "true");
                  setTextHeader(TEXT_HEADER_HOME.CH);
                  setTextHome(TEXT_HOME.CH);
                  setLang("ch");
                }
              }}
            ></li>
          </ul>
        </div>
        <div
          className="logo color_obj"
          ref={logoRef}
        // onClick={goHome}
        ></div>
        <div
          className="login color_obj"
          onClick={() => {
            navigate("/login");
          }}
        ><div></div></div>
      </header>

      <div className="main_bg">
        <div className="bg_wrapper index_bg"></div>

        <div className="about_oval"></div>

        <div className="play_oval"></div>

        <div className="oval_group">
          <div className="nft_oval nft01">
            <img className="shadow" src="images/nft_ellipse.svg" alt="" />
            <div className="nft_eatie ">
              <img src="images/nft_02.png" alt="" />
            </div>
          </div>
          <div className="nft_oval nft02">
            <img className="shadow" src="images/nft_ellipse.svg" alt="" />
            <div className="nft_eatie ">
              <img src="images/nft_03.png" alt="" />
            </div>
          </div>
          <div className="nft_oval nft03">
            <img className="shadow" src="images/nft_ellipse.svg" alt="" />
            <div className="nft_eatie ">
              <img src="images/nft_01.png" alt="" />
            </div>
          </div>
          <div className="nft_oval nft05">
            <img className="shadow" src="images/nft_ellipse.svg" alt="" />
            <div className="nft_eatie ">
              <img src="images/nft_05.png" alt="" />
            </div>
          </div>
          <div className="nft_oval nft04">
            <img className="shadow" src="images/nft_ellipse.svg" alt="" />
            <div className="nft_eatie ">
              <img src="images/nft_04.png" alt="" />
            </div>
          </div>
        </div>

        <div className="bg_wrapper map_bg">
          <div className="map_group">
            <div className="globe">
              <img src="images/globe_whole.png" alt="" />
              {/* <img src="images/globe_bg_half.png" alt="" /> */}
            </div>
            <div className="stores">
              <div className="store store01">
                <img src="images/store01.png" alt="" />
              </div>
              <div className="store store02">
                <img src="images/store02.png" alt="" />
              </div>
              <div className="store store03">
                <img src="images/store03.png" alt="" />
              </div>
              <div className="store store04">
                <img src="images/store04.png" alt="" />
              </div>
            </div>
            <div className="exchange">
              <div className="exchange_img">
                <img src="images/exchange.png" alt="" />
              </div>
            </div>
            <div className="mine">
              <div className="mine_img">
                <img src="images/mine.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="connect_bread">
          <img class="bread_bottom" src="images/connect_bread.png" alt="" />
          <img class="bread_car" src="images/car_01.png" alt="" />
          <img class="bread_top" src="images/bread_top.png" alt="" />
          {/* <img src="images/connect_bread.png" alt="" /> */}
        </div>
      </div>

      <section className="panel sec_index">
        <div className="slides-container slide_show">
          <div className="slides-inner">
            <div className="slide">
              <img src="images/eatie01.png" alt="" />
            </div>
            <div className="slide">
              <img src="images/eatie02.png" alt="" />
            </div>
            <div className="slide">
              <img src="images/eatie03.png" alt="" />
            </div>
          </div>
        </div>
        <div className="slogan">
          {/* <!-- <h1 className="section-heading"><strong>eatie</strong> 融合現實同元宇宙</h1> */}
          {/* <h2>eat • play • earn</h2> --> */}
          <div className="downloads">
            <a
              // href="javascript:;"
              onClick={() => {
                window.open(
                  "https://apps.apple.com/gb/app/eatie/id1634329951",
                  "_blank"
                );
              }}
            >
              <img src="images/app_apple_new.svg" alt="" />
            </a>
            <a
              // href="javascript:;"
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.maxims.eatie",
                  "_blank"
                );
              }}
            >
              <img src="images/app_google.svg" alt="" />
            </a>
          </div>
        </div>
      </section>
      <section className="panel sec_about">
        <div className="about_group">
          <div className="about_item about1">
            <img src="images/about_food_01.png" alt="" />
          </div>
          <div className="about_item about2">
            <img src="images/about_food_02.png" alt="" />
          </div>
          <div className="about_item about3">
            <img src="images/about_food_03.png" alt="" />
          </div>
          <div className="about_item about4">
            <img src="images/about_food_04.png" alt="" />
          </div>
          <div className="about_item about5">
            <img src="images/about_food_05.png" alt="" />
          </div>
          <div className="about_item about6">
            <img src="images/about_food_06.png" alt="" />
          </div>
        </div>
        <div className="content_wrapper">
          <div className="kv_about">
            <div className="big_kv">
              {/* <img src="images/about_kv.png" alt="" /> */}
              <img src="images/about_kv2.png" alt="" />
            </div>
            <div className="small_kv">
              <img src="images/about_coupon.png" alt="" />
            </div>
          </div>
          <div className="contents">
            {/* <small>{textHome.about.title}</small> */}
            <h2>
              {textHome.about.title_up01}
              <br />
              {textHome.about.title_up02}
            </h2>
            <p className="contents_text">
              {textHome.about.content01}
              {textHome.about.content02 !== '' &&
                <>
                  <br /><br />
                  {textHome.about.content02}
                </>
              }
              {textHome.about.content03 !== '' &&
                <>
                  <br /><br />
                  {textHome.about.content03}
                </>
              }
            </p>
          </div>
        </div>
      </section>
      <section className="panel sec_play">
        <div className="content_wrapper">
          <div className="contents">
            {/* <small>{textHome.play.title}</small> */}
            <h2>{textHome.play.title_up01}</h2>
            <p className="contents_text">
              {textHome.play.content01}

              {textHome.play.content02 !== '' &&
                <>
                  <br /><br />
                  {textHome.play.content02}
                </>
              }

              {textHome.play.content03 !== '' &&
                <>
                  <br /><br />
                  {textHome.play.content03}
                </>
              }

              {textHome.play.content04 !== '' &&
                <>
                  <br /><br />
                  {textHome.play.content04}
                </>
              }
            </p>
          </div>
          <div className="kv_play">
            <div className="kv big_kv">
              <img src="images/play_kv.png" alt="" />
            </div>
            <div className="small_kv game01">
              <img src="images/play_game01.png" alt="" />
            </div>
            <div className="small_kv game02">
              <img src="images/play_game02.png" alt="" />
            </div>
            <div className="small_kv game03">
              <img src="images/play_game03.png" alt="" />
            </div>
            <div className="small_kv giftbox">
              <img src="images/play_box.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="panel sec_nft">
        <div className="content_wrapper">
          <div className="contents">
            {/* <small>{textHome.nft.title}</small> */}
            <h2>{textHome.nft.title_up01}</h2>
            <p className="contents_text">
              {textHome.nft.content01}

              {textHome.nft.content02 !== '' &&
                <>
                  <br /><br />
                  {textHome.nft.content02}
                </>
              }
            </p>
          </div>
        </div>
      </section>
      <section className={`panel sec_map l_${lang}`}>
        <div className="contents">
          <div className="map_heading">
            {/* <small>{textHome.contact.title}</small> */}
            <h2>{textHome.contact.title_up01}</h2>
          </div>
          <p className="contents_text">
            {textHome.contact.content01}

            {textHome.contact.content02 !== '' &&
              <>
                <br /><br />
                {textHome.contact.content02}
              </>
            }

            {textHome.contact.content03 !== '' &&
              <>
                <br /><br />
                {textHome.contact.content03}
              </>
            }
          </p>
        </div>
      </section>
      <section className="panel sec_connect">
        <div className="contents">
          <p>{textHome.connect.title}</p>
          <div className="connect_social">
            {/* <!-- <a href="" className="scoial_icon"><img src="images/icon_discord.svg" alt="" /></a> --> */}
            <a href="https://www.instagram.com/eatie.io/?igshid=YmMyMTA2M2Y%3D" target="_blank" className="scoial_icon">
              <img src="images/icon_instagram.svg" alt="" />
            </a>
            {/* <a href="https://www.facebook.com" target="_blank" className="scoial_icon">
              <img src="images/icon_facebook.svg" alt="" />
            </a> */}
          </div>
        </div>
      </section>
      <footer ref={footerRef} className={`lang_${lang}`}>
        {/* <!-- <p>Copyright © Eatie All rights reserved.</p> --> */}
        <div className="footer_wrapper">
          <div className="copyright bg_color_obj">
            <a
              // href="javascript:;"
              onClick={() => {
                window.open("/terms-and-conditions", "_blank");
                // navigate("/terms-and-conditions");
              }}
              className="bg_color_obj"
            >
              {textHome.footer.tnc}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a
              // href="javascript:;"
              onClick={() => {
                window.open("/privacy-policy", "_blank");
                // navigate("/privacy-policy");
              }}
              className="bg_color_obj"
            >
              {textHome.footer.pp}
            </a>
          </div>
          <div className="copyright bg_color_obj">{textHome.footer.copy}</div>
          {/* <div className="copyright color_obj"></div>
          <div className="tnc color_obj"></div>
          <div className="policy color_obj"></div> */}
        </div>

        <div id="scroll_wheel" className="scroll_wheel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="90px"
            height="90px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="45" cy="45" r="40" strokeLinecap="round" />
          </svg>
          <div className="wheel_thin color_obj"></div>
        </div>
      </footer>
    </>
  );
};

export default Home;
