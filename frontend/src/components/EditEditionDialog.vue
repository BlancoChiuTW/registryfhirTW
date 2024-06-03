<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">編輯歷史版本 Edit Edition</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <div class="q-gutter-md">
            <div class="row">
              <q-input v-model="form.ig_version" label="版本號" filled />
              <q-input v-model="form.fhir_version" label="FHIR 版本" filled />
            </div>
            <div class="row">
              <q-select
                v-model="form.status"
                :options="statusOptions"
                label="狀態"
                filled
              />
              <q-checkbox
                v-model="form.experimental"
                label="是否為實驗性 IG? (勾選框)"
                filled
              />
            </div>
            <div class="row single-input">
              <q-input
                v-model="form.url"
                label="IG 網址"
                filled
                class="full-width-input"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="保存"
          color="primary"
          @click="submitForm"
          class="submit-btn"
        />
        <q-btn
          flat
          label="取消"
          color="white"
          text-color="white"
          @click="closeDialog"
          class="cancel-btn"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios';

const API_BASE_URL = 'https://api.registry.fhir.tw';

export default {
  name: "EditEditionDialog",
  props: {
    showDialog: Boolean,
    edition: {
      type: Object,
      default: () => ({
        id: "",
        ig_version: "",
        fhir_version: "",
        status: "",
        experimental: false,
        url: ""
      })
    },
    guideId: String
  },
  data() {
    return {
      localShowDialog: this.showDialog,
      form: {
        id: "",
        ig_version: "",
        fhir_version: "",
        status: "",
        experimental: false,
        url: ""
      },
      statusOptions: [
        { label: '草稿', value: 'draft' },
        { label: '正式', value: 'active' },
        { label: '停用', value: 'retired' },
        { label: '未知', value: 'unknown' }
      ]
    };
  },
  watch: {
    showDialog(newValue) {
      this.localShowDialog = newValue;
    },
    localShowDialog(newValue) {
      if (!newValue) {
        this.$emit('close');
      } else {
        this.form = { ...this.edition };
      }
    },
    edition: {
      handler(newValue) {
        this.form = { ...newValue };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm() {
      axios.put(`${API_BASE_URL}/ig/${this.guideId}/edition/${this.form.id}`, this.form)
        .then(response => {
          console.log("Form submitted", response.data);
          this.localShowDialog = false;
          this.$emit('refresh'); // 通知父组件刷新数据
        })
        .catch(error => {
          console.error("Failed to update edition", error);
        });
    },
    closeDialog() {
      this.localShowDialog = false;
    }
  }
};
</script>

<style scoped>
.dialog-card {
  width: 80vh;
  border-radius: 8px;
  background-color: black;
  color: white;
}

.row {
  display: flex;
  gap: 60px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.single-input {
  width: 100%;
}

.q-gutter-md > .row {
  margin-bottom: 10px;
}

.submit-btn {
  background-color: #34710f;
  color: white !important;
}

.cancel-btn {
  background-color: #454545;
  color: white !important;
}

.q-input {
  background-color: white;
  color: #828282;
  border-radius: 8px;
}

.single-input .q-input {
  width: 97%;
}

.q-checkbox {
  display: flex;
  background-color: white;
  color: #828282;
  border-radius: 8px;
  width: 350px;
  height: 56px;
}

.q-select {
  background-color: white;
  color: #828282;
  border-radius: 8px;
  width: 350px;
  height: 56px;
}

.Implementation-btn {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  flex-direction: row;
}

.submit-btn {
  border-radius: 8px;
  width: 80px;
  height: 50px;
}

.cancel-btn {
  border-radius: 8px;
  margin-left: 20px;
  width: 80px;
  height: 50px;
}
</style>
