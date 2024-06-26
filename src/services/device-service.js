export default function devicesFilter(deviceList) {

    const devices = deviceList.filter((device) => {
        return device.manufacturer === 'PredictWeather' &&
            device.commands.some((command) => {
                return command.command.command === 'get_rainfall_intensity'
            })
    });

    return devices
}