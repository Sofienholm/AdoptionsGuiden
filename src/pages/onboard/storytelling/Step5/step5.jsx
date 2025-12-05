import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgStep5 from "./frames/baggrund_step5.svg";
import del2Step5 from "./frames/del2_step5.svg";
import del31Step5 from "./frames/del3.1_step5.svg";
import del4Step5 from "./frames/del4_step5.svg";
import videreKnap from "./frames/videre_knap.svg";

import styles from "./step5.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step5() {
  const sectionRef = useRef(null);

  const bgRef = useRef(null);
  const del2Ref = useRef(null);
  const del31Ref = useRef(null);
  const del4Ref = useRef(null);
  const videreRef = useRef(null);

  const bottomFillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // start states
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(del2Ref.current, { opacity: 0 });
      gsap.set(del31Ref.current, { opacity: 0 });
      gsap.set(del4Ref.current, { opacity: 0 });
      gsap.set(videreRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      //
      // INTRO → DEL 2 (smooth fade)
      //
      tl.to({}, { duration: 0.2 }); // lille scroll før noget sker

      tl.to(bgRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      tl.to(
        del2Ref.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<" // overlap = rigtig fade
      );

      // del 2 står lidt alene
      tl.to({}, { duration: 0.2 });

      //
      // DEL 2 → DEL 3.1 (fade HELE wrapperen, så overlay også forsvinder)
      //
      tl.to(".del2Wrapper", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      tl.to(
        del31Ref.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<"
      );

      // del 3.1 vises kort
      tl.to({}, { duration: 0.15 });

      //
      // DEL 3.1 → DEL 4 (fade)
      //
      tl.to(del31Ref.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      tl.to(
        del4Ref.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<"
      );

      // lille pause på del4
      tl.to({}, { duration: 0.15 });

      //
      // VIS VIDERE-KNAP (fade ind)
      //
      tl.to(videreRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }, sectionRef);

    // bottomFill justering
    const updateBottomFill = () => {
      const sec = sectionRef.current;
      const img = bgRef.current;
      const fill = bottomFillRef.current;
      if (!sec || !img || !fill) return;

      const secRect = sec.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const gap = secRect.bottom - imgRect.bottom;

      fill.style.height = gap <= 0 ? "0px" : `${gap + 4}px`;
    };

    if (bgRef.current?.complete) updateBottomFill();
    else bgRef.current?.addEventListener("load", updateBottomFill);

    window.addEventListener("resize", updateBottomFill);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateBottomFill);
      bgRef.current?.removeEventListener("load", updateBottomFill);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.graphicWrapper}>
          {/* INTRO */}
          <img ref={bgRef} src={bgStep5} className={styles.mainGraphic} alt="" />

          {/* DEL 2 – med overlay og hotspot */}
          <div className={`${styles.del2Wrapper} del2Wrapper`}>
            <img
              ref={del2Ref}
              src={del2Step5}
              className={styles.mainGraphic}
              alt=""
            />

            <div className={styles.dogHotspot} />

            <div className={styles.centerOverlay}>
              <div className={styles.centerOverlayBox}>
                <p className={styles.centerOverlayLine}>SAMME RUTINER</p>
                <p className={styles.centerOverlayLine}>INGEN GÆSTER</p>
                <p className={styles.centerOverlayLine}>&amp; KORTE GÅTURE</p>
              </div>
            </div>
          </div>

          {/* DEL 3.1 – uden overlay */}
          <img
            ref={del31Ref}
            src={del31Step5}
            className={styles.mainGraphic}
            alt=""
          />

          {/* DEL 4 – uden overlay */}
          <img
            ref={del4Ref}
            src={del4Step5}
            className={styles.mainGraphic}
            alt=""
          />

          {/* VIDERE-KNAP nederst til højre */}
          <img
            ref={videreRef}
            src={videreKnap}
            className={styles.videreKnap}
            alt="Videre"
          />
        </div>
      </div>

      <div ref={bottomFillRef} className={styles.bottomFill} />
    </section>
  );
}
