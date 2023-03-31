import Adapt from 'core/js/adapt';
import ExtraView from './ExtraView';

class Extra extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'blockView:postRender': this.onRender,
      'componentView:postRender': this.onRender
    });
  }

  onRender (view) {
    const model = view.model;
    if (!this.checkIsEnabled(model)) {
      return;
    }

    if (model.get('_extra')._showOnModelCompleted && !model.get('_isComplete')) {
      this.setupListener(model, view);
    } else {
      this.addExtraView(model, view);
    }

  }

  setupListener(model, view) {
    this.listenTo(model, 'change:_isComplete', this.addExtraView.bind(this, model, view));
  }

  addExtraView(model, view) {
    const extraModel = model.get('_extra');
    const extraView = new ExtraView({ model });

    const $insertElement = view.$el.find(extraModel._selector) || view.$el;
    if ($insertElement.find('.extra__extension').length > 0) return;

    if (extraModel._appendTo === 'top') {
      $insertElement.prepend(extraView.el);
    } else {
      $insertElement.append(extraView.el);
    }
    view.$el.addClass('has-extra');

  }

  checkIsEnabled(model) {
    const _model = model.get('_extra');
    if (!_model || !_model._isEnabled) return false;
    return true;
  }
}

export default new Extra();
