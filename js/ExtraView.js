import { templates } from 'core/js/reactHelpers';
import React from 'react';
import ReactDOM from 'react-dom';
class ExtaView extends Backbone.View {

  className() {
    const classes = ['extra__extension', `extra__extension-${this.model.get('_type')}`, this.model.get('_extra')._classes];

    return classes.join(' ');
  }

  initialize() {
    this.render();
  }

  render() {
    const extra = this.model.get('_extra');
    const isComplete = this.model.get('_isComplete');

    if (extra._showOnModelCompleted && !isComplete) return;

    ReactDOM.render(<templates.extra {...this.model.toJSON()} />, this.el);

  }
}
ExtaView.template = 'extra';

export default ExtaView;
