import axios from "axios";
import { useState } from "react";
import { useEffectOnce } from "../app/hooks/use-effect-once";
import "./quote.css";
import { getRandomBetween } from "../services/utils";
import { imagesObject } from "../services/images.map";
import loader from "../assets/images/loader.gif";
type Quote = Readonly<{
  description: string;
  id: number;
  reference: string;
}>;
export const Quote = (): JSX.Element => {
  const [quote, setQuote] = useState<null | Quote>(null);
  const [imageNumber, setImageNumber] = useState<number | null>(null);
  const [error, setError] = useState<null | Error>(null);
  useEffectOnce(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/get-advice`);
        setQuote(response.data);
        setImageNumber(getRandomBetween(1, 105));
      } catch (e) {
        setError(e as Error);
      }
    };
    getData();
  });
  return (
    <div
      className="quote"
      style={{
        ...(imageNumber
          ? {
              background: `url(${imagesObject[imageNumber]}) no-repeat center center fixed`,
            }
          : {}),
      }}
    >
      {error ? (
        <div className="quote-wrapper">
          <div className="quote-description">
            {"Seek forgiveness of Allah. He is forgiving and Merciful."}
          </div>
          <div className="quote-reference">{`Qur'an ${"Qur'an 73:20"}`}</div>
        </div>
      ) : quote?.description ? (
        <div className="quote-wrapper">
          <div className="quote-description">
            {quote?.description ||
              "Seek forgiveness of Allah. He is forgiving and Merciful."}
          </div>
          <div className="quote-reference">{`Qur'an ${
            quote?.reference || "Qur'an 73:20"
          }`}</div>
        </div>
      ) : (
        <div className="quote-loader">
          <img src={loader} alt="loader" height={"100px"} />
        </div>
      )}
    </div>
  );
};
