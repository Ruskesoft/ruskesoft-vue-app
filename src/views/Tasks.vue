<template>
  <LoadPanel v-if="loading"/>
  <DxDataGrid v-else
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
        :file-name="'Tasks'|localize"/>
    <DxEditing
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :use-icons="true"
        mode="popup">
        <DxPopup
          :show-title="true"
          :title="'Task'|localize"/>
        <DxForm>
          <DxItem data-field="Title"/>
          <DxItem data-field="InitiatorID"
            editor-type="dxLookup"/>
          <DxItem data-field="PerformerID"
            editor-type="dxLookup"/>
          <DxItem data-field="PerformerMembers"
            editor-type="dxTagBox"/>
          <DxItem data-field="ObserverMembers"
            editor-type="dxTagBox"/>
          <DxItem data-field="DueDate"/>
        </DxForm>
    </DxEditing>
    <DxColumn 
        data-field="Title" 
        data-type="string"
        width="30%"
        :visible="true"
        :caption="'Title'|localize">
        <DxRequiredRule/>
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
        :visible="false"
        format="dd.MM.yyyy">
    </DxColumn>
    <DxColumn 
        data-field="Initiator.DepartmentID"
        :group-index="0"
        :visible="true"
        :caption="'InitiatorDepartment'|localize">
        <DxLookup
          :data-source="getDepartments"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="InitiatorID"
        :width="130"
        :visible="true"
        :caption="'Initiator'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="Performer.DepartmentID"
        :group-index="1"
        :visible="true"
        :caption="'PerformerDepartment'|localize">
        <DxLookup
          :data-source="getDepartments"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="PerformerID"
        :width="130"
        :visible="true"
        :caption="'Performer'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
        <DxRequiredRule/>
    </DxColumn>
    <DxColumn 
        data-field="PerformerMembers"
        :visible="false"
        :cell-template="cellTemplate"
        :calculate-filter-expression="calculateFilterExpression"
        :caption="'PerformerMembers'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="ObserverMembers"
        :visible="false"
        :cell-template="cellTemplate"
        :calculate-filter-expression="calculateFilterExpression"
        :caption="'ObserverMembers'|localize">
        <DxLookup
          :data-source="getUsers"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="DueDate" 
        data-type="date" 
        :caption="'DueDate'|localize"
        :width="120"
        :visible="true"
        format="dd.MM.yyyy">
        <DxRequiredRule/>
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
    <DxColumn 
        data-field="StatusID"
        :width="140"
        :visible="true"
        :caption="'TaskStatus'|localize">
        <DxLookup
          :data-source="getTaskStatuses"
          value-expr="ID"
          display-expr="Title"/>
    </DxColumn>
    <DxColumn 
        data-field="CompletePercent" 
        data-type="number"
        :width="130"
        :visible="true"
        :caption="'CompletePercent'|localize">
    </DxColumn>
    <DxColumn
        data-field="Comment"
        data-type="string"
        :visible="false"
        :caption="'Comment'|localize">
    </DxColumn>
  </DxDataGrid>
</template>
<script>


import { DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';

import { mapGetters, mapActions } from "vuex"

import CustomStore from 'devextreme/data/custom_store';


export default {
  components: {
    DxDataGrid, DxColumn, DxColumnChooser, DxLookup, DxEditing, DxPopup, DxForm, DxItem, DxGroupPanel, DxHeaderFilter, DxSearchPanel, DxRequiredRule, DxExport
  },
  methods: {
    ...mapActions(["loadDepartments", "loadUsers", "loadTasks", "createTask", "updateTask", "deleteTask"]),
    cellTemplate(container, options) {
      var text = (options.value || []).map(element => {return options.column.lookup.calculateCellValue(element)}).join(', ');
      container.textContent = text || '\u00A0';
      container.title = text;
    }
  },
  data() {
    return {
      loading: true,
      calculateFilterExpression: function(filterValue, operation, target) {
        const dataField = this.dataField;
        if(target === 'search' && typeof (filterValue) === 'string') {
          return [dataField, 'contains', filterValue];
        }
        else return function(data) {
          return (data[dataField] || []).indexOf(filterValue) !== -1;
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getDepartments", "getUsers", "getTaskStatuses", "getTasks"]),
    taskDataStore () {
      return new CustomStore({
        key: 'ID',
        load: async () => {
          return this.getTasks;
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
    await this.loadDepartments();
    await this.loadUsers();
    await this.loadTasks();
    this.loading = false;
  }
};
</script>
