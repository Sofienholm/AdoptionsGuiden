import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import overskrift1 from "./frames/overskrift.svg";
import forsideHund from "./frames/forsidehund.svg";
import dogOldImg from "./frames/dog-old.svg";
import dogActiveImg from "./frames/dog-active.svg";
import dogShyImg from "./frames/dog-shy.svg";


import styles from "./step3.module.css";

gsap.registerPlugin(ScrollTrigger);

// Vores faste design-størrelse (som et "canvas")
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function Step1() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const overskrift1Ref = useRef(null);
  const forsideHundRef = useRef(null);
  const brodtekst1Ref = useRef(null);

  const overskrift2Ref = useRef(null);
  const dogOldRef = useRef(null);
const dogActiveRef = useRef(null);
const dogShyRef = useRef(null);



  useEffect(() => {
    // GSAP context til animationer (tom lige nu)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=20000",
          scrub: 1,
          pin: true,
        },
      });

   // Scene 1 – intro fade-in
tl.from(overskrift1Ref.current, {
    opacity: 0,
    y: -50,
    duration: 1
  });
  
  tl.from(forsideHundRef.current, {
    opacity: 0,
    y: 50,
    duration: 1
  }, "+=0.2");
  
  tl.from(brodtekst1Ref.current, {
    opacity: 0,
    y: 30,
    duration: 1
  }, "+=0.2");

  // Scene 1 fade out
tl.to([overskrift1Ref.current, forsideHundRef.current, brodtekst1Ref.current], {
    opacity: 0,
    duration: 1
  });
  
// Scene 2 – overskrift fade-in
tl.fromTo(overskrift2Ref.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 }
  );
  // Scene 2 – hunde kommer ind en ad gangen
tl.from(dogOldRef.current, {
    opacity: 0,
    y: 80,
    duration: 1
  });
  
  tl.from(dogActiveRef.current, {
    opacity: 0,
    y: 80,
    duration: 1
  }, "+=0.2");
  
  tl.from(dogShyRef.current, {
    opacity: 0,
    y: 80,
    duration: 1
  }, "+=0.2");
  
  tl.to("." + styles.dogRow, {
    opacity: 1,
    duration: 0.5
  });
  

    }, sectionRef);

    // --- Skalering af canvas ---
    const updateScale = () => {
      if (!canvasRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const scale = Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT);

      canvasRef.current.style.transform = `scale(${scale})`;
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
      <div ref={canvasRef} className={styles.canvas}>
        <div className={styles.scene1}>
          <img src={overskrift1} ref={overskrift1Ref} alt="" className={styles.headline} />
          <img src={forsideHund} ref={forsideHundRef} alt="" className={styles.dog} />
          <p className={styles.brodtekst} ref={brodtekst1Ref}>
            Så husk det handler om andet end udseendet!
          </p>
        </div>
        <div className={styles.scene2}>
            <h1 ref={overskrift2Ref} className={styles.scene2headline}>
             HUNDE HAR FORSKELLIGE <br/> <span>BEHOV</span>
            </h1>
            <div className={styles.dogRow}>
            {/* Ældre hund */}
            <div className={`${styles.dogBox} ${styles.dogOld}`} ref={dogOldRef}>
                <img src={dogOldImg} alt="" className={styles.dogImg} />
                <p className={styles.dogLabel}>NOGLE ER ÆLDRE</p>
                <div className={styles.overlay}>Kræver stabile rammer</div>
            </div>

            {/* Aktiv hund */}
            <div className={`${styles.dogBox} ${styles.dogActive}`}ref={dogActiveRef}>
                <img src={dogActiveImg} alt="" className={styles.dogImg} />
                <p className={styles.dogLabel}>NOGLE ER AKTIVE</p>
                <div className={styles.overlay}>Kræver roligt hjem og tålmodighed</div>
            </div>

            {/* Usikker hund */}
            <div className={`${styles.dogBox} ${styles.dogShy}`} ref={dogShyRef}>
                <img src={dogShyImg} alt="" className={styles.dogImg} />
                <p className={styles.dogLabel}>NOGLE ER USIKRE</p>
                <div className={styles.overlay}>Kræver erfaring</div>
            </div>
            </div>

        </div>
      </div>
    </section>
  );
}
