# Admin Setup Guide

## Kaise Admin Account Banaye

### Method 1: Script se (Easiest Way)

1. **Pehle ek normal user register karo** (Register page se)
   - Email: `admin@example.com`
   - Password: apna password
   - Name: Admin Name

2. **Terminal mein backend folder mein jao:**
   ```bash
   cd backend
   ```

3. **Script run karo:**
   ```bash
   npm run make-admin admin@example.com
   ```
   (Apni email id use karo jo aapne register ki thi)

4. **Done!** Ab us email se login karo aur admin dashboard access kar sakte ho.

---

### Method 2: MongoDB Compass/Shell se (Direct Database)

1. **MongoDB Compass kholo** ya MongoDB shell use karo

2. **Database select karo** (default: `ecommerce`)

3. **Users collection mein jao**

4. **User find karo** aur update karo:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

---

### Method 3: Node.js Script Directly

```bash
cd backend
node scripts/makeAdmin.js admin@example.com
```

---

## Admin Login Steps:

1. **Admin account se login karo** (jo email aapne admin banaya hai)

2. **Homepage par** top right corner mein **"⚙️ Admin Dashboard"** button dikhega

3. **Ya Navbar mein** **"⚙️ Admin"** link se access kar sakte ho

4. **Click karke Admin Dashboard kholo**

---

## Important Notes:

- ✅ Admin role sirf database mein manually set hota hai
- ✅ Register page se directly admin account nahi ban sakta (security ke liye)
- ✅ Ek baar admin banane ke baad, us account se login karke admin dashboard access kar sakte ho
- ✅ Admin dashboard mein products add/edit/delete kar sakte ho

---

## Troubleshooting:

**Q: Script run karne par error aata hai?**
A: Check karo ki:
- MongoDB running hai
- `.env` file mein `MONGO_URI` properly set hai
- Email address correct hai

**Q: Admin button nahi dikh raha?**
A: Check karo ki:
- Admin account se login kiye ho
- User ka role database mein "admin" hai
- Browser refresh karo




