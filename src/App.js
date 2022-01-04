import React, { useState, useEffect } from "react"
import { Router, Redirect } from "@reach/router"
import { AnimateSharedLayout } from "framer-motion"
import { store } from "state-pool"
import { ThemeProvider } from "@material-ui/core/styles"

import About from "./containers/About"
import Menu from "./containers/Menu"
import theme from "./components/AppTheme"
import Welcome from "./containers/Welcome"
import Order from "./containers/Order"

store.setState("loaded", false);
store.setState("language", 2);
store.setState("addAnimation", false)

function App() {
  const [screen, setScreen] = useState(null)
  
  if(window.sessionStorage.getItem('Products') == null){
    var products = [];
    window.sessionStorage.setItem('Products', JSON.stringify(products));
  }

  useEffect(() => {
    setScreen(1)
  }, [])

  function handleChangeWelcome(value) {
    if (value === true) {
      setScreen(2)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AnimateSharedLayout>
        {screen === 1 && <Welcome onChange={handleChangeWelcome} />}
        {screen === 2 && (
          <Router>
            <Redirect from="/" to="/menu" default noThrow />
            <Menu path="/menu" />
            <About path="/about" />
            <Order path="/order"/>
          </Router>
        )}
      </AnimateSharedLayout>
    </ThemeProvider>
  )
}

export default App
