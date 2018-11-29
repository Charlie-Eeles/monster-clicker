import React from 'react';
import poisonVial from './poisonVial.png';
const Poison = (props) => {

    


    return(
        <>
        <button onClick={props.poisonWeapon} disabled={props.poisonCheck} ><img src={poisonVial} className="weaponClass"></img><br/>Poison your weapon: 75,000g</button>
        </>
    );

}

export default Poison;