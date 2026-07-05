/* ===== The Base Hua Hin Apartment — UI Translations (TH / EN / ZH / RU) ===== */

const LANGS = ["th", "en", "zh", "ru"];
const LANG_LABEL = { th: "ไทย", en: "EN", zh: "中文", ru: "RU" };

const I18N = {
  nav_rooms:      { th: "ห้องพัก", en: "Rooms", zh: "客房", ru: "Номера" },
  nav_amenities:  { th: "สิ่งอำนวยความสะดวก", en: "Amenities", zh: "设施", ru: "Удобства" },
  nav_location:   { th: "ที่ตั้ง", en: "Location", zh: "位置", ru: "Расположение" },
  nav_contact:    { th: "ติดต่อเรา", en: "Contact", zh: "联系我们", ru: "Контакты" },
  nav_reserve:    { th: "จองเลย", en: "Reserve", zh: "立即预订", ru: "Забронировать" },

  hero_badge:     { th: "อพาร์ทเมนท์ให้เช่ารายเดือน · หัวหิน", en: "Monthly Rental Apartment · Hua Hin", zh: "月租公寓 · 华欣", ru: "Апартаменты помесячно · Хуахин" },
  hero_title_pre: { th: "พักสบาย วิวภูเขา", en: "Comfortable Living,", zh: "舒适居住，", ru: "Комфортное проживание," },
  hero_title_em:  { th: "ใจกลางหัวหิน", en: "Mountain Views in Hua Hin", zh: "山景相伴，坐落华欣", ru: "вид на горы в Хуахине" },
  hero_lead:      { th: "The Base Hua Hin Apartment ห้องพักให้เช่ารายเดือน ขนาด 34 ตร.ม. ทุกห้อง พร้อมระเบียงวิวภูเขา สระว่ายน้ำดาดฟ้า และฟิตเนส เดินทางสะดวก ใกล้ตัวเมืองหัวหิน", en: "The Base Hua Hin Apartment offers monthly-rental rooms, all 34 sqm, each with a mountain-view balcony, plus a rooftop pool and fitness area — close to downtown Hua Hin.", zh: "The Base Hua Hin Apartment 提供月租房型，每间34平方米，均配有山景阳台，另设屋顶泳池与健身房，交通便利，靠近华欣市区。", ru: "The Base Hua Hin Apartment — апартаменты помесячно площадью 34 кв.м, у каждого балкон с видом на горы, а также бассейн на крыше и фитнес-зал, рядом с центром Хуахина." },
  hero_cta_reserve:{ th: "ส่งคำขอจอง", en: "Send a Reservation Request", zh: "发送预订申请", ru: "Отправить заявку на бронь" },
  hero_cta_rooms: { th: "ดูห้องพัก", en: "View Rooms", zh: "查看客房", ru: "Смотреть номера" },
  stat_sqm:       { th: "ตร.ม. ทุกห้อง", en: "sqm Every Room", zh: "平方米/间", ru: "кв.м в каждом номере" },
  stat_roomtypes: { th: "แบบห้องให้เลือก", en: "Room Styles", zh: "种房型可选", ru: "типа номеров" },
  stat_open:      { th: "เปิดบริการตลอดเวลา", en: "Always Open", zh: "全天候服务", ru: "Круглосуточно" },

  amenities_eyebrow:{ th: "สิ่งอำนวยความสะดวก", en: "Amenities", zh: "设施", ru: "Удобства" },
  amenities_title:{ th: "ครบครันสำหรับการพักระยะยาว", en: "Everything You Need for Long Stays", zh: "长住所需，一应俱全", ru: "Всё для долгосрочного проживания" },
  amenities_sub:  { th: "ออกแบบมาเพื่อการพักอาศัยรายเดือนโดยเฉพาะ พร้อมสิ่งอำนวยความสะดวกครบครัน", en: "Designed specifically for monthly stays, with full facilities included.", zh: "专为月租长住设计，配套设施一应俱全。", ru: "Создано специально для длительного проживания, со всеми удобствами." },
  amen1_h:        { th: "สระว่ายน้ำดาดฟ้า", en: "Rooftop Swimming Pool", zh: "屋顶游泳池", ru: "Бассейн на крыше" },
  amen1_p:        { th: "ผ่อนคลายกับสระว่ายน้ำวิวเปิดโล่งบนดาดฟ้า เปิดให้ใช้บริการทุกวัน", en: "Unwind at our open-air rooftop pool, open every day.", zh: "在屋顶露天泳池尽情放松，每日开放。", ru: "Отдохните у открытого бассейна на крыше, доступен ежедневно." },
  amen2_h:        { th: "ฟิตเนส", en: "Fitness Area", zh: "健身房", ru: "Фитнес-зона" },
  amen2_p:        { th: "พื้นที่ออกกำลังกายพร้อมอุปกรณ์ครบครัน ใช้งานได้ตลอดเวลา", en: "Fully equipped fitness area, available around the clock.", zh: "设备齐全的健身区，全天可用。", ru: "Полностью оборудованная зона для тренировок, доступна круглосуточно." },
  amen3_h:        { th: "ดาดฟ้าวิวภูเขา", en: "Rooftop Mountain View Deck", zh: "山景屋顶露台", ru: "Терраса с видом на горы" },
  amen3_p:        { th: "ชมวิวภูเขาแบบพาโนรามาจากดาดฟ้าชั้นบนสุด บรรยากาศดีทุกช่วงเวลา", en: "Panoramic mountain views from the top-floor deck, beautiful any time of day.", zh: "顶楼露台可欣赏360°山景，任何时段都美不胜收。", ru: "Панорамный вид на горы с террасы на верхнем этаже в любое время суток." },
  amen4_h:        { th: "ระเบียงวิวภูเขาทุกห้อง", en: "Mountain-View Balcony in Every Room", zh: "每间客房均设山景阳台", ru: "Балкон с видом на горы в каждом номере" },
  amen4_p:        { th: "ทุกห้องพักมีระเบียงส่วนตัวพร้อมวิวภูเขา รับลมธรรมชาติได้เต็มที่", en: "Every room comes with a private balcony overlooking the mountains and fresh natural air.", zh: "每间客房均配有私人阳台，享受山景与自然清风。", ru: "У каждого номера собственный балкон с видом на горы и свежим воздухом." },
  amen5_h:        { th: "กลอนประตูคีย์การ์ด", en: "Keycard Door Lock", zh: "门禁卡锁", ru: "Дверной замок с ключ-картой" },
  amen5_p:        { th: "ระบบความปลอดภัยด้วยคีย์การ์ด อุ่นใจตลอดการพักอาศัย", en: "Secure keycard access system for peace of mind throughout your stay.", zh: "门禁卡安全系统，让您安心入住。", ru: "Система безопасности с ключ-картой для вашего спокойствия." },
  amen6_h:        { th: "เปิดบริการตลอด 24 ชั่วโมง", en: "Open 24 Hours", zh: "24小时营业", ru: "Работает круглосуточно" },
  amen6_p:        { th: "ทีมงานพร้อมดูแลและให้บริการทุกช่วงเวลา", en: "Our team is ready to assist you around the clock.", zh: "我们的团队随时为您提供服务。", ru: "Наша команда готова помочь вам в любое время." },

  rooms_eyebrow:  { th: "ห้องพัก", en: "Rooms", zh: "客房", ru: "Номера" },
  rooms_title:    { th: "เลือกห้องพักที่ใช่สำหรับคุณ", en: "Choose the Room That's Right for You", zh: "选择适合您的房型", ru: "Выберите подходящий номер" },
  rooms_sub:      { th: "ห้องพักขนาด 34 ตร.ม. เท่ากันทั้ง 2 แบบ ต่างกันที่โทนสีผนังและระดับชั้น", en: "Both room styles are 34 sqm — the difference is the accent wall color and floor level.", zh: "两种房型均为34平方米，区别在于主题墙颜色与楼层高度。", ru: "Оба типа номеров площадью 34 кв.м — отличие в цвете акцентной стены и этаже." },
  room_view_btn:  { th: "ดู & จอง", en: "View & Reserve", zh: "查看并预订", ru: "Смотреть и забронировать" },
  room_sqm_label: { th: "ตร.ม.", en: "sqm", zh: "平方米", ru: "кв.м" },
  room_floor_label:{ th: "ชั้น", en: "Floor", zh: "楼层", ru: "Этаж" },
  price_contact:  { th: "ติดต่อสอบถามอัตราค่าเช่า", en: "Contact Us for Rates", zh: "请咨询租金详情", ru: "Уточняйте стоимость" },
  price_from:     { th: "เริ่มต้น", en: "From", zh: "起", ru: "От" },
  price_month_unit:{ th: "บาท/เดือน", en: "THB/mo", zh: "泰铢/月", ru: "бат/мес" },
  price_daily_note:{ th: "หรือรายวัน 700 บาท/คืน", en: "Or from 700 THB/night", zh: "或日租700泰铢/晚起", ru: "Или от 700 бат/ночь посуточно" },

  location_eyebrow:{ th: "ที่ตั้ง", en: "Location", zh: "位置", ru: "Расположение" },
  location_title: { th: "ที่ตั้งสะดวก ใกล้ตัวเมืองหัวหิน", en: "Convenient Location, Close to Downtown Hua Hin", zh: "位置便利，靠近华欣市区", ru: "Удобное расположение рядом с центром Хуахина" },
  location_p:     { th: "23/613 ซ.หมู่บ้านทางรถไฟตะวันตก ต.หัวหิน อ.หัวหิน จ.ประจวบคีรีขันธ์ 77110 เดินทางสะดวก ใกล้แหล่งอำนวยความสะดวกต่างๆ ในตัวเมืองหัวหิน", en: "23/613 Soi Mooban Tang Rotfai Tawantok, Hua Hin, Prachuap Khiri Khan 77110. Easy access to downtown Hua Hin and nearby amenities.", zh: "地址：23/613 Soi Mooban Tang Rotfai Tawantok, 华欣，佛丕府 77110。交通便利，靠近华欣市区各类生活设施。", ru: "Адрес: 23/613 Soi Mooban Tang Rotfai Tawantok, Хуахин, 77110. Удобная транспортная доступность до центра Хуахина." },
  location_btn_map:{ th: "เปิดใน Google Maps", en: "Open in Google Maps", zh: "在谷歌地图中打开", ru: "Открыть в Google Maps" },
  location_nearby_label:{ th: "สถานที่ใกล้เคียง", en: "Nearby Places", zh: "附近地标", ru: "Рядом расположены" },

  review_eyebrow: { th: "รีวิวจากผู้เข้าพัก", en: "Guest Reviews", zh: "住客评价", ru: "Отзывы гостей" },
  review_title:   { th: "สิ่งที่ผู้เข้าพักพูดถึงเรา", en: "What Guests Say About Us", zh: "住客怎么说", ru: "Что говорят наши гости" },
  review_percent_label:{ th: "แนะนำ", en: "Recommend", zh: "推荐率", ru: "рекомендуют" },
  review_count_label:{ th: "รีวิวทั้งหมด", en: "Total Reviews", zh: "总评价数", ru: "всего отзывов" },
  review_cta:     { th: "ดูรีวิวทั้งหมดบน Facebook", en: "See All Reviews on Facebook", zh: "在Facebook上查看全部评价", ru: "Смотреть все отзывы на Facebook" },

  contact_title:  { th: "ติดต่อเรา", en: "Get in Touch", zh: "联系我们", ru: "Свяжитесь с нами" },
  contact_sub:    { th: "มีคำถามเกี่ยวกับห้องพักหรือการจอง? เรายินดีให้ข้อมูล", en: "Questions about our rooms or booking? We're happy to help.", zh: "对客房或预订有疑问？我们乐意为您解答。", ru: "Вопросы о номерах или бронировании? Мы будем рады помочь." },
  contact_call:   { th: "โทรหาเรา", en: "Call Us", zh: "致电我们", ru: "Позвоните нам" },
  contact_email:  { th: "อีเมล", en: "Email", zh: "电子邮件", ru: "Эл. почта" },
  contact_fb:     { th: "Facebook Messenger", en: "Facebook Messenger", zh: "Facebook Messenger", ru: "Facebook Messenger" },

  faq_eyebrow:    { th: "คำถามที่พบบ่อย", en: "FAQ", zh: "常见问题", ru: "Частые вопросы" },
  faq_title:      { th: "คำถามที่พบบ่อย", en: "Frequently Asked Questions", zh: "常见问题解答", ru: "Часто задаваемые вопросы" },
  faq1_q:         { th: "ค่าเช่าเดือนละเท่าไหร่?", en: "How much is the monthly rent?", zh: "月租多少钱？", ru: "Сколько стоит аренда в месяц?" },
  faq1_a:         { th: "ค่าเช่ารายเดือนเริ่มต้น 6,200 บาท/เดือน (ราคาขึ้นอยู่กับแบบห้องและช่วงเวลา) นอกจากนี้ยังมีรายวัน เริ่มต้น 700 บาท/คืน สอบถามห้องว่างได้ที่ 063 349 7200 หรืออีเมล thebasehuahin@gmail.com", en: "Monthly rent starts from 6,200 THB/month (rate depends on room type and season). Nightly stays are also available from 700 THB/night. Check availability at 063 349 7200 or thebasehuahin@gmail.com", zh: "月租起价6,200泰铢/月（价格视房型及季节而定），另提供日租，起价700泰铢/晚。查询空房请致电 063 349 7200 或发邮件至 thebasehuahin@gmail.com", ru: "Аренда помесячно от 6 200 бат/месяц (цена зависит от типа номера и сезона). Также доступна посуточная аренда от 700 бат/ночь. Уточняйте наличие по тел. 063 349 7200 или email thebasehuahin@gmail.com" },
  faq2_q:         { th: "เช่าขั้นต่ำกี่เดือน?", en: "What's the minimum rental period?", zh: "最低租期是多久？", ru: "Каков минимальный срок аренды?" },
  faq2_a:         { th: "สัญญาเช่ารายเดือนขั้นต่ำ 3 เดือนขึ้นไป หากต้องการพักระยะสั้นกว่านั้น มีห้องพักรายวันเริ่มต้น 700 บาท/คืน ให้บริการเช่นกัน กรุณาระบุระยะเวลาที่ต้องการในฟอร์มจอง หรือติดต่อสอบถามโดยตรง", en: "The minimum monthly contract is 3 months. For shorter stays, nightly rooms are available from 700 THB/night. Please specify your preferred duration in the reservation form, or contact us directly.", zh: "月租合同最短为3个月。如需更短的入住时间，也提供日租房间，起价700泰铢/晚。请在预订表单中注明您需要的租期，或直接联系我们。", ru: "Минимальный срок аренды помесячно — 3 месяца. Для более коротких визитов доступны номера посуточно от 700 бат/ночь. Укажите желаемый срок в форме бронирования или свяжитесь с нами напрямую." },
  faq3_q:         { th: "มีที่จอดรถหรือไม่?", en: "Is parking available?", zh: "是否提供停车位？", ru: "Есть ли парковка?" },
  faq3_a:         { th: "มีที่จอดรถสำหรับผู้เข้าพัก", en: "Yes, parking is available for residents.", zh: "为住客提供停车位。", ru: "Да, для жильцов есть парковка." },
  faq4_q:         { th: "ต้องวางมัดจำหรือไม่?", en: "Is a deposit required?", zh: "需要支付押金吗？", ru: "Требуется ли залог?" },
  faq4_a:         { th: "มีการวางมัดจำ 1 เดือน เท่ากับค่าเช่า เช่น ค่าเช่าห้อง 6,200 บาท ก็วางมัดจำเพิ่มอีก 6,200 บาท", en: "A deposit equal to 1 month's rent is required — e.g. if the room is 6,200 THB/month, the deposit is an additional 6,200 THB.", zh: "需缴纳相当于1个月租金的押金——例如房租为6,200泰铢/月，则需另付押金6,200泰铢。", ru: "Требуется залог в размере месячной арендной платы — например, при аренде 6 200 бат/месяц залог составит ещё 6 200 бат." },
  faq5_q:         { th: "ใกล้สถานที่ท่องเที่ยวหัวหินหรือไม่?", en: "Is it close to Hua Hin attractions?", zh: "是否靠近华欣旅游景点？", ru: "Рядом ли с достопримечательностями Хуахина?" },
  faq5_a:         { th: "ที่พักตั้งอยู่ใกล้ตัวเมืองหัวหิน เดินทางสะดวกไปยังเขาหินเหล็กไฟ ศาลหัวหิน Hua Hin Market Village และ Blu'port", en: "We're located close to downtown Hua Hin, with easy access to Khao Hin Lek Fai, the Hua Hin City Pillar Shrine, Hua Hin Market Village, and Blu'port.", zh: "住宿地点靠近华欣市区，前往针铁山（Khao Hin Lek Fai）、华欣城隍庙、Hua Hin Market Village 及 Blu'port 都十分便利。", ru: "Мы расположены рядом с центром Хуахина, рядом с горой Khao Hin Lek Fai, святилищем City Pillar Shrine, Hua Hin Market Village и Blu'port." },

  footer_about:   { th: "The Base Hua Hin Apartment — อพาร์ทเมนท์ให้เช่ารายเดือน วิวภูเขา ใจกลางหัวหิน พร้อมสระว่ายน้ำดาดฟ้าและฟิตเนส", en: "The Base Hua Hin Apartment — a monthly-rental apartment with mountain views in the heart of Hua Hin, featuring a rooftop pool and fitness area.", zh: "The Base Hua Hin Apartment — 位于华欣市中心的月租公寓，坐拥山景，配有屋顶泳池与健身房。", ru: "The Base Hua Hin Apartment — апартаменты помесячно с видом на горы в центре Хуахина, с бассейном на крыше и фитнес-залом." },
  footer_explore: { th: "สำรวจ", en: "Explore", zh: "探索", ru: "Разделы" },
  footer_contact_h:{ th: "ติดต่อ", en: "Contact", zh: "联系方式", ru: "Контакты" },
  footer_rights:  { th: "© 2026 The Base Hua Hin Apartment", en: "© 2026 The Base Hua Hin Apartment", zh: "© 2026 The Base Hua Hin Apartment", ru: "© 2026 The Base Hua Hin Apartment" },

  back_home:      { th: "กลับหน้าแรก", en: "Back to Home", zh: "返回首页", ru: "На главную" },

  /* ===== Reserve page ===== */
  reserve_eyebrow:{ th: "ขอจองห้องพัก", en: "Room Reservation", zh: "客房预订", ru: "Бронирование номера" },
  reserve_title:  { th: "ส่งคำขอจองห้องพัก", en: "Send a Room Reservation Request", zh: "发送客房预订申请", ru: "Отправить заявку на бронирование" },
  reserve_sub:    { th: "กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียดและแจ้งอัตราค่าเช่า", en: "Fill in the details below and our team will contact you to confirm and share the rental rate.", zh: "填写以下信息，我们的团队将与您联系确认详情并告知租金。", ru: "Заполните форму ниже, и наша команда свяжется с вами для подтверждения и уточнения стоимости." },
  reserve_note_box:{ th: "หมายเหตุ: นี่คือ \"คำขอจอง\" ไม่ใช่การยืนยันอัตโนมัติ เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมงเพื่อยืนยันห้องว่างและอัตราค่าเช่า", en: "Note: this is a reservation request, not an instant confirmation. Our staff will contact you within 24 hours to confirm availability and rates.", zh: "提示：这是一份预订申请，并非即时确认。我们的工作人员将在24小时内与您联系，确认空房情况及租金。", ru: "Примечание: это заявка на бронирование, а не мгновенное подтверждение. Наш персонал свяжется с вами в течение 24 часов, чтобы подтвердить наличие и стоимость." },
  reserve_room_label:{ th: "เลือกแบบห้อง", en: "Choose Room Type", zh: "选择房型", ru: "Выберите тип номера" },
  reserve_type_label:{ th: "ต้องการจองแบบไหน?", en: "What kind of stay?", zh: "您想预订哪种类型？", ru: "Какой тип проживания?" },
  reserve_type_daily:{ th: "รายวัน", en: "Nightly", zh: "日租", ru: "Посуточно" },
  reserve_type_monthly:{ th: "รายเดือน", en: "Monthly", zh: "月租", ru: "Помесячно" },
  reserve_type_daily_hint:{ th: "รายวันเริ่มต้น 700 บาท/คืน", en: "Nightly rates start from 700 THB/night", zh: "日租起价700泰铢/晚", ru: "Посуточно от 700 бат/ночь" },
  reserve_name:   { th: "ชื่อ-นามสกุล", en: "Full Name", zh: "姓名", ru: "Полное имя" },
  reserve_phone:  { th: "เบอร์โทรศัพท์", en: "Phone Number", zh: "电话号码", ru: "Номер телефона" },
  reserve_email:  { th: "อีเมล (ถ้ามี)", en: "Email (optional)", zh: "电子邮件（可选）", ru: "Эл. почта (необязательно)" },
  reserve_checkin:{ th: "วันเช็คอิน", en: "Check-in Date", zh: "入住日期", ru: "Дата заезда" },
  reserve_checkout:{ th: "วันเช็คเอาท์", en: "Check-out Date", zh: "退房日期", ru: "Дата выезда" },
  reserve_movein: { th: "วันที่ต้องการเข้าพัก", en: "Preferred Move-in Date", zh: "期望入住日期", ru: "Желаемая дата заезда" },
  reserve_duration:{ th: "ระยะเวลาเช่า", en: "Rental Duration", zh: "租期", ru: "Срок аренды" },
  reserve_dur_3:  { th: "3 เดือน", en: "3 months", zh: "3个月", ru: "3 месяца" },
  reserve_dur_6:  { th: "6 เดือน", en: "6 months", zh: "6个月", ru: "6 месяцев" },
  reserve_dur_12: { th: "12 เดือน", en: "12 months", zh: "12个月", ru: "12 месяцев" },
  reserve_dur_more:{ th: "มากกว่า 12 เดือน", en: "More than 12 months", zh: "12个月以上", ru: "Более 12 месяцев" },
  reserve_duration_hint:{ th: "สัญญาเช่ารายเดือนขั้นต่ำ 3 เดือน · มัดจำ 1 เดือน (เท่ากับค่าเช่า)", en: "Minimum monthly contract is 3 months · deposit equals 1 month's rent.", zh: "月租合同最短3个月 · 押金为1个月租金。", ru: "Минимальный срок аренды — 3 месяца · залог равен месячной оплате." },
  reserve_note:   { th: "หมายเหตุเพิ่มเติม (ถ้ามี)", en: "Additional Notes (optional)", zh: "备注（可选）", ru: "Дополнительно (необязательно)" },
  reserve_submit_btn:{ th: "ส่งคำขอจอง", en: "Send Reservation Request", zh: "发送预订申请", ru: "Отправить заявку" },
  reserve_sending:{ th: "กำลังส่ง...", en: "Sending...", zh: "发送中...", ru: "Отправка..." },
  reserve_err_fail:{ th: "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือโทรติดต่อเราโดยตรง", en: "Something went wrong. Please try again, or call us directly.", zh: "出现错误，请重试，或直接致电联系我们。", ru: "Произошла ошибка. Попробуйте снова или позвоните нам напрямую." },
  reserve_validation_room:{ th: "กรุณาเลือกแบบห้อง", en: "Please choose a room type.", zh: "请选择房型。", ru: "Пожалуйста, выберите тип номера." },
  reserve_validation_info:{ th: "กรุณากรอกชื่อและเบอร์โทรศัพท์", en: "Please enter your name and phone number.", zh: "请填写姓名和电话号码。", ru: "Пожалуйста, укажите имя и номер телефона." },
  reserve_validation_date:{ th: "กรุณาเลือกวันที่ต้องการเข้าพัก", en: "Please choose a preferred move-in date.", zh: "请选择期望入住日期。", ru: "Пожалуйста, выберите дату заезда." },
  reserve_validation_checkinout:{ th: "กรุณาเลือกวันเช็คอินและเช็คเอาท์ (เช็คเอาท์ต้องอยู่หลังเช็คอิน)", en: "Please choose check-in and check-out dates (check-out must be after check-in).", zh: "请选择入住及退房日期（退房日期须晚于入住日期）。", ru: "Пожалуйста, выберите даты заезда и выезда (выезд должен быть позже заезда)." },
  reserve_alt_title:{ th: "หรือติดต่อโดยตรง", en: "Or Contact Us Directly", zh: "或直接联系我们", ru: "Или свяжитесь с нами напрямую" },
  reserve_alt_call:{ th: "โทรหาเรา", en: "Call Us", zh: "致电我们", ru: "Позвонить" },
  reserve_alt_fb: { th: "Facebook", en: "Facebook", zh: "Facebook", ru: "Facebook" },

  reserve_success_title:{ th: "ส่งคำขอจองสำเร็จ! 🎉", en: "Reservation Request Sent! 🎉", zh: "预订申请已发送！🎉", ru: "Заявка отправлена! 🎉" },
  reserve_success_msg:{ th: "ทีมงาน The Base Hua Hin Apartment ได้รับคำขอจองของคุณแล้ว จะติดต่อกลับเพื่อยืนยันห้องว่างและอัตราค่าเช่าภายใน 24 ชั่วโมง", en: "The Base Hua Hin Apartment has received your request and will contact you within 24 hours to confirm availability and rates.", zh: "The Base Hua Hin Apartment 已收到您的申请，将在24小时内与您联系以确认空房及租金。", ru: "The Base Hua Hin Apartment получил вашу заявку и свяжется с вами в течение 24 часов для подтверждения наличия и стоимости." },
  reserve_success_room:{ th: "ห้องที่เลือก", en: "Room", zh: "所选房型", ru: "Номер" },
  reserve_success_movein:{ th: "วันที่ต้องการเข้าพัก", en: "Move-in Date", zh: "入住日期", ru: "Дата заезда" },
  reserve_success_duration:{ th: "ระยะเวลาเช่า", en: "Duration", zh: "租期", ru: "Срок аренды" },
  reserve_success_checkin:{ th: "เช็คอิน", en: "Check-in", zh: "入住", ru: "Заезд" },
  reserve_success_checkout:{ th: "เช็คเอาท์", en: "Check-out", zh: "退房", ru: "Выезд" },
  reserve_new_btn:{ th: "🔁 ส่งคำขออีกครั้ง", en: "🔁 Send Another Request", zh: "🔁 再次发送申请", ru: "🔁 Отправить ещё одну заявку" }
};

