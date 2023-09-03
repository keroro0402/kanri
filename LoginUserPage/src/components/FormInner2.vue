<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
const formProperty = ref({
  action: '/task/create',
  method: 'POST',
});
const title = ref('新規タスク登録');
const taskTitleProperty = ref({
  type: 'text',
  id: 'taskTitle',
  name: 'taskTitle',
  text: 'タイトル',
});

const taskSummaryProperty = ref({
  type: 'text',
  id: 'taskSummary',
  name: 'taskSummary',
  text: '要約',
});

const taskTimeLimitBeginningYearProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningYear',
  name: 'taskTimeLimitBeginningYear',
  text: '開始年',
});

const taskTimeLimitBeginningMonthProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningMonth',
  name: 'taskTimeLimitBeginningMonth',
  text: '開始月',
});

const taskTimeLimitBeginningDateProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningDate',
  name: 'taskTimeLimitBeginningDate',
  text: '開始日',
});

const taskTimeLimitBeginningDayProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningDay',
  name: 'taskTimeLimitBeginningDay',
  text: '開始曜日',
});

const taskTimeLimitBeginningHourProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningHour',
  name: 'taskTimeLimitBeginningHour',
  text: '開始時間',
});

const taskTimeLimitBeginningMinProperty = ref({
  type: 'text',
  id: 'taskTimeLimitBeginningMin',
  name: 'taskTimeLimitBeginningMin',
  text: '開始分',
});

const taskTimeLimitEndYearProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndYear',
  name: 'taskTimeLimitEndYear',
  text: '終了年',
});

const taskTimeLimitEndMonthProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndMonth',
  name: 'taskTimeLimitEndMonth',
  text: '終了月',
});

const taskTimeLimitEndDateProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndDate',
  name: 'taskTimeLimitEndDate',
  text: '終了日',
});

const taskTimeLimitEndDayProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndDay',
  name: 'taskTimeLimitEndDay',
  text: '終了曜日',
});

const taskTimeLimitEndHourProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndHour',
  name: 'taskTimeLimitEndHour',
  text: '終了時間',
});

const taskTimeLimitEndMinProperty = ref({
  type: 'text',
  id: 'taskTimeLimitEndMin',
  name: 'taskTimeLimitEndMin',
  text: '終了分',
});

const taskTimeLimitEndProperty = ref({
  type: 'text',
  id: 'taskTimeLimit',
  name: 'taskTimeLimit',
  text: '要約',
});

const taskImageProperty = ref({
  type: 'file',
  id: 'taskImage',
  name: 'taskImage',
  text: 'タスクイメージ',
});

const taskMemoProperty = ref({
  type: 'text',
  id: 'taskMemo',
  name: 'taskMemo',
  text: 'メモ',
  style: {
    width: '330px',
    height: '100px',
    verticalAlign: 'middle',
  },
});

const buttonProperty = reactive({
  common: {
    type: 'submit',
    name: 'submitButton',
  },
  registerButton: {
    text: '登録',
    value: 'register',
  },
  backButton: {
    text: '戻る',
    value: 'back',
  },
});

onMounted((): void => {
  firstFocus();
});
function firstFocus() {
  const targetEl = document.getElementById('taskTitle');
  if (targetEl != null) {
    targetEl.focus();
  }
}

const futureCountInit = 10; // 未来の上限
let futureCount = ref(futureCountInit); // リアクティブ化
const now = new Date(); // 現在時刻
const year = ref(now.getFullYear());
const month = ref(now.getMonth() + 1);
const date = ref(now.getDate());

// 年の設定
const calcYear = computed((): number[] => {
  let array: number[] = Array.of(); // 年格納用（空配列）
  for (let i = year.value; i < year.value + futureCount.value; i++) {
    array.push(i);
  }
  return array;
});

//// 年の再選択時の挙動
const reSelectYear = (data: Event): void => {
  // 現在の年と選択年の比較
  const target = data.target as HTMLInputElement;
  if (Number(target.value) > year.value) {
    month.value = 1; // 1月を設定
  } else {
    month.value = now.getMonth() + 1; // 現在の月を設定
  }
};

// 月の設定
const selectedMonth = ref(month);
const calcMonth = computed((): number[] => {
  let array: number[] = Array.of(); // 年格納用（空配列）
  for (let i = month.value; i <= 12; i++) {
    array.push(i);
  }
  return array;
});

//// 月の再選択時の挙動
const reSelectMonth = (data: Event): void => {
  // 現在の月と選択月の比較
  console.log('sasasa');
};

// 日の設定
const selectedDate = ref(date);
now.setMonth(selectedMonth.value, 0);

const startDate = 1;

const endDate = now.getDate();

