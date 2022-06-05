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
                v-model="tableNo"
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
              @click="saveTable"
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
import { fetchingTables, addingTable } from "../db";

export default {
  name: "ViewTables",
  data: () => ({
    search: '',
    tableNo: '',
    tableHeader: [
      { text: 'Table No', value: 'tableNo', align: 'center' },
    ],
    tables: [],
    dialog: false,
    loader: null,
    loading: false,
    tableLoading: false,
  }),
  async created() {
    this.tableLoading = true
    this.tables = await fetchingTables()
    console.log('tables ', this.tables)
    this.tableLoading = false
  },
  methods: {
    async saveTable() {
      this.loader = 'loading'
      this.tables = await addingTable({ tableNo: this.tableNo })
      this.loader = null
      this.dialog = false
    },
  },
}
</script>
