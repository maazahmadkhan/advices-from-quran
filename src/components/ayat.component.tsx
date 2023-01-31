import axios from "axios";
import { useState } from "react";
import { useEffectOnce } from "../app/hooks/use-effect-once";
import "./ayat.css";
import { getRandomBetween } from "../services/utils";
import { imagesObject } from "../services/images.map";
import loader from "../assets/images/loader.gif";
import { Ayat } from "./ayat.types";

export const AyatComponent = (): JSX.Element => {
  const [ayat, setAyat] = useState<null | Ayat>(null);
  const [imageNumber, setImageNumber] = useState<number | null>(null);
  const [error, setError] = useState<null | Error>(null);
  useEffectOnce(() => {
    const getData = async () => {
      try {
        const response: any = await axios.get(
          `https://api.alquran.cloud/v1/ayah/${getRandomBetween(
            1,
            1623
          )}/en.sahih`
        );
        setAyat(response.data.data);
        setImageNumber(getRandomBetween(1, 105));
      } catch (e) {
        setImageNumber(getRandomBetween(1, 105));
        setError(e as Error);
      }
    };
    getData();
  });
  return (
    <div
      className="ayat"
      style={{
        ...(imageNumber
          ? {
              background: `url(${imagesObject[imageNumber]}) no-repeat center center fixed`,
            }
          : {}),
      }}
    >
      {error ? (
        <div className="ayat-wrapper">
          <div className="ayat-description">
            {"Seek forgiveness of Allah. He is forgiving and Merciful."}
          </div>
          <div className="ayat-reference">
            {ayat?.surah
              ? `Qur'an ${ayat.surah.englishName} ${ayat.number}`
              : "Qur'an 73:20"}
          </div>
        </div>
      ) : ayat?.text ? (
        <div className="ayat-wrapper">
          <div className="ayat-description">
            {ayat?.text ||
              "Seek forgiveness of Allah. He is forgiving and Merciful."}
          </div>
          <div className="ayat-reference">
            {ayat?.surah
              ? `Qur'an ${ayat.surah.englishName} ${ayat.number}`
              : "Qur'an 73:20"}
          </div>
        </div>
      ) : (
        <div className="ayat-loader">
          <img src={loader} alt="loader" height={"100px"} />
        </div>
      )}
    </div>
  );
};
