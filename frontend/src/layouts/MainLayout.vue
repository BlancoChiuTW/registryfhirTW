<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <div class="header-title">
          TW Open IG Registry
        </div>
        <div class="nav-list">
          <q-btn flat label="首頁 Home" @click="goToHome" class="nav-item" />
          <q-btn flat label="實作指引 Implementation Guide" @click="goToGuide" class="nav-item" />
          <!-- <q-btn flat label="應用程式 Application" @click="goToApplication" class="nav-item" /> -->
        </div>
        <q-space />
        <div v-if="loggedIn" class="user-menu">
          <q-btn flat label="登出" @click="logout" class="nav-item" />
        </div>
        <q-btn flat label="登入" @click="goToLogin" v-if="!loggedIn" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotifications } from '../components/useNotifications';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const { notifySuccess, handleErrorResponse } = useNotifications();
    const loggedIn = ref(false);
    const router = useRouter();

    const goToHome = () => {
      router.push('/');
      // notifySuccess('回到首頁');
    };

    const goToGuide = () => {
      router.push('/Implementation');
      // notifySuccess('進入實作指引');
    };

    const goToApplication = () => {
      router.push('/application');
      // notifySuccess('進入應用程式');
    };

    const goToAddGuide = () => {
      router.push('/add-guide');
      // notifySuccess('新增實作指引');
    };

    const goToLogin = () => {
      router.push('/login');
      // notifySuccess('登入頁面');
    };

    const logout = () => {
      loggedIn.value = false;
      localStorage.removeItem('isLoggedIn');
      router.push('/login');
      // notifySuccess('已登出');
    };

    onMounted(() => {
      loggedIn.value = Boolean(localStorage.getItem('isLoggedIn'));
    });

    return {
      loggedIn,
      goToHome,
      goToGuide,
      goToApplication,
      goToAddGuide,
      goToLogin,
      logout,
    };
  },
});
</script>

<style scoped>
.header {
  background: #111315;
  border-bottom: 1px solid #212529;
  height: 60px;
  display: flex;
  align-items: center;
}
.header-title {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #FFFFFF;
  margin-right: 32px;
  margin-left: 80px;
}
.nav-list {
  display: flex;
  align-items: center;
  gap: 32px;
  opacity: 1;
}
.nav-item {
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: white;
}
.q-toolbar {
  height: 100%;
  align-items: center;
}
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-menu q-avatar img {
  width: 32px;
  height: 32px;
}
</style>
