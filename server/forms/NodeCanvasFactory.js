// Unused file

const Canvas = require('canvas');
const Image = Canvas.Image;


class NodeCanvasFactory {
  create (width, height) {
    if (width <= 0 || height <= 0) {
      console.error(`NodeCanvasFactory::create(${width}, ${height}) - Invalid canvas size`);
      return;
    }

    const canvas = new Canvas(width, height);
    const context = canvas.getContext('2d');

    return {
      canvas: canvas,
      context: context,
    };
  }

  reset (canvasAndContext, width, height) {
    if (!canvasAndContext.canvas) {
      console.error(`NodeCanvasFactory::reset() - Canvas is not specified`);
      return;
    }

    if (width <= 0 || height <= 0) {
      console.error(`NodeCanvasFactory::reset(${width}, ${height}) - Invalid canvas size`);
      return;
    }

    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy (canvasAndContext) {
    if (!canvasAndContext.canvas) {
      console.error(`NodeCanvasFactory::destroy() - Canvas is not specified`);
      return;
    }

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

module.exports = NodeCanvasFactory;
