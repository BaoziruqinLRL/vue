<template>

</template>

<script>
  let config = require('../../../config');
  const jkUploadPath = '/Users/admin/Downloads/jk/';
  const localAddress = 'http://localhost:' + config.dev.port;
  const imageUploadPath = localAddress + '/common/image/upload';
  const imageGetPath = localAddress + '/images';
  export default {
    jkUploadPath,
    localAddress,
    imageUploadPath,
    imageGetPath
  }
</script>
