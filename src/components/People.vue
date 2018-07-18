<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>People</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="person in people"
            :key="person.name"
            :to="{ name: 'detail-character', params: { name: person.name, url: person.url }}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ person.name }}</v-list-tile-title>
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
        people: []
      }
    },
    mounted () {
      axios
        .get('https://swapi.co/api/people/')
        .then(response => {
          this.people = response.data.results
        })
        .catch(error => console.log(error))
    }
  }
</script>
