<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Categories Table</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Categories"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary" @click.stop="dialog = true">Add Category</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="allCategories"
        :loading="tableLoading"
        hide-default-footer
        :search="search"
        class="elevation-1"
    ></v-data-table>

    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span>Add a Category</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter Category Name"
                v-model="categoryName"
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
              @click="saveCategory"
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
import { addingCategory, fetchingCategories } from '../db'

export default {
  name: "ViewCategories",
  data: () => ({
    search: '',
    dialog: false,
    loader: null,
    loading: false,
    tableLoading: false,
    categoryName: '',
    allCategories: [],
    tableHeader: [
      { text: 'Category Name', value: 'categoryName', align: 'center' },
    ],
  }),
  async created() {
    this.tableLoading = true
    this.allCategories = await fetchingCategories()
    this.tableLoading = false
  },
  methods: {
    async saveCategory() {
      this.loader = 'loading'
      await addingCategory({ 'categoryName': this.categoryName })
      this.loader = null
    },
  },
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
