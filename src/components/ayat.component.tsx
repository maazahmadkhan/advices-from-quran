import axios from "axios";
import { useState } from "react";
import { useEffectOnce } from "../app/hooks/use-effect-once";
import "./ayat.css";
import { getRandomBetween } from "../services/utils";
import { imagesObject } from "../services/images.map";
import loader from "../assets/images/loader.gif";
import { Ayat } from "./ayat.types";

const maxChars = 160;
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
  const goToQuranCom = () => {
    if (ayat?.surah) {
      window.open(
        `https://quran.com/${ayat.surah.number}?startingVerse=${ayat.numberInSurah}`
      );
    }
  };
  const refresh = () => {
    window.location.reload();
  };
  const tooLong = (ayat?.text?.length || 0) > maxChars;
  return (
    <div
      className="ayat"
      style={{
        ...(imageNumber
          ? {
              background: `url(${imagesObject[imageNumber]}) no-repeat center center fixed`,
              backgroundSize: "cover",
            }
          : {}),
      }}
    >
      {error ? (
        <div className="ayat-wrapper">
          <div className="ayat-description">
            {"Seek forgiveness of Allah. He is forgiving and Merciful."}
          </div>
          <div className="ayat-footer">
            <div className="ayat-reference" onClick={goToQuranCom}>
              {ayat?.surah
                ? `Qur'an ${ayat.surah.englishName} ${ayat.numberInSurah}`
                : "Qur'an Al-Muzzammil 20"}
            </div>
            <div className="ayat-next" onClick={refresh}>
              Next
            </div>
          </div>
        </div>
      ) : ayat?.text ? (
        <div className="ayat-wrapper">
          <div className="ayat-description">
            <div className="ayat-text">
              {tooLong ? ayat.text.substring(0, maxChars) + "..." : ayat.text}
            </div>
          </div>
          <div className="ayat-footer">
            <div className="ayat-reference" onClick={goToQuranCom}>
              {ayat?.surah
                ? `Qur'an ${ayat.surah.englishName} ${ayat.numberInSurah}`
                : "Qur'an Al-Muzzammil 20"}
            </div>
            <div className="ayat-next" onClick={refresh}>
              Next
            </div>
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
