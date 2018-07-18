<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          :src="require('@/assets/characters.png')"
          height="180px"

        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
                <v-btn light icon :to="{ name: 'People'}">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="dark--text pl-5 pt-10">
              <div class="display-1 pl-5 pt-10">{{ character.name }}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>

        <v-list three-line class="pl-5">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Height</v-list-tile-title>
              <v-list-tile-sub-title>{{ character.height }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Birth Year</v-list-tile-title>
              <v-list-tile-sub-title>{{ character.birth_year }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Species</v-list-tile-title>
              <v-list-tile-sub-title>{{ species.name }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Homeworld</v-list-tile-title>
              <v-list-tile-sub-title>{{ homeworld.name }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-group>
             <v-list-tile slot="activator">
               <v-list-tile-content>
                 <v-list-tile-title>Films</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>

             <v-list-tile
               class="pl-5"
               v-for="film in films"
               :key="film.title"
               @click=""
               :to="{ name: 'detail-film', params: { id: film.episode_id, url: film.url }}"
             >
               <v-list-tile-content>
                 <v-list-tile-title>{{ film.title }}</v-list-tile-title>
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
        name:'',
        character:'',
        filmsUrl:[],
        films:[],
        homeworld:'',
        species:''
      }
    },
    created() {
      this.name = this.$route.params.name;
      this.url = this.$route.params.url;
    },
    mounted () {
      console.log(this.$route.params.url)
      axios
        .get(this.$route.params.url)
        .then(response => {
          this.character = response.data
          this.filmsUrl = response.data.films
          this.planetsUrl = response.data.planets
          for (var i = 0; i < this.filmsUrl.length; i++) {
            axios
              .get(this.filmsUrl[i])
              .then(response => {
                this.films.push(response.data)
              })
              .catch(error => console.log(error))
          }

          axios
              .get(this.character.homeworld)
              .then(response => {
                this.homeworld = response.data
              })
              .catch(error => console.log(error))

          axios
              .get(this.character.species)
              .then(response => {
                this.species = response.data
              })
              .catch(error => console.log(error))

        })
        .catch(error => console.log(error))
    }
  }
</script>
