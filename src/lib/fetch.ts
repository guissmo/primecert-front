import { JSONParse } from 'json-with-bigint';
import { PUBLIC_BASE_API_URL } from '$env/static/public';

async function fetchGeneric(endpoint: string): Promise<NamedPrimeEntry[]> {
  return await fetch(`${PUBLIC_BASE_API_URL}${endpoint}`)
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

export async function fetchUnnamedPrimes(): Promise<UnnamedPrimeEntry[]> {
  return fetchGeneric('/primes/unnamed');
}

export async function fetchRecentlyNamedPrimes(): Promise<NamedPrimeEntry[]> {
  return fetchGeneric('/primes/recently-named');
}
