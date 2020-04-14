import React from 'react'
import '../../css/home.css'
import anime from 'animejs/lib/anime.es.js';
import '../../css/hi.css'
const Hi = () => {
  anime.timeline({loop: false})
    .add({
      targets: '.ml8 .circle-white',
      scale: [0, 2],
      opacity: [1, 0],
      easing: "easeInOutExpo",
      rotateZ: 360,
      duration: 1100
    }).add({
      targets: '.ml8 .circle-container',
      scale: [0, 1],
      duration: 1100,
      easing: "easeInOutExpo",
      offset: '-=1000'
    }).add({
      targets: '.ml8 .circle-dark',
      scale: [0, 1],
      duration: 1100,
      easing: "easeOutExpo",
      offset: '-=600'
    }).add({
      targets: '.ml8 .letters-left',
      scale: [0, 1],
      duration: 1200,
      offset: '-=550'
    }).add({
      targets: '.ml8 .bang',
      scale: [0, 1],
      rotateZ: [45, 15],
      duration: 1200,
      offset: '-=1000'
    }).add({
      targets: '.let',
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(50, {from: 'center'})
    })
    .add({
      targets: '.ml8',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1400
    }).add({
      targets: '.hiBox',
      scale: [1, 0],
      height: 0,
      width: 0
    });

  anime({
    targets: '.ml8 .circle-dark-dashed',
    rotateZ: 360,
    duration: 8000,
    easing: "linear"
  });
  const map = Array.prototype.map
  const nc = "NiTR Codes : a"
  const cr = " CODE RED"
  const ini = " Initiative"
  const nclet = map.call(nc, c => <span className = "let">{c}</span>)
  const crlet = map.call(cr, c => <span className = "let" style = {{color: "#FA3264", fontFamily: "equinox"}}>{c}</span>)
  const inlet = map.call(ini, c => <span className = "let">{c}</span>)
  return(
    <div className = "hiBox">
      <h1 className="ml8">
        <span className="letters-container">
          <span className="letters letters-left" style = {{fontFamily: "madeEvolve"}}>Hi</span>
          <span className="letters bang">!</span>
        </span>
        <span className="circle circle-white"></span>
        <span className="circle circle-dark"></span>
        <span className="circle circle-container"><span className="circle circle-dark-dashed"></span></span>
        <span className="subtext"><span style = {{fontFamily: "madeEvolve"}}>{nclet}{crlet}{inlet}</span></span>
      </h1>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
    </div>
  )
}

export default Hi