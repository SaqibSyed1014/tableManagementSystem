<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" lg="4" v-for="(data, index) in dashboardData" :key="index">
        <v-card>
          <v-card-title>{{ data.title }}</v-card-title>
          <v-card-text><h1 class="text-center count pb-5">{{ data.total.length }}</h1></v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="ordersPerCategory"
        :loading="tableLoading"
        mobile-breakpoint="0"
        hide-default-footer
        class="elevation-1 mt-5"
    />
  </div>
</template>

<script>
import { fetchingCategories, fetchingItems, fetchingTables, fetchingOrders } from '../db'
export default {
  name: "ViewDashboard",
  data() {
    return {
      dashboardData: [
        { title: 'Total Categories', total: [] },
        { title: 'Total Items', total: [] },
        { title: 'Total Tables', total: [] },
        { title: 'Total Orders', total: [] },
      ],
      tableHeader: [
        { text: 'Category', value: 'category', align: 'center', sortable: false },
        { text: 'Total Orders', value: 'totalOrder', align: 'center', sortable: false },
      ],
      tableLoading: false,
    }
  },
  async created() {
    this.tableLoading = true
    this.dashboardData[0].total = await fetchingCategories() || []
    this.dashboardData[1].total = await fetchingItems() || []
    this.dashboardData[2].total = await fetchingTables() || []
    this.dashboardData[3].total = await fetchingOrders() || []
    this.tableLoading = false
  },
  computed: {
    ordersPerCategory() {
      let orders = []
      this.dashboardData[0]?.total?.forEach((category) => {
        const filteredOrders = this.dashboardData[3]?.total?.filter((order) => order.selectedCategory.id === category.id)
        orders.push({category: category.categoryName, totalOrder: filteredOrders.length})
      })
      return orders
    },
  },
}
</script>

<style scoped>
.count{
  color: #4cb5f5;
  font-size: 2.5rem !important;
}
</style>
