// switch button for dark and light mode
import React, { useEffect, useState } from 'react'

function SwitchMode() {
    
    // detect theme
    function toggleBtn(){
        if(document.querySelector("#toggleCheckbox").checked){
            localStorage.setItem("theme" , "dark")
            document.body.classList.remove("light-mode")
            document.body.classList.add("dark-mode")
        } else {
            localStorage.setItem("theme" , "light")
            document.body.classList.remove("dark-mode")
            document.body.classList.add("light-mode")
        }
    }

    function detectLocalStorage(){
        var currentTheme = localStorage.getItem("theme")
        if(currentTheme){
            if (currentTheme === "dark"){
                document.body.classList.remove("light-mode")
                document.body.classList.add("dark-mode")
                document.querySelector("#toggleCheckbox").checked = true

            } else if (currentTheme === "light"){
                document.body.classList.remove("dark-mode")
                document.body.classList.add("light-mode")
                document.querySelector("#toggleCheckbox").checked = false
            }
        } else {
            if(window.matchMedia("(prefers-color-scheme: dark)").matches){
                document.querySelector("#toggleCheckbox").checked = true
                document.body.classList.remove("light-mode")
                document.body.classList.add("dark-mode")
            } else {
                document.querySelector("#toggleCheckbox").checked = false
                document.body.classList.remove("dark-mode")
                document.body.classList.add("light-mode")
            }
        }
    }

    useEffect(() => {
        // on click switch theme
        detectLocalStorage()

        // listen if system switches dark/light mode
        const mqListener = (e => {
            detectLocalStorage()
        });
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
        darkThemeMq.addListener(mqListener)
        return () => darkThemeMq.removeListener(mqListener)
    })

    return (
        <div className="switch-wrapper">
            <label className="switch">
                <input type="checkbox" id="toggleCheckbox" onClick={toggleBtn}/>
                <span className="slider round">
                    <div className="moon"></div>
                    <div className="sun"></div>
                </span>
            </label>
        </div>
    )
}

export default SwitchMode
