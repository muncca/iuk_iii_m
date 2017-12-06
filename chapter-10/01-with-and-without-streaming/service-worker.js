self.addEventListener('fetch', event => {
  event.respondWith(htmlStream());
});

function htmlStream() {
  const html = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium velit non elit hendrerit placerat. Donec vel risus nec ligula tristique condimentum. Nam hendrerit, dolor id accumsan ullamcorper, lectus mauris fringilla orci, quis feugiat nibh sem at tellus. Mauris et cursus ligula. Aliquam erat volutpat. Nulla rhoncus aliquam ex ut porta. Quisque condimentum dignissim metus, sit amet efficitur odio. Vivamus vel egestas nisl, ac suscipit sem. Pellentesque posuere varius dui ut venenatis. Curabitur pulvinar lobortis justo in bibendum. Etiam maximus augue in eleifend gravida. Aliquam vestibulum luctus dui, eu lacinia justo maximus at.';

  const stream = new ReadableStream({
    start: controller => {
      const encoder = new TextEncoder();
      let pos = 0;
      let chunkSize = 1;

      function push() {
        if(pos >= html.length) {
          controller.close();
          return;
        }

        controller.enqueue(
          encoder.encode(html.slice(pos, pos + chunkSize))
        );

        pos += chunkSize;
        setTimeout(push, 50);
      }
      push();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}