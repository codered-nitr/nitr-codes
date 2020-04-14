import React, { useRef } from 'react'
import '../../css/home.css'
import Footer from '../footer'
import anime from 'animejs/lib/anime.es.js';
import '../../css/hi.css'
import Hi from './anime-index'
import { Nav, Tab, Row, Col } from 'react-bootstrap';
const intros = [
  "Interested in programming?",
  "Leave behind rote learning, pick up applications!",
  "A practical approach to be competitive is here."
]
const map = Array.prototype.map
const Home = () => {
  const gsRef = useRef(null)
  const scrollToGs = () => window.scrollTo(0, gsRef.current.offsetTop-50)
  anime.timeline({loop : true})
    .add({
      targets: '.let0',
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
    }).add({
      targets: '.let1',
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
    }).add({
      targets: '.let2',
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
    }).add({
      targets: '.let2 .let1 .let0',
      opacity: [1, 0]
    })
  return(
    <div className = "homeBase">
      <div>
        <Hi />
        <div className = "greeting">
          <h1 className = "intro" style = {{fontFamily: "equinox"}}>
            {map.call(intros[0], c => <span className = "let0" style = {{color: "#FA3264"}}>{c}</span>)}  <br />
            {map.call(intros[1], c => <span className = "let1" style = {{color: "#ADEFD1FF"}}>{c}</span>)}  <br />
            {map.call(intros[2], c => <span className = "let2" style = {{color: "#D6ED17FF"}}>{c}</span>)}  <br /> <br />
            <div className = "gsbtn" onClick = {scrollToGs}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Let's Get Started
            </div>
          </h1>
        </div>
      </div>
      <div ref = {gsRef}>
        <div className = "downgreet" style = {{textAlign: "center", fontFamily: "equinox"}}>
          <div><img alt="" src = {require('../../img/nitr+cld2.png')} /></div>
          <h2>Frequently asked questions</h2>
        </div>
        <hr align = "center" width = "50%" />
        <div className = "faq">
          <Tab.Container id = "faq" defaultActiveKey = "first" fluid = "sm">
            <Row>
              <Col sm = {3} style = {{fontFamily: "equinox"}}>
                <Nav fill variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Competitive Programming</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Why Competitive Programming</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">CP vs Software Development</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">How to get started</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey = "first">
                    <h3>Competitive Programming</h3><br />
                    Competitive programming is a brain game which takes place on the Internet or a local network in which programmers have to code according to the given constraints. Here programmers are referred as competitive coders. Many top notch companies like Google and Facebook host contests like Codejam and Hackercup respectively. Those who perform well in these contests are recognised by these companies and get offers to work with these tech giants.
                  </Tab.Pane>
                  <Tab.Pane eventKey = "second">
                    <h3>Why Competitive Programming?</h3><br />
                    <ul style={{listStyleType: "circle"}}>
                      <li>Publicly demonstrate your problem solving skills</li>
                      <li>Prepare yourself for technical interviews</li>
                      <li>Become faster and focussed</li>
                      <li>Guaranteed brain exercise</li>
                      <li>It's FUN!</li>
                    </ul>  
                  </Tab.Pane>
                  <Tab.Pane eventKey = "third">
                    <h3>CP vs Software Development</h3>
                    See, when we say competitive programming we are generally associating with the idea of solving coding problems in those programming websites like codechef, topcoder, spoj, etc. And when we talk about a developer we are picturing a person developing applications, building websites, developing backends, handling scalability issues, making mobile apps, etc. <br /><br />
                    A competitive programmer has a good hold on analytical thinking, problem solving skills, algorithms, data structures, time and space complexity of the code. But wouldn’t a developer need these to actually develop a good software?<br /><br />
                    A competitive programmer can solve problems in a better way. They are good in using their analytical thinking skills which they have enhance by doing more and more competitive programming. They are good at knowing which data structures and algorithms are better suited for a particular program and they are good at solving hard problems.<br /><br />
                    A developer can build good software without having competitive programming skills but can only go so far. Without having good problem solving skills and good knowledge of data structures and algorithms, the developer will not be able to make his/her application/software faster, more efficient, having better time and space complexity.<br /><br />
                    So both of them need each other. So better to become both and help yourself. Its easier said than done. There is often some kind of a bias that you may see regarding this.<br /><br />
                    <i>Source: <a href="https://medium.com/@anirbanroydas/competitive-programmer-vs-developer-lets-talk-91f37f819d65">Let's Talk</a></i>
                  </Tab.Pane>
                  <Tab.Pane eventKey = "fourth">
                    <h3>How to get started?</h3>
                    <h6><b>Step 1: Choose a programming language</b></h6>
                    It can be a high-level language like Python or a middle-level language like C/C++. If you are a beginner, Python will be easier to start with. However, C++ is quite faster when it come to the actual sense of competition.<br /><br />
                    <h6><b>Step 2: Learn about time and space compexities</b></h6>
                    Time complexity refers to the execution time of all the operations in a program. All operations of a computer take constant time. Space complexity, similar to time complexity, is also used to judge the performance of the running program. It is a measure of the amount of working storage (or memory) an algorithm needs. While choosing a data structure for a particular problem, time and space complexities play a big role.<br /><br />
                    <h6><b>Step 3: Learn the basic data structures and algorithms</b></h6>
                    Nearly every coding problem will require the usage of a specific data structure or algorithm for an optimal solution. Knowing basic data structures and algorithmic techniques before you start is a must. Knowledge of the following data structures and associated algorithms is a must for competitive coding.<br />
                    <ul style = {{listStyleType: "disc"}}><li>Array</li><li>Linked List</li><li>Stack</li><li>Queue</li><li>Tree</li><li>Graph</li><li>HashMap</li></ul>
                    <h6><b>Step 4: Taking part in online coding contests</b></h6>
                    Participate in competitions. Learn from experienced coders. The more you code, the more you’ll be able to find the suitable data structure and/or algorithm for a specific problem (this is a very important skill for a software development). With dedicated practice, you’ll be able to ace competitive programming.<br /><br />
                    <h6><b>P.S. We are here for you</b></h6>
                    NiTR.codes is an initiative dedicated towards helping you in getting started in the sport of competitive programming. Whether you are completely new to it, or have some experience, we aim to provide you with content and contests that will kickstart your journey.
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <hr align = "center" width = "50%" />
      </div>
      <Footer />
    </div>
  )
}

export default Home