# DAMNX Chatbot - Quick Start Guide

## 🚀 What's Ready

✅ **Chatbot UI** - Red themed, fully functional
✅ **Chat API** - `/api/chatbot/query` endpoint
✅ **Meeting API** - `/api/meetings/schedule` endpoint
✅ **Intent Detection** - Auto-categorize user messages
✅ **Session Management** - Track conversations

## ⚡ Quick Setup (5 minutes)

### Step 1: Add .env.local file

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
SESSION_SECRET=your_secure_random_key_here
ADMIN_EMAIL=admin@damnxsolutions.com
```

### Step 2: Start the server

```bash
npm run dev
```

### Step 3: Test the chatbot

1. Open `http://localhost:3000`
2. Click the red "DX" button (bottom-right)
3. Type: "Schedule a meeting"

✅ Should get meeting scheduling response!

## 🔗 To Enable Meeting Scheduling (Optional)

### Add these to .env.local:

```env
# Google Calendar (get from Google Cloud Console)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com

# Email (Gmail with App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 📝 How to Customize

### Change chatbot responses:

Edit `/src/app/api/chatbot/query/route.ts`, find `DAMNX_RESPONSES`:

```typescript
const DAMNX_RESPONSES = {
  scheduling: {
    answer: "Your custom message here...",
    suggestions: ['Suggestion 1', 'Suggestion 2'],
    sessionType: 'meeting_schedule'
  },
  // ...
}
```

### Change colors:

Edit `/src/app/components/Footer/DamnxChatbot.tsx`, replace:
- `from-red-600` → your color
- `to-red-500` → your color
- `border-red-300/30` → your color

### Change button text/logo:

```tsx
{isOpen ? (
  <X size={20} className="text-white" />
) : (
  <div className="text-white font-bold text-sm">DX</div>
)}
```

Replace "DX" with your logo or text.

## 🔍 Testing the APIs

### Test Chatbot API:

```bash
curl -X POST http://localhost:3000/api/chatbot/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Schedule a meeting",
    "sessionId": "test-session-123"
  }'
```

Response:
```json
{
  "answer": "I'd be happy to help...",
  "sessionId": "test-session-123",
  "sessionType": "meeting_schedule",
  "suggestions": ["Monday 2 PM", "Tuesday 3 PM", ...]
}
```

### Test Meeting API:

```bash
curl -X POST http://localhost:3000/api/meetings/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "preferredDate": "2026-01-15",
    "preferredTime": "14:00",
    "meetingType": "video",
    "serviceType": "Web Development"
  }'
```

## 🎯 Intent Keywords

Type any of these to trigger responses:

| Intent | Keywords | Response |
|--------|----------|----------|
| 📅 Meeting | meet, schedule, call, booking | Meeting scheduling help |
| 💼 Services | service, develop, build, what do you | Service overview |
| 🐛 Support | bug, issue, error, support | Support options |
| 💰 Quote | quote, price, cost, budget | Quote inquiry form |

## 📂 File Structure

```
src/app/
├── api/
│   ├── chatbot/query/route.ts      ← Chat responses
│   └── meetings/schedule/route.ts  ← Meeting booking
├── components/Footer/
│   └── DamnxChatbot.tsx             ← Chat UI
└── page.tsx
```

## 🐛 Troubleshooting

### Chatbot not opening?
- Check browser console (F12)
- Verify `isOpen` state changes on button click
- Clear cache and refresh

### API not responding?
- Check `.env.local` is created
- Restart dev server after .env changes
- Verify `/api/chatbot/query` exists

### Meeting booking fails?
- Add Google Calendar credentials to .env.local
- Check email configuration
- Review API response in Network tab

## 📚 Full Docs

See `CHATBOT_SETUP.md` for:
- Complete environment setup
- Google Calendar integration
- Email configuration
- Production deployment
- Troubleshooting guide

## ✨ Next Features

After basic setup works:

1. **Email Notifications** - Send confirmations
2. **Calendar Integration** - Auto-create events
3. **Database** - Store sessions permanently
4. **AI Upgrade** - Add OpenAI integration
5. **Analytics** - Track conversations

---

**Need help?** Check the logs or see `CHATBOT_SETUP.md` for detailed guides!
