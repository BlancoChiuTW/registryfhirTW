<template>
  <div class="flex flex-center">
    <div class="register-container">
      <div class="logo-header">
        <div class="register-title">註冊</div>
        <div class="register-subtitle">使用者 / 管理員註冊</div>
      </div>
      <form class="form-container" @submit.prevent="handleRegister">
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
            type="text"
            id="firstName"
            v-model="firstName"
            class="custom-input"
            placeholder="名字"
          />
        </div>
        <div class="input-container">
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            class="custom-input"
            placeholder="姓氏"
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
        <div class="input-container">
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="custom-input"
            placeholder="確認密碼"
          />
        </div>
        <div class="input-container">
          <input
            type="email"
            id="email"
            v-model="email"
            class="custom-input"
            placeholder="電子郵件"
          />
        </div>
        <button type="submit" class="register-button">註冊</button>
        <div class="back-login-container">
          <span class="line"></span>
        </div>
        <button type="button" class="backlogin-button" @click="handleBackToLogin">返回登入</button>
      </form>
      <div class="footer">FHIR Taiwan Open IG Registry Workgroup</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const username = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const email = ref("");
    const router = useRouter();

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        alert("密碼和確認密碼不匹配.");
        return;
      }

      try {
        const response = await axios.post(
          `https://api.registry.fhir.tw/user/register?username=${username.value}&password=${password.value}&email=${encodeURIComponent(email.value)}&firstname=${encodeURIComponent(firstName.value)}&lastname=${encodeURIComponent(lastName.value)}`,
          {},
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.status === 200) {
          alert("註冊成功!");
          router.push("/login");
        }
      } catch (error) {
        console.error("註冊失敗", error);
        alert("註冊失敗，請檢查輸入資訊或稍後再試.");
      }
    };

    const handleBackToLogin = () => {
      router.push("/login");
    };

    onMounted(() => {
      console.log("Register component mounted");
    });

    return { username, firstName, lastName, password, confirmPassword, email, handleRegister, handleBackToLogin };
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

.register-container
  width: 400px
  background-color: #212529
  text-align: center

.logo-header
  display: flex
  flex-direction: column
  gap: 4px
  margin-bottom: 24px
  align-items: flex-start

.register-title
  color: white
  font-size: 26px
  font-weight: 700
  line-height: 30px
  text-align: center

.register-subtitle
  color: white
  font-size: 16px
  font-weight: 400
  line-height: 24px
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

.register-button
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

.backlogin-button
  width: 400px
  height: 40px
  background: white
  color: #000000
  border: none
  border-radius: 8px
  font-family: Inter
  font-size: 16px
  font-weight: 500
  line-height: 30px
  cursor: pointer

.back-login-container
  display: flex
  align-items: center
  justify-content: center
  gap: 16px
  margin-bottom: 20px
  margin-top: 20px
.line
  flex: 1
  height: 1px
  background-color: #828282

.back-login-button
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
  margin-top: 32px
</style>
