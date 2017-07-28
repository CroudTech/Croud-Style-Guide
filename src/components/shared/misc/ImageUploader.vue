<template>
    <div>
        <div class="ui very padded container">
            <img class="ui centered small circular image" v-if="imgSrc" :src="src">
            <semantic-divider />
            <a class="ui fluid blue button" @click="showModal = !showModal">{{ buttonText }}</a>  
        </div>

        <semantic-modal size="small" :title="title" :active="showModal" :settings="modalSetting">
            <div class="ui basic segment">
                <div class="Image-upload-wrapper Image-upload">
                    
                    <div ref="croppie" id="croppie"></div>
                    <div id="upload-wrapper">
                        <div class="input-file">
                            <input ref="select" name="image-upload" type="file" accept="image/*" id="upload-image" v-on:change="setUpFileUploader" style="display: none">
                        </div>

                        <button class="ui blue button" @click="triggerSelect">
                            Select File
                        </button>

                        <button class="circular ui primary icon button" @click="croppie.rotate(-90)">
                        <i class="black undo icon"></i>
                        </button>

                        <button class="circular ui primary icon button" @click="croppie.rotate(90)">
                        <i class="black repeat icon"></i>
                        </button>
                    </div>
                </div>
                
                <semantic-divider class="hidden" />
                <button class="ui right floated blue button" :class="{'loading': loading}" id="uploadFileCall" @click="uploadFile" :disabled="canSet">Set</button>
                <button class="ui right floated button" :disabled="loading" @click="showModal = !showModal">Cancel</button>

            </div>
        </semantic-modal>
    </div>
</template>