const calcDate = computed((): number[] => {
  let array: number[] = Array.of(); // 日格納用（空配列）
  for (let i = startDate; i <= endDate; i++) {
    array.push(i);
  }
  return array;
});
</script>

<template>
  <!--開始年編集中-->
  <!--開始年編集中-->
  <tr>
    <td>
      <label v-bind:for="taskTimeLimitBeginningYearProperty.id">{{
        taskTimeLimitBeginningYearProperty.text
      }}</label
      >：
      <select v-on:change="reSelectYear">
        <option
          required
          v-bind:value="item"
          v-bind:type="taskTimeLimitBeginningYearProperty.type"
          v-bind:id="taskTimeLimitBeginningYearProperty.id"
          v-bind:name="taskTimeLimitBeginningYearProperty.name"
          v-for="item in calcYear"
        >
          {{ item }}
        </option>
      </select>
    </td>
  </tr>
  <!--開始年編集中-->
  <!--開始年編集中-->

  <!--開始月編集中-->
  <!--開始月編集中-->
  <tr>
    <td>
      <label v-bind:for="taskTimeLimitBeginningMonthProperty.id">{{
        taskTimeLimitBeginningMonthProperty.text
      }}</label
      >：
      <select v-on:change="reSelectMonth" v-model="selectedMonth">
        <option
          required
          v-bind:value="item"
          v-bind:type="taskTimeLimitBeginningMonthProperty.type"
          v-bind:id="taskTimeLimitBeginningMonthProperty.id"
          v-bind:name="taskTimeLimitBeginningMonthProperty.name"
          v-for="item in calcMonth"
        >
          {{ item }}
        </option>
      </select>
    </td>
  </tr>
  <!--開始月編集中-->
  <!--開始月編集中-->

  <!--開始日編集中-->
  <!--開始日編集中-->
  <tr>
    <td>
      <label v-bind:for="taskTimeLimitBeginningDateProperty.id">{{
        taskTimeLimitBeginningDateProperty.text
      }}</label
      >：
      <select v-model="selectedDate">
        <option
          required
          v-bind:value="item"
          v-bind:type="taskTimeLimitBeginningDateProperty.type"
          v-bind:id="taskTimeLimitBeginningDateProperty.id"
          v-bind:name="taskTimeLimitBeginningDateProperty.name"
          v-for="item in calcDate"
        >
          {{ item }}
        </option>
      </select>
    </td>
  </tr>
  <!--開始日編集中-->
  <!--開始日編集中-->

  <section>
    <h1>{{ title }}</h1>
    <form v-bind="formProperty">
      <table>
        <tr>
          <td>
            <label v-bind:for="taskTitleProperty.id">{{
              taskTitleProperty.text
            }}</label
            >：
            <input
              required
              v-bind:type="taskTitleProperty.type"
              v-bind:id="taskTitleProperty.id"
              v-bind:name="taskTitleProperty.name"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label v-bind:for="taskSummaryProperty.id">{{
              taskSummaryProperty.text
            }}</label
            >：
            <input
              required
              v-bind:type="taskSummaryProperty.type"
              v-bind:id="taskSummaryProperty.id"
              v-bind:name="taskSummaryProperty.name"
            />
          </td>
        </tr>

        <!--開始年編集中-->
        <!--開始年編集中-->
        <!--開始年編集中-->
        <!--開始年編集中-->
        <!--開始年編集中-->

        <tr>
          <td>
            <label v-bind:for="taskImageProperty.id">{{
              taskImageProperty.text
            }}</label
            >：
            <input
              v-bind:type="taskImageProperty.type"
              v-bind:id="taskImageProperty.id"
              v-bind:name="taskImageProperty.name"
            />
          </td>
        </tr>

        <tr>
          <td>
            <label v-bind:for="taskMemoProperty.id">{{
              taskMemoProperty.text
            }}</label
            >：
            <textarea
              v-bind:style="taskMemoProperty.style"
              v-bind:type="taskMemoProperty.type"
              v-bind:id="taskMemoProperty.id"
              v-bind:name="taskMemoProperty.name"
            ></textarea>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <button
              v-bind:object="buttonProperty.common"
              v-bind:value="buttonProperty.registerButton.value"
            >
              {{ buttonProperty.registerButton.text }}
            </button>
            <button
              onclick="history.back()"
              v-bind:value="buttonProperty.backButton.value"
            >
              {{ buttonProperty.backButton.text }}
            </button>
          </td>
        </tr>
      </table>
    </form>
  </section>
</template>
<style scoped>
section,
form {
  text-align: center;
}
h1 {
  font-size: 1.5rem;
  padding: 1rem;
}
table {
  margin: 10px auto 30px auto;
  border: 1px solid black;
  width: 80%;
  max-width: 400px;
}
table tr {
  height: 4rem;
}
table tr td button {
  margin: 2rem;
  width: 5rem;
}
</style>
