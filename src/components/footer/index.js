import React from 'react'
import '../../css/footer.css'
import { IconContext } from 'react-icons'
import { TiSocialFacebookCircular, TiSocialInstagramCircular, TiSocialLinkedinCircular, TiSocialGithubCircular } from 'react-icons/ti'
import { GiTechnoHeart } from 'react-icons/gi'
import { FaCode, FaCoffee } from 'react-icons/fa'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return(
    <div className = "d-block">
      <div className = "foot">
        <div className = "r-seg">
        <Row className = "justify-content-md-center" noGutters>
          <Col>
            <div className = "f-sec">
              <div className = "f-title">ABOUT</div>
              <div className = "f-body">
                NIT-R Codes is an initiative to give a kickstart to the rise of coding culture among the students. Even if you haven't even written a single line of code, this initiative aims to guide you to get started with competitive programming.
                <br /> <br />
                Code Red is a club under the Technical Society of National Institute of Technology Rourkela, centralized on improving the coding culture of the college via workshops, regular classes, and online contests.
              </div>
              <div className = "social-links">
                <IconContext.Provider value = {{color: "#FA3264", size: "2em"}}>
                  <div>
                    <a href = 'https://www.facebook.com/coderednitrkl'><TiSocialFacebookCircular /></a>
                    <a href = 'https://www.instagram.com/codered.nitrkl/'><TiSocialInstagramCircular /></a>
                    <a href = 'https://www.linkedin.com/company/the-code-red-club/'><TiSocialLinkedinCircular /></a>
                    <a href = 'https://www.github.com/codered-nitr'><TiSocialGithubCircular /></a>
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </Col>
          <Col>
            <div className = "f-sec">
              <div className = "f-title">CONTACT INFO</div>
              <div className = "f-body">
                <p><strong className = "cinfo">Address: </strong>
                Student Activity Centre, Sector 1, National Institute of Technology, Rourkela.
                Odisha, India.
                PIN:769008</p>
                <iframe title = "Student Activity Center map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7804.545294654541!2d84.90194065787612!3d22.250986110936346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201e7fc7810e25%3A0x93c2da55e52c71b2!2sStudent%20Activity%20Center!5e0!3m2!1sen!2sin!4v1578293706149!5m2!1sen!2sin" frameBorder="0" style={{border: 0}} ></iframe>
                <p><strong className = "cinfo">Email: </strong><a style={{color: "#FA6432", textDecorationLine: "none", fontSize: "0.9rem"}} href = "mailto:codered.nitrkl@gmail.com">codered.nitrkl@gmail.com</a></p>
              </div>
            </div>
          </Col>
          <Col>
            <div className = "center nitrLogo">
              <a href = "https://www.nitrkl.ac.in/">
                <img alt = "NITR logo" style = {{maxWidth: "300px"}} src = 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/NIT_Rourkela_Colour_Logo_SVG.svg/1200px-NIT_Rourkela_Colour_Logo_SVG.svg.png' />
              </a>
            </div>
          </Col>
        </Row>
        </div>
      </div>
      <div className = "sub-footer">
        <div>
          <IconContext.Provider value = {{color: "#FA3264", size: "1.5em"}}>
            <FaCode /> with <GiTechnoHeart /> & <FaCoffee />
          </IconContext.Provider>
        </div>
        <div className = "center">
          <a style = {{textDecoration: "none"}} href = "https://thecodered.club/">
            <IconContext.Provider value = {{color: "#FA3264", size: "1.5em"}}>
              <span style = {{fontFamily: "equinox", color: "whitesmoke"}}><small>a</small> CODE <span className = "red">RED </span><small>initiative</small></span>
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer