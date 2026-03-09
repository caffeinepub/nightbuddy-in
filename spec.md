# NightBuddy.in

## Current State

The onboarding flow is a multi-step inline form on the landing page:
1. Step 1: Name + Email signup
2. Step 2: Profile setup (Age, Gender, Country)
3. Step 3 (success): "Account Created Successfully" screen with a "Start Chatting" button

After Step 3 the user sees a glow button that says "Start Chatting" but goes nowhere (no routing).

The backend stores: name, email, ageRange, country, gender, timestamp, userId.
Admin panel exists at `/admin` (password-gated).
No routing library is present — `window.location.pathname` is used for `/admin` detection.

## Requested Changes (Diff)

### Add
- A new `ChooseRole` screen/component that appears immediately after the success screen ("Account Created Successfully").
- The screen shows two large selectable cards:
  - Card 1: "I want someone to listen to me" → Role = USER
  - Card 2: "I want to help and listen to others" → Role = LISTENER
- After selecting a role, save it to localStorage (key: `nightbuddy_role`).
- After selection redirect:
  - USER → navigate to `/user-dashboard`
  - LISTENER → navigate to `/listener-dashboard`
- A `UserDashboard` page at `/user-dashboard` with: Start Chat, Find a Listener, My Conversations, Edit Profile, Logout.
- A `ListenerDashboard` page at `/listener-dashboard` with: Incoming Chat Requests, Active Conversations, Completed Chats, Listener Profile, Ratings (placeholder).
- Both dashboards use the same NightBuddy dark theme.
- Routing for `/user-dashboard`, `/listener-dashboard` added to `App.tsx`.
- New localStorage key: `nightbuddy_role` (values: `"USER"` | `"LISTENER"`).

### Modify
- `EarlyAccessForm.tsx`: In the success (Step 3) view, replace the "Start Chatting" button with a "Choose Your Role" button that transitions to the `ChooseRole` view.
- `App.tsx`: Add routing for `/user-dashboard` and `/listener-dashboard` paths.
- `readOnboardingState()` in `App.tsx`: read `nightbuddy_role` key so returning users skip role selection.
- The `ChooseRole` component should also be reachable if `isProfileComplete` is true but no role has been saved yet.

### Remove
- Nothing is removed. Existing signup flow, admin panel, and all existing components remain intact.

## Implementation Plan

1. Create `ChooseRole.tsx` — full-screen role selection UI with two large cards, matching dark night theme, saves role to localStorage and redirects.
2. Create `UserDashboard.tsx` — placeholder dashboard page for USER role.
3. Create `ListenerDashboard.tsx` — placeholder dashboard page for LISTENER role.
4. Modify `EarlyAccessForm.tsx` — pass `onRoleSelect` callback; success screen shows "Choose Your Role" button instead of "Start Chatting".
5. Modify `App.tsx` — add routes for `/user-dashboard`, `/listener-dashboard`, handle `nightbuddy_role` state, show `ChooseRole` when profile is complete but no role saved yet.
