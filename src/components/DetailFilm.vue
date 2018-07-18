<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          class= "mb-5"
          :src="require('@/assets/Star_Wars_1.png')"
          height="400px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
                <v-btn dark icon :to="{ name: 'Films'}">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{ film.title }}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>

        <v-list three-line class="pl-5">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Episode ID</v-list-tile-title>
              <v-list-tile-sub-title>{{ film.episode_id }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Description</v-list-tile-title>
              <v-list-tile-sub-title>{{ film.opening_crawl }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Release Date</v-list-tile-title>
              <v-list-tile-sub-title>{{ film.release_date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Director</v-list-tile-title>
              <v-list-tile-sub-title>{{ film.director }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-group>
             <v-list-tile slot="activator">
               <v-list-tile-content>
                 <v-list-tile-title>Characters</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>

             <v-list-tile
               class="pl-5"
               v-for="character in characters"
               :key="character.name"
               @click=""
               :to="{ name: 'detail-character', params: { name: character.name, url: character.url }}"
             >
               <v-list-tile-content>
                 <v-list-tile-title>{{ character.name }}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
          </v-list-group>

          <v-divider></v-divider>

          <v-list-group>
             <v-list-tile slot="activator">
               <v-list-tile-content>
                 <v-list-tile-title>Planets</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>

             <v-list-tile
               class="pl-5"
               v-for="planet in planets"
               :key="planet.name"
               @click=""
             >
               <v-list-tile-content>
                 <v-list-tile-title>{{ planet.name }}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
          </v-list-group>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import router from 'vue-router'

  export default {
    data () {
      return {
        url:'',
        id: 0,
        film:'',
        characters:[],
        peopleUrl:[],
        planetsUrl:[],
        planets:[]
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.url = this.$route.params.url;
    },
    mounted () {
      console.log(this.$route.params.url)
      axios
        .get(this.$route.params.url)
        .then(response => {
          this.film = response.data
          this.peopleUrl = response.data.characters
          this.planetsUrl = response.data.planets
          for (var i = 0; i < this.peopleUrl.length; i++) {
            axios
              .get(this.peopleUrl[i])
              .then(response => {
                this.characters.push(response.data)
              })
              .catch(error => console.log(error))
          }
          for (var i = 0; i < this.planetsUrl.length; i++) {
            axios
              .get(this.planetsUrl[i])
              .then(response => {
                this.planets.push(response.data)
              })
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log(error))
    }
  }
</script>
