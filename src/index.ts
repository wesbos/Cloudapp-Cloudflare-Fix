import { customCSS } from './css';

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
});

const BASE = 'wes.io';

function buildURL(url: string) {
  const urlObject = new URL(url);
  const newURL = urlObject.href.replace(urlObject.host, BASE);
  return newURL;
}

class ElementHandler implements HTMLRewriterElementContentHandlers {
  element(element: Element): void | Promise<void> {
    element.append(customCSS, {
      html: true
    })
  }
}

class CopyLinkHandler implements HTMLRewriterElementContentHandlers {
  constructor(private request: Request) {}
  element(element: Element): void | Promise<void> {
    element.setAttribute('href', `${this.request.url}/content`).setInnerContent('🔗 Direct')
  }
}


async function handleRequest(request: Request) {
  const parts = request.url.split('/');

  if(parts.length !== 5 || !parts[4].startsWith('co')) {


    // this is a regular request, forward it
    // example: https://wes.io/z8ulwqom
    // But first we add some Custom CSS to it
    const res = await fetch(buildURL(request.url));
    return new HTMLRewriter()
      .on('head', new ElementHandler())
      .on('.sign-in-btn', new CopyLinkHandler(request))
      .transform(res);
  }
  // otherwise this is a content response, we need to fetch it and return the image
  // Example: https://wes.io/z8ulwqom/content.png
  console.log('This is an image request');
  const dropURL = parts.slice(0,4).join('/');
  const dropResponse = await fetch(buildURL(dropURL));
  const dropHTML = await dropResponse.text();
  const dropOgImage = dropHTML.split('\n').find(line => line.includes('og:image'));
  const dropParts = dropOgImage?.split('"') || [];
  const contentIndex = dropParts.findIndex(part => part.includes('content='));
  const imagePath = dropParts[contentIndex + 1];
  return fetch(imagePath);
}

export {}