let currentLang = localStorage.getItem("tbh_lang") || "th";

/**
 * "15 กรกฎาคม 2569" / "15 July 2026" / etc. — day-month-year order in every
 * language (rather than each locale's own conventional order), per request.
 * Thai shows the Buddhist year; other languages show the Gregorian year.
 */
function formatDateHuman(isoStr){
  if(!isoStr) return "-";
  const d = new Date(isoStr + "T00:00:00");
  if(isNaN(d)) return isoStr;
  const day = d.getDate();
  const month = new Intl.DateTimeFormat(currentLang, { month: "long" }).format(d);
  const year = currentLang === "th" ? d.getFullYear() + 543 : d.getFullYear();
  return `${day} ${month} ${year}`;
}

function t(key){
  const entry = I18N[key];
  if(!entry) return key;
  return entry[currentLang] || entry.th || key;
}

function applyI18n(){
  document.documentElement.lang = currentLang === "th" ? "th" : currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });
  ["renderRooms", "renderRoomChoice", "renderReserveSummary"].forEach(fnName => {
    if (typeof window[fnName] === "function") window[fnName]();
  });
}

function setLang(lang){
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem("tbh_lang", lang);
  applyI18n();
}

function buildLangSwitch(){
  return LANGS.map(l =>
    `<button data-lang="${l}" onclick="setLang('${l}')">${LANG_LABEL[l]}</button>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-switch").forEach(el => {
    el.innerHTML = buildLangSwitch();
  });
  applyI18n();
});
