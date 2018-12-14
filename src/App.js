import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import Gold from './Gold';
import MonstersDefeated from './MonstersDefeated';
import Health from './Health';
import SpecialAttack from './SpecialAttack';
import Shop from './Shop';
import About from './About';
import goblin from './goblin.png';
import troll from './troll.png';
import demon from './demon.png';
import general from './general.png';
import hillGiant from './hillGiant.png';
import iceGiant from './iceGiant.png';
import skeleton from './skeleton.png';
import sword from './sword.png';
import bow from './bow.png';
import hammer from './hammer.png';
import battleAxe from './battleAxe.png';
import scimitar from './scimitar.png';
import greatAxe from './greatAxe.png';
import godSword from './godSword.png';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';



class App extends Component {
  state = {
    selector:parseInt(localStorage.getItem("selector")) || 0,
    weaponDamage: parseInt(localStorage.getItem("weaponDamage")) || 2,
    health: parseInt(localStorage.getItem("health")) || 20,
    monsterCount: parseInt(localStorage.getItem("monsterCount")) || 0,
    goldCounter: parseInt(localStorage.getItem("goldCounter")) || 0,
    weaponTier: parseInt(localStorage.getItem("weaponTier")) || 0,
    disabled: localStorage.getItem("disabled") || false,
    specialAttack: false,
    party: parseInt(localStorage.getItem("party")) || 0,
    partyCost: parseInt(localStorage.getItem("partyCost")) || 5000,
    partyCheck: false,
    poisonCheck: localStorage.getItem("poisonCheck") || false,
    errorMessage: ""
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
      goldReward:1000},
    
      {name:"skeleton", 
      key: 2,
      maxHealth:40,
      img: skeleton,
      goldReward:1500},
    
      {name:"hillGiant", 
      key: 3,
      maxHealth:50,
      img: hillGiant,
      goldReward:2000},
    
      {name:"iceGiant", 
      key: 4,
      maxHealth:60,
      img: iceGiant,
      goldReward:3000},
    
      {name:"demon", 
      key: 5,
      maxHealth:80,
      img: demon,
      goldReward:5000},
    
