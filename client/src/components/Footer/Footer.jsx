import React from 'react'
import Instagram from '../../assets/icons/Footer/Instagram'
import FaebookIcon from '../../assets/icons/Footer/FaebookIcon'
import Twitter from '../../assets/icons/Footer/Twitter'

const Footer = () => {
  return (
    <section id='footer'>

      <div className="image">
        <img src="https://i.pinimg.com/564x/6b/c8/83/6bc883097447bfa2d80ee5500a4d2297.jpg" alt="" />
      </div>
      <div className="left col">
          <h3>CatMid</h3>
      </div>

      <div className="center col">
          <ul>
            <li>About</li>
            <li>Benefits</li>
            <li>Career</li>
            <li>Support</li>
          </ul>

          <p>© 2023 CatMid. All rights reserved.</p>
      </div>

      <div className="right col">
          <div className="social-media">
        
            <Instagram/>
            
            <FaebookIcon/>
            <Twitter/>
          </div>

          <p>Support: iamzaw466@gmail.com</p>

          <p>Designed & Developed by Deleon Wira</p>
      </div>
    </section>
  )
}

export default Footer