// -- STEP 5 · STORYTELLING --
// sidste step før quiz
// lille opsamling + sender folk videre

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router";

// -- SVG LAG --
// kører i rækkefølge via scroll
import bgStep5 from "./frames/baggrund_step5.svg";
import del2Step5 from "./frames/del2_step5.svg";
import del31Step5 from "./frames/del3.1_step5.svg";
import del4Step5 from "./frames/del4_step5.svg";
import videreKnap from "./frames/videre_knap.svg";

// -- STYLING --
// fast layout, ingen hop
import styles from "./step5.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step5() {
  // bruges til pin + trigger
  const sectionRef = useRef(null);

  // refs til hvert lag
  const bgRef = useRef(null);
  const del2Ref = useRef(null);
  const del31Ref = useRef(null);
  const del4Ref = useRef(null);
  const videreRef = useRef(null);

  // lukker evt hul i bunden
  const bottomFillRef = useRef(null);

  // videre til quiz
  const navigate = useNavigate();

  useEffect(() => {
    // gsap context så react ikke bliver sur
    const ctx = gsap.context(() => {
      // start states så intet blinker
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(del2Ref.current, { opacity: 0 });
      gsap.set(del31Ref.current, { opacity: 0 });
      gsap.set(del4Ref.current, { opacity: 0 });
      gsap.set(videreRef.current, { opacity: 0 });

      // hele flowet i én timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      // lille intro-pause
      tl.to({}, { duration: 0.45 });

      // bg ud
      tl.to(bgRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });

      // del 2 ind
      tl.to(del2Ref.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" }, "<");

      // kort pause
      tl.to({}, { duration: 0.45 });

      // del 2 ud samlet
      tl.to(".del2Wrapper", { opacity: 0, duration: 0.2, ease: "power2.out" });

      // del 3.1 ind
      tl.to(del31Ref.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" }, "<");

      // igen lidt luft
      tl.to({}, { duration: 0.45 });

      // del 3.1 ud
      tl.to(del31Ref.current, { opacity: 0, duration: 0.2, ease: "power2.out" });

      // del 4 ind
      tl.to(del4Ref.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" }, "<");

      // sidste pause
      tl.to({}, { duration: 0.45 });

      // CTA frem
      tl.to(videreRef.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" });
    }, sectionRef);

    // matcher bunden af svg så der ikke opstår hul
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
          {/* baggrund / intro */}
          <img ref={bgRef} src={bgStep5} className={styles.mainGraphic} alt="" />

          {/* del 2 */}
          <div className={`${styles.del2Wrapper} del2Wrapper`}>
            <img ref={del2Ref} src={del2Step5} className={styles.mainGraphic} alt="" />
          </div>

          {/* del 3.1 */}
          <img ref={del31Ref} src={del31Step5} className={styles.mainGraphic} alt="" />

          {/* del 4 */}
          <img ref={del4Ref} src={del4Step5} className={styles.mainGraphic} alt="" />

          {/* videre-knap */}
          <img ref={videreRef} src={videreKnap} className={styles.videreKnap} alt="Videre" 
          onClick={() => navigate("/quiz")} />
        </div>
      </div>

      {/* fylder bunden hvis svg ikke rammer helt */}
      <div ref={bottomFillRef} className={styles.bottomFill} />
    </section>
  );
}
