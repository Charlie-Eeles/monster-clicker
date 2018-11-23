import React from 'react';

const Weapons = (props) => {
    
    
    return(
        <>
        <img src={props.weaponImg} className="weaponClass"></img><br/>
        <button onClick={props.buyWeapon} disabled={props.disabled}>Buy a {props.weaponName}</button>
        </>
    )


}




export default Weapons;