# Personal Website

<b>Hey! Welcome to my Personal Website!</b>

I'm using this project as a showcase of my web development skills, projects and interests. This website originally started as a project using HTML, CSS and Javascript. As the project grew, I decided to transition to React to make the site more interaction, and easier to expand.

<b>Currently, I'm using:</b>
- React
- JavsScript
- CSS
- Vite

<h1>API Integrations</h1>

One of my main goals for this project is to experiment with several APIs and use them to make the website more interactive and personal. 

Some examples are:
- Spotify
- Letterboxd
- Github

<h1>Design</h1>

The visual design of the website takes heavy inspiration from Opus Magnum, particularly its mechanical and industrial aesthetic. I'm also experimenting with animations and interactive elements to make the website feel less like a traditional portfolio and more like an interactive project.

<b>The website is currently under development, but you're free to explore for now! Thanks for checking out my project! </b>

<h1> Project Layout: </h1> 

HOME <Home /> <br>
│ <br>
├── About Me  <About /> <br>
│ <br>
├── Spotify API <Spotify /> <br>
|    | <br>
|    ├── Currently Listening  <br>
|    |<br>
|    └── Statistics<br>
│<br>
├── My Favourite Games <Games /><br>
| <br>
└── Contact <Footer /><br>
<br><br>
Background <Background /><br>
|<br>
├── Education <School /><br>
│<br>
├── Experience <Experience /><br>
|<br>
├── Extracurriculars <Extracurriculars /><br>
|<br>
├── Achievements <Awards /><br>
│<br>
└── Certifications <Certificiations /><br>
<br><br>
Projects <ProjectsPage/><br>
|
├── Projects <Projects /><br>
|   | <br>
|   ├── ESP32 Radar<br>
|   |<br>
|   ├── Robotics / Vehicle<br>
|   |<br>
|   └─── Other Programming Projects<br>
|<br>
├── LeetCode <Leetcode /><br>
│
└── GitHub Statistics <Github /><br>
<br><br>
--------------------------------------------
Notes from Myself
--------------------------------------------

Somehow does motion \\/ \\/
--------------
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Hey, I'm Sourish
    </motion.h1>

--------------------------------------------
Notes from React and Vite
--------------------------------------------

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
