<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">新增實作指引 Create Implementation Guide</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="submitForm">
          <div class="q-gutter-md">
            <div class="row">
              <q-input v-model="form.igName" label="IG 名稱" filled />
              <q-input v-model="form.caseName" label="套件名稱" filled />
            </div>
            <div class="row single-input">
              <q-input
                v-model="form.igDescription"
                label="IG 描述"
                filled
                class="full-width-input"
              />
            </div>
            <div class="row">
              <q-input v-model="form.igTag" label="IG 標籤" filled />
              <q-input v-model="form.authority" label="發布單位" filled />

            </div>
            <div class="text-subtitle1">IG 初始版本資訊 Initial Edition</div>
            <div class="row">
              <q-input
                v-model="form.initialEdition.version"
                label="版本號"
                filled
              />
              <q-input
                v-model="form.initialEdition.fhirVersion"
                label="FHIR 版本"
                filled
              />
            </div>
            <div class="row">
              <q-select
                v-model="form.initialEdition.activeStatus"
                label="狀態"
                :options="statusOptions"
                map-options
                filled
              />
              <q-checkbox
                v-model="form.initialEdition.trialIG"
                label="是否為實驗性 IG? (勾選框)"
                filled
              />
            </div>
            <div class="row single-input">
              <q-input
                v-model="form.initialEdition.igUrl"
                label="IG 網址"
                filled
                class="full-width-input"
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

export default {
  name: "CreateGuideDialog",
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      localShowDialog: this.showDialog,
      form: {
        igName: "",
        caseName: "",
        igDescription: "",
        igTag: "",
        initialEdition: {
          version: "",
          fhirVersion: "",
          activeStatus: "",
          trialIG: false,
          igUrl: "",
        },
      },
      statusOptions: [
        { label: '--', value: '' },
        { label: 'draft', value: 'draft' },
        { label: 'active', value: 'active' },
        { label: 'retired', value: 'retired' },
        { label: 'unknown', value: 'unknown' }
      ],
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
  },
  methods: {
    submitForm() {
      // 构建请求数据
      const requestData = {
        name: this.form.igName,
        description: this.form.igDescription,
        package_id: this.form.caseName,
        authority: this.form.authority, // 如果需要可以设定默认值
        country: "", // 如果需要可以设定默认值
        language: "", // 如果需要可以设定默认值
        category: 1, // 如果需要可以设定默认值
        tags: [this.form.igTag],
        ig_version: this.form.initialEdition.version,
        fhir_version: this.form.initialEdition.fhirVersion,
        url: this.form.initialEdition.igUrl,
        status: typeof this.form.initialEdition.activeStatus === 'string' ? this.form.initialEdition.activeStatus : '', // 确保是字符串
        experimental: this.form.initialEdition.trialIG
      };

      // 发送 POST 请求
      axios.post('https://api.registry.fhir.tw/ig', requestData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => {
          console.log('新增成功', response.data);
          this.fetchImplementationGuides(); // 调用刷新数据的方法
          this.localShowDialog = false; // 关闭对话框
        })
        .catch(error => {
          console.error('新增失败', error);
        });
    },
    closeDialog() {
      this.localShowDialog = false;
    },
    fetchImplementationGuides() {
      axios.get('https://api.registry.fhir.tw/ig', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => {
          console.log('獲取到的資料:', response.data.data);  // 添加日誌檢查數據
          this.$parent.implementationGuides = response.data.data.map(guide => {
            // 確保正確提取editions數據
            const latestEdition = (guide.editions && guide.editions.length > 0) ? guide.editions[0] : {};
            return {
              ...guide,
              ig_version: latestEdition.ig_version || '',
              url: latestEdition.url || '',
            };
          });
          console.log('處理後的implementationGuides:', this.$parent.implementationGuides);  // 檢查處理後的數據
        })
        .catch(error => {
          console.error('獲取實作指引列表失敗', error);
        });
    }
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

.submit-btn{
  border-radius: 8px;
  width: 80px;
  height: 50px;
}

.cancel-btn{
  border-radius: 8px;
  margin-left: 20px;
  width: 80px;
  height: 50px;
}
.q-select{
  background-color: white;
  color: black;
  width: 100px;
}
</style>
