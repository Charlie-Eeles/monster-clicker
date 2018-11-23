import React from 'react';

const Weapons = (props) => {
    
    
    return(
        <button onClick={props.buyWeapon} disabled={props.disabled}>Buy a {props.weaponName}</button>
    )


}




export default Weapons;