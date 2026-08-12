import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div class="footer">
        <div>
            <p>Built with React + Vite</p>
            <a href="https://github.com/Sourish-D/Portfolio-Website">View Source</a>
            <p>© 2026 Sourish Dhakal. All rights reserved.</p>
        </div>
        <div class="socials">
            <a href="https://github.com/Sourish-D">Github</a>
            <a href="https://www.linkedin.com/in/sourish-dhakal/">LinkedIn</a>
            <a href="mailto:Sourish.dhakal1@gmail.com">Email</a>
        </div>
    </div>
  )
}

export default Footer