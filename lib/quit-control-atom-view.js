'use babel'

const QuitControlMenuOptions = require('./quit-control-menu-options')
const SelectListView = require('atom-space-pen-views').SelectListView

export default class QuitControlAtomView extends SelectListView{

  constructor(state) {
    super()
  }

  viewForItem(item) {
    return `
    <li>
      ${item.label}
      <span class="quitControlMenu-description">${item.description}</span>
      <div class="quitControlMenu-detail" style="display: ${item.detail ? 'block' : 'none'}">${item.detail}</div>
    </li>
    `
  }

  getFilterKey(){
    return "label"
  }

  cancelled(){
    this.modalPanel.destroy()
  }

  confirmed(item) {
    this.cancel()
    atom.commands.dispatch(atom.views.getView(atom.workspace), item.command)
  }

  show(option){
    let cmds = atom.commands
      .findCommands({target: atom.views.getView(atom.workspace)})
      .map(cmd => cmd.name)
      .filter(cmdName => /close/.test(cmdName))
    debugger
    this.modalPanel = atom.workspace.addModalPanel({
      item: this
      ,visible: false
    })

    const orderedOptions = Object
      .keys(QuitControlMenuOptions)
      .map(key => Object.assign({}, QuitControlMenuOptions[key]))
      .sort((optionA, optionB) => {
          if(optionA.label == option.label){
              optionA.description = "prevented"
              optionA.detail = "Select this item to confirm"
              return -1
          } else if(optionB.label == option.label){
              optionB.description = "prevented"
              optionB.detail = "Select this item to confirm"
              return 1
          }else if(optionB.label == QuitControlMenuOptions.Cancel.label) {
              return -1
          }else {
              return 1
          }
      })

    this.setItems(orderedOptions)
    this.storeFocusedElement()
    this.modalPanel.show()
    this.focusFilterEditor()
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

}
