"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Nav.module.css";
import SplitText from "@/utils/SplitText";
import Gear from "../../public/gear.svg";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(TextPlugin);

export default function Nav() {
    const [isHamPageOpen, setIsHamPageOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    let links = [];

    if (pathname === "/") {
        links = ["Works", "About"];
    } else if (pathname === "/works") {
        links = ["Home", "About"];
    } else if (pathname === "/about") {
        links = ["Home", "Works"];
    }

    const handleClickNoHam = (path) => {
        const divs = document.querySelector("#loadingDivs");
        if (pathname !== path) {
            gsap.to(divs.querySelectorAll("div"), {
              stagger: 0.1,
              skewY: 0,
              y: "0",
              duration: 2,
              ease: "power4.in",
              onComplete: () => {
                router.push(path);
              }
            })
        }
    }

    const handleClick = (index) => {
        let href = "/";
    
        if (links[index] === "Works") href = "/works";
        else if (links[index] === "About") href = "/about";
        else if (links[index] === "Home") href = "/";
    
        toggleHamPage().then(() => {
            const divs = document.querySelector("#loadingDivs");
        
            gsap.to(divs.querySelectorAll("div"), {
              stagger: 0.1,
              skewY: 0,
              y: "0",
              duration: 2,
              ease: "power4.in",
              onComplete: () => {
                router.push(href);
              }
            })
        });
    };
    
    useGSAP(() => {
        const navLinks = document.querySelectorAll(`.${styles.navLinks}`);

        const handleMouseEnter = (event) => {
        const link = event.currentTarget;

        if (isAnimating) return;
        link.removeEventListener("mouseenter", handleMouseEnter);
        setIsAnimating(true);

        const animation = gsap.timeline({
            onComplete: () => {
            setIsAnimating(false);
            link.addEventListener("mouseenter", handleMouseEnter);
            },
        });

        animation
            .to(link.querySelectorAll("span"), {
            stagger: 0.1,
            backgroundColor: "var(--color-accent-transparency)",
            duration: 0.01,
            ease: "power2.out",
            })
            .to(link.querySelectorAll("span"), {
            stagger: 0.1,
            backgroundColor: "transparent",
            duration: 0.01,
            ease: "power2.out",
            });
        };

        navLinks.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            link.removeEventListener("mouseenter", handleMouseEnter);
        };
        });

        return () => {
        navLinks.forEach((link) => {
            link.removeEventListener("mouseenter", handleMouseEnter);
        });
        };
    }, [isAnimating]);

    const toggleHamPage = () => {
        return new Promise((resolve) => {
            setIsHamPageOpen((prev) => !prev);
    
            const tl = gsap.timeline({
                onComplete: resolve,
            });
    
            if (!isHamPageOpen) {
                tl.to(`.${styles.hamPage}`, {
                    opacity: 1,
                    pointerEvents: "all",
                    duration: 0.2,
                    ease: "power3.out",
                })
                    .to(`.${styles.hamburger}`, {
                        scale: 1.2,
                        rotate: 45,
                        duration: 0.2,
                        ease: "power2.out",
                    })
                    .fromTo(
                        `.${styles.hamText}`,
                        { scale: 0 },
                        {
                            text: "X",
                            rotate: -45,
                            scale: 0.65,
                            duration: 0.1,
                            ease: "power2.out",
                        }
                    );
            } else {
                tl
                .to(`.${styles.hamburger}`, {
                    scale: 1,
                    rotate: 0,
                    duration: 0.2,
                    ease: "power2.out",
                })
                .fromTo(
                    `.${styles.hamText}`,
                    { scale: 0 },
                    {
                        text: "?",
                        scale: 1,
                        rotate: 0,
                        duration: 0.1,
                        ease: "power2.out",
                    }
                )
                .to(`.${styles.hamPage}`, {
                    opacity: 0,
                    pointerEvents: "none",
                    duration: 0.2,
                    ease: "power3.in",
                });
            }
        });
    };    

    return (
        <>
            <nav className={styles.Nav}>
                <ThemeToggle />
                    <h3
                    onClick={() => handleClickNoHam("/works")}
                    className={`${styles.navLinks} ${
                        pathname === "/works" ? styles.active : ""
                    }`}
                    >
                    <SplitText text="Works" />
                    </h3>
                    <h3
                    onClick={() => handleClickNoHam("/")}
                    className={`${styles.navLinks} ${
                        pathname === "/" ? styles.active : ""
                    }`}
                    >
                    <SplitText text="Home" />
                    </h3>
                    <h3
                    onClick={() => handleClickNoHam("/about")}
                    className={`${styles.navLinks} ${
                        pathname === "/about" ? styles.active : ""
                    }`}
                    >
                    <SplitText text="About" />
                    </h3>
                <div className={styles.hamburger} onClick={toggleHamPage}>
                    <Gear className={styles.hamIcon} />
                    <h2 className={styles.hamText}>?</h2>
                </div>
            </nav>
            <div className={styles.hamPage}>
                <div className={styles.links}>
                    {links.map((linkText, index) => (
                        <h3 
                        key={index} 
                        className={`link${index} ${styles.hamLinks}`} 
                        onClick={() => handleClick(index)}
                        >
                            <SplitText text={linkText} />
                        </h3>
                    ))}
                </div>
                <ThemeToggle hamburger={true} />
            </div>
        </>
    );
}
