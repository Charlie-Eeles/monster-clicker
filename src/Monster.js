import React from 'react';

const Monster = (props) => {

    const spawnMonster = () => {
        if (props.health <= props.weapon){
            props.randomEncounter();
            props.setHealth();
            props.monsterDefeated();
        }else{
            props.dealDamage();
        }
    }


    return(
        <>
        <input type="image" src={props.monsters[props.selector].img} onClick={spawnMonster} className="monsterClass"></input>
        <p>health: {props.health}</p>
        <p>monsters defeated: {props.monsterCount}</p>
        </>
    );

}

export default Monster;