<template>

<section class="content">

  <branchDirectorHeader></branchDirectorHeader>
  <div>
  <a v-on:click="$router.go(-1)" class="btn btn-success btn-back"><i class="fa fa-caret-left" aria-hidden="true"></i>
Назад</a>
</div>
  <div class="row center-block">
    <p v-if="response.error">{{response.error}}</p>
    <template v-else>
    <div class="col-xs-10 alert alert-info" v-if="response.plan.month">

Введите данные плана за месяц с {{response.plan.month.firstWorkDay | moment}} по  {{response.plan.month.lastWorkDay | moment}} для  {{response.plan.user.surname}} {{response.plan.user.name}}

    </div>
    <div class="col-xs-10 alert alert-warning" v-if="response.plan.year">
Введите данные плана на {{response.plan.year.firstWorkDay | momentY}} год для  {{response.plan.user.surname}} {{response.plan.user.name}}
    </div>
  <div class="col-xs-2" style="text-align:right;">
   <button type="button"  v-on:click="savePlan()"    v-bind:class="'btn back '"><i class="fa fa-save" aria-hidden="true"></i> Сохранить</button>
</div>
<div class="col-xs-12">


  <table class="table">
<tr v-if="response.plan.monthPlanTargetValues" v-for="targetValue in response.plan.monthPlanTargetValues" >
  <template v-if="targetValue.target.target_type_id<3">
<td>{{targetValue.target.name}}</td>
<td style="padding-right:5px;">     <input style="margin-bottom:5px;margin-right:5px;" class="form-control" placeholder="Наименование организации" type="text" v-model:value="targetValue.value"></td>
<td> {{targetValue.target.measurement}} </td>
</template>
</tr>
<tr v-if="response.yearPlanTargetValues" v-for="targetValue in response.yearPlanTargetValues" >
<td>{{targetValue.target.name}}</td>
<td style="padding-right:5px;">     <input style="margin-bottom:5px;margin-right:5px;" class="form-control" placeholder="Наименование организации" type="text" v-model:value="targetValue.value"></td>
<td> {{targetValue.target.measurement}} </td>
</tr>
</table>
</div>
<div class="col-xs-12 alert alert-success" style="text-align:center;">
Индивидуальные показатели
</div>
<template v-for="(target, index) in response.targets" >
<div class="col-lg-3 col-sm-4 col-xs-12"  style="margin-bottom:10px;">
<div class="input-group">
                     <span class="input-group-addon"><i class="fa fa-sitemap" aria-hidden="true"></i></span>
                     <input class="form-control" v-bind:readonly="!target.editable" placeholder="Наименование показателя" type="text" v-model:value="target.name">
                   </div>


</div>
<div class="col-lg-4  col-sm-4  col-xs-12"  style="margin-bottom:10px;">
<div class="input-group">
                <span class="input-group-addon"><i class="fa fa-list"></i></span>
                <select class="form-control" v-bind:disabled="!target.editable" id="select" v-model="target.target_type_id" >
                      <option v-if="targetTypes" v-for="targetType in targetTypes" :selected="target.target_type_id" :value="targetType.id">{{targetType.name}}</option>
                </select>
              </div>


</div>
<div class="col-lg-2 col-sm-4 col-xs-12"  style="margin-bottom:10px;">
<div class="input-group">
                     <span class="input-group-addon"><i class="fa fa-thermometer-empty" aria-hidden="true"></i>
</span>
                     <input class="form-control" v-bind:readonly="!target.editable" placeholder="Еденица измерения" type="text" v-model:value="target.measurement">
                   </div>


</div>


<div class="col-lg-2 col-sm-8 col-xs-12"  style="margin-bottom:10px;">
<div class="input-group has-success">
                     <span class="input-group-addon"><i class="fa fa-info-circle" aria-hidden="true"></i>
</span>
                     <input class="form-control " placeholder="Значение" type="text" v-model:value="target.value">
                   </div>


