# 🚀 PrayerApp Local Testing Guide

**Status:** ✅ Development Server Running
**URL:** http://localhost:3000
**Started:** Successfully on port 3000

---

## 📋 Pre-Flight Checklist

✅ **Environment Variables:** Configured (.env.local exists with Supabase credentials)
✅ **Dependencies:** Installed (node_modules present)
✅ **Development Server:** Running (Next.js 14.2.33)
✅ **Database:** Supabase configured (check connection below)

---

## 🧪 Testing Walkthrough

### **Step 1: Open Application**
- **URL:** http://localhost:3000
- **Expected:** Clean landing page with hero section and feature cards
- **Check:**
  - [ ] Page loads without errors
  - [ ] Vercel/Stripe aesthetic visible
  - [ ] Navigation header with Sign In/Get Started buttons
  - [ ] Hero text "Your daily prayer companion"
  - [ ] 4 feature cards on the right
  - [ ] Footer with links

---

### **Step 2: Test Authentication Flow**

#### **A. Registration (Sign Up)**
1. Click **"Get Started"** button in header
2. **URL:** http://localhost:3000/auth/register
3. **Test:**
   - [ ] Page shows clean registration form
   - [ ] Enter test data:
     ```
     Name: Test User
     Email: test@example.com
     Password: TestPass123!
     ```
   - [ ] Click "Create Account"
   - [ ] Should redirect to dashboard on success
   - [ ] If error: Check Supabase connection

#### **B. Login (Sign In)**
1. Click **"Sign In"** button in header
2. **URL:** http://localhost:3000/auth/login
3. **Test:**
   - [ ] Page shows clean login form
   - [ ] Enter credentials from registration
   - [ ] Click "Sign In"
   - [ ] Should redirect to dashboard
   - [ ] "Forgot?" link next to password field

---

### **Step 3: Test Dashboard**

After successful login:
1. **URL:** http://localhost:3000/dashboard
2. **Expected Features:**
   - [ ] User greeting/welcome message
   - [ ] Active enrollments section
   - [ ] Available goals section
   - [ ] Navigation menu
   - [ ] Logout functionality

---

### **Step 4: Test Goal Browsing**

1. Navigate to **Goals** section
2. **URL:** http://localhost:3000/goals
3. **Test:**
   - [ ] Goal marketplace loads
   - [ ] Filter by tags works
   - [ ] Goal cards display correctly
   - [ ] Click goal to see details

---

### **Step 5: Test Goal Enrollment**

1. Select any available goal
2. Click **"Enroll"** button
3. **Test enrollment options:**
   - [ ] Solo enrollment
   - [ ] Create group option
   - [ ] Join group with code
4. Complete enrollment
5. **Verify:**
   - [ ] Goal appears in dashboard
   - [ ] Can navigate to daily content

---

### **Step 6: Test Daily Progress**

1. Click enrolled goal from dashboard
2. **URL:** http://localhost:3000/goals/[id]/play/[enrollmentId]
3. **Test:**
   - [ ] Daily content displays
   - [ ] Can complete current day
   - [ ] Cannot skip ahead days
   - [ ] Progress saves correctly
   - [ ] Streak counter works

---

### **Step 7: Test Groups (Optional)**

1. Navigate to **Groups**
2. **URL:** http://localhost:3000/groups/create
3. **Test:**
   - [ ] Create new group
   - [ ] Get invite code
   - [ ] Join with code at /groups/join
   - [ ] Member list displays
   - [ ] Collective streak shows

---

### **Step 8: Test Notifications**

1. Click notification bell icon (if visible)
2. **Test:**
   - [ ] Notification center opens
   - [ ] Unread count displays
   - [ ] Can mark as read
   - [ ] Settings link works

---

## 🔍 Common Issues & Fixes

### **1. Page Not Loading**
```bash
# Check if server is running
curl http://localhost:3000

# Restart server if needed
npm run dev
```

### **2. Database Connection Error**
```bash
# Verify Supabase env vars
cat .env.local | grep SUPABASE

# Test Supabase connection
npm run test:db  # if script exists
```

### **3. Authentication Not Working**
- Check Supabase Auth settings
- Verify email confirmation is disabled for testing
- Check browser console for errors

### **4. Styles Not Loading**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📊 Performance Checks

### **Page Load Times**
- [ ] Landing page: < 2 seconds
- [ ] Dashboard: < 3 seconds
- [ ] Goal pages: < 2 seconds

### **Interactions**
- [ ] Button clicks responsive
- [ ] Forms submit smoothly
- [ ] Navigation instant
- [ ] No console errors

---

## 🛠️ Developer Tools

### **Check Console**
1. Open Chrome DevTools: `Cmd + Option + I`
2. Check Console tab for:
   - [ ] No red errors
   - [ ] No 404 resources
   - [ ] No CORS issues

### **Check Network**
1. Network tab in DevTools
2. Verify:
   - [ ] Supabase API calls succeed
   - [ ] Images load properly
   - [ ] No failed requests

### **Check Responsive Design**
1. Toggle device toolbar: `Cmd + Shift + M`
2. Test viewports:
   - [ ] Mobile (375px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1440px)

---

## ✅ Testing Checklist Summary

**Core Features:**
- [ ] Landing page loads
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard accessible
- [ ] Goals browsable
- [ ] Enrollment functional
- [ ] Daily content playable
- [ ] Progress tracked

**UI/UX:**
- [ ] Vercel/Stripe design applied
- [ ] Dark mode works (if applicable)
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] Loading states present

**Data:**
- [ ] Supabase connected
- [ ] Data persists
- [ ] Real-time updates work

---

## 📝 Test Account Credentials

For quick testing, create these accounts:

1. **Regular User:**
   - Email: user@test.com
   - Password: TestUser123!

2. **Author Account:**
   - Email: author@test.com
   - Password: TestAuthor123!

3. **Admin Account:**
   - Email: admin@test.com
   - Password: TestAdmin123!
   - Note: Manually set role='super_admin' in Supabase

---

## 🚦 Server Status

To check server status anytime:
```bash
# See if port 3000 is in use
lsof -i :3000

# Check Next.js process
ps aux | grep next
```

To stop the server:
```bash
# Press Ctrl+C in the terminal running npm run dev
# Or kill the process:
pkill -f "next dev"
```

---

## 📞 Need Help?

1. **Check logs:** Look at terminal output
2. **Browser console:** Check for JavaScript errors
3. **Network tab:** Verify API calls
4. **Supabase dashboard:** Check database/auth logs

---

**Testing Started:** December 4, 2025
**Environment:** Local Development
**Next.js Version:** 14.2.33