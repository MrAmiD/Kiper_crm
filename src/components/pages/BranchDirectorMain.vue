<template>
<section class="content">
  <branchDirectorHeader></branchDirectorHeader>
  <div class="row center-block">
    <div style="margin-bottom:15px;">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#reports">Отчеты</a></li>
        <li><a data-toggle="tab" href="#clients">Клиенты</a></li>
        <li><a data-toggle="tab" href="#emps">Сотрудники</a></li>
        <li><a data-toggle="tab" href="#stats">Аналитика</a></li>
        <li><a data-toggle="tab" href="#docs">Должностные инструкции</a></li>
      </ul>
    </div>

    <div class="row">
      <div id="reports" class="tab-pane fade in active">
          
      <div class="chart-wrap">
        <div class="chart-view">
          <input type="text" data-angleoffset="-125" data-angleArc="250" value="100" data-width="90" data-thickness="0.3" data-height="90" class="dial" data-min="0" data-max="100" data-readOnly="true" >
        </div>
        <div class="chart-item">
          <div class="chart-header">План продаж </div>
          <div class="chart-content">1500 / 2000</div>
          <div class="chart-sub-content">-</div>
        </div>
      </div>

      <div class="chart-wrap">
        <div class="chart-view">
          <input type="text" data-angleoffset="-125" data-angleArc="250" value="100" data-width="90" data-thickness="0.3" data-height="90" class="dial" data-min="0" data-max="100" data-readOnly="true" >
        </div>
        <div class="chart-item">
          <div class="chart-header">План продаж</div>
          <div class="chart-content">1500 / 2000</div>
          <div class="chart-sub-content">-</div>
        </div>
      </div>

      <div class="chart-wrap">
        <div class="chart-view">
          <input type="text" data-angleoffset="-125" data-angleArc="250" value="100" data-width="90" data-thickness="0.3" data-height="90" class="dial" data-min="0" data-max="100" data-readOnly="true" >
        </div>
        <div class="chart-item">
          <div class="chart-header">План продаж</div>
          <div class="chart-content">1500 / 2000</div>
          <div class="chart-sub-content">-</div>
        </div>
      </div>

      <div class="chart-wrap">
        <div class="chart-view">
          <input type="text" data-angleoffset="-125" data-angleArc="250" value="100" data-width="90" data-thickness="0.3" data-height="90" class="dial" data-min="0" data-max="100" data-readOnly="true" >
        </div>
        <div class="chart-item">
          <div class="chart-header">План продаж</div>
          <div class="chart-content">1500 / 2000</div>
          <div class="chart-sub-content">-</div>
        </div>          

      </div>

      <div id="stats" class="tab-pane fade in active">
        <table aria-describedby="example1_info" role="grid" id="monthReportTable" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Сотрудник</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Дата</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Статус</th>

            </tr>
          </thead>
          <tbody>
            <template v-for="report in dataMonthReports">
              <tr class="even" role="row" v-if="!report.error">
                <td class="sorting_1">{{report.user.surname}} {{report.user.name  | firstletter}}. {{report.user.fathername  | firstletter}}.</td>
                <td class="sorting_1">{{report.month.lastWorkDay}} </td>
                <td class="sorting_1"><router-link  v-bind:to="'/monthReport/'+report.id"><span class="page">Закрыть месяц</span></router-link></td>
              </tr>
            </template>
          </tbody>

        </table>




      </div>
      <div id="clients" class="tab-pane fade ">
        <table aria-describedby="example1_info" role="grid" id="clientsTable" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Наименование</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Доставка</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Условия оплаты</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Тип клиента</th>
              <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="client in dataClients">
              <tr class="even" role="row">
                <td class="sorting_1">{{client.name}}</td>
                                <td class="sorting_1">{{client.deliveryType.name}} </td>
                              <td class="sorting_1">{{client.paymentType.name}} </td>
                              <td class="sorting_1">{{client.clientType.name}} </td>
                              <td class="sorting_1">
                                <img style="max-width:50px;max-height:50px;display: inline-block;" class="img img-responsive" v-if="client.user.photo" v-bind:src="$parent.state.user.conf.userPhotoUrl + client.user.photo">

                                 {{client.user.surname}} {{client.user.name | firstletter}}. {{client.user.fathername | firstletter}}.


                              </td>
              </tr>
            </template>
          </tbody>

        </table>




      </div>
      <div id="docs" class="tab-pane fade">
        <div class="box">
          <div class="box-body ">

            <template v-if="positionFiles.positions" v-for="position in positionFiles.positions">
                    <h4>Должноcтные инструкции {{position.position.name}}</h4>
                    <template v-if="position.files" v-for="file in position.files">
                      <p style="padding-left:20px;">
                        <a :href="positionFiles.defaultUrl + file.file">{{file.filename}}</a>
                        <span>{{formatDate(file.date)}} </span>
      <button class="btn bg-red" v-on:click="deleteFile(file.id)"><i class="fa fa-times" aria-hidden="true"></i></button>

      </p>
      </template>
            <button class="btn bg-green " v-on:click="addFile(position.position.id)">Добавить</button>
            </hr>
            </template>
          </div>
        </div>

      </div>


      <div id="emps" class="tab-pane fade">


        <table aria-describedby="example1_info" role="grid" id="empTable" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Сотрудник</th>
              <th aria-label="Browser: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Должность</th>
              <th aria-label="Platform(s): activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Уровень</th>
              <th aria-label="Engine version: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">План</th>
              <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Выполнение плана</th>
              <th aria-label="CSS grade: activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">План на прошлый месяц</th>

            </tr>
          </thead>
          <tbody>
            <template v-for="user in dataUsers">
        <!--row with employers, change this to a link-->
        <tr class="even" role="row">
          <td class="sorting_1">
           <img style="max-width:50px;max-height:50px;display: inline-block;" class="img img-responsive" v-if="user.photo" v-bind:src="$parent.state.user.conf.userPhotoUrl + user.photo">
            <router-link v-bind:to="'/empInfo/'+user.id"><span class="page">{{user.surname}} {{user.name | firstletter}}. {{user.fathername | firstletter}}.</span></router-link>
            <a v-if="user.active==0" class="btn btn-success"  v-on:click="activateUser(user)" >Активировать</a>

          </td>
          <td>{{user.position.name}}</td>
          <td>{{user.grade.name}}</td>
          <td>  <router-link v-if="!user.hasPlan" v-bind:to="'/plan/'+user.id"><span class="page">Поставить план</span></router-link></td>
          <td>{{user.yearPlanCompleted}}%</td>
          <td>{{user.monthPlanCompleted}}%</td>
        </tr>
      </template>
          </tbody>

        </table>
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
import branchDirectorHeader from '../elements/branchDirectorHeader.vue'
require('datatables.net')
require('datatables.net-bs')
export default {
  name: 'Repository',
  data: function (router) {
    return {
      options: {},
      getUsers: '/users',
      dataClients: null,
      response: null,
      positionFiles: {
        positions: null
      },
      error: null,
      dataUsers: null,
      dataMonthReports: null,
      mode: {
        text: 'отключенных',
        val: 1
      },
      urlServer: this.$parent.state.serverURI
    }
  },
  components: {
    moment,
    branchDirectorHeader
  },
  filters: {
    firstletter: function (str) {
      return str.charAt(0).toUpperCase()
    }
  },
  methods: {
    formatDate: function (date) {
      return moment(date).calendar()
    },
    deleteFile: function (id) {
      var url = this.$parent.state.getPositionFilesUrl
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
      var url = this.$store.state.serverURI + this.$parent.state.getPositionFilesUrl
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
              maxFilesize: 10,
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
      this.$parent.callAPI('GET', this.$parent.state.getPositionFilesUrl).then(function (response) {
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
      this.$parent.callAPI('GET', this.getUsers).then(function (response) {
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
    activateUser: function (user) {
      var arr = [user.id]
      this.$parent.callAPI('PUT', this.getUsers + '/activate', arr).then(function (res) {
        swal(
          'Выполнено!',
          'Операция успешно выполнена',
          'success'
        )
        user.active = 1
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
    this.callPositionFiles()
    this.getEmps()
    this.getMonthReports()
    this.getClients()
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
