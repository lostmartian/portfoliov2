# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Next.js portfolio to GitHub Pages with your custom domain for free!

## 📋 Prerequisites

- GitHub account
- Your custom domain
- Access to your domain's DNS settings

## 🔧 Step-by-Step Deployment

### 1. Push Your Code to GitHub

First, create a new repository on GitHub and push your code:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Next.js portfolio with GitHub Pages setup"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will automatically start

### 3. Configure Your Custom Domain

#### Option A: Using GitHub Settings (Recommended)

1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `yourdomain.com`)
3. Check **Enforce HTTPS** (recommended)
4. GitHub will automatically create a `CNAME` file

#### Option B: Manual CNAME File

If you prefer to manage the CNAME file manually:

```bash
# Replace 'yourdomain.com' with your actual domain
echo 'yourdomain.com' > public/CNAME

# Commit and push the change
git add public/CNAME
git commit -m "Add custom domain CNAME"
git push
```

### 4. Configure DNS Settings

You need to configure your domain's DNS settings to point to GitHub Pages:

#### For Root Domain (yourdomain.com):

Add these DNS records:

| Type | Name | Value           |
| ---- | ---- | --------------- |
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

#### For Subdomain (www.yourdomain.com):

Add this DNS record:

| Type  | Name | Value                  |
| ----- | ---- | ---------------------- |
| CNAME | www  | yourusername.github.io |

**Note:** Replace `yourusername` with your actual GitHub username.

### 5. Verify Deployment

1. Wait 5-10 minutes for DNS propagation
2. Visit your custom domain
3. Check that your site loads correctly
4. Verify HTTPS is working (if enabled)

## 🔄 Automatic Deployment

Once set up, your site will automatically deploy whenever you:

1. Push changes to the `main` branch
2. The GitHub Actions workflow will:
   - Install dependencies
   - Build your Next.js site
   - Deploy to GitHub Pages

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Site Not Loading

- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/)
- Verify CNAME file exists in your repository
- Check GitHub Pages settings

#### 2. HTTPS Issues

- Wait 24 hours after adding custom domain
- Check "Enforce HTTPS" in GitHub Pages settings
- Clear browser cache

#### 3. Build Failures

- Check GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify Next.js configuration

#### 4. 404 Errors

- Ensure `output: 'export'` is set in `next.config.ts`
- Check that `.nojekyll` file exists in `public/` directory
- Verify file paths are correct

### DNS Propagation Check

Use these tools to check if your DNS changes have propagated:

- [whatsmydns.net](https://www.whatsmydns.net/)
- [dnschecker.org](https://dnschecker.org/)

## 📁 Important Files

Make sure these files exist in your repository:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - Prevents Jekyll processing
- `public/CNAME` - Your custom domain (auto-created by GitHub)
- `next.config.ts` - Next.js static export configuration

## 🎯 Next Steps After Deployment

1. **Test Your Site**: Visit your domain and test all functionality
2. **Set Up Analytics**: Add Google Analytics or similar
3. **SEO Optimization**: Update meta tags and descriptions
4. **Performance**: Test site speed and optimize images
5. **SSL Certificate**: GitHub Pages provides free SSL certificates

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Configuration Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## 💡 Pro Tips

1. **Use HTTPS**: Always enable HTTPS for better security and SEO
2. **Monitor Deployments**: Check GitHub Actions tab for deployment status
3. **Test Locally**: Use `npm run serve` to test static export locally
4. **Backup**: Keep your domain DNS settings documented
5. **Performance**: Optimize images and use Next.js Image component

---

Your portfolio is now ready to go live! 🎉

Once deployed, your site will be available at your custom domain and will automatically update whenever you push changes to your repository.
