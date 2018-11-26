import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import Gold from './Gold';
import Weapons from './Weapons';
import MonstersDefeated from './MonstersDefeated';
import Health from './Health';
import PartyMember from './PartyMember';
import SpecialAttack from './SpecialAttack';
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

    // Primary State Changing Functions (Directly updates 1 state)//


    const setHealth = () => {
      this.setState((prevState) => ({
        health: monsters[prevState.selector].maxHealth 
        }))
    };

    const dealDamage = () => {
      this.setState((prevState) => ({
        health: prevState.health - prevState.weaponDamage
      }))
    };

    const randomEncounter = () => {
      const randomMonster = Math.floor(Math.random() * Math.floor(2));
      this.setState({
        selector: randomMonster
      })
    };

    const monsterDefeated = () => {
      this.setState((prevState) => ({
        monsterCount: prevState.monsterCount + 1
      }))
    };

    const addGold = () => {
      this.setState((prevState) => ({
        goldCounter: prevState.goldCounter + monsters[prevState.selector].goldReward
      }))
    }

    const enableSpecialAttack = () => {
      this.setState({
        specialAttack:false
      })
    }
    

    // Secondary State Changing Functions (Directly updates more than 1 state) //


    const buyWeapon = () => {
      if (this.state.goldCounter >= arsenal[this.state.weaponTier].price){
        this.setState((prevState) => ({
          weaponDamage: arsenal[prevState.weaponTier].damage,
          goldCounter: prevState.goldCounter - arsenal[prevState.weaponTier].price
        }))
          if (this.state.weaponTier < arsenal.length-1){
            this.setState((prevState) => ({
              weaponTier: prevState.weaponTier + 1
            }))
        }else{
            this.setState({
              disabled: true
            })
        }}else{console.log("you don't have enough mulah")}
      }


    const partyMember = () => {
      if (this.state.goldCounter >= this.state.partyCost){
        if(this.state.party === 0){setInterval(partyCount, 3000)}
        this.setState((prevState) => ({
          goldCounter: prevState.goldCounter - prevState.partyCost,
          party: prevState.party +1,
          partyCost: Math.ceil(prevState.partyCost * 1.5)
        }))}else(console.log("you dont have enough monayy"));
    }  


    const partyCount = () => {
      if (this.state.health <= this.state.party){
        defeatAndSpawn();
      }else{
      this.setState((prevState) => ({
        health: prevState.health - prevState.party 
      }))}
      
    }


    const specialAttack = () => {
      if (arsenal[this.state.weaponTier].damage >4){
      this.setState((prevState) => ({
        specialAttack: true,
        health: prevState.health - prevState.health
      }))
        defeatAndSpawn();
        defeatAndSpawn();
        defeatAndSpawn();
        setTimeout(enableSpecialAttack, 10000)
      }else{console.log("your weapon has no special attack")}
    }
    

    // Tertiary State Changing Functions (Does not use setState method) //


    const defeatAndSpawn = () => {
      addGold();
      randomEncounter();
      setHealth();
      monsterDefeated();
    }  

    const spawnMonster = () => {
      if (this.state.health <= this.state.weaponDamage){
        defeatAndSpawn();
      }else{
          dealDamage();
      }
      } 


    return (
      <>
      <div className="main-flex-container">
        <div className="monster-display">
          <Monster 
            monsters={monsters}
            selector={this.state.selector}
            spawnMonster={spawnMonster}/>
          <div className="stat-box">
            <SpecialAttack 
              specialAttack={specialAttack}
              specialAttackEnabler={this.state.specialAttack}/>
            <Health 
              health={this.state.health}/>
            <MonstersDefeated 
              monsterCount={this.state.monsterCount}/>
            <Gold 
              goldCounter={this.state.goldCounter}/>
          </div>
        </div>
        <div className="shop-grid">
          <Weapons 
            weaponName={arsenal[this.state.weaponTier].weaponName}
            buyWeapon={buyWeapon}
            disabled={this.state.disabled}
            weaponImg={arsenal[this.state.weaponTier].img}
            weaponCost={arsenal[this.state.weaponTier].price}/>
          
          <PartyMember  
            partyMember={partyMember}
            partyCost={this.state.partyCost}
            party={this.state.party}/>
        </div>
      </div>
      </>
    );

}}

export default App;
