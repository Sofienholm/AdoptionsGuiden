import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import overskrift1 from "./frames/overskrift.svg";
import forsideHund from "./frames/forsidehund.svg";
import dogOldImg from "./frames/dog-old.svg";
import dogActiveImg from "./frames/dog-active.svg";
import dogShyImg from "./frames/dog-shy.svg";
import handIllustration from "./frames/hands.svg";

import styles from "./step3.module.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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
  const overlayContentRef = useRef(null);

  const scribble1Ref = useRef(null);
  const scribble2Ref = useRef(null);
  const scribble3Ref = useRef(null);

  useEffect(() => {
    // GSAP context til animationer (tom lige nu)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=11000",
          scrub: 1,
          pin: true,
        },
      });

      // Scene 1 – intro fade-in
      tl.from(overskrift1Ref.current, {
        opacity: 0,
        y: -50,
        duration: 1,
      });

      tl.from(
        forsideHundRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        "+=0.2"
      );

      tl.from(
        brodtekst1Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
        },
        "+=0.2"
      );

      // Scene 1 fade out
      tl.to(
        [overskrift1Ref.current, forsideHundRef.current, brodtekst1Ref.current],
        {
          opacity: 0,
          duration: 1,
        }
      );

      // Scene 2 – overskrift fade-in
      tl.fromTo(
        overskrift2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
      // Scene 2 – hunde kommer ind en ad gangen
      const dogs = [dogOldRef.current, dogActiveRef.current, dogShyRef.current];

      // Hunde glider IND nedefra
      tl.from(dogs, {
        y: "120%",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      });
      tl.to([dogs, overskrift2Ref.current], {
        opacity: 0.1,
        duration: 0.5,
      });

      // OVERLAY
      tl.to(
        overlayContentRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
      // alt ud
      tl.to(
        [
          dogOldRef.current,
          dogActiveRef.current,
          dogShyRef.current,
          overskrift2Ref.current,
          overlayContentRef.current,
        ],
        {
          y: -1300,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Start: alle scribbles er usynlige
      gsap.set(
        [scribble1Ref.current, scribble2Ref.current, scribble3Ref.current],
        {
          drawSVG: "0% 0%",
        }
      );

      // Tegn scribble 1
      tl.to(scribble1Ref.current, {
        drawSVG: "0% 100%",
        duration: 1,
        ease: "power2.out",
      });

      // Tegn scribble 2 lige efter
      tl.to(
        scribble2Ref.current,
        {
          drawSVG: "100% 0%",
          duration: 1,
          ease: "power2.out",
        },
        "+=0.1"
      ); // lille pause mellem dem

      // Tegn scribble 3 lige efter
      tl.to(
        scribble3Ref.current,
        {
          drawSVG: "0% 100%",
          duration: 1,
          ease: "power2.out",
        },
        "+=0.1"
      );
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
          <img
            src={overskrift1}
            ref={overskrift1Ref}
            alt=""
            className={styles.headline}
          />
          <img
            src={forsideHund}
            ref={forsideHundRef}
            alt=""
            className={styles.dog}
          />
          <p className={styles.brodtekst} ref={brodtekst1Ref}>
            Så husk det handler om andet end udseendet!
          </p>
        </div>
        <div className={styles.scene2}>
          <h1 ref={overskrift2Ref} className={styles.scene2headline}>
            HUNDE HAR FORSKELLIGE <br /> <span>BEHOV</span>
          </h1>
          <div className={styles.dogRow}>
            {/* Ældre hund */}
            <div
              className={`${styles.dogBox} ${styles.dogOld}`}
              ref={dogOldRef}
            >
              <img src={dogOldImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER ÆLDRE</p>
              <div className={styles.overlay}>Kræver stabile rammer</div>
            </div>

            {/* Aktiv hund */}
            <div
              className={`${styles.dogBox} ${styles.dogActive}`}
              ref={dogActiveRef}
            >
              <img src={dogActiveImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER AKTIVE</p>
              <div className={styles.overlay}>
                Kræver roligt hjem og tålmodighed
              </div>
            </div>

            {/* Usikker hund */}
            <div
              className={`${styles.dogBox} ${styles.dogShy}`}
              ref={dogShyRef}
            >
              <img src={dogShyImg} alt="" className={styles.dogImg} />
              <p className={styles.dogLabel}>NOGLE ER USIKRE</p>
              <div className={styles.overlay}>Kræver erfaring</div>
            </div>
          </div>

          <div className={styles.overlayContent} ref={overlayContentRef}>
            <p className={styles.overlayText}>
              FOR AT SIKRE AT DISSE
              <br />
              BEHOV BLIVER SET
              <br />
              LIGGER DU TILLIDEN
              <br />I INTERNATETS HÆNDER
            </p>

            <img
              src={handIllustration}
              alt=""
              className={styles.overlayIllustration}
            />
          </div>
        </div>
        <div className={styles.scene3}>
          <div className={styles.scribbleLines}>
            <svg className={styles.scribbleSvg}>
              <path
                ref={scribble1Ref}
                className="scribble"
                d="M.36,18.53c20.62,21.23,25.54,17.72,45.52-4.14,6,33.9,61.93,16.23,63.8-12.5,14.47,29.14,59.12,36.13,83.01,13,2.04,10.45,12.03,19.04,23.3,20.04s48.37-10.45,52.5-20.35c16.7,19.28,81.55-27.81,72.69-4.34-13.58,36,44.82.6,62.51,12.08,26.84,17.42,20.36-32.52,62.9-3.88"
                fill="none"
                stroke="#3c473c"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg className={styles.scribbleSvg} viewBox="0 0 402.65 121.21">
              <path
                ref={scribble2Ref}
                className="scribble"
                d="M463.5.31c7.87,10.1-23.8,35.02-37.75,34.58-13.95-.44-27.6-6.95-36.72-17.52.2,11.25-12.66,18.72-23.91,18.39-17.31-.5-33.23-14.64-35.77-31.76-7.04,13.65-20.67,30.07-35.86,32.37-15.18,2.3-31.53-9.57-42.3-20.52-2.09,10.42-11.63,18.87-22.22,19.71s-21.34-6.02-25.04-15.98c-16.01,19.05-49.41,12.5-67.25-4.85-16.01,12.35-39.61,20.44-55.51,7.95-10.17,14.33-29.32,21.65-46.46,17.76C17.57,36.54,3.47,21.67.49,4.35"
                fill="none"
                stroke="#3c473c"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg className={styles.scribbleSvg}>
              <path
                ref={scribble3Ref}
                className="scribble"
                d="M.36,15.16c9.6,10.13,23.54,16,37.5,15.79,13.96-.21,27.71-6.51,37-16.93-.38,11.25,12.36,18.92,23.61,18.77,17.31-.22,33.46-14.1,36.28-31.19,6.82,13.76,20.49,23.9,35.63,26.45,15.14,2.55,31.38-2.57,42.32-13.34,1.93,10.45,11.32,19.06,21.9,20.06s21.43-5.67,25.29-15.57c15.7,19.3,48.27,21.46,66.38,4.4,15.8,12.61,40.22,12.9,56.32.67,9.94,14.49,28.97,22.12,46.17,18.5s31.54-18.27,34.79-35.54"
                fill="none"
                stroke="#3c473c"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
