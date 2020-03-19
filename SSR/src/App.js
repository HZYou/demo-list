
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';
// hot 热更新
// export default hot(module)(() => (
//     <div className='App'>
//         <nav>
//             <Link to='/home'>Home</Link>
//             <Link to='/about'>About</Link>
//         </nav>
//         <Switch>
//             <Route path='/about' component={About} />
//             <Route path='/' component={Home} />
//         </Switch>

//     </div>
// ))

export default () => (
    <div className='App'>
        <nav>
            <Link to='/'>Home</Link>
             ｜
            <Link to='/about'>About</Link>
        </nav>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' exact component={About} />
        </Switch>

    </div>
)