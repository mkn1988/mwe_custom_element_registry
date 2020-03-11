import { Component, h } from '@stencil/core';
import '@vaadin/vaadin-button';

@Component({
  tag: 'my-component'
})
export class MyComponent {

  render() {
    return (
      <vaadin-button>Test</vaadin-button>
    );
  }
}
