import { AyatComponent } from "./components/ayat.component";
import "./App.css";
import { useEffectOnce } from "./app/hooks/use-effect-once";
export const App = () => {
  useEffectOnce(() => {
    setInterval(() => {
      window.location.reload();
    }, 15000);
  });
  return <AyatComponent />;
};
