# NightBuddy.in

## Current State

- Landing page with Early Access signup form (name + email).
- Motoko backend stores signups in `var signups = Array.empty<Signup>()` — a non-stable variable.
- `submitSignup` and `getSignups` are wired to the frontend correctly via React Query.
- Admin dashboard at `/admin` uses `useGetSignups` to display entries.
- **Bug**: Because `signups` is not declared `stable`, the array is reset to empty on every canister upgrade/redeploy. Signups appear to save (confirmation shows) but are wiped on next deploy, so the admin dashboard always shows empty.

## Requested Changes (Diff)

### Add
- Nothing new to add.

### Modify
- `src/backend/main.mo`: Change `var signups` to `stable var signups` so the array persists across canister upgrades.
- `src/backend/main.mo`: Fix `getAllSignupsSorted()` to pass the comparator function explicitly (Motoko's Array.sort requires a comparator argument).
- `src/frontend/src/hooks/useQueries.ts`: After a successful `submitSignup`, invalidate AND immediately refetch the `signups` query so the counter and admin view update in real time.

### Remove
- Nothing to remove.

## Implementation Plan

1. In `main.mo`, change `var signups = Array.empty<Signup>();` to `stable var signups = Array.empty<Signup>();`.
2. In `main.mo`, fix `getAllSignupsSorted` to call `signups.sort(Signup.compare)` and `getAllSignupsSortedByEmail` to call `signups.sort(Signup.compareByEmail)`.
3. In `useQueries.ts`, update `onSuccess` in `useSubmitSignup` to also call `queryClient.refetchQueries({ queryKey: ['signups'] })` after invalidation.
