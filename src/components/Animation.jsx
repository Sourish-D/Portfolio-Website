import { useEffect, useRef, useState } from "react";
import opus_magnum_arm_2 from "../assets/opus_magnum_arm_2.png";
import socket from "../assets/socket.png";

const Animation = ({
  element,
  right = false,
  width = "100vw",
  first = false,
  down = false,
  card = false,
  delay = 0,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [pulled, setPulled] = useState(false);
  const [isClipped, setIsClipped] = useState(true);
  const containerRef = useRef(null);
  const pulledRef = useRef(false);
  const delayStyle = pulled ? { transitionDelay: `${delay}s` } : {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        pulledRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setIsClipped(false);
        }
        setPulled(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      },
    );

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);
  function handleOrbitTransitionEnd(event) {
    if (event.propertyName === "transform" && !pulledRef.current) {
      setIsClipped(true);
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    // Only attach event listener when active to save performance
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);
  return (
    <div
      className={`pull-container 
        ${pulled ? "visible" : "hidden"}
        ${isClipped ? "clipped" : ""}
        ${right ? "right" : ""} 
        ${first ? "first" : ""} 
        ${down ? "down" : ""} 
      `}
      onClick={() => setIsActive(true)}
      ref={containerRef}
    >
      <div
        className={`orbit 
          ${pulled ? "pulled" : ""} 
          ${right ? "right" : ""}  
          ${card ? "card" : ""} 
          ${isActive ? "active" : ""}
        `}
        style={delayStyle}
        onTransitionEnd={handleOrbitTransitionEnd}
      >
        <div
          className={`about-wrapper 
            ${right ? "right" : ""}
          `}
          style={{ width }}
        >
          {element}
        </div>
      </div>

      <img
        className={`opus-arm-socket 
          ${right ? "right" : ""} 
          ${card ? "card" : ""}
        `}
        src={socket}
        alt=""
      />

      <img
        className={`opus-arm 
          ${pulled ? "pulling" : ""} 
          ${right ? "right" : ""}  
          ${card ? "card" : ""}
        `}
        src={opus_magnum_arm_2}
        alt="Mechanical arm"
        style={delayStyle}
      />
    </div>
  );
};

export default Animation;
