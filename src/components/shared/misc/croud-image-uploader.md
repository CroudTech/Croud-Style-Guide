### Usage
Add the below snippet to your code, the image preview will fit to any container you place it in.
 
    <croud-image-uploader title="Example Image Cropper / Uploader" imgUrl="https://d19bu42bl3uf0v.cloudfront.net/67c1d61954225b81e68cad98b8061872" defaultSrc="https://d19bu42bl3uf0v.cloudfront.net/67c1d61954225b81e68cad98b8061872"/>

### Saving the Image
When an image is set a "image-set" event will be emitted to your parent component with the http response so you can handle the response and save it to the appropriate location, if no http request config is set an object url will be sent with the event, this can be used during the web session.