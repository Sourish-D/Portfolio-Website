import Navbar from "../components/Navbar.jsx";
import Education from "../components/Education.jsx";
import Extracurriculars from "../components/Extracurriculars.jsx";
import Experience from "../components/Experience.jsx";
import Certifications from "../components/Certifications.jsx";
import Footer from "../components/Footer.jsx";
import chess from "../assets/chess.webp";
import piClub from "../assets/piClub.jpg";
import MUN from "../assets/MUN.webp";
import Animation from "../components/Animation.jsx";

const Background = () => {
  return (
    <main>
      <Navbar />

      <Animation element = {<Education />} first />

      <h1 className="title">Extracurriculars</h1>
      <section className="card-group middle-box extracurriculars">
        <Animation 
          element={
            <Extracurriculars
              title="Chess Team"
              image={chess}
              description="A member of the school's chess team, participating in regular practices, school competitions, and tournaments. I enjoy playing competitively and working through challenging positions with the rest of the team."
              time="2023"
              award="Award: Junior Most Spirited"
            />
          }
          width="100%"
          card
        />
        <Animation 
          element={
            <Extracurriculars
              title="Pi Club"
              image={piClub}
              description="An executive member of Pi Club, helping prepare students for Waterloo mathematics contests through practice sessions, problem-solving, and contest preparation. I also help create and review challenging problems for other students."
              time="2023"
              award="Award: Junior Most Valuable"
            />
          }
          width="100%"
          card
          delay={0.25}
        />
        <Animation 
          element={
            <Extracurriculars
              title="Model UN"
              image={MUN}
              description="Represented Norway in the UNODC SOMA assembly, where I researched the trafficking of cultural property and narcotic distribution and developed proposals involving technologies such as databases, AI image recognition, and blockchain."
              time="2025"
              award="Delegate for Norway"
            />
          }
          width="100%"
          card
          delay={0.5}
        />
      </section>

      <h1 className="title">Previous Experience</h1>

      <Experience />

      <Certifications />

      <Footer />
    </main>
  );
};

export default Background;
