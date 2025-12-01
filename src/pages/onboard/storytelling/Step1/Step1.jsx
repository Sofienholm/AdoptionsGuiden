import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dogBox from "./frames/dog_center_box.svg";
import styles from "./step1.module.css";


gsap.registerPlugin(ScrollTrigger);

export default function Step1() {
  const sectionRef = useRef(null);

  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);

  const dogCenterRef = useRef(null);

  useEffect(() => {
    // Gør intro + hund synlige fra start
    gsap.set(
      [introTitleRef.current, introTextRef.current, dogCenterRef.current],
      {
        opacity: 1,
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500",
        scrub: 1,
        pin: true,

      },
    });

    // --- FADE INTRO UD ---
    tl.to([introTitleRef.current, introTextRef.current], {
      opacity: 0,
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <h1 ref={introTitleRef} className={styles.introTitle}>
          Hvad er en internathund?
        </h1>

        <p ref={introTextRef} className={styles.introText}>
          Mange internathunde har bagage, stress eller usynlige problemer.
        </p>

        <img
          ref={dogCenterRef}
          src={dogBox}
          className={styles.dogCenter}
          alt="Hund i kasse"
        />
      </div>

    </section>
  );
}