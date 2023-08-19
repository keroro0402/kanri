const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(__dirname + '/dist/assets')); // POSTされたフォームデータを受け取る

// MongoDBの設定
const mongoose = require('mongoose');
const { useModel } = require('vue');
const mongoPw = 'keroro0402';
const mongoName = 'kanrisystem';
mongoose
  .connect(
    'mongodb+srv://keroro:' +
      mongoPw +
      '@cluster0.jrnb4ff.mongodb.net/' +
      mongoName +
      '?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('MongoDBと接続できました');
  })
  .catch((error) => {
    console.error('MongoDBと接続できませんでした・・・');
  });

// Schemaの設定
const Schema = mongoose.Schema;
// ユーザ登録用スキーマ
const UserSchema = new Schema({
  loginUserId: {
    // キー名はフォームのname属性と同じにするべし!
    type: 'string', // データ型指定
    required: true, // 必須
    unique: true, // 唯一
  },
  loginUserPw: {
    type: 'string',
    required: true,
  },
});
// タスク登録用スキーマ
const TaskSchema = new Schema({
  taskTitle: {
    type: 'string',
    required: true,
    unique: true,
  },
  taskSummary: {
    type: 'string',
    required: true,
    unique: false,
  },
  taskImage: {
    type: 'string',
    required: false,
    unique: false,
  },
  taskMemo: {
    type: 'string',
    required: false,
    unique: false,
  },
});

// Modelの設定
const UserModel = mongoose.model('User', UserSchema); // ユーザ登録用モデル
const TaskModel = mongoose.model('Task', TaskSchema); // タスク用モデル

//　TOPページにアクセスした時の処理
app.get('/', (req, res) => {
  console.log('TOPページです');
  const allUser = UserModel.find();

  const promise = new Promise((resolve) => {
    const allUser = UserModel.find();
    resolve(allUser);
  });

  promise.then((data) => {
    console.log(data);
  });

  res.sendFile(__dirname + '/dist/index.html');
});

// タスク登録用ページにアクセスした時の処理
app.get('/task/create', (req, res) => {
  res.sendFile(__dirname + '/dist/taskCreate.html');
});

// タスク登録用ページから送信した時の処理
app.post('/task/create', (req, res) => {
  res.send('タスクを送信しました');
});

// ユーザ登録ページにアクセスした時の処理
app.get('/user/create', (req, res) => {
  res.sendFile(__dirname + '/dist/userCreate.html');
});

// ユーザ登録ページから送信した時の処理
app.post('/user/create', (req, res) => {
  const result = UserModel.findOne({ loginUserId: req.body.loginUserId });
  result.then((data) => {
    if (data) {
      console.log('登録済みのIDなので登録できません');
      res.sendFile(__dirname + '/dist/index.html');
    } else {
      console.log('登録できます');
      const userData = UserModel.create(req.body);
      userData.then((data) => {
        console.log('登録しました');
        res.send('登録できました');
      });
    }
  });
});

// ログインページにアクセスした時の処理
app.get('/user/login', (req, res) => {
  res.sendFile(__dirname + '/dist/login.html');
});

// ログインページから送信した時の処理
app.post('/user/login', (req, res) => {
  const result = UserModel.findOne({ loginUserId: req.body.loginUserId });
  result.then((data) => {
    // 入力したIDが登録されていた時の処理
    if (data) {
      console.log('ユーザはいます');
      // 入力したPWが登録されていた時の処理
      if (data.loginUserPw === req.body.loginUserPw) {
        res.send('ログイン成功です！！！');
        // 入力したPWが登録されていない時の処理
      } else {
        res.send('PWが違います');
      }
      // 入力したIDが登録されていない時の処理
    } else {
      res.send('ユーザがいません');
    }
  });
});
// サーバ待機処理 //
app.listen(5100, () => {
  console.log('5100番で準備が出来ました。5100にアクセスできます！！');
});
