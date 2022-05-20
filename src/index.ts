import imageCompression from 'browser-image-compression';

// I'm importing this base64 just for this example, your code will probably already have some base64 somewhere to use
import imgB64 from '../img_b64.js';

export async function runDemo() {
  // Put some stuff in front of the base64 to make a data url
  const dataUrl = `data:image/jpeg;base64,${imgB64}`;

  // Here's the original file (converted base64 to a file)
  const jpg = await imageCompression.getFilefromDataUrl(dataUrl, 'cool.jpg');
  console.log('This is the original file. Note the big size.');
  console.log('jpg', jpg);
  console.log('jpg.size', jpg.size);
  console.log('');

  // Shrunk file
  const smallerJpg = await imageCompression(jpg, { maxSizeMB: 0.5 });
  console.log("Here's the new, smaller file. Note the small size.");
  console.log('smallerJpg', smallerJpg);
  console.log('smallerJpg.size', smallerJpg.size);
  console.log('');

  // Convert shrunken file to base64 for filemaker to eat
  const b64 = await imageCompression.getDataUrlFromFile(smallerJpg);
  console.log(
    "And here's how you can convert that smaller file to Base64 for FileMaker. Now it's only 0.5 MB. It's a data url, so it has some junk in front of the actual base64 data."
  );
  console.log('b64', b64);
  console.log('');

  // Send it to FM
  // FileMaker.PerformScript('handleShrunkenFile', b64)

  // DONE
  console.log("And that's all folks! Just a buncha blobs.");
}
