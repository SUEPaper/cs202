import React, { useState } from 'react';
import { useReducer } from 'react';

import {Chat3_0_5,ContactList3_0_5} from './manage_0_other';
import {Chat3_0_6,ContactList3_0_6} from './manage_0_other';
import {TaskList3_0_7,AddTask3_0_7} from './manage_0_other';
import {Heading3_0_8,Section3_0_8} from './manage_0_other';
import {TasksProvider,AddTask,TaskList} from './manage_0_other';
export  function Form3_0_1() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>答对了！</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm3_0_1(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>城市测验</h2>
      <p>
        哪个城市有把空气变成饮用水的广告牌？
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          提交
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm3_0_1(answer) {
  // 模拟接口请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('猜的不错，但答案不对。再试试看吧！'));
      } else {
        resolve();
      }
    }, 1500);
  });
}



export function Form3_0_2() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>让我们帮你登记</h2>
      <label>
        名：{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        姓：{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        你的票将发给：<b>{fullName}</b>
      </p>
    </>
  );
}



export  function Form3_0_3() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>让我们帮你登记</h2>
      <label>
        名：{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        姓：{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        你的票将发给：<b>{fullName}</b>
      </p>
    </>
  );
}




export function Accordion3_0_4() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel3_0_4
        title="关于"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。在1929年至1997年之间，它是该国首都。
      </Panel3_0_4>
      <Panel3_0_4
        title="词源"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        这个名字源于哈萨克语 <span lang="kk-KZ">алма</span>，是“苹果”的意思，通常被翻译成“满是苹果”。事实上，阿拉木图周围的地区被认为是苹果的祖籍，<i lang="la">Malus sieversii</i> 被认为是目前本土苹果的祖先。
      </Panel3_0_4>
    </>
  );
}

function Panel3_0_4({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          显示
        </button>
      )}
    </section>
  );
}




export  function Messenger3_0_5() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList3_0_5
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat3_0_5 contact={to} />
    </div>
  )
}




export function Messenger3_0_6() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList3_0_6
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat3_0_6 key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];



export  function TaskApp3_0_7() {
  const [tasks, dispatch] = useReducer(
    tasksReducer3_0_7,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>布拉格行程</h1>
      <AddTask3_0_7
        onAddTask={handleAddTask}
      />
      <TaskList3_0_7
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer3_0_7(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('未知操作：' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '列侬墙图片', done: false }
];



export  function Page3_0_8() {
  return (
    <Section3_0_8>
      <Heading3_0_8>大标题</Heading3_0_8>
      <Section3_0_8>
        <Heading3_0_8>一级标题</Heading3_0_8>
        <Heading3_0_8>一级标题</Heading3_0_8>
        <Heading3_0_8>一级标题</Heading3_0_8>

        <Section3_0_8>
          <Heading3_0_8>二级标题</Heading3_0_8>
          <Heading3_0_8>二级标题</Heading3_0_8>
          <Heading3_0_8>二级标题</Heading3_0_8>
          <Section3_0_8>
            <Heading3_0_8>三级标题</Heading3_0_8>
            <Heading3_0_8>三级标题</Heading3_0_8>
            <Heading3_0_8>三级标题</Heading3_0_8>
          </Section3_0_8>
        </Section3_0_8>
      </Section3_0_8>
    </Section3_0_8>
  );
}


export function TaskApp3_0_9() {
  return (
    <TasksProvider>
      <h1>在京都休息一天</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}


