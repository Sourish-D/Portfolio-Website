import { useState } from "react";
import ramMandir from "../assets/ramMandir.webp";
import newspaper from "../assets/newspaper.jpg";
import modelUnExperience from "../assets/modelUnExperience.jpg";

const experiences = [
  {
    role: "Volunteer Student Teacher",
    place: "Mississauga's Ram Mandir",
    image: ramMandir,
    description:
      "- Volunteer Teacher for Baala Vihaar program.<br /><br />- Taught and mentored groups of 10-15 students in a weekly classroom setting.<br /><br />- Fostered a supportive and organized classroom environment that encouraged student participation. <br /><br />- Leaded activities and supervised younger students during volunteer programs. <br /><br />- Collaborated with teachers to coordinate educational activities and cultural events. <br /><br />- Independently planned and taught lessons for an assigned student level. <br /><br />- Monitored student progress throughout lessons.",
  },
  {
    role: "Newspaper Delivery",
    place: "Metroland Media Group",
    image: newspaper,
    description:
      "-  Delivered newspapers to residential customers on a consistent schedule, ensuring timely and accurate distribution.<br /><br /> - Organized, packaged, and prepared newspaper bundles for efficient delivery.<br /><br />- Planned and followed delivery routes to maximize efficiency and meet deadlines.<br /><br />- Demonstrated reliability by working independently with minimal supervision in various weather conditions.<br /><br />- Maintained a high level of accuracy while handling deliveries and customer requests.<br /><br /> - Developed strong time management, organizational, and problem-solving skills through daily responsibilities.",
  },
  {
    role: "Model UN SOMA Delegate - Norway",
    place: "Model United Nations SOMA",
    image: modelUnExperience,
    description:
      "- Represented Norway in a Model United Nations conference, debating solutions to the global issue of illicit trafficking of cultural property.<br /><br />- Conducted research on international policies, Norway's position, and existing frameworks for protecting cultural heritage.<br /><br />- Developed and presented policy proposals focused on strengthening international cooperation, improving databases for stolen artifacts, and using emerging technologies for identification and tracking.<br /><br />- Participated in diplomatic negotiations with delegates from other countries to draft collaborative resolutions.<br /><br />- Strengthened public speaking, research, critical thinking, and negotiation skills through formal debate.",
  },
];

const Experience = () => {
  const [index, setIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const swapLeft = () => {
    setFlashing(true);

    setTimeout(() => {
      if (index >= 2) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 150);

    setTimeout(() => {
      setFlashing(false);
    }, 300);
  };
  const swapRight = () => {
    setFlashing(true);

    setTimeout(() => {
      if (index <= 0) {
        setIndex(2);
      } else {
        setIndex(index - 1);
      }
    }, 100);

    setTimeout(() => {
      setFlashing(false);
    }, 300);
  };

  return (
    <div class={`experience standard-block ${flashing ? "flash" : ""}`}>
      <button class="experience-left" onClick={swapLeft}>
        ←
      </button>
      <div class="experience-left-side">
        <h1>{experiences[index].role}</h1>
        <h2>{experiences[index].place}</h2>
        <img src={experiences[index].image} />
      </div>
      <div class="experience-right-side">
        <p
          dangerouslySetInnerHTML={{ __html: experiences[index].description }}
        />
      </div>
      <button class="experience-right" onClick={swapRight}>
        →
      </button>
    </div>
  );
};

export default Experience;
