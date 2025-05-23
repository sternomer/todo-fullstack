# 📝 ToDo App – Setup Instructions

This is a simple fullstack ToDo application.  
It includes a React frontend and a Node.js + Express backend.  
Tasks are stored in memory (no database required).

The app includes:
- Live task updates
- Input validation
- Visual error/success messages
- UI transitions
- Icons with `lucide-react`

---

## ▶️ How to Run the Project

### Step 1: Start the Server (Backend)

1. Open a terminal.
2. Go to the `todo-server` folder:
   ```bash
   cd todo-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node index.js
   ```

🟢 The server will run at:  
**http://localhost:3001**

---

### Step 2: Start the App (Frontend)

1. Open a **new terminal**.
2. Go to the `todo-client` folder:
   ```bash
   cd todo-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

🌐 The app will open at:  
**http://localhost:5173**

---

## 🧪 How to Use the App

- ✍️ Type a task name and click **"Add"** to add a new task.
- ✅ Click on a task to **mark it as complete/incomplete**.
- 🗑️ Click the trash icon to **delete** a task.
- 🚫 Adding an empty or duplicate task will show a red error message.
- ✅ Successfully added tasks show a green confirmation message.

---

## ✅ Requirements

- Node.js (v18 or above)
- npm (comes with Node.js)

---

## ℹ️ Notes

- No database needed – tasks are stored in memory.
- Refreshing the page resets the task list.

---

## 🧩 שאלה פתוחה: איך להרחיב את המערכת לתמיכה במספר משתמשים?

כדי לאפשר לכל משתמש לנהל רשימת משימות אישית, יש לבצע את הצעדים הבאים:

1. **הוספת מנגנון התחברות/הרשמה (Authentication):**  
   יש להוסיף מערכת שתאפשר זיהוי משתמשים, למשל באמצעות שם משתמש וסיסמה או OAuth.

2. **קישור משימות למשתמשים:**  
   לכל משימה יש להוסיף שדה מזהה של המשתמש (`userId`) כדי לקשר בין משימות למשתמשים.

3. **עדכון ה־API:**  
   יש לעדכן את ה־API כך שיחזיר רק את המשימות של המשתמש המחובר, על פי ה־`userId`.

4. **שליחת מזהה משתמש מהלקוח לשרת:**  
   בכל קריאה ל־API, יש לשלוח את ה־`userId` או טוקן זיהוי (Token) מהצד של הלקוח.

5. **שימוש במסד נתונים:**  
   במקום שמירת משימות בזיכרון בלבד, יש להשתמש במסד נתונים אמיתי (כגון MongoDB או PostgreSQL) כדי לאחסן את המשימות בצורה קבועה.

