<template>
  <div>
    <button @click="toggler = !toggler">
      Toggle Lightbox
    </button>

    <FsLightbox
      :toggler="toggler"
      :sources="[
      './images/preview/1.jpg',
      'https://i.imgur.com/fsyrScY.jpg',
      'https://www.youtube.com/watch?v=xshEZzpS4CQ',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      ]"
    />
  </div>
</template>

<script>
  import FsLightbox from "fslightbox-vue";
  export default {
    components: { FsLightbox },
    data() {
      return {
        toggler: false
      }
    }
  }
</script>
