import { GoogleBook } from "../components/API/GoogleBook";
import { useEffect, useState } from "react";
import { BooksApiResponse, Items } from "../types/respBooks";
export const useGoogleBooksApi = (parameter: string) => {
  const [response, setResponse] = useState<BooksApiResponse[]>([]);
  const [params, setParamas] = useState(parameter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await GoogleBook.get<Items>("/volumes", {
          params: { q: params },
        });
        const data = response.data.items;
        setResponse(data);
      } catch (isError) {
        console.log("error occured", isError);
        setIsError(true);
      }
      setIsLoading(false);
    };
    if (params === "") {
      return;
    } else {
      getData();
    }
  }, [params]);

  return [{ response, isLoading, isError }, setParamas] as const;
};
