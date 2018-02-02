'use babel'

import QuitControlAtomView from './quit-control-atom-view'
import { CompositeDisposable } from 'atom'

const QuitControlMenuOptions = require('./quit-control-menu-options')

export default {

  quitControlAtomView: null,
  subscriptions: null,

  activate(state) {
    this.quitControlAtomView = new QuitControlAtomView(state.quitControlAtomViewState)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      "quit-control-atom:quit": () => this.quit()
      ,"quit-control-atom:closeWindow": () => this.closeWindow()
      ,"quit-control-atom:closeEditor": () => this.closeEditor()
    }))

  },

  deactivate() {
    this.subscriptions.dispose()
    this.quitControlAtomView.destroy()
  },

  serialize() {
    return {
      quitControlAtomViewState: this.quitControlAtomView.serialize()
    }
  },

  toggleMenu(option){
    this.quitControlAtomView.show(option)
  },

  quit(){
    this.toggleMenu(QuitControlMenuOptions.Quit)
  },

  closeWindow(){
    atom.commands.dispatch(atom.views.getView(atom.workspace), "tabs:close-all-tabs")
    this.toggleMenu(QuitControlMenuOptions.CloseWindow)
  },

  closeEditor(){
    let noTabsOpen = atom.workspace.getPaneItems().length === 1
    if(noTabsOpen){
      this.toggleMenu(QuitControlMenuOptions.CloseWindow)
    } else {
      atom.commands.dispatch(atom.views.getView(atom.workspace), "core:close")
    }
  }

}
