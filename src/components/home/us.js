import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import '../../css/us.css'

const pages = [
  ({ style }) => <animated.div style={{ ...style }}>
    <div>
      <h5 style = {{fontFamily: "madeEvolve"}}>Problems</h5>
      We bring to you a set of curated problems to help you understand concepts and how to apply them. Each problem has been expressively hand-picked in order to touch a different and unique aspect of a particular concept.
    </div>
  </animated.div>,
  ({ style }) => <animated.div style={{ ...style }}>
    <div>
      <h5 style = {{fontFamily: "madeEvolve"}}>Contests</h5>
      Contests are an essential part of competitive programming. We bring to you a platform where you can participate and compete with your college-mates before stepping out into a world full of competition.<br />
      P.S. If you would like to host a contest as an individual problem setter or on behalf of your club, we will be providing support for that in near future.<br /><br />
      <i>Note: Organisers and problem setters for a contest won't be allowed to take part in that contest. They may make submissions but they won't be considered for the sake of the contest.</i>
    </div>
  </animated.div>,
  ({ style }) => <animated.div style={{ ...style }}>
    <div>
      <h5 style = {{fontFamily: "madeEvolve"}}>Academy</h5>
      Articles, editorials, blogs and other things of reference to give you a hand when stuck. NiTR Codes Academy(NCA) aims to be the full fledged peer-to-peer help portal you shall ever need.
    </div>
  </animated.div>,
]

export default function Us() {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  return (
    <div className="simple-trans-main" onClick={onClick}>
      <h4 style = {{fontFamily: "equinox"}}>What NiTR.codes is here for</h4>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
      <small>(Click here to unfold further)</small>
    </div>
  )
}