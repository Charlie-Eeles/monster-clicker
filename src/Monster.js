import React from 'react';

const Monster = (props) => {

    


    return(
        <>
        <input type="image" src={props.monsters[props.selector].img} onClick={props.spawnMonster} className="monsterClass"></input>
        <p>health: {props.health}</p>
        <p>monsters defeated: {props.monsterCount}</p>
        </>
    );

}

export default Monster;