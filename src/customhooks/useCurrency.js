import { useEffect, useState } from "react";

async function fetchCurrencyData(currency) {

  const primaryAPI = `${import.meta.env.VITE_PRIMARY_API}${currency}.json`;
  const fallbackAPI = `${import.meta.env.VITE_FALLBACK_API}${currency}.json`;


  try {
    const response = await fetch(primaryAPI);
    if (!response.ok) {
      throw new Error("Primary API failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(
      "Primary API failed. Switching to fallback API:",
      error.message
    );

    try {
      const fallbackResponse = await fetch(fallbackAPI);
      if (!fallbackResponse.ok) {
        throw new Error("Fallback API failed");
      }
      const fallbackData = await fallbackResponse.json();
      return fallbackData;
    } catch (fallbackError) {
      console.error("Both APIs failed:", fallbackError.message);
      throw new Error("Unable to fetch data from both APIs");
    }
  }
}

function useCurrency(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchCurrencyData(currency)
      .then((res) => {
        setData(res[currency]);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [currency]);
  return data;
}
export default useCurrency;
