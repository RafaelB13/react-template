# React Base Project

## ✨ Features

- **Secure Authentication:** Multi-step sign-in process including login, password, and two-factor authentication.
- **File Upload:** A dedicated and intuitive interface for uploading files.
- **User Profile:** A section for users to view and manage their profile information.
- **Theme Customization:** Switch between light and dark modes for user preference.
- **Responsive Design:** A seamless experience across different devices and screen sizes.
- **Global State Management:** Centralized state management for a predictable application state.

## 🚀 Tech Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Routing:** [React Router](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Linting & Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1.  Clone the repository:

    ```bash
    git clone
    cd project
    ```

2.  Install the dependencies:
    ```bash
    bun install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables. These variables are required for the application to connect to the backend services and AWS S3.

```env
VITE_API_BASE_URL=your_api_base_url
VITE_AWS_S3_BUCKET_NAME=your_s3_bucket_name
VITE_AWS_S3_REGION=your_s3_region
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

### Running the Application

To start the development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `bun run dev`: Runs the app in the development mode.
- `bun run build`: Builds the app for production.
- `bun run lint`: Lints the code and fixes issues.
- `bun run format`: Formats the code with Prettier.
- `bun run preview`: Serves the production build locally.
