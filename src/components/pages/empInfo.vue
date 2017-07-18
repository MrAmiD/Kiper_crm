<template>
<section class="content">
  <employerHeader></employerHeader>

  <div class="row center-block" style="margin: 0px;">
    <template v-for="user in dataUsers" v-if="user.id == dataEmployerId">
      <div class="col-md-9">
        <h2 class="h2">Информация о сотруднике</h2>
        <!--Batter create object employer, and new func for init him-->
        <p class="emplName">{{user.surname}} {{user.name}}  {{user.fathername}}</p>
        <!--<p>{{user}} </p>-->
        <p>
          Филиал   {{user.branch_id}}
        </p>
        <p>
          Должность:   {{user.position.name}}
        </p>
      </div>
      <div class="col-md-3" style="text-align:right;">
        <p>
          Дaтa регистрации:  {{formatDate(user.regDate)}}
        </p>
        <p>
          Дaтa активности: {{formatDate()}}
        </p>
      </div>
    </template>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div style="margin-bottom:15px;">
        <ul class="nav nav-tabs">
          <li><a data-toggle="tab" href="#emps">Сотрудники</a></li>
          <li><a data-toggle="tab" href="#branch">Филиалы</a></li>
          <li><a data-toggle="tab" href="#clients">Клиенты</a></li>
          <li class="active"><a data-toggle="tab" href="#plan">Индивидуальные планы</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="row center-block">
      <div class="row">
        <div class="col-md-12">
          <div id="clients" class="tab-pane fade ">
            <table aria-describedby="example1_info" role="grid" id="clientsTable" class="table table-bordered table-striped dataTable">
              <thead>
              <tr role="row">
                <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Наименование</th>
                <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Доставка</th>
                <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Условия оплаты</th>
                <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Тип клиента</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="client in dataClientsById">
                <tr class="even" role="row">
                  <td class="sorting_1 ">{{client.name}}</td>
                  <td class="sorting_1">{{client.deliveryType.name}} </td>
                  <td class="sorting_1">{{client.paymentType.name}} </td>
                  <td class="sorting_1">{{client.clientType.name}} </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <div id="plan" class="tab-pane fade in active">

            <table aria-describedby="example1_info" role="grid" id="empTable" class="table table-bordered table-striped dataTable">
              <thead>
              <tr role="row">
                <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Даты</th>
                <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Просмотр</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="plan in dataYearPlans">
                <tr class="even" role="row">
                  <td class="sorting_1">
                    План на {{plan.year.firstWorkDay | year}} год
                  </td>
                  <td>  <router-link  v-bind:to="'/viewplan/year/'+plan.id"><span class="page">Смотреть план</span></router-link></td>

                </tr>
              </template>
              <template v-for="plan in dataMonthPlans">
                <tr class="even" role="row">
                  <td class="sorting_1">
                    План на {{plan.month.firstWorkDay | month}}  {{plan.month.firstWorkDay | year}} года
                  </td>
                  <td>  <router-link v-bind:to="'/viewplan/month/'+plan.id"><span class="page">Смотреть план</span></router-link></td>

                </tr>
              </template>
              </tbody>

            </table>
          </div>
        </div>
      <!-- /.box-body -->
      </div>
  </div>

