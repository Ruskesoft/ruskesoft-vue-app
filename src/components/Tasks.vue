<template>
  <DxDataGrid
    :data-source="taskDataStore"
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
        :allow-export-selected-data="true"
        file-name="Tasks"
      />
    <DxSelection mode="multiple"/>
    <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :title="'Task'|localize"
        />
        <DxForm>
            <!-- <DxItem
                :col-count="2"
                :col-span="2"
                item-type="group"
            > -->
                <DxItem data-field="Title"/>
                <DxItem data-field="DueDate"/>
                <DxItem data-field="Performer"/>
                <DxItem data-field="CompletePercent"/>
            <!-- </DxItem> -->
        </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="25%" 
        :caption="'Title'|localize">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="Author" 
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
        format="dd.MM.yyyy">
    </DxColumn>
    <DxColumn 
        data-field="DueDate" 
        data-type="date" 
        :caption="'DueDate'|localize" 
        format="dd.MM.yyyy">
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="Performer" 
        :caption="'Performer'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="CompletePercent" 
        data-type="number" 
        :caption="'CompletePercent'|localize" />
    <DxColumn 
        data-field="CompleteDate" 
        data-type="date" 
        :caption="'CompleteDate'|localize" 
        format="dd.MM.yyyy" />
    <DxSummary>
        <DxTotalItem/>
        <!-- <DxTotalItem
          column="Title"
          summary-type="count"
        /> -->
      </DxSummary>
  </DxDataGrid>
</template>
<script>


import { DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport, DxSelection, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';

import { mapGetters, mapActions } from "vuex"

import CustomStore from 'devextreme/data/custom_store';


export default {
  components: {
    DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxItem, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport, DxSelection, DxSummary, DxTotalItem
  },
  methods: {
    ...mapActions(["loadUsers", "loadTasks", "loadTask", "createTask", "updateTask", "deleteTask"])
  },
  computed: {
    ...mapGetters(["getUsers", "getTasks", "getTask"]),
    taskDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          await this.loadTasks();
          return this.getTasks;
        },
        byKey: async (key) => {
          await this.loadTask(key);
          return this.getTask(key);
        },
        insert: async (values) => {
          await this.createTask(values);
        },
        update: async (key, values) => {
          await this.updateTask({key, values});
        },
        remove: async (key) => {
          await this.deleteTask(key);
        }
      })
    },
  },
  async mounted() {
    await this.loadUsers();
  }
};
</script>
