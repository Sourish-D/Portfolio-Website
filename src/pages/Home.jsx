import "../index.css";
import Navbar from "../components/Navbar.jsx";
import GameCard from "../components/GameCard.jsx";
import About from "../components/About.jsx";
import Spotify from "../components/Spotify.jsx";
import Footer from "../components/Footer.jsx";

import factorio from "../assets/factorio.jpg";
import opus_magnum from "../assets/opus_magnum.jpg";
import nomifactory from "../assets/nomifactory.jpg";

const Home = () => {
  return (
    <main>
      <Navbar />

      <About />

      <Spotify />

      <h1 class="title">My Favourite Games</h1>

      <div class="favourite-games">
        <GameCard
          title="Factorio"
          image={factorio}
          description="Factorio is a 2D survival and simulation game about building and managing automated factories. Players crash-land on an alien planet, mine raw resources, research new technologies, build conveyor belts and logistics networks, and fight off native creatures angered by industrial pollution. The main goal is to launch a rocket into space."
        />
        <GameCard
          title="Nomifactory"
          image={nomifactory}
          description="Nomifactory is a quest-driven expert minecraft pack focused on building large-scale factories, where you will put your automation skills to the test as you progress from punching trees to creative-in-survival, climbing the power tiers of GregTech: Community Edition and its extension, Shadows of Greg. No complicated magic systems, no forced combat or exploration: Only Factories!"
        />
        <GameCard
          title="Opus Magnum"
          image={opus_magnum}
          description="Opus Magnum is an open-ended puzzle video game developed by Zachtronics released in December 2017. Players design and program physical machinery—using programmable arms, tracks, and alchemical glyphs—on a transmutation engine to turn basic reagents into products like potions, poisons, and weapons."
        />
      </div>

      <Footer />
    </main>
  );
};

export default Home;
