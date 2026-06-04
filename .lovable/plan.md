## Plan: Vercel-compatible fix

### 1. Fix admin access and article publishing
- Your email `hamwendamwando@gmail.com` already exists, is confirmed, and already has the `admin` role.
- The real blocker is database API permissions: the `articles`, `leads`, and `user_roles` tables currently have no explicit app-access grants, so Vercel/browser reads and writes can fail even though the role policies exist.
- Add a database migration that grants the correct access:
  - `articles`: public can read published articles; signed-in admins/editors can create, edit, publish, and delete.
  - `leads`: visitors can submit leads; signed-in admins can view, export, edit, and delete.
  - `user_roles`: signed-in users can read their own role; admins can manage roles.
  - service access remains available for trusted backend checks.
- Update the article editor to show clearer save/publish/upload errors instead of silently failing.

### 2. Make admin checks reliable on Vercel
- Adjust the admin access server function so server-only backend imports happen inside the handler, which is safer for Vercel/TanStack bundling.
- Keep the current allow-list fallback, but make the UI explain exactly whether the issue is sign-in, missing admin role, or a backend/env configuration problem.

### 3. Fix all images for Vercel hosting
- Replace Lovable-only asset JSON URLs like `/__l5e/assets-v1/...` with real static image files committed into the app/public build output.
- Download or recreate the current hero, case study, integration logo, and social preview images into repo-managed image files.
- Update imports in:
  - homepage hero
  - case studies
  - integrations list/page
  - root social preview image if needed
- Preserve existing alt text and responsive sizing.

### 4. Keep popup navigation white in all modes
- Ensure desktop dropdowns and mobile drawer use a white background with dark readable text in both light and dark mode.
- Remove any inherited dark-mode styling that can make the popup/nav panel dark.

### 5. Fix Vercel chatbot setup
- Rotate the managed AI key so Lovable shows a fresh `LOVABLE_API_KEY` value once.
- You will copy that new value into Vercel Environment Variables as `LOVABLE_API_KEY`, then redeploy.
- Keep the current user-facing chat error message so if Vercel is missing the key again, it shows a clear configuration message instead of blank replies.

### 6. Validate after implementation
- Verify the admin role grants are present.
- Verify article create/publish works from the app permissions side.
- Verify updated image paths are no longer `/__l5e/...`, so they can load on Vercel.
- Publish/update the Lovable preview changes, then you can redeploy Vercel with the new environment variable.