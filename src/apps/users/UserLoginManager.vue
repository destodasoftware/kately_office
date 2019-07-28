<template>
  <div class="row top">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card bg-light">
        <div class="card-header">Login Kately</div>
        <div class="card-body">
          <div class="form-group">
            <label>Username</label>
            <input v-model="user.username" type="text" placeholder="Masukan Username" class="form-control">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="user.password" type="password" placeholder="Masukan Password" class="form-control">
          </div>
          <div class="form-group">
            <button @click="apiTokenAuth" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import MixinNotif from '@/mixins/MixinNotif'

export default {
  name: 'UserLoginManager',
  mixins: [
    MixinNotif
  ],
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    apiTokenAuth () {
      const url = `${process.env.ROOT_API}/office/api-token-auth/`
      this.axios.post(url, this.user)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user_id', response.data.user_id)
          localStorage.setItem('email', response.data.email)
          this.notifSuccess('Anda berhasil login')
          this.$router.push({name: 'DashboardMainManager'})
        })
        .catch((error) => {
          this.notifError(error)
        })
    }
  }
}
</script>

<style>
.top {
  margin-top: 100px;
}
</style>
