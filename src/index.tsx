import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./utils/redux/store/store";
import "./styles/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Routes = lazy(() => import("./routes/Routes"));

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Suspense fallback={<p>Loading</p>}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </Suspense>
);
