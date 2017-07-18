<template>

<div class="row center-block">
  <aside id="rightsidebar" class="control-sidebar control-sidebar-dark" style="position: fixed;bottom: 0;padding-left: 10px;padding-top: 60px;    background: #393848;">
<p>Должностные инструкции</p>
<hr>
<template v-if="positionFiles && positionFiles.files" v-for="file in positionFiles.files">
  <p>
    <a :href="positionFiles.defaultUrl + file.file">{{file.filename}}</a>
    <br>
    <span>{{formatDate(file.date)}} </span>


</p>
<hr>
</template>
  <a href="javascript:;" onClick="$('#rightsidebar').toggleClass('control-sidebar-open');" style="font-size:16px;position:absolute;right:10px; top:60px;color:red;"><i class="fa fa-close"></i></a>
  </aside>
  <div class="col-md-1" style="text-align:center;">
    <span>
      <img class="img img-responsive" v-if="parent.state.user.photo" v-bind:src="parent.state.user.conf.userPhotoUrl + parent.state.user.photo">


       <i style="font-size:140px;" class="fa fa-user-secret" aria-hidden="true" v-else></i></span>

    </div>
    <div class="col-md-8">
      <h3>
  {{parent.state.user.surname}}     {{parent.state.user.name}}   {{parent.state.user.fathername}}
      </h3>
      <p>
        Филиал   {{parent.state.user.branch}}
      </p>
      <p>
        Должность:   {{parent.state.user.position}}
      </p>
    </div>
    <div class="col-md-3" style="text-align:right;">
        <p>
          Дaтa регистрации:  {{formatDate(parent.state.user.regDate)}}
        </p>
        <p>
          Дaтa активности: {{formatDate()}}
        </p>
        <a class="toggleButton btn-line" onClick="$('#rightsidebar').toggleClass('control-sidebar-open');" href="javascript:;"  role="button">Должностные инструкции</a>
    </div>
</div>
</template>
<script>
import moment from 'moment/moment.js'
import 'moment/locale/ru.js'
export default {
  data: function (router) {
    return {
      parent: this.$parent.$parent,
      positionFiles: {
        files: null
      }
    }
  },
  components: {
    moment
  },
  methods: {
    formatDate: function (date) {
      return moment(date).calendar()
    },
    callPositionFiles: function () {
      var user = this
      this.parent.callAPI('GET', this.parent.state.getPositionFilesUrl).then(function (response) {
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
    }
  },
  mounted: function () {
    this.callPositionFiles()
  }
}
</script>
