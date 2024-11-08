import ModelViewer from '@/components/model-viewer'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  url: string
  title: string
  description: string
}

export default function ModelFullscreen({ url, title, description }: Props) {
  return (
    <DialogContent className="h-3/4 max-w-screen-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <ModelViewer url={url} />
    </DialogContent>
  )
}
