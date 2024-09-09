"use client";

import { useEffect, useState } from "react";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Gear from "../../public/gear.svg";
import Cyber from "../../public/cyber.svg";
import Sec from "../../public/sec.svg";
import Flag from "../../public/flag.svg";
import PHP from "../../public/php.svg";
import Dev from "../../public/dev.svg";
import Next from "../../public/next.svg";
import Python from "../../public/python.svg";
import Bi0s from "../../public/bi0s.svg";
import styles from "./page.module.css";
import SplitText from "@/utils/SplitText";
import { ScrollTrigger } from "gsap/all";
import Loading from "@/components/Loading";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isAnimatingSec, setIsAnimatingSec] = useState(false);
  const [isAnimatingDev, setIsAnimatingDev] = useState(false);
  const [activeSecIcon, setActiveSecIcon] = useState(null);
  const [activeDevIcon, setActiveDevIcon] = useState(null);

  const iconComponents = {
    Flag,
    Cyber,
    Sec,
    Bi0s,
    Dev,
    Python,
    Next,
    PHP,
  };

  const hoverEffect = (
    element,
    isAnimatingSetter,
    isAnimating,
    setActiveIcon,
    icon,
    resetIcon
  ) => {
    const handleMouseEnter = () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      isAnimatingSetter(true);
      setActiveIcon(() => iconComponents[icon]);

      gsap.timeline({
        onComplete: () => {
          setTimeout(() => {            
            isAnimatingSetter(false);
            element.addEventListener("mouseenter", handleMouseEnter);
          }, 500);
        },
      })
      .fromTo(
        element.querySelectorAll("span"),
        { y: "250%" },
        {
          y: 0,
          scale: 1,
          stagger: 0.0001,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    };

    const handleMouseLeave = () => {
      resetIcon(null);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  useGSAP(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const rotateX = (clientY / innerHeight) * 40 - 15;
      const rotateY = (clientX / innerWidth) * 45 - 15;

      gsap.to(
        `.${styles.gearIcon},
        .${styles.gearIconSec},
        .${styles.gearIconDev},
        .${styles.activeDevIcon},
        .${styles.activeSecIcon},
        #gearIconFooter`, {
        rotateX,
        rotateY,
        duration: 2.5,
        ease: "power3.out",
      });
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        anticipatePin: 1,
        pin: `.${styles.mainHero}`,
        pinSpacing: 1,
        scrub: 1,
      },
    });

    timeline
      .addLabel("shrink")
      .to(
        `.${styles.secDiv}, .${styles.devDiv}`,
        {
          height: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "shrink"
      )
      .addLabel("disappear")
      .to(
        `.${styles.secDiv}, .${styles.devDiv}`,
        {
          scale: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "disappear"
      )
      .to(
        `.${styles.gearIcon}`,
        {
          scale: 1.5,
          duration: 0.5,
          ease: "power2.out",
        },
        "shrink"
      )
      .to(
        `.${styles.whoAmI}`,
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1"
      )
      .to(`.${styles.myName}`, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }, "<")
      .to(`.${styles.gearIcon}`, {
        rotate: 60,
        duration: 1.5,
        ease: "power2.inOut",
      }, "-=1");

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

 useGSAP(() => {
    const secDiv = document.querySelector(`.${styles.secDiv}`);
    const devDiv = document.querySelector(`.${styles.devDiv}`);

    const hoverEffect = (element, isAnimatingSetter, isAnimating) => {
      const handleMouseEnter = () => {
        if (isAnimating) return;
        element.removeEventListener("mouseenter", handleMouseEnter);
        isAnimatingSetter(true);

        gsap.timeline({
          onComplete: () => {
            isAnimatingSetter(false);
            element.addEventListener("mouseenter", handleMouseEnter);
          },
        })
          .to(element.querySelectorAll("span"), {
            y: "-150%",
            scale: 1.2,
            stagger: 0.01,
            duration: 0.3,
            ease: "power2.out",
          })
          .fromTo(
            element.querySelectorAll("span"),
            { y: "150%" },
            {
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
            }
          );
      };

      element.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
      };
    };

    if (secDiv) hoverEffect(secDiv, setIsAnimatingSec, isAnimatingSec);
    if (devDiv) hoverEffect(devDiv, setIsAnimatingDev, isAnimatingDev);    

    return () => {
      if (secDiv) {
        secDiv.removeEventListener("mouseenter", () => {});
      }
      if (devDiv) {
        devDiv.removeEventListener("mouseenter", () => {});
      }
    };
  }, [isAnimatingSec, isAnimatingDev]);


  useEffect(() => {
    const secLinks = document.querySelectorAll(`.${styles.secLinks} div`);
    const devLinks = document.querySelectorAll(`.${styles.devLinks} div`);

    if (secLinks) {
      secLinks.forEach((link, index) => {
        const icons = ["Flag", "Cyber", "Bi0s", "Sec"];
        hoverEffect(link, setIsAnimatingSec, isAnimatingSec, setActiveSecIcon, icons[index], setActiveSecIcon);
      });
    }

    if (devLinks) {
      devLinks.forEach((link, index) => {
        const icons = ["Dev", "Python", "Next", "PHP"];
        hoverEffect(link, setIsAnimatingDev, isAnimatingDev, setActiveDevIcon, icons[index], setActiveDevIcon);
      });
    }
  }, [isAnimatingSec, isAnimatingDev]);

  return (
    <>
      <Nav />
      <Loading />
      <main id="Home" className={styles.Home}>
        <div className={styles.mainHero}>
          <div className={styles.secDiv}>
            <h2><SplitText text="Sec" /></h2>
          </div>
          <div className={styles.dummyDiv}></div>
          <Gear className={styles.gearIcon} />
          <div className={styles.devDiv}>
            <h2><SplitText text="Dev" /></h2>
          </div>
          <div className={styles.whoContainer}>
            <div className={styles.whoAmI}>
              <h2><SplitText text="Hello" /></h2>
            </div>
            <h3 className={styles.myName}><SplitText text="I'm Aravindh" /></h3>
          </div>
        </div>
        <div id="secPage" className={styles.secPage}>
          <div className={styles.secLeft}>
            <h3 className={styles.secPageHeading}><SplitText text="Exigent" /></h3>
            <div className={styles.secLinks}>
              <div><span className={styles.number}>01.</span><SplitText text="CTF Player" /></div>
              <div><span className={styles.number}>02.</span><SplitText text="Cyber Sec Student" /></div>
              <div><span className={styles.number}>03.</span><SplitText text="team bi0s" /></div>
              <div><span className={styles.number}>04.</span><SplitText text="Web Security" /></div>
            </div>
          </div>
          <Gear className={styles.gearIconSec} />
          {activeSecIcon && React.createElement(activeSecIcon, { className: styles.activeSecIcon })}
        </div>
        <div id="devPage" className={styles.devPage}>
          <Gear className={styles.gearIconDev} />
          {activeDevIcon && React.createElement(activeDevIcon, { className: styles.activeDevIcon })}
          <div className={styles.devLeft}>
            <h3 className={styles.devPageHeading}><SplitText text="Aravindh" /></h3>
            <div className={styles.devLinks}>
              <div><span className={styles.number}>01.</span><SplitText text="Full Stack Dev" /></div>
              <div><span className={styles.number}>02.</span><SplitText text="Python" /></div>
              <div><span className={styles.number}>03.</span><SplitText text="Next.js" /></div>
              <div><span className={styles.number}>04.</span><SplitText text="PHP" /></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
