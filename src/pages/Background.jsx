import Navbar from "../components/Navbar.jsx";
import Education from "../components/Education.jsx";
import Extracurriculars from "../components/Extracurriculars.jsx";
import Experience from "../components/Experience.jsx";
import Certifications from "../components/Certifications.jsx";
import Footer from "../components/Footer.jsx";
import chess from "../assets/chess.jpg";
import piClub from "../assets/piClub.jpg";
import MUN from "../assets/MUN.webp";
import Animation from "../components/Animation.jsx";

const Background = () => {
  return (
    <main>
      <Navbar />

      <Animation element = {<Education />} />

      <h1 class="title">Extracurriculars</h1>
      <div class="extracurriculars">
        <Extracurriculars
          title="Chess Team"
          image={chess}
          description="A member of the school's chess team, participating in regular practices, school competitions, and tournaments. I enjoy playing competitively and working through challenging positions with the rest of the team."
          time="2023"
          award="Award: Junior Most Spirited"
        />
        <Extracurriculars
          title="Pi Club"
          image={piClub}
          description="An executive member of Pi Club, helping prepare students for Waterloo mathematics contests through practice sessions, problem-solving, and contest preparation. I also help create and review challenging problems for other students."
          time="2023"
          award="Award: Junior Most Valuable"
        />
        <Extracurriculars
          title="Model UN"
          image={MUN}
          description="Represented Norway in the UNODC SOMA assembly, where I researched the trafficking of cultural property and narcotic distribution and developed proposals involving technologies such as databases, AI image recognition, and blockchain."
          time="2025"
          award="Delegate for Norway"
        />
      </div>

      <h1 class="experience-title">Previous Experience</h1>
      <Experience />

      <Certifications />

      <Footer />
    </main>
  );
};

export default Background;
