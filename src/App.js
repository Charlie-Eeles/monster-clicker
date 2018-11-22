import React, { Component } from 'react';
import Monster from './Monster';
import Gold from './Gold';
import './App.css';
import goblin from './goblin.png';
import troll from './troll.png';



class App extends Component {
  state = {
    selector: 0,
    weapon: 2,
    health: 10,
    monsterCount: 0,
    goldCounter: 0
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

      const setHealth = () => {
        this.setState({
          health: monsters[this.state.selector].maxHealth 
          })
      };

      const dealDamage = () => {
        this.setState({
          health: this.state.health - this.state.weapon
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
        if (this.state.health <= this.state.weapon){
            addGold();
            randomEncounter();
            setHealth();
            monsterDefeated();
        }else{
            dealDamage();
        }
    } 


      return (
        <>
        <Monster monsters={monsters}
                 setHealth={setHealth}
                 health={this.state.health} 
                 selector={this.state.selector} 
                 randomEncounter={randomEncounter} 
                 weapon={this.state.weapon} 
                 dealDamage={dealDamage} 
                 monsterCount={this.state.monsterCount}
                 monsterDefeated={monsterDefeated}
                 spawnMonster={spawnMonster}
                 />
        <Gold goldCounter={this.state.goldCounter}/>
        </>
      );

}}

export default App;
