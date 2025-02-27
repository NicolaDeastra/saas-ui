import * as React from 'react'
import { chakra, useStyles, useTheme } from '@chakra-ui/system'
import { useToast, UseToastOptions, ToastId } from '@chakra-ui/toast'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertIconProps,
} from '@chakra-ui/alert'
import { CloseButton } from '@chakra-ui/close-button'
import { ButtonGroup } from '@chakra-ui/button'
import { Spinner } from '@chakra-ui/spinner'

const AlertSpinner: React.FC<AlertIconProps> = (props) => {
  const styles = useStyles()
  return (
    <chakra.span
      display="inherit"
      {...props}
      alignItems="center"
      __css={styles.icon}
    >
      <Spinner size="sm" />
    </chakra.span>
  )
}

const Snackbar: React.FC<any> = (props) => {
  const {
    status,
    variant,
    id,
    title,
    icon,
    isClosable,
    onClose,
    description,
    action,
  } = props

  const theme = useTheme()

  // Use the snackbar variant if it exists, otherwise default to solid
  const defaultVariant = theme.components?.Alert?.variants?.snackbar
    ? 'snackbar'
    : 'solid'

  const alertTitleId =
    typeof id !== 'undefined' ? `toast-${id}-title` : undefined

  return (
    <Alert
      status={status}
      variant={variant || defaultVariant}
      id={id}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      textAlign="start"
      width="auto"
      aria-labelledby={alertTitleId}
    >
      {icon === null ? null : icon ? icon : <AlertIcon />}
      <chakra.div flex="1" maxWidth="100%">
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription display="block">{description}</AlertDescription>
        )}
      </chakra.div>
      {(action || isClosable) && (
        <ButtonGroup size="xs" variant="ghost" ms="2">
          {action}
          {isClosable && <CloseButton size="sm" onClick={onClose} />}
        </ButtonGroup>
      )}
    </Alert>
  )
}

interface UseSnackbarOptions extends UseToastOptions {
  icon?: React.ReactNode
  action?: React.ReactNode
  variant?:
    | 'snackbar'
    | 'subtle'
    | 'solid'
    | 'left-accent'
    | 'top-accent'
    | string
}

type SnackbarOptions = UseSnackbarOptions | string

export interface SnackbarPromiseOptions {
  loading?: SnackbarOptions
  success: SnackbarOptions
  error: any
}

const defaults = {
  duration: 5000,
  position: 'bottom',
} as const

export function useSnackbar(defaultOptions: UseSnackbarOptions = defaults) {
  const toast = useToast(defaultOptions)

  const parseOptions = React.useCallback(
    (options: SnackbarOptions): UseToastOptions => {
      if (typeof options === 'string') {
        return {
          title: options,
        }
      }
      return options
    },
    []
  )

  return React.useMemo(() => {
    const snackbar = (options: SnackbarOptions): ToastId | undefined => {
      const opts = parseOptions(options)
      return toast({
        render: (props) => (
          <Snackbar {...defaultOptions} {...opts} {...props} />
        ),
        ...opts,
      })
    }

    snackbar.info = (options: SnackbarOptions) =>
      snackbar({
        status: 'info',
        ...parseOptions(options),
      })

    snackbar.success = (options: SnackbarOptions) =>
      snackbar({
        status: 'success',
        ...parseOptions(options),
      })

    snackbar.error = (options: SnackbarOptions) =>
      snackbar({
        status: 'error',
        ...parseOptions(options),
      })

    snackbar.promise = async (
      promise: Promise<any>,
      { loading, success, error }: SnackbarPromiseOptions
    ) => {
      let toastId: ToastId | undefined
      if (loading) {
        const options = parseOptions(loading)
        toastId = snackbar({
          status: 'info',
          duration: null,
          icon: <AlertSpinner color="white" />,
          ...options,
        })
      }
      promise
        .then(() => {
          const options = parseOptions(success)
          if (toastId) {
            snackbar.update(toastId, {
              status: 'success',
              ...options,
            })
          } else {
            snackbar(options)
          }
        })
        .catch((error) => {
          const options: UseToastOptions = {
            title: error.name,
            description: error.description,
            status: 'error',
          }
          if (toastId) {
            snackbar.update(toastId, options)
          } else {
            snackbar(options)
          }
        })
    }

    snackbar.update = (toastId: ToastId, options: UseToastOptions) => {
      return toast.update(toastId, {
        render: (props) => (
          <Snackbar {...defaultOptions} {...options} {...props} />
        ),
        ...options,
      })
    }
    snackbar.isActive = toast.isActive
    snackbar.close = toast.close
    snackbar.closeAll = toast.closeAll

    return snackbar
  }, [toast, defaultOptions])
}
