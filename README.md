# 🧭 React Native App Router

![React Native App Router](./assets/logo.png)

A lightweight, file-based routing library for React Native, inspired by Next.js and powered by [React Navigation](https://reactnavigation.org/). Define your navigation structure using folders and files — no more manual route configuration.

## ✨ Features

- 📁 **File-based routing**: Automatically map files and folders to screens and navigators
- 🔄 **Layouts and nested navigation**: Seamlessly compose stack, tab, and drawer navigators
- ⚙️ **Zero-config setup**: Just write your screens, and the router takes care of the rest
- 💡 **Inspired by Next.js**: Familiar folder-based routing model
- ✅ **Built with TypeScript**, fully typed for DX
- 🔧 **CLI included**: Easily scaffold routes and layouts

---

## 📦 Installation

```bash
npm install react-native-app-router
# or
yarn add react-native-app-router
```

You must also install peer dependencies required by React Navigation (see [React Navigation's docs](https://reactnavigation.org/docs/getting-started)).

---

## 🚀 Getting Started

Create a file structure like this inside your app:

```
src/
└── app/
    ├── layout.tsx         # Shared layout for all screens
    ├── home/
    │   └── page.tsx       # A screen shown at /home
    └── profile/
        ├── layout.tsx     # Layout specific to profile routes
        └── settings/
            └── page.tsx   # A nested screen at /profile/settings
```

### Example `page.tsx` (a screen)

```tsx
// src/app/home/page.tsx
import { View, Text } from "react-native";

export default function HomePage() {
  return (
    <View>
      <Text>Welcome Home!</Text>
    </View>
  );
}
```

### Example `layout.tsx` (a layout)

```tsx
// src/app/layout.tsx
import { SafeAreaView } from "react-native";

export default function RootLayout({ children }) {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
}
```

### Entry point (`App.tsx`)

```tsx
import { AppRouterProvider } from "react-native-app-router";

export default function App() {
  return <AppRouterProvider />;
}
```

---

## 🛠️ CLI Usage

The built-in CLI helps generate screens and layouts:

```bash
npx react-native-app-router generate screen home/about
npx react-native-app-router generate layout profile
```

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

To view test coverage:

```bash
npm run test:coverage
```

---

## 📚 Learn More

- [React Navigation](https://reactnavigation.org/)
- [Next.js Routing](https://nextjs.org/docs/routing/introduction)
- [Expo Router](https://expo.github.io/router/docs) (similar concept)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork this repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Submit a PR with detailed description

Use the following scripts:

```bash
npm run lint       # Lint code
npm run format     # Format code with Prettier
```

---

## 📄 License

MIT © [Adrian Urs](https://github.com/adrianurs)
