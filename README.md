# 韓集集運 — 人資管理系統

## 一、建立 Firebase（5 分鐘）

### 1. 建立 Firebase 專案
1. 打開 https://console.firebase.google.com
2. 用 Google 帳號登入
3. 點「新增專案」→ 取名如 `hanaji-hr` → 點「繼續」
4. 關掉 Google Analytics（不需要）→ 點「建立專案」

### 2. 建立 Firestore 資料庫
1. 左邊選單點「Firestore Database」
2. 點「建立資料庫」
3. 選「以測試模式啟動」→ 點「下一步」
4. 地區選 `asia-northeast3`（首爾）→ 點「啟用」

### 3. 取得設定值
1. 左上角齒輪 ⚙️ → 「專案設定」
2. 往下滑到「您的應用程式」→ 點「</>」(網頁圖示)
3. 應用程式暱稱填 `hanaji-hr` → 點「註冊應用程式」
4. 會看到一段 `firebaseConfig = {...}` 的程式碼
5. **複製裡面的值**

### 4. 貼上設定值
打開 `src/firebase.js`，把複製的值貼進去：

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",           // 換成你的
  authDomain: "hanaji-hr.firebaseapp.com",
  projectId: "hanaji-hr",
  storageBucket: "hanaji-hr.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 二、本機測試（5 分鐘）

### 需要先安裝
- Node.js：https://nodejs.org（選 LTS 版本）

### 指令
```bash
# 1. 進入專案資料夾
cd hanaji-hr

# 2. 安裝套件
npm install

# 3. 啟動開發伺服器
npm run dev
```

打開瀏覽器到 http://localhost:5173 確認可以正常使用。

---

## 三、部署到網路（5 分鐘）

### 1. 建立 GitHub Repository
1. 到 https://github.com → 登入（沒帳號就免費註冊）
2. 點「New Repository」→ 取名 `hanaji-hr` → 點「Create」
3. 依照 GitHub 頁面指示，把專案推上去：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的帳號/hanaji-hr.git
git push -u origin main
```

### 2. 部署到 Vercel
1. 到 https://vercel.com → 用 GitHub 帳號登入
2. 點「Add New → Project」
3. 選你的 `hanaji-hr` Repository
4. 點「Deploy」
5. 等 1-2 分鐘，完成後會顯示網址如：
   `https://hanaji-hr.vercel.app`

### 3. 給主管使用
把以下資訊傳給主管：
- 網址：`https://hanaji-hr.vercel.app`
- 密碼：`hanaji2020//`

你和主管輸入的資料會**即時同步**！

---

## 四、修改密碼

打開 `src/App.jsx`，搜尋 `APP_PASSWORD`，改成新密碼：
```js
const APP_PASSWORD = "你的新密碼";
```
改完後重新推到 GitHub，Vercel 會自動更新。

---

## 五、專案結構

```
hanaji-hr/
├── index.html          # 網頁入口
├── package.json        # 套件設定
├── vite.config.js      # 建置設定
├── src/
│   ├── main.jsx        # React 入口
│   ├── App.jsx         # 主程式（員工管理系統）
│   └── firebase.js     # Firebase 設定（⬅️ 在這裡貼設定值）
```
