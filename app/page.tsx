'use client'
import Image from "next/image";
import { useState, useContext, useRef } from "react";
import { LanguageContext } from "./context/LanguageContext";
import translation from "./constants/translations";
import { useRouter } from "next/navigation";

type Language = 'en' | 'fr';

export default function Home() {
  const router = useRouter();
  /
  const { language, changeLanguage } = useContext(LanguageContext) as { language: Language, changeLanguage: (lang: Language) => void };

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [isSelect, setIsSelect] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const selectRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const validateSelect = (value: string): string => {
    if (!value) return translation[language].Error;
    return "";
  };

  const validateDay = (value: string): string => {
    if (!value) return translation[language].Error;
    if (!Number(value)) return translation[language].Error1;
    if (Number(value) > 31) return translation[language].dayError2;
    return "";
  };

  const validateMonth = (value: string): string => {
    if (!value) return translation[language].Error;
    if (!Number(value)) return translation[language].Error1;
    if (Number(value) > 12) return translation[language].monthError;
    return "";
  };

  const validateYear = (value: string): string => {
    if (!value) return translation[language].Error;
    if (!Number(value)) return translation[language].Error1;
    if (Number(value) > 2010) return translation[language].yearError;
    if (Number(value) < 1950) return translation[language].yearError1;
    return "";
  };

  
  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setIsClicked(true);
    let valid = true;
  
    const selectValidation = validateSelect(isSelect);
    if (selectValidation) valid = false;

    const dayValidation = validateDay(day);
    if (dayValidation) {
      valid = false;
      setDayError(dayValidation);
    } else {
      setDayError('');
    }

    const monthValidation = validateMonth(month);
    if (monthValidation) {
      valid = false;
      setMonthError(monthValidation);
    } else {
      setMonthError('');
    }

    const yearValidation = validateYear(year);
    if (yearValidation) {
      valid = false;
      setYearError(yearValidation);
    } else {
      setYearError('');
    }

    if (valid) {
      router.push('/pin');
    } else {
      if (selectValidation && selectRef.current) {
        selectRef.current.focus();
      } else if (dayValidation && dayRef.current) {
        dayRef.current.focus();
      } else if (monthValidation && monthRef.current) {
        monthRef.current.focus();
      } else if (yearValidation && yearRef.current) {
        yearRef.current.focus();
      }
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
    if (isClicked) {
      setDayError(validateDay(e.target.value));
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
    if (isClicked) {
      setMonthError(validateMonth(e.target.value));
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    if (isClicked) {
      setYearError(validateYear(e.target.value));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelect(e.target.value);
  };

  const keydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center sm:px-20 max-w-full w-screen bg-white font-serif tracking-wide">
       <div className="flex flex-col justify-center items-center bg-white bg-cover bg-center bg-[url('/images/bg2.png')] max-w-[500px] px-12">
        <div>
          <Image 
            src='/images/logo.png'
            alt="logo-image"
            width={180}
            height={180}
            className="mt-8"
          />
        </div>
        <div className="border-y-2 rounded-b-2xl rounded-t-2xl mt-6 mb-7 px-10">
          <h1 className="text-xl text-center font-extrabold font-serif my-14">
            {translation[language].title}
          </h1>
        </div>
        <div className="mt-5 flex text-center flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="grid text-black">
            <div>
              <select 
                ref={selectRef}
                value={isSelect}
                className="max-w-84 w-full py-3 text-lg font-bold border-2 border-black focus:border-none"
                onChange={handleSelectChange}
              >
                <option value='' hidden>{translation[language].select}</option>
                <option value="ALBERTA">ALBERTA</option>
                <option value="BRITISH COLUMBIA">BRITISH COLUMBIA</option>
                <option value="MANITOBA">MANITOBA</option>
                <option value="NORTHWEST">NORTHWEST TERRITORIES</option>
                <option value="NEW BRUNSWICK">NEW BRUNSWICK</option>
                <option value="NEWFOUNDLAND AND LABRADDR">NEWFOUNDLAND AND LABRADDR</option>
                <option value="MUNAVUT">MUNAVUT</option>
                <option value="NOVA SCOTIA">NOVA SCOTTA</option>
                <option value="ONTARIO">ONTARIO</option>
                <option value="PRINCE EDWARD ISLAND">PRINCE EDWARD ISLAND</option>
                <option value="QUEBEC">QUEBEC</option>
                <option value="SASKATCHEWAN">SASKATCHEWAN</option>
                <option value="YUKON">YUKON</option>
              </select>
            </div>
            <div className="grid grid-cols-3 mt-4 justify-between h-20 gap-3">
              <div>
                <input
                  ref={dayRef}
                  value={day}
                  onChange={handleDayChange}
                  type="text"
                  className="w-full max-w-28 py-2 text-center placeholder:text-black placeholder:font-extrabold font-extrabold uppercase"
                  placeholder="DD"
                  onKeyDown={keydown}
                />
                {dayError && <p className="text-red-400 text-xs mt-2 max-w-20 uppercase font-sans">{dayError}</p>}
              </div>
              <div>
                <input
                  ref={monthRef}
                  value={month}
                  onChange={handleMonthChange}
                  type="text"
                  className="max-w-full w-28 py-2 text-center placeholder:text-black placeholder:font-extrabold font-extrabold uppercase h-10"
                  placeholder="MM"
                  onKeyDown={keydown}
                />
                {monthError && <p className="text-red-400 text-xs mt-2 max-w-20 uppercase font-sans">{monthError}</p>}
              </div>
              <div>
                <input
                  ref={yearRef}
                  type="text"
                  value={year}
                  onChange={handleYearChange}
                  className="max-w-full w-28 py-2 text-center placeholder:text-black placeholder:font-extrabold font-extrabold uppercase h-10"
                  placeholder="YYYY"
                  onKeyDown={keydown}
                />
                {yearError && <p className="text-red-400 text-xs mt-2 max-w-20 uppercase font-sans">{yearError}</p>}
              </div>
            </div>
          </form>
          <div className="w-full flex gap-6 justify-center mt-14">
            <button className={`${language === 'en' ? 'text-white text-sm font-bold border-b border-white' : 'text-gray-400 text-sm'}`}
              onClick={() => changeLanguage("en")}>EN</button>
            <button className={`${language === 'fr' ? 'text-white text-sm font-bold border-b border-white' : 'text-gray-400 text-sm'}`}
              onClick={() => changeLanguage("fr")}>FR</button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-16 px-3">
          <p className="text-start w-full text-xs font-extrabold uppercase">{translation[language].note}</p>
          <button className="flex w-full max-w-[350px] justify-center text-center text-white bg-red-600 rounded-sm py-3 text-lg font-bold"
            onClick={handleSubmit}>{translation[language].letsGo}</button>
        </div>
        <div className="w-full flex flex-col text-center text-sm px-3 mt-10">
          <p className="my-3 text-sm">{translation[language].p1}</p>
          <p className="text-sm">{translation[language].p2}</p>
        </div>
        <div className="w-full mt-10 flex px-3 justify-between text-xs mb-10">
          <p className="underline cursor-pointer">{translation[language].P3}</p>
          <p className="underline cursor-pointer">{translation[language].P4}</p>
        </div>
      </div>
    </div>
  );
}
