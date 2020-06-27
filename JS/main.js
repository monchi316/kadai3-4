'use strict'
{
  // HTML要素の取得
  const btn = document.getElementById('btn');
  const tasks = [];
  const taskForm = document.getElementById('taskForm');
  const tbody = document.querySelector('tbody');
  // ↓クリックイベント↓
  // 追加ボタン
  btn.addEventListener('click', () => {
    if (taskForm.value) {
      addTask();
    }
  });

  // ラジオボタン

  // ↓関数定義↓
  // タスク追加時の処理内容
  const addTask = () => {
    const task = {
      idNumber: 0,
      taskName: taskForm.value,
      status: '作業中',
    }
    tasks.push(task);
    // タスク生成時の処理内容
    const createTask = () => {
      tbody.innerHTML = '';
      tasks.forEach((task, index) => {
        // 必要な要素生成定義
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const taskTd = document.createElement('td');
        const statusTd = document.createElement('td');
        const removeTd = document.createElement('td');
        const statusBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        // 生成要素の配置処理
        tbody.appendChild(tr);
        tr.appendChild(idTd);
        tr.appendChild(taskTd);
        tr.appendChild(statusTd);
        tr.appendChild(removeTd);
        statusTd.appendChild(statusBtn);
        removeTd.appendChild(removeBtn);
        if (tasks[index].status === '作業中') {
          tr.className = 'working';
        } else {
          tr.className = 'complete';
        }
        tasks[index].idNumber = index;
        idTd.textContent = task.idNumber;
        taskTd.textContent = task.taskName;
        statusBtn.textContent = task.status;
        removeBtn.textContent = '削除';
        // 削除ボタン
        removeBtn.addEventListener('click', () => {
          removeTask(index);
          createTask();
        });
        // ステータスボタン
        statusBtn.addEventListener('click', () => {
          statusNow(index);
          createTask();
        });
      });
    };
    createTask();
    taskForm.value = '';
  }
  // 削除処理内容
  // 配列から該当オブジェクトの削除を行う
  const removeTask = (index) => {
    tasks.splice(index, 1);
  }
  // ステータスボタン処理内容
  // 該当オブジェクトのstatusプロパティの値を変更する
  const statusNow = (index) => {
    if (tasks[index].status === '作業中') {
      tasks[index].status = '完了';
    } else {
      tasks[index].status = '作業中';
    }
  }
}