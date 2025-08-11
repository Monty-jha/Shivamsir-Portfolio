# Vercel Deployment Guide

## Prerequisites

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Make sure you have a Vercel account and are logged in.

## Environment Variables

Set these environment variables in your Vercel project dashboard:

### Required:
- `EMAIL_USER`: Your email address (e.g., shivam@metagrow.com)
- `EMAIL_PASS`: Your email app password (for Gmail, use App Password)

### Optional:
- `DATABASE_URL`: If you want to use an external database instead of in-memory storage

## Deployment Steps

1. **Build the project locally first:**
```bash
npm run build
```

2. **Deploy to Vercel:**
```bash
vercel --prod
```

3. **Or deploy using Vercel Dashboard:**
   - Connect your GitHub repository to Vercel
   - Set the build command: `npm run build`
   - Set the output directory: `dist/public`
   - Set the install command: `npm install`

## API Routes

The following API routes are available:

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (for admin use)

## Important Notes

1. **Email Service**: The email service is configured to use Gmail. You'll need to:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Set the `EMAIL_USER` and `EMAIL_PASS` environment variables

2. **Storage**: Currently using in-memory storage. Data will be lost when the serverless function restarts. For persistent storage, consider:
   - Using Vercel Postgres
   - Using a cloud database service
   - Implementing a database connection

3. **Admin Dashboard**: The admin dashboard functionality has been removed for Vercel deployment. You can access contact data via the `/api/contacts` endpoint.

## Troubleshooting

### Common Issues:

1. **Build Errors**: Make sure all dependencies are in `package.json`
2. **Email Not Sending**: Check environment variables and Gmail settings
3. **API Routes Not Working**: Verify the `vercel.json` configuration

### Vercel-Specific Considerations:

1. **Serverless Functions**: Each API call is a separate function invocation
2. **Cold Starts**: First request might be slower
3. **Function Timeout**: Default is 10 seconds, can be extended to 30 seconds
4. **Memory**: Limited to 1024MB per function

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API routes locally first
