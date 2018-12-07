import React from 'react';
import PartyMember from './PartyMember';
import Weapons from './Weapons';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Poison from './Poison';

const Shop = (props) => {

    
    return(
        <>
        <div className="right-section">
            <Link to={process.env.PUBLIC_URL + '/'}><button className="underline nav-button">Home</button></Link>
            <Link to='other'><button className="nav-button">Info</button></Link>
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
                <Poison
                    poisonWeapon={props.poisonWeapon}
                    poisonCheck={props.poisonCheck}
                />
            </div>
            <button onClick={() => {window.confirm("This will permanently delete your save data.\nAre you sure you want to reset everything? ") && props.reset()}}>reset</button>
            <p>{props.errorMessage}</p>
        </div>
        </>
    );

}

export default Shop;