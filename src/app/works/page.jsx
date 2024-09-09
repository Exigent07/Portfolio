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
import Loading from "@/components/Loading";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  
  return (
    <>
      <Nav />
      <Loading />
      <main id="Works" className={styles.Works}>
      </main>
      <Footer />
    </>
  );
}
