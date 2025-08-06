# Internationalization (i18n) Setup

This portfolio now supports internationalization with English and French languages. Here's how it's implemented and how to use it.

## Features

- 🌍 **Multi-language Support**: English (en) and French (fr)
- 🔄 **Language Switcher**: Easy toggle between languages
- 🧭 **Automatic Locale Detection**: Detects user's preferred language
- 📱 **Responsive Design**: Language switcher works on all devices
- 🔗 **URL-based Routing**: Each language has its own URL path

## File Structure

```
src/
├── app/
│   ├── [locale]/           # Dynamic locale routing
│   │   ├── page.js         # Main portfolio page
│   │   ├── login/
│   │   │   └── page.js     # Login page
│   │   └── contact/
│   │       └── page.js     # Contact page
│   ├── components/
│   │   ├── LanguageSwitcher.js
│   │   └── LanguageSwitcher.module.css
│   └── page.js             # Root redirect page
├── lib/
│   └── i18n.js            # Translation utilities
└── middleware.js          # Locale detection and routing
```

## How It Works

### 1. URL Structure
- English: `/en` (default)
- French: `/fr`
- Root `/` redirects to `/en`

### 2. Translation System
All translations are stored in `src/lib/i18n.js` with a nested structure:

```javascript
const translations = {
  en: {
    nav: { about: 'About', ... },
    hero: { greeting: "Hi, I'm Wajahat 👋", ... },
    // ... more sections
  },
  fr: {
    nav: { about: 'À propos', ... },
    hero: { greeting: "Salut, je suis Wajahat 👋", ... },
    // ... more sections
  }
};
```

### 3. Using Translations

In any component:

```javascript
import { useTranslation } from '../../lib/i18n';

const MyComponent = ({ params }) => {
  const locale = params?.locale || 'en';
  const { t } = useTranslation(locale);
  
  return <h1>{t('hero.greeting')}</h1>;
};
```

### 4. Language Switcher Component

The `LanguageSwitcher` component automatically handles:
- Current locale detection
- URL updates when switching languages
- Proper navigation between locales

## Adding New Languages

To add a new language (e.g., Spanish):

1. **Update Next.js config** (`next.config.mjs`):
```javascript
i18n: {
  locales: ['en', 'fr', 'es'], // Add 'es'
  defaultLocale: 'en',
  localeDetection: true,
}
```

2. **Add translations** in `src/lib/i18n.js`:
```javascript
const translations = {
  en: { /* existing */ },
  fr: { /* existing */ },
  es: {
    nav: { about: 'Acerca de', ... },
    hero: { greeting: "¡Hola, soy Wajahat 👋", ... },
    // ... add all translations
  }
};
```

3. **Update middleware** (`middleware.js`):
```javascript
const locales = ['en', 'fr', 'es']; // Add 'es'
```

## Adding New Content

When adding new text content:

1. **Add to translations** in `src/lib/i18n.js`:
```javascript
en: {
  newSection: {
    title: 'New Section Title',
    description: 'New section description'
  }
},
fr: {
  newSection: {
    title: 'Titre de la nouvelle section',
    description: 'Description de la nouvelle section'
  }
}
```

2. **Use in component**:
```javascript
const { t } = useTranslation(locale);
return <h2>{t('newSection.title')}</h2>;
```

## SEO and Accessibility

- Each page has proper `lang` attribute
- URLs are SEO-friendly with locale prefixes
- Language switcher includes proper ARIA labels
- Fallback to English if translation is missing

## Browser Language Detection

The middleware automatically detects the user's preferred language from:
1. URL path (if already on a localized route)
2. `Accept-Language` header
3. Falls back to English

## Testing

To test the implementation:

1. **Start the development server**:
```bash
npm run dev
```

2. **Visit different URLs**:
- `http://localhost:3000` → redirects to `/en`
- `http://localhost:3000/en` → English version
- `http://localhost:3000/fr` → French version

3. **Test language switching**:
- Click the language switcher in the navigation
- Verify URLs update correctly
- Check that content changes appropriately

## Deployment

The internationalization works seamlessly with:
- **Vercel**: Automatic deployment with locale support
- **Netlify**: Works with proper redirects
- **Other platforms**: Standard Next.js deployment

## Troubleshooting

### Common Issues:

1. **Translation not found**: Check the translation key exists in both languages
2. **URL not updating**: Ensure the `LanguageSwitcher` component is properly imported
3. **Middleware not working**: Verify the middleware file is in the root directory

### Debug Tips:

- Check browser console for any errors
- Verify translation keys match exactly
- Test with different browser language settings
- Clear browser cache if changes don't appear

## Future Enhancements

Potential improvements:
- Add more languages (Spanish, German, etc.)
- Implement locale-specific date/number formatting
- Add RTL language support (Arabic, Hebrew)
- Implement translation management system
- Add language preference persistence in localStorage 