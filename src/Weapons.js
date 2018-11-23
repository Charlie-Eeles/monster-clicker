import React from 'react';

const Weapons = (props) => {
    
    
    return(
        <>
        <img src={props.weaponImg} className="weaponClass"></img><br/>
        <button onClick={props.buyWeapon} disabled={props.disabled}>Buy a {props.weaponName}: {props.weaponCost}g</button>
        <button onClick={props.partyMember}>hire a party member({props.party}): {props.partyCost}g</button>
        </>
    )


}




export default Weapons;