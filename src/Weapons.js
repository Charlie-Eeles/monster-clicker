import React from 'react';

const Weapons = (props) => {
    
    
    return(
        <>
        
        <button onClick={props.buyWeapon} disabled={props.disabled} className="buyWeaponClass"><img src={props.weaponImg} className="weaponClass"></img><br/> Buy a {props.weaponName}: {props.weaponCost}g </button><br/>
        <button onClick={props.partyMember} className="hirePartyClass">hire a party member({props.party}): {props.partyCost}g</button>
        </>
    )


}




export default Weapons;