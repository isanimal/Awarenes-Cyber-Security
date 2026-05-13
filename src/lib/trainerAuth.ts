const TRAINER_SESSION_KEY = 'stv_trainer_access';

// Classroom gate only. This is not enterprise-grade authentication.
export function verifyTrainerPasscode(passcode: string): boolean {
  const expected = import.meta.env.VITE_TRAINER_PASSCODE || 'change-this-passcode';
  const ok = passcode.trim() === expected;
  if (ok) sessionStorage.setItem(TRAINER_SESSION_KEY, 'true');
  return ok;
}

export function hasTrainerAccess(): boolean {
  return sessionStorage.getItem(TRAINER_SESSION_KEY) === 'true';
}

export function clearTrainerAccess(): void {
  sessionStorage.removeItem(TRAINER_SESSION_KEY);
}
