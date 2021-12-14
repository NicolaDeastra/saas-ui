import { theme as baseTheme, extendTheme } from '@chakra-ui/react'

import { mode, transparentize } from '@chakra-ui/theme-tools'

import deepmerge from 'deepmerge'

import Button from './components/Button'
import CTA from './components/CTA'
import Features, { Feature } from './components/Features'
import Section from './components/Section'
import SectionTitle from './components/SectionTitle'

import colors from './colors'

const styles = {
  global: (props: any) => ({
    body: {
      webkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      color: mode('gray.900', 'white')(props),
      bg: mode('white', 'gray.900')(props),
      minHeight: 'auto',
    },
    'div#__next, div#__next > div': {
      height: '100%',
    },
  }),
}

const textStyles = {
  h1: {
    fontSize: ['4xl', null, '6xl'],
    fontWeight: 'extrabold',
    lineHeight: '1.2',
    letterSpacing: '-2%',
  },
  h2: {
    fontSize: ['36px', '48px'],
    fontWeight: '900',
    lineHeight: '110%',
    letterSpacing: '-1%',
  },
  subtitle: {
    fontSize: ['lg', null, '2xl'],
    fontWeight: 'normal',
  },
}

const shadows = {
  outline: `0 0 0 2px ${transparentize(colors.primary[500], 0.6)(baseTheme)}`,
}

const focusBorderColor = 'primary.500'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  colors,
  styles,
  textStyles,
  fonts: {
    ...baseTheme.fonts,
    body: 'InterVariable, sans-serif',
    heading: 'InterVariable, sans-serif',
  },
  shadows,
  headers: {},
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor,
        size: 'md',
      },
      sizes: {
        md: {
          field: {
            px: 3,
            h: 9,
          },
          addon: {
            px: 3,
            h: 9,
          },
        },
      },
    },
    NumberInput: {
      defaultProps: {
        focusBorderColor,
        size: 'md',
      },
      sizes: {
        md: {
          field: {
            px: 3,
            h: 9,
          },
          addon: {
            px: 3,
            h: 9,
          },
        },
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor,
        size: 'md',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor,
        size: 'md',
      },
    },
    PinInput: {
      defaultProps: {
        focusBorderColor,
        size: 'md',
      },
    },
    Button,
    Container: {
      baseStyle: {
        maxW: 'container.lg',
      },
    },
    Heading: {
      baseStyle: {
        // fontWeight: '900'
      },
    },
    NavLink: {
      ...baseTheme.components.Button,
      variants: {
        ...Button.variants,
        // solid: ,
        link: (props: any) => ({
          fontWeight: '500',
          color: mode('gray.700', 'whiteAlpha.700')(props),
          transition: 'color .2s ease-in',
          _hover: {
            textDecoration: 'none',
            color: mode('gray.900', 'white')(props),
          },
        }),
      },
      sizes: deepmerge(baseTheme.components.Button.sizes, {
        sm: {
          lineHeight: '2rem',
        },
        md: {
          lineHeight: '2.5rem',
        },
        lg: {
          lineHeight: '3rem',
        },
      }),
      defaultProps: {
        variant: 'link',
        size: 'sm',
      },
    },
    CTA,
    Section,
    SectionTitle,
    Features,
    Feature,
    Link: {
      baseStyle: {
        textDecoration: 'underline',
      },
    },
  },
})
// console.log(theme.components.NavLink)
export default theme
