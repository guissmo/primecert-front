type UnnamedPrimeEntry = {
  id: string;
  n: string;
};

type NamedPrimeEntry = UnnamedPrimeEntry & {
  name: string;
  slug: string;
};

type PrimeInfoEntry = {
  [key: string]: any;
  id: string;
  name: string | null;
  slug: string | null;
  created: Date | null;
  next_prime: string;
  n: string;
  t: string;
  s: string;
  a: string;
  y: string;
  m: string;
  q: string;
  b: string;
};

type IntegerErrorResponse = {
  n: number;
  error: 'COMPOSITE' | 'LOW_PRIME' | 'TOO_HIGH';
};

type SlugErrorResponse = {
  slug: string;
  error: 'NOT_FOUND';
};

type GetPrimeInfoResponse = PrimeInfoEntry | IntegerErrorResponse | SlugErrorResponse;
