import { View } from './view';

customElements.define('x-view', View);

const { assert } = chai;

describe('View', () => {
  it('exists', () => {
    const view = new View();
    assert.notEqual(view, null);
  });
});
