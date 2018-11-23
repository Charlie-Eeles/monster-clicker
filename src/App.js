import React, { Component } from 'react';
import Monster from './Monster';
import Gold from './Gold';
import Weapons from './Weapons';
import './App.css';
import goblin from './goblin.png';
import troll from './troll.png';



class App extends Component {
  state = {
    selector: 0,
    weaponDamage: 2,
    health: 10,
    monsterCount: 0,
    goldCounter: 0,
    weaponTier:0,
    disabled: false
    }

   render() {

    const monsters = [
      {name: "goblin",
      key: 0,
      maxHealth:10,
      img: goblin,
      goldReward: 500},

      {name:"troll", 
      key: 1,
      maxHealth:15,
      img: troll,
      goldReward:1000}];

      const arsenal = [
        {weaponName: "Sword",
         damage: 3,
         price: 500},
        {weaponName: "Bow",
         damage: 4,
         price: 2000},
        {weaponName: "Hammer",
         damage: 5,
         price: 5000}
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
      

      return (
        <>
        <Monster monsters={monsters}
                 health={this.state.health} 
                 selector={this.state.selector}
                 monsterCount={this.state.monsterCount}
                 spawnMonster={spawnMonster}
                 />
        <Gold goldCounter={this.state.goldCounter}
              
        />
        <Weapons weaponName={arsenal[this.state.weaponTier].weaponName}
                 buyWeapon={buyWeapon}
                 disabled={this.state.disabled}
        />
        
        </>
      );

}}

export default App;
