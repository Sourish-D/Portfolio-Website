import "../index.css";

import Animation from "../components/Animation.jsx";
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
    <main className="space-up">
      <Navbar />

      <Animation element={<About />} first />

      <Animation element={<Spotify />} right down />

      <h1 className="title">My Favourite Games</h1>

      <section className="favourite-games middle-box card-group">
        <Animation
          element={
            <GameCard
              title="Factorio"
              image={factorio}
              description="Factorio is a 2D survival and simulation game about building and managing automated factories. I'm not going to lie, I haven't played this one yet. But I WILL VERY SOON! "
            />
          }
          width="100%"
          card
          delay={0}
        />

        <Animation
          element={
            <GameCard
              title="Nomifactory"
              image={nomifactory}
              description="Nomifactory is a quest-driven expert minecraft modpack. I started this in February 2026, and played it all the way to July 2026. It was a breath of fresh air from the create-focused modpacks that I used to play. In Nomifactory, the main mod is Gregtech and it's extension, Shadows of Greg."
            />
          }
          width="100%"
          card
          delay={0.25}
        />

        <Animation
          element={
            <GameCard
              title="Opus Magnum"
              image={opus_magnum}
              description="Opus Magnum is an puzzle video game developed by Zachtronics. In this, you program machinery to move elements to produce results. I saw this on tiktok first and was amazed by how cool it looked. Now, it's become the visual theme of this website!"
            />
          }
          width="100%"
          card
          delay={0.5}
        />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
