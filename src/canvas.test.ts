import { Canvas } from './canvas';

customElements.define('x-canvas', Canvas);

const { assert } = chai;

describe('Canvas', () => {
  it('exists', () => {
    const canvas = new Canvas();
    assert.notEqual(canvas, null);
  });
});
