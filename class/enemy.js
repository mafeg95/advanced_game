const {Character} = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom, cooldown = 3000) {
    super(name, description, currentRoom)
    this.health = 100
    this.strength = 10
    this.items = []
    this.cooldown = cooldown
    this.attackTarget = null
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    var possibleIdx = Object.keys(this.currentRoom.exits)
    var moveTo = Math.floor(Math.random() * possibleIdx.length)
    var direction = possibleIdx[moveTo]
    this.currentRoom = this.currentRoom.exits[direction]
    this.cooldown += 1000
    return this.currentRoom
  }

  takeSandwich() {
    let sandwich = this.currentRoom.getItemByName('sandwich')
    this.items.push(sandwich)
    this.currentRoom.items = this.removeFromArray('sandwich', this.currentRoom.items)
    this.health += 10
    this.cooldown += 1000
    return sandwich
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    // const resetCooldown = function() {
    //   this.cooldown -= 1000;
    //   this.act();
    // };
    console.log(`${this.name} is resting`)
    console.log(`${this.name} has ${this.cooldown} cooldown`)
    setTimeout(() => {
      this.cooldown -= 1000;
      this.act()
    }, this.cooldown);
  }

  attack() {
    console.log(`${this.name} attacks ${this.attackTarget.name}`)
    console.log(`${this.player.name} has ${this.player.health} health`)
    if (this.player === this.attackTarget) {
      this.player.applyDamage(this.strength)
    }
    this.cooldown += 1000
    this.attackTarget = null
    return this.attackTarget
  }

  applyDamage(amount) {
    this.health -= amount
    if (this.health === 0){
      this.die()
    }
    return this.health
  }



  act() {
    console.log(`${this.name} is acting`)
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      if (this.currentRoom.items.length > 0) {
        this.takeSandwich()
      } else if (this.player.currentRoom !== this.currentRoom) {
        this.randomMove()
      } if (this.player.currentRoom === this.currentRoom) {
        if (this.attackTarget === this.player){
          this.attack()
        }
        this.alert(`${this.name} is in ${this.currentRoom.name}`)
      }
      this.rest();
    }
    
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }
}

module.exports = {
  Enemy,
};
