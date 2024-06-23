import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const showSnackbar = () => {
  const matSnackBar = inject(MatSnackBar);
  return (message: string, state: 'success-snackbar' | 'fail-snackbar') => {
    matSnackBar.open(message, '', {
      duration: 6000,
      panelClass: ['custom-snackbar', state],
    });
  };
};
