import React, { useState } from 'react'
import '../../css/home.css'
import Footer from '../footer'
import anime from 'animejs/lib/anime.es.js';
import '../../css/hi.css'
import Hi from './anime-index'
const intros = [
  "Interested in programming?",
  "Leave behind rote learning, pick up applications!",
  "A practical approach to be competitive is here."
]
const map = Array.prototype.map
const Home = () => {
  const [index, setIndex] = useState(0)
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
          <h1 className = "intro">
            {map.call(intros[0], c => <span className = "let0" style = {{color: "#FA3264"}}>{c}</span>)}  <br />
            {map.call(intros[1], c => <span className = "let1" style = {{color: "#ADEFD1FF"}}>{c}</span>)}  <br />
            {map.call(intros[2], c => <span className = "let2" style = {{color: "#D6ED17FF"}}>{c}</span>)}  <br />
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home