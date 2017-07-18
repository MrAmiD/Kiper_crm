<template>
<section class="">
  <div class="row center-block">
    <div style="margin-bottom:15px;" class="col-xs-12">
      <button v-if="mode.val == 1" class="btn bg-red" v-on:click="activateChecked('deactivate')">Отключить выбранные</button>
      <button v-if="mode.val == 0" class="btn bg-green" v-on:click="activateChecked('activate')">Активировать выбранные</button>

      <button class="btn bg-gray" v-on:click="toogleMode()">Показать {{mode.text}}</button>
    </div>

    <div v-if="error">
      Список пуст
    </div>
    <table aria-describedby="example1_info" id="usrTable" class="table table-striped table-hover dataTable" v-else>
      <thead>
        <tr role="row">
          <th></th>
          <th>ФИО</th>
          <th>Должность</th>
          <th>Роль</th>
          <th>Уровень</th>
          <th>Баланс</th>
          <th>Филиал</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="response" v-for="user in response">
          <td><input type="checkbox" v-model="user.checked"></td>
          <td>{{user.surname}} {{user.name}} {{user.fathername}}</td>
          <td>
            <select class="form-control" v-model="user.position_id">
                <option v-if="dataPosition" v-for="position in dataPosition" :selected="user.position_id" :value="position.id">{{position.name}}</option>
              </select>
          </td>
          <td>
            <select class="form-control" v-model="user.role_id">
               <option v-if="dataRole" v-for="role in dataRole" :selected="user.role_id" :value="role.id">{{role.name}}</option>
              </select>
          </td>
          <td></td>
          <td>{{user.balance}}</td>
          <td>
            <select class="form-control" v-model="user.branch_id">
               <option v-if="dataBranch" v-for="branch in dataBranch" :selected="user.branch_id" :value="branch.id">{{branch.name}}</option>
              </select>
          </td>


          <td style="text-align: right;">
            <button class="btn bg-green" v-on:click="saveUser(user)"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
          </td>
        </tr>
      </tbody>
    </table>


  </div>
</section>
</template>
<script>
import swal from 'sweetalert2'
import $ from 'jquery'
require('datatables.net')
require('datatables.net-bs')
export default {
  name: 'Repository',
  data: function (router) {
    return {
      init: true,
      getUsers: '/users',
      response: null,
      error: null,
      dataPosition: null,
      dataBranch: null,
      dataRole: null,
      mode: {
        text: 'отключенных',
        val: 1
      },
      urlServer: this.$parent.state.serverURI
    }
  },
  methods: {
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
        if (user.init) {
          setTimeout(function () {
            $('#usrTable').DataTable({
              'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': [0, 7]
              }],
              'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Russian.json'
              }
            })
          }, 1000)
        }
        user.init = false
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
    this.getPosition()
    this.getBranch()
    this.getRole()
    this.callUsers()
  }
}
</script>
<style lang="less">
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
