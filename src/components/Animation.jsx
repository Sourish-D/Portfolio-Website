import { useEffect, useRef, useState } from "react";
import opus_magnum_arm_2 from "../assets/opus_magnum_arm_2.png";
import socket from "../assets/socket.png";

const Animation = ({ element, right = false, width="100vw", first=false, down=false, card=false, delay=0}) => {
  const [pulled, setPulled] = useState(false);
  const containerRef = useRef(null);
  const delayStyle = pulled ? { transitionDelay: `${delay}s` } : {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPulled(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`pull-container ${pulled ? "visible" : "hidden"} ${
        right ? "right" : ""
      } ${first ? "first" : ""} ${down ? "down":""}`}
      ref={containerRef}
    >
      <div
        className={`orbit ${pulled ? "pulled" : ""} ${
          right ? "right" : ""}  ${card ? "card":""}`}
          style={delayStyle}
      >
        <div className={`about-wrapper ${right ? "right" : ""}`} style={{ width}} >
          {element}
        </div>
      </div>

      <img
        className={`opus-arm-socket ${right ? "right" : ""} ${card ? "card":""}`}
        src={socket}
        alt=""
      />

      <img
        className={`opus-arm ${pulled ? "pulling" : ""} ${right ? "right" : ""}  ${card ? "card":""}`}
        src={opus_magnum_arm_2}
        alt="Mechanical arm"
        style={delayStyle}
      />
    </div>
  );
};

export default Animation;