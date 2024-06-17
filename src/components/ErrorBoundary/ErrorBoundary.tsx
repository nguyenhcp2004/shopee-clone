import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBondary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>
    }
    return this.props.children
  }
}
