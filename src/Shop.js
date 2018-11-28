import React from 'react';
import PartyMember from './PartyMember';
import Weapons from './Weapons';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
const Shop = (props) => {

    


    return(
        <>
        <div className="right-section">
            <Link to='/'><button className="underline nav-button">Home</button></Link>
            <Link to='/other'><button className="nav-button">Info</button></Link>
            <div className="shop-grid">
                <Weapons 
                    weaponName={props.weaponName}
                    buyWeapon={props.buyWeapon}
                    disabled={props.disabled}
                    weaponImg={props.weaponImg}
                    weaponCost={props.weaponCost}/>
                
                <PartyMember  
                    partyMember={props.partyMember}
                    partyCost={props.partyCost}
                    party={props.party}/>
            </div>
        </div>
        </>
    );

}

export default Shop;