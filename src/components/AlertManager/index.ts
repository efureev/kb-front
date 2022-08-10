type AlertType = 'success' | 'warning' | 'info' | 'error'

const typeAlert = ref<AlertType>()
const titleAlert = ref<string>('Alert message!')
const descriptionAlert = ref<string | undefined>()
const showAlert = ref<boolean>(false)
const showIconAlert = ref<boolean>(false)
const effectAlert = ref<string>('light')

export {
  typeAlert,
  titleAlert,
  descriptionAlert,
  showAlert,
  showIconAlert,
  effectAlert,
}

export const useAlert = () => {
  const reset = () => {
    showAlert.value = false
    showIconAlert.value = false
    titleAlert.value = ''
    descriptionAlert.value = undefined
  }

  const alertCustom = (type: AlertType, text: string, description?: string): void => {
    reset()

    titleAlert.value = text
    descriptionAlert.value = description
    typeAlert.value = type
    showAlert.value = true
  }

  const alertError = (text: string, description?: string): void => {
    alertCustom('error', text, description)
  }

  const alertSuccess = (text: string, description?: string): void => {
    alertCustom('success', text, description)
  }

  return {
    alertSuccess,
    alertError,
  }
}
