# Real-Time Push Notifications System

## Overview

This system provides secure, customizable push notifications for trades and other events in SwapTrade. It uses **Web Push API**, **Service Workers**, and **Redux** for state management.

## Features

✅ **Real-time Trade Notifications** - Instant alerts for order fills, cancellations, and rejections  
✅ **Price Alerts** - Notify when prices hit target levels  
✅ **Referral Notifications** - Track referral milestones  
✅ **User Control** - Users can enable/disable any notification type  
✅ **Sound & Vibration** - Optional audio and haptic feedback  
✅ **Secure** - CSRF protection, server-side validation, secure endpoints  
✅ **Offline Support** - Works with service worker caching  

## Architecture

### Components

```
┌─────────────────────────────────────────┐
│      Web App (React Components)          │
│  ────────────────────────────────────   │
│  - NotificationSettings.tsx              │
│  - NotificationBell.tsx                  │
│  - useNotifications hook                 │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Redux Store (State Management)      │
│  ────────────────────────────────────   │
│  - notificationSlice.ts                  │
│  - Manages preferences & subscription    │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│    Notification Services & Utilities     │
│  ────────────────────────────────────   │
│  - notifications.ts (core API)           │
│  - trade-notifications.ts (trade logic)  │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│     Service Worker (sw.js)               │
│  ────────────────────────────────────   │
│  - Handles push events                   │
│  - Shows notifications                   │
│  - Manages notification clicks           │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      API Routes                          │
│  ────────────────────────────────────   │
│  - /api/notifications/subscribe          │
│  - /api/notifications/unsubscribe        │
│  - /api/notifications/preferences        │
│  - /api/notifications/send               │
└─────────────────────────────────────────┘
```

## Usage

### 1. Enable Notifications in App Layout

Add the notification bell to your navbar:

```tsx
import NotificationBell from '@/components/NotificationBell';

export default function Navbar() {
  const userId = getCurrentUserId();
  
  return (
    <nav>
      {/* Other nav items */}
      <NotificationBell userId={userId} />
    </nav>
  );
}
```

### 2. Use Notifications Hook

```tsx
import { useNotifications } from '@/hooks/useNotifications';

export default function MyComponent() {
  const {
    preferences,
    isPushSubscribed,
    isGranted,
    togglePushSubscription,
    updatePreferences,
  } = useNotifications(userId);

  const handleToggleNotifications = async () => {
    await togglePushSubscription();
  };

  return (
    <div>
      <p>
        Notifications: {isPushSubscribed ? 'Enabled' : 'Disabled'}
      </p>
      <button onClick={handleToggleNotifications}>
        Toggle
      </button>
    </div>
  );
}
```

### 3. Send Trade Notifications

```tsx
import { notifyTrade } from '@/lib/trade-notifications';
import type { TradeData } from '@/lib/trade-notifications';

const tradeData: TradeData = {
  orderId: 'order-123',
  symbol: 'BTC',
  action: 'buy',
  quantity: 1.5,
  price: 45000,
  status: 'filled',
  timestamp: Date.now(),
  averagePrice: 44950,
};

await notifyTrade(tradeData);
```

### 4. Send Price Alerts

```tsx
import { notifyPriceAlert } from '@/lib/trade-notifications';

await notifyPriceAlert({
  symbol: 'ETH',
  currentPrice: 3000,
  targetPrice: 2950,
  direction: 'below',
});
```

### 5. Real-Time Trade Updates (WebSocket Example)

```tsx
import { createTradeNotificationHandler } from '@/lib/trade-notifications';

function TradesComponent() {
  const userId = getUserId();
  const handler = createTradeNotificationHandler(userId);

  useEffect(() => {
    const ws = new WebSocket('wss://api.swaptrade.com/trades');

    ws.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      handler.handleTradeUpdate(trade);
    };

    return () => ws.close();
  }, []);

  return <div>Live trades...</div>;
}
```

## Permission Flow

```
User Opens App
     ↓
Service Worker Registered
     ↓
Check Stored Preferences
     ↓
Display Notification Bell
     │
     ├─ Permission: 'default' → Show green "Enable" button
     ├─ Permission: 'granted' → Show subscription status
     └─ Permission: 'denied' → Show grey disabled state
     ↓
User Clicks "Enable"
     ↓
Request Permission Dialog
     ↓
User Grants/Denies
     ↓
If Granted:
  - Subscribe to push notifications
  - Send subscription to backend
  - Save preferences
```

## Database Schema

The system requires the following tables:

