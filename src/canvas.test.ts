
import { CanvasComponent } from './canvas';

customElements.define('x-canvas', CanvasComponent);

const { assert, expect } = chai;

describe('Canvas', () => {

  let canvas;
  beforeEach( () => canvas = new CanvasComponent() );

  it('should be defined and should extend HTMLElement', () => {
    assert.notEqual(canvas, null);
    expect(canvas).to.be.an.instanceOf(HTMLElement);
  });
  it('should always have a target element', () => {
    assert.notEqual(canvas.targetEl, null);
    expect(canvas.targetEl).to.be.an.instanceOf(HTMLElement);
  });
  it('should display "click to draw!" in the target element when the component first loads', () => {
    assert.equal(canvas.targetEl.innerText, 'click to draw!');
  });
  // it('should ', () => {
  //   // function eventFire(el, etype){
  //   //   if (el.fireEvent) {
  //   //     el.fireEvent('on' + etype);
  //   //   } else {
  //   //     const evObj = document.createEvent('Events');
  //   //     evObj.initEvent(etype, true, false);
  //   //     el.dispatchEvent(evObj);
  //   //   }
  //   // }
  //   // eventFire(canvas, 'mousedown');
  //   // eventFire(canvas, 'mousemove');
  //   // canvas.dispatchEvent(new MouseEvent('mousedown', {pageX : true}));
  //   // assert.equal(canvas.targetEl.innerText, 'click to draw!');
  //   // setTimeout(() => console.log(canvas.targetEl.innerText), 3000)
  // });

});
