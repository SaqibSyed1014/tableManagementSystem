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
        @click:row="openItemDialog"
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
            <span>{{ `${ itemData.id ? 'Update' : 'Add an'}` }} Item</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter Item Name"
                v-model="itemData.itemName"
            ></v-text-field>
            <v-select
                v-model="itemData.selectedCategory"
                :items="categories"
                item-text="categoryName"
                return-object
                label="Select Category"
            ></v-select>
            <v-text-field
                label="Enter Item Price"
                v-model="itemData.itemPrice"
            ></v-text-field>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text
              :loading="deleteLoader"
              :disabled="deleteLoader"
              :color="itemData.id ? 'red' : 'black'"
              @click="itemData.id ? deleteItem() : dialog = false"
          >
            {{ `${ itemData.id ? 'Delete' : 'Close' }` }}
          </v-btn>

          <v-btn
              color="primary darken-1"
              text
              :loading="loading"
              :disabled="loading"
              @click="itemData.id ? updateItem() : saveItem()"
          >
            {{ `${ itemData.id ? 'Update' : 'Save' }` }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { fetchingCategories, fetchingItems, addingItems, updatingItem, deletingItem } from "../db";

export default {
  name: "ViewItems",
  data: () => ({
    search: '',
    tableHeader: [
      { text: 'Item Name', value: 'itemName', align: 'center' },
      { text: 'Category', value: 'selectedCategory.categoryName', align: 'center' },
      { text: 'Price', value: 'itemPrice', align: 'center' }
    ],
    itemData: {
      itemName: '',
      itemPrice: '',
      selectedCategory: {},
    },
    items: [],
    categories: [],
    dialog: false,
    loading: false,
    deleteLoader: false,
    tableLoading: false,
  }),
  watch: {
    dialog(val) { if (!val) this.itemData = {} },
  },
  async created() {
    this.tableLoading = true
    this.categories = await fetchingCategories()
    this.items = await fetchingItems()
    this.tableLoading = false
  },
  methods: {
    async saveItem() {
      this.loading = true
      this.items = await addingItems(this.itemData)
      this.loading = false
      this.dialog = false
    },
    async updateItem() {
      this.loading = true
      this.items = await updatingItem(this.itemData)
      this.loading = false
      this.dialog = false
    },
    async deleteItem() {
      this.deleteLoader = true
      this.items = await deletingItem(this.itemData)
      this.deleteLoader = false
      this.dialog = false
    },
    openItemDialog(item) {
      this.dialog = true
      this.itemData = item
    },
  },
}
</script>

<style scoped>

</style>
