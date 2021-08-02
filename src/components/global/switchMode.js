// switch button for dark and light mode
import React, { useEffect } from 'react'

// import css
import "@sass/components/switch-button.scss"

function SwitchMode() {

    function toggleBtn() {
        if (document.body.classList.contains("light-theme")) {
            enableDarkMode()
            localStorage.setItem("theme", "dark")
        } else {
            enableLightMode()
            localStorage.setItem("theme", "light")
        }
    }

    function enableDarkMode() {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }

    function enableLightMode() {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    }

    function setThemePreference() {
        var currentTheme = localStorage.getItem("theme")
        if (currentTheme) {
            if (currentTheme === "dark") {
                document.body.classList.remove("light-theme")
                document.body.classList.add("dark-theme")
            } else if (currentTheme === "light") {
                document.body.classList.remove("dark-theme")
                document.body.classList.add("light-theme")
            }
        } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                enableDarkMode();
                return;
            }
            enableLightMode();
        }
    }

    useEffect(() => {
        setThemePreference();
    })

    return (
        <div className="switch-wrapper">
            <button id="theme-toggle" onClick={toggleBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 472.39 472.39">
                    <g class="toggle-sun">
                        <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                    </g>
                    <g class="toggle-circle">
                        <circle class="cls-1" cx="236.2" cy="236.2" r="103.78" />
                    </g>
                </svg>
            </button>
        </div>
    )
}

export default SwitchMode
