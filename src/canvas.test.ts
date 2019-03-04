import { Canvas } from './canvas';

customElements.define('x-canvas', Canvas);

const { assert } = chai;

describe('Canvas', () => {
  it('should be defined', () => {
    const canvas = new Canvas();
    assert.notEqual(canvas, null);
  });
  // it('should have ', () => {
  //   const canvas = new Canvas();
  //   assert.notEqual(canvas, null);
  //   assert.notEqual(canvas.minBubbleSize, null);
  //   assert.notEqual(canvas.maxBubbleSize, null);
  //   assert.notEqual(canvas.drawingInterval, null);
  //   assert.notEqual(canvas.removalInterval, null);
  //   assert.notEqual(canvas.bubbleColor, null);
  //   assert.notEqual(canvas.bubbleOpacity, null);
  //   assert.notEqual(canvas.bubbleBorder, null);
  //   assert.notEqual(canvas.clear, null);
  // });
});
