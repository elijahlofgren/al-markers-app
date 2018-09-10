<script src="./HelloComponent.js"></script>
<template>
  <v-container fluid>
       
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class='hello'>
            <v-flex xs12 sm6 offset-sm3>
              <h1>Historical Markers List</h1>
              <v-btn @click="goToMapView" small color="primary" dark>Go to Map View</v-btn>
              <div class="tag-filter-wrapper">
              <v-select
                :items="tags"
                label="Filter by category"
                v-model="selectedTag"
              ></v-select>
              </div>
              <div class="tip">Tip: Swipe right on a marker to mark it as visited.</div>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 v-for='(marker,index) of filteredMarkers' :key='index'>
              <v-card 
              v-touch="{
                left: () => swipe('left', marker),
                right: () => swipe('right', marker)
              }">
                <!-- <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px"></v-card-media> -->        
                <v-card-title primary-title>
                  <div>
                    <h3>
                    <v-icon v-if="marker.visited">fa fa-check-circle</v-icon>
                    <a :href='marker.latUrl' target="_blank">{{ marker.name }}</a>
                    </h3>
                    <div>County: {{ marker.county }}</div>
                    <b>Distance: {{marker.distance}}</b>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn dark small color="primary" :href='marker.gmapsUrl' target="_blank">
                    <v-icon dark>place</v-icon>
                  </v-btn>
                  <v-btn v-if="marker.waymarkUrl" dark small color="primary" :href='marker.waymarkUrl' target="_blank">
                    <v-icon dark>info</v-icon>
                  </v-btn>
                  <v-btn v-if="marker.article" dark small color="primary" :href='marker.article' target="_blank">
                    <!--<v-icon dark>fa fa-info</v-icon>--> Read Article
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

           
  </div> 
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<style>
/*.mapLabel {
  font-size: 10px;
  white-space: nowrap;
  color: red;
}*/
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/*#mapid {
  height: 580px;
}
*/
h1,
h2 {
  font-weight: normal;
}
h1, .tag-filter-wrapper,
.tip {
  margin-left: 8px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>

