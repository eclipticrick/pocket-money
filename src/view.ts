const template = document.createElement('template');
const styles = `
  :host {
      display: block;
      width: 100%;
      min-height: 200px;
      height: 100%;
      overflow: hidden;
  }
  div#target {
      user-select: none;
      margin: auto;
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
  }
  div:not(#target) {
      position: absolute;
      border-radius: 50%;
  }
`;
template.innerHTML = `
  <style>${styles}</style>
  <div id='target'>click to draw!</div>
`;

export class View extends HTMLElement {
  root: ShadowRoot;
  targetEl: HTMLElement;
  interval: any;
  isDrawing: boolean;
  isClicking: boolean;
  mouseX: number;
  mouseY: number;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.root = shadowRoot;
    this.targetEl = shadowRoot.getElementById('target');
  }

  static get observedAttributes() {
    return [
      'minBubbleSize',
      'maxBubbleSize',
      'drawingInterval',
      'removalInterval',
      'bubbleColor',
      'bubbleOpacity',
      'bubbleBorder',
      'clear',
    ]
  }

  connectedCallback() {
    this.addEventListener('mousedown', this.onMouseDown);
    this.addEventListener('mouseup', this.onMouseUp);
    this.addEventListener('mousemove', this.onMouseMove);
    this.addEventListener('mouseout', this.onMouseOut);
    this.setDefaultAttributes({
      minBubbleSize: '8',
      maxBubbleSize: '30',
      drawingInterval: '50',
      removalInterval: '10000',
      bubbleColor: '#000000',
      bubbleOpacity: '0.1',
    });
  }

  disconnectedCallback() {
    this.removeEventListener('mousemove', this.onMouseMove);
    this.removeEventListener('mouseout', this.onMouseOut);
  }

  attributeChangedCallback(attrName: string, oldVal, newVal) {
    console.log('attributeChangedCallback', attrName, oldVal, newVal);
    if (attrName === 'clear') {
      console.log('clear!!')
      this.clearCanvas();
    }
    // if (attrName === 'maxBubbleSize') {
    //
    // }
    // if (attrName === 'drawingInterval') {
    //
    // }
    // if (attrName === 'removalInterval') {
    //
    // }
    // if (attrName === 'bubbleColor') {
    //
    // }
    // if (attrName === 'bubbleOpacity') {
    //
    // }
    // if (attrName === 'bubbleBorder') {
    //
    // }
    // if (attrName === 'tabindex') {
    //   const [ oldVal, newVal ] = change as string[];
    //   if (oldVal !== '1' && newVal === '1') {
    //     this.target.innerText = 'Press any Key!';
    //   } else if (oldVal === '1' && newVal !== '1') {
    //     this.target.innerText = 'Click me!';
    //   }
    // }
  }

  private setDefaultAttributes(defaults): void {
    const attribute = Object.keys(defaults);
    attribute.forEach((attr: string) => {
      const value = defaults[attr];
      if (!this.hasAttribute(attr)) {
        this.setAttribute(attr, value);
      }
    })
  }

  get minBubbleSize()   { return this.getAttribute('minBubbleSize') }
  get maxBubbleSize()   { return this.getAttribute('maxBubbleSize') }
  get drawingInterval() { return this.getAttribute('drawingInterval') }
  get removalInterval() { return this.getAttribute('removalInterval') }
  get bubbleColor()     { return this.getAttribute('bubbleColor') }
  get bubbleOpacity()   { return this.getAttribute('bubbleOpacity') }
  get bubbleBorder()    { return this.getAttribute('bubbleBorder') }
  get clear()     { return this.getAttribute('clearCanvas') }

  set minBubbleSize(size) {
    this.setAttribute('minBubbleSize', size)
  }
  set maxBubbleSize(size)   {
    this.setAttribute('maxBubbleSize', size)
  }
  set drawingInterval(interval) {
    this.setAttribute('drawingInterval', interval)
  }
  set removalInterval(interval) {
    this.setAttribute('removalInterval', interval)
  }
  set bubbleColor(hexColor)     {
    this.setAttribute('bubbleColor', hexColor)
  }
  set bubbleOpacity(alpha)   {
    this.setAttribute('bubbleOpacity', alpha)
  }
  set bubbleBorder(bool)    {
    this.setAttribute('bubbleBorder', bool)
  }
  set clear(val)    {
    this.clearCanvas();
  }

  private onMouseDown(e: MouseEvent): void {
    this.isClicking = true;
  }
  private onMouseUp(e: MouseEvent): void {
    this.isClicking = false;
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
    if (!this.isDrawing && this.isClicking) {
      this.startDrawing()
    } else if (this.isDrawing && !this.isClicking) {
      this.stopDrawing()
    }
  }

  private onMouseOut(e: MouseEvent): void {
    if (this.isDrawing) {
      this.stopDrawing()
    }
  }

  private startDrawing() {
    if (this.targetEl.innerText !== '') {
      this.targetEl.innerText = '';
    }
    const minBubbleSize = this.getAttribute('minBubbleSize');
    const maxBubbleSize = this.getAttribute('maxBubbleSize');
    const drawingInterval = this.getAttribute('drawingInterval');
    const removalInterval = this.getAttribute('removalInterval');
    const bubbleColor = this.getAttribute('bubbleColor');
    const bubbleOpacity = this.getAttribute('bubbleOpacity');
    const bubbleBorder = this.getAttribute('bubbleBorder');
    this.isDrawing = true;
    this.interval = setInterval(() => {
      const bubbleEl = document.createElement('div');
      const size = this.getRandomBubbleSize(+minBubbleSize, +maxBubbleSize);
      bubbleEl.setAttribute('style', `
        width:  ${size}px;
        height: ${size}px;
        left:   ${this.mouseX - (size / 2)}px;
        top:    ${this.mouseY - (size / 2)}px;
        background: ${this.hexToRGB(bubbleColor, bubbleOpacity)};
        ${bubbleBorder ? `border: 1px solid ${bubbleColor};` : ''}
      `);
      this.targetEl.appendChild(bubbleEl);
      setTimeout(() => this.targetEl.removeChild(bubbleEl), +removalInterval);
    }, +drawingInterval);
  }

  private stopDrawing() {
    this.isDrawing = false;
    clearInterval(this.interval);
  }
  private clearCanvas() {
    this.targetEl.innerHTML = '';
  }
  private getRandomBubbleSize(min: number, max: number) {
    return Math.round(max - (Math.random() * (max - min)))
  }
  private hexToRGB(hex, alpha = null) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
}

customElements.define('x-view', View);
