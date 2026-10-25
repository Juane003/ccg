type TryCatchSuccess<T> = {
  data: T;
  error: null;
};

type TryCatchError<E = Error> = {
  data: null;
  error: E;
};

export type TryCatchResult<T, E = Error> =
  | TryCatchSuccess<T>
  | TryCatchError<E>;

const tryCatch = async <T, E = Error>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error: unknown) {
    return { data: null, error: error as E };
  }
};

export default tryCatch;
