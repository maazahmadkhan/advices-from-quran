import axios from "axios";
import { useState } from "react";
import { useEffectOnce } from "../app/hooks/use-effect-once";
import Spinner from "react-spinner-material";
import "./quote.css";
type Quote = Readonly<{
  description: string;
  id: number;
  reference: string;
}>;
export const Quote = (): JSX.Element => {
  const [quote, setQuote] = useState<null | Quote>(null);
  useEffectOnce(() => {
    const getData = async () => {
      const response = await axios.get(`/api/get-advice`);
      setQuote(response.data);
    };
    getData();
  });
  return (
    <div className="quote">
      {quote?.description ? (
        <div className="quote-description">{quote?.description || ""}</div>
      ) : (
        <Spinner className="quote-spinner" style={{ borderColor: "pink" }} />
      )}
    </div>
  );
};
