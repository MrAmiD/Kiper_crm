<template>
<div class="wrapper">
  <header class="main-header">


    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
      <span class="navbar-title">
          кипер {{state.user.branch}}
        </span>

      
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <a v-on:click="meBtn">
            <i class="fa fa-cog fa-fw"></i>
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs">{{state.user.displayName}}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->




      <!-- Sidebar Menu -->
      <ul class="sidebar-menu">
        <li class="pageLink" v-if="state.user.role.id==2" v-on:click="toggleMenu">
          <router-link to="/branchDirectorMain"><i class="fa fa-id-card-o" aria-hidden="true"></i><span class="page">Главная</span></router-link>
        </li>
        <li class="pageLink" v-if="state.user.role.id==1" v-on:click="toggleMenu">
          <router-link to="/employerMain"><i class="fa fa-id-card-o" aria-hidden="true"></i><span class="page">Главная</span></router-link>
        </li>
        <li class="pageLink" v-if="state.user.role.id==3" v-on:click="toggleMenu">
          <router-link to="/users"><i class="fa fa-users" aria-hidden="true"></i><span class="page">Сотрудники</span></router-link>
        </li>
        <li class="pageLink" v-if="state.user.role.id==1" v-on:click="toggleMenu">
          <router-link to="/weekReport"><i class="fa fa-envelope" aria-hidden="true"></i><span class="page">Подать отчет</span></router-link>
        </li>
        <li class="pageLink" v-on:click="logout()">
          <router-link to="/"><i class="fa fa-sign-out"></i><span class="page">Выход</span></router-link>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

    <router-view></router-view>
  </div>
  <!-- /.content-wrapper -->

  <!-- Main Footer -->
  <footer class="main-footer">
    <strong>Copyright &copy; {{year}} <a href="http://www.gidroizol-dv.ru/">Кипер</a>.</strong> Все права защищены.
  </footer>
</div>
<!-- ./wrapper -->
</template>

<script>
// import faker from 'faker'
import 'sweetalert2/dist/sweetalert2.css'
require('hideseek')
module.exports = {
  name: 'Dash',
  data: function () {
    return {
      section: 'Dash',
      me: '',
      error: '',
      api: {
        servers: {
          url: '', // Back end server
          result: []
        }
      }
    }
  },
  computed: {
    store: function () {
      return this.$parent.$store
    },
    state: function () {
      return this.store.state
    },
    callAPI: function () {
      return this.$parent.callAPI
    },
    // demo: function () {
    //   return {
    //     displayName: faker.name.findName(),
    //     avatar: this.store.state,
    //     email: faker.internet.email(),
    //     randomCard: faker.helpers.createCard()
    //   }
    // },
    year: function () {
      var y = new Date()
      return y.getFullYear()
    }
  },

  methods: {
    changeloading: function () {
      this.store.commit('TOGGLE_SEARCHING')
    },
    toggleMenu: function (event) {
      // remove active from li
      window.$('li.pageLink').removeClass('active')

      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    },
    logout: function () {
      this.store.commit('SET_USER', null)
      this.store.commit('SET_TOKEN', null)
      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login')
    },
    meBtn: function () {
      this.$router.push('/me')
    },
    back: function () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    // Page is ready. Let's load our functions!
  }
}
</script>
<style>
.user-panel {
  height: 85px;
}

.user-panel .image {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}

.user-panel .image img {
  width: 100%;
  height: 100%;
}

.sidebar-collapse .user-panel .image {
  border-radius: 50%;
  overflow: hidden;
  width: 2.1em;
  height: 2.1em;
}

.user-menu a {
  cursor: pointer;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}

.input-group-addon {
  min-width: 50px;
}

.main-sidebar .user-panel,
.sidebar-menu,
.sidebar-menu>li.header {
  white-space: normal;
}

.navbar-title {
  font-size: 21px;
  color: #fff;
  padding-top: 10px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bolder;
  padding-left: 15px;
}
</style>