</div>

    <div class="col-lg-1  col-sm-4  col-xs-12"  style="margin-bottom:10px;">
     <button type="button"  v-on:click="response.targets.splice(index, 1)"    v-bind:class="'btn btn-danger '"><i class="fa fa-trash" aria-hidden="true"></i> </button>
    </div>
</template>
  <div class="col-xs-12" >
<button type="button"  v-on:click="addTarget()"    v-bind:class="'btn btn-success '"><i class="fa fa-plus" aria-hidden="true"></i> Добавить</button>
</div>



</template>

  <!-- /.box-body -->
  </div>

</section>
</template>
<script>
import swal from 'sweetalert2'
import branchDirectorHeader from '../elements/branchDirectorHeader.vue'
import moment from 'moment/moment.js'

export default {
  data: function (router) {
    return {
      options: {},
      response: {
        error: 'Данные еще не загружены'
      },
      clientTypes: {
        positions: null
      },
      targetTypes: [{
        name: 'Индивидуальная накопительная',
        id: 3
      },
      {
        name: 'Индивидуальная не накопительная',
        id: 4
      }
      ],
      error: null,
      mode: {
        text: 'отключенных',
        val: 1
      },
      urlServer: this.$parent.state.serverURI
    }
  },
  components: {
    branchDirectorHeader,
    moment
  },
  filters: {
    moment: function (date) {
      return moment(date).format('Do MMMM')
    },
    momentY: function (date) {
      return moment(date).format('YYYY')
    }
  },
  methods: {
    addTarget: function () {
      var newTarget = {
        name: '',
        measurement: '',
        target_type_id: '3',
        editable: true,
        defaultValue: '0'
      }
      this.response.targets.push(newTarget)
    },
    deleteTarget: function (target) {
      this.response.targets.pop(target)
    },
    callClientType: function () {
      var varthis = this
      this.$parent.callAPI('GET', this.$parent.state.getClientTypeUrl).then(function (response) {
        console.log('callClientType Response:', response)
        if (response.status !== 200) {
          varthis.error = response.statusText
          return
        }
        varthis.clientTypes = response.data
      }, function (response) {
        console.log('error', response)
        varthis.error = response.statusText
      })
    },
    callPayType: function () {
      var varthis = this
      this.$parent.callAPI('GET', this.$parent.state.getPayTypeUrl).then(function (response) {
        console.log('callPayType Response:', response)
        if (response.status !== 200) {
          varthis.error = response.statusText
          return
        }
        varthis.paymentTypes = response.data
      }, function (response) {
        console.log('error', response)
        varthis.error = response.statusText
      })
    },
    callDeliveryType: function () {
      var varthis = this
      this.$parent.callAPI('GET', this.$parent.state.getDeliveryTypeUrl).then(function (response) {
        console.log('callPayType Response:', response)
        if (response.status !== 200) {
          varthis.error = response.statusText
          return
        }
        varthis.deliveryTypes = response.data
      }, function (response) {
        console.log('error', response)
        varthis.error = response.statusText
      })
    },
    callPlan: function () {
      var varthis = this
      var itemId = this.$route.params.id
      this.$parent.callAPI('GET', this.$parent.state.getPlanUrl + '/' + itemId).then(function (response) {
        console.log('callMonthReport Response:', response)
        if (response.status !== 200) {
          varthis.error = response.statusText
          return
        }
        if (response.error) {
          varthis.response = null
        } else {
          varthis.response = response.data
        }
      }, function (response) {
        console.log('error', response)
        varthis.error = response.statusText
      })
    },
    callUsers: function () {
      var user = this
      this.$parent.callAPI('GET', this.getUsers + '?active=' + this.mode.val).then(function (response) {
        console.log('getUsers Response:', response)
        if (response.status !== 200) {
          console.log('getUsers Response:', response)
          user.error = response.statusText
          return
        }

        user.response = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    savePlan: function (user) {
      // var varthis = this
      this.$parent.callAPI('PUT', this.$parent.state.getPlanUrl + '/' + this.response.plan.id, this.response).then(function (res) {
        swal(
          'Готово!',
          'План успешно поставлен!',
          'success'
        )
        // varthis.callPlan()
        if (res.status !== 200) {
          this.error = res.statusText
          return
        }
      })
    },
    addClient: function () {
      var newClient = {
        name: ''
      }
      this.response.clients.push(newClient)
    },
    deleteClient: function (client) {
      this.response.clients.pop(client)
    }

  },
  mounted: function () {
    // this.callClientType()
    // this.callPayType()
    // this.callDeliveryType()
    this.callPlan()
  }
}
</script>
<style lang="less">
.fade {
    display: none;
}
.in {
    display: block;
}
.title-users {
    margin-left: 15px;
}
.addNewBtn {
    z-index: 1;
    position: relative;
    margin-bottom: 15px;
    float: right;
}
.swal2-input {
    color: #595959;
    font-weight: 400;
    &:focus {
        border-color: #3c8dbc;
    }
    &::-webkit-input-placeholder {
        color: #595959!important;
    }
}
.mySwalModal {
    .mySwal {
        height: 60px!important;
        margin-bottom: 10px !important;
    }
    .swal2-spacer {
        margin: 0 !important;
    }
    .btn.swal2-styled {
        margin-top: 5px !important;
    }
}
</style>
<style lang="less">
.addImage {
    margin-left: 30px;
    margin-top: 30px;
}
.swal2-title {
    margin-top: 20px !important;
}
.uploadBlock {
    position: relative;
    #uploadGallery {
        background: none;
        border: 3px dashed #ddd;
        margin-top: 35px;
        z-index: 1;
        transition: all ease-out 0.3s;
    }
    .fa {
        margin-top: 0;
        display: block;
        font-size: 50px;
        color: #ddd;
        z-index: 0;
        position: absolute;
        top: 50px;
        margin: 0 auto;
        left: 0;
        right: 0;
        transition: all ease-out 0.3s;
    }
    &:hover {
        #uploadGallery {
            border-color: #3c8dbc;
        }
        .fa {
            color: #3c8dbc;
        }
    }
}
.gallery {
    padding: 30px 30px 30px 40px;
    .galleryImage {
        margin-bottom: 30px;
        background-color: #000;
        position: relative;
        .deleteImage {
            position: absolute;
            top: 10px;
            right: 15px;
            color: #fff;
            z-index: 2;
            font-size: 17px;
            display: none;
        }
        .resizeImage {
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
            top: 0;
            color: #fff;
            z-index: 1;
            font-size: 17px;
            display: none;
            height: 100%;
            width: 100%;
            i {
                margin: 0 auto;
            }
        }
        a {
            display: block;
            z-index: 0;
        }
        .galleryImageBlock {
            transition: 0.8s all;
        }
        &:focus,
        &:hover {
            .galleryImageBlock {
                opacity: 0.5;
                transition: 0.8s all;
            }
            .deleteImage {
                display: block;
            }
            .resizeImage {
                display: flex;
                align-items: center;
            }
        }
    }
}
.gallery {
    font-size: 0;
    display: -ms-flexbox;
    -ms-flex-wrap: wrap;
    -ms-flex-direction: column;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    display: -webkit-box;
    display: flex;
    .galleryImage {
        -webkit-box-flex: auto;
        -ms-flex: auto;
        flex: auto;
        width: 250px;
        margin: 0.5vw;
        height: 135px;
        overflow: hidden;
        margin-bottom: 10px;
        img {
            width: 100%;
            height: auto;
        }
    }
}
@media screen and (max-width: 400px) {
    .gallery .galleryImage {
        margin: 0;
    }
    .gallery {
        padding: 0;
    }

}
</style>
<style>
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
