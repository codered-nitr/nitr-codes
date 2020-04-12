import React from 'react'
import '../../css/home.css'
import Footer from '../footer'
import anime from 'animejs/lib/anime.es.js';
import '../../css/hi.css'
import Hi from './anime-index'
const Home = () => {
  return(
    <div>
    <div className = "homeBase">
      <Hi />
    </div>
    <Footer />
    </div>
  )
}

export default Home