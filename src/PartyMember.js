import React from 'react';

const PartyMember = (props) => {
    
    
    return(
        <>
        <button onClick={props.partyMember} className="hirePartyClass">hire a party member({props.party}): {props.partyCost}g</button>
        </>
    )


}




export default PartyMember;