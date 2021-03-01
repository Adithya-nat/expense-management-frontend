<template>
  <div class="home">
    <br><br>
    Pick a day to view items bought in that day
    <br><br>
   <el-date-picker
      v-model="date"
      v-loading="loading"
      type="date"
      placeholder="Pick a day"
      @change="listItemsByDate"
      :picker-options="pickerOptions">
    </el-date-picker>
    <br><br>
     <b-button variant="outline-info" v-b-modal.modal-prevent-closing>Add item</b-button>
    <br><br>
    <span v-if="query"> Items bought on this date </span>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>Type: {{ props.row.type }}</p>
        <p>Quantity: {{ props.row.quantity}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Item Name"
      prop="itemName">
    </el-table-column>
    <el-table-column
      label="Total Price"
      prop="totalPrice">
    </el-table-column>
     <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label=" Item name"
          label-for="item-name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="item-name-input"
            type="text"
            v-model="itemPayload.itemname"
            required
          ></b-form-input>
        </b-form-group>
         <b-form-group
          label="Type"
          label-for="type-input"
          invalid-feedback="Type is required"
        >
           <b-form-select
          id="type-input"
          v-model="itemPayload.type"
          :options="types"
          required
        ></b-form-select>
        </b-form-group>
        <b-form-group
          label="Select date"
          label-for="date-input"
          invalid-feedback="Date is required"
        >
        <b-form-datepicker
      id="date-input"
      v-model="inputDate"
      today-button
      reset-button
      close-button
      locale="en"
    ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          label="Quantity"
          label-for="qauntity-input"
          invalid-feedback="Quantity is required"
        >
          <b-form-input
            id="qauntiy-input"
            type="number"
            v-model="itemPayload.quantity"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Total price"
          label-for="price-input"
          invalid-feedback="Price is required"
        >
          <b-form-input
            id="Price-input"
            type="number"
            v-model="itemPayload.totalprice"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </el-table>
    <div v-if = "noData">
  No data available for selected date
</div>
  </div>
</template>

<script>
import Items from '../services/backend';
// @ is an alias to /src
export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        date: '',
        tableData: [],
        inputDate: '',
        itemPayload: {},
        query: false,
        showTable: false,
        noData: false,
        types: [{ text: 'Select One', value: null }, 'Tech Gadgets', 'Groceries', 'Food/Snacks', 'Transport', 'Fashion', 'Household', 'Medical', 'Entertainment', 'Pet','Personal Care' ,'Others']
      };
    },
    methods: {
      listItemsByDate(event) {
        this.tableData.length = 0;
        console.log('inside date event');
        console.log(event);
        console.log(this.date.getDate());
        console.log(this.date.getMonth());
        console.log(this.date.getFullYear());
        const payload = {
          day: this.date.getDate(),
          month: this.date.getMonth() +1,
          year: this.date.getFullYear()
        };
        Items.getItemByDate(payload).then((data) => {
          console.log('Got items by date');
          console.log(data.data);
          if(data.data.length === 0) {
            this.showTable = false;
            this.noData = true;
          }
          else {
            this.showTable = true;
            this.noData = false;
          }
          data.data.forEach(item => {
            this.tableData.push(item);
          });
          this.query = true;
          console.log(this.tableData);
        }).catch((error) => {
          console.log('Error from making items by date call');
          console.log(error);
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        return valid;
      },
      resetModal() {
        this.itemPayload = {};
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault();
        // Trigger submit handler
        this.handleSubmit();
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return;
        }
        // Push the name to submitted names
        console.log('Form submitted successfully');

        const getDate = string => (([year, month, day]) => ({ month, day, year }))(string.split('-'));

        console.log(getDate(this.inputDate));

        const dateDetails = getDate(this.inputDate);
        
        this.itemPayload.day = dateDetails.day;
        this.itemPayload.month = dateDetails.month;
        this.itemPayload.year = dateDetails.year;

        console.log(this.itemPayload);

        Items.createItem(this.itemPayload).then((data) => {
          console.log(data);
        this.$bvToast.toast('Item added successfully', {
          title: 'Done',
          variant: 'success',
          solid: true
        }).catch((error) => {
          console.log('error wile creating item');
          console.log(error);
        })
      
        });
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  };
</script>
