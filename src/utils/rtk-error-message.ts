type AnyObj = Record<string, unknown>;

const asObj = (v: unknown): AnyObj | null =>
  typeof v === 'object' && v !== null ? (v as AnyObj) : null;

export function rtkErrorMessage(
  error: unknown,
  fallback = 'Сталася помилка під час завантаження!'
): string {
  const err = asObj(error);
  const data = asObj(err?.data);

  if (typeof err?.data === 'string') return String(err.data);

  if (typeof data?.status_message === 'string')
    return String(data.status_message);

  if (typeof data?.message === 'string') return String(data.message);

  if (typeof err?.message === 'string') return String(err.message);

  return fallback;
}
