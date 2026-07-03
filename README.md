# The Base Hua Hin Apartment

เว็บไซต์และระบบขอจองห้องพักของ **The Base Hua Hin Apartment** อพาร์ทเมนท์ให้เช่ารายเดือน ใจกลางหัวหิน

## โครงสร้างโปรเจกต์

```
Thebasehuahin/
├── Images/                          รูปจริงของอาคาร/ห้องพัก/สิ่งอำนวยความสะดวก
├── index.html                       เว็บหน้าหลัก (ไทย/อังกฤษ/จีน/รัสเซีย)
├── reserve.html                     ฟอร์มส่งคำขอจองห้องพัก (4 ภาษา)
├── dashboard.html                   แดชบอร์ดคำขอจอง (ใช้ภายใน, PIN-gated)
├── css/style.css, js/i18n.js, js/rooms.js
├── favicon.ico, favicon.png
├── robots.txt, sitemap.xml          สำหรับ SEO
│
├── cloudflare-worker.js             Cloudflare Worker: รับคำขอจอง → แจ้งเตือนผ่าน LINE + proxy ข้อมูลให้ dashboard
├── reservation-sheet-script.gs      Google Apps Script: บันทึกคำขอจองลง Google Sheet
└── LINE-RESERVATION-BACKEND-SETUP.md   คู่มือตั้งค่า Google Sheet + LINE Messaging API + Cloudflare Worker
```

## รันเว็บทดสอบในเครื่อง (local)

```bash
npx serve -p 3302 .
```

แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:3302`

## ตั้งค่าระบบขอจอง (Google Sheet + LINE + Cloudflare Worker)

ระบบยังไม่ได้เชื่อมต่อจริง — ดูขั้นตอนละเอียดใน [`LINE-RESERVATION-BACKEND-SETUP.md`](./LINE-RESERVATION-BACKEND-SETUP.md) จากนั้นแก้ไข:
- `reserve.html` — บรรทัด `const API_URL = "https://REPLACE-ME.workers.dev/api/reserve";`
- `dashboard.html` — บรรทัด `const API_BASE = "https://REPLACE-ME.workers.dev";`

ให้ชี้ไปที่ Worker URL จริงหลัง deploy

## หมายเหตุ

- **ราคาเช่ายังไม่กำหนด** — หน้าเว็บแสดง "ติดต่อสอบถามอัตราค่าเช่า" ไปก่อน เมื่อตัดสินใจราคาแล้ว ให้ใส่ตัวเลขใน `js/rooms.js` (ฟิลด์ `price` ของแต่ละห้อง) แล้วปรับ template ที่เช็ค `price: null` ใน `index.html`/`reserve.html`
- **โดเมนจริงยังไม่ระบุ** — `index.html`, `reserve.html`, `robots.txt`, `sitemap.xml` ใช้ placeholder `thebasehuahin.com` ไปก่อน เมื่อได้โดเมนจริงแล้วต้องแก้ทุกจุดที่อ้างอิง URL เต็ม
- `dashboard.html` ไม่มีการแปลภาษา (ไทยล้วน) เพราะใช้ภายในทีมงานเท่านั้น
