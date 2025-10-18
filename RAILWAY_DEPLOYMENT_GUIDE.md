# Railway Deployment Guide - Two Services Setup

Your application uses **TWO separate Railway services**:

## Architecture

```
Frontend (React + nginx)  →  Backend (Spring Boot + PostgreSQL)
https://prime-properties       https://prime-properties-production-d021
  .up.railway.app                .up.railway.app
```

---

## Backend Service Configuration

### Service Name: `prime-properties-production-d021`

### Settings in Railway Dashboard:

1. **Root Directory**: `backend`
2. **Build Method**: 
   - **Option 1 (Dockerfile)**: 
     - Builder: `DOCKERFILE`
     - Dockerfile Path: `Dockerfile`
   - **Option 2 (Nixpacks)**: Leave empty and Railway will auto-detect Maven

### Environment Variables (CRITICAL):

```bash
DATABASE_URL=<auto-provided-by-railway-postgresql>
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
JWT_SECRET=<min-32-chars-secret-key>
FRONTEND_URL=https://prime-properties.up.railway.app
PORT=<auto-provided-by-railway>
```

### Database Setup:
1. Add **PostgreSQL** plugin to your backend service
2. Railway automatically sets `DATABASE_URL`
3. Your app reads it via `application.properties`

---

## Frontend Service Configuration

### Service Name: `prime-properties`

### Settings in Railway Dashboard:

1. **Root Directory**: `frontend`
2. **Build Method**: 
   - Builder: `DOCKERFILE`
   - Dockerfile Path: `Dockerfile`

### Environment Variables:

```bash
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
NODE_ENV=production
```

### Port Configuration:
- Nginx listens on port 80
- Railway automatically maps it to public HTTPS

---

## Deployment Steps

### Step 1: Fix Backend Service (Currently Failing)

Go to **Railway Dashboard** → **Backend Service** → **Settings**:

1. **Set Root Directory**:
   ```
   backend
   ```

2. **Verify Dockerfile**:
   - Should find `backend/Dockerfile`
   - Or switch to Nixpacks (auto-detect Maven)

3. **Check Environment Variables**:
   - Verify all required variables are set
   - Especially `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`

4. **Trigger Redeploy**:
   - Click "Deploy" → "Redeploy"
   - Watch the build logs

### Step 2: Verify Frontend Service (Already Working)

Your frontend nginx is running fine! Just verify:

1. **Environment Variables**:
   ```bash
   REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
   ```

2. **Root Directory**:
   ```
   frontend
   ```

---

## Troubleshooting Backend

### Check Backend Logs

In Railway Dashboard → Backend Service → Logs, look for:

✅ **Success indicators:**
```
Started PrimePropertiesApplication in X seconds
Tomcat started on port(s): XXXX (http)
```

❌ **Error indicators:**
```
Failed to configure a DataSource
Connection refused
Port already in use
```

### Common Issues:

#### Issue 1: Database Connection Failed
**Symptom**: `Failed to configure a DataSource`
**Solution**: 
- Verify PostgreSQL plugin is attached
- Check `DATABASE_URL` is set
- Restart the service

#### Issue 2: Port Binding Failed
**Symptom**: `Port 8080 already in use`
**Solution**:
- Remove any hardcoded ports
- Let Railway assign port via `PORT` variable
- Our Dockerfile already handles this

#### Issue 3: Build Context Wrong
**Symptom**: `Could not find pom.xml`
**Solution**:
- Set Root Directory to `backend`
- Or use Dockerfile with correct context

#### Issue 4: Missing Environment Variables
**Symptom**: App starts but immediately crashes
**Solution**:
- Set all required environment variables
- Especially `JWT_SECRET` (minimum 32 characters)

---

## Manual Configuration (If Railway.json Doesn't Work)

### Backend Service Settings:

```yaml
Root Directory: backend
Build Command: (auto-detected or use Dockerfile)
Start Command: (auto-detected: java -jar target/*.jar)
Watch Paths: backend/**
```

### Frontend Service Settings:

```yaml
Root Directory: frontend
Build Command: (use Dockerfile)
Watch Paths: frontend/**
```

---

## Testing Your Deployment

### 1. Test Backend Health

```bash
curl https://prime-properties-production-d021.up.railway.app/actuator/health
```

Should return:
```json
{"status":"UP"}
```

### 2. Test Backend API

```bash
curl https://prime-properties-production-d021.up.railway.app/properties
```

Should return JSON array of properties.

### 3. Test Frontend

Visit: `https://prime-properties.up.railway.app`

- Should load React app
- Check browser console for API connection errors
- Verify it's calling the correct backend URL

---

## Quick Fix Commands

If backend keeps failing, try switching to Nixpacks:

### In Railway Dashboard → Backend Service:

1. **Remove** Root Directory setting
2. **Delete** any railway.json references
3. **Add** these build settings:
   ```
   Build Command: cd backend && mvn clean package -DskipTests
   Start Command: cd backend && java -jar target/*.jar
   ```

---

## Environment Variables Checklist

### Backend Service ✓

- [ ] `DATABASE_URL` (auto-set by PostgreSQL plugin)
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `JWT_SECRET` (min 32 characters)
- [ ] `FRONTEND_URL=https://prime-properties.up.railway.app`

### Frontend Service ✓

- [ ] `REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app`
- [ ] `NODE_ENV=production`

---

## Success Criteria

✅ Backend logs show: `Started PrimePropertiesApplication`
✅ Frontend loads without errors
✅ API calls succeed (check browser Network tab)
✅ Can see properties on the frontend
✅ Google OAuth redirect works

---

## Next Steps After Backend Deploys

1. Update Google OAuth redirect URIs:
   ```
   https://prime-properties.up.railway.app/auth/callback/google
   https://prime-properties-production-d021.up.railway.app/auth/callback/google
   ```

2. Test the full authentication flow

3. Monitor logs for any runtime errors

---

## Need Help?

If backend still fails:
1. Share the **backend service build logs** (not frontend)
2. Share **backend service deployment logs**
3. Verify **PostgreSQL plugin is attached** to backend service

