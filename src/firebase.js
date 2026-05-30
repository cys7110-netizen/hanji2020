import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ====================================================
// 請把下面的值換成你自己的 Firebase 設定
// 在 Firebase Console → 專案設定 → 你的應用程式 裡面找
// ====================================================
const firebaseConfig = {
  apiKey: "AIzaSyDvQkMA46O8ujAybTITmq3I16YT2Rx1SeU",
  authDomain: "hanji2020-7735b.firebaseapp.com",
  projectId: "hanji2020-7735b",
  storageBucket: "hanji2020-7735b.firebasestorage.app",
  messagingSenderId: "1004216653270",
  appId: "1:1004216653270:web:4eae4b2d4512a5c3aa4077",
  measurementId: "G-W0ED3KG2ZW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 讀取資料
export async function loadData(key) {
  try {
    const snap = await getDoc(doc(db, "hanaji-hr", key));
    if (snap.exists()) return JSON.parse(snap.data().value);
    return null;
  } catch (e) {
    console.error("讀取失敗:", e);
    return null;
  }
}

// 儲存資料
export async function saveData(key, data) {
  try {
    await setDoc(doc(db, "hanaji-hr", key), { value: JSON.stringify(data), updatedAt: new Date().toISOString() });
  } catch (e) {
    console.error("儲存失敗:", e);
  }
}
