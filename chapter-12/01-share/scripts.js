function share() {
  if (navigator.share) {
    navigator.share({
      title: document.title, 
      text: 'Hello World', 
      url: 'https://developer.mozilla.org',
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing:', error));
  }
}