export type TryCatchResult<T, E = Error> = {
  data: T | null;
  error: E | null;
};

const tryCatch = async <T, E = Error>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error as E };
  }
};

export default tryCatch;
