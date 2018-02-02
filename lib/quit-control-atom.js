'use babel'

import QuitControlAtomView from './quit-control-atom-view'
import { CompositeDisposable } from 'atom'

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

  quit(){
    this.quitControlAtomView.showFocusingQuit()
  },

  closeWindow(){
    this.quitControlAtomView.showFocusingCloseWindow()
  },

  closeEditor(){
    const openItems = atom.workspace.getCenter().getPaneItems()

    if(openItems.length === 0){
      this.quitControlAtomView.showFocusingCloseWindow()
    } else {
      atom.commands.dispatch(atom.views.getView(atom.workspace), "core:close")
    }
  }

}
