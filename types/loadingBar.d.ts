export interface LoadingBarProps {
   loading: boolean
   startLoading: () => void
   stopLoading: () => void
   setProgress: (progress: number) => void
}
