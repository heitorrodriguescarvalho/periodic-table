import { useEffect } from 'react'

import { SelectTriggerProps } from '@radix-ui/react-select'

import { cn } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

type MeasurementType = 'celsius' | 'kelvin' | 'fahrenheit'

const measurementsLabel: Record<MeasurementType, string> = {
  celsius: 'Celsius (ºC)',
  fahrenheit: 'Fahrenheit (ºF)',
  kelvin: 'Kelvin (K)',
}

interface Props extends SelectTriggerProps {
  measurement: MeasurementType
  onMeasurementChange: (measurement: MeasurementType) => void
}

export default function MeasurementSelect({
  measurement,
  onMeasurementChange,
  ...props
}: Props) {
  useEffect(() => {
    const storedMeasurement = localStorage.getItem('measurement')

    if (
      storedMeasurement &&
      ['celsius', 'kelvin', 'fahrenheit'].includes(storedMeasurement)
    )
      onMeasurementChange(storedMeasurement as MeasurementType)
  }, [onMeasurementChange])

  const handleMeasurementChange = (measurement: MeasurementType) => {
    localStorage.setItem('measurement', measurement)

    onMeasurementChange(measurement)
  }

  return (
    <Select value={measurement} onValueChange={handleMeasurementChange}>
      <SelectTrigger
        {...props}
        className={cn('max-w-36 capitalize', props.className)}
      >
        {measurementsLabel[measurement]}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(measurementsLabel).map(([value, label], i) => (
            <SelectItem key={i} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
