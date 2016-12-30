'use babel'

const QuitControlMenuOptions = require('./quit-control-menu-options')
const SelectListView = require('atom-space-pen-views').SelectListView

export default class QuitControlAtomView extends SelectListView{

  constructor(state) {
    super()
    this.setItems(Object.keys(QuitControlMenuOptions).map(key => QuitControlMenuOptions[key]))
  }

  viewForItem(item) {
    "<li>#{item.label}</li>"
  }

  confirmed(item) {
    console.log("Selecionou: " + item)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

}
