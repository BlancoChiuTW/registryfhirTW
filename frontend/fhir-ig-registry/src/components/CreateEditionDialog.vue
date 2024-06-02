<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">新增歷史版本 Create Edition</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <div class="q-gutter-md">
            <div class="row">
              <q-input v-model="form.ig_version" label="版本號" filled class="form-input"/>
              <q-input v-model="form.fhir_version" label="FHIR 版本" filled class="form-input"/>
            </div>
            <div class="row">
              <q-input v-model="form.status" label="有效狀態" filled class="form-input"/>
              <q-checkbox
                v-model="form.experimental"
                label="是否為實驗性 IG? (勾選框)"
                filled
                class="form-checkbox"
              />
            </div>
            <div class="row single-input">
              <q-input
                v-model="form.url"
                label="IG 網址"
                filled
                class="form-input"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div class="Implementation-btn">
          <q-btn
            flat
            label="新增"
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
  name: "CreateEditionDialog",
  props: {
    showDialog: Boolean,
    guide: Number, // 確保 guide 是數字
  },
  data() {
    return {
      localShowDialog: this.showDialog,
      form: {
        ig_version: "",
        fhir_version: "",
        status: "",
        experimental: false,
        url: "",
        guide: this.guide // 將 guide 初始化到 form 中
      },
    };
  },
  watch: {
    showDialog(newValue) {
      this.localShowDialog = newValue;
    },
    localShowDialog(newValue) {
      if (!newValue) {
        this.$emit('close');
      }
    },
    guide(newValue) { // 監聽 guide 的變化
      this.form.guide = newValue;
    }
  },
  methods: {
    submitForm() {
      axios.post(`${API_BASE_URL}/ig/${this.form.guide}/edition`, this.form)
        .then(response => {
          console.log("版本新增成功", response.data);
          this.localShowDialog = false;
          this.$emit('refresh'); // 新增成功後發出 refresh 事件
        })
        .catch(error => {
          console.error("新增版本失敗", error);
        });
    },
    closeDialog() {
      this.localShowDialog = false;
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

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.single-input {
  width: 100%;
}

.q-gutter-md > .row {
  margin-bottom: 20px;
}

.text-h6 {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
}

.submit-btn {
  background-color: #34710f;
  color: white !important;
}

.cancel-btn {
  background-color: #454545;
  color: white !important;
}

.form-input {
  flex: 1;
  background-color: white;
  color: #828282;
  border-radius: 8px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  background-color: white;
  color: #828282;
  border-radius: 8px;
  width: 100%;
}

.single-input .q-input {
  width: 100%;
}

.Implementation-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}

.submit-btn{
  border-radius: 8px;
  width: 100px;
  height: 50px;
}

.cancel-btn{
  border-radius: 8px;
  margin-left: 20px;
  width: 100px;
  height: 50px;
}

.full-width-input .q-input {
  width: 100%;
}
</style>
