'use babel'

const QuitControlMenuOptions = require('./quit-control-menu-options')
const asFocusedOption = option => Object.assign({}, option, {
    description: "prevented"
    ,detail: "Press Enter to confirm"
})

const quitFocusedOptions = [
    asFocusedOption(QuitControlMenuOptions.Quit)
    ,QuitControlMenuOptions.CloseWindow
    ,QuitControlMenuOptions.Cancel
]

const closeWindowFocusedOptions = [
    asFocusedOption(QuitControlMenuOptions.CloseWindow)
    ,QuitControlMenuOptions.Quit
    ,QuitControlMenuOptions.Cancel
]

let modalPanel

const SelectListView = require('atom-space-pen-views').SelectListView

export default class QuitControlAtomView extends SelectListView{

  constructor(state) {
    super()
    modalPanel = atom.workspace.addModalPanel({
      item: this
      ,visible: false
    })
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
    modalPanel.hide()
  }

  confirmed(item) {
    this.cancel()
    atom.commands.dispatch(atom.views.getView(atom.workspace), item.command)
  }

  showFocusingQuit() {
    this.show(quitFocusedOptions)
  }

  showFocusingCloseWindow() {
    this.show(closeWindowFocusedOptions)
  }

  show(options){
    this.setItems(options)
    this.storeFocusedElement()
    modalPanel.show()
    this.focusFilterEditor()
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

}
