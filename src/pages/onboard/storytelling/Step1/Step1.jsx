import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dogBox from "./frames/dog_center_box.svg";
import bubble1 from "./frames/bubble1.svg";
import bubble2 from "./frames/bubble2.svg";

import styles from "./step1.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step1() {
  const sectionRef = useRef(null);

  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);

  const dogCenterRef = useRef(null);
  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);




  
  useEffect(() => {
    const ctx = gsap.context(() => {
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
          end: "+=3000",
          scrub: 1,
          pin: true,
        },
      });

      // --- FADE INTRO UD ---
      tl.to([introTitleRef.current, introTextRef.current], {
        opacity: 0,
      });
      // --- BUBBLE 1 IND ---
      tl.to(bubble1Ref.current, { opacity: 1 })

        // 0.3 pause
        .to({}, { duration: 0.3 })

        // --- BUBBLE 2 IND OG BUBBLE 1 UD ---
        .to(bubble1Ref.current, { opacity: 0 })
        .to(bubble2Ref.current, { opacity: 1 }, "<");
    }, sectionRef);






    return () => ctx.revert();
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
        <img
          ref={bubble1Ref}
          src={bubble1}
          className={styles.bubble1}
          alt="Første infoboble"
        />
        <img
          ref={bubble2Ref}
          src={bubble2}
          className={styles.bubble2}
          alt="anden infoboble"
        />
      </div>
    </section>
  );
}
