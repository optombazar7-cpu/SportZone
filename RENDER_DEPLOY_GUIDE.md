# SportZone - Render ga Deploy Qilish Yo'riqnomasi

## 📋 Umumiy Ma'lumot
Bu yo'riqnoma SportZone sport mahsulotlari do'konini Render platformasiga deploy qilish uchun.

## 🏗️ Loyiha Strukturasi
```
├── frontend/          # React.js frontend
├── backend/           # Node.js + Express backend  
├── shared/            # Umumiy schema va types
└── attached_assets/   # Rasm va media fayllar
```

## ☁️ Render ga Deploy Qilish

### 1. GitHub Repository Yaratish
```bash
git init
git add .
git commit -m "SportZone loyihasi - Render deploy uchun tayyorlandi"
git remote add origin https://github.com/username/sportzone
git push -u origin main
```

### 2. PostgreSQL Database Yaratish

**Render Dashboard da:**
1. "New" → "PostgreSQL" tanlang
2. Sozlamalar:
   - **Service Name**: `sportshop-db`
   - **Database Name**: `sportshop_db` 
   - **Username**: `sportuser`
   - **Instance Type**: Free (test uchun) yoki $7/oy
3. Database yaratilgandan keyin `DATABASE_URL` ni ko'chirib oling

### 3. Backend Web Service

**Render Dashboard da:**
1. "New" → "Web Service" tanlang
2. GitHub repository ni ulang
3. Sozlamalar:
   - **Service Name**: `sportshop-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

**Environment Variables qo'shing:**
```
DATABASE_URL=postgresql://sportuser:password@host:5432/sportshop_db
JWT_SECRET=your_super_secret_jwt_key_here
PORT=10000
FRONTEND_URL=https://sportshop-frontend.onrender.com
NODE_ENV=production
```

### 4. Frontend Web Service  

**Render Dashboard da:**
1. "New" → "Web Service" tanlang
2. Xuddi shu GitHub repository ni ulang
3. Sozlamalar:
   - **Service Name**: `sportshop-frontend`
   - **Root Directory**: `frontend`
   - **Runtime**: Node.js
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

**Environment Variables qo'shing:**
```
VITE_API_URL=https://sportshop-backend.onrender.com
NODE_ENV=production
```

## 🔧 Xususiy Domen Sozlash (Ixtiyoriy)

### Backend uchun:
- **Custom Domain**: `api.sportmarket.uz`
- SSL sertifikat avtomatik o'rnatiladi

### Frontend uchun:
- **Custom Domain**: `sportmarket.uz` yoki `www.sportmarket.uz`
- SSL sertifikat avtomatik o'rnatiladi

## 📊 Health Check
Backend `/api/health` endpoint orqali server holatini tekshirish mumkin:
```
GET https://api.sportmarket.uz/api/health
```

## 🚀 Avtomatik Deploy
- GitHub `main` branchga har push qilganingizda avtomatik deploy bo'ladi
- Deploy jarayonini Render dashboard da kuzatishingiz mumkin

## 📝 Muhim Eslatmalar
1. Database migratsiyalarini deploy qilishdan oldin ishga tushiring: `npm run db:push`
2. CORS sozlamalari frontend URL ni qo'llab-quvvatlaydi
3. SSL sertifikatlar avtomatik yangilanadi
4. Free plan da 750 soat/oy cheklovi bor

## 🔗 Natija URL lar
- **Frontend**: https://sportshop-frontend.onrender.com
- **Backend API**: https://sportshop-backend.onrender.com
- **Health Check**: https://sportshop-backend.onrender.com/api/health