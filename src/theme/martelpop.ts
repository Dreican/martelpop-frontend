import PrimeVue from "primevue/config";
import {useAuthStore} from "@/features/auth/stores/auth.ts";
import Aura from "@primeuix/themes/aura";
import {definePreset} from "@primeuix/themes";


export const MartelPopPreset  = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{cyan.50}',
            100: '{cyan.100}',
            200: '{cyan.200}',
            300: '{cyan.300}',
            400: '{cyan.400}',
            500: '{cyan.500}',
            600: '{cyan.600}',
            700: '{cyan.700}',
            800: '{cyan.800}',
            900: '{cyan.900}',
            950: '{cyan.950}',

        },
        surface: {
            0: '#ffffff',
            50: 'light-dark({slate.50}, {zinc.50})',
            100: 'light-dark({slate.100}, {zinc.100})',
            200: 'light-dark({slate.200}, {zinc.200})',
            300: 'light-dark({slate.300}, {zinc.300})',
            400: 'light-dark({slate.400}, {zinc.400})',
            500: 'light-dark({slate.500}, {zinc.500})',
            600: 'light-dark({slate.600}, {zinc.600})',
            700: 'light-dark({slate.700}, {zinc.700})',
            800: 'light-dark({slate.800}, {zinc.800})',
            900: 'light-dark({slate.900}, {zinc.900})',
            950: 'light-dark({slate.950}, {zinc.950})'
        },
        typography: {
            lineHeight: '1.5',
            fontFamily: 'inherit',
            fontWeight: 'normal',
            fontSize: '0.875rem'
        },
        formField: {
            hoverBorderColor: '{primary.color}',
            fontWeight: '{typography.font.weight}',
            fontSize: '{typography.font.size}'
        },
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    },
    components: {
        card: {
            root: {
                background: 'light-dark({surface.0}, {surface.900})',
                color: 'light-dark({surface.700}, {surface.0})',
                borderRadius: '1rem',
                shadow: 'var(--p-overlay-modal-shadow)'
            },
            subtitle: {
                color: 'light-dark({surface.500}, {surface.400})'
            }
        },
        button: {
            root: {
                borderRadius: '0.625rem',
            },
        },

        inputText: {
            root: {
                borderRadius: '0.625rem',
            },
        },

        inputPassword: {
            root: {
                borderRadius: '0.625rem',
            },
        }
    }
});
