<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">編輯歷史版本 Edit Edition</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <div class="row">
            <div class="col">
              <q-input v-model="form.ig_version" label="版本號" filled />
            </div>
            <div class="col">
              <q-input v-model="form.fhir_version" label="FHIR 版本" filled />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-select
              v-model="form.status"
              :options="statusOptions"
              label="狀態"
              filled
             />
            </div>
            <div class="col">
                <q-checkbox
                dense
                v-model="form.experimental"
                label="是否為實驗性 IG? (勾選框)"
                filled
                class="custom-checkbox"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
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
      <q-card-actions>
        <div class="implementation-btn">
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
        </div>
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
      const sendData = {
        ig_version: this.form.ig_version,
        fhir_version: this.form.fhir_version,
        status: this.form.status.value,
        experimental: this.form.experimental,
        url: this.form.url
      }
      axios.put(`${API_BASE_URL}/ig/${this.guideId}/edition/${this.form.id}`, sendData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => {
          console.log("Form submitted", response.data);
          this.localShowDialog = false;
          this.$emit('refresh');
          // refresh page
          window.location.reload();
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
  gap: 10px;
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

.q-checkbox {
  background-color: white;
  color: #000;
  text-align: left;
  border-radius: 8px;
  height: 56px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.q-select {
  background-color: white;
  color: #828282;
  border-radius: 8px;
}

.implementation-btn {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  flex-direction: row;
}

.submit-btn{
  border-radius: 8px;
  width: 80px;
  height: 50px;
}

.cancel-btn{
  border-radius: 8px;
  margin-left: 20px;
  margin-right: 10px;
  width: 80px;
  height: 50px;
}

.custom-checkbox .q-checkbox__label {
  margin-left: 10px !important;
}
</style>
