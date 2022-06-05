<template>
  <v-row>
    <v-col cols="4" v-for="(data, index) in dashboardData" :key="index">
      <v-card>
        <v-card-title>{{ data.title }}</v-card-title>
        <v-card-text><h1 class="text-center pb-5">{{ data.total }}</h1></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { fetchingCategories, fetchingItems, fetchingTables } from '../db'
export default {
  name: "ViewDashboard",
  data() {
    return {
      dashboardData: [
        { title: 'Total Categories', total: 0 },
        { title: 'Total Items', total: 0 },
        { title: 'Total Tables', total: 0 },
        { title: 'Total Orders', total: 0 },
      ],
    }
  },
  async created() {
    this.dashboardData[0].total = (await fetchingCategories()).length
    this.dashboardData[1].total = (await fetchingItems()).length
    this.dashboardData[2].total = (await fetchingTables()).length
  },
}
</script>

<style scoped>

</style>
