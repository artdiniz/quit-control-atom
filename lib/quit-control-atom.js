'use babel';

import QuitControlAtomView from './quit-control-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  quitControlAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.quitControlAtomView = new QuitControlAtomView(state.quitControlAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.quitControlAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'quit-control-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.quitControlAtomView.destroy();
  },

  serialize() {
    return {
      quitControlAtomViewState: this.quitControlAtomView.serialize()
    };
  },

  toggle() {
    console.log('QuitControlAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
