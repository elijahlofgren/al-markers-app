<script src="./MarkerMapComponent.js"></script>
<template>
  <div id="mapid-wrapper">
    <v-btn @click="goToListView" small color="primary" dark>Back to List View</v-btn>
  <!--  Map:
     userLat:{{userLat}}<br />
userLon:{{userLon}}<br />-->
    <div id="mapid"></div>
</div>

</template>

 <style>
  .mapLabel {
    font-size: 10px;
    white-space: nowrap;
    color: red;
  }
  </style>
  <!-- Add 'scoped' attribute to limit CSS to this component only -->
  <style scoped>
  #mapid-wrapper {
    height: 90%;
  }
  #mapid {
    height: 100%;
  }
  </style>