<template>
  <v-card>
    <v-row class="mb-2 px-5">
      <v-col cols="12" md="3" class="my-auto">Tables</v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters style="grid-gap: 10px; align-items: center;">
          <v-col cols="12" md="5" class="ml-auto">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Table"
                single-line
                hide-details
                class="pt-0 mt-0"
            ></v-text-field>
          </v-col>
          <v-btn color="primary" @click.stop="dialog = true">Add Table</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
        :headers="tableHeader"
        :items="tables"
        :loading="tableLoading"
        :search="search"
        @click:row="openTableDialog"
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
            <span>Add a Table</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter Table Number"
                v-model="tableData.tableNo"
            ></v-text-field>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text
              :loading="deleteLoader"
              :disabled="deleteLoader"
              :color="tableData.id ? 'red' : 'black'"
              @click="tableData.id ? deleteTable() : dialog = false"
          >
            {{ `${ tableData.id ? 'Delete' : 'Close' }` }}
          </v-btn>

          <v-btn
              color="primary darken-1"
              text
              :loading="loading"
              :disabled="loading"
              @click="tableData.id ? updateTable() : saveTable()"
          >
            {{ `${ tableData.id ? 'Update' : 'Save' }` }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { fetchingTables, addingTable, updatingTable, deletingTable } from "../db";

export default {
  name: "ViewTables",
  data: () => ({
    search: '',
    tableData: {},
    tables: [],
    tableHeader: [
      { text: 'Table No', value: 'tableNo', align: 'center' },
    ],
    dialog: false,
    loading: false,
    deleteLoader: false,
    tableLoading: false,
  }),
  watch: {
    dialog(val) { if (!val) this.tableData = {} },
  },
  async created() {
    this.tableLoading = true
    this.tables = await fetchingTables()
    this.tableLoading = false
  },
  methods: {
    async saveTable() {
      this.loading = true
      this.tables = await addingTable(this.tableData)
      this.loading = false
      this.dialog = false
    },
    async updateTable() {
      this.loading = true
      this.tables = await updatingTable(this.tableData)
      this.loading = false
      this.dialog = false
    },
    async deleteTable() {
      this.deleteLoader = true
      this.tableData = await deletingTable(this.tableData)
      this.deleteLoader = false
      this.dialog = false
    },
    openTableDialog(table) {
      this.dialog = true
      this.tableData = table
    },
  },
}
</script>
