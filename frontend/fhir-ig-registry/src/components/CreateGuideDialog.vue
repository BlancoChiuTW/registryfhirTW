<template>
  <q-dialog v-model="localShowDialog">
    <q-card class="dialog-card">
      <q-card-section>
        <div class="text-h6">新增實作指引 Create Implementation Guide</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="submitForm">
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
              <q-input v-model="form.igName" label="IG 名稱" filled />
              <q-input v-model="form.igTag" label="IG 標籤" filled />
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
              <q-input
                v-model="form.initialEdition.activeStatus"
                label="有效狀態"
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
      console.log("Form submitted", this.form);
      this.localShowDialog = false;
    },
    closeDialog() {
      this.localShowDialog = false;
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
</style>
