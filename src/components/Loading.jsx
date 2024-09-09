import React, { useEffect, useState } from "react";
import styles from "./Loading.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loading() {
  useGSAP(() => {
    document.body.classList.add("no-scroll");
    const timeline = gsap.timeline();
    timeline
        .to(`.${styles.loadingDiv}`, {
            delay: 0.25,
            stagger: 0.1,
            skewY: 25,
            y: "-150%",
            duration: 2,
            ease: "power4.out",
            onStart: () => {
                document.querySelector(`.${styles.Loading}`).style.pointerEvents = "none"
                document.body.classList.remove("no-scroll");
            }
        });
  }, []);

  return (
    <div className={styles.Loading}>
      <div id="loadingDivs" className={styles.loadingDivs}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.loadingDiv}></div>
        ))}
      </div>
    </div>
  );
}