</section>
</template>
<script>
import $ from 'jquery'
import swal from 'sweetalert2'
import Dropzone from 'dropzone'
import moment from 'moment/moment.js'
import 'moment/locale/ru.js'
import employerHeader from '../elements/employerHeader.vue'
require('datatables.net')
require('datatables.net-bs')
export default {
  name: 'Repository',
  data: function (router) {
    return {
      options: {},
      getUsers: '/users',
      getPositionFiles: '/positionfiles',
      response: null,
      positionFiles: {
        positions: null
      },
      error: null,
      dataUsers: null,
      dataMonthReports: null,
      dataMonthPlans: null,
      dataYearPlans: null,
      dataClients: null,
      dataClientsById: null,
      dataEmployerId: this.$route.params.id,
      parent: this.$parent,
      mode: {
        text: 'отключенных',
        val: 1
      },
      urlServer: this.$parent.state.serverURI
    }
  },
  components: {
    moment,
    employerHeader
  },
  filters: {
    firstletter: function (str) {
      return str.charAt(0).toUpperCase()
    },
    month: function (date) {
      return moment(date).format('MMMM')
    },
    year: function (date) {
      return moment(date).format('Y')
    }
  },
  methods: {
    formatDate: function (date) {
      return moment(date).calendar()
    },
    deleteFile: function (id) {
      var url = this.getPositionFiles
      var parent = this.$parent
      var varthis = this
      swal({
        title: 'Вы уверены?',
        text: 'Вы не сможете восстановить этот файл!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Нет',
        closeOnConfirm: false
      }).then(function () {
        parent.callAPI('DELETE', url + '/' + id).then(function (res) {
          swal(
            'Удален!',
            'Файл успешно удален',
            'success'
          )
          if (res.status !== 200) {
            this.error = res.statusText
            return
          }
          varthis.callPositionFiles()
        })
      })
    },
    addFile: function (positionId) {
      var url = this.$store.state.serverURI + this.getPositionFiles
      var token = this.$store.state.token
      var reload = this.callPositionFiles
      swal({
        title: 'Загрузите файлы',
        html: '<div class="uploadBlock"><div id="uploadGallery"></div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>',
        confirmButtonText: 'Закрыть',
        onOpen: function () {
          $(function () {
            var myDropzone = new Dropzone('#uploadGallery', {
              url: url + '/' + positionId,
              acceptedFiles: '.doc,.pdf,.docx,.xls,.xlsx',
              maxFilesize: 3,
              headers: {
                'Authorization': token
              }
            })
            document.getElementById('uploadGallery').className = 'dropzone dz-clickable'
            myDropzone.on('complete', function () {
              reload()
            })
          })
        },
        onClose: function () {}
      })
    },
    callPositionFiles: function () {
      var user = this
      this.$parent.callAPI('GET', this.getPositionFiles).then(function (response) {
        console.log('callPositionFiles Response:', response)
        if (response.status !== 200) {
          console.log('getUsers Response:', response)
          user.error = response.statusText
          return
        }
        user.positionFiles = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
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
    saveUser: function (user) {
      this.$parent.callAPI('PUT', this.getUsers + '/' + user.id, user).then(function (res) {
        swal(
          'Обновлен!',
          'Пользователь успешно обновлен',
          'success'
        )
        if (res.status !== 200) {
          this.error = res.statusText
          return
        }
      })
    },
    activateChecked: function (mode) {
      var varthis = this
      var arr = this.response.filter(function (user) {
        return user.checked
      }).map(function (user) {
        return user.id
      })

      this.$parent.callAPI('PUT', this.getUsers + '/' + mode, arr).then(function (res) {
        swal(
          'Выполнено!',
          'Операция успешно выполнена',
          'success'
        )
        varthis.callUsers()
        if (res.status !== 200) {
          this.error = res.statusText
          return
        }
      })
    },
    toogleMode: function () {
      if (this.mode.val === 1) {
        this.mode.val = 0
        this.mode.text = 'активных'
      } else {
        this.mode.val = 1
        this.mode.text = 'отключенных'
      }
      this.callUsers()
    },
    getClients: function () {
      var user = this
      this.$parent.callAPI('GET', this.$parent.state.getClientsUrl).then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.dataClients = response.data
        console.log('getClients Response:', response)
        setTimeout(function () {
          $('#clientsTable').DataTable({
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Russian.json'
            }
          })
        }, 1000)
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getClientsByUserId: function () {
      var user = this
      var empId = this.dataEmployerId
      console.log('empId = ', empId)
      user.dataClientsById = []
      var client = {
        name: 'Василий',
        deliveryType: {
          id: '12',
          name: 'Самовывоз'
        },
        paymentType: {
          id: '1',
          name: 'Наличные'
        },
        clientType: {
          id: '1',
          name: 'Оптовик'
        }
      }
      user.dataClientsById.push(client)
      user.dataClientsById.push(client)
      user.dataClientsById.push(client)
      return
    },
    getPosition: function () {
      var user = this
      this.$parent.callAPI('GET', '/position').then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.dataPosition = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getBranch: function () {
      var user = this
      this.$parent.callAPI('GET', '/branch').then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.dataBranch = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getEmps: function () {
      var user = this
      console.log('route = ', this.$route)
      console.log('user = ', user)
      this.$parent.callAPI('GET', '/users').then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        console.log('getEmps Response:', response)
        user.dataUsers = response.data
        setTimeout(function () {
          $('#empTable').DataTable({
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Russian.json'
            }
          })
        }, 1000)
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getMonthReports: function () {
      var user = this
      this.$parent.callAPI('GET', this.$parent.state.getMonthReportUrl).then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        console.log('getMonthReports Response:', response)
        user.dataMonthReports = response.data
        setTimeout(function () {
          $('#monthReportTable').DataTable({
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Russian.json'
            }
          })
        }, 1000)
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getMonthPlans: function () {
      var user = this
      this.$parent.callAPI('GET', this.$parent.state.getMonthPlanUrl).then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        console.log('getMonthReports Response:', response)
        user.dataMonthPlans = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getYearPlans: function () {
      var user = this
      this.$parent.callAPI('GET', this.$parent.state.getYearPlanUrl).then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        console.log('getYearPlans Response:', response)
        user.dataYearPlans = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    getRole: function () {
      var user = this
      this.$parent.callAPI('GET', '/userrole').then(function (response) {
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.dataRole = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    }

  },
  mounted: function () {
    this.getMonthPlans()
    this.getYearPlans()
    this.getClients()
    this.getEmps()
    this.getBranch()
    this.getClientsByUserId()
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
.emplName{
  font-size: 18px;
}
.h2{
  font-size: 25px;
  margin-top: 0px;
}
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
