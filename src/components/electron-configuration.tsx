interface Props {
  configuration: string
}

export default function ElectronConfiguration({ configuration }: Props) {
  const splitedElectronConfiguration = configuration.split(' ')

  return (
    <p className="flex flex-wrap">
      {!/\d/.test(splitedElectronConfiguration[0]) && [
        splitedElectronConfiguration.splice(0, 1),
        ' ',
      ]}
      {splitedElectronConfiguration.map((element, index) => (
        <span key={index}>
          {element.substring(0, 2)}
          <sup>{element.substring(2)}</sup>
        </span>
      ))}
    </p>
  )
}
