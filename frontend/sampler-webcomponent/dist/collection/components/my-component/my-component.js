import { h } from "@stencil/core";
import '@vaadin/vaadin-button';
export class MyComponent {
    render() {
        return (h("vaadin-button", null, "Test"));
    }
    static get is() { return "my-component"; }
}
