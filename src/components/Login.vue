<template>
  <div class="container container-table loginPage">
      <div class="row vertical-5p">
        <div class="container">

          <div class="text-center col-md-4 col-sm-offset-4">
            <h2>Кипер</h2>
            <!-- errors -->
            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#auth">Авторизация</a></li>
              <li><a data-toggle="tab" href="#reg">Регистрация</a></li>
            </ul>

            <div class="tab-content">

              <div id="auth" class="tab-pane fade in active">
                  <div v-if=responseAuth class="text-red"><p>{{responseAuth}}</p></div>
                <form class="ui form loginForm" >
                <br>
                <div>
                  <input class="form-control" name="email" placeholder="Email" type="text" v-model="email">
               </div>
               <br>
               <div>
                  <input class="form-control" name="password" placeholder="Пароль" type="password" v-model="password">
               </div>
               <br>
               <button type="button"  v-on:click="checkCredsAuth()"    v-bind:class="'w100 btn btn-success btn-lg ' + loading">Войти</button>
               </form>
              </div>
              <div id="reg" class="tab-pane fade">
                  <div v-if=responseReg class="text-red"><p>{{responseReg}}</p></div>
                <form class="ui form loginForm"  >
                <br>
                <div>
                  <input class="form-control" name="email" placeholder="Email" type="text" v-model="regData.email">
               </div>
               <br>
               <div>
                  <input class="form-control" name="password" placeholder="Пароль" type="password" v-model="regData.password">
               </div>
               <br>
               <div>
                  <input class="form-control" name="surname" placeholder="Фамилия" type="text" v-model="regData.surname">
               </div>
               <br>
               <div>
                  <input class="form-control" name="name" placeholder="Имя" type="text" v-model="regData.name">
               </div>
               <br>
               <div>
                  <input class="form-control" name="fathername" placeholder="Отчество" type="text" v-model="regData.fathername">
               </div>
               <br>
               <div >

               <select class="form-control" id="select" v-model="regData.position_id" title="Должность" placeholder="Должность"  >
                 <option v-if="dataPosition" v-for="position in dataPosition" :selected="regData.position_id" :value="position.id">
                    {{position.name}}
                 </option>
               </select>
              </div>
             <br>
             <div >

             <select class="form-control"  v-model="regData.branch_id"   >
               <option v-if="dataBranch" v-for="branch in dataBranch" :selected="regData.branch_id" :value="branch.id">
                  {{branch.name}}
               </option>
             </select>
            </div>
            <br>


               <button type="button"  v-on:click="register()" v-bind:class="'w100 btn btn-success btn-lg ' + loading">Зарегестрироваться</button>
  <div v-if=responseRegSuccess class="text-green"><p>{{responseRegSuccess}}</p></div>
               </form>
              </div>
            </div>
            <!-- login form -->

          </div>
        </div>
      </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Login',
  data: function (router) {
    return {
      section: 'Login',
      dataBranch: null,
      dataPosition: null,
      loading: '',
      username: '',
      regData: {
        email: '',
        password: '',
        fathername: '',
        surname: '',
        name: '',
        position_id: 1,
        branch_id: 1
      },
      photo: '',
      responseAuth: '',
      responseReg: '',
      responseRegSuccess: ''
    }
  },
  methods: {
    register: function () {
      var store = this.$store
      var self = this
      this.toggleLoading()
      this.resetResponse()
      store.commit('TOGGLE_LOADING')
      this.$parent.callAPI('POST', '/users', this.regData).then(function (response) {
        store.commit('TOGGLE_LOADING')
        if (response.data) {
          var data = response.data
          if (data.error) {
            self.responseReg = data.error.name
          } else {
            //  success. Let's load up the dashboard
            self.responseRegSuccess = 'Регистрация прошла успешно. После подтверждения вашего аккаунта администратором, вы сможете войти.'
          }
        } else {
          self.responseReg = 'Нет ответа от сервера'
        }

        self.toggleLoading()
      })
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
    checkCredsAuth: function () {
      //  Change submit button
      var self = this
      var store = this.$store
      this.toggleLoading()
      this.resetResponse()
      store.commit('TOGGLE_LOADING')

      //  Login
      this.$parent.callAPI('POST', '/login', { email: this.email, password: this.password }).then(function (response) {
        store.commit('TOGGLE_LOADING')
        if (response.data) {
          var data = response.data
          if (data.error) {
            if (data.error.name) { //  Object from LDAP at this point
              switch (data.error.name) {
                case 'InvalidCredentialsError' : self.responseAuth = 'Имя пользователя или пароль введены неверно'; break
                default: self.responseAuth = data.error.name
              }
            } else {
              self.responseAuth = data.error
            }
          } else {
            //  success. Let's load up the dashboard
            if (data.user) {
              store.commit('SET_USER', data.user)
              // var token = 'Bearer ' + data.token
              var token = 'Bearer ' + data.token
              store.commit('SET_TOKEN', token)
              // Save to local storage as well
              if (window.localStorage) {
                window.localStorage.setItem('user', JSON.stringify(data.user))
                window.localStorage.setItem('token', token)
              }
              this.$router.push(data.redirect)
            }
          }
        } else {
          self.response = 'Did not receive a response. Please try again in a few minutes'
        }

        self.toggleLoading()
      }, function (response) {
        // error
        store.commit('TOGGLE_LOADING')
        console.log('Error', response)
        self.response = 'Сервер недоступен'
        self.toggleLoading()
      })
    },
    toggleLoading: function () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse: function () {
      this.response = ''
    }
  },
  mounted: function () {
    this.getPosition()
    this.getBranch()
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #575778 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-5p {
  padding-top: 5%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.loginPage input.form-control {
  height: 2em;
  background-color:transparent;
  border:none;
  border-bottom:1px solid #fff;
}
button.w100 {
    width: 100%;
}

.loginPage .nav>li>a {
  color:#8989A0;
}

.loginPage .nav-tabs>li.active>a,.loginPage .nav-tabs>li.active>a:focus,.loginPage .nav-tabs>li.active>a:hover {
    color: #fff;
    cursor: default;
  border:none;
    border-bottom: 1px solid #fff;
        background-color: transparent;
}
.loginPage .nav > li > a:hover,.loginPage .nav > li > a:active,.loginPage .nav > li > a:focus {
    color: #f7f7f7;
     background:none;
     border:none;
border-bottom: 1px solid #f7f7f7;
}

</style>
