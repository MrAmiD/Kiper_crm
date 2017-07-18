import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
// New
import Users from './components/pages/Users.vue'
import BranchDirectorMain from './components/pages/BranchDirectorMain.vue'
import EmployerMain from './components/pages/EmployerMain.vue'
import WeekReport from './components/pages/WeekReport.vue'
import MonthReport from './components/pages/MonthReport.vue'
import AddPlan from './components/pages/AddPlan.vue'
import ViewPlan from './components/pages/ViewPlan.vue'
import Me from './components/pages/Me.vue'
import empInfo from './components/pages/empInfo.vue'
// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  }, {
    path: '/',
    component: DashView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/users',
        component: Users,
        name: 'Users',
        description: 'List of users'
      }, {
        path: '/branchDirectorMain',
        component: BranchDirectorMain,
        name: 'Users',
        description: 'List of users'
      }, {
        path: '/employerMain',
        component: EmployerMain,
        name: 'Users',
        description: 'List of users'
      }, {
        path: '/weekReport',
        component: WeekReport,
        name: 'Users',
        description: 'List of users'
      }, {
        path: '/monthReport/:id',
        component: MonthReport,
        name: 'Редактировать отделение',
        description: 'Редактировать отделение'
      }, {
        path: '/plan/:id',
        component: AddPlan,
        name: 'Редактировать отделение',
        description: 'Редактировать отделение'
      }, {
        path: '/empInfo/:id',
        component: empInfo,
        name: 'Информация о сотруднике',
        description: 'Информация о сотруднике'
      }, {
        path: '/viewplan/:type/:id',
        component: ViewPlan,
        name: 'Редактировать отделение',
        description: 'Редактировать отделение'
      }, {
        path: '/me',
        component: Me,
        name: 'Личные данные',
        description: 'Редактировать личные данные'
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
