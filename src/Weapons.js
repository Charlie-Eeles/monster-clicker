import React from 'react';
import PartyMember from './PartyMember';

const Weapons = (props) => {
    
    
    return(
        <>
        <button onClick={props.buyWeapon} disabled={props.disabled} className="buyWeaponClass"><img src={props.weaponImg} className="weaponClass"></img><br/> Buy a {props.weaponName}: {props.weaponCost}g </button>
        </>
    )


}




export default Weapons;