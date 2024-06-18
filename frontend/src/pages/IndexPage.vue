<template>
  <div class="homepage-container">
    <img src="../assets/logo.svg" alt="HL7 FHIR Taiwan" class="logo" />
    <div class="content">
      <h1 class="title">台灣 FHIR 開放登錄平台</h1>
      <div class="q-pa-md q-gutter-sm">
        <q-banner
          inline
          class="notice"
          icon="info"
          color="primary"
          dense
          rounded
        >
        注意：
        本平台由非營利社群維護，並非政府官方的登錄系統。有關國家標準相關提案事項，請聯絡衛生福利部數位健康雲辦公室。
        </q-banner>
      </div>
      <p class="description">
        歡迎來到台灣 FHIR 開放登錄平台，本平台旨在提供一個索引系統，使 FHIR
        使用者可以登錄、發布或查詢實作指引 (Implementaion Guide) 與應用程式
        (Application)，為了促進標準的 流通與整合，與政府發布的 IG Registry
        相較之下，本平台有更友善使用環境與相對寬鬆的審查機制，並由工作小組獨立運作與審查，以維持平台中立性。
      </p>
      <p class="tw-open-registry">TW Open Registry 分為以下兩部分：</p>
      <ul class="description">
        <li>
          實作指引 (Implementation Guide)：提供 FHIR
          實作指引的登錄與索引查詢服務。
        </li>
        <li>
          應用程式 (Application)：提供 FHIR 相關應用程式的登錄與索引查詢服務。
        </li>
      </ul>
      <p class="minimal-review">
        本平台採取最小審查原則，一般而言只要您登錄的實作指引／應用程式符合本平台行為準則的要求，便能通過審查。有關審查基準與行為準則，請詳見行為準則頁面。
      </p>
      <h2 class="subtitle">聲明</h2>
      <ul class="description">
        <li>
          平台之營運：本平台由 TW FHIR Open Registry 工作小組獨立維運，這是一個非營利社群，旨在促進台灣 FHIR 實作指引的流通。
        </li>
        <li>
          商標聲明：因應國際健康資訊交換第七層協定協會（HL7® International）之規定，本站點提及的「FHIR®」、「FHIR 標準」、「帶有火焰標示的 HL7 FHIR Logo」是 HL7 的註冊商標，並經由 HL7 許可授權使用。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.homepage-container {
  padding: 20px;
  background-color: #212529;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.logo {
  width: 650px;
  height: 51.1px;
  margin-top: 20px;
}

.content {
  margin: 0 100px;
  background-color: #212529;
  padding: 20px;
  border-radius: 8px;
  width: calc(100% - 200px); /* 確保內容不會超出視窗 */
}

.title {
  font-family: Inter;
  font-size: 40px;
  font-weight: 600;
  line-height: 44px;
  text-align: left;
  margin-top: 20px;
}

.notice {
  width: 100%;
  padding: 27px 23px;
  gap: 16px;
  border-radius: 8px 8px 8px 8px;
  background: #032830;
  border: 1px solid #e0e0e0;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #6edff6;
}

.description {
  font-family: Inter;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-align: left;
}

.subtitle {
  font-family: Inter;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  margin: 20px 0;
  color: #ffffff;
  text-align: left;
}

.tw-open-registry {
  margin-top: 20px;
  margin-bottom: 20px;
}

.minimal-review {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
