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
        :search="search"
        @click:row="openCategoryDialogue"
        hide-default-footer
        class="elevation-1"
    ></v-data-table>

    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <v-card>
        <v-form>
          <v-card-title>
            <span>{{ `${categoryData.id ? 'Update' : 'Add a'}` }} Category</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter Category Name"
                v-model="categoryData.categoryName"
            ></v-text-field>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              :color="categoryData.id ? 'red' : 'black'"
              text
              :loading="deleteLoader"
              :disabled="deleteLoader"
              @click="categoryData.id ? deleteCategory() : dialog = false"
          >
            {{ `${ categoryData.id ? 'Delete' : 'Close' }` }}
          </v-btn>

          <v-btn
              color="primary darken-1"
              text
              :loading="loading"
              :disabled="loading"
              @click="categoryData.id ? updateCategory() : saveCategory()"
          >
            {{ `${ categoryData.id ? 'Update' : 'Save' }` }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { addingCategory, fetchingCategories, updatingCategory, deletingCategory } from '../db'

export default {
  name: "ViewCategories",
  data: () => ({
    search: '',
    categoryData: {},
    allCategories: [],
    tableHeader: [
      { text: 'Category Name', value: 'categoryName', align: 'center' },
    ],
    dialog: false,
    loading: false,
    deleteLoader: false,
    tableLoading: false,
  }),
  watch: {
    dialog(val) { if (!val) this.categoryData = {} },
  },
  async created() {
    this.tableLoading = true
    this.allCategories = await fetchingCategories()
    this.tableLoading = false
  },
  methods: {
    async saveCategory() {
      this.loading = true
      this.allCategories = await addingCategory(this.categoryData)
      this.loading = false
      this.dialog = false
    },
    async updateCategory() {
      this.loading = true
      this.allCategories = await updatingCategory(this.categoryData)
      this.loading = false
      this.dialog = false
    },
    async deleteCategory() {
      this.deleteLoader = true
      this.allCategories = await deletingCategory(this.categoryData)
      this.deleteLoader = false
      this.dialog = false
    },
    openCategoryDialogue(category) {
      this.dialog = true
      this.categoryData = category
    },
  },
}
</script>
