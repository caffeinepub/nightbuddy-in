# NightBuddy.in

## Current State

The landing page has a working 2-step onboarding flow (Name+Email → Profile Setup) with a password-protected admin panel at /admin. The frontend UI, dark theme, rooftop illustration, and all design elements are complete and should NOT be changed.

**Root problems identified:**

1. **Backend data loss bug**: The `preupgrade` and `postupgrade` lifecycle hooks both call `Array.empty<Signup>()` which clears `signups` (an unused variable). The actual data lives in `signupsBuffer` which has no stable migration hooks — meaning data survives within a single session but is lost on any canister upgrade/redeploy.

2. **Actor initialization race condition**: The `waitForActor` polling timeout is 8 seconds. On ICP cold starts this can be insufficient. After timeout, a generic error is shown.

3. **No User ID field**: The database stores name, email, ageRange, country, gender, timestamp — but no unique userId. Requirement asks for a userId.

4. **submitProfile fails silently if email not found**: Uses `Runtime.trap` which throws an unhandled error on the frontend.

## Requested Changes (Diff)

### Add
- Unique userId field (auto-generated) to the Signup record stored in backend
- getSignupCount query function for the counter display
- Proper stable data persistence using a single `stable var` with correct upgrade hooks

### Modify
- Fix `preupgrade` / `postupgrade` hooks to properly preserve data across upgrades (remove the data-wiping `Array.empty` calls, use a single stable array as the source of truth)
- Extend waitForActor timeout from 8s to 15s and add progressive retry messaging
- Improve error handling: show spinner if backend is still loading, only show actual error if server definitively fails
- Success screen copy: "Account Created Successfully" / "Your NightBuddy profile is ready."
- Admin panel: display userId column

### Remove
- The unused `signups` stable variable (confusing dual-variable pattern)
- The `signupsBuffer` naming (replace with single clear `stableSignups` variable)

## Implementation Plan

1. Rewrite `src/backend/main.mo`:
   - Single stable `stableSignups` array as source of truth
   - Remove broken preupgrade/postupgrade hooks (or make them correctly no-ops)
   - Add `userId` field (Text, generated from timestamp + random)
   - Add `getSignupCount` query
   - Keep all existing function signatures intact so frontend bindings don't break
   - Improve `submitProfile` to handle email-not-found gracefully

2. Update `src/frontend/src/hooks/useQueries.ts`:
   - Increase waitForActor timeout to 15 seconds
   - While waiting (isFetching), show loading state not error
   - After timeout, show a clear retry message
   - Add `useGetSignupCount` hook

3. Update `src/frontend/src/components/EarlyAccessForm.tsx`:
   - Use `useGetSignupCount` instead of full `useGetSignups` for the counter
   - During form submission while backend is loading: show spinner, not error
   - Success screen: update copy to "Account Created Successfully" / "Your NightBuddy profile is ready."

4. Update `src/frontend/src/components/AdminView.tsx`:
   - Add userId column to the table
