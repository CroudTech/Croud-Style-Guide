<template>
    <div class="ui stackable grid">
        <div class="three wide column">

            <croud-image-uploader ref="uploader"
                                  :title="imageUploaderTitle"
                                  :imgUrl="getUser.avatar"
                                  :url="url"
                                  :requstHeaders="requestHeaders"
                                  :readOnly="readOnly"
                                  :defaultSrc="null"
                                  @image-set="profilePicSet"
                                  @image-reset="user.avatar = ''">

                <div slot="profile-current">

                    <croud-avatar :user="getUser" size="small"/>

                </div>

                <div slot="action">
                    <slot name="custom-action">
                        <button class="ui blue fluid button" slot="action" @click="$refs.uploader.showModal = !$refs.uploader.showModal">Change</button>
                    </slot>
                </div>
            </croud-image-uploader>
        </div>

        <div class="thirteen wide column">
            <slot name="custom-fields">
                <div class="ui form user-details">
                    <div class="required field">
                        <div class="ui big transparent input">
                            <input type="text" placeholder="First Name" v-model="getUser.first_name" :readOnly="readOnly" @blur="$emit('field-blurred')">
                        </div>
                    </div>

                    <div class="required field">
                        <div class="ui big transparent input">
                            <input type="text" placeholder="Last Name" v-model="getUser.last_name" :readOnly="readOnly" @blur="$emit('field-blurred')">
                        </div>
                    </div>

                    <div class="required field">
                        <div class="ui big transparent input">
                            <input type="text" placeholder="Email" v-model="getUser.email" :readOnly="readOnly" @blur="$emit('field-blurred')">
                        </div>
                    </div>
                </div>
            </slot>

        </div>

    </div>
</template>

<script>
import CroudAvatar from './Avatar'
import CroudImageUploader from './ImageUploader'

    /**
    * A User profile header that incorporates croud-avatar, croud-image-uploader and some default input fields
    *
    * @example ./croud-profile-header.md
    */

export default {
    name: 'croud-profile-header',
    props: {
        /**
        * The User Object to be passed to the Profile Header
        */
        user: {
            type: Object,
            required: true,
            // default: () => {},
        },

        /**
        * A Title for the semantic modal which contains the image cropper / uploader
        */
        imageUploaderTitle: {
            type: String,
            default: 'Set User Profile Picture',
        },

        /**
        * Makes the profile header read only
        */
        readOnly: {
            type: Boolean,
            default: false,
        },

        /**
        * Request part of the url if you wish to use the upload function, the response is emitted to the parent attached to a profile-pic-set event
        */
        url: {
            type: String,
            required: false,
        },

        /**
        * Default Croud request headers are set for files endpoint, pass requestHeaders object to override them
        */
        requestHeaders: {
            type: Object,
            default() {
                return {
                    'content-Type': 'multipart/form-data',
                    Cdn: 'cdn',
                }
            },
        },

    },

    components: {
        CroudAvatar,
        CroudImageUploader,
    },

    methods: {
        profilePicSet(file) {
            if (!file.reference) {
                this.user.avatar = file
            } else {
                const ref = file.reference
                this.user.avatar = `https://d19bu42bl3uf0v.cloudfront.net/${ref}`
            }
        },
    },

    computed: {
        getUser() {
            return this.user || {}
        },
    },

}
</script>

<style scoped>
    .user-details {
        width: 100%;
        padding: 2em;
    }
</style>
