import { JSONParse } from 'json-with-bigint';
import { PUBLIC_BASE_API_URL } from '$env/static/public';

export async function getPrimeInfo(slug: string): Promise<GetPrimeInfoResponse | null> {
  return await fetch(`${PUBLIC_BASE_API_URL}/get-all-info/${slug}`)
    .then(async (response) => {
      return JSONParse(await response.text()) as GetPrimeInfoResponse;
    })
    .then((data) => {
      // if data has error key return data
      if ('error' in data) {
        if ('n' in data) return data as IntegerErrorResponse;
        if ('slug' in data) return data as SlugErrorResponse;
      }
      return data;
    })
    .catch((error) => {
      return null;
    });
}

export async function fetchPrimeGeneric(endpoint: string): Promise<NamedPrimeEntry[]> {
  return await fetch(`${PUBLIC_BASE_API_URL}/primes/${endpoint}`)
    .then(async (response) => {
      return JSONParse(await response.text());
    })
    .then((data) => {
      // @ts-ignore
      const ret = data.map((onePrime: NamedPrimeEntry) => {
        return {
          ...onePrime,
          //@ts-ignore
          n: onePrime.n.toString(),
        };
      });
      console.log;
      return ret;
    })
    .catch((error) => {
      return [] as NamedPrimeEntry[];
    });
}
