import { LitElement, html, css } from 'lit';
import { Router, Routes } from '@lit-labs/router';
import { customElement } from 'lit/decorators.js';

@customElement('x-app')
export class App extends LitElement {
  static styles = [
    css`
    div {
      background: rgba(0,0,0,0.1);
      padding: 10px;
    }
    * {
      margin: 0;
      padding: 0;
    }
    `
  ];

  private _router = new Router(this, [
    {
      path: '/*',
      render: () => html`<x-parent></x-parent>`,
    },
  ]);

  render() {
    return html`
      <div>
        <p>App Container</p>
        ${this._router.outlet()}
      </div>
    `;
  }
}

@customElement('x-parent')
class XParent extends LitElement {
  static styles = [
    css`
    div {
      background: rgba(0,0,0,0.1);
      padding: 10px;
    }
    * {
      margin: 0;
      padding: 0;
    }
    `
  ];
  private _routes = new Routes(this, [
    { path: 'some-path/*?', render: () => html`<x-child></x-child>`},
    { path: '', render: () => html`X-Parent Blank Match`},
  ], {
    fallback: {
      render: () => html`X-Parent Fallback Route`,
    }
  });
  render() {
    return html`
      <div>
        <p>X-Parent</p>
        ${this._routes.outlet()}
      </div>
    `;
  }
}

@customElement('x-child')
class XChild extends LitElement {
  static styles = [
    css`
    div {
      background: rgba(0,0,0,0.1);
      padding: 10px;
    }
    * {
      margin: 0;
      padding: 0;
    }
    `
  ];
  private _routes = new Routes(this, [
    {path: 'child/foo', render: () => html`X-Child foo`},
    {path: '', render: () => html`X-Child Blank Match`},
  ], {
    fallback: {
      render: () => html`X-Child Fallback Route`
    }
  });
  render() {
    return html`
      <div>
        <p>X-Child</p>
        ${this._routes.outlet()}
      </div>
    `;
  }
}
