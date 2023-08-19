<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
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
</script>
<template>
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
