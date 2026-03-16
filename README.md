# Excel-JSON File Converter

A modern React TypeScript application built with Vite that provides seamless conversion between Excel and JSON file formats. Upload your files and get instant conversions with a clean, user-friendly interface.

## 🚀 Live Demo

[View Live Demo](https://import-export-excel.vercel.app/)

## ✨ Features

- **JSON to Excel Conversion**: Convert JSON files to CSV or XLSX formats
- **Excel to JSON Conversion**: Transform Excel files (.xls, .xlsx) to JSON format
- **File Validation**: Automatic file type and format validation
- **Real-time Feedback**: Toast notifications for success/error messages
- **Loading States**: Visual loading indicators during file processing
- **Responsive Design**: Clean, modern UI built with Material-UI
- **TypeScript Support**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Notifications**: Notyf
- **Loading Components**: React Spinners
- **Styling**: CSS Modules with Material-UI theming

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server for file conversion endpoints

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd import-export-excel-frontend-ts
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_URL=your_backend_api_url
VITE_BASE_URL=your_base_url_for_file_downloads
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── File.tsx        # Main file conversion component
├── configs/            # Configuration files
│   ├── Axios.ts        # HTTP client configuration
│   └── Env.ts          # Environment variables
├── constants/          # Application constants
│   ├── ApiEndpoints.ts # API endpoint definitions
│   └── FileExtensions.ts # Supported file extensions
├── helpers/            # Utility helpers
│   └── ImagesHelper.ts # Image asset exports
├── redux/              # State management
│   └── Slices/
│       └── LoaderSlice.ts # Loading state management
├── screens/            # Page/screen components
│   └── Common/
│       └── Loader/     # Global loading component
├── services/           # API service functions
│   └── FileService.ts  # File conversion API calls
├── store/              # Redux store configuration
│   └── Store.ts        # Main store setup
├── utils/              # Utility functions
│   └── ToastUtils.ts   # Notification utilities
└── assets/             # Static assets
    └── images/         # Image files
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_BASE_URL` | Base URL for file downloads | Yes |

### API Endpoints

The application expects the following backend endpoints:

- `POST /files/upload-json` - Convert JSON to Excel
- `POST /files/upload-excel` - Convert Excel to JSON

## 🎯 Usage

### JSON to Excel Conversion

1. Select the desired output format (CSV or XLSX)
2. Click "Upload Your File" and select a JSON file
3. Click "Start Uploading Json File"
4. The converted file will automatically download

### Excel to JSON Conversion

1. Click "Upload Your File" and select an Excel file (.xls or .xlsx)
2. Click "Start Uploading Excel File"
3. The converted JSON file will automatically download

## 📝 File Format Requirements

### JSON Files
- Must have proper JSON syntax
- Use double quotes for strings
- Ensure proper comma separation
- File extension: `.json`

### Excel Files
- First row should contain column headers/keys
- Data should be properly formatted in rows and columns
- Supported formats: `.xls`, `.xlsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Redux Toolkit for state management
- Vite for the fast build tool
- React community for the amazing ecosystem

---

Built with ❤️ using React, TypeScript, and Vite
```eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
