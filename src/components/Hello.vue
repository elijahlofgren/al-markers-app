<script src="./HelloComponent.js"></script>
<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class='hello'>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                :items="tags"
                label="Filter by tag"
                v-model="selectedTag"
              ></v-select>
              Swipe right on a marker to mark it as visited.
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
                    <v-icon dark>fa fa-map-marker</v-icon>
                  </v-btn>
                  <v-btn v-if="marker.waymarkUrl" dark small color="primary" :href='marker.waymarkUrl' target="_blank">
                    <v-icon dark>fa fa-map-signs</v-icon>
                  </v-btn>
                  <v-btn v-if="marker.article" dark small color="primary" :href='marker.article' target="_blank">
                    <!--<v-icon dark>fa fa-info</v-icon>--> Read Article
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

        <!-- Your location: -->
         <div id="mapid"></div>
  </div> 
      </v-layout>
    </v-slide-y-transition>
  </v-container>
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
#mapid {
  height: 580px;
}

h1,
h2 {
  font-weight: normal;
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

