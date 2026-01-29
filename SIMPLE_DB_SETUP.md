# Simple Database Setup (Username/Password)

This is a simpler approach using traditional username/password authentication instead of IAM.

## Step 1: Create a Database User with Password

```bash
# Create a new database user with a password
gcloud sql users create appuser \
    --instance=free-trial-first-project \
    --password=YOUR_SECURE_PASSWORD
```

Replace `YOUR_SECURE_PASSWORD` with a strong password of your choice.

## Step 2: Make Sure Database Exists

```bash
# Create the database if it doesn't exist
gcloud sql databases create quickstart_db \
    --instance=free-trial-first-project
```

## Step 3: Create .env.local File

Create a file named `.env.local` in your project root with:

```bash
# Cloud SQL Configuration
INSTANCE_CONNECTION_NAME=funky-485504:us-central1:free-trial-first-project
DB_USER=appuser
DB_PASSWORD=YOUR_SECURE_PASSWORD
DB_NAME=quickstart_db

# Admin Panel Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password

# PostHog (if you're using it)
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Step 4: Test Locally

```bash
# Make sure you're authenticated
gcloud auth application-default login

# Start your dev server
npm run dev
```

Visit http://localhost:3000/request-invitation and test the form!

## Step 5: Deploy to Cloud Run

```bash
gcloud run deploy funky-landing \
    --region=us-central1 \
    --source=. \
    --allow-unauthenticated \
    --set-env-vars="INSTANCE_CONNECTION_NAME=funky-485504:us-central1:free-trial-first-project,DB_USER=appuser,DB_PASSWORD=YOUR_SECURE_PASSWORD,DB_NAME=quickstart_db,ADMIN_USERNAME=admin,ADMIN_PASSWORD=your-admin-password"
```

⚠️ **Security Note**: For production, use [Secret Manager](https://cloud.google.com/secret-manager) instead of passing passwords directly:

```bash
# Store password in Secret Manager
echo -n "YOUR_SECURE_PASSWORD" | gcloud secrets create db-password --data-file=-

# Deploy with secret reference
gcloud run deploy funky-landing \
    --region=us-central1 \
    --source=. \
    --allow-unauthenticated \
    --set-env-vars="INSTANCE_CONNECTION_NAME=funky-485504:us-central1:free-trial-first-project,DB_USER=appuser,DB_NAME=quickstart_db" \
    --set-secrets="DB_PASSWORD=db-password:latest"
```

## That's It!

Much simpler than IAM authentication. The table will be created automatically when someone first submits the invitation form.
