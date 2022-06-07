<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Orders</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Order"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary" @click.stop="dialog = true">Create Order</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="orders"
        :loading="tableLoading"
        :search="search"
        @click:row="openOrderDialog"
        hide-default-footer
        class="row-pointer elevation-1"
    >
      <template v-slot:item.selectedItems="{ item }">
        <div v-for="value in item.selectedItems" :key="value.id">{{ value.itemName }}</div>
      </template>
      <template v-slot:item.paid="{ item }">
        <v-chip
            :color="item.paid ? 'green' : 'red'"
            dark
            class="cursor-move"
            @click.stop.prevent="updatePaidStatus(item)"
        >
          <v-progress-circular
              v-if="item.statusLoader"
              indeterminate
              color="white"
              class="spinner"
          ></v-progress-circular>
          <span v-else>{{ item.paid ? 'Paid' : 'Pending' }}</span>
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span>{{ `${ orderData.id ? 'Update' : 'Create' }` }} Order</span>
          </v-card-title>
          <v-card-text>
            <v-select
                v-model="orderData.selectedCategory"
                :items="categories"
                item-text="categoryName"
                return-object
                label="Select Category"
                v-on:change="filterItems"
            ></v-select>
            <v-select
                v-model="orderData.selectedItems"
                :items="selectedCategoryItem"
                :menu-props="{ maxHeight: '400' }"
                label="Select Items To Order"
                item-text="itemName"
                return-object
                multiple
                hint="Select Category to Choose Items"
                v-on:change="calculateBill"
            ></v-select>
            <v-select
                v-model="orderData.selectedTable"
                :items="tables"
                item-text="tableNo"
                return-object
                label="Assign To Table No"
            ></v-select>
            <div class="bill-wrapper text-center"><h3>Total Bill</h3><h2><span class="bill-highlight">{{ orderData.totalBill }}</span></h2></div>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text
              :loading="deleteLoader"
              :disabled="deleteLoader"
              :color="orderData.id ? 'red' : 'black'"
              @click="orderData.id ? deleteOrder() : dialog = false"
          >
            {{ `${ orderData.id ? 'Delete' : 'Close' }` }}
          </v-btn>

          <v-btn
              color="primary darken-1"
              text
              :loading="loading"
              :disabled="loading"
              @click="orderData.id ? updateOrder() : saveOrder()"
          >
            {{ `${ orderData.id ? 'Update' : 'Save' }` }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <order-invoice ref="invoice" :order-details="orderData"/>
  </v-card>
</template>

<script>
import {
  fetchingOrders,
  fetchingCategories,
  fetchingItems,
  fetchingTables,
  addingOrder,
  updatingOrder,
  deletingOrder,
} from "../db";
import OrderInvoice from "./OrderInvoice";

export default {
  name: "ViewOrders",
  components: {OrderInvoice},
  data: () => ({
    search: '',
    orders: [],
    categories: [],
    items: [],
    tables: [],
    selectedCategoryItem: [],
    orderData: {
      selectedCategory: {},
      selectedItems: [],
      selectedTable: {},
      totalBill: 0,
      paid: false,
    },
    tableHeader: [
      { text: 'Table No', value: 'selectedTable.tableNo', align: 'center' },
      { text: 'Items', value: 'selectedItems', align: 'center' },
      { text: 'Category', value: 'selectedCategory.categoryName', align: 'center' },
      { text: 'Total Bill', value: 'totalBill', align: 'center' },
      { text: 'Status', value: 'paid', align: 'center' },
    ],
    dialog: false,
    loading: false,
    deleteLoader: false,
    tableLoading: false,
  }),
  watch: {
    dialog(val) { if (!val) this.orderData = {
      selectedCategory: {},
      selectedItems: [],
      selectedTable: {},
      totalBill: 0,
      paid: false,
    } },
  },
  async created() {
    this.tableLoading = true
    this.orders = await fetchingOrders()
    this.categories = await fetchingCategories()
    this.items = await fetchingItems()
    this.tables = await fetchingTables()
    this.tableLoading = false
  },
  methods: {
    filterItems(category) {
      if (this.orderData.id) this.orderData.selectedItems = []
      this.selectedCategoryItem = this.items.filter((item) => item.selectedCategory.id === category.id)
      this.orderData.totalBill = 0
    },
    calculateBill() {
      this.orderData.selectedItems?.forEach((item) => this.orderData.totalBill = parseInt(item.itemPrice) + this.orderData.totalBill)
    },
    async updatePaidStatus(item) {
      const itemIndex = this.orders?.findIndex(obj => obj.id === item.id)
      this.orders[itemIndex].paid = !this.orders[itemIndex].paid
      this.orders[itemIndex].statusLoader = true
      await updatingOrder(this.orders[itemIndex])
      this.orders[itemIndex].statusLoader = false
    },
    async saveOrder() {
      this.loading = true
      this.orders = await addingOrder(this.orderData).then((orders) => {
        this.$refs.invoice.dialog = true
        return orders
      })
      this.loading = false
    },
    async updateOrder() {
      this.loading = true
      this.orders = await updatingOrder(this.orderData)
      this.loading = false
      this.dialog = false
    },
    async deleteOrder() {
      this.deleteLoader = true
      this.orders = await deletingOrder(this.orderData)
      this.deleteLoader = false
      this.dialog = false
    },
    openOrderDialog(order) {
      this.dialog = true
      this.orderData = order
      if (this.orderData.id) this.selectedCategoryItem = this.orderData.selectedItems
    },
  },
}
</script>

<style scoped>
.bill-wrapper h3{
  margin-bottom: .5rem;
}
.bill-highlight{
  padding: .1rem .5rem;
  margin-top: 1rem;
  color: #fff;
  background: #1976D2;
}
.spinner{
  height: 16px !important;
}
</style>
