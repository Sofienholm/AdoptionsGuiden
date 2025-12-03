// Step4.jsx
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import del1 from "./frames/del1.svg";
import styles from "./step4.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step4() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".step4Section", // svarer til section-wrapper
        start: "top top",
        end: "+=7000",           // samme længde som step 1
        scrub: 1,
        pin: true,               // gør sektionen "sticky"
      },
    });

    // lige nu er timeline tom – du kan senere tilføje .to() / .fromTo() her

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={`${styles.section} step4Section`}>
      <div className={styles.inner}>
        <div className={styles.graphicWrapper}>
          <img src={del1} className={styles.mainGraphic} alt="" />
        </div>
      </div>
    </section>
  );
}
