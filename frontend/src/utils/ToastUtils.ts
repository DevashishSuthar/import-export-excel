import { Notyf } from 'notyf';

import 'notyf/notyf.min.css';

const notyf = new Notyf({
    dismissible: true,
    duration: 5000,
    position: {
        x: 'right',
        y: 'top'
    }
});

export const showSuccessToastMessage = (message: string) => {
    return notyf.success(message);
};

export const showErrorToastMessage = (message: string) => {
    return notyf.error(message);
};