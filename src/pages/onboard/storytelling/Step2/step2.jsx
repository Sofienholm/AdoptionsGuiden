import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import clock from "./frames/clock.svg";
import minuteHand from "./frames/min-viser.svg";
import hourHand from "./frames/time-viser.svg";
import six from "./frames/sekstal.svg";
import dogDoor from "./frames/dog-at-door.svg";
import cardOne from "./frames/card1.svg";
import cardTwo from "./frames/card2.svg";
import cardTree from "./frames/card3.svg";
import cardFour from "./frames/card4.svg";
import dog1 from "./frames/dog-1.svg"
import dog2 from "./frames/dog-2.svg"
import dog3 from "./frames/dog-3.svg"
import dog4 from "./frames/dog-4.svg"
import dog5 from "./frames/dog-5.svg"

import styles from "./step2.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Step1() {
  const clockRef = useRef(null);
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);
  const sectionRef = useRef(null);
  const sixRef = useRef(null);
  const overskriftRef = useRef(null);
  const timerRef = useRef(null);
  const brodtekstRef = useRef(null);
  const doorRef = useRef(null);

  const cardOneRef = useRef(null);
  const cardTwoRef = useRef(null);
  const cardTreeRef = useRef(null);
  const cardFourRef = useRef(null);
 const overskriftTwoRef = useRef(null);

 const overskriftTreeRef = useRef(null);
 const brodtekstTreeRef = useRef(null);
 const dogOneRef = useRef(null);
 const dogTwoRef = useRef(null);
 const dogThreeRef = useRef(null);
 const dogFourRef = useRef(null);
 const dogFiveRef = useRef(null);
 

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Start-setup: visere og ur synlige og klar ---
      gsap.set([minuteHandRef.current, hourHandRef.current], {
        opacity: 1,
        rotation: 0,
      });
      gsap.set(clockRef.current, { opacity: 1 });

      // --- ScrollTimeline setup ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=10000",
          scrub: 1,
          pin: true,
        },
      });

      // Minutviser roterer 6 omgange
      tl.to(minuteHandRef.current, { rotation: 360 * 6, ease: "none" });

      // Timeviser roterer en halv omgang
      tl.to(hourHandRef.current, { rotation: 180, ease: "none" }, "<");

      // pause
      tl.to({}, { duration: 0.3 });

      // ZOOM IND PÅ 6-TALLET på klokken
      tl.to(`.${styles.clockWrapper}`, {
        scale: 4,
        y: -450,
        ease: "expo.out",
      });

      //VIS 6-TALLET OG GEM SELVE URET
      // Fade-in af sekstal
      tl.to(sixRef.current, { opacity: 1 }, "<0.5");

      // Fade ud af clockWrapper
      tl.to(`.${styles.clockWrapper}`, { opacity: 0 });

      // Flyt det  6-tal mod venstre
      tl.to(sixRef.current, {
        x: -120,
        y: -20,
        scale: 1.05, // lille zoom for at få energi
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // TIMER-ord flyttes ind
      tl.fromTo(
        timerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 30,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
        },
        "<0.1"
      );

      // Overskrift kører ind fra venstre
      tl.from(overskriftRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // Brødtekst popper op nedefra
      tl.from(
        brodtekstRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
      // Hund ved døren glider ind fra venstre
      tl.from(
        doorRef.current,
        {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.8"
      );

      // pause
      tl.to({}, { duration: 0.3 });

      //TEKST SEKTION SCROLLER UD AF SCENEN
      tl.to(overskriftRef.current, { y: -900, opacity: 1, duration: 1 });
      tl.to(brodtekstRef.current, { y: -850, opacity: 1 }, "<");
      tl.to(doorRef.current, { y: -750, opacity: 1, duration: 1 }, "<");
      tl.to(sixRef.current, { y: -1300, opacity: 1, duration: 1 }, "<");
      tl.to(timerRef.current, { y: -800, opacity: 1, duration: 1 }, "<");

      // INTRO: Overskrift flyver ind fra oven i et lille bounce
      tl.from(overskriftTwoRef.current, { y: -160, opacity: 1, duration: 1.4, ease: "back.out(1.8)" });

      // CARDS: Alle fire flyver ind fra højre med stagger
      tl.to([cardOneRef.current, cardTwoRef.current, cardTreeRef.current, cardFourRef.current],
        { x:2050, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 },"<0.2");

      // pause
      tl.to({}, { duration: 0.3 });


      // CARDS: Alle fire flyver ind fra højre med stagger
      tl.to([cardOneRef.current, cardTwoRef.current, cardTreeRef.current, cardFourRef.current],
        { x:7050, opacity: 1, duration: 2, ease: "power3.out", stagger: -0.15 });
           tl.to(overskriftTwoRef.current, { x: 1360, opacity: 1, duration: 1.4, ease:"power3.out" },"<0.45");

      tl.to(sectionRef.current, { backgroundColor: "var(--taupe-hex)" });


    
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.clockWrapper}>
          <img
            ref={clockRef}
            src={clock}
            alt="Et ur der viser tiden der går"
            className={styles.clock}
          />
          <img
            ref={minuteHandRef}
            src={minuteHand}
            alt="Minutviseren på uret"
            className={styles.minuteHand}
          />
          <img
            ref={hourHandRef}
            src={hourHand}
            alt="Timeviseren på uret"
            className={styles.hourHand}
          />
        </div>
        <img ref={sixRef} src={six} alt="seks tal" className={styles.six} />
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
            Derfor skal du kunne planlægge hverdagen, så den ikke står alene for
            længe.
          </p>
          <img
            ref={doorRef}
            src={dogDoor}
            alt="Hund der kigger ud af en dør"
            className={styles.dogDoor}
          />
        </div>
        <div className={styles.cardSection}>
          <h1 ref={overskriftTwoRef}>De fire grundbehov</h1>
          <div className={styles.cardWrapper}>
            <img
              ref={cardOneRef}
              src={cardOne}
              alt="Kort med hund og hjerte"
              className={styles.card1}
            />
            <img
              ref={cardTwoRef}
              src={cardTwo}
              alt="Kort med hund og hjerte"
              className={styles.card2}
            />
            <img
              ref={cardTreeRef}
              src={cardTree}
              alt="Kort med hund og hjerte"
              className={styles.card3}
            />
            <img
              ref={cardFourRef}
              src={cardFour}
              alt="Kort med hund og hjerte"
              className={styles.card4}
            />
          </div>
        </div>

        <div className={styles.outro}>
          <h2 ref={overskriftTreeRef}>En hund er en livsforpligtelse
          - ikke en spontan beslutning</h2>
          <p ref={brodtekstTreeRef}>
          De fleste hunde lever 8–15 år. Det er et ansvar, der følger med glæder, rutiner og hverdagsliv
          </p>
          <img ref={dogOneRef} src={dog1}  className={styles.doggie} alt="" />
          <img ref={dogTwoRef} src={dog2} className={styles.doggie} alt="" />
          <img ref={dogThreeRef} src={dog3} className={styles.doggie} alt="" />
          <img ref={dogFourRef} src={dog4} className={styles.doggie} alt="" />
          <img ref={dogFiveRef} src={dog5} className={styles.doggie} alt="" />  
        </div>
      </div>
    </section>
  );
}
