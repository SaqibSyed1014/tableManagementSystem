<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title>Total Categories</v-card-title>
        <v-card-text><h4>{{ totalCategories }}</h4></v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Total Orders</v-card-title>
        <v-card-text><h4>0</h4></v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Total Orders</v-card-title>
        <v-card-text><h4>0</h4></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { fetchingCategories } from '../db'
export default {
  name: "ViewDashboard",
  data() {
    return {
      totalCategories: 0,
    }
  },
  async created() {
    this.totalCategories = (await fetchingCategories()).length
  },
}
</script>

<style scoped>

</style>
