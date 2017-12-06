self.addEventListener('fetch', event => {
  // Tap into the fetch event and respond with the HTML stream 
  event.respondWith(htmlStream());
});

function htmlStream() {
  // The HTML string that we are going to return
  const html = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium velit non elit hendrerit placerat. Donec vel risus nec ligula tristique condimentum. Nam hendrerit, dolor id accumsan ullamcorper, lectus mauris fringilla orci, quis feugiat nibh sem at tellus. Mauris et cursus ligula. Aliquam erat volutpat. Nulla rhoncus aliquam ex ut porta. Quisque condimentum dignissim metus, sit amet efficitur odio. Vivamus vel egestas nisl, ac suscipit sem. Pellentesque posuere varius dui ut venenatis. Curabitur pulvinar lobortis justo in bibendum. Etiam maximus augue in eleifend gravida. Aliquam vestibulum luctus dui, eu lacinia justo maximus at.';

  // We are building a new ReadableStream
  const stream = new ReadableStream({
    start: controller => {
      // In order to turn the text into bytes, we need to use a TextEncoder
      // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
      const encoder = new TextEncoder();
      let pos = 0;
      let chunkSize = 1;

      // Push the results onto the web stream
      function push() {
        // Check to see if we have exceeded the length of the HTML and close the controller
        if(pos >= html.length) {
          controller.close();
          return;
        }

        // Enqueue and encode the next chunk of the HTML
        controller.enqueue(
          encoder.encode(html.slice(pos, pos + chunkSize))
        );

        pos += chunkSize;

        // Force a timeout for 50 millseconds in order to slow the rendering down
        setTimeout(push, 50);
      }
      // Starting pushing the results of the stream
      push();
    }
  });

  // Finally return the results of the stream as a new Response Object
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}