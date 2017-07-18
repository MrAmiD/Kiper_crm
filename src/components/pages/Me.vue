<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div v-if="error">
          Ошибка, получения данных
        </div>
        <div class="box box-info" v-else>
          <!-- Input Addons -->
          <div v-if="response">
            <div class="box-header with-border">
              <h3 class="box-title">Редактировать свои данные</h3>
            </div>
            <div class="box-body">
                <div class="row">
                <div class="col-md-3">
                  <div class="photoUser">
                    <img :src="$parent.state.user.conf.userPhotoUrl + response.photo" alt="" class="img-responsive">
                    <button class="btn btn-default" v-on:click="uploadPhoto()">Загрузить новое изображение</button>
                  </div>
                </div>
                <div class="col-md-9">
                <div class="row">
                  <div class="col-xs-3">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-address-book"></i></span>
                        <input class="form-control" placeholder="Фамилия" type="text" v-model:value="response.surname">
                    </div>
                  </div>
                  <div class="col-xs-3">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-address-book"></i></span>
                        <input class="form-control" placeholder="Имя" type="text" v-model:value="response.name">
                    </div>
                  </div>
                  <div class="col-xs-4">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-address-book"></i></span>
                        <input class="form-control" placeholder="Отчество" type="text" v-model:value="response.fathername">
                      </div>
                  </div>
                  <div class="col-xs-2">
                    <div class="input-group">
                      <span class="input-group-addon">ID</span>
                      <input class="form-control" placeholder="ФИО" type="text" v-model:value="response.id" disabled>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-unlock-alt"></i></span>
                  <input class="form-control" placeholder="Логин" type="password" v-model:value="response.password">
                </div>
                <br/>

                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                  <input class="form-control" placeholder="E-mail" type="email" v-model:value="response.email">
                </div>
                <br/>
                <button v-on:click="saveContact()" class="btn bg-green">Сохранить данные</button>
                <a v-on:click="backBtn" class="btn bg-red">Отменить</a>
            </div>
            </div>
            </div>
            <!-- /input-group -->
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from 'jquery'
import swal from 'sweetalert2'
import {ru} from 'vue-flatpickr/dist/ru.js'
import Dropzone from 'dropzone'
export default {
  name: 'Repository',
  data: function () {
    return {
      getMe: '/users/',
      urlImage: 'https://online-bani.ru/assets/data/gallery',
      response: null,
      error: null,
      id: this.$store.state.user.id,
      fpOptions: {
        locale: ru,
        dateFormat: 'd.m.Y'
      }
    }
  },
  components: {},
  methods: {
    callUsers: function () {
      var user = this
      this.$parent.callAPI('GET', this.getMe + this.id).then(function (response) {
        console.log('getMe Response:', response)
        if (response.status !== 200) {
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
    uploadPhoto: function () {
      var token = this.$store.state.token
      var urlPage = this.getMe
      var idUser = this.id
      var reload = this.callUsers
      var server = this.$store.state.serverURI
      swal({
        title: 'Загрузить изображение',
        html: '<div class="uploadBlock"><div id="uploadGallery"></div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>',
        confirmButtonText: 'Закрыть',
        onOpen: function () {
          $(function () {
            var myDropzone = new Dropzone('#uploadGallery', {
              url: server + urlPage + idUser,
              maxFiles: 1,
              acceptedFiles: '.jpg,.png,.jpeg,.gif',
              maxFilesize: 1.5,
              headers: {
                'Authorization': token
              }
            })
            document.getElementById('uploadGallery').className = 'dropzone dz-clickable'
            myDropzone.on('complete', function () { reload() })
          })
        },
        onClose: function () {
          reload()
        }
      })
    },
    saveContact: function () {
      this.$parent.callAPI('PUT', this.getMe + this.id, this.response).then(function (res) {
        console.log('Data put:', res)
        this.$router.go(-1)
        swal('Данные сохранены', 'Нажмите для продолжения!', 'success')
        if (res.status !== 200) {
          this.error = res.statusText
          return
        }
      })
    },
    backBtn: function () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.callUsers()
  }
}
</script>
<style lang="less">
  .datetime-picker input {
    height: 4em !important;
  }
  .photoUser{
    text-align: center;
    img{
      max-height: 140px;
      margin: 0 auto;
    }
    .btn{
      width: 100%;
      padding-top: 16.5px;
      padding-bottom: 17px;
      margin-top: 24px;
      border-radius: 0;
      background: none!important;
      font-size: 14px;
      &:hover,&:focus{
        border-color: #3c8dbc;
        color: #3c8dbc;
      }

    }
  }
</style>
