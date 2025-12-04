import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgStep5 from "./frames/baggrund_step5.svg";
import del2Step5 from "./frames/del2_step5.svg";
import styles from "./step5.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step5() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const del2Ref = useRef(null);
  const bottomFillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(del2Ref.current, { opacity: 0 }); // del 2 skjult fra start

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      // ✨ lidt længere scroll før skiftet sker
      tl.to({}, { duration: 0.25 }); // ← justeret fra 0.15

      // 🔁 ultra-hurtig crossfade
      tl.to(bgRef.current, {
        opacity: 0,
        duration: 0.01,
        ease: "none",
      });

      tl.to(
        del2Ref.current,
        {
          opacity: 1,
          duration: 0.01,
          ease: "none",
        },
        "<"
      );

      tl.to({}, { duration: 0.5 }); // resten af scrollen
    }, sectionRef);

    const updateBottomFill = () => {
      const sectionEl = sectionRef.current;
      const imgEl = bgRef.current;
      const bottomFillEl = bottomFillRef.current;

      if (!sectionEl || !imgEl || !bottomFillEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const imgRect = imgEl.getBoundingClientRect();

      let gap = sectionRect.bottom - imgRect.bottom;

      if (gap <= 0) {
        bottomFillEl.style.height = "0px";
      } else {
        const overlapBuffer = 4;
        bottomFillEl.style.height = `${gap + overlapBuffer}px`;
      }
    };

    if (bgRef.current && bgRef.current.complete) {
      updateBottomFill();
    } else if (bgRef.current) {
      bgRef.current.addEventListener("load", updateBottomFill);
    }

    window.addEventListener("resize", updateBottomFill);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateBottomFill);
      if (bgRef.current) {
        bgRef.current.removeEventListener("load", updateBottomFill);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.graphicWrapper}>
          <img
            ref={bgRef}
            src={bgStep5}
            className={styles.mainGraphic}
            alt="Baggrund for Step 5"
          />

          <img
            ref={del2Ref}
            src={del2Step5}
            className={styles.mainGraphic}
            alt="Del 2 – Step 5"
          />
        </div>
      </div>

      <div ref={bottomFillRef} className={styles.bottomFill} />
    </section>
  );
}
