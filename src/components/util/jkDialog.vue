<template>
  <div>
    <span>{{jk.name}}</span>
  </div>
</template>

<script>

  export default {
    props: {
      jk: {
        type: Object,
        default: function() {
          return {
            id: 1,
            name: '森林绿',
            style: '绿色格子',
            color: '绿色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          }
        }
      }
    },
    data(){
      return {}
    }
  }
</script>
