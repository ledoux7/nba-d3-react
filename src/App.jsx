import React from 'react'
import Header from './Header'
import Main from './Main'

// import './css/ShotChart.css'
// /node_modules/react-grid-layout/css/styles.css
// /node_modules/react-resizable/css/styles.css


import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './css/global.css';
import './css/Axis.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
library.add(faCheck, faAngleUp, faAngleDown)


const App = () => (
  // <div className="App" style={{ background: '#57667B' }} >
  <div className="App"  >

    <Header />
    <Main />
  </div>
)

export default App
