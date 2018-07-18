<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Films</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="film in films"
            :key="film.title"
            :to="{ name: 'detail-film', params: { id: film.episode_id, url: film.url }}"
          >
            <v-list-tile-avatar>
              <v-icon>movie</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ film.title }}</v-list-tile-title>
            </v-list-tile-content>


          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        films: []
      }
    },
    mounted () {
      axios
        .get('https://swapi.co/api/films/')
        .then(response => {
          this.films = response.data.results
        })
        .catch(error => console.log(error))
    }
  }
</script>
