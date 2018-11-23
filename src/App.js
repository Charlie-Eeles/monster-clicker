import React, { Component } from 'react';
import Monster from './Monster';
import Gold from './Gold';
import Weapons from './Weapons';
import './App.css';
import goblin from './goblin.png';
import troll from './troll.png';
import sword from './sword.png';
import bow from './bow.png';
import hammer from './hammer.png';

class App extends Component {
  state = {
    selector: 0,
    weaponDamage: 2,
    health: 20,
    monsterCount: 0,
    goldCounter: 0,
    weaponTier:0,
    disabled: false,
    specialAttack: false,
    party: 0,
    partyCost: 5000
    }

   render() {

    const monsters = [
      {name: "goblin",
      key: 0,
      maxHealth:20,
      img: goblin,
      goldReward: 750},

      {name:"troll", 
      key: 1,
      maxHealth:30,
      img: troll,
      goldReward:1000}];

      const arsenal = [
        {weaponName: "Sword",
        img: sword, 
        damage: 3,
        price: 500},
        {weaponName: "Bow",
        img:bow,
        damage: 4,
        price: 10000},
        {weaponName: "Hammer",
        img:hammer,
        damage: 5,
        price: 20000}
      ]


      const setHealth = () => {
        this.setState({
          health: monsters[this.state.selector].maxHealth 
          })
      };

      const dealDamage = () => {
        this.setState({
          health: this.state.health - this.state.weaponDamage
        })
      };

      const randomEncounter = () => {
        const randomMonster = Math.floor(Math.random() * Math.floor(2));
        this.setState({
          selector: randomMonster
        })
      };

      const monsterDefeated = () => {
        this.setState({
          monsterCount: this.state.monsterCount + 1
        })
      };

      const addGold = () => {
        this.setState({
          goldCounter: this.state.goldCounter + monsters[this.state.selector].goldReward
        })
      }

      const spawnMonster = () => {
        if (this.state.health <= this.state.weaponDamage){
            addGold();
            randomEncounter();
            setHealth();
            monsterDefeated();
        }else{
            dealDamage();
        }
       } 

      const buyWeapon = () => {
        if (this.state.goldCounter >= arsenal[this.state.weaponTier].price){
          this.setState({
            weaponDamage: arsenal[this.state.weaponTier].damage,
            goldCounter: this.state.goldCounter - arsenal[this.state.weaponTier].price
          })
            if (this.state.weaponTier < arsenal.length-1){
              this.setState({
                weaponTier: this.state.weaponTier + 1
             })
          }else{
              this.setState({
                disabled: true
              })
          }}else{console.log("you don't have enough mulah")}
        }
      
      const partyCount = () => {
        if (this.state.health <= this.state.party){
          addGold();
          randomEncounter();
          setHealth();
          monsterDefeated();
        }else{
        this.setState({
          health: this.state.health - this.state.party 
        })}
        
      }

      const partyMember = () => {
        if (this.state.goldCounter >= this.state.partyCost){
          if(this.state.party === 0){setInterval(partyCount, 3000)}
          this.setState({
            goldCounter: this.state.goldCounter - this.state.partyCost,
            party: this.state.party +1,
            partyCost: Math.ceil(this.state.partyCost * 1.5)
          })}else(console.log("you dont have enough monayy"));
      }
      
      const enableSpecialAttack = () => {
        this.setState({specialAttack:false})
      }

      const specialAttack = () => {
        if (arsenal[this.state.weaponTier].damage >=4){
        this.setState({
          specialAttack: true,
          health: this.state.health - this.state.health
        })
          addGold();
          randomEncounter();
          monsterDefeated();
          setTimeout(setHealth, 0.0001);
          setTimeout(enableSpecialAttack, 10000)
        }else{console.log("your weapon has no special attack")}
      }

      return (
        <>
        <div className="mainContainer">
        <div className="leftContainer">
        <Monster monsters={monsters}
                 health={this.state.health} 
                 selector={this.state.selector}
                 monsterCount={this.state.monsterCount}
                 spawnMonster={spawnMonster}
                 />
        <Gold goldCounter={this.state.goldCounter}/>
        </div>
        <div className="rightContainer">
        
        <Weapons weaponName={arsenal[this.state.weaponTier].weaponName}
                 buyWeapon={buyWeapon}
                 disabled={this.state.disabled}
                 weaponImg={arsenal[this.state.weaponTier].img}
                 partyMember={partyMember}
                 partyCost={this.state.partyCost}
                 weaponCost={arsenal[this.state.weaponTier].price}
                 party={this.state.party}
                 specialAttack={specialAttack}
                 specialAttackEnabler={this.state.specialAttack}
                 
        />
        </div>
        </div>
        </>
      );

}}

export default App;
