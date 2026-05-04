# Dependabot Configuration Guide

## What is Dependabot?

Dependabot is an automated dependency management service that keeps your project dependencies up-to-date by automatically creating pull requests with dependency updates.

## Configuration

This project uses Dependabot to manage:

- **NPM Dependencies** - Weekly updates on Mondays at 3:00 AM UTC
- **Gradle Dependencies** (Android) - Weekly updates on Mondays at 4:00 AM UTC
- **GitHub Actions** - Weekly updates on Tuesdays at 3:00 AM UTC

See `.github/dependabot.yml` for detailed configuration.

## How to Check if Dependabot is Working

### 1. Check GitHub Repository Settings

- Go to your GitHub repository
- Navigate to **Settings** → **Code security and analysis**
- Look for **Dependabot alerts** and **Dependabot security updates**
- Both should show as **Enabled**

### 2. Check Pull Requests

- Go to the **Pull Requests** tab
- Filter by `dependabot` label or author
- You should see PRs like: `chore(deps): bump dependency-name from x.x.x to y.y.y`

### 3. Check Dependabot Activity

- Go to **Insights** → **Dependency graph** → **Dependabot**
- View recent dependency update activity

### 4. Enable Dependabot Alerts

If alerts aren't enabled:

1. Settings → Code security and analysis
2. Enable **Dependabot alerts**
3. Enable **Dependabot security updates** (auto-merges security patches)

## Features Enabled

✅ **Weekly Scheduling** - Updates check weekly on set days/times
✅ **Limited PR Creation** - Max 5 npm PRs, 3 gradle, 5 actions to avoid PR spam
✅ **Auto-Rebase** - Automatically rebases stale PRs
✅ **Grouped Updates** - Development and production dependencies handled separately
✅ **Auto-Assignment** - PRs assigned to configured reviewers
✅ **Clear Naming** - Uses semantic commit prefixes (chore, ci)

## Workflow

1. Dependabot creates pull requests for dependency updates
2. CI checks run automatically (via your existing workflow)
3. Review and merge PRs as needed
4. Optionally configure auto-merge for minor/patch updates

## Verify Configuration is Valid

Run this command to validate the YAML:

```bash
npx dependabot-cli update-pr --config-file=.github/dependabot.yml
```

Or use online YAML validator at https://www.yamllint.com/

## Customization

To modify update schedules or settings, edit `.github/dependabot.yml`:

```yaml
schedule:
  interval: 'weekly' # daily, weekly, monthly
  day: 'monday' # monday, tuesday, etc.
  time: '03:00' # 00:00 to 23:00
  timezone: 'UTC'
```

## React Native Specific Notes

- React Native updates are carefully monitored (may need breaking change reviews)
- Gradle updates for Android dependencies are separated to avoid conflicts
- GitHub Actions are updated independently to prevent CI/CD breakage

## Troubleshooting

**No Dependabot PRs appearing?**

- Check repository has access to Dependabot (must be public or have GitHub Advanced Security)
- Verify `.github/dependabot.yml` is on the default branch
- Check if Dependabot alerts are enabled in settings

**Too many PRs?**

- Adjust `open-pull-requests-limit` in `.github/dependabot.yml`
- Change schedule interval to `monthly` instead of `weekly`

**Want to skip updates?**

- Add to ignore list in dependabot.yml:
  ```yaml
  ignore:
    - dependency-name: 'package-name'
      versions: ['1.x', '2.x']
  ```

## References

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Dependabot Configuration Reference](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-dependency-updates)
