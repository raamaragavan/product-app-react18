// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

class BroadcastChannelMock {
    constructor() {}
    postMessage() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  }
  global.BroadcastChannel = BroadcastChannelMock;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof TransformStream === 'undefined') {
    global.TransformStream = class TransformStream {
      constructor() {
        this.readable = new ReadableStream({
          start(controller) {
            this.enqueue = controller.enqueue.bind(controller);
            this.close = controller.close.bind(controller);
          },
        });
        this.writable = new WritableStream({
          write: (chunk) => {
            this.enqueue(chunk);
          },
          close: () => {
            this.close();
          },
        });
      }
    };
  }
