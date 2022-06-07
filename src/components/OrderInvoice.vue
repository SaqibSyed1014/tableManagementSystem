<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
  >
    <v-card>
      <v-form>
        <v-card-title>
          <span>Invoice</span>
        </v-card-title>
        <v-card-text>
          <div><b>Items Ordered</b></div>
          <ul>
            <li v-for="item in orderDetails.selectedItems" :key="item.id">{{ item.itemName }}</li>
          </ul>
          <div>Items Selected From <b>{{ orderDetails.selectedCategory.categoryName }}</b> Category</div>
          <div>Ordered To Table No <b>{{ orderDetails.selectedTable.tableNo }}</b></div>
          <div class="bill-wrapper text-center"><h3>Bill</h3><h2><span class="bill-highlight">{{ orderDetails.totalBill }}</span></h2></div>
        </v-card-text>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary darken-1"
            text
            @click="dialog = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrderInvoice",
  props: {
    orderDetails: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  })
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
</style>
