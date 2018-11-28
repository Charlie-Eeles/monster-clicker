import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

const About = (props) => {

    


    return(
        <>
        <div className="right-section">
            <Link to='/'><button className="nav-button">Home</button></Link>
            <Link to='/other'><button className="underline nav-button">Info</button></Link>
            <h1>About this Project</h1>
            <p>This game is made with React by Charlie Eeles.</p><hr/>
            <p>Clicking on a monster will deal damage set by the weapon you're using, 
            defeating monsters will give you gold that you can use to upgrade your
            weapon and hire party members to fight for you.<br/> The special attack is 
            an AOE that kills 3 monsters at once but can't be used until you have at least
            a bow.<br/>Monsters are generated randomly and a boss will show up every 5 monsters.</p><hr/>
            <h2>Why?</h2>
            <p>I wanted to make something in React that wasn't just a website so 
             I decided to have a bit of fun with it.</p><hr/>
            <h2>Asset Credits</h2>
            <p>The monsters and weapons are assets from <a href="https://oldschool.runescape.com/">Old School Runescape</a> by <a href="https://www.jagex.com/">Jagex ltd.</a><br/>
             This project was inspired by <a href="http://orteil.dashnet.org/cookieclicker/">Cookie Clicker</a> by <a href="http://orteil.dashnet.org/">Orteil</a> and <a href="http://dashnet.org/">Opti</a>.
            </p>
        </div>
        </>
    );

}

export default About;