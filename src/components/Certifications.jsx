import { useState } from "react";
import WebDev3 from "../assets/WebDev3.png";
import Java3 from "../assets/Java3.png";
import ucmass from "../assets/ucmass.jpg";

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
    <div class="certificates">
      <h1>View My Certificates!</h1>
      <div class="standard-block certificates-content">
        <div class="certificates-card">
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
          />
          {nextIndex !== null && (
            <img
              className="certificate-next in-left"
              src={certificates[nextIndex]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
