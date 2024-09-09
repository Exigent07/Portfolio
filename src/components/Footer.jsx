"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Footer.module.css";
import SplitText from "@/utils/SplitText";
import Gear from "../../public/gear.svg";
import Discord from "../../public/discord.svg";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin);

export default function Footer() {
    const [isAnimatingLink1, setIsAnimatingLink1] = useState(false);
    const [isAnimatingLink2, setIsAnimatingLink2] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    let links = [];

    if (pathname === "/") {
        links = ["Works", "About"];
    } else if (pathname === "/works") {
        links = ["Home", "About"];
    } else if (pathname === "/about") {
        links = ["Home", "Works"];
    } else {
      links =  ["Home"]
    }

    useGSAP(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;
    
            const rotateX = (clientY / innerHeight) * 40 - 15;
            const rotateY = (clientX / innerWidth) * 45 - 15;
    
            gsap.to(`#gearIconFooter`, {
            rotateX,
            rotateY,
            duration: 2.5,
            ease: "power3.out",
            });
        };

        const secDiv = document.querySelector(`.${styles.links} .link0`);
        const devDiv = document.querySelector(`.${styles.links} .link1`);
    
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
          window.addEventListener("mousemove", handleMouseMove);
    
          return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mousemove", handleMouseMove);
          };
        };
    
        if (secDiv) hoverEffect(secDiv, setIsAnimatingLink1, isAnimatingLink1);
        if (devDiv) hoverEffect(devDiv, setIsAnimatingLink2, isAnimatingLink2);
    
        return () => {
          if (secDiv) {
            secDiv.removeEventListener("mouseenter", () => {});
          }
          if (devDiv) {
            devDiv.removeEventListener("mouseenter", () => {});
          }
        };
      }, [isAnimatingLink1, isAnimatingLink2]);

    const handleClick = (index) => {
        let href = "/";

        if (links[index] === "Works") href = "/works";
        else if (links[index] === "About") href = "/about";
        else if (links[index] === "Home") href = "/";

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
          });
    };

    return (
        <footer className={styles.Footer}>
            <div className={styles.footerText}>
                <p>I'm always looking forward to working with you!</p>
                <p>Let's build something even better together.</p>
            </div>
            <Gear id="gearIconFooter" className={styles.gearIcon} />
            <div className={styles.links}>
                {links.map((linkText, index) => (
                    <h3 
                      key={index} 
                      className={`link${index}`} 
                      onClick={() => handleClick(index)}
                    >
                        <SplitText text={linkText} />
                    </h3>
                ))}
            </div>
            <div className={styles.cc}>
                <p>All Rights Reserved ©2024</p>
                <p onClick={() => navigator.clipboard.writeText("exigent07")}><Discord className={styles.discordIcon} />exigent07</p>
            </div>
        </footer>
    );
}
