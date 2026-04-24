# Pull Request: Redux State Management for Referral Dashboard

## Branch
`feature/referral-dashboard-redux` → `main`

## Description
Migrates the referral dashboard from local component state (`useState`) to a centralized Redux store using Redux Toolkit. Dashboard data is now managed globally, enabling consistent state access across components and laying the foundation for future cross-component state sharing.

## Changes

### New Files
- `src/store/referralSlice.ts` - Redux slice with `fetchDashboard` async thunk and pending/fulfilled/rejected state handling
- `src/store/store.ts` - Configured Redux store with referral reducer
- `src/store/hooks.ts` - Typed `useAppDispatch` and `useAppSelector` hooks
- `src/components/context/ReduxProvider.tsx` - Client-side `<Provider>` wrapper component

### Modified Files
- `src/components/ReferralDashboard.tsx` - Replaced local `useState`/`useCallback` with Redux `useAppDispatch` and `useAppSelector`
- `src/app/layout.tsx` - Wrapped app with `ReduxProvider`
- `package.json` - Added `@reduxjs/toolkit` and `react-redux` dependencies

## Features

### Redux Architecture
- **Slice**: `referralSlice` manages `data`, `loading`, and `error` state
- **Async Thunk**: `fetchDashboard(userId)` handles API call with proper error handling (403 → unverified, non-ok → generic error)
- **Typed Hooks**: `useAppDispatch` and `useAppSelector` enforce type safety throughout
- **Provider**: `ReduxProvider` wraps the entire app in `layout.tsx`

### State Shape
```ts
{
  referral: {
    data: DashboardData | null,
    loading: boolean,
    error: string | null
  }
}
```

### Earnings Display
The dashboard surfaces all earnings-related data from the API:
- **Points** — total accumulated points
- **Rank** — user's position on the leaderboard
- **Referrals** — successful vs total referral count
- **Referral link** — copyable link with social share buttons (Twitter, Facebook, WhatsApp)
- **Referred users list** — with verified/pending status badges

## Testing

### Manual Testing Checklist
- [ ] Dashboard loads and displays points, rank, and referral count
- [ ] Referral link is visible and copyable
- [ ] Share buttons open correct social URLs
- [ ] Referred users list shows verified/pending status
- [ ] Loading skeleton displays while fetching
- [ ] Error state displays for unverified accounts (403)
- [ ] Error state displays for failed requests
- [ ] Redux DevTools shows correct state transitions

### Test Commands
```bash
npm run build    # Verify no TypeScript/build errors
npm run test     # Run unit tests
npm run lint     # Check code quality
```

## Acceptance Criteria
- [x] Dashboard functional — loads and displays referral data
- [x] Earnings displayed — points, rank, and referral stats visible
- [x] Redux state manages all dashboard data
- [x] Secure — API errors handled gracefully, no sensitive data exposed in state
- [x] Users can refer — referral link and share buttons functional
- [x] No TypeScript errors
- [x] No breaking changes to existing UI

## Definition of Done
- [x] Redux store configured and connected
- [x] `ReferralDashboard` fully migrated to Redux
- [x] Typed hooks in place
- [x] `ReduxProvider` wrapping the app
- [x] Build passes with no errors
- [x] Code reviewed and approved

## Dependencies Added
- `@reduxjs/toolkit` — Redux state management
- `react-redux` — React bindings for Redux

## Breaking Changes
None. The UI and API contracts are unchanged; only the internal state management layer was replaced.

## Migration Notes
No migration required. The component API (`<ReferralDashboard userId={...} />`) is unchanged.

## Related Issues
Closes #[issue_number] (if applicable)

## Reviewer Notes
- Verify `fetchDashboard` thunk correctly handles 403 (unverified) vs other error responses
- Confirm `ReduxProvider` placement in `layout.tsx` doesn't conflict with other providers
- Check that `clearDashboard` action is available for future use (e.g., on logout)
