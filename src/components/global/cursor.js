import React, { useEffect } from "react"

import { gsap } from 'gsap'


import "@sass/components/cursor.scss"

export default function Cursor() {
    useEffect(() => {
      const $bigBall = document.querySelector('.cursor__ball--big');
      const $hoverables = document.querySelectorAll('.hoverable');
      
      // Listeners
      document.body.addEventListener('mousemove', onMouseMove);
      for (let i = 0; i < $hoverables.length; i++) {
        $hoverables[i].addEventListener('mouseenter', onMouseHover);
        $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
      }
      
      // Move the cursor
      function onMouseMove(e) {
        gsap.to($bigBall, .01, {
          x: e.pageX - 5,
          y: e.pageY - 7
        })
      }
      
      // Hover an element
      function onMouseHover() {
        gsap.to($bigBall, .3, {
          scale: 12,
          autoAlpha: 0.4
        })
      }
      function onMouseHoverOut() {
        gsap.to($bigBall, .3, {
          scale: 1,
          autoAlpha: 1
        })
      }
    })

    return (
      <div className="cursor">
        <div className="cursor__ball cursor__ball--big ">
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
          </svg>
        </div>
        
        {/* <div className="cursor__ball cursor__ball--small">
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
          </svg>
        </div> */}
      </div>
    );
}
