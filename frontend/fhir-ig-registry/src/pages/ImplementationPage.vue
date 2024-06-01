<template>
  <div class="implementation-page">
    <div class="page-header">
      <h1>實作指引 Implementation Guides</h1>
      <q-btn
        v-if="loggedIn"
        @click="showCreateDialog = true"
        label="新增實作指引"
        color="white"
        text-color="black"
        class="add-guide-btn"
        icon="home"
      />
    </div>
    <div class="page-list">
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>說明</th>
            <th>最新版本</th>
            <th>發布單位</th>
            <th>管理</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>臺灣核心實作指引</td>
            <td>適用於台灣醫療院所資料交換情境的核心實作指引</td>
            <td>0.2.0</td>
            <td>衛生福利部</td>
            <td class="actions">
              <q-btn
                flat
                @click="viewGuide"
                label="查看"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="viewHistory"
                label="歷史版本"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="editGuide"
                label="編輯"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="deleteGuide"
                label="刪除"
                color="white"
                text-color="black"
                class="action-btn"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CreateGuideDialog :showDialog="showCreateDialog" @close="showCreateDialog = false" />
  </div>
</template>

<script>
import {
  QBtn,
} from "quasar";
import CreateGuideDialog from "../components/CreateGuideDialog.vue";

export default {
  name: "ImplementationPage",
  components: {
    QBtn,
    CreateGuideDialog
  },
  data() {
    return {
      loggedIn: false,
      showCreateDialog: false,
    };
  },
  methods: {
    addGuide() {
      this.showCreateDialog = true;
    },
    viewGuide() {
      console.log("查看");
    },
    viewHistory() {
      console.log("歷史版本");
    },
    editGuide() {
      console.log("編輯");
    },
    deleteGuide() {
      console.log("刪除");
    },
  },
  created() {
    this.loggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  },
};
</script>

<style scoped>
.implementation-page {
  padding: 20px;
  background-color: #212529;
  color: #ffffff;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-family: Inter;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;
  color: #ffffff;
}

.page-list table {
  width: 100%;
  border-collapse: collapse;
}

.page-list th,
.page-list td {
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  color: white;
  padding: 10px;
}

.page-list th {
  border-bottom: 3px solid #444;
}

.page-list td {
  border-bottom: none;
}

.add-guide-btn {
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border-radius: 8px;
  background-color: white;
  color: black;
}

.add-guide-btn .q-icon {
  margin-right: 8px;
}

.actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background-color: black !important;
  color: white !important;
  border-radius: 8px;
}
</style>
