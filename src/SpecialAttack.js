import React from 'react';
const SpecialAttack = (props) => {
    
    
    return(
        <button onClick={props.specialAttack} disabled={props.specialAttackEnabler} className="hirePartyClass">special attack</button>
    )


}

export default SpecialAttack;
