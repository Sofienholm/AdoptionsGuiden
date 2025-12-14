// -- STORYTELLING · STEP 2 --
// Andet kapitel i onboarding
// Handler om tid, ansvar og hvad en hund reelt kræver i hverdagen

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// -- VISUELLE ELEMENTER --
// SVG’er så vi kan styre animation og placering ret præcist
import clock from "./frames/clock.svg";
import minuteHand from "./frames/min-viser.svg";
import hourHand from "./frames/time-viser.svg";
import six from "./frames/sekstal.svg";
import dogDoor from "./frames/dog-at-door.svg";

import cardOne from "./frames/card1.svg";
import cardTwo from "./frames/card2.svg";
import cardTree from "./frames/card3.svg";
import cardFour from "./frames/card4.svg";

import dog1 from "./frames/dog-1.svg";
import dog2 from "./frames/dog-2.svg";
import dog3 from "./frames/dog-3.svg";
import dog4 from "./frames/dog-4.svg";
import dog5 from "./frames/dog-5.svg";

// -- STYLING --
import styles from "./step2.module.css";

// -- GSAP --
gsap.registerPlugin(ScrollTrigger);

export default function Step2() {
  // Section bruges til pin og scroll-trigger
  const sectionRef = useRef(null);

  // Wrapper der skaleres responsivt
  const containerRef = useRef(null);

  // Ur-elementer
  const clockRef = useRef(null);
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);
  const sixRef = useRef(null);

  // Tekst til 6-timers-delen
  const overskriftRef = useRef(null);
  const timerRef = useRef(null);
  const brodtekstRef = useRef(null);
  const doorRef = useRef(null);

  // Kort med grundbehov
  const cardOneRef = useRef(null);
  const cardTwoRef = useRef(null);
  const cardTreeRef = useRef(null);
  const cardFourRef = useRef(null);
  const overskriftTwoRef = useRef(null);

  // Outro tekst
  const overskriftTreeRef = useRef(null);
  const brodtekstTreeRef = useRef(null);

  // Hunde i outro
  const dogOneRef = useRef(null);
  const dogTwoRef = useRef(null);
  const dogThreeRef = useRef(null);
  const dogFourRef = useRef(null);
  const dogFiveRef = useRef(null);

  useEffect(() => {
    // GSAP context så animationerne bliver ryddet op korrekt
    const ctx = gsap.context(() => {
      // Start position for ur-visere
      gsap.set([minuteHandRef.current, hourHandRef.current], {
        opacity: 1,
        rotation: 0,
      });

      // Lang pinned timeline der kører hele sektionen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=10000",
          scrub: 1,
          pin: true,
        },
      });

      // Uret kører for at vise tid der går
      tl.to(minuteHandRef.current, { rotation: 360 * 6, ease: "none" });
      tl.to(hourHandRef.current, { rotation: 180, ease: "none" }, "<");

      tl.to({}, { duration: 0.3 });

      // Zoom ind på uret
      tl.to(`.${styles.clockWrapper}`, { scale: 4, y: -450, ease: "expo.out" });

      // 6-timers markering
      tl.to(sixRef.current, { opacity: 1 }, "<0.5");
      tl.to(`.${styles.clockWrapper}`, { opacity: 0 });

      tl.to(sixRef.current, { x: -120, y: -20, scale: 1.05, duration: 1.2, ease: "back.out(1.7)" });

      // Tekst til 6 timer
      tl.fromTo(
        timerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 30, duration: 1.3, ease: "power3.out" },
        "<0.1"
      );

      tl.from(overskriftRef.current, { y: 80, opacity: 0, duration: 1.2, ease: "back.out(1.7)" });
      tl.from(brodtekstRef.current, { opacity: 0, y: 40, duration: 1.1, ease: "power3.out" }, "-=0.4");
      tl.from(doorRef.current, { x: -60, opacity: 0, duration: 0.8, ease: "expo.out" }, "-=0.8");

      tl.to({}, { duration: 0.3 });

      // Fade ud af 6-timers delen
      tl.to(overskriftRef.current, { y: -900, opacity: 0, duration: 1 });
      tl.to(brodtekstRef.current, { y: -850, opacity: 0, duration: 1 }, "<");
      tl.to(doorRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "<");
      tl.to(sixRef.current, { y: -1300, duration: 1 }, "<");
      tl.to(timerRef.current, { y: -800, opacity: 0, duration: 1 }, "<");

      // Fire grundbehov
      tl.fromTo(
        overskriftTwoRef.current,
        { y: -160, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1)" }
      );

      tl.to(
        [cardOneRef.current, cardTwoRef.current, cardTreeRef.current, cardFourRef.current],
        { x: 2050, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 },
        "<0.2"
      );

      tl.to({}, { duration: 0.3 });

      tl.to([cardOneRef.current, cardTwoRef.current, cardTreeRef.current, cardFourRef.current], {
        x: 7050, duration: 1, ease: "power3.out", stagger: -0.15,
      });

      tl.to(overskriftTwoRef.current, { x: 1360, duration: 1.4, ease: "power3.out" });

      // Outro-del
      tl.to(sectionRef.current, { backgroundColor: "var(--taupe-hex)" });

      tl.from(overskriftTreeRef.current, { y: -80, opacity: 0, duration: 1.2, ease: "back.out(1.6)" });

      tl.from(brodtekstTreeRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "<0.2");

      tl.from(
        [dogOneRef.current, dogTwoRef.current, dogThreeRef.current, dogFourRef.current, dogFiveRef.current],
        { x: 1500, opacity: 0, duration: 1.4, ease: "power4.out", stagger: 0.15 },
        "<0.1"
      );
    }, sectionRef);

    // Skalerer hele scenen ift. skærmstørrelse
    const updateScale = () => {
      const el = containerRef.current;
      if (!el) return;

      const baseWidth = 1300;
      const baseHeight = 700;

      const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight, 1);

      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={containerRef} className={styles.container}>
        {/* UR */}
        <div className={styles.clockWrapper}>
          <img ref={clockRef} src={clock} className={styles.clock} alt="" />
          <img ref={minuteHandRef} src={minuteHand} className={styles.minuteHand} alt="" />
          <img ref={hourHandRef} src={hourHand} className={styles.hourHand} alt="" />
        </div>

        <img ref={sixRef} src={six} className={styles.six} alt="" />

        {/* SEKS TIMER */}
        <div className={styles.seksTimer}>
          <h1 ref={overskriftRef} className={styles.overskrift}>
            EN HUND MÅ IKKE VÆRE ALENE HJEMME MERE END 6 TIMER
          </h1>

          <h2 ref={timerRef} className={styles.tekstTimer}>
            TIMER
          </h2>

          <p ref={brodtekstRef} className={styles.brodTekst}>
            Hunde har brug for kontakt, tryghed og pauser i løbet af dagen.
            <br />
            <br />
            Derfor skal du kunne planlægge hverdagen, så den ikke står alene for længe.
          </p>

          <img ref={doorRef} src={dogDoor} className={styles.dogDoor} alt="" />
        </div>

        {/* FIRE GRUNDBEHOV */}
        <div className={styles.cardSection}>
          <h1 ref={overskriftTwoRef}>De fire grundbehov</h1>

          <div className={styles.cardWrapper}>
            <img ref={cardOneRef} src={cardOne} className={styles.card1} alt="" />
            <img ref={cardTwoRef} src={cardTwo} className={styles.card2} alt="" />
            <img ref={cardTreeRef} src={cardTree} className={styles.card3} alt="" />
            <img ref={cardFourRef} src={cardFour} className={styles.card4} alt="" />
          </div>
        </div>

        {/* OUTRO */}
        <div className={styles.outro}>
          <h2 ref={overskriftTreeRef} className={styles.outroHeading}>
            En hund er en livsforpligtelse
            <br />
            <span className={styles.outroHeadingRed}>- ikke en spontan beslutning</span>
          </h2>

          <p ref={brodtekstTreeRef}>
            De fleste hunde lever 8–15 år. Det er et ansvar, der følger med glæder, rutiner og hverdagsliv.
          </p>

          <div className={styles.dogRow}>
            <img ref={dogOneRef} src={dog1} className={styles.doggie1} alt="" />
            <img ref={dogTwoRef} src={dog2} className={styles.doggie2} alt="" />
            <img ref={dogThreeRef} src={dog3} className={styles.doggie3} alt="" />
            <img ref={dogFourRef} src={dog4} className={styles.doggie4} alt="" />
            <img ref={dogFiveRef} src={dog5} className={styles.doggie5} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
