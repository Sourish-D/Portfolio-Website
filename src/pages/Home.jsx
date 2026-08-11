import "../index.css";
import Navbar from "../components/Navbar.jsx";
import "../index.css";

const Home = () => {
  return (
    <main>
      <Navbar />
      <div class="about-me">
        <h1>About Me</h1>
        <p> 
          Hey! Welcome to my personal website. My name is Sourish, and 
          I'm a high school student with a passion for engineering and technology. I'm particularly interested in computer engineering, robotics, and embedded systems, and I hope to pursue engineering after high school. My interest in engineering even finds its way into the games I play! I love factory, automation, and optimization games like Factorio, Nomifactory, and Opus Magnum—the latter of which also inspired the visual design of this website.
          <br/><br/>
          Outside of engineering and programming, I enjoy playing basketball and chess, as well as watching TV shows. My favourite show is Pantheon, and my favourite artist is The 1975.
          <br/><br/>
          I built this website as both a final showcase of my web development skills and a place to share the projects I've worked on. I've also used it as an opportunity to experiment with APIs, interactive features, and different visual and stylistic elements. In a way, the website itself is another one of my projects.
          <br/><br/>
          Anyway, without further ado, feel free to explore, take a look around, and check out some of the things I've built!
        </p>
        
        <img src="" alt="Profile Picture" />
      </div>
    </main>
  )
}

export default Home