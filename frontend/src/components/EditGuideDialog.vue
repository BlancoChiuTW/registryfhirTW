<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">編輯實作指引 Edit Implementation Guide</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
          <div class="q-gutter-md">
            <div class="row">
              <q-input v-model="form.name" label="IG 名稱" filled />
              <q-input v-model="form.package_id" label="套件名稱" filled />
            </div>
            <div class="row single-input">
              <q-input
                v-model="form.description"
                label="IG 描述"
                filled
                class="full-width-input"
              />
            </div>
            <div class="row">
              <q-input v-model="form.tags" label="IG 標籤" filled />
              <q-input
                v-model.number="form.category"
                label="IG 分類"
                type="number"
                filled
              />
            </div>
          </div>
          <div class="row single-input">
            <q-input v-model="form.url" label="IG 網址" filled />
            <q-select
              v-model="form.status"
              :options="statusOptions"
              label="IG 有效狀態"
              filled
              class="full-width-input"
            />
          </div>

          <div class="row">
            <q-checkbox
              v-model="form.experimental"
              label="是否為實驗性 IG? (勾選框)"
              filled
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div class="Implementation-btn">
          <q-btn
            flat
            label="編輯"
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
import axios from "axios";

const API_BASE_URL = "https://api.registry.fhir.tw";

export default {
  name: "EditGuideDialog",
  props: {
    showDialog: Boolean,
    guide: {
      type: Object,
      default: () => ({
        id: "",
        name: "",
        package_id: "",
        description: "",
        tags: "",
        ig_version: "",
        fhir_version: "",
        url: "",
        status: "",
        category: -1, // 初始化為-1
        experimental: false,
      }),
    },
  },
  data() {
    return {
      localShowDialog: this.showDialog,
      form: {
        id: "",
        name: "",
        package_id: "",
        description: "",
        tags: "",
        ig_version: "",
        fhir_version: "",
        url: "",
        status: "",
        category: -1, // 初始化為-1
        experimental: false,
      },
      statusOptions: [
        { label: "草稿", value: "draft" },
        { label: "正式", value: "active" },
        { label: "停用", value: "retired" },
        { label: "未知", value: "unknown" },
      ],
    };
  },
  watch: {
    showDialog(newValue) {
      this.localShowDialog = newValue;
    },
    localShowDialog(newValue) {
      if (!newValue) {
        this.$emit("close");
      }
    },
    guide: {
      handler(newValue) {
        this.form = { ...newValue };
        // 確保category為數字類型，並且默認為-1
        if (
          typeof this.form.category === "string" ||
          this.form.category === null
        ) {
          this.form.category = -1;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    submitForm() {
      // 確保category不為null或undefined
      if (this.form.category === null || this.form.category === undefined) {
        this.form.category = -1;
      }
      axios
        .put(`${API_BASE_URL}/ig/${this.form.id}`, this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((response) => {
          console.log("Form submitted", response.data);
          this.localShowDialog = false;
          location.reload(); // 刷新頁面
        })
        .catch((error) => {
          console.error("Failed to update guide", error);
        });
    },
    closeDialog() {
      this.localShowDialog = false;
    },
  },
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

.text-subtitle1 {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
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
