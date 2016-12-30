'use babel'

import QuitControlAtomView from './quit-control-atom-view'
import { CompositeDisposable } from 'atom'

const QuitControlMenuOptions = require('./quit-control-menu-options')

export default {

  quitControlAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.quitControlAtomView = new QuitControlAtomView(state.quitControlAtomViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.quitControlAtomView
      ,visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      "quit-control-atom:quit": () => this.quit(QuitControlMenuOptions.Quit)
      ,"quit-control-atom:closeWindow": () => this.closeWindow(QuitControlMenuOptions.CloseWindow)
      ,"quit-control-atom:closeEditor": () => this.closeEditor(QuitControlMenuOptions.CloseWindow)
    }))

  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.quitControlAtomView.destroy()
  },

  serialize() {
    return {
      quitControlAtomViewState: this.quitControlAtomView.serialize()
    }
  },

  quit(){
    this.modalPanel.isVisible() ?
    this.modalPanel.hide() :
    this.modalPanel.show()
  },

  closeWindow(){
    this.modalPanel.isVisible() ?
    this.modalPanel.hide() :
    this.modalPanel.show()
  },

  closeEditor(){
    this.modalPanel.isVisible() ?
    this.modalPanel.hide() :
    this.modalPanel.show()
  }

}
