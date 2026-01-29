# Admin Panel Documentation

## Overview

A protected admin panel to view all invitation requests submitted through your landing page.

## Features

✅ **Password Protected** - Login with username/password from environment variables
✅ **Session Management** - Stays logged in during browser session
✅ **Invitation List** - View all invitation requests in a clean table
✅ **Statistics** - See total requests, latest request, and top referral source
✅ **Real-time Data** - Fetches fresh data from Cloud SQL database

## Access

**URL:** `https://your-domain.com/admin` or `http://localhost:3000/admin`

## Setup

### 1. Add Admin Credentials to .env.local

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
```

### 2. Restart Dev Server

```bash
npm run dev
```

### 3. Access Admin Panel

Visit `http://localhost:3000/admin` and login with your credentials.

## Deploy to Production

When deploying to Cloud Run, include the admin credentials:

```bash
gcloud run deploy funky-landing \
    --region=us-central1 \
    --source=. \
    --allow-unauthenticated \
    --set-env-vars="ADMIN_USERNAME=admin,ADMIN_PASSWORD=your-secure-admin-password,..."
```

**Security Recommendation:** Use Secret Manager for production:

```bash
# Store admin password in Secret Manager
echo -n "your-secure-admin-password" | gcloud secrets create admin-password --data-file=-

# Deploy with secret reference
gcloud run deploy funky-landing \
    --region=us-central1 \
    --source=. \
    --allow-unauthenticated \
    --set-env-vars="ADMIN_USERNAME=admin,..." \
    --set-secrets="ADMIN_PASSWORD=admin-password:latest"
```

## Features Breakdown

### Login Page
- Clean, modern login interface
- Username and password fields
- Show/hide password toggle
- Error messages for invalid credentials
- Session persistence (stays logged in until logout)

### Admin Dashboard
- **Table View**: Shows all invitation requests with:
  - Full Name
  - Email Address
  - Referral Source (with colored badge)
  - Request Date & Time

- **Statistics Cards**:
  - Total Requests
  - Latest Request Date
  - Top Referral Source

- **Actions**:
  - Logout button
  - Auto-refresh on login

### Security Features

1. **Server-Side Authentication**: Credentials checked on server, not exposed to client
2. **Session Storage**: Authentication state stored in browser session only
3. **No Database Storage**: Credentials never stored in database
4. **Environment Variables**: Credentials stored securely in env vars
5. **HTTPS Required**: Use HTTPS in production for secure transmission

## Customization

### Change Admin Credentials

Simply update the `.env.local` file:

```bash
ADMIN_USERNAME=myusername
ADMIN_PASSWORD=mynewpassword
```

### Add Multiple Admins (Future Enhancement)

Currently supports single admin. For multiple admins, you would need to:
1. Create a database table for admin users
2. Hash passwords (use bcrypt)
3. Update the auth endpoint to check against database

### Export Data (Future Enhancement)

To add CSV export, you could add a button that:
```javascript
const exportToCSV = () => {
  const csv = [
    ['Name', 'Email', 'Source', 'Date'],
    ...requests.map(r => [r.full_name, r.email, r.referral_source, r.requested_at])
  ].map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invitation-requests.csv';
  a.click();
};
```

## Troubleshooting

### "Admin credentials not configured" error
- Make sure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in `.env.local`
- Restart your dev server after adding environment variables

### "Invalid username or password" error
- Check that you're using the exact username and password from `.env.local`
- Environment variables are case-sensitive

### Can't see any requests
- Make sure the database is properly configured
- Check that invitation requests are being saved successfully
- Look at browser console for any errors

### Session expires too quickly
- Session is tied to browser session storage
- Closing the tab will clear the session
- To persist longer, you could use localStorage instead of sessionStorage

## Best Practices

1. **Use Strong Passwords**: Make admin password at least 16 characters
2. **Use HTTPS**: Never use HTTP in production for admin panel
3. **Use Secret Manager**: In production, store credentials in Secret Manager
4. **Regular Password Changes**: Change admin password periodically
5. **Monitor Access**: Add logging to track admin panel access (future enhancement)

## Pages & Routes

- `/admin` - Admin panel (protected)
- `/api/admin/auth` - Authentication endpoint (POST only)
- `/request-invitation` - Public invitation request form
