// ข้อมูลห้องพัก The Base Hua Hin Apartment
const ROOMS = [
  {
    id: "floor234",
    floors: "2-4",
    accent: "teal",
    sqm: 34,
    price: 6200,
    name: {
      th: "ห้องพัก ชั้น 2-4",
      en: "Room — Floors 2-4",
      zh: "客房 — 2-4楼",
      ru: "Номер — Этажи 2-4"
    },
    tag: {
      th: "โทนสีเขียวมิ้นท์ วิวภูเขา",
      en: "Mint Green Accent Wall, Mountain View",
      zh: "薄荷绿主题墙，山景",
      ru: "Мятная акцентная стена, вид на горы"
    },
    images: ["Images/Floor234.jpg", "Images/วิวห้องพัก1.jpg"]
  },
  {
    id: "floor567",
    floors: "5-7",
    accent: "coral",
    sqm: 34,
    price: 6200,
    name: {
      th: "ห้องพัก ชั้น 5-7",
      en: "Room — Floors 5-7",
      zh: "客房 — 5-7楼",
      ru: "Номер — Этажи 5-7"
    },
    tag: {
      th: "โทนสีส้มพีช วิวสูงกว่า",
      en: "Peach Coral Accent Wall, Higher Floor View",
      zh: "蜜桃珊瑚色主题墙，更高楼层视野",
      ru: "Коралловая акцентная стена, вид с высокого этажа"
    },
    images: ["Images/Floor567.jpg", "Images/Floor567-2.jpg", "Images/Floor567-3.jpg", "Images/Floor567-4.jpg", "Images/Floor567-5.jpg", "Images/วิวห้องพัก.jpg"]
  }
];

function getRoom(id) {
  return ROOMS.find(r => r.id === id);
}
