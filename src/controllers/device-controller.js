import axios from 'axios';
import devicesFilter from '../services/device-service';
import { Telnet } from 'telnet-client';

const listDevices = async (req, res) => {
    try {
        const { data } = await axios.get('API_URL/device')

        const pwDevices = devicesFilter(data);

        return res.status(200).json(pwDevices);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    }
}

const rainfallIntensityMeasurement = async (req, res) => {
    const connection = new Telnet();

    let rainfallMeasurements = [];

    try {
        const { data } = await axios.get('API_URL/device')

        const pwDevices = devicesFilter(data);

        for (const device of pwDevices) {

            const deviceConfig = {
                host: device.url, // Endereço IP do dispositivo
                port: 23, // Porta Telnet
            };

            await connection.connect(deviceConfig);
            await connection.send('get_rainfall_intensity\n');
            const response = await connection.send('\n');

            const measurement = {
                device: device.identifier,
                measurement: response
            }
            rainfallMeasurements.push(measurement);
            connection.end();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: error.message })
    }
}

export { listDevices, rainfallIntensityMeasurement };