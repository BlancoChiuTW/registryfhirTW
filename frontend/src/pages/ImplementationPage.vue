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
          <tr v-for="guide in paginatedGuides" :key="guide.id">
            <td>{{ guide.name }}</td>
            <td>{{ guide.description }}</td>
            <td>{{ guide.ig_version }}</td>
            <td>{{ guide.authority }}</td>
            <td class="actions">
              <q-btn
                flat
                @click="viewGuide(guide.url)"
                label="查看"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="openHistoryDialog(guide.id)"
                label="歷史版本"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="editGuide(guide)"
                label="編輯"
                color="white"
                text-color="black"
                class="action-btn"
              />
              <q-btn
                v-if="loggedIn"
                flat
                @click="deleteGuide(guide.id)"
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
    <CreateGuideDialog :showDialog="showCreateDialog" @close="showCreateDialog = false" @refresh="fetchImplementationGuides" />
    <EditGuideDialog :showDialog="showEditDialog" @close="showEditDialog = false" :guide="selectedGuide" @refresh="fetchImplementationGuides" />
    <ViewHistoryDialog :showDialog="showHistoryDialog" @close="showHistoryDialog = false" :guideId="selectedGuideId" @refresh="fetchImplementationGuides" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { QBtn, useQuasar } from 'quasar';
import CreateGuideDialog from '../components/CreateGuideDialog.vue';
import EditGuideDialog from '../components/EditGuideDialog.vue';
import ViewHistoryDialog from '../components/ViewHistoryDialog.vue';

const API_BASE_URL = 'https://api.registry.fhir.tw';

export default {
  name: 'ImplementationPage',
  components: {
    QBtn,
    CreateGuideDialog,
    EditGuideDialog,
    ViewHistoryDialog,
  },
  setup() {
    const $q = useQuasar();
    const loggedIn = ref(false);
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showHistoryDialog = ref(false);
    const selectedGuide = ref(null);
    const selectedGuideId = ref(null);
    const historyVersions = ref([]);
    const implementationGuides = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const paginatedGuides = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return implementationGuides.value.slice(start, end);
    });

    const fetchImplementationGuides = () => {
      axios
        .get(`${API_BASE_URL}/ig`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((response) => {
          implementationGuides.value = response.data.data;
        })
        .catch((error) => {
          handleErrorResponse(error);
        });
    };

    const viewGuide = (url) => {
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      window.open(url, '_blank');
    };

    const openHistoryDialog = (guideId) => {
      selectedGuideId.value = guideId;
      showHistoryDialog.value = true;
    };

    const editGuide = (guide) => {
      selectedGuide.value = guide;
      showEditDialog.value = true;
    };

    const deleteGuide = (guideId) => {
      axios
        .delete(`${API_BASE_URL}/ig/${guideId}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((response) => {
          $q.notify({
            type: 'positive',
            message: '刪除成功',
          });
          implementationGuides.value = implementationGuides.value.filter(
            (guide) => guide.id !== guideId
          );
          fetchImplementationGuides();
        })
        .catch((error) => {
          handleErrorResponse(error);
        });
    };

    const handleErrorResponse = (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            $q.notify({
              type: 'negative',
              message: '資料檢核失敗',
            });
            break;
          case 401:
            $q.notify({
              type: 'warning',
              message: '請先登入',
            });
            break;
          case 403:
            $q.notify({
              type: 'warning',
              message: '無法修改不是由自己發布的 IG',
            });
            break;
          case 404:
            $q.notify({
              type: 'negative',
              message: '找不到資源',
            });
            break;
          case 500:
            $q.notify({
              type: 'negative',
              message: '我掛了，請聯絡 Lorex',
            });
            break;
          default:
            $q.notify({
              type: 'negative',
              message: '未知錯誤',
            });
        }
      } else {
        $q.notify({
          type: 'negative',
          message: '網絡錯誤',
        });
      }
    };

    onMounted(() => {
      loggedIn.value = Boolean(localStorage.getItem('isLoggedIn'));
      fetchImplementationGuides();
    });

    return {
      loggedIn,
      showCreateDialog,
      showEditDialog,
      showHistoryDialog,
      selectedGuide,
      selectedGuideId,
      historyVersions,
      implementationGuides,
      currentPage,
      itemsPerPage,
      paginatedGuides,
      fetchImplementationGuides,
      viewGuide,
      openHistoryDialog,
      editGuide,
      deleteGuide,
      handleErrorResponse,
    };
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

.page-list {
  margin: 0 auto;
  width: 80vw; /* 確保左右留白各10vw */
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

.page-list th:nth-child(1),
.page-list td:nth-child(1) {
  width: 10%;
}

.page-list th:nth-child(2),
.page-list td:nth-child(2) {
  width: 30%;
}

.page-list th:nth-child(3),
.page-list td:nth-child(3) {
  width: 10%;
}

.page-list th:nth-child(4),
.page-list td:nth-child(4) {
  width: 10%;
}

.page-list th:nth-child(5),
.page-list td:nth-child(5) {
  width: 40%;
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
  display: contents;
}

.action-btn {
  background-color: black !important;
  color: white !important;
  border-radius: 8px;
  width: auto;
  text-align: center;
  padding: 5px 10px;
  margin-left: 10px;
}
</style>
