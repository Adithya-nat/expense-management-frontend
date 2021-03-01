<template>
  <div class="about">
    <br><br>
    <el-dropdown @command="handleCommand">
  <el-button type="primary">
    Select Interval type<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command = "month">Monthly</el-dropdown-item>
    <el-dropdown-item command = "year">Yearly</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<br>
<br>
<div v-if="monthly">  
  Monthly
  <br>
  <el-date-picker
      v-model="date"
      type="month"
      @change="getDateValue"
      placeholder="Pick a month">
    </el-date-picker>
    <div v-if="xaxis">
    <graph-bar
            :width="1000"
            :height="400"
            :axis-min="0"
            :axis-max="maxPrice+1000"
            :labels="xaxis"
            :values="yaxis">
        <note :text="'Bar Chart'"></note>
        
    </graph-bar>
    <el-card id = "stats" shadow="hover"  class="box-card">
  <div slot="header" class="clearfix">
    <span>Some stats about this month</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
</el-card> 
    </div>

</div>
<div v-if="yearly">Yearly</div>
  </div>
</template>
<script>
import Items from '../services/backend';

export default {
  data() {
    return {
      monthly: false,
      yearly: false,
      xaxis: [],
      yaxis: [],
      date: '',
      payload: {},
      maxPrice: 1000
    }
  },
  methods: {
    handleCommand(command) {

      console.log('Command clicked'+ command);
      this.$message('click on item ' + command);
      switch(command) {
        case 'month':
          this.monthly = true;
          this.yearly = false;
          break;
        case 'year': 
          this.monthly = false;
          this.yearly = true;
          break;
        default: 
          this.yearly = false;
          this.monthly = true;
      }
    },
    yearlyClicked() {
      this.yearly = true;
      this.monthly = false;
    },
    getDateValue() {
      console.log('Month picked');
      console.log(typeof this.date);
      console.log(this.date);
      console.log('inside date event');
      this.payload = {};
        
        console.log(this.date.getDate());
        console.log(this.date.getMonth());
        console.log(this.date.getFullYear());
        this.payload = {
          month: this.date.getMonth() +1,
          year: this.date.getFullYear()
        };
        this.calculateGraphData();
    },
    calculateGraphData() {
      let graphData = {};
      Items.getItemByMonth(this.payload).then((data) => {
        console.log('Items by month successfully recieved');
        console.log(data);
        data.data.forEach(item => {
          if(graphData[item.type]) {
            graphData[item.type]+=item.totalPrice;
            if(this.maxPrice < graphData[item.type])
              this.maxPrice = graphData[item.type];
          }
          else {
            graphData[item.type] = item.totalPrice;
            if(this.maxPrice < graphData[item.type])
              this.maxPrice = graphData[item.type];
          }
        });
        console.log(graphData);
        console.log('Mx price'+ this.maxPrice);
        this.xaxis = Object.keys(graphData);
        this.yaxis = Object.values(graphData);
        console.log(Object.keys(graphData));
      })

    }
  }
}
</script>
<style>
#stats {
  width: 50%;
  margin: 0 auto;
}
</style>
