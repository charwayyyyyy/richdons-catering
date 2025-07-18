# RichDons Catering Website

A modern, responsive website for RichDons Catering, featuring Ghanaian cuisine and catering services with interactive elements and smooth animations.

## 🌟 Features

- **Modern Design**: Responsive design with Ghanaian-themed colors and aesthetics
- **Interactive Elements**: Budget calculator, enhanced contact form, and food cards
- **Smooth Animations**: GSAP and Anime.js powered animations with scroll-triggered effects
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Component-Based Architecture**: Built with React for maintainability and scalability
- **Performance Optimized**: Fast loading with optimized assets and lazy loading
- **3D Elements**: Three.js integration for immersive visual elements

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: 
  - GSAP 3.12.8 with ScrollTrigger, TextPlugin, and ScrollToPlugin
  - Anime.js 4.0.2 for element animations
  - Framer Motion 11.15.0 for UI transitions
- **3D Graphics**: Three.js 0.171.0 with React Three Fiber and Drei
- **Routing**: React Router DOM 7.1.1
- **Build Tool**: Create React App
- **Fonts**: Quicksand (Custom font family)

## 📁 Project Structure

```
RichDons/
├── public/
│   ├── assets/
│   │   ├── fonts/          # Quicksand font files
│   │   ├── icons/          # UI icons (PNG format)
│   │   └── images/         # Food and branding images
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── About.js        # About section with stats and features
│   │   ├── BudgetCalculator.js # Interactive budget estimation tool
│   │   ├── Contact.js      # Contact section wrapper
│   │   ├── EnhancedContactForm.js # Animated contact form with validation
│   │   ├── FoodCard.js     # Interactive food item display component
│   │   ├── Footer.js       # Footer with links and newsletter
│   │   ├── Gallery.js      # Image gallery with filtering
│   │   ├── Hero.js         # Hero section with 3D elements
│   │   ├── HeroSphere.js   # 3D animated sphere for hero section
│   │   ├── LoadingSpinner.js # Loading component
│   │   ├── Menu.js         # Menu showcase with categories
│   │   ├── Navbar.js       # Navigation with smooth scrolling
│   │   └── Services.js     # Services offered
│   ├── utils/
│   │   ├── animations.js   # Shared animation utilities
│   │   ├── budgetAnimations.js # Budget calculator specific animations
│   │   └── menuAnimations.js # Menu-specific animation utilities
│   ├── App.js              # Main app component
│   ├── index.css           # Global styles and Tailwind imports
│   └── index.js            # React entry point
├── package.json
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```


## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RichDons
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The application will automatically open in your default browser at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build` folder

## 🔍 Key Components

### Interactive Budget Calculator
The `BudgetCalculator` component allows users to estimate their event budget by selecting:
- Number of guests
- Event type (wedding, corporate, party, festival)
- Menu type (basic, standard, premium, luxury)
- Additional services (staffing, decor, entertainment, etc.)

The calculator provides real-time cost estimates with animated transitions.

### Enhanced Contact Form
The `EnhancedContactForm` component features:
- Smooth animations for form fields
- Input validation
- Event type selection
- Guest count and date selection
- Success/error state animations

### Food Card Component
The `FoodCard` component displays menu items with:
- Hover animations
- Food details (ingredients, spice level, preparation time)
- Interactive elements (add to cart, favorite)
- Smooth transitions between states


## 🎨 Animation Utilities

The project uses a combination of GSAP and Anime.js for animations, organized in utility files:

- **animations.js**: Core animation functions used across components
  - Food item hover effects
  - Button animations
  - Text reveal animations
  - Counter animations
  - Staggered list animations

- **menuAnimations.js**: Menu-specific animations
  - Category switching transitions
  - Food item reveal animations

- **budgetAnimations.js**: Budget calculator animations
  - Form field transitions
  - Results reveal animations
  - Price counter animations

## 🧪 Testing

The project uses Jest and React Testing Library for component testing:

```bash
# Run tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

## 🔧 Code Quality

- **ESLint**: Enforces code quality and style guidelines
- **Responsive Design**: All components are mobile-first and responsive
- **Accessibility**: ARIA attributes and semantic HTML for better accessibility
- **Performance**: Optimized animations and lazy-loaded components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


