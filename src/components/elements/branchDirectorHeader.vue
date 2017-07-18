<template>
<div class="row center-block">
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
      Филиал {{$parent.$parent.state.user.branch}}
    </p>
    <p>
      Руководитель филиала
    </p>
  </div>
  <div class="col-md-3" style="text-align:right;">
    <p>
      Дaтa регистрации: {{formatDate(parent.state.user.regDate)}}
    </p>
    <p>
      Дaтa активности: {{formatDate()}}
    </p>
  </div>
</div>
</template>
<script>
import moment from 'moment/moment.js'
import 'moment/locale/ru.js'
export default {
  data: function (router) {
    return {
      parent: this.$parent.$parent
    }
  },
  components: {
    moment
  },
  methods: {
    formatDate: function (date) {
      return moment(date).calendar()
    }
  }
}
</script>
