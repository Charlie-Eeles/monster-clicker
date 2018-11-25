import React from 'react';

const Monster = (props) => {

    


    return(
        <>
        <input type="image" src={props.monsters[props.selector].img} onClick={props.spawnMonster} className="monsterClass"></input>
        <p>health: {props.health}</p>
        </>
    );

}

export default Monster;