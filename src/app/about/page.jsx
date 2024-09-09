"use client";

import { useEffect, useState } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import SplitText from "@/utils/SplitText";
import { useGSAP } from "@gsap/react";
import { FaDiscord, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [isAnimatingLink, setIsAnimatingLink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    gsap.utils.toArray(`.${styles.section}`).forEach((section) => {
      gsap.fromTo(
        section,
        { y: "0%" },
        {
          y: () => `-${section.dataset.speed}%`,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, []);

  useGSAP(() => {
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
            y: "-180%",
            scale: 1.2,
            stagger: 0.01,
            duration: 0.3,
            ease: "power2.out",
          })
          .fromTo(
            element.querySelectorAll("span"),
            { y: "180%" },
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

    const links = document.querySelectorAll(`.${styles.skillsList} h4`);
    const blog = document.querySelector(`.${styles.link}`);

    if (links) {
      links.forEach((link, index) => {
        hoverEffect(link, setIsAnimatingLink, isAnimatingLink);
      });
    }

    if (blog) {
      hoverEffect(blog, setIsAnimatingLink, isAnimatingLink);
    }
  }, [])

  return (
    <>
      <Nav />
      <Loading />
      <main id="About" className={styles.About}>
        <div className={styles.aboutContainer}>
          <section className={`${styles.section}`} data-speed="15">
            <h2 className={styles.subHeading}>Aravindh | Exigent</h2>
            <p className={styles.paragraph}>
              I'm a cybersecurity student at <strong>Amrita Vishwa Vidyapeetham, Amritapuri</strong>,
              with a strong focus on <strong>web exploitation</strong>. I actively participate in Capture The Flag (CTF)
              competitions with <strong onClick={() => window.open("https://bi0s.in/", "_blank")} className={styles.bi0s}>teambi0s</strong>.
            </p>
          </section>

          <section className={`${styles.section}`} data-speed="5">
            <h2 className={styles.subHeading}>What I Do</h2>
            <p className={styles.paragraph}>
              My work revolves around identifying vulnerabilities, exploiting them, and securing them.
              I can also build websites..
            </p>
          </section>

          <section className={`${styles.section}`} data-speed="15">
            <h2 className={`${styles.subHeading} ${styles.skillSubHeading}`}>Skills</h2>
            <div className={styles.skillsList}>
              <div className={styles.skillsContainer}>
                <h3>Web Development</h3>
                <div>
                  <h4 className={styles.skillTop}><SplitText text="HTML" /></h4>
                  <h4><SplitText text="CSS" /></h4>
                  <h4><SplitText text="JavaScript" /></h4>
                  <h4><SplitText text="React.js" /></h4>
                  <h4><SplitText text="Next.js" /></h4>
                </div>
              </div>
              <div className={styles.skillsContainer}>
                <h3>Backend</h3>
                <h4 className={styles.skillTop}><SplitText text="Flask" /></h4>
                <h4><SplitText text="Node.js" /></h4>
                <h4><SplitText text="Express.js" /></h4>
                <h4><SplitText text="PHP" /></h4>
              </div>
              <div className={styles.skillsContainer}>
                <h3>Security</h3>
                <h4 className={styles.skillTop}><SplitText text="Web security" /></h4>
              </div>
            </div>
          </section>

          <section className={styles.section} data-speed="7">
            <h2 className={styles.subHeading}>Let's Connect</h2>
            <p className={styles.paragraph}>
              I'm always open to new opportunities and collaborations. Whether you're interested in discussing cybersecurity,
              web development, or anything in between, feel free to reach out!
            </p>
            <div className={styles.links}></div>
            <h3 
              className={styles.link}
              onClick={() => window.open("https://exigent-blog.vercel.app/")}
            >
                <SplitText text="Blog" />
            </h3>

            <div className={styles.iconContainer}>
              <div className={styles.discord} onClick={
                () => navigator.clipboard.writeText("exigent07").then(() => {
                    document.getElementById("message").style.opacity = 1;
                    setTimeout(() => document.getElementById("message").style.opacity = 0, 1000);
                })}
              >
                <FaDiscord className={styles.icon} />
                <p id="message">Copied!</p>
              </div>
              <Link href="https://github.com/exigent07" target="_blank">
                <FaGithub className={styles.icon} />
              </Link>
              <Link href="https://x.com/exigent07" target="_blank">
                <FaTwitter className={styles.icon} />
              </Link>
              <Link href="https://www.linkedin.com/in/exigent07" target="_blank">
                <FaLinkedin className={styles.icon} />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
