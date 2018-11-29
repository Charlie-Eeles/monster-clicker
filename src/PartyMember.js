import React from 'react';
import partyImg from './partyImg.png';

const PartyMember = (props) => {
    
    
    return(
        <>
        <button onClick={props.partyMember} className="hirePartyClass"><img src={partyImg} className="weaponClass"></img><br/>hire a party member({props.party}): {props.partyCost}g</button>
        </>
    )


}




export default PartyMember;