<script>
    import Croppie from 'croppie'

    /**
    * An image cropper and uploader useful for user profiles
    *
    * @example ./croud-image-uploader.md
    */

    export default {
        name: 'croud-image-uploader',

        props: {
            /**
            * A Title for the semantic modal which contains the image cropper / uploader
            */
            title: {
                type: String,
                default: 'Set Image',
            },

            /**
            * The text displayed in the profile action button
            */
            buttonText: {
                type: String,
                default: 'Set Image',
            },

            /**
            * Current picture url
            */
            imgUrl: {
                type: String,
            },

            /**
            * Request part of the url if you wish to use the upload function, the response is emitted to the parent attached to a image-set event
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

        data() {
            return {
                defaultSrc: '../../../.././static/img/defaultAvatar.png',
                src: '../../../.././static/img/defaultAvatar.png',
                //
                loading: false,
                showModal: false,
                croppie: null,
                image: null,
                //
                modalSetting: {
                    closable: true,
                    closable_button: true,
                    onVisible: () => {
                        this.image = this.cors
                        this.$nextTick(() => {
                            this.croppie.bind({
                                url: this.image,
                            })
                        })
                    },
                },
                //
            }
        },

        mounted() {
            this.setUpCroppie()
            //
            this.$on('imgUploaded', ((imageData) => {
                this.image = imageData
                this.croppie.destroy()
                this.setUpCroppie(imageData)
                this.$nextTick(() => {
                    this.croppie.bind({
                        url: this.image,
                    })
                })
            }))
        },

        methods: {
            triggerSelect() {
                this.$refs.select.click()
            },

            profileSet(image) {
                this.src = image
            },

            uploadFile() {
                this.loading = true

                this.croppie.result(
                    { type: 'blob',
                        size: 'viewport',
                        name: 'profile',
                    }).then((response) => {
                        this.image = response
                        // Axios request
                        if (this.url) {
                            const formData = new FormData()
                            formData.append('file', this.image)
                            this.$http.post(this.url, formData, {
                                headers: this.requestHeaders,
                            }).then((res) => {
                                this.$emit('image-set', res.data.data)
                                this.$emit('modal-closed')
                                this.loading = false
                            })
                        }
                        this.profileSet(window.URL.createObjectURL(response))
                        this.showModal = !this.showModal
                        this.loading = false
                    })
            },

            setUpCroppie() {
                const el = document.getElementById('croppie')
                this.croppie = new Croppie(el, {
                    viewport: { width: 220, height: 220, type: 'square' },
                    boundary: { width: 260, height: 260 },
                    showZoomer: true,
                    enableOrientation: true,
                    format: 'png',
                    enforceBoundary: false,
                })
            },

            setUpFileUploader(e) {
                const files = e.target.files || e.dataTransfer.files
                if (!files.length) {
                    return
                }
                this.createImage(files[0])
            },

            createImage(file) {
                const reader = new FileReader()
                const vm = this

                reader.onload = (e) => {
                    vm.image = e.target.result
                    vm.$emit('imgUploaded', e.target.result)
                }
                reader.readAsDataURL(file)
            },
        },

        computed: {
            cors() {
                return `${this.src}?v=cors` || ''
            },

            imgSrc() {
                if (this.imgUrl) {
                    const tester = new Image()

                    tester.addEventListener('load', (() => {
                        this.src = this.imgUrl
                    }))

                    tester.addEventListener('error', (() => {
                        this.src = this.defaultSrc
                    }))

                    tester.src = this.imgUrl
                }
                return true
            },

            computedUrl() {
                if (this.url.match(/:\/\//)) return this.url
                return `//${gateway_url}/${this.url}`
            },

            canSet() {
                return this.image === `${this.defaultSrc}?v=cors`
            },
        },
    }
</script>

<style lang="scss">
$transparent: transparent;

  div#upload-wrapper {
  text-align: center;
}

  .croppie-container {
  width: 100%;
  height: 100%;
}

.croppie-container .cr-image {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  max-height: none;
  max-width: none;
}

.croppie-container .cr-boundary {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.croppie-container .cr-viewport {
  position: absolute;
  border: 2px solid #fff;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.croppie-container .cr-original-image {
  display: none;
}

.croppie-container .cr-vp-circle {
  border-radius: 50%;
}

.croppie-container .cr-overlay {
  z-index: 1;
  position: absolute;
  cursor: move;
}

.croppie-container .cr-slider-wrap {
  width: 75%;
  margin: 15px auto;
  text-align: center;
}

.croppie-result {
  position: relative;
  overflow: hidden;
}

.croppie-result img {
  position: absolute;
}

.croppie-container .cr-image,
.croppie-container .cr-overlay,
.croppie-container .cr-viewport {
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

/*************************************/
/***** STYLING RANGE INPUT ***********/
/*************************************/

.cr-slider {
  -webkit-appearance: none;
  width: 300px;
  max-width: 100%;
}

.cr-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 3px;
}

.cr-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ddd;
  margin-top: -6px;
}

.cr-slider:focus {
  outline: none;
}

.cr-slider::-moz-range-track {
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 3px;
}

.cr-slider::-moz-range-thumb {
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ddd;
  margin-top: -6px;
}

.cr-slider:-moz-focusring {
  outline: 1px solid white;
  outline-offset: -1px;
}

.cr-slider::-ms-track {
  width: 300px;
  height: 5px;
  background: $transparent;
  border-color: $transparent;
  border-width: 6px 0;
  color: $transparent;
}

.cr-slider::-ms-fill-lower {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.cr-slider::-ms-fill-upper {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.cr-slider::-ms-thumb {
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ddd;
  margin-top:1px;
}

.cr-slider:focus::-ms-fill-lower {
  background: rgba(0, 0, 0, 0.5);
}

.cr-slider:focus::-ms-fill-upper {
  background: rgba(0, 0, 0, 0.5);
}
/*******************************************/

/***********************************/
/* Rotation Tools */
/***********************************/

.cr-rotate-controls {
  position: absolute;
  bottom: 5px;
  left: 5px;
  z-index: 1;
}

.cr-rotate-controls button {
  border: 0;
  background: none;
}

.cr-rotate-controls i:before {
  display: inline-block;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
}

.cr-rotate-l i:before {
  content: '↺';
}

.cr-rotate-r i:before {
  content: '↻';
}
</style>
