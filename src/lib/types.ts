type UnnamedPrimeEntry = {
  id: string;
  n: string;
};

type NamedPrimeEntry = UnnamedPrimeEntry & {
  name: string;
  slug: string;
};
