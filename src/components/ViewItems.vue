<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Items Table</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Item"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary" @click.stop="dialog = true">Add Item</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="items"
        :loading="tableLoading"
        :search="search"
        hide-default-footer
        class="elevation-1"
    ></v-data-table>

    <v-dialog
        v-model="dialog"
        max-width="500"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span>Add an Item</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter Item Name"
                v-model="itemName"
            ></v-text-field>
            <v-select
                v-model="selectedCategory"
                :items="categories"
                item-text="categoryName"
                return-object
                label="Select Category"
            ></v-select>
            <v-text-field
                label="Enter Item Price"
                v-model="itemPrice"
            ></v-text-field>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="dark darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
              color="primary darken-1"
              text
              :loading="loading"
              :disabled="loading"
              @click="saveItem"
          >
            Save
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { fetchingCategories, fetchingItems, addingItems } from "../db";

export default {
  name: "ViewItems",
  data: () => ({
    search: '',
    tableHeader: [
      { text: 'Item Name', value: 'itemName', align: 'center' },
      { text: 'Category', value: 'assignedCategory.categoryName', align: 'center' },
      { text: 'Price', value: 'price', align: 'center' }
    ],
    items: [],
    categories: [],
    itemName: '',
    itemPrice: '',
    selectedCategory: {},
    dialog: false,
    loader: null,
    loading: false,
    tableLoading: false,
  }),
  async created() {
    this.tableLoading = true
    this.categories = await fetchingCategories()
    this.items = await fetchingItems()
    this.tableLoading = false
  },
  methods: {
    async saveItem() {
      this.loader = 'loading'
      this.items = await addingItems({ itemName: this.itemName, price: this.itemPrice, assignedCategory: this.selectedCategory })
      console.log('saved ', this.items)
      this.loader = null
      this.dialog = false
    },
  },
}
</script>

<style scoped>

</style>
