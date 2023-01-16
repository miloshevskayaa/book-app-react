import React, { useState, useEffect } from "react";
import './scroll.css';

function Scroll(){
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => { 
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
      });
    }, [])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
      };

    return(
        <div>
        {showTopBtn && (
          <button className="scroll" onClick={goToTop}>up</button>
        )}{" "}
        </div>
    )

}
export default Scroll