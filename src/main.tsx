import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "@/routes";

import { TokenProvider } from "@/utils/contexts/token";
import { ThemeProvider } from "@/utils/contexts/theme";
import "@/styles/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TokenProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TokenProvider>
  </QueryClientProvider>
);
