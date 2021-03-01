<template>
  <div>
    <graph-bar
            :width="600"
            :height="400"
            :axis-min="0"
            :axis-max="50"
            :labels="[ '1Q', '2Q', '3Q', '4Q' ]"
            :values="values">
        <note :text="'Bar Chart'"></note>
        <tooltip :names="names" :position="'left'"></tooltip>
        <legends :names="names" :filter="true"></legends>
    </graph-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      names: [ "MS", "Apple", "Google" ],
        values: [
            5,
            10,
            15
        ]
    }
  }
}
</script>