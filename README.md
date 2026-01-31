# 🏸 Badminton Scoreboard

แอปพลิเคชันนับคะแนนแบดมินตันแบบ PWA (Progressive Web App) สามารถใช้งานได้ทั้งบนมือถือและคอมพิวเตอร์

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)

## ✨ ฟีเจอร์

### 📊 การนับคะแนน
- รองรับกติกาแบดมินตัน BWF (Best of 3 games)
- เล่นถึง 21 แต้ม ต้องนำ 2 แต้มถึงจะชนะ
- ระบบ Deuce อัตโนมัติ (20-20 ขึ้นไป)
- สูงสุด 30 แต้ม (29-29 ใครได้ 30 ชนะทันที)

### 🎯 ประเภทการแข่งขัน
- ชายเดี่ยว
- หญิงเดี่ยว
- ชายคู่
- หญิงคู่
- คู่ผสม

### 🎨 UI/UX
- ออกแบบมาสำหรับการใช้งานบนมือถือ
- สีน้ำเงิน (ผู้เล่น A) และ สีแดง (ผู้เล่น B)
- กดที่พื้นที่สีเพื่อเพิ่มคะแนน
- แสดงฝั่งเสิร์ฟ (ซ้าย/ขวา) ตามกติกา
- Animation เมื่อได้คะแนน

### 📢 สถานะเกม
| สถานะ | ความหมาย |
|-------|----------|
| ⚡ คะแนนเสมอกัน | Deuce (20-20 ขึ้นไป) ต้องนำ 2 แต้ม |
| 🏆 29-29 | Final Point - ใครได้ 30 ชนะทันที |
| 🎯 กำลังจะชนะเกม | Game Point |
| 🔥 กำลังจะชนะแมทช์ | Match Point |

### 🛠️ ฟังก์ชัน
- **Undo** - ย้อนกลับคะแนนล่าสุด
- **Reset Game** - รีเซ็ตเกมปัจจุบัน
- **Reset Match** - รีเซ็ตทั้งแมทช์
- **Menu** - กลับไปหน้าตั้งค่า

## 🚀 การติดตั้ง

```bash
# Clone โปรเจค
git clone <repository-url>
cd badminton-scoreboard

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📱 PWA

แอปนี้รองรับ PWA สามารถติดตั้งลงหน้าจอโทรศัพท์ได้:
1. เปิดเว็บไซต์ในเบราว์เซอร์
2. กดเมนู (⋮) > "Add to Home Screen" หรือ "ติดตั้งแอป"
3. ใช้งานได้แม้ไม่มีอินเทอร์เน็ต

## 🏗️ โครงสร้างโปรเจค

```
src/
├── app/
│   ├── page.tsx          # หน้าหลัก Scoreboard
│   ├── layout.tsx        # Layout หลัก
│   └── globals.css       # Global styles
├── components/
│   ├── ScoreCard.tsx     # การ์ดแสดงคะแนน
│   ├── SetupScreen.tsx   # หน้าตั้งค่าแมทช์
│   ├── AlertBanner.tsx   # แบนเนอร์สถานะเกม
│   ├── GameWinnerModal.tsx   # Modal ชนะเกม
│   └── MatchWinnerModal.tsx  # Modal ชนะแมทช์
└── lib/
    ├── logic.ts          # ลอจิกเกมแบดมินตัน
    └── store.ts          # Zustand state management
```

## 🎮 วิธีใช้งาน

1. **เลือกประเภทการแข่งขัน** (เดี่ยว/คู่)
2. **ใส่ชื่อผู้เล่น/ทีม**
3. **กดเริ่มเกม**
4. **กดที่พื้นที่สี** เพื่อเพิ่มคะแนนให้ผู้เล่นฝั่งนั้น
5. เมื่อชนะเกม ระบบจะแสดง Modal และเริ่มเกมถัดไปอัตโนมัติ
6. ชนะ 2 ใน 3 เกม = ชนะแมทช์!

## 📋 กติกาแบดมินตัน (BWF)

- เล่น Best of 3 เกม (ชนะ 2 เกมได้แมทช์)
- แต่ละเกมเล่นถึง 21 แต้ม
- ต้องนำ 2 แต้มถึงจะชนะ (เช่น 22-20)
- ถ้าเสมอ 29-29 ใครได้ 30 ก่อนชนะ
- คะแนนคู่ = เสิร์ฟจากฝั่งขวา
- คะแนนคี่ = เสิร์ฟจากฝั่งซ้าย

## 🛡️ เทคโนโลยี

- **Next.js 15** - React Framework
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Zustand** - State Management
- **Lucide React** - Icons

## 📄 License

MIT License

---

สร้างด้วย ❤️ สำหรับนักแบดมินตันทุกคน 🏸
