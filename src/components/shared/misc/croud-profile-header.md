### Usage
This is our User Profile Header, It combines Croud-Avatar and Croud-Image-Uploader with some default Input Fields, which are within a slot if you wish to customize them.
    
    <croud-profile-header :user="user" :showModal="profileHeaderModal" @show-modal="profileHeaderModal = !profileHeaderModal" @profile-pic-set="profileHeaderModal = !profileHeaderModal" />
