import { useState } from "react";
import WebDev3 from "../assets/WebDev3.png";
import Java3 from "../assets/Java3.png";
import ucmass from "../assets/ucmass.webp";

const certificates = [Java3, WebDev3, ucmass];

const Certifications = () => {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);

  const changeCertificate = (newIndex) => {
    if (newIndex === index) return;

    setNextIndex(newIndex);

    setTimeout(() => {
      setIndex(newIndex);
      setNextIndex(null);
    }, 300);
  };

  return (
    <section
      className="certificates space-up middle-box"
      style={{ width: "60%", "margin-left": "20%" }}
    >
      <h1 className="standard-block important-text">View My Certificates!</h1>
      <div className="standard-block certificates-content even-flex">
        <div className="certificates-card distribute-column-text right-border">
          <button onClick={() => changeCertificate(0)}>Java - Codeyoung</button>
          <button onClick={() => changeCertificate(1)}>
            Web Dev - Codeyoung
          </button>
          <button onClick={() => changeCertificate(2)}>
            UCMAS - Graduation
          </button>
        </div>
        <div className="certificate-display">
          <img
            className={`certificate-current ${nextIndex !== null ? "out-left" : ""}`}
            src={certificates[index]}
            alt="certificate"
          />
          {nextIndex !== null && (
            <img
              className="certificate-next in-left"
              src={certificates[nextIndex]}
              alt="certificate"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
