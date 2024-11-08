'use client'

import { useState } from 'react'

import Image from 'next/image'

import { EnterFullScreenIcon, InfoCircledIcon } from '@radix-ui/react-icons'

import { capitalizePhraseFirstLetter, formatTemperature } from '@/lib/utils'

import ElectronConfiguration from '@/components/electron-configuration'
import MeasurementSelect from '@/components/measurement-select'
import ModelFullscreen from '@/components/model-fullscreen'
import ModelViewer from '@/components/model-viewer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { elements } from '@/constants/elements'

interface Props {
  element: (typeof elements)[0]
}

export default function ElementDialog({ element }: Props) {
  const [measurement, setMeasurement] = useState<
    'celsius' | 'kelvin' | 'fahrenheit'
  >('celsius')
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <DialogContent className="max-h-[calc(100vh-4rem)] gap-12 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {element.name} ({element.symbol})
        </DialogTitle>
        <DialogDescription>{element.summary}</DialogDescription>
      </DialogHeader>
      <div>
        <Tabs>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="infos">Infos</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="3d">3D</TabsTrigger>
          </TabsList>

          <TabsContent value="infos" className="flex flex-col gap-4">
            <Card>
              <CardContent>
                <Accordion type="multiple" className="w-full max-w-sm">
                  <AccordionItem value="appearance">
                    <AccordionTrigger>Appearance</AccordionTrigger>
                    <AccordionContent>
                      {capitalizePhraseFirstLetter(
                        element.appearance || 'Unknow appearance',
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="electron-configuration">
                    <AccordionTrigger>Electron Configuration</AccordionTrigger>
                    <AccordionContent>
                      <ElectronConfiguration
                        configuration={element.electron_configuration}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="electron-configuration-noble-gas-notation">
                    <AccordionTrigger>
                      Noble Gas Notation Electron Configuration
                    </AccordionTrigger>
                    <AccordionContent>
                      <ElectronConfiguration
                        configuration={element.electron_configuration_semantic}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="properties">
            <Card>
              <CardContent>
                <CardHeader className="flex flex-row items-center px-0 py-2">
                  <MeasurementSelect
                    measurement={measurement}
                    onMeasurementChange={setMeasurement}
                    className="ml-auto"
                  />
                </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Atomic Number</TableCell>
                      <TableCell>{element.number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Atomic Mass</TableCell>
                      <TableCell>{element.atomic_mass}u</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Melting Point</TableCell>
                      <TableCell>
                        {element.melt
                          ? formatTemperature(element.melt, measurement)
                          : '--'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Boiling Point</TableCell>
                      <TableCell>
                        {element.boil
                          ? formatTemperature(element.boil, measurement)
                          : '--'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Molar Heat</TableCell>
                      <TableCell>
                        {element.molar_heat ? element.molar_heat : '--'} JK
                        <sup>-1</sup>mol<sup>-1</sup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Electron Affinity</TableCell>
                      <TableCell>
                        {element.electron_affinity
                          ? element.electron_affinity
                          : '--'}{' '}
                        KJ mol<sup>-1</sup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Electronegativity (Paulin)</TableCell>
                      <TableCell>
                        {element.electronegativity_pauling
                          ? element.electronegativity_pauling
                          : '--'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="image" className="flex justify-center">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                <CarouselItem className="flex flex-col items-center justify-center gap-3">
                  <Card className="flex aspect-square w-4/5 items-center justify-center overflow-hidden p-0">
                    <Image
                      src={element.bohr_model_image}
                      width={392}
                      height={392}
                      alt="Element bohr model image"
                      className="aspect-square w-full"
                    />
                  </Card>
                  <p className="text-sm text-muted-foreground">
                    Bohr model image of {element.name}
                  </p>
                </CarouselItem>
                {element.image.title !== 'No Image Found' && (
                  <CarouselItem className="flex flex-col items-center justify-center gap-3">
                    <Card className="flex aspect-square w-4/5 items-center justify-center overflow-hidden p-0">
                      <Image
                        src={element.image.url}
                        width={392}
                        height={392}
                        alt="Element image"
                        className="aspect-square w-full"
                      />
                    </Card>
                    <div className="flex w-4/5 gap-4">
                      <p className="flex-1 text-sm text-muted-foreground">
                        {element.image.title}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <InfoCircledIcon className="size-4 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-4/5 max-w-lg">
                          <p className="text-sm">{element.image.attribution}</p>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="3d" className="flex justify-center">
            <Card className="relative flex aspect-square w-4/5 items-center justify-center overflow-hidden p-0">
              {!fullscreen && <ModelViewer url={element.bohr_model_3d} />}
              <Dialog open={fullscreen} onOpenChange={setFullscreen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-[8px] hover:bg-primary/80 hover:text-primary-foreground"
                  >
                    <EnterFullScreenIcon className="size-6" />
                  </Button>
                </DialogTrigger>
                <ModelFullscreen
                  url={element.bohr_model_3d}
                  title={`${element.name} (${element.symbol})`}
                  description={`Fullscreen 3D view of ${element.name}`}
                />
              </Dialog>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  )
}
