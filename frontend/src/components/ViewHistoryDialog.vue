<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">歷史版本 Editions</div>
      </q-card-section>
      <div class="page-list">
        <table>
          <thead>
            <tr>
              <th>版本號</th>
              <th>FHIR版本</th>
              <th>狀態</th>
              <th>實驗性IG?</th>
              <th>管理</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edition in historyVersions" :key="edition.id">
              <td>{{ edition.ig_version }}</td>
              <td>{{ edition.fhir_version }}</td>
              <td>{{ edition.status }}</td>
              <td>{{ edition.experimental ? '是' : '否' }}</td>
              <td class="actions">
                <q-btn
                  flat
                  @click="viewGuide(edition.url)"
                  label="查看"
                  text-color="white"
                  class="action-btn"
                />
                <q-btn
                  flat
                  @click="editVersion(edition)"
                  label="編輯"
                  color="white"
                  text-color="white"
                  class="action-btn"
                />
                <q-btn
                  flat
                  @click="deleteVersion(edition)"
                  label="刪除"
                  color="white"
                  text-color="white"
                  class="action-btn"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <q-card-actions align="right">
        <div class="twobtn">
          <q-btn
            flat
            label="新增版本"
            color="primary"
            @click="addVersion"
            class="submit-btn"
          />
          <q-btn
            flat
            label="關閉"
            color="white"
            text-color="white"
            @click="closeDialog"
            class="cancel-btn"
          />
        </div>
      </q-card-actions>
    </q-card>
    <CreateEditionDialog :showDialog="showCreateEditionDialog" @close="showCreateEditionDialog = false" :guide="guide" @refresh="fetchHistoryVersions" />
    <EditEditionDialog :showDialog="showEditEditionDialog" @close="showEditEditionDialog = false" :edition="currentEdition" :guideId="guideId" @refresh="fetchHistoryVersions" />
  </q-dialog>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import CreateEditionDialog from "./CreateEditionDialog.vue";
import EditEditionDialog from "./EditEditionDialog.vue";

const API_BASE_URL = 'https://api.registry.fhir.tw';

export default {
  name: "ViewHistoryDialog",
  components: {
    CreateEditionDialog,
    EditEditionDialog
  },
  props: {
    showDialog: Boolean,
    guideId: String,
  },
  setup() {
    const $q = useQuasar();
    return {
      $q
    };
  },
  data() {
    return {
      localShowDialog: this.showDialog,
      showCreateEditionDialog: false,
      showEditEditionDialog: false,
      currentEdition: {},
      guide: {},  // 用於保存 guide 資料
      historyVersions: []
    };
  },
  watch: {
    showDialog(newValue) {
      this.localShowDialog = newValue;
      if (newValue) {
        this.fetchHistoryVersions();
      }
    },
    localShowDialog(newValue) {
      if (!newValue) {
        this.$emit('close');
      }
    }
  },
  methods: {
    fetchHistoryVersions() {
      axios.get(`${API_BASE_URL}/ig/${this.guideId}/edition`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => {
          this.historyVersions = response.data.data;
          if (response.data.data.length > 0) {
            this.guide = response.data.data[0].guide; // 假設 guide 在第一個版本中
          }
        })
        .catch(error => {
          this.handleErrorResponse(error);
        });
    },
    viewGuide(url) {
      window.open(url, '_blank');
    },
    editVersion(edition) {
      this.currentEdition = edition;
      this.showEditEditionDialog = true;
    },
    deleteVersion(edition) {
      axios.delete(`${API_BASE_URL}/ig/${this.guideId}/edition/${edition.id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: '刪除版本成功',
          });
          this.fetchHistoryVersions(); // 刷新历史版本列表
        })
        .catch(error => {
          this.handleErrorResponse(error);
        });
    },
    addVersion() {
      this.showCreateEditionDialog = true;
    },
    closeDialog() {
      this.localShowDialog = false;
    },
    handleErrorResponse(error) {
      const $q = this.$q;
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
    }
  },
};
</script>

<style scoped>
.dialog-card {
  width: 800px !important;
  height: 720px !important;
  max-width: 800px !important;
  max-height: 720px !important;
  border-radius: 8px;
  background-color: #111315;
  color: white;
}

.q-gutter-md {
  padding: 20px;
}

.history-table {
  background-color: #333;
  border-radius: 8px;
}

.action-btn {
  margin-right: 10px;
  background-color: black !important;
  color: white !important;
  border-radius: 8px;
}

.Implementation-btn {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  flex-direction: row;
}

.submit-btn {
  background-color: #34710f;
  color: white !important;
  border-radius: 8px;
  width: 100px;
  height: 50px;
}

.cancel-btn {
  background-color: #454545;
  color: white !important;
  border-radius: 8px;
  margin-left: 20px;
  width: 100px;
  height: 50px;
}

.q-card-section table {
  width: 100%;
  border-collapse: collapse;
}

.q-card-section th,
.q-card-section td {
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  color: white;
  padding: 10px;
}

.q-card-section th {
  border-bottom: 3px solid #444;
}

.q-card-section td {
  border-bottom: none;
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

.twobtn {
  margin-top: 450px;
}
</style>
