import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import clock from "./frames/clock.svg";
import minuteHand from "./frames/min-viser.svg";
import hourHand from "./frames/time-viser.svg";
import six from "./frames/sekstal.svg";
import dogDoor from "./frames/dog-at-door.svg";

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
      ease: "power1.out",
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
    </section>
  );
}
