### Usage
This is our User Profile Header, It combines Croud-Avatar and Croud-Image-Uploader with some default Input Fields, which are within a slot if you wish to customize them.
    
    <croud-profile-header :user="user" @profile-pic-set="profilePicSet"/>

### Read Only
You can also set the readOnly prop to make the header read Only..
    
    <croud-profile-header :user="user" :readOnly="true"/>

### Saving the Image
When an image is set a "profile-pic-set" event will be emitted to your parent component with the http response so you can handle the response and save it to the appropriate location, if no http request config is set an object url will be sent with the event, this can be used during the web session.