```sql
-- Push subscriptions
CREATE TABLE push_subscriptions (
  id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL,
  endpoint TEXT NOT NULL UNIQUE,
  auth_key TEXT,
  p256dh_key TEXT,
  subscription_data TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Notification preferences
CREATE TABLE notification_preferences (
  id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  preferences_data TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

## Security Considerations

### 1. **CSRF Protection**
- All endpoints validate origin and use POST for data mutations
- Consider adding CSRF tokens for production

### 2. **Authentication**
- Endpoints verify user ownership of data
- Only subscriptions for authenticated users are stored

### 3. **Data Validation**
- Input validation on all endpoints
- Type checking with TypeScript/Zod

### 4. **API Rate Limiting**
- Implement rate limiting on `/api/notifications/send`
- Prevent spam notifications

### 5. **Encryption**
- Push subscription keys are stored encrypted
- Sensitive data should be encrypted at rest

### 6. **Permission Flow**
- Only request permissions when user initiates
- Clear explanation of what notifications do
- Users can revoke at any time

## Notification Types

### Trade Alerts

```ts
{
  type: 'trade',
  title: 'Order Filled - BUY',
  body: '1.5 BTC filled @ avg $44,950',
  data: {
    orderId: 'order-123',
    symbol: 'BTC',
    status: 'filled',
  }
}
```

### Price Alerts

```ts
{
  type: 'price-alert',
  title: 'Price Alert - ETH',
  body: 'ETH crossed $3000 at $2950 ↓',
  data: {
    symbol: 'ETH',
    currentPrice: 2950,
    targetPrice: 3000,
  }
}
```

### Referral Notifications

```ts
{
  type: 'referral',
  title: 'Referral Milestone 🎉',
  body: 'Congratulations! You've reached 10 referrals. You earned 500 points.',
  data: {
    referralCount: 10,
    bonusPoints: 500,
  }
}
```

## API Endpoints

### POST /api/notifications/subscribe

Subscribe user to push notifications.

**Request:**
```json
{
  "userId": "user-123",
  "subscription": {
    "endpoint": "https://...",
    "keys": {
      "auth": "...",
      "p256dh": "..."
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription saved"
}
```

### POST /api/notifications/unsubscribe

Unsubscribe from push notifications.

**Request:**
```json
{
  "endpoint": "https://..."
}
```

### POST /api/notifications/preferences

Save user notification preferences.

**Request:**
```json
{
  "userId": "user-123",
  "preferences": {
    "enabled": true,
    "tradeAlerts": true,
    "priceAlerts": true,
    "sound": true,
    "vibration": true
  }
}
```

### GET /api/notifications/preferences?userId=user-123

Get user notification preferences.

**Response:**
```json
{
  "enabled": true,
  "tradeAlerts": true,
  ...
}
```

### POST /api/notifications/send

Send notifications to users (internal endpoint).

**Request:**
```json
{
  "userIds": ["user-123", "user-456"],
  "payload": {
    "type": "trade",
    "title": "Order Filled",
    "body": "Your BTC order was filled"
  }
}
```

## Testing

Run the test suite:

```bash
npm test -- src/lib/notifications.test.ts
npm test -- src/lib/trade-notifications.test.ts
```

## Customization

### Disable Notification Types

Users can disable specific notification types through the UI or programmatically:

```ts
await updatePreferences({
  tradeAlerts: false,
  priceAlerts: false,
});
```

### Custom Notification Styling

Modify `NotificationSettings.tsx` to add custom styling or additional options.

### Custom Sound/Vibration

Edit the service worker to use custom sound files:

```js
// In sw.js
const vibrationPattern = [100, 50, 100];
const audioFile = '/notification-sound.mp3';
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Push API | ✅ 50+ | ✅ 48+ | ⚠️ Limited | ✅ 17+ |
| Service Workers | ✅ 40+ | ✅ 44+ | ✅ 11.1+ | ✅ 17+ |
| Notifications API | ✅ 22+ | ✅ 4+ | ✅ 7+ | ✅ 14+ |

## Troubleshooting

### Notifications Not Working

1. **Check permissions**: `Notification.permission`
2. **Check service worker**: Open DevTools → Application → Service Workers
3. **Check browser console**: Look for error messages
4. **Clear cache**: `caches.delete()` in console
5. **Unsubscribe/resubscribe**: Sometimes fixes registration issues

### Permission Blocked

- Check browser settings: Settings → Privacy → Notifications
- Remove site from notification block list
- Clear site data and retry

### Push Messages Not Received

1. Verify subscription endpoint is correct
2. Check backend is sending to correct endpoint
3. Verify service worker is active
4. Check network tab for failed requests

## Future Enhancements

- [ ] Rich notifications with custom actions
- [ ] Notification scheduling/batching
- [ ] Analytics on notification engagement
- [ ] Multi-language support
- [ ] Dark mode themed notifications
- [ ] Background sync for offline trade updates
- [ ] Notification history/archive
- [ ] Smart notification grouping

## API Reference

See `src/lib/notifications.ts` and `src/lib/trade-notifications.ts` for complete API documentation.

## Contributing

When adding new notification types:

1. Add type to `NotificationType` in `notifications.ts`
2. Create helper function in `trade-notifications.ts`
3. Add handling in service worker (`public/sw.js`)
4. Add tests in `.test.ts` files
5. Update this documentation
