import { useState, useRef, useEffect } from "react";
import ramMandir from "../assets/ramMandir.webp";
import newspaper from "../assets/newspaper.jpg";
import modelUnExperience from "../assets/modelUnExperience.webp";

const experiences = [
  {
    role: "Volunteer Student Teacher",
    place: "Mississauga's Ram Mandir",
    image: ramMandir,
    description: [
      "Volunteer Teacher for Baala Vihaar program.",
      "Taught and mentored groups of 10-15 students in a weekly classroom setting.",
      "Fostered a supportive and organized classroom environment that encouraged student participation.",
      "Led activities and supervised younger students during volunteer programs.",
      "Collaborated with teachers to coordinate educational activities and cultural events.",
      "Independently planned and taught lessons for an assigned student level.",
      "Monitored student progress throughout lessons.",
    ],
  },
  {
    role: "Newspaper Delivery",
    place: "Metroland Media Group",
    image: newspaper,
    description: [
      "Delivered newspapers to residential customers on a consistent schedule, ensuring timely and accurate distribution.",
      "Organized, packaged, and prepared newspaper bundles for efficient delivery.",
      "Planned and followed delivery routes to maximize efficiency and meet deadlines.",
      "Demonstrated reliability by working independently with minimal supervision in various weather conditions.",
      "Maintained a high level of accuracy while handling deliveries and customer requests.",
      "Developed strong time management, organizational, and problem-solving skills through daily responsibilities.",
    ],
  },
  {
    role: "Model UN SOMA Delegate - Norway",
    place: "Model United Nations SOMA",
    image: modelUnExperience,
    description: [
      "Represented Norway in a Model United Nations conference, debating solutions to the global issue of illicit trafficking of cultural property.",
      "Conducted research on international policies, Norway's position, and existing frameworks for protecting cultural heritage.",
      "Developed and presented policy proposals focused on strengthening international cooperation, improving databases for stolen artifacts, and using emerging technologies for identification and tracking.",
      "Participated in diplomatic negotiations with delegates from other countries to draft collaborative resolutions.",
      "Strengthened public speaking, research, critical thinking, and negotiation skills through formal debate.",
    ],
  },
];

const Experience = () => {
  const [index, setIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const swapLeft = () => {
    clearAllTimers();
    setFlashing(true);

    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex >= experiences.length - 1 ? 0 : prevIndex + 1));
    }, 150);

    setTimeout(() => {
      setFlashing(false);
    }, 300);
  };

  const swapRight = () => {
    clearAllTimers();
    setFlashing(true);

    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex <= 0 ? experiences.length - 1 : prevIndex - 1));
    }, 100);

    setTimeout(() => {
      setFlashing(false);
    }, 300);
  };

  return (
    <section className={`experience standard-block middle-box double-grid ${flashing ? "flash" : ""}`}>
      <button 
        type="button" 
        className="experience-left" 
        onClick={swapLeft}
        aria-label="Next experience"
      >
        <span aria-hidden="true">←</span>
      </button>

      <div className="experience-left-side distribute-column-text">
        <h1 className="important-text">{experiences[index].role}</h1>
        <h2 className="important-text">{experiences[index].place}</h2>
        <img src={experiences[index].image} alt={`${experiences[index].role} at ${experiences[index].place}`} />
      </div>

      <div className="experience-right-side">
        <ul>
          {experiences[index].description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <button 
        type="button" 
        className="experience-right" 
        onClick={swapRight}
        aria-label="Previous experience"
      >
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
};

export default Experience;