      {name:"general", 
      key: 6,
      maxHealth:100,
      img: general,
      goldReward:10000}];

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
      price: 20000},

      {weaponName: "Scimitar",
      img: scimitar, 
      damage: 6,
      price: 40000},

      {weaponName: "BattleAxe",
      img:battleAxe,
      damage: 7,
      price: 80000},

      {weaponName: "Great Axe",
      img: greatAxe, 
      damage: 10,
      price: 150000},

      {weaponName: "God Sword",
      img:godSword,
      damage: 15,
      price: 300000},
      
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
      let randomMonster = Math.floor(Math.random() * Math.floor(4));
      if ((this.state.monsterCount+1)%5 === 0 && this.state.monsterCount !== 0){
        randomMonster += 3;
      }
      this.setState({
        selector: randomMonster
      })
      localStorage.setItem("selector", randomMonster);
      localStorage.setItem("health", monsters[randomMonster].maxHealth);
    };

    const monsterDefeated = () => {
      this.setState((prevState) => ({
        monsterCount: prevState.monsterCount + 1
      }))
      localStorage.setItem("monsterCount", this.state.monsterCount +1);
    };

    const addGold = () => {
      this.setState((prevState) => ({
        goldCounter: prevState.goldCounter + monsters[prevState.selector].goldReward
      }))
      localStorage.setItem("goldCounter", this.state.goldCounter + monsters[this.state.selector].goldReward);
    }

    const enableSpecialAttack = () => {
      this.setState({
        specialAttack:false
      })
    }
    
    const PoisonDamage = () => {
      if (this.state.health <= 1){
        defeatAndSpawn();
      }else{
      this.setState((prevState) => ({
        health: prevState.health - 1
      }))}
    }

    const clearError = () => {
      this.setState({
        errorMessage: ""
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
            localStorage.setItem("weaponTier", this.state.weaponTier +1);
            localStorage.setItem("weaponDamage", arsenal[this.state.weaponTier].damage);
            localStorage.setItem("goldCounter", this.state.goldCounter - arsenal[this.state.weaponTier].price);
        }else{
            this.setState({
              disabled: true
            })
            localStorage.setItem("weaponDamage", arsenal[this.state.weaponTier].damage);
            localStorage.setItem("goldCounter", this.state.goldCounter - arsenal[this.state.weaponTier].price);
            localStorage.setItem("disabled", true);
        }}else{
          this.setState({
            errorMessage: "You can't afford that."
          })
          setTimeout(clearError, 5000)
        }
      }

      
    const partyMember = () => {
      if (this.state.goldCounter >= this.state.partyCost){
        if(this.state.party === 0 && this.state.partyCheck == false){
          this.setState({partyCheck: true})
          setInterval(partyCount, 3000)}
        this.setState((prevState) => ({
          goldCounter: prevState.goldCounter - prevState.partyCost,
          party: prevState.party +1,
          partyCost: Math.ceil(prevState.partyCost * 1.3)
        }))
        localStorage.setItem("goldCounter", this.state.goldCounter - this.state.partyCost);
        localStorage.setItem("party", this.state.party +1);
        localStorage.setItem("partyCost", Math.ceil((this.state.partyCost) * 1.5));
        }else{this.setState({
          errorMessage: "You can't afford their price."
        })
        setTimeout(clearError, 5000)};
    }  

    const partyStart = () => {if(this.state.party > 0 && this.state.partyCheck == false){
      this.setState({partyCheck: true})
      setInterval(partyCount, 3000)}}
    


    const partyCount = () => {
      if (this.state.health <= this.state.party){
        defeatAndSpawn();
      }else{
      this.setState((prevState) => ({
        health: prevState.health - prevState.party 
      }))}
      
    }

    const specialAttack = () => {
      if (arsenal[this.state.weaponTier].damage >5){
      this.setState((prevState) => ({
        specialAttack: true,
        health: prevState.health - prevState.health
      }))
        defeatAndSpawn();
        defeatAndSpawn();
        defeatAndSpawn();
        setTimeout(enableSpecialAttack, 10000)
      }else{this.setState({
        errorMessage: "Your weapon has no special attack."
      })
      setTimeout(clearError, 5000)}
    }
    
    const reset = () => {
      this.setState({
        selector:0,
        weaponDamage:2,
        health:20,
        monsterCount:0,
        goldCounter:0,
        weaponTier:0,
        disabled:false,
        specialAttack: false,
        party:0,
        partyCost:5000,
        partyCheck: false,
        poisonCheck: false
      })
      localStorage.removeItem("selector");
      localStorage.removeItem("weaponDamage");
      localStorage.removeItem("health");
      localStorage.removeItem("monsterCount");
      localStorage.removeItem("goldCounter");
      localStorage.removeItem("weaponTier");
      localStorage.removeItem("disabled");
      localStorage.removeItem("party");
      localStorage.removeItem("partyCost");
      localStorage.removeItem("poisonCheck");
    }

    const poisonWeapon = () => {
      if(this.state.goldCounter >= 50000 && this.state.poisonCheck == false){
        this.setState((prevState) => ({
          goldCounter: prevState.goldCounter - 50000,
          poisonCheck: true
        }))
        localStorage.setItem("goldCounter", this.state.goldCounter - 50000);
        localStorage.setItem("poisonCheck", true);
      }else{this.setState({
        errorMessage: "Poison doesn't come cheap."
      })
      setTimeout(clearError, 4000)}
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
          if(this.state.poisonCheck == "true"){
            setTimeout(() => {
              PoisonDamage();
              setTimeout(() => {
                PoisonDamage();
                setTimeout(() => {
                  PoisonDamage();
                }, 1500);
              }, 1500);
            }, 1500);
          } 
      }
      } 

    const shopWithProps = () => {
      return (
        <Shop 
          weaponName={arsenal[this.state.weaponTier].weaponName}
            buyWeapon={buyWeapon}
            disabled={this.state.disabled}
            weaponImg={arsenal[this.state.weaponTier].img}
            weaponCost={arsenal[this.state.weaponTier].price}
            partyMember={partyMember}
            partyCost={this.state.partyCost}
            party={this.state.party}
            reset={reset}
            poisonWeapon={poisonWeapon}
            poisonCheck={this.state.poisonCheck}
            errorMessage={this.state.errorMessage}
        />
      );
    }

    
    
    const aboutPage = () => {
      return (
        <About/>
      )
    }

    
    return (
      <Router>
      <div className="main-flex-container">
      {partyStart()}
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
        <Route exact path={process.env.PUBLIC_URL + '/'} component={shopWithProps}/>
        <Route path={process.env.PUBLIC_URL + '/other'} component={aboutPage}/>
        </div>
      </Router>
    );
  
    
}

}


export default App;
