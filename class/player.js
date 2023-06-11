const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    let gottenItem = this.currentRoom.getItemByName(itemName)
    this.items.push(gottenItem)

    this.currentRoom.items = this.removeFromArray(itemName, this.currentRoom.items)

    return gottenItem
  }

  dropItem(itemName) {
    let item = this.getItemByName(itemName)
    this.currentRoom.items.push(item)

    this.items = this.removeFromArray(itemName, this.items)
    return item
  }

  eatItem(itemName) {
    let gottenItem = this.getItemByName(itemName)
    if (gottenItem instanceof Food) {
      this.currentRoom.items = this.removeFromArray(itemName, this.currentRoom.items)
      this.items = this.removeFromArray(itemName, this.items)
      this.health += 10
    }
  }

  getItemByName(name) {
    let foundItem
    this.items.forEach(item => {
      if (item.name === name.toLowerCase()) {
        foundItem = item
      }
    })

    return foundItem
  }

  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name)
    if (enemy) {
      enemy.applyDamage(this.strength)
    }
    enemy.attackTarget = this
    // console.log(`${this.name} hit ${enemy.name} for ${this.strength} damage!`)
    // console.log(`${enemy.name} has ${enemy.health} health left!`)
    // console.log(`${this.name} has ${this.health} health left!`)
    enemy.act()
    return enemy.attackTarget
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}



module.exports = {
  Player,
};
