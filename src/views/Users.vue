<template>
  <DxDataGrid
    :data-source="userDataStore"
    :show-borders="true"
    :column-auto-width="false"
    :hower-state-enabled="true"
    key-expr="ID">
    <DxSearchPanel :visible="true"/>
    <DxHeaderFilter :visible="true"/>
    <DxGroupPanel :visible="true"/>
    <DxColumnChooser :enabled="true"/>
    <DxExport
        :enabled="true"
        file-name="Users"/>
    <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup">
        <DxPopup
          :show-title="true"
          :title="'User'|localize"/>
        <DxForm>
            <DxItem
                :col-count="2"
                :col-span="2"
                item-type="group">
                <DxItem data-field="Title"/>
                <DxItem data-field="Email"/>
                <DxItem data-field="DepartmentID"/>
            </DxItem>
        </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="20%"
        :visible="true"
        :caption="'Name'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="Email" 
        data-type="string"
        width="20%"
        :visible="true"
        :caption="'Email'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="DepartmentID"
        :visible="true"
        :caption="'Department'|localize">
        <DxLookup
          :data-source="getDepartments"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="AuthorID"
        :visible="false"
        :caption="'Author'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="Created" 
        data-type="date" 
        :caption="'Created'|localize"
        :visible="true"
        format="dd.MM.yyyy">
    </DxColumn>
    <DxColumn 
        data-field="EditorID"
        :visible="false"
        :caption="'Editor'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="Modified" 
        data-type="date" 
        :caption="'Modified'|localize"
        :visible="false"
        format="dd.MM.yyyy">
    </DxColumn>
    <DxSummary>
        <DxTotalItem
          column="Title"
          summary-type="count"/>
      </DxSummary>
  </DxDataGrid>
</template>
<script>


import { DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';

import { mapGetters, mapActions } from "vuex"

import CustomStore from 'devextreme/data/custom_store';


export default {
  components: {
    DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxItem, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport, DxSummary, DxTotalItem
  },
  methods: {
    ...mapActions(["loadUsers", "loadUsers", "createUser", "updateUser", "deleteUser"])
  },
  computed: {
    ...mapGetters(["getDepartments", "getUsers"]),
    userDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          await this.loadUsers();
          return this.getUsers;
        },
        insert: async (values) => {
          await this.createUser(values);
        },
        update: async (key, values) => {
          await this.updateUser({key, values});
        },
        remove: async (key) => {
          await this.deleteUser(key);
        }
      })
    },
  },
  async mounted() {
    await this.loadDepartments();
  }
};
</script>
