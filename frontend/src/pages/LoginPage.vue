<template>
  <div class="flex flex-center">
    <div class="login-container">
      <div class="logo-header">
        <img src="../assets/logo.svg" alt="HL7 FHIR Taiwan" />
        <div class="login-title">登入 | Login</div>
      </div>
      <form class="form-container" @submit.prevent="handleLogin">
        <div class="input-container">
          <input
            type="text"
            id="username"
            v-model="username"
            class="custom-input"
            placeholder="帳號"
          />
        </div>
        <div class="input-container">
          <input
            type="password"
            id="password"
            v-model="password"
            class="custom-input"
            placeholder="密碼"
          />
        </div>
        <button type="submit" class="login-button">登入</button>
        <div class="forgot-password-container">
          <span class="line"></span>
          <button type="button" class="forgot-button" @click="handleChangePassword">
            沒有帳號?
          </button>
          <span class="line"></span>
        </div>
        <button type="button" class="register-button" @click="handleRegister">註冊</button>
      </form>
      <div class="footer">FHIR Taiwan Open IG Registry Workgroup</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const API_BASE_URL = "https://api.registry.fhir.tw";

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, {
          username: username.value,
          password: password.value
        });

        if (response.data.success) {
          const token = response.data.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('isLoggedIn', 'true');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          router.push('/');
        } else {
          alert('帳號或密碼錯誤.');
          console.log('Error: ', response.data.message);
        }
      } catch (error) {
        console.error("登入失敗", error);
        alert('登入失敗，請稍後再試.');
      }
    };

    const handleChangePassword = () => {
      router.push('/forgot-password');
    };

    const handleRegister = () => {
      router.push('/register');
    };

    return {
      username,
      password,
      handleLogin,
      handleChangePassword,
      handleRegister,
    };
  },
});
</script>

<style lang="sass" scoped>
.flex
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  background-color: #212529

.login-container
  width: 400px
  background-color: #212529
  text-align: center

.logo-header
  display: flex
  flex-direction: column
  align-items: center
  gap: 4px
  margin-bottom: 24px

.login-title
  color: white
  font-size: 20px
  font-weight: 700
  line-height: 30px
  text-align: center

.form-container
  background-color: #212529
  display: flex
  flex-direction: column
  gap: 16px

.input-container
  display: flex
  flex-direction: column
  gap: 8px

.custom-input
  width: 400px
  height: 40px
  padding: 8px 16px
  border-radius: 8px 8px 8px 8px
  border: 1px solid #E0E0E0
  font-family: Inter
  font-size: 20px
  font-weight: 500
  line-height: 30px
  text-align: left
  background-color: #FFFFFF
  color: #828282

.login-button
  width: 400px
  height: 40px
  background: #000000
  color: white
  border: none
  border-radius: 8px
  font-family: Inter
  font-size: 16px
  font-weight: 500
  line-height: 30px
  cursor: pointer

.register-button
  width: 400px
  height: 40px
  background: #EEEEEE
  color: #000000
  border: none
  border-radius: 8px
  font-family: Inter
  font-size: 16px
  font-weight: 500
  line-height: 30px
  cursor: pointer

.forgot-password-container
  display: flex
  align-items: center
  justify-content: center
  gap: 16px

.line
  flex: 1
  height: 1px
  background-color: #828282

.forgot-button
  background-color: #212529
  color: #828282
  font-size: 16px
  text-decoration: none
  border: none
  cursor: pointer

.footer
  font-family: Inter
  font-size: 16px
  font-weight: 400
  line-height: 24px
  text-align: center
  color: #828282
  margin-top: 240px
</style>
