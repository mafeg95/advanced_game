class Character {

  constructor(name, description, currentRoom, items) {
    this.name = name
    this.description = description
    this.currentRoom = currentRoom
    this.items = items ? items : []
    this.health = 100
    this.strength = 10
    
  }

  applyDamage(amount) {
    this.health -= amount
    if (this.health === 0){
      this.die()
    }
    return this.health
  }

  removeFromArray(itemName, array) {
    const sameName = (item) => item.name === itemName.toLowerCase()
    let idx = array.findIndex(sameName)
    return array.slice(0, idx).concat(array.slice(idx, -1))
  }

  die() {
    this.currentRoom.items = this.currentRoom.items.concat(this.items)
    this.items = []
    this.currentRoom = null
  }

}

module.exports = {
  Character,
